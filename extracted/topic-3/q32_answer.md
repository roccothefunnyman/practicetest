---
topic: 3
question: 32
type: multiple-choice
case_study: false
answer: C
---

# Question 32 — Answer

**Correct answer: C. Deploy data loss prevention (DLP) policies in Power Platform.**

## Why C is correct

DLP policies in Power Platform classify connectors as Business, Non-business, or Blocked, and prevent agents and apps from combining connectors across categories. Microsoft Learn states: "Data policies, including data loss prevention (DLP) policies, act as guardrails to help prevent users from unintentionally exposing organizational data and to protect information security in the tenant. Data policies enforce rules for which connectors are enabled for each environment, and which connectors can be used together." That maps directly to "agents must use only approved connectors" and "prevent the agents from accessing sensitive data."

## Why the other options are wrong

**A. Configure Azure Monitor to capture connector activity logs.** Logging captures evidence after the fact. It does not enforce which connectors agents can use.

**B. Enable a Microsoft Dataverse audit.** Auditing tracks data access in Dataverse but does not control which connectors an agent can call or block sensitive data flow.

**D. Enable customer-managed keys in Microsoft Dataverse.** CMK encrypts data at rest with a customer-managed key. It does not constrain connector usage.

## Microsoft Learn references

- Data policies (Power Platform) — https://learn.microsoft.com/power-platform/admin/wp-data-loss-prevention
- Implement a data policy strategy — https://learn.microsoft.com/power-platform/guidance/adoption/dlp-strategy
- Power Platform DLP policies on Day 1 — https://learn.microsoft.com/microsoft-365/community/power-platform-dlp-policies-you-should-be-considering-on-day-1
- Advanced connector policies (preview) — https://learn.microsoft.com/power-platform/admin/advanced-connector-policies
