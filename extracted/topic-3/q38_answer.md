---
topic: 3
question: 38
type: multiple-choice
case_study: false
answer: B
---

# Question 38 — Answer

**Correct answer: B. Duplicate App1 and republish the app in Env1.**

## Why B is correct

Microsoft Learn states that environments using customer-managed keys (CMK) and Customer Lockbox have specific Copilot behavior: "Questions and answers about enterprise data environments that have a customer-managed key or Customer Lockbox won't use your data stored in Dataverse." To add Copilot components to a canvas app in such an environment, you typically duplicate the app so the new copy picks up the latest Copilot capabilities and is republished with the components enabled, without changing the environment-level CMK configuration.

The specific issue is that some Copilot capabilities only attach to apps that are saved or republished with the feature available. Duplicating App1 and republishing keeps the existing security and encryption configuration of Env1 intact while letting the new copy include the Copilot components.

## Why the other options are wrong

**A. Modify the data sources of App1 to make them compatible with Copilot.** The data sources are not the problem. CMK encryption applies at the Dataverse level and is governed by the environment configuration, not the data sources.

**C. Enable Copilot features for Env1.** Toggling tenant or environment-level Copilot features may not give app-level Copilot components without republishing the app. It also risks broader configuration changes than the question allows.

**D. Move App1 to a new environment that uses Microsoft-managed keys.** This explicitly modifies the security and encryption configuration the question forbids changing.

## Microsoft Learn references

- Configure customer-managed encryption keys (Copilot Studio) — https://learn.microsoft.com/microsoft-copilot-studio/admin-customer-managed-keys
- Manage your customer-managed encryption key (Power Platform) — https://learn.microsoft.com/power-platform/admin/customer-managed-key
- Add Copilot for app users in model-driven apps — https://learn.microsoft.com/power-apps/maker/model-driven-apps/add-ai-copilot
- Add Copilot to a canvas app — https://learn.microsoft.com/power-apps/maker/canvas-apps/add-ai-copilot
