---
topic: 3
question: 1
type: multiple-choice
case_study: true
answer: C
---

# Question 1 — Answer

**Correct answer: C. Application Insights**

## Why C is correct

The case study describes a single low-code Copilot Studio agent grounded in Dataverse. Two requirements steer the answer:

1. "Detailed telemetry must be logged for the first created AI agent to help troubleshoot and optimize the agent during the initial AI agent adoption process."
2. "Any sensitive information, such as user IDs and names, shared via the AI agent must be tracked for future auditing."

Application Insights is the integrated telemetry option for Copilot Studio agents. Microsoft Learn shows that Copilot Studio captures detailed telemetry (conversations, exceptions, tool usage, latency, custom events) into Application Insights, and the Copilot Studio dashboard workbook in Application Insights surfaces those signals for troubleshooting and optimization. That telemetry is queryable in Log Analytics, which gives auditors the durable, indexable trail needed to track who shared which sensitive values with the agent.

## Why the other options are wrong

**A. The Analytics tab in Microsoft Copilot Studio** shows aggregate KPIs (engagement, resolution, escalation, CSAT, generated answer quality). It does not capture per-message telemetry suitable for auditing sensitive information at the user level.

**B. Model Context Protocol (MCP)** is an open protocol for connecting agents to external tools and data sources. It is not an audit or telemetry tool.

**D. Microsoft Foundry Tracing UI** traces Microsoft Foundry agents (prompt, hosted, workflow agents) using OpenTelemetry. The Fabrikam agent is built in Copilot Studio with Dataverse, so Foundry Tracing UI is not the integrated telemetry surface for it.

**E. Monitoring in Microsoft Foundry** also targets Foundry agents and Foundry-hosted models. It is not the path for a Copilot Studio agent.

## Microsoft Learn references

- Capture telemetry with Application Insights (Copilot Studio) — https://learn.microsoft.com/microsoft-copilot-studio/advanced-bot-framework-composer-capture-telemetry
- Audit Copilot Studio activities in Microsoft Purview — https://learn.microsoft.com/microsoft-copilot-studio/admin-logging-copilot-studio
- Analytics overview for Copilot Studio — https://learn.microsoft.com/microsoft-copilot-studio/analytics-overview
