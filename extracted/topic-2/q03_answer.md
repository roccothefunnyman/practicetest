---
topic: 2
question: 3
type: hotspot
case_study: true
answer: AI agent creation = Microsoft Copilot Studio; Unexpected AI agent actions = a Fallback topic
---

# Question 3 — Answer

**Correct answers:**
- For AI agent creation: **Microsoft Copilot Studio**
- For unexpected AI agent actions: **a Fallback topic**

## Why these answers are correct

### AI agent creation: Microsoft Copilot Studio

The case study calls for "low-code development to create a single AI agent that has Dataverse as its core component" and a hands-free voice experience for sales executives. Microsoft Copilot Studio is Microsoft's low-code authoring tool for building agents, and it includes the Voice template, Dataverse knowledge integration, and connectors required by Fabrikam.

From Microsoft Learn:

> "Copilot Studio is a graphical, low-code tool for building agents and agent flows."

Microsoft Foundry is code-first or developer-oriented. Dynamics 365 Sales doesn't author agents directly. The Power Platform admin center governs environments and capacity but does not author agents.

### Unexpected AI agent actions: a Fallback topic

The case study states: "Unexpected AI agent actions must end in an escalation to a live representative. For example, a sales executive must be rerouted to a representative if the agent cannot answer a question after two failed attempts." That is exactly the documented behavior of the system Fallback topic in Copilot Studio.

From Microsoft Learn:

> "If the agent can't determine the user's intent, it prompts the user again. After two prompts, the custom or Copilot agent escalates to a live representative through a system topic called Escalate."

> "Customize the fallback topic and behavior in the default system Fallback topic. A fallback topic triggers On Unknown Intent to capture the unrecognized input."

The Fallback topic is the built-in, configurable mechanism that handles unrecognized intent, prompts the user up to two times, and then redirects to the Escalate topic for live handoff. A custom connector, an event trigger, or a REST API are not the right primitives for this requirement.

## Microsoft Learn references

- Configure the system fallback topic — https://learn.microsoft.com/microsoft-copilot-studio/authoring-system-fallback-topic
- Topics in Copilot Studio (default system topics, including Fallback and Escalate) — https://learn.microsoft.com/microsoft-copilot-studio/guidance/topics-overview
- Copilot Studio overview — https://learn.microsoft.com/microsoft-copilot-studio/fundamentals-what-is-copilot-studio
- Hand off to a live agent (Escalate topic) — https://learn.microsoft.com/microsoft-copilot-studio/advanced-hand-off
