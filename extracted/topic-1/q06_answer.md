---
topic: 1
question: 6
type: multiple-choice
case_study: false
answer: A
---

# Question 6 — Answer

**Correct answer: A. Microsoft Copilot Studio skills**

## Why A is correct

The requirement is that **Microsoft 365 Copilot must invoke external logic hosted in Azure services**. Microsoft Copilot Studio skills are designed for exactly this scenario. Microsoft Learn's "Use skills in Copilot Studio" article describes skills as a way to extend an agent by embedding bots or services built with pro-code tools (including the Microsoft 365 Agents SDK and Bot Framework, hosted in Azure) into the agent. A skill becomes a callable capability the agent can invoke from a topic, and the Copilot Studio agent can then be published as a Microsoft 365 Copilot agent that surfaces that skill to Microsoft 365 Copilot.

This pattern lets Microsoft 365 Copilot reach Azure-hosted code (a registered skill) through a Copilot Studio agent, which is how Microsoft documents extending Microsoft 365 Copilot with external logic from Azure services.

## Why the other options are wrong

**B. Microsoft Power Platform connectors** integrate with REST APIs and SaaS services. They are useful for data and action calls, but the option that specifically describes extending Copilot agents with externally hosted bot/agent logic (the typical pattern for "external logic in Azure services") is skills. Connectors are a more generic integration mechanism and not the canonical answer for invoking external Azure-hosted logic from Microsoft 365 Copilot.

**C. Custom engine agents** are built using the Microsoft 365 Agents SDK (or similar) and replace Microsoft 365 Copilot's built-in orchestration with your own engine. They are a different extensibility model and aren't the mechanism Microsoft Learn describes for letting Microsoft 365 Copilot invoke external Azure-hosted logic from within the standard Copilot orchestration.

## Microsoft Learn references

- Use skills in Copilot Studio — https://learn.microsoft.com/microsoft-copilot-studio/advanced-use-skills
- Microsoft 365 Copilot extensibility overview — https://learn.microsoft.com/microsoft-365-copilot/extensibility/
- Skills (Bot Framework / Microsoft 365 Agents SDK) — https://learn.microsoft.com/azure/bot-service/skill-pva
