---
topic: 3
question: 40
type: drag-drop
case_study: true
answer: CISO = Azure Resource Graph Explorer; CIO = Microsoft Purview
---

# Question 40 — Answer

**Correct answer:**
- **CISO: Azure Resource Graph Explorer**
- **CIO: Microsoft Purview**

## Why these selections are correct

**CISO** is responsible for "discover and inventory AI resources for auditing." Azure Resource Graph Explorer queries every Azure resource in the tenant across subscriptions, including Foundry projects, Azure OpenAI accounts, AI Search, Storage, and related grounding resources. Microsoft Learn positions Resource Graph as the inventory and exploration tool for resources at scale. Microsoft Purview, Copilot Studio, and Azure Blob Storage do not surface a tenant-wide inventory of AI resources the way Resource Graph does, which makes it the right tool for the CISO's audit mandate.

**CIO** is responsible for ensuring "appropriate security labels are assigned to the data used by the AI agents." Microsoft Purview is the platform that defines, applies, and audits sensitivity labels across Microsoft 365 and Azure data sources, including data that grounds AI agents. Microsoft Learn details Purview's information protection, sensitivity labels, and DSPM for AI as the controls for labeling and governing AI-relevant data.

## Microsoft Learn references

- What is Azure Resource Graph? — https://learn.microsoft.com/azure/governance/resource-graph/overview
- Microsoft Purview overview — https://learn.microsoft.com/purview/purview
- Sensitivity labels in Microsoft Purview — https://learn.microsoft.com/purview/sensitivity-labels
- Microsoft Purview data security and compliance protections for generative AI apps — https://learn.microsoft.com/purview/ai-microsoft-purview
