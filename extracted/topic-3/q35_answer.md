---
topic: 3
question: 35
type: multi-select
case_study: false
answer: A, E
---

# Question 35 — Answer

**Correct answer: A. Deploy managed solutions to production and E. Include agents and connectors in a solution.**

## Why A and E are correct

Power Platform's ALM golden rules call for packaging components in a solution and deploying as managed in non-development environments. Microsoft Learn states: "Export and deploy solutions as managed, unless setting up a development environment." Managed solutions in production prevent direct edits, enforce consistency across environments, and provide clean uninstall and upgrade behavior. Including the agents and custom connectors in a single solution treats them as one ALM unit so the connector and agent versions stay in lockstep.

## Why the other options are wrong

**B. Deploy unmanaged solutions to production.** Unmanaged solutions allow direct edits in production, which is exactly what the requirement forbids.

**C. Manually rebuild the agents in each environment.** Manual rebuilds break consistency and traceability and make connector versions drift across environments.

**D. Move the agents between the environments by using data export and import.** Data export and import bypasses solution-aware ALM, prevents dependency tracking, and undermines version control.

## Microsoft Learn references

- Establish an application lifecycle management strategy (Copilot Studio, ALM golden rules) — https://learn.microsoft.com/microsoft-copilot-studio/guidance/alm
- Organize your solutions — https://learn.microsoft.com/power-platform/alm/organize-solutions
- ALM basics with Microsoft Power Platform — https://learn.microsoft.com/power-platform/alm/basics-alm
- Pipelines in Power Platform — https://learn.microsoft.com/power-platform/alm/pipelines
