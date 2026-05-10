#!/usr/bin/env python3
"""
Audits every extracted/topic-N/qNN_answer.md for letter references (A-E)
that would need to be remapped if option order is shuffled and re-lettered.

Categorizes each occurrence into a named pattern bucket so we can see what
the remapper has to handle. Anything that doesn't fit a known pattern is
flagged as "BARE" — the high-risk category that could be either an option
reference or English text.
"""

from __future__ import annotations
import os
import re
import sys
from collections import defaultdict, Counter

ROOT = os.path.join(os.path.dirname(__file__), "..", "extracted")

# Patterns are tried in order. The first one that matches a span "owns" it,
# so the BARE category at the bottom only catches what nothing else did.
PATTERNS = [
    ("HEADER_WHY_CORRECT",    re.compile(r"^##+\s+Why\s+([A-E])\s+(?:is|are)\s+correct\b", re.MULTILINE)),
    ("HEADER_WHY_WRONG",      re.compile(r"^##+\s+Why\s+([A-E])\s+(?:is|are)\s+wrong\b", re.MULTILINE)),
    ("HEADER_WHY_INCORRECT",  re.compile(r"^##+\s+Why\s+([A-E])\s+(?:is|are)\s+incorrect\b", re.MULTILINE)),
    ("CORRECT_ANSWER_BOLD",   re.compile(r"\*\*Correct answers?:\s*([A-E](?:\s*(?:,|and|&|/)\s*[A-E])*)\b")),
    ("BOLD_LETTER_DOT",       re.compile(r"\*\*([A-E])\.\s")),                       # **A. ...
    ("BOLD_LETTER_ALONE",     re.compile(r"\*\*([A-E])\*\*")),                       # **A**
    ("BOLD_COMPOUND",         re.compile(r"\*\*([A-E](?:\s*(?:,|and|&|/)\s*[A-E])+)\*\*")),  # **A and C**
    ("PAREN_COMPOUND",        re.compile(r"\(([A-E](?:\s*(?:,|and|&|/)\s*[A-E])+)\)")),     # (A and C), (A, B)
    ("PAREN_SINGLE",          re.compile(r"\(([A-E])\)")),                            # (A)
    ("OPTION_LABEL",          re.compile(r"\b[Oo]ption\s+([A-E])\b")),
    ("ANSWER_LABEL",          re.compile(r"\b[Aa]nswer\s+([A-E])\b")),
    ("CHOICE_LABEL",          re.compile(r"\b[Cc]hoice\s+([A-E])\b")),
    ("ANSWERS_COMPOUND",      re.compile(r"\b[Aa]nswers?\s+([A-E](?:\s*(?:,|and|&|/)\s*[A-E])+)\b")),
    # Cross-references that name a sibling option in prose
    ("UNLIKE",                re.compile(r"\bunlike\s+([A-E])\b")),
    ("LIKE",                  re.compile(r"\blike\s+([A-E])\b")),
    ("SEE_LETTER",            re.compile(r"\bsee\s+([A-E])\b")),
    # Catch-all: an isolated capital A-E at a word boundary that nothing else claimed.
    # This is the dangerous bucket — could be an option ref or could be English ("Plan B").
    ("BARE",                  re.compile(r"(?<![A-Za-z0-9_])([A-E])(?![A-Za-z0-9_])")),
]

# Substrings that, if they appear on a line, mean a BARE letter on that line is
# almost certainly NOT an option reference. Used only to filter the BARE bucket
# so we can spot the truly ambiguous ones.
ENGLISH_HINTS = [
    "Plan A", "Plan B", "Plan C", "Plan D",
    "Type A", "Type B", "Class A", "Class B", "Class C",
    "Grade A", "Grade B",
    "Option A.", "Option B.", "Option C.", "Option D.",  # already caught by OPTION_LABEL but safety
    "A/B test", "A/B testing",
]


def strip_code_blocks(text: str) -> str:
    """Remove fenced code blocks and inline code so we don't match inside them."""
    text = re.sub(r"```.*?```", "", text, flags=re.DOTALL)
    text = re.sub(r"`[^`]*`", "", text)
    return text


def strip_urls(text: str) -> str:
    """Remove URLs and markdown link targets — letters there shouldn't count."""
    text = re.sub(r"https?://\S+", "", text)
    text = re.sub(r"\]\([^)]*\)", "", text)
    return text


def strip_frontmatter(text: str) -> str:
    """Drop YAML frontmatter so the answer letter in 'answer: A' isn't counted."""
    if text.startswith("---"):
        end = text.find("\n---", 3)
        if end != -1:
            return text[end + 4 :]
    return text


def get_question_type(text: str) -> str:
    """Pull the type field from frontmatter."""
    if not text.startswith("---"):
        return "unknown"
    end = text.find("\n---", 3)
    if end == -1:
        return "unknown"
    fm = text[3:end]
    for line in fm.splitlines():
        line = line.strip()
        if line.startswith("type:"):
            return line.split(":", 1)[1].strip()
    return "unknown"


