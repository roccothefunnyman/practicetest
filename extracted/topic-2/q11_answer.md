---
topic: 2
question: 11
type: multiple-choice
case_study: false
answer: E
---

# Question 11 — Answer

**Correct answer: E. Configure the Escalate topic.**

## Why E is correct

When integrating a Copilot agent with a Dynamics 365 Contact Center chat channel, the documented Microsoft pattern for handing the conversation off to a live representative on customer request is to configure the Escalate system topic. The Escalate topic is what triggers the handoff to the connected engagement hub (Dynamics 365 Contact Center, Customer Service, or Omnichannel for Customer Service).

From Microsoft Learn:

> "The Escalate topic is used to hand off the conversation to an external system, typically to a live service representative (when configured—for example to Omnichannel for Customer Service). When this topic is reached, the session outcome is escalated."

> "When you create an agent from Dynamics 365 Customer Service, the Escalate system topic already includes a Transfer conversation node. However, agents created in Copilot Studio aren't configured with this node by default. To add a Transfer conversation node to the Escalate system topic... go to Topics > System tab > Escalate, then add Topic Management > Transfer conversation."

That is the exact requirement: respond to questions and escalate to a live representative on request.

## Why the other options are wrong

**A. Build an agent flow.** Agent flows automate business processes through deterministic steps. They aren't the mechanism that hands the chat off to a live representative.

**B. Configure the Conversation Start topic.** Conversation Start fires at the beginning of the conversation. It greets the user, but it doesn't initiate live-representative handoff on escalation request.

**C. Configure a skill.** Bot Framework skills are reusable conversational components. They aren't the supported handoff mechanism for Dynamics 365 Contact Center; the documented mechanism is Escalate plus a Transfer conversation node.

**D. Call a Microsoft Power Automate connector.** Calling a connector can perform automation, but it isn't how Copilot Studio routes a conversation to a live customer service representative in Dynamics 365 Contact Center.

## Microsoft Learn references

- Hand off to a live agent (Escalate system topic, Transfer conversation node) — https://learn.microsoft.com/microsoft-copilot-studio/advanced-hand-off
- Topics in Copilot Studio (Escalate system topic) — https://learn.microsoft.com/microsoft-copilot-studio/guidance/topics-overview
- Configure handoff to Omnichannel for Customer Service — https://learn.microsoft.com/microsoft-copilot-studio/configuration-hand-off-omnichannel
- Integrate a Copilot agent (Dynamics 365 Contact Center) — https://learn.microsoft.com/dynamics365/customer-service/administer/configure-bot-virtual-agent
