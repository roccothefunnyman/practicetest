---
topic: 2
question: 6
type: multi-select
case_study: false
answer: B, E
---

# Question 6 — Answer

**Correct answers: B. Microsoft Copilot Studio and E. Customer engagement hub**

## Why B and E are correct

Microsoft's documented pattern for handing a Dynamics 365 Contact Center conversation off to a live customer service representative requires two pieces:

1. **The agent built in Microsoft Copilot Studio**, with the Escalate system topic (or a Transfer conversation node) configured. From Microsoft Learn:

> "When your customers need to speak with a representative, your agent can seamlessly hand off the conversation. When your agent hands off a conversation, it can share the full history of the conversation, and all relevant variables. Make sure you have an escalation article configured in your agent to hand off the conversation to a representative."

2. **A customer engagement hub** (such as Omnichannel for Customer Service in Dynamics 365 Contact Center) that receives the handoff and routes the conversation to a live representative. From Microsoft Learn:

> "An engagement hub that is being used by live agents, such as Omnichannel for Customer Service... you need to configure the connection, as described in Configure handoff to Omnichannel for Customer Service."

The agent emits the handoff event from Copilot Studio; the engagement hub catches it and connects the customer to a live representative.

## Why the other options are wrong

**A. Microsoft Foundry** is a developer platform for building, deploying, and scaling AI agents (prompt agents, workflow agents, hosted agents). It is not the Copilot Studio Contact Center handoff mechanism.

**C. Microsoft 365 Agents Toolkit** is a developer toolkit (formerly Teams Toolkit) used to build and ship custom agents for Microsoft 365 Copilot and Teams. It is not used to enable live-representative handoff in Dynamics 365 Contact Center.

**D. Azure AI Bot Service skill** is a Bot Framework skill pattern. While Copilot Studio does support skills, the standard Microsoft-recommended Contact Center handoff pattern is Copilot Studio plus an engagement hub, not an Azure AI Bot Service skill.

## Microsoft Learn references

- Hand off to a live agent (Copilot Studio) — https://learn.microsoft.com/microsoft-copilot-studio/advanced-hand-off
- Configure handoff to Omnichannel for Customer Service — https://learn.microsoft.com/microsoft-copilot-studio/configuration-hand-off-omnichannel
- Integrate a Copilot agent (Dynamics 365 Contact Center) — https://learn.microsoft.com/dynamics365/customer-service/administer/configure-bot-virtual-agent
- Channels and choosing an approach to enable handoff to a live agent — https://learn.microsoft.com/microsoft-copilot-studio/guidance/channels
