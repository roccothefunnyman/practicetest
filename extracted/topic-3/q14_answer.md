---
topic: 3
question: 14
type: multiple-choice
case_study: false
answer: A
---

# Question 14 — Answer

**Correct answer: A. Create a central model registry that uses version history.**

## Why A is correct

The requirement combines three things: a security and compliance review of each release, access to prior versions for impact analysis, and business continuity. A central model registry with version history is the canonical pattern for that. It tracks every published model version with metadata, lineage, and lifecycle stage; security and compliance teams can review the new version and compare it against prior versions, and the registry preserves rollback paths if a release introduces regressions or exposures, supporting business continuity.

Microsoft's GenAIOps guidance and Foundry Control Plane both center on registered model assets with versioning, evaluation results, and observability tied to each version. That is the structure that lets reviewers see what changed release over release and enables rapid rollback.

## Why the other options are wrong

**B. Establish a promotion process by using a quality gate.** A quality gate enforces tests before promotion, but it does not by itself give the security team access to prior versions or guarantee business continuity if a deployed release fails.

**C. Implement version control for all the AI system components.** Source-level version control covers prompts, code, and config, but not the model artifacts and their evaluation history. A model registry is the purpose-built complement.

**D. Track model retirement schedules to prevent service disruptions.** Retirement tracking helps with vendor model deprecation, not the impact assessment of new releases.

## Microsoft Learn references

- Generative AI operations for organizations with MLOps investments — https://learn.microsoft.com/azure/architecture/ai-ml/guide/genaiops-for-mlops
- Microsoft Foundry Control Plane (assets, observability, compliance) — https://learn.microsoft.com/azure/foundry/control-plane/overview
- Manage agents at scale in Microsoft Foundry Control Plane — https://learn.microsoft.com/azure/foundry/control-plane/how-to-manage-agents
