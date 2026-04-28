---
topic: 2
question: 26
type: multiple-choice
case_study: false
answer: B
---

# Question 26 — Answer

**Correct answer: B. No**

## Why No is correct

Power Automate flows automate business processes and can update records, send notifications, and orchestrate connector actions. They do not customize how Copilot in Dynamics 365 Sales generates or presents opportunity summaries.

The Microsoft-documented way to tailor opportunity summary generation and presentation is to configure summary fields (and related-info sections) in the Sales Hub Copilot settings, or extend Copilot through Copilot Studio with glossary, synonyms, and topic-level customization.

From Microsoft Learn:

> "By default, Copilot uses a set of predefined fields to generate summaries... You can add other fields from lead, opportunity, account, and related tables to make the summaries and recent changes list more relevant for your business."

A Power Automate flow doesn't change which fields Copilot uses for summary generation, doesn't reshape the summary widget, and isn't a documented mechanism for customizing the opportunity summary. The proposed solution does not meet the goal.

## Microsoft Learn references

- Configure fields for generating summaries and recent changes — https://learn.microsoft.com/dynamics365/sales/copilot-configure-summary-fields
- Summarize records with Copilot — https://learn.microsoft.com/dynamics365/sales/copilot-summarize-records
- Customize Copilot in Dynamics 365 Sales — https://learn.microsoft.com/dynamics365/sales/extend-copilot-chat
- FAQ about Copilot in Dynamics 365 Sales — https://learn.microsoft.com/dynamics365/sales/sales-copilot-faq
