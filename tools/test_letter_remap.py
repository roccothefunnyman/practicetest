"""
Tests for tools/letter_remap.remap_body against the live corpus.

Runs three properties for every MC/MS answer file:

  1. Identity:    remap(body, {A:A, B:B, ...}) == body  (byte-identical)
  2. Bijection:   remap(remap(body, P), inverse(P)) == body  (lossless)
  3. Structure:   permuted output preserves markdown skeleton
                  (header count, bold-marker count, URLs, code blocks)

If any test fails, prints which file and which assertion broke. Exits 1
on any failure.

Usage:
    py tools/test_letter_remap.py
    py tools/test_letter_remap.py --verbose
"""

from __future__ import annotations
import json
import os
import random
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tools"))

from letter_remap import (  # noqa: E402
    remap_body,
    invert_map,
    is_shuffleable,
    anchored_letters,
)


def load_questions():
    qj = ROOT / "app" / "questions.json"
    with open(qj, "r", encoding="utf-8") as f:
        return json.load(f)["questions"]


def load_answer_body(qid: str) -> str:
    # qid is "topic-N/qNN"
    topic, qstem = qid.split("/")
    path = ROOT / "extracted" / topic / f"{qstem}_answer.md"
    raw = path.read_text(encoding="utf-8")
    if raw.startswith("---"):
        end = raw.find("\n---", 3)
        if end != -1:
            return raw[end + 4 :].lstrip("\n")
    return raw


def random_permutation(letters: list[str], rng: random.Random) -> dict[str, str]:
    """Return a non-identity permutation if one exists, else identity."""
    shuffled = letters[:]
    for _ in range(20):
        rng.shuffle(shuffled)
        if shuffled != letters:
            return dict(zip(letters, shuffled))
    return dict(zip(letters, letters))


def reverse_permutation(letters: list[str]) -> dict[str, str]:
    return dict(zip(letters, reversed(letters)))


def count_markers(body: str) -> dict[str, int]:
    return {
        "headers":    len(re.findall(r"^##+\s+", body, re.MULTILINE)),
        "bold_pairs": len(re.findall(r"\*\*", body)) // 2,
        "urls":       len(re.findall(r"https?://\S+", body)),
        "fenced":     len(re.findall(r"```.*?```", body, re.DOTALL)),
        "inline":     len(re.findall(r"`[^`]*`", body)),
        "lines":      body.count("\n"),
        "length":     len(body),
    }


def main():
    verbose = "--verbose" in sys.argv

    questions = load_questions()
    targets = [q for q in questions if is_shuffleable(q)]
    if not targets:
        print("No shuffleable questions found.")
        return 1

    rng = random.Random(20260509)
    failures: list[str] = []
    identity_count = 0
    perm_count = 0

    for q in targets:
        qid = q["id"]
        body = load_answer_body(qid)
        letters = sorted({opt["letter"] for opt in q.get("options", [])})
        if not letters:
            continue

        # ---- 1. Identity ----
        identity_map = {l: l for l in letters}
        out = remap_body(body, identity_map)
        if out != body:
            # Find the first divergence for diagnosis
            diff_at = next((i for i, (a, b) in enumerate(zip(body, out)) if a != b), -1)
            failures.append(
                f"{qid}: IDENTITY failed (output differs from input). "
                f"First divergence at offset {diff_at}: "
                f"{body[max(0, diff_at-30):diff_at+30]!r} vs "
                f"{out[max(0, diff_at-30):diff_at+30]!r}"
            )
            continue
        identity_count += 1

        # ---- 2. Bijection: remap(remap(body, P), P^-1) == body ----
        for label, perm in (
            ("reverse", reverse_permutation(letters)),
            ("random",  random_permutation(letters, rng)),
        ):
            if all(k == v for k, v in perm.items()):
                continue  # identity, skip
            once = remap_body(body, perm)
            twice = remap_body(once, invert_map(perm))
            if twice != body:
                diff_at = next((i for i, (a, b) in enumerate(zip(body, twice)) if a != b), -1)
                failures.append(
                    f"{qid}: BIJECTION ({label}) failed. perm={perm}. "
                    f"First divergence at offset {diff_at}: "
                    f"{body[max(0, diff_at-30):diff_at+30]!r} vs "
                    f"{twice[max(0, diff_at-30):diff_at+30]!r}"
                )
                continue
            perm_count += 1

            # ---- 3. Structure invariants on the permuted output ----
            before = count_markers(body)
            after = count_markers(once)
            for key in before:
                if before[key] != after[key]:
                    failures.append(
                        f"{qid}: STRUCTURE ({label}) {key} count changed "
                        f"from {before[key]} to {after[key]}. perm={perm}"
                    )

            # ---- 4. Anchored letter set must follow the permutation ----
            before_anchored = anchored_letters(body)
            after_anchored = anchored_letters(once)
            expected = {perm.get(l, l) for l in before_anchored}
            if after_anchored != expected:
                failures.append(
                    f"{qid}: ANCHOR-SET ({label}) mismatch. perm={perm}. "
                    f"before={sorted(before_anchored)} expected={sorted(expected)} "
                    f"got={sorted(after_anchored)}"
                )

        if verbose:
            print(f"  ok  {qid}  ({len(letters)} options)")

    print()
    print(f"Identity: {identity_count}/{len(targets)} files preserved byte-identical.")
    print(f"Bijection + structure + anchor-set: {perm_count} permutation runs.")
    if failures:
        print()
        print(f"FAILED: {len(failures)} assertion(s):")
        for f in failures[:30]:
            print(f"  - {f}")
        if len(failures) > 30:
            print(f"  ... and {len(failures) - 30} more")
        return 1
    print("All assertions passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
