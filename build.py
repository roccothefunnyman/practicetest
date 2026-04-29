"""Build questions.json from the extracted/ markdown files.

Run from the practicetest/ folder:
    py build.py

Output: practicetest/app/questions.json
"""

import json
import re
from pathlib import Path

ROOT = Path(__file__).parent
EXTRACTED = ROOT / "extracted"
OUTPUT = ROOT / "app" / "questions.json"
CATEGORIES = ROOT / "app" / "categories.json"

KNOWN_COMPANIES = ["Fabrikam", "Contoso", "Adatum", "Litware", "Northwind", "Tailwind"]

# AB-100 official skills-measured domains.
# Source: https://learn.microsoft.com/credentials/certifications/resources/study-guides/ab-100
AB100_DOMAINS = {
    "plan":   {"label": "Plan",   "weight_pct_min": 25, "weight_pct_max": 30},
    "design": {"label": "Design", "weight_pct_min": 25, "weight_pct_max": 30},
    "deploy": {"label": "Deploy", "weight_pct_min": 40, "weight_pct_max": 45},
}


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


def strip_intro_chrome(intro):
    intro = re.sub(r"^#\s+Question\s+\d+\s*\n+", "", intro)
    intro = re.sub(r"^>\s+See\s+\[[^\]]*\]\([^)]*\)\s*\n+", "", intro)
    return intro.strip()


def strip_note_tail(text):
    return re.sub(r"\n*NOTE:[^\n]*", "", text).strip()


def parse_choice_body(body):
    body = strip_intro_chrome(body)
    option_re = re.compile(r"^([A-Z])\.\s+(.+)$", re.MULTILINE)
    matches = list(option_re.finditer(body))
    if not matches:
        return strip_note_tail(body), []
    intro = strip_note_tail(body[:matches[0].start()])
    options = [{"letter": m.group(1), "text": m.group(2).strip()} for m in matches]
    return intro, options


def parse_hotspot_body(body):
    body = strip_intro_chrome(body)
    aa = re.search(r"\*\*Answer Area\s*:?\*\*", body)
    if not aa:
        return strip_note_tail(body), []
    intro = strip_note_tail(body[:aa.start()])
    after = body[aa.end():]
    slots = []
    slot_re = re.compile(r"^-\s+(.+?):\s*\[\s*(.+?)\s*\]\s*$", re.MULTILINE)
    for m in slot_re.finditer(after):
        label = m.group(1).strip()
        options = [o.strip() for o in m.group(2).split("|")]
        slots.append({"label": label, "options": options})
    return intro, slots


def parse_dragdrop_body(body):
    body = strip_intro_chrome(body)
    src_m = re.search(r"\*\*Drag sources[^*]*\*\*", body)
    tgt_m = re.search(r"\*\*Drop targets[^*]*\*\*", body)
    if not (src_m and tgt_m):
        return strip_note_tail(body), [], []
    intro = strip_note_tail(body[:src_m.start()])
    sources_text = body[src_m.end():tgt_m.start()]
    targets_text = body[tgt_m.end():]

    sources = []
    for line in sources_text.split("\n"):
        s = line.strip()
        if s.startswith("-"):
            sources.append(s[1:].strip())

    targets = []
    target_re = re.compile(r"^\s*\d+\.\s+(.+?)\s*[—–\-]\s*drop here\s*$", re.MULTILINE)
    for m in target_re.finditer(targets_text):
        targets.append({"label": m.group(1).strip()})
    return intro, sources, targets


def parse_correct_answer_block(answer_body):
    """Parse the `**Correct answer:**` bullet list.

    Handles two formats produced by different sub-agents:
      A) `- LABEL: **PICK**`
      B) `- **LABEL: PICK**`
    """
    m = re.search(r"\*\*Correct\s+answers?\s*:?\*\*", answer_body, re.IGNORECASE)
    if not m:
        return []
    after = answer_body[m.end():]
    next_h2 = re.search(r"\n##\s", after)
    if next_h2:
        after = after[:next_h2.start()]

    out = []
    for raw in after.split("\n"):
        s = raw.strip()
        if not s.startswith("-"):
            continue
        s = re.sub(r"^-\s*", "", s)
        s = s.replace("**", "").strip()
        if ":" not in s:
            continue
        label, _, pick = s.partition(":")
        label = label.strip()
        pick = pick.strip().rstrip(".").strip()
        if label and pick:
            out.append({"label": label, "pick": pick})
    return out


def normalize_for_match(s):
    return re.sub(r"\s+", " ", s.lower().strip().rstrip("."))


def attach_correct_to_slots(slots, correct_pairs):
    if not correct_pairs:
        return slots
    by_label = {normalize_for_match(p["label"]): p["pick"] for p in correct_pairs}
    correct_in_order = [p["pick"] for p in correct_pairs]
    for i, slot in enumerate(slots):
        key = normalize_for_match(slot["label"])
        pick = by_label.get(key)
        if pick is None and i < len(correct_in_order):
            pick = correct_in_order[i]
        slot["correct"] = pick
        if pick:
            opt_match = next(
                (
                    o for o in slot["options"]
                    if normalize_for_match(o) == normalize_for_match(pick)
                ),
                None,
            )
            if opt_match:
                slot["correct"] = opt_match
    return slots


