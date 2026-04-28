---
topic: 1
question: 19
type: multiple-choice
case_study: false
answer: C
---

# Question 19 — Answer

**Correct answer: C. Export the solution as a managed solution and import the solution into Prod1.**

## Why C is correct

Microsoft's documented application lifecycle management (ALM) pattern for moving Copilot Studio agents between environments is to package the agent in a solution, export the solution as **managed**, and import it into the target environment.

Microsoft Learn's "Export and import agents using solutions" and "Create and manage solutions in Copilot Studio" articles are explicit on this. Managed solutions are the recommended deployment artifact for production environments because:
- They prevent direct edits in production (preserving the integrity of the deployment).
- They support upgrade and update flows back from Dev1.
- They are the artifact type expected by Power Platform pipelines.

This minimizes administrative effort because once the managed solution is imported into Prod1, the agent and all its solution components (topics, tools, environment variables, etc.) are deployed in one operation, and future updates flow as solution upgrades rather than manual configuration.

## Why the other options are wrong

**A. Share Agent1 with the users in Prod1** does not move the agent to Prod1. Sharing extends access within the source environment; it doesn't deploy the agent to a different environment.

**B. Export the solution as an unmanaged solution and import the solution into Prod1** is technically possible but is not the recommended pattern for production. Unmanaged solutions allow direct edits in the target environment, are harder to maintain across environments, and Microsoft's guidance is explicit that production should use managed solutions.

**D. Create a new Copilot Studio agent in Prod1 by replicating the configuration of Agent1** is the most administrative effort possible (full manual rebuild) and creates drift between environments. It directly violates the "minimize administrative effort" requirement.

## Microsoft Learn references

- Export and import agents using solutions — https://learn.microsoft.com/microsoft-copilot-studio/authoring-solutions-import-export
- Create and manage solutions in Copilot Studio — https://learn.microsoft.com/microsoft-copilot-studio/authoring-solutions-overview
- Managed and unmanaged solutions — https://learn.microsoft.com/power-platform/alm/solution-concepts-alm
- Use application lifecycle management in Copilot Studio — https://learn.microsoft.com/power-platform/release-plan/2024wave2/data-platform/use-application-lifecycle-management-copilot-studio
