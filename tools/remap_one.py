"""Helper: read one answer file's body, apply a letter map, print remapped body.

    py tools/remap_one.py topic-2/q23 A=F,B=E,C=D,D=C,E=B,F=A
"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tools"))

from letter_remap import remap_body  # noqa: E402

if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", newline="")
    except Exception:
        pass


def main():
    qid = sys.argv[1]
    perm_arg = sys.argv[2]
    letter_map = {}
    for token in perm_arg.split(","):
        k, v = token.split("=")
        letter_map[k.strip()] = v.strip()

    topic, qstem = qid.split("/")
    path = ROOT / "extracted" / topic / f"{qstem}_answer.md"
    raw = path.read_text(encoding="utf-8")
    if raw.startswith("---"):
        end = raw.find("\n---", 3)
        if end != -1:
            raw = raw[end + 4:].lstrip("\n")

    out = remap_body(raw, letter_map)
    sys.stdout.write(out)


if __name__ == "__main__":
    main()
