---
topic: 3
question: 21
type: hotspot
case_study: false
answer: Grounding data = Microsoft Purview access policies; Fine-tuning = Role-based access control (RBAC) in Microsoft Foundry
---

# Question 21 — Answer

**Correct answer:**
- **Restricts access to the grounding data: Microsoft Purview access policies**
- **Restricts model fine-tuning: Role-based access control (RBAC) in Microsoft Foundry**

## Why these selections are correct

**Grounding data in Microsoft Fabric is governed by Microsoft Purview.** Purview access policies (and the Unified Catalog) control who can read or use the data assets that ground the AI models. Microsoft Learn describes Purview as the platform for "data security solutions" and "unified data governance solutions" and details data access governance for Fabric assets through Purview. Azure Policy enforces resource-level configuration, Azure Monitor alerts surface signals, and Content Safety filters output, none of which is the data access control plane.

**Fine-tuning is controlled by RBAC in Microsoft Foundry.** Foundry uses Azure RBAC to scope what each principal can do at the Foundry resource and project level. Roles such as Microsoft Foundry Developer, Microsoft Foundry Project Manager, and similar control whether a user can create or run fine-tuning jobs. Microsoft's RBAC for Foundry article enumerates these built-in roles. Conditional Access governs sign-in conditions for users, ARM resource locks prevent resource deletion or modification, and Azure Policy governs resource configuration. None of those scope a user's ability to launch a fine-tuning job the way RBAC does.

## Microsoft Learn references

- Microsoft Purview overview — https://learn.microsoft.com/purview/purview
- Data governance with Microsoft Purview (Unified Catalog) — https://learn.microsoft.com/purview/data-governance-overview
- Role-based access control for Microsoft Foundry — https://learn.microsoft.com/azure/foundry/concepts/rbac-foundry
- Microsoft Fabric and Purview integration — https://learn.microsoft.com/fabric/governance/microsoft-purview-fabric
