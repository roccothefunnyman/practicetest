---
topic: 3
question: 4
type: multiple-choice
case_study: false
answer: B
---

# Question 4 — Answer

**Correct answer: B. Create a connection to Microsoft Foundry in the agent.**

## Why B is correct

Copilot Studio supports invoking custom Microsoft Foundry models through a native connection to Azure AI Foundry. Microsoft Learn's "Bring your own model for your prompts" article shows the pattern: in the prompt configuration, select the Model field, choose the plus sign to "connect to a model from Azure AI Foundry," and enter the deployment and base model names. The connection authenticates and routes invocations securely to the Foundry-hosted model. The same path is used to attach Foundry agents through the "Add an agent" dialog with a Microsoft Foundry connection.

## Why the other options are wrong

**A. Configure the agent to use classic orchestration.** Classic orchestration controls how topics are matched (deterministic vs. generative). It does not establish secure connectivity to a Foundry-hosted model.

**C. Add the Microsoft Foundry model as a Copilot Studio skill.** Skills are bot-to-bot integration patterns from Bot Framework. The current, supported integration for Foundry models is the Azure AI Foundry connection in prompt builder, not a skill registration.

**D. Create a custom engine agent.** Custom engine agents are pro-code agents (Teams AI, Microsoft 365 Agents SDK, Foundry SDK) that bring your own model and orchestrator. The question is about a Copilot Studio agent calling a Foundry model, not replacing the Copilot Studio engine.

## Microsoft Learn references

- Bring your own model for your prompts (Copilot Studio + Azure AI Foundry) — https://learn.microsoft.com/microsoft-copilot-studio/bring-your-own-model-prompts
- Connect to a Microsoft Foundry agent (preview) — https://learn.microsoft.com/microsoft-copilot-studio/add-agent-foundry-agent
- Use your own generative AI model from Azure AI Foundry in prompt builder — https://learn.microsoft.com/power-platform/release-plan/2025wave1/ai-builder/use-own-generative-ai-model-azure-ai-foundry-prompt-builder
