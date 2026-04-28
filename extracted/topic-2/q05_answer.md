---
topic: 2
question: 5
type: multiple-choice
case_study: false
answer: D
---

# Question 5 — Answer

**Correct answer: D. From the Power Platform admin center, assign the Finance and Operations AI security role to users.**

## Why D is correct

The question asks about prerequisites to configure a prebuilt Copilot for accounts payable in Dynamics 365 Finance. Microsoft Learn documents this exact prerequisite.

From Microsoft Learn:

> "Users who should have access to the functionality must be assigned the Finance and Operations AI security role in Dataverse."

> "In the detail view of the environment, in the Access field, select Users or Teams. Select the users or teams that should have access, and assign the Finance and Operations AI security role."

This assignment is performed in the Dataverse environment that's associated with finance and operations apps, which is reached through the Power Platform admin center. Without the role, users cannot see Copilot summaries or get answers from the prebuilt Copilot in Dynamics 365 Finance.

## Why the other options are wrong

**A. From Microsoft Copilot Studio, create an accounts payable agent.** The question is about a prebuilt Copilot in Dynamics 365 Finance, not building a custom agent in Copilot Studio. Creating one bypasses the prebuilt experience and is not the prerequisite to configure it.

**B. Extend Microsoft 365 Copilot for Sales to an accounts payable agent.** Microsoft 365 Copilot for Sales is a sales-focused Outlook and Teams add-on tied to CRM. It is not the foundation for an accounts payable Copilot in Dynamics 365 Finance.

**C. Build an AI tool in Microsoft Foundry.** Foundry tools are for building custom AI agents and prompts. The question is about prerequisites to enable the prebuilt Copilot, which is a Dataverse role-assignment task, not a Foundry build.

## Microsoft Learn references

- Enable Copilot in Dynamics 365 Finance (Finance and Operations AI security role) — https://learn.microsoft.com/dynamics365/finance/accounts-receivable/enable-copilot-in-finance
- Overview of Copilot capabilities in finance and operations apps — https://learn.microsoft.com/dynamics365/fin-ops-core/fin-ops/copilot/copilot-for-finance-operations
- Power Platform admin center (finance and operations apps overview) — https://learn.microsoft.com/power-platform/admin/unified-experience/finance-operations-apps-overview
