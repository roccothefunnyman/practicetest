---
topic: 3
question: 39
type: multi-select
case_study: true
answer: B, C
---

# Question 39 — Answer

**Correct answer: B. a ZIP package and C. a Microsoft Power Platform solution**

## Why B and C are correct

The Contoso custom AI agent is a low-code Copilot Studio agent built on Dynamics 365 Supply Chain Management data. Microsoft Learn defines Power Platform solutions as the ALM container for Copilot Studio agents and connectors: "When you create an agent in Copilot Studio, the agent is created within a Power Platform solution." Solutions are exported as compressed ZIP packages for transport between environments. That is the supported ALM artifact for the Contoso agent.

In Microsoft Learn: "When you export a solution from Dataverse, it's exported as a single compressed file." That compressed file is the ZIP package, and the underlying construct is the Power Platform solution. Both items together are the components included in the ALM process.

## Why the other options are wrong

**A. an Azure package** is not a Power Platform ALM artifact. Azure deployments use ARM, Bicep, or container artifacts, none of which apply to a Copilot Studio agent.

**D. a Cloud Scale Unit (CSU) package** belongs to Dynamics 365 Finance and Operations apps, not Copilot Studio agents.

**E. an X++ model** is a Finance and Operations developer artifact. It is not used to package Copilot Studio agents.

## Microsoft Learn references

- Solution management in Microsoft Copilot Studio — https://learn.microsoft.com/microsoft-copilot-studio/authoring-solutions-overview
- Establish an application lifecycle management strategy (Copilot Studio) — https://learn.microsoft.com/microsoft-copilot-studio/guidance/alm
- Modernize applications with Power Platform (solutions exported as compressed file) — https://learn.microsoft.com/power-platform/guidance/adoption/application-modernization
- Export and import agents using solutions — https://learn.microsoft.com/microsoft-copilot-studio/authoring-solutions-import-export
