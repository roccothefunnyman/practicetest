---
topic: 2
question: 22
type: drag-drop
case_study: false
answer: Default help when input is unclear = The Fallback topic; Initiate external processes = A tool (connector)
---

# Question 22 — Answer

**Correct answers:**
- Respond with a default help message when the user input is unclear: **The Fallback topic**
- Initiate external processes when requested: **A tool (connector)**

## Why these answers are correct

### Fallback topic for unclear input

From Microsoft Learn:

> "The Fallback system topic triggers when a Copilot Studio agent doesn't understand a user utterance and doesn't have enough confidence to trigger any of the existing topics."

> "If the agent can't determine the user's intent, it prompts the user again. After two prompts, the custom or Copilot agent escalates to a live representative through a system topic called Escalate."

The Fallback topic is the documented place to send a default help message when the user's input is unclear, even with generative orchestration enabled.

### A tool (connector) to initiate external processes

In Copilot Studio with generative orchestration enabled, tools are how the agent reaches out to external systems to perform actions, like retrieving an order status. Connectors register as tools the orchestrator can choose at runtime.

From Microsoft Learn:

> "Tools and connectors: External actions, APIs, or automation flows that the agent can call as part of a plan. Each tool has a defined interface: input parameters (with expected types), output variables, and possibly error conditions. They're essentially the agent's 'skills' for performing operations, such as looking up an order, sending an email, or running a script."

A trigger phrase is for classic orchestration topic routing, not for invoking external processes. The Escalate topic is for live-representative handoff. A skill is a Bot Framework pattern, not the Microsoft-recommended choice for new generative-orchestration designs that need to call connectors.

## Microsoft Learn references

- Use the Fallback topic — https://learn.microsoft.com/microsoft-copilot-studio/guidance/fallback-topic
- Configure the system fallback topic — https://learn.microsoft.com/microsoft-copilot-studio/authoring-system-fallback-topic
- Apply generative orchestration capabilities (tools and connectors) — https://learn.microsoft.com/microsoft-copilot-studio/guidance/generative-orchestration
- Use Power Platform connectors as tools — https://learn.microsoft.com/microsoft-copilot-studio/advanced-connectors
