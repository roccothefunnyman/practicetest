---
topic: 3
question: 17
type: multi-select
case_study: false
answer: C, E
---

# Question 17 — Answer

**Correct answer: C. topic usage and topics with low resolution and E. quality of generated answers**

## Why C and E are correct

The agent draws on a knowledge base, and users report inaccurate answers. Two Analytics signals point at the cause.

**Topic usage and topics with low resolution** identifies topics that route a high share of sessions into unresolved or escalated outcomes. Microsoft Learn lists "Topics with low resolution" among the optimization metrics to focus on monthly: "Resolution rate for an individual topic." A low resolution rate on a specific topic typically means the topic's logic, knowledge mapping, or grounding has gaps, which directly correlates with inaccurate answers.

**Quality of generated answers** measures whether the AI-generated responses are good. Microsoft Learn describes the Generated answer rate and quality section: "Copilot Studio looks at a sample set of answered questions and analyzes different quality, including completeness, relevance, and level of groundedness of a response. If the answer meets a set standard, Copilot Studio labels the answer as Good quality." The "Poor" reasons (irrelevant, incomplete, ungrounded) explain why answers are inaccurate and identify which knowledge sources are responsible.

## Why the other options are wrong

**A. Survey results** capture user satisfaction (CSAT) but do not tell you why an answer was wrong.

**B. Session information and session outcomes** show whether sessions resolved, escalated, or were abandoned. They do not isolate inaccuracy in a specific knowledge-grounded answer.

**D. Engagement, resolution, and escalation rates** are top-line KPIs. They show that something is wrong but not which topic or knowledge source produced the inaccurate answer.

## Microsoft Learn references

- Analyze conversational agent effectiveness (Generated answer rate and quality) — https://learn.microsoft.com/microsoft-copilot-studio/analytics-improve-agent-effectiveness
- Measure and improve agent performance with KPIs and analytics — https://learn.microsoft.com/microsoft-copilot-studio/guidance/analytics
- Analyze topic usage in Copilot Studio — https://learn.microsoft.com/microsoft-copilot-studio/analytics-topic-details
- Topic escalation analysis — https://learn.microsoft.com/microsoft-copilot-studio/guidance/deflection-topic-escalation-analysis
