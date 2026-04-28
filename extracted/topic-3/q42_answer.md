---
topic: 3
question: 42
type: drag-drop
case_study: true
answer: CFO = Use; CTO = Satisfaction
---

# Question 42 — Answer

**Correct answer:**
- **CFO concerns about Copilot Studio credit usage: Use**
- **CTO concerns about poor feedback on AI agent responses: Satisfaction**

## Why these selections are correct

**CFO and the Use metric:** The case study states the CFO "wants to identify how many interactions with the AI agents are abandoned on a given day as compared to resolved conversations. Too many abandoned sessions might indicate that Copilot Studio credits are being used inefficiently by end users." The Copilot Studio Analytics page exposes a Use section that surfaces session and run volume and outcomes, and the Conversation outcomes view inside Use shows resolved versus abandoned counts. That is the metric category for tracking credit usage efficiency tied to session outcomes.

**CTO and the Satisfaction metric:** The case study says the CTO "wants to track user feedback on the quality of the AI agent responses during user interactions with the agents. Consistently poor feedback will trigger an escalated reengineering discussion." The Analytics page's Satisfaction (Effectiveness) section captures CSAT, sentiment, reactions (thumbs up/down), and user comments. That is the surface that reflects user feedback on response quality.

Effectiveness in Analytics aggregates user reactions and survey results, so it overlaps with Satisfaction, but the named Satisfaction metric is the cleanest match for "track user feedback on the quality of agent responses." Tool use measures tool invocations and is unrelated to either question.

## Microsoft Learn references

- Analytics overview (Use, Satisfaction, Effectiveness sections) — https://learn.microsoft.com/microsoft-copilot-studio/analytics-overview
- Analyze conversational agent effectiveness (Conversation outcomes, Effectiveness, Satisfaction) — https://learn.microsoft.com/microsoft-copilot-studio/analytics-improve-agent-effectiveness
- Deflection overview (Resolution, Escalation, and Abandon rates) — https://learn.microsoft.com/microsoft-copilot-studio/guidance/deflection-overview
- Analyze time and cost savings for agents — https://learn.microsoft.com/microsoft-copilot-studio/analytics-cost-savings
