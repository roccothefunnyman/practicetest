---
topic: 3
question: 15
type: drag-drop
case_study: false
answer: NRT telemetry = Application Insights; Download transcripts = Copilot Studio; Usage and performance = Copilot Studio
---

# Question 15 — Answer

**Correct answer:**
- **Monitor the agent's telemetry in NRT: Application Insights**
- **Download transcripts of full conversations: Copilot Studio**
- **Monitor the agent's usage and performance: Copilot Studio**

## Why these selections are correct

**Telemetry in near-real-time:** Microsoft Learn shows that Copilot Studio sends detailed telemetry (conversations, tool usage, exceptions, latency, custom events) to Application Insights, which is designed for near-real-time analysis through Live Metrics, Log Analytics, and the Copilot Studio Dashboard workbook. Application Insights is the integrated NRT signal source.

**Download transcripts of full conversations:** Conversation transcripts are stored in Dataverse and accessible from Copilot Studio. Microsoft Learn states: "You can download conversation transcripts a few minutes after the conversation times out... You can download them in Dataverse using the Power Apps portal and as session chat transcripts using the Copilot Studio app." Copilot Studio is the surface for downloading transcripts.

**Usage and performance:** The Analytics page in Copilot Studio aggregates usage metrics (sessions, engagement, resolution, escalation, savings, generated answer quality, themes). It is the maker-facing view for usage and performance.

Log Analytics could host the data behind Application Insights, but the question lists Application Insights as a separate option, and Log Analytics is not the labeled NRT entry point. Microsoft Power Apps is unrelated to agent monitoring.

## Microsoft Learn references

- Capture telemetry with Application Insights (Copilot Studio) — https://learn.microsoft.com/microsoft-copilot-studio/advanced-bot-framework-composer-capture-telemetry
- Download agent session transcripts — https://learn.microsoft.com/microsoft-copilot-studio/analytics-sessions
- Analytics overview (Copilot Studio) — https://learn.microsoft.com/microsoft-copilot-studio/analytics-overview
- Analyze conversational agent effectiveness — https://learn.microsoft.com/microsoft-copilot-studio/analytics-improve-agent-effectiveness
