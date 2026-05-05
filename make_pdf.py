"""Render app/questions.json into a printable PDF study sheet.

Run from the practicetest/ folder:
    py make_pdf.py

Output: practicetest/docs/AB-100-Practice-Questions.pdf

Each question is laid out with its stem and answer choices, followed by the
correct answer and the full explanation grounded in Microsoft Learn. Question
types covered: multiple-choice, multi-select, hotspot, drag-drop.
"""

import json
import re
from datetime import date
from html import escape
from pathlib import Path

import markdown as md
from fpdf import FPDF

ROOT = Path(__file__).parent
QUESTIONS_JSON = ROOT / "app" / "questions.json"
OUTPUT_PDF = ROOT / "docs" / "AB-100-Practice-Questions.pdf"

DOMAIN_LABEL = {"plan": "Plan", "design": "Design", "deploy": "Deploy"}
TYPE_LABEL = {
    "multiple-choice": "Multiple choice",
    "multi-select": "Multi-select",
    "hotspot": "Hotspot",
    "drag-drop": "Drag and drop",
    "yes-no-series": "Yes/No series",
}


class StudyPDF(FPDF):
    def __init__(self):
        super().__init__(orientation="P", unit="mm", format="A4")
        self.set_auto_page_break(auto=True, margin=18)
        self.set_margins(left=18, top=18, right=18)
        self.alias_nb_pages()
        self.title_text = "AB-100 Practice Questions"
        self.section_label = ""

    def header(self):
        if self.page_no() == 1:
            return
        self.set_y(8)
        self.set_font("Helvetica", "", 8)
        self.set_text_color(110, 110, 110)
        # Title left, section label right, both on the same row.
        content_w = self.w - self.l_margin - self.r_margin
        self.set_x(self.l_margin)
        self.cell(content_w / 2, 5, self.title_text, align="L")
        self.cell(content_w / 2, 5, self.section_label or "", align="R")
        # Thin rule under the header.
        self.set_draw_color(220, 220, 220)
        self.set_line_width(0.2)
        self.line(self.l_margin, 14, self.w - self.r_margin, 14)
        self.set_text_color(0, 0, 0)
        # Leave the cursor at the top margin so body content starts cleanly.
        self.set_xy(self.l_margin, self.t_margin)

    def footer(self):
        if self.page_no() == 1:
            return
        self.set_y(-12)
        self.set_font("Helvetica", "", 8)
        self.set_text_color(120, 120, 120)
        self.cell(0, 6, f"Page {self.page_no()} / {{nb}}", align="C")
        self.set_text_color(0, 0, 0)


def sanitize(text):
    """fpdf2 with the built-in Helvetica font is latin-1 only; replace common
    typographic glyphs that show up in the answer files with safe equivalents."""
    if not text:
        return ""
    replacements = {
        "—": "-",   # em dash
        "–": "-",   # en dash
        "‘": "'",
        "’": "'",
        "“": '"',
        "”": '"',
        "…": "...",
        "•": "*",
        " ": " ",
        "→": "->",
        "←": "<-",
        "✓": "(check)",
        "✗": "(x)",
    }
    for src, dst in replacements.items():
        text = text.replace(src, dst)
    # Drop anything still outside latin-1.
    return text.encode("latin-1", "replace").decode("latin-1")


def md_to_html(text):
    html = md.markdown(text, extensions=["extra"])
    # fpdf2's write_html does not understand <h1>; map headings to the levels it
    # supports. We treat the leading "# Question N - Answer" as already covered
    # by the question header, so strip it.
    html = re.sub(r"<h1>.*?</h1>\s*", "", html, count=1, flags=re.DOTALL)
    return sanitize(html)


def mcell(pdf, text, line_h=5.0):
    """multi_cell wrapper that always returns the cursor to the left margin so
    subsequent width-zero cells get the full content width."""
    pdf.multi_cell(0, line_h, sanitize(text), new_x="LMARGIN", new_y="NEXT")


def write_text(pdf, text, font="Helvetica", style="", size=10.5, line_h=5.0):
    pdf.set_font(font, style, size)
    mcell(pdf, text, line_h)


