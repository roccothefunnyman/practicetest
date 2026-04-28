"""Build questions.json from the extracted/ markdown files.

Run from the practice questions/ folder:
    python build.py

Output: practice questions/app/questions.json
"""

import json
import re
from pathlib import Path

ROOT = Path(__file__).parent
EXTRACTED = ROOT / "extracted"
OUTPUT = ROOT / "app" / "questions.json"

KNOWN_COMPANIES = ["Fabrikam", "Contoso", "Adatum", "Litware", "Northwind", "Tailwind"]


def parse_frontmatter(text):
    if not text.startswith("---"):
        return {}, text
    end = text.find("\n---", 3)
    if end == -1:
        return {}, text
    fm_text = text[3:end].strip()
    body = text[end + 4:].lstrip("\n")
    fm = {}
    for line in fm_text.split("\n"):
        if ":" in line:
            key, val = line.split(":", 1)
            fm[key.strip()] = val.strip()
    return fm, body


def parse_question_body(body):
    """Return (question_text, options[]). Options are {letter, text}.

    Handles 'A. Foo' multiple-choice/multi-select. For hotspot/drag-drop/yes-no,
    options will be empty and the full body becomes the question text.
    """
    lines = body.strip().split("\n")
    option_re = re.compile(r"^([A-Z])\.\s+(.+)$")

    cleaned = []
    options = []
    in_options = False
    for raw in lines:
        line = raw.rstrip()
        if line.startswith("# "):
            continue
        m = option_re.match(line.strip())
        if m and not in_options and not cleaned:
            in_options = True
        if m:
            options.append({"letter": m.group(1), "text": m.group(2).strip()})
            in_options = True
        elif in_options and not line.strip():
            continue
        elif in_options:
            in_options = False
            cleaned.append(line)
        else:
            cleaned.append(line)

    question_text = "\n".join(cleaned).strip()
    return question_text, options


def parse_references(answer_body):
    refs = []
    m = re.search(r"## Microsoft Learn references\s*\n(.*?)(?=\n##|\Z)", answer_body, re.DOTALL)
    if not m:
        return refs
    for line in m.group(1).split("\n"):
        line = line.strip()
        if not line.startswith("-"):
            continue
        line = line[1:].strip()
        url_m = re.search(r"https?://[^\s)]+", line)
        if not url_m:
            continue
        url = url_m.group(0).rstrip(".,;)")
        title = line.split(url)[0].strip()
        title = re.sub(r"[—–\-]+\s*$", "", title).strip()
        title = title.lstrip("[").rstrip("]").rstrip("(").strip()
        if not title:
            title = url
        refs.append({"title": title, "url": url})
    return refs


def detect_case_study(topic_num, question_num, q_body, a_body):
    """Return the case study company name, or None."""
    link_m = re.search(r"\[([^\]]*)\]\((case-study[^)]*\.md)\)", q_body)
    link_target = link_m.group(2) if link_m else None

    if link_target == "case-study-contoso.md":
        return "Contoso"
    if topic_num == 3:
        if 1 <= question_num <= 3:
            return "Fabrikam"
        if 39 <= question_num <= 42:
            return "Contoso"

    combined = q_body + "\n" + a_body
    for name in KNOWN_COMPANIES:
        if re.search(rf"\b{name}\b", combined):
            return name
    return None


def normalize_answer(raw):
    """Pull a short displayable answer from the frontmatter value."""
    if not raw:
        return ""
    val = raw.strip()
    if val.startswith('"') and val.endswith('"'):
        val = val[1:-1]
    return val


def main():
    questions = []
    for topic_num in (1, 2, 3):
        topic_dir = EXTRACTED / f"topic-{topic_num}"
        if not topic_dir.exists():
            continue
        for q_file in sorted(topic_dir.glob("q*.md")):
            if q_file.name.endswith("_answer.md"):
                continue
            ans_file = topic_dir / f"{q_file.stem}_answer.md"
            if not ans_file.exists():
                print(f"WARNING: no answer file for {q_file.relative_to(ROOT)}")
                continue

            q_text = q_file.read_text(encoding="utf-8")
            a_text = ans_file.read_text(encoding="utf-8")

            q_fm, q_body = parse_frontmatter(q_text)
            a_fm, a_body = parse_frontmatter(a_text)

            question_text, options = parse_question_body(q_body)
            qnum = int(q_fm.get("question", q_file.stem.lstrip("q")))
            qtype = q_fm.get("type", "multiple-choice").strip()
            cs_flag = q_fm.get("case_study", "false").strip().lower() == "true"
            case_study = detect_case_study(topic_num, qnum, q_body, a_body) if cs_flag else None

            answer_value = normalize_answer(a_fm.get("answer", ""))

            questions.append({
                "id": f"topic-{topic_num}/{q_file.stem}",
                "topic": topic_num,
                "question_number": qnum,
                "type": qtype,
                "case_study": case_study,
                "question_text": question_text,
                "options": options,
                "answer": answer_value,
                "explanation_md": a_body.strip(),
                "references": parse_references(a_body),
            })

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT, "w", encoding="utf-8") as f:
        json.dump(
            {"questions": questions, "total": len(questions)},
            f,
            indent=2,
            ensure_ascii=False,
        )

    by_topic = {}
    for q in questions:
        by_topic[q["topic"]] = by_topic.get(q["topic"], 0) + 1
    print(f"Wrote {len(questions)} questions to {OUTPUT.relative_to(ROOT)}")
    for t, n in sorted(by_topic.items()):
        print(f"  topic-{t}: {n}")


if __name__ == "__main__":
    main()
