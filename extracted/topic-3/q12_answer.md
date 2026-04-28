---
topic: 3
question: 12
type: multi-select
case_study: false
answer: C, D
---

# Question 12 — Answer

**Correct answer: C. Use Microsoft Power Platform pipelines and D. Include the components in a solution.**

## Why C and D are correct

Copilot extensions in Dynamics 365 Customer Service are Copilot Studio components, and Power Platform's prescribed ALM pattern packages them in a solution and promotes them through pipelines.

Microsoft Learn states: "When you create an agent in Copilot Studio, the agent is created within a Power Platform solution. You can create custom solutions to manage your agents across multiple environments, or for pipeline deployments and other application lifecycle management (ALM) scenarios." Pipelines in Power Platform "democratize ALM... by bringing ALM automation and continuous integration and continuous delivery (CI/CD) capabilities into the service."

Together, packaging in a solution (D) and promoting through pipelines (C) provide safe, repeatable development, test, and production movement.

## Why the other options are wrong

**A. Use an unmanaged solution in production.** Microsoft's ALM golden rule is to deploy managed solutions to production. Unmanaged in production prevents clean uninstall and upgrade.

**B. Rebuild the agents in each environment.** Manual rebuilds break consistency and traceability and bypass ALM entirely.

**E. Store the agent transcripts in source control.** Transcripts are runtime conversation data, not ALM artifacts. They do not belong in a deployment pipeline.

## Microsoft Learn references

- Establish an application lifecycle management strategy (Copilot Studio) — https://learn.microsoft.com/microsoft-copilot-studio/guidance/alm
- Pipelines in Power Platform — https://learn.microsoft.com/power-platform/alm/pipelines
- Create and manage solutions in Copilot Studio — https://learn.microsoft.com/microsoft-copilot-studio/authoring-solutions-overview
- ALM basics with Microsoft Power Platform — https://learn.microsoft.com/power-platform/alm/basics-alm
