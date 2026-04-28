---
topic: 2
question: 27
type: multiple-choice
case_study: false
answer: B
---

# Question 27 — Answer

**Correct answer: B. No**

## Why No is correct

AI Builder lead scoring models predict lead-to-opportunity conversion likelihood. They produce a score and reasons for that score. They are not used to customize how Copilot in Dynamics 365 Sales generates or presents opportunity summaries.

The Microsoft-documented mechanisms for customizing opportunity summaries are:

- Configure summary fields and related-info sections in the Sales Hub Copilot settings, including which fields, sections (enriched key info, competitor insights, product insights, quote insights), and the opportunity summary widget.
- Extend Copilot in Dynamics 365 Sales through Copilot Studio (glossary, synonyms, topics).

From Microsoft Learn:

> "By default, Copilot uses a set of predefined fields to generate summaries, a list of recent changes for accounts, leads, and opportunities, and prepare for meetings. You can add other fields from lead, opportunity, account, and related tables to make the summaries and recent changes list more relevant for your business."

Lead scoring models do not influence opportunity summary generation. The proposed solution does not meet the goal.

## Microsoft Learn references

- Configure fields for generating summaries and recent changes — https://learn.microsoft.com/dynamics365/sales/copilot-configure-summary-fields
- Customize Copilot in Dynamics 365 Sales — https://learn.microsoft.com/dynamics365/sales/extend-copilot-chat
- AI Builder predictive lead scoring overview — https://learn.microsoft.com/dynamics365/sales/predictive-lead-scoring
- Summarize records with Copilot — https://learn.microsoft.com/dynamics365/sales/copilot-summarize-records
