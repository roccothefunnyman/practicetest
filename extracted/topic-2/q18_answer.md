---
topic: 2
question: 18
type: multiple-choice
case_study: false
answer: D
---

# Question 18 — Answer

**Correct answer: D. Add the custom connector to Solution1.**

## Why D is correct

Power Platform application lifecycle management (ALM) treats solutions as the unit of transport between environments. To deploy a custom connector consistently across development, test, and production environments, the connector must be inside the solution that is exported from development and imported into the downstream environments.

From Microsoft Learn:

> "Use [solutions](https://learn.microsoft.com/power-platform/alm/solution-concepts-alm) as containers to transport artifacts and customizations across environments."

> "When you create an agent in Copilot Studio, the agent is created within a Power Platform solution. You can create custom solutions to manage your agents across multiple environments, or for pipeline deployments and other application lifecycle management (ALM) scenarios."

> "Don't customize outside of a development environment. Always work in the context of solutions... Export and deploy solutions as managed, unless setting up a development environment."

By adding the connector to Solution1 and exporting Solution1 as managed, the connector is deployed consistently across environments and is editable only in the development environment, which matches both stated requirements.

## Why the other options are wrong

**A. Add the custom connector to GitHub.** Source-controlling the connector definition in GitHub doesn't deploy it through Power Platform ALM. Solution-based deployment is still required to package and import the connector into target environments.

**B. Share the custom connector.** Sharing grants user permissions. It doesn't move the component across environments or restrict edits to development only.

**C. Create the custom connector in the default solution.** Components in the default solution can't be exported. Microsoft's ALM golden rule is to always work in custom (unmanaged) solutions during development and never customize the default solution for ALM-bound components.

## Microsoft Learn references

- Establish an application lifecycle management strategy (Copilot Studio ALM) — https://learn.microsoft.com/microsoft-copilot-studio/guidance/alm
- Create and manage solutions in Copilot Studio — https://learn.microsoft.com/microsoft-copilot-studio/authoring-solutions-overview
- Export and import agents using solutions — https://learn.microsoft.com/microsoft-copilot-studio/authoring-solutions-import-export
- Power Platform solution concepts — https://learn.microsoft.com/power-platform/alm/solution-concepts-alm
