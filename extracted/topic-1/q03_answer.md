---
topic: 1
question: 3
type: multiple-choice
case_study: false
answer: B
---

# Question 3 — Answer

**Correct answer: B. Map the field display names as business terms.**

## Why B is correct

For Copilot to interpret data in a Dataverse table that uses non-standard terminology and custom columns, it needs natural-language hints that connect business vocabulary to actual columns. Microsoft Learn's guidance on adding Dataverse tables as a knowledge source describes glossary terms and synonyms as the way to give the AI grounding context for column meaning. The lowest-effort approach is to map the existing field display names (which already describe the column in human-readable form) as the business terms Copilot uses when summarizing leads.

This minimizes administrative effort because:
- Display names already exist on every column.
- Mapping them as business terms avoids creating new metadata from scratch.
- Copilot Studio's Dataverse knowledge source uses this mapping to recognize user requests and return responses grounded in the table's columns.

## Why the other options are wrong

**A. Combine all the fields into one custom field** destroys data structure, breaks reporting, and is not how Copilot summarization works. Copilot summarizes by reading multiple columns, not one merged blob.

**C. Add the schema names as business terms** is the wrong source. Schema names (like `cr1f3_LeadValue`) are technical identifiers, not business terms. They make summaries less readable, not more.

**D. Create new business terms for each field** works but is more administrative effort than mapping existing display names. The question explicitly asks for the solution that minimizes administrative effort.

## Microsoft Learn references

- Add Dataverse tables as a knowledge source — https://learn.microsoft.com/microsoft-copilot-studio/knowledge-add-dataverse
- Improve copilot responses from Microsoft Dataverse — https://learn.microsoft.com/power-apps/maker/data-platform/data-platform-copilot
- Synonyms and glossary terms (Dataverse knowledge) — https://learn.microsoft.com/microsoft-copilot-studio/knowledge-add-dataverse#synonyms-and-glossary-terms