def cover_page(pdf, total, by_type, by_cat):
    pdf.add_page()
    pdf.set_y(60)
    pdf.set_font("Helvetica", "B", 26)
    pdf.cell(0, 14, "AB-100 Practice Questions", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 14)
    pdf.cell(0, 8, "Agentic AI Business Solutions Architect", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(4)
    pdf.set_font("Helvetica", "", 11)
    pdf.cell(0, 6, f"Generated {date.today().isoformat()}", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 6, f"{total} questions, with answers and explanations", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(14)

    pdf.set_font("Helvetica", "B", 12)
    pdf.cell(0, 7, "Question types", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 11)
    for t, n in sorted(by_type.items()):
        label = TYPE_LABEL.get(t, t)
        pdf.cell(0, 6, f"  {label}: {n}", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(4)

    pdf.set_font("Helvetica", "B", 12)
    pdf.cell(0, 7, "AB-100 domain coverage", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 11)
    total_cat = sum(by_cat.values()) or 1
    for code in ("plan", "design", "deploy"):
        n = by_cat.get(code, 0)
        pct = n / total_cat * 100
        pdf.cell(0, 6, f"  {DOMAIN_LABEL[code]}: {n} ({pct:.1f}%)", new_x="LMARGIN", new_y="NEXT")

    pdf.ln(10)
    pdf.set_font("Helvetica", "I", 9)
    pdf.set_text_color(110, 110, 110)
    pdf.multi_cell(
        0, 5,
        sanitize(
            "Source: practicetest/extracted/. Each answer references Microsoft Learn. "
            "Use this PDF for offline review; the interactive version lives at app/index.html."
        ),
    )
    pdf.set_text_color(0, 0, 0)


def topic_separator(pdf, topic_num, count):
    pdf.add_page()
    pdf.set_y(50)
    pdf.set_font("Helvetica", "B", 22)
    pdf.cell(0, 12, f"Topic {topic_num}", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 12)
    pdf.cell(0, 7, f"{count} questions", align="C", new_x="LMARGIN", new_y="NEXT")


def question_header(pdf, q):
    qid = q["id"]
    qnum = q["question_number"]
    parts = [TYPE_LABEL.get(q["type"], q["type"])]
    if q.get("category"):
        parts.append(f"Domain: {DOMAIN_LABEL.get(q['category'], q['category'])}")
    if q.get("case_study"):
        parts.append(f"Case study: {q['case_study']}")
    meta = " | ".join(parts)

    pdf.set_font("Helvetica", "B", 14)
    pdf.cell(0, 8, sanitize(f"Topic {q['topic']} - Question {qnum}"), new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "I", 9)
    pdf.set_text_color(100, 100, 100)
    pdf.cell(0, 5, sanitize(meta), new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 5, sanitize(qid), new_x="LMARGIN", new_y="NEXT")
    pdf.set_text_color(0, 0, 0)
    pdf.ln(2)


def render_question_body(pdf, q):
    qtype = q["type"]
    stem = q.get("question_text", "").strip()
    if stem:
        write_text(pdf, stem)
        pdf.ln(2)

    if qtype in ("multiple-choice", "multi-select"):
        for opt in q.get("options", []):
            pdf.set_font("Helvetica", "B", 10.5)
            pdf.cell(7, 5, sanitize(f"{opt['letter']}."))
            pdf.set_font("Helvetica", "", 10.5)
            x_after_letter = pdf.get_x()
            avail = pdf.w - pdf.r_margin - x_after_letter
            pdf.multi_cell(avail, 5, sanitize(opt["text"]), new_x="LMARGIN", new_y="NEXT")
        if qtype == "multi-select":
            pdf.ln(1)
            pdf.set_font("Helvetica", "I", 9)
            pdf.set_text_color(100, 100, 100)
            pdf.cell(0, 5, "Select all that apply.", new_x="LMARGIN", new_y="NEXT")
            pdf.set_text_color(0, 0, 0)

    elif qtype == "hotspot":
        pdf.set_font("Helvetica", "B", 10.5)
        pdf.cell(0, 5, "Answer area", new_x="LMARGIN", new_y="NEXT")
        for slot in q.get("slots", []):
            pdf.set_font("Helvetica", "B", 10.5)
            mcell(pdf, f"- {slot['label']}:")
            pdf.set_font("Helvetica", "", 10.5)
            for o in slot["options"]:
                mcell(pdf, f"    [ ] {o}")

    elif qtype == "drag-drop":
        pdf.set_font("Helvetica", "B", 10.5)
        pdf.cell(0, 5, "Drag sources", new_x="LMARGIN", new_y="NEXT")
        pdf.set_font("Helvetica", "", 10.5)
        for s in q.get("sources", []):
            mcell(pdf, f"  - {s}")
        pdf.ln(1)
        pdf.set_font("Helvetica", "B", 10.5)
        pdf.cell(0, 5, "Drop targets", new_x="LMARGIN", new_y="NEXT")
        pdf.set_font("Helvetica", "", 10.5)
        for i, t in enumerate(q.get("targets", []), 1):
            mcell(pdf, f"  {i}. {t['label']} - drop here")

    else:
        # yes-no-series or anything else: dump the stem only.
        pass


def render_answer(pdf, q):
    pdf.ln(3)
    pdf.set_draw_color(180, 180, 180)
    pdf.set_line_width(0.2)
    y = pdf.get_y()
    pdf.line(pdf.l_margin, y, pdf.w - pdf.r_margin, y)
    pdf.ln(3)

    pdf.set_font("Helvetica", "B", 12)
    pdf.set_text_color(20, 90, 40)
    pdf.cell(0, 7, "Answer", new_x="LMARGIN", new_y="NEXT")
    pdf.set_text_color(0, 0, 0)

    # Short-form answer line, if any.
    short = q.get("answer", "").strip()
    if short:
        pdf.set_font("Helvetica", "B", 10.5)
        mcell(pdf, short)
        pdf.ln(1)

    explanation = q.get("explanation_md", "").strip()
    if explanation:
        # Strip the redundant first heading and leading "**Correct answer**" line
        # since we already render the short answer above.
        body = re.sub(r"^#\s+Question\s+\d+[^\n]*\n+", "", explanation)
        html = md_to_html(body)
        pdf.set_font("Helvetica", "", 10.5)
        try:
            pdf.write_html(html, tag_styles=None)
            # write_html leaves the cursor mid-line; force it back to the margin.
            pdf.ln(2)
            pdf.set_x(pdf.l_margin)
        except Exception:
            # Fallback to plain text if write_html chokes on something.
            plain = re.sub(r"<[^>]+>", "", html)
            mcell(pdf, plain)


def render_question(pdf, q):
    # Try to keep the question header + stem on the same page; if not enough
    # room, push to a new page.
    if pdf.get_y() > pdf.h - pdf.b_margin - 60:
        pdf.add_page()

    question_header(pdf, q)
    render_question_body(pdf, q)
    render_answer(pdf, q)
    pdf.ln(6)


def main():
    if not QUESTIONS_JSON.exists():
        raise SystemExit(f"Missing {QUESTIONS_JSON}. Run `py build.py` first.")

    data = json.loads(QUESTIONS_JSON.read_text(encoding="utf-8"))
    questions = data["questions"]

    by_type = {}
    by_cat = {}
    for q in questions:
        by_type[q["type"]] = by_type.get(q["type"], 0) + 1
        if q.get("category"):
            by_cat[q["category"]] = by_cat.get(q["category"], 0) + 1

    pdf = StudyPDF()
    pdf.set_title("AB-100 Practice Questions")
    pdf.set_author("practicetest")

    cover_page(pdf, len(questions), by_type, by_cat)

    by_topic = {}
    for q in questions:
        by_topic.setdefault(q["topic"], []).append(q)
    for t in by_topic:
        by_topic[t].sort(key=lambda x: x["question_number"])

    for topic in sorted(by_topic.keys()):
        topic_qs = by_topic[topic]
        pdf.section_label = f"Topic {topic}"
        topic_separator(pdf, topic, len(topic_qs))
        for i, q in enumerate(topic_qs):
            pdf.section_label = f"Topic {topic} - Q{q['question_number']}"
            if i == 0:
                pdf.add_page()
            render_question(pdf, q)

    OUTPUT_PDF.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(str(OUTPUT_PDF))
    size_kb = OUTPUT_PDF.stat().st_size / 1024
    print(f"Wrote {OUTPUT_PDF.relative_to(ROOT)} ({size_kb:.1f} KB, {len(questions)} questions)")


if __name__ == "__main__":
    main()
