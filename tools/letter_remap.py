"""
Letter-reference handling for option randomization.

Two things live here:

1. ANCHORED-letter extraction.
   The set of regex patterns that the future remapper will use to rewrite
   option-letter references in an answer's explanation markdown. Anything
   that doesn't match one of these patterns is treated as untouchable
   (English text, etc) and left alone.

2. A linter for the BUILD step.
   For each multiple-choice or multi-select question, every option letter
   declared in the question body must appear in the explanation under at
   least one structured anchor. If a letter has no anchor, the remapper
   would shuffle the option's position but couldn't relabel its discussion
   in the explanation, so the prose would point at the wrong option after
   shuffle. The linter flags these so they can be fixed before randomization
   ships.

Patterns covered:
  - `## Why X is correct` (single letter)
  - `## Why X and Y (and Z) are correct` (compound)
  - `**Correct answer[s]: X. text and Y. text**` (multi-letter bold preamble)
  - `**X. ` (bold leading option discussion — the most common form)
  - `**X**` (bold letter alone)
  - `(X)` (parenthetical single letter)

Bare A-E letters at word boundaries are NOT remapped — false-positive
risk on the indefinite article "A" is too high (~24 hits across the
current 70 MC/MS files, all of which are English text).
"""

from __future__ import annotations
import re
from typing import Iterable

# ---------- text preparation ----------

_FENCED_CODE = re.compile(r"```.*?```", re.DOTALL)
_INLINE_CODE = re.compile(r"`[^`]*`")
_URLS = re.compile(r"https?://\S+")
_LINK_TARGET = re.compile(r"\]\(([^)]*)\)")


def _strip_noise(text: str) -> str:
    """Remove regions where letters can appear but should never be remapped:
    code blocks, inline code, URLs, and the URL portion of markdown links."""
    text = _FENCED_CODE.sub("", text)
    text = _INLINE_CODE.sub("", text)
    text = _URLS.sub("", text)
    text = _LINK_TARGET.sub("]()", text)
    return text


# ---------- anchored-letter patterns ----------

# Single-letter "Why X is correct/wrong/incorrect" header.
_HEADER_SINGLE = re.compile(
    r"^##+\s+Why\s+([A-Z])\s+(?:is|are)\s+(?:correct|wrong|incorrect)\b",
    re.MULTILINE,
)

# Compound "Why X and Y (and Z) is/are correct" header.
# We accept any sequence of letters joined by commas / "and" / "&".
_HEADER_COMPOUND = re.compile(
    r"^##+\s+Why\s+([A-Z](?:\s*(?:,|and|&)\s*[A-Z])+)\s+(?:is|are)\s+(?:correct|wrong|incorrect)\b",
    re.MULTILINE,
)

# Bold "Correct answer[s]: ..." preamble. Captures the entire bold span so
# we can pull every "X." letter mention out of it (multi-answer cases).
_CORRECT_ANSWER_BLOCK = re.compile(
    r"\*\*Correct\s+answers?\s*:[^*]*?\*\*",
    re.IGNORECASE,
)
_LETTER_DOT_INSIDE = re.compile(r"\b([A-Z])\.\s")

# Bold leading option-discussion: `**A. ...`
_BOLD_LETTER_DOT = re.compile(r"\*\*([A-Z])\.\s")

# Bold letter alone: `**A**`
_BOLD_LETTER_ALONE = re.compile(r"\*\*([A-Z])\*\*")

# Parenthetical: `(A)`
_PAREN_SINGLE = re.compile(r"\(([A-Z])\)")


def anchored_letters(body: str) -> set[str]:
    """Return the set of A-E letters that appear in the body under at least
    one structured anchor pattern."""
    cleaned = _strip_noise(body)
    found: set[str] = set()

    for m in _HEADER_SINGLE.finditer(cleaned):
        found.add(m.group(1))
    for m in _HEADER_COMPOUND.finditer(cleaned):
        for letter in re.findall(r"[A-Z]", m.group(1)):
            found.add(letter)
    for m in _CORRECT_ANSWER_BLOCK.finditer(cleaned):
        for lm in _LETTER_DOT_INSIDE.finditer(m.group(0)):
            found.add(lm.group(1))
    for m in _BOLD_LETTER_DOT.finditer(cleaned):
        found.add(m.group(1))
    for m in _BOLD_LETTER_ALONE.finditer(cleaned):
        found.add(m.group(1))
    for m in _PAREN_SINGLE.finditer(cleaned):
        found.add(m.group(1))

    return found


# ---------- linter ----------

_YES_NO = {"yes", "no"}


def is_shuffleable(question: dict) -> bool:
    """A question is a candidate for option shuffling only if it has
    structured letter options (MC or multi-select) and isn't a degenerate
    Yes/No "does this meet the goal" question — those have no positional
    advantage to defeat."""
    if question.get("type") not in ("multiple-choice", "multi-select"):
        return False
    options = question.get("options") or []
    if len(options) < 3:
        texts = {(opt.get("text") or "").strip().lower() for opt in options}
        if texts <= _YES_NO:
            return False
    return True


def lint_question(question: dict, answer_body: str) -> list[str]:
    """Return zero or more warning strings for a single question.

    Only multiple-choice and multi-select questions are checked, and only
    when shuffling makes sense for them. For each declared option letter,
    the explanation must mention it under one of the structured anchor
    patterns; otherwise the remapper cannot safely rewrite the option's
    discussion when shuffling.
    """
    if not is_shuffleable(question):
        return []

    options = question.get("options") or []
    declared = {opt["letter"] for opt in options if "letter" in opt}
    if not declared:
        return []

    anchored = anchored_letters(answer_body)
    missing = sorted(declared - anchored)
    if not missing:
        return []

    qid = question.get("id", "<unknown>")
    msg = (
        f"{qid}: option letter(s) {', '.join(missing)} have no structured "
        f"anchor in the explanation. Wrap a mention of each missing letter "
        f"in `**X.`, `**X**`, `(X)`, or include it in a `## Why X is correct` "
        f"header so the option-shuffle remapper can relabel it."
    )
    return [msg]


def lint_questions(records: Iterable[dict], read_answer_body) -> list[str]:
    """Lint a sequence of question records. `read_answer_body(qid) -> str`
    is a callable that returns the answer markdown body for a given qid."""
    warnings: list[str] = []
    for q in records:
        if not is_shuffleable(q):
            continue
        body = read_answer_body(q["id"])
        warnings.extend(lint_question(q, body))
    return warnings