def attach_correct_to_targets(targets, correct_pairs, sources):
    if not correct_pairs:
        return targets
    by_label = {normalize_for_match(p["label"]): p["pick"] for p in correct_pairs}
    correct_in_order = [p["pick"] for p in correct_pairs]
    for i, tgt in enumerate(targets):
        key = normalize_for_match(tgt["label"])
        pick = by_label.get(key)
        if pick is None and i < len(correct_in_order):
            pick = correct_in_order[i]
        if pick:
            src_match = next(
                (
                    s for s in sources
                    if normalize_for_match(s) == normalize_for_match(pick)
                ),
                None,
            )
            tgt["correct"] = src_match or pick
        else:
            tgt["correct"] = None
    return targets


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


def parse_letters(answer_str):
    if not answer_str:
        return []
    letters = re.findall(r"\b[A-Z]\b", answer_str)
    seen = []
    for l in letters:
        if l not in seen:
            seen.append(l)
    return seen


def normalize_answer(raw):
    if not raw:
        return ""
    val = raw.strip()
    if val.startswith('"') and val.endswith('"'):
        val = val[1:-1]
    return val


def load_categories():
    if not CATEGORIES.exists():
        return {}
    with open(CATEGORIES, "r", encoding="utf-8") as f:
        return json.load(f)


def main():
    categories = load_categories()
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

            qnum = int(q_fm.get("question", q_file.stem.lstrip("q")))
            qtype = q_fm.get("type", "multiple-choice").strip()
            cs_flag = q_fm.get("case_study", "false").strip().lower() == "true"
            case_study = detect_case_study(topic_num, qnum, q_body, a_body) if cs_flag else None
            answer_value = normalize_answer(a_fm.get("answer", ""))

            qid = f"topic-{topic_num}/{q_file.stem}"
            record = {
                "id": qid,
                "topic": topic_num,
                "question_number": qnum,
                "type": qtype,
                "case_study": case_study,
                "category": categories.get(qid),
                "answer": answer_value,
                "explanation_md": a_body.strip(),
                "references": parse_references(a_body),
            }

            if qtype in ("multiple-choice", "multi-select"):
                intro, options = parse_choice_body(q_body)
                record["question_text"] = intro
                record["options"] = options
                record["correct_letters"] = parse_letters(answer_value)
            elif qtype == "hotspot":
                intro, slots = parse_hotspot_body(q_body)
                correct_pairs = parse_correct_answer_block(a_body)
                slots = attach_correct_to_slots(slots, correct_pairs)
                record["question_text"] = intro
                record["options"] = []
                record["slots"] = slots
            elif qtype == "drag-drop":
                intro, sources, targets = parse_dragdrop_body(q_body)
                correct_pairs = parse_correct_answer_block(a_body)
                targets = attach_correct_to_targets(targets, correct_pairs, sources)
                record["question_text"] = intro
                record["options"] = []
                record["sources"] = sources
                record["targets"] = targets
            else:
                intro, options = parse_choice_body(q_body)
                record["question_text"] = intro
                record["options"] = options

            questions.append(record)

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT, "w", encoding="utf-8") as f:
        json.dump(
            {
                "questions": questions,
                "total": len(questions),
                "domains": AB100_DOMAINS,
            },
            f,
            indent=2,
            ensure_ascii=False,
        )

    by_type = {}
    by_cat = {}
    uncategorized = []
    incomplete = []
    for q in questions:
        by_type[q["type"]] = by_type.get(q["type"], 0) + 1
        cat = q.get("category")
        if cat:
            by_cat[cat] = by_cat.get(cat, 0) + 1
        else:
            uncategorized.append(q["id"])
        if q["type"] == "hotspot" and any(s.get("correct") is None for s in q.get("slots", [])):
            incomplete.append(q["id"] + " (hotspot missing correct)")
        if q["type"] == "drag-drop" and any(t.get("correct") is None for t in q.get("targets", [])):
            incomplete.append(q["id"] + " (drag-drop missing correct)")
        if q["type"] == "multi-select" and not q.get("correct_letters"):
            incomplete.append(q["id"] + " (multi-select missing letters)")

    print(f"Wrote {len(questions)} questions to {OUTPUT.relative_to(ROOT)}")
    for t, n in sorted(by_type.items()):
        print(f"  {t}: {n}")
    if by_cat:
        total = sum(by_cat.values())
        print("\nAB-100 domain distribution:")
        for code in ("plan", "design", "deploy"):
            n = by_cat.get(code, 0)
            pct = (n / total * 100) if total else 0
            print(f"  {code}: {n} ({pct:.1f}%)")
    if uncategorized:
        print(f"\n{len(uncategorized)} uncategorized question(s) (add to app/categories.json):")
        for qid in uncategorized:
            print(f"  - {qid}")
    if incomplete:
        print("\nIncomplete records:")
        for line in incomplete:
            print(f"  - {line}")


if __name__ == "__main__":
    main()