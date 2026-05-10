"""
Dry-run preview of what a shuffled question + remapped explanation will
look like. Renderer is untouched — this tool exists so we can spot-check
the remap output by eye before flipping the in-app shuffle switch.

Usage:
    py tools/preview_shuffle.py topic-2/q23
        Uses a default rotation (A->B, B->C, ..., last->A).

    py tools/preview_shuffle.py topic-2/q23 --perm A=C,B=A,C=B,D=D,E=F,F=E
        Uses the given letter map (old->new).

    py tools/preview_shuffle.py topic-2/q23 --reverse
        Reverses the option order (A↔last, B↔second-last, ...).

    py tools/preview_shuffle.py topic-2/q23 --seed 42
        Random permutation with the given seed.

    py tools/preview_shuffle.py --all --seed 7 --out tools/_preview/
        Writes a preview .md per shuffleable question to a folder.
"""

from __future__ import annotations
import argparse
import json
import random
import sys
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tools"))

from letter_remap import remap_body, is_shuffleable  # noqa: E402


def load_questions():
    qj = ROOT / "app" / "questions.json"
    with open(qj, "r", encoding="utf-8") as f:
        return json.load(f)["questions"]


def load_answer_body(qid: str) -> str:
    topic, qstem = qid.split("/")
    path = ROOT / "extracted" / topic / f"{qstem}_answer.md"
    raw = path.read_text(encoding="utf-8")
    if raw.startswith("---"):
        end = raw.find("\n---", 3)
        if end != -1:
            return raw[end + 4 :].lstrip("\n")
    return raw


def parse_perm_arg(s: str, letters: list[str]) -> dict[str, str]:
    out = {}
    for chunk in s.split(","):
        if "=" not in chunk:
            raise SystemExit(f"Bad --perm token {chunk!r}; expected OLD=NEW")
        old, new = chunk.split("=", 1)
        old = old.strip().upper()
        new = new.strip().upper()
        out[old] = new
    missing = [l for l in letters if l not in out]
    if missing:
        raise SystemExit(f"--perm missing entries for: {', '.join(missing)}")
    if sorted(out.values()) != sorted(letters):
        raise SystemExit(f"--perm is not a bijection over {letters}")
    return out


def rotate_perm(letters: list[str]) -> dict[str, str]:
    if len(letters) < 2:
        return {l: l for l in letters}
    rotated = letters[1:] + letters[:1]
    return dict(zip(letters, rotated))


def reverse_perm(letters: list[str]) -> dict[str, str]:
    return dict(zip(letters, reversed(letters)))


def random_perm(letters: list[str], seed: int) -> dict[str, str]:
    rng = random.Random(seed)
    shuffled = letters[:]
    rng.shuffle(shuffled)
    return dict(zip(letters, shuffled))


def render_preview(q: dict, perm: dict[str, str]) -> str:
    """Produce the markdown preview for a single shuffled question."""
    letters = sorted({opt["letter"] for opt in q.get("options", [])})
    body = load_answer_body(q["id"])
    remapped = remap_body(body, perm)

    # The shuffled display order: option originally at letter L now shows as perm[L].
    # Sort options by their new letter so they print in display order.
    by_old = {opt["letter"]: opt["text"] for opt in q.get("options", [])}
    new_to_old = {v: k for k, v in perm.items()}
    display = []
    for new_letter in sorted(new_to_old):
        old_letter = new_to_old[new_letter]
        display.append((new_letter, old_letter, by_old.get(old_letter, "")))

    lines = []
    lines.append(f"# Preview: {q['id']}  ({q['type']})")
    lines.append("")
    lines.append(f"Permutation (old -> new): " + ", ".join(f"{k}->{v}" for k, v in sorted(perm.items())))
    lines.append("")
    correct_old = set(q.get("correct_letters") or [])
    correct_new = sorted(perm[l] for l in correct_old if l in perm)
    if correct_new:
        lines.append(f"Correct letter(s) after shuffle: {', '.join(correct_new)}")
        lines.append("")
    lines.append("## Question stem")
    lines.append("")
    lines.append((q.get("question_text") or "").strip())
    lines.append("")
    lines.append("## Shuffled options")
    lines.append("")
    for new_letter, old_letter, text in display:
        marker = "  <-- correct" if old_letter in correct_old else ""
        lines.append(f"{new_letter}. {text}    *(was {old_letter})*{marker}")
    lines.append("")
    lines.append("## Remapped explanation")
    lines.append("")
    lines.append(remapped.rstrip())
    lines.append("")
    return "\n".join(lines)


def pick_perm(args, letters: list[str]) -> dict[str, str]:
    if args.perm:
        return parse_perm_arg(args.perm, letters)
    if args.reverse:
        return reverse_perm(letters)
    if args.seed is not None:
        return random_perm(letters, args.seed)
    return rotate_perm(letters)


def main():
    ap = argparse.ArgumentParser(description="Dry-run preview of shuffled questions.")
    ap.add_argument("qid", nargs="?", help="Question id like 'topic-2/q23'")
    ap.add_argument("--all", action="store_true", help="Process every shuffleable question")
    ap.add_argument("--perm", help="Explicit permutation, e.g. A=C,B=A,C=B,D=D")
    ap.add_argument("--reverse", action="store_true", help="Reverse the option order")
    ap.add_argument("--seed", type=int, help="Random permutation with this seed")
    ap.add_argument("--out", help="Write preview to this path (or directory if --all)")
    args = ap.parse_args()

    questions = load_questions()
    by_id = {q["id"]: q for q in questions}

    if args.all:
        targets = [q for q in questions if is_shuffleable(q)]
        out_dir = Path(args.out) if args.out else (ROOT / "tools" / "_preview")
        out_dir.mkdir(parents=True, exist_ok=True)
        for q in targets:
            letters = sorted({opt["letter"] for opt in q.get("options", [])})
            perm = pick_perm(args, letters)
            text = render_preview(q, perm)
            safe = q["id"].replace("/", "-")
            (out_dir / f"{safe}.md").write_text(text, encoding="utf-8")
        print(f"Wrote {len(targets)} previews to {out_dir.relative_to(ROOT)}")
        return 0

    if not args.qid:
        ap.error("either --all or a qid is required")

    q = by_id.get(args.qid)
    if not q:
        ap.error(f"question id not found: {args.qid}")
    if not is_shuffleable(q):
        ap.error(f"question {args.qid} is not shuffleable (type={q['type']})")
    letters = sorted({opt["letter"] for opt in q.get("options", [])})
    perm = pick_perm(args, letters)
    text = render_preview(q, perm)
    if args.out:
        Path(args.out).write_text(text, encoding="utf-8")
        print(f"Wrote preview to {args.out}")
    else:
        print(text)
    return 0


if __name__ == "__main__":
    sys.exit(main())
