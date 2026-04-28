---
topic: 3
question: 5
type: multiple-choice
case_study: false
answer: C
---

# Question 5 — Answer

**Correct answer: C. Microsoft Power Platform solutions**

## Why C is correct

Power Platform solutions are the packaging mechanism for ALM across Power Apps, Power Automate, Microsoft Dataverse, and Microsoft Copilot Studio. Microsoft Learn defines solutions as "the mechanism for implementing ALM; you use them to distribute components across environments through export and import. A component represents an artifact used in your application... Anything that can be included in a solution is a component, such as tables, columns, canvas and model-driven apps, Power Automate flows, agents, charts, and plug-ins."

Solutions track component dependencies, support versioning, and can be exported as managed or unmanaged for deployment between environments. That matches all three requirements (versioning, dependencies, deployments) for the four components listed in the question.

## Why the other options are wrong

**A. GitHub Actions** automates CI/CD and can deploy Power Platform artifacts, but it does not itself package the components or track dependencies. It typically operates on top of solutions.

**B. Azure DevOps** provides CI/CD pipelines and source control. Like GitHub Actions, it automates the deployment of solutions but is not the packaging mechanism itself.

## Microsoft Learn references

- Overview of ALM with Microsoft Power Platform — https://learn.microsoft.com/power-platform/alm/overview-alm
- Solution concepts (ALM) — https://learn.microsoft.com/power-platform/alm/solution-concepts-alm
- Create and manage solutions in Copilot Studio — https://learn.microsoft.com/microsoft-copilot-studio/authoring-solutions-overview
- Dependency tracking for solution components — https://learn.microsoft.com/power-platform/alm/dependency-tracking-solution-components
