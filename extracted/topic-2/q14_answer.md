---
topic: 2
question: 14
type: hotspot
case_study: false
answer: Define rules and constraints = Conversation topics; Automate a backend process = Microsoft Power Automate cloud flow
---

# Question 14 — Answer

**Correct answers:**
- Define rules and constraints: **Conversation topics**
- Automate a backend process: **Microsoft Power Automate cloud flow**

## Why these answers are correct

### Conversation topics define rules and constraints

Topics in Copilot Studio are deterministic conversational pathways. They let the maker define exactly what the agent must say, ask, and do, including conditions, branches, variables, and Power Fx expressions. They are the place where the rules and constraints the agent must follow are encoded.

From Microsoft Learn:

> "Topics let you design and control how Copilot responds to user interactions. You can use topics to define specific business logic that Copilot must follow when a topic is triggered."

> "With topics, you can: guide conversations by defining the sequence of dialogs, messages, tools, agents, and knowledge sources; implement complex workflows by controlling how Copilot responds at each step; use a low-code canvas to define logic and manage variables."

Agent flows are for nonconversational business-process automation. Power Automate cloud flows are general-purpose automation. Neither is the right primitive for defining the agent's conversational rules and constraints.

### Power Automate cloud flow for the backend data-movement process

The second requirement is a backend process that moves data between services and runs independently of the agent's reasoning. That description matches a Power Automate cloud flow.

From Microsoft Learn:

> "Cloud flows in Power Automate provide a flexible, low-code approach to automating workflows across various applications and services. They offer a wide range of connectors and actions to integrate with different systems and services. Cloud flows are designed for general automation scenarios and can be used independently or with agent flows to create end-to-end automation solutions."

A cloud flow can run on its own schedule or trigger, independent of the agent's reasoning steps. Conversation topics are conversational. Power Pages is a portal builder for external-facing websites and is not the right tool here.

## Microsoft Learn references

- Topics overview (Copilot Studio) — https://learn.microsoft.com/microsoft-copilot-studio/guidance/topics-overview
- Agent flows in Microsoft Copilot Studio FAQ — https://learn.microsoft.com/microsoft-copilot-studio/flows-faqs
- Plan and design integration strategies (cloud flows vs agent flows vs topics) — https://learn.microsoft.com/microsoft-copilot-studio/guidance/integrations
- Power Automate cloud flows overview — https://learn.microsoft.com/power-automate/overview-cloud
