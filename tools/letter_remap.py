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


# ---------- remapper ----------

# Regions where letters must NEVER be rewritten — code, URLs, link targets.
def _no_touch_spans(body: str) -> list[tuple[int, int]]:
    spans: list[tuple[int, int]] = []
    for m in _FENCED_CODE.finditer(body):
        spans.append((m.start(), m.end()))
    for m in _INLINE_CODE.finditer(body):
        spans.append((m.start(), m.end()))
    for m in _URLS.finditer(body):
        spans.append((m.start(), m.end()))
    for m in _LINK_TARGET.finditer(body):
        spans.append((m.start(1), m.end(1)))
    return spans


def _in_no_touch(pos: int, spans: list[tuple[int, int]]) -> bool:
    for s, e in spans:
        if s <= pos < e:
            return True
    return False


def remap_body(body: str, letter_map: dict[str, str]) -> str:
    """Rewrite every anchored letter reference in `body` per `letter_map`.

    `letter_map` maps original_letter (A..Z) → new_letter (A..Z). Letters
    not in the map, and any A..Z occurrence not anchored by one of the
    structured patterns (HEADER_SINGLE/COMPOUND, CORRECT_ANSWER_BLOCK,
    BOLD_LETTER_DOT, BOLD_LETTER_ALONE, PAREN_SINGLE), are left untouched.

    Identity invariant: if letter_map is empty or maps every letter to
    itself, the output equals the input byte-for-byte.

    Bijective invariant: for any permutation P, remap(remap(body, P), inv(P))
    equals body.
    """
    if not letter_map or all(k == v for k, v in letter_map.items()):
        return body

    no_touch = _no_touch_spans(body)
    # Each rewrite is (position, original_letter, new_letter). Dedup by position.
    rewrites: dict[int, tuple[str, str]] = {}

    def add(pos: int, original: str):
        if original not in letter_map or letter_map[original] == original:
            return
        if _in_no_touch(pos, no_touch):
            return
        new = letter_map[original]
        existing = rewrites.get(pos)
        if existing is not None and existing != (original, new):
            raise AssertionError(
                f"Conflicting rewrite at offset {pos}: "
                f"existing {existing} vs new ({original!r}, {new!r}). "
                f"Pattern set has overlapping disagreement — bug."
            )
        rewrites[pos] = (original, new)

    # Pattern 1: single-letter "Why X is correct/wrong/incorrect"
    for m in _HEADER_SINGLE.finditer(body):
        add(m.start(1), m.group(1))

    # Pattern 2: compound "Why X and Y (and Z) are correct"
    for m in _HEADER_COMPOUND.finditer(body):
        g1_start = m.start(1)
        for lm in re.finditer(r"[A-Z]", m.group(1)):
            add(g1_start + lm.start(), lm.group(0))

    # Pattern 3: bold "Correct answer[s]: X. text and Y. text"
    for m in _CORRECT_ANSWER_BLOCK.finditer(body):
        block_start = m.start()
        for lm in re.finditer(r"\b([A-Z])\.\s", m.group(0)):
            add(block_start + lm.start(1), lm.group(1))

    # Pattern 4: bold leading option discussion `**X. `
    for m in _BOLD_LETTER_DOT.finditer(body):
        add(m.start(1), m.group(1))

    # Pattern 5: bold letter alone `**X**`
    for m in _BOLD_LETTER_ALONE.finditer(body):
        add(m.start(1), m.group(1))

    # Pattern 6: parenthetical `(X)`
    for m in _PAREN_SINGLE.finditer(body):
        add(m.start(1), m.group(1))

    if not rewrites:
        return body

    # Apply rewrites in position order. Each rewrite is exactly one character.
    out: list[str] = []
    last = 0
    for pos in sorted(rewrites):
        original, new = rewrites[pos]
        out.append(body[last:pos])
        # Sanity: the character at pos should equal original
        if body[pos] != original:
            raise AssertionError(
                f"Rewrite mismatch at offset {pos}: "
                f"expected {original!r}, found {body[pos]!r}."
            )
        out.append(new)
        last = pos + 1
    out.append(body[last:])
    return "".join(out)


def invert_map(letter_map: dict[str, str]) -> dict[str, str]:
    """Return the inverse mapping. Raises if the input isn't a bijection."""
    out: dict[str, str] = {}
    for k, v in letter_map.items():
        if v in out:
            raise ValueError(f"Letter map is not a bijection: {v!r} appears twice")
        out[v] = k
    return out
