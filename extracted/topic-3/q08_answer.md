---
topic: 3
question: 8
type: multiple-choice
case_study: false
answer: B
---

# Question 8 — Answer

**Correct answer: B. Azure Policy**

## Why B is correct

The requirement is that agents and their grounding data must adhere to data residency and movement regulations. Azure Policy is the Azure service for enforcing where resources can be deployed. Microsoft Learn calls out the pattern explicitly: "If you have data residency requirements that require you to keep all your data in a single Azure region, you can enforce... by using an Azure Policy. You can also enforce a policy that the [resources] are not geo-replicated to other regions." Policy can restrict allowed locations for Azure OpenAI accounts, Foundry resources, storage, and other services that hold grounding data, and it continuously evaluates resources for compliance.

## Why the other options are wrong

**A. Microsoft Defender for Cloud** assesses security posture and detects threats. It does not enforce regional deployment constraints.

**C. Azure Monitor** collects logs and metrics for diagnostics and alerts. It does not enforce data residency.

**D. Microsoft Purview** governs and protects data (DSPM for AI, DLP, sensitivity labels, audit). It is not the tool for enforcing the Azure region in which resources are deployed.

## Microsoft Learn references

- Use Azure Policy to enforce residency requirements — https://learn.microsoft.com/azure/cosmos-db/data-residency#use-azure-policy-to-enforce-the-residency-requirements
- Move data across regions for Copilots and generative AI features — https://learn.microsoft.com/power-platform/admin/geographical-availability-copilot
- Azure Policy overview — https://learn.microsoft.com/azure/governance/policy/overview
