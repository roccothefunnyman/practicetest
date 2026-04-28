---
topic: 1
question: 27
type: hotspot
case_study: false
answer: Agent1 = Microsoft Foundry; Agent2 = Copilot in Power Apps
---

# Question 27 — Answer

**Correct answer:**
- Agent1: **Microsoft Foundry**
- Agent2: **Copilot in Power Apps**

## Why these answers are correct

Agent1 must be extendable using the **Semantic Kernel** and connect to multiple business apps and APIs. Microsoft Foundry (Azure AI Foundry / Microsoft Foundry Agent Service) is the pro-code agent platform that integrates natively with Semantic Kernel and the Microsoft Agent Framework. Microsoft Learn's Semantic Kernel documentation, the "Connect to a Microsoft Foundry agent" article, and the Foundry Agent transparency note describe Foundry as the place to build agents that can be orchestrated via Semantic Kernel and that integrate with broad sets of APIs, tools, and connectors. That is the natural fit for Agent1.

Agent2 must connect directly to Dataverse data and be **embeddable in a Microsoft Power Apps canvas app**. Copilot in Power Apps (Agent builder in Power Apps) is the documented option for that. Microsoft Learn's "Agent builder in Power Apps" and "Copilot for Power Apps makers and users" articles describe the Power Apps Agent builder as a fast way to build agents directly within Power Apps Studio, using existing Dataverse data, logic, and actions, embedded in the canvas app's user experience. That maps directly to Agent2's requirements.

## Why the other options are wrong (for the slot they don't fit)

**Azure Logic Apps** is a workflow orchestration service. It is not an agent-building platform with Semantic Kernel extensibility, and it is not embeddable as an agent inside a Power Apps canvas app.

**Microsoft Copilot Studio** is a low-code agent platform and is a strong general-purpose option for both agents, but for Agent1's specific Semantic Kernel extensibility requirement, Foundry is the documented Microsoft platform. For Agent2's embed-in-canvas-app requirement, Copilot in Power Apps (Agent builder in Power Apps) is the documented in-product experience for building and embedding the agent directly in the canvas app, which is closer to the question's wording than a Copilot Studio agent surfaced separately.

## Microsoft Learn references

- Exploring the Semantic Kernel CopilotStudioAgent / Foundry agents — https://learn.microsoft.com/semantic-kernel/frameworks/agent/agent-types/copilot-studio-agent
- Connect to a Microsoft Foundry agent — https://learn.microsoft.com/microsoft-copilot-studio/add-agent-foundry-agent
- Agent builder in Power Apps — https://learn.microsoft.com/power-platform/release-plan/2025wave1/power-apps/ga-agent-builder-power-apps
- Copilot for Power Apps makers and users — https://learn.microsoft.com/power-platform/release-plan/2025wave2/power-apps/copilot-power-apps-makers-users
- Bring intelligence into model driven apps and custom components using Agent Xrm and PCF APIs — https://learn.microsoft.com/power-platform/release-plan/2025wave1/power-apps/bring-intelligence-into-model-driven-apps-custom-components-using-agent-xrm-pcf-apis
