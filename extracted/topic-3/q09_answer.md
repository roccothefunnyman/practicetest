---
topic: 3
question: 9
type: multiple-choice
case_study: false
answer: B
---

# Question 9 — Answer

**Correct answer: B. Manage the connectors as solution components and deploy the components by using ALM pipelines.**

## Why B is correct

Custom connectors are solution-aware components in Power Platform. Microsoft's ALM guidance is to package the connector (along with the agent and any related artifacts) inside a Dataverse solution and promote it through an automated ALM pipeline (Pipelines in Power Platform, Azure DevOps with the Power Platform Build Tools, or GitHub Actions for Power Platform). This approach gives consistent deployment across development, test, and production, and it produces traceable deployment records that satisfy governance requirements.

## Why the other options are wrong

**A. Deploy the APIs as Azure Functions.** Hosting the API differently does not address the ALM problem. The connector and the agent still need a packaging and promotion strategy.

**C. Maintain connector definitions in environment variables.** Environment variables hold values that change between environments (URLs, IDs, secrets). They do not move connector definitions between environments.

**D. Export and import the connectors between the environments as unmanaged solutions.** Production should receive managed solutions, not unmanaged ones. Unmanaged in production prevents clean upgrade and rollback paths and undermines traceability.

## Microsoft Learn references

- Establish an application lifecycle management strategy (Copilot Studio) — https://learn.microsoft.com/microsoft-copilot-studio/guidance/alm
- Pipelines in Power Platform — https://learn.microsoft.com/power-platform/alm/pipelines
- Power Platform Build Tools for Azure DevOps — https://learn.microsoft.com/power-platform/alm/devops-build-tools
- GitHub Actions for Power Platform — https://learn.microsoft.com/power-platform/alm/devops-github-actions
