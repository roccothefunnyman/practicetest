---
topic: 1
question: 7
type: hotspot
case_study: false
answer: Ensure consistent AI responses = Define standardized prompt templates; Support governance and version control = Store prompts in a Git repository
---

# Question 7 — Answer

**Correct answer:**
- Ensure consistent AI responses: **Define standardized prompt templates.**
- Support governance and version control: **Store prompts in a Git repository.**

## Why these answers are correct

**Standardized prompt templates** are the documented Microsoft pattern for getting consistent, reusable AI responses across business units. Microsoft Learn's "Get started with prompt library" article describes prompt libraries as "a collection of predesigned prompts, serving as templates to expedite the creation of AI prompts," with the explicit goal of accelerating development "and ensures best practices are followed in prompt engineering." Standardization at the template level is what produces consistent responses with reusable formats.

**Git repository storage** is the standard answer for prompt governance and version control. Microsoft Learn's "AI apps and agents publication templates" article describes a prompt lifecycle template (Draft, Review, Approved, Deployed) and recommends documenting changes in source control or a wiki for traceability. Git is Microsoft's recommended version control system (Azure Repos, GitHub) and provides branching, pull request review, and history, which are the core requirements for governance and version control. Categorization by business function does not provide version control, and standardized templates by themselves do not provide change history or approval workflows.

This combination also minimizes administrative effort and ongoing cost. Templates are authored once and reused, and Git is a well-understood developer practice that the organization likely already uses.

## Why the other options are wrong

**Delegate department-specific prompt templates** would produce divergent prompts across business units, defeating the goal of consistent responses.

**Maintain a prompt history** captures usage but does not enforce a consistent response format.

**Define standardized prompt templates** (offered for the second slot) addresses consistency, not version control. Without Git or another source-control system, you have no diff history, branching, or rollback.

**Categorize prompts by business function** improves discoverability but offers no governance or versioning.

## Microsoft Learn references

- Get started with prompt library — https://learn.microsoft.com/microsoft-copilot-studio/prompt-library
- AI apps and agents publication templates (prompt lifecycle) — https://learn.microsoft.com/partner-center/marketplace-offers/artificial-intelligence-templates#prompt-lifecycle-template
- What is Azure Repos / Git — https://learn.microsoft.com/azure/devops/repos/get-started/what-is-repos
- Git workflow — https://learn.microsoft.com/azure/devops/repos/git/gitworkflow