def audit_file(path: str):
    with open(path, "r", encoding="utf-8") as f:
        raw = f.read()

    qtype = get_question_type(raw)
    body = strip_frontmatter(raw)
    body = strip_code_blocks(body)
    body = strip_urls(body)

    # Track which spans have already been claimed so later patterns don't double-count.
    claimed = [False] * len(body)
    hits = defaultdict(list)  # category -> list of (line_no, snippet)

    def span_free(start, end):
        return not any(claimed[start:end])

    def claim(start, end):
        for i in range(start, end):
            claimed[i] = True

    line_starts = [0]
    for i, ch in enumerate(body):
        if ch == "\n":
            line_starts.append(i + 1)

    def line_of(pos):
        # binary search would be faster; this is fine for ~50KB files
        lo, hi = 0, len(line_starts) - 1
        while lo < hi:
            mid = (lo + hi + 1) // 2
            if line_starts[mid] <= pos:
                lo = mid
            else:
                hi = mid - 1
        return lo + 1

    def line_text(pos):
        ln = line_of(pos)
        start = line_starts[ln - 1]
        end = body.find("\n", start)
        if end == -1:
            end = len(body)
        return body[start:end]

    for name, pat in PATTERNS:
        for m in pat.finditer(body):
            if not span_free(m.start(), m.end()):
                continue
            claim(m.start(), m.end())
            snippet = line_text(m.start()).strip()
            hits[name].append((line_of(m.start()), snippet, m.group(0)))

    return qtype, hits


def classify_bare(snippet: str) -> str:
    """Try to tell whether a BARE hit is probably-option or probably-english."""
    for hint in ENGLISH_HINTS:
        if hint in snippet:
            return "english_hint"
    # Bare letter at start of a list item or sentence with a period after — likely option-ish text
    return "ambiguous"


def main():
    only_types = None
    if len(sys.argv) > 1 and sys.argv[1].startswith("--types="):
        only_types = set(sys.argv[1].split("=", 1)[1].split(","))

    files = []
    for topic in sorted(os.listdir(ROOT)):
        if not topic.startswith("topic-"):
            continue
        tdir = os.path.join(ROOT, topic)
        for name in sorted(os.listdir(tdir)):
            if name.endswith("_answer.md"):
                files.append(os.path.join(tdir, name))

    aggregate = Counter()
    files_with_pattern = defaultdict(set)
    bare_ambiguous_lines = []  # truly worrying ones
    bare_english_lines = []
    file_summaries = []
    type_counts = Counter()
    skipped_by_type = 0

    for path in files:
        rel = os.path.relpath(path, os.path.join(ROOT, ".."))
        qtype, hits = audit_file(path)
        type_counts[qtype] += 1
        if only_types and qtype not in only_types:
            skipped_by_type += 1
            continue
        per_file = {"_type": qtype}
        for cat, items in hits.items():
            per_file[cat] = len(items)
            aggregate[cat] += len(items)
            files_with_pattern[cat].add(rel)
            if cat == "BARE":
                for ln, snippet, match in items:
                    cls = classify_bare(snippet)
                    if cls == "ambiguous":
                        bare_ambiguous_lines.append((rel, ln, match, snippet, qtype))
                    else:
                        bare_english_lines.append((rel, ln, match, snippet, qtype))
        file_summaries.append((rel, per_file))

    # ---- print report ----
    if only_types:
        print(f"Filter: type in {sorted(only_types)}  (skipped {skipped_by_type} files of other types)")
    print(f"Type distribution across all {len(files)} answer files:")
    for t, c in type_counts.most_common():
        print(f"  {t:<20} {c}")
    print()
    print(f"Audited {len(file_summaries)} answer files (after filter).\n")

    print("=== Aggregate counts by pattern ===")
    for name, _ in PATTERNS:
        n = aggregate.get(name, 0)
        f = len(files_with_pattern.get(name, ()))
        print(f"  {name:<24} matches={n:<6} files={f}")
    print()

    if bare_ambiguous_lines:
        print(f"=== BARE ambiguous occurrences ({len(bare_ambiguous_lines)}) ===")
        print("These are isolated A-E references that didn't match a structured")
        print("pattern. Each one is either an option reference the regex set")
        print("missed, or English text (Plan B, Type A, etc).\n")
        sample = bare_ambiguous_lines[:60]
        for rel, ln, match, snippet, qtype in sample:
            short = snippet if len(snippet) <= 140 else snippet[:137] + "..."
            print(f"  {rel}:{ln}  ({qtype})  [{match}]  {short}")
        if len(bare_ambiguous_lines) > 60:
            print(f"  ... and {len(bare_ambiguous_lines) - 60} more")
        print()

    if bare_english_lines:
        print(f"=== BARE filtered as probable-English ({len(bare_english_lines)}) ===")
        for rel, ln, match, snippet, qtype in bare_english_lines[:20]:
            short = snippet if len(snippet) <= 140 else snippet[:137] + "..."
            print(f"  {rel}:{ln}  ({qtype})  [{match}]  {short}")
        if len(bare_english_lines) > 20:
            print(f"  ... and {len(bare_english_lines) - 20} more")
        print()

    # Per-file summary, only files with any hits in named (non-BARE) categories
    print("=== Per-file pattern coverage (files with no BARE hits omitted) ===")
    files_with_bare = [(rel, per) for rel, per in file_summaries if per.get("BARE", 0) > 0]
    print(f"{len(files_with_bare)} files have at least one BARE hit.")
    print()
    for rel, per in files_with_bare[:25]:
        bare_count = per.get("BARE", 0)
        named = sum(v for k, v in per.items() if k != "BARE" and isinstance(v, int))
        qtype = per.get("_type", "?")
        print(f"  {rel}  ({qtype})  named={named}  BARE={bare_count}")
    if len(files_with_bare) > 25:
        print(f"  ... and {len(files_with_bare) - 25} more files with BARE hits")


if __name__ == "__main__":
    sys.exit(main())
