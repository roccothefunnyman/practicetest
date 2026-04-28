---
topic: 1
question: 13
type: multiple-choice
case_study: false
answer: A
---

# Question 13 — Answer

**Correct answer: A. Microsoft Dataverse**

## Why A is correct

The requirement set is:
1. Centralized source for multiple AI systems (Copilot Studio agents, Dynamics 365 apps, external AI models).
2. Built-in data classification and protection policies.
3. Data for grounding and analytics.

Microsoft Dataverse is the only option that meets all three:

- It is the standard data backbone for Copilot Studio agents and Dynamics 365 apps. Microsoft Learn's "Why choose Microsoft Dataverse?" article describes it as the central data store with native integration to Power Apps, Power Automate, Dynamics 365, and Copilot Studio. External AI systems can also reach Dataverse data via APIs, virtual tables, MCP servers, and Microsoft Graph.
- It includes built-in data classification, security roles, row/column-level security, and data policies. Microsoft Purview integrates with Dataverse for sensitivity labels, DLP for Dataverse, and data classification.
- It supports grounding (it is a documented Copilot Studio knowledge source) and analytics (managed data lake export to Azure Data Lake / Fabric, Power BI integration).

This is the documented Microsoft Power Platform business solution choice for the requirements stated.

## Why the other options are wrong

**B. Azure Data Lake Storage** is a data store for analytics but lacks the built-in business data classification, protection policies, and Power Platform-native integrations required to be a centralized source for Copilot Studio, Dynamics 365, and external AI models out of the box.

**C. a Microsoft Power BI semantic model** is a reporting layer over data, designed for analytics. It is not the centralized authoritative business data store, and it does not provide built-in data classification and protection policies in the way required across multiple AI systems.

**D. Azure Cosmos DB** is a globally distributed NoSQL database. It is not the Power Platform data backbone and lacks the integrated classification, sensitivity, and AI-ready features described for Dataverse.

## Microsoft Learn references

- Why choose Microsoft Dataverse? — https://learn.microsoft.com/power-apps/maker/data-platform/why-dataverse-overview
- Microsoft Purview data classification (Dataverse) — https://learn.microsoft.com/purview/ai-microsoft-purview
- Add Dataverse tables as a knowledge source — https://learn.microsoft.com/microsoft-copilot-studio/knowledge-add-dataverse
- Step 2: Protect sensitive info in grounding data (Dataverse) — https://learn.microsoft.com/purview/deploymentmodels/depmod-sc-agents-step2
