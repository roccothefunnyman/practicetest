---
topic: 3
question: 31
type: multiple-choice
case_study: false
answer: C
---

# Question 31 — Answer

**Correct answer: C. Use Observability in Foundry Control Plane with evaluation and drift monitoring.**

## Why C is correct

The question requires baseline accuracy evaluation before each agent version is deployed. Microsoft Foundry Control Plane brings observability, evaluation, and drift monitoring into a single ALM-aligned surface for Foundry agents. Microsoft Learn describes the Control Plane: "Continuously evaluate agent performance, quality, and risk dimensions. Risk dimensions might include task adherence, intent resolution, tool call success, groundedness, sensitive data leakage, and exposure to jailbreak and cross-domain prompt injection attacks." The Agent Monitoring Dashboard supports continuous evaluation and integrates results into the deployment flow, which is the prescribed path for evaluating agents against baseline metrics before promotion.

## Why the other options are wrong

**A. Configure GitHub Actions for new agent versions.** GitHub Actions can orchestrate deployments, but it does not by itself perform Foundry-specific evaluation against baseline accuracy metrics.

**B. Deploy each new agent version directly to production.** This skips the evaluation gate entirely.

**D. Enable Application Insights and use Azure Monitor.** Application Insights captures runtime telemetry. It does not run pre-deployment evaluations against baseline accuracy metrics the way Foundry observability and evaluation do.

## Microsoft Learn references

- What is Microsoft Foundry Control Plane? — https://learn.microsoft.com/azure/foundry/control-plane/overview
- Monitor agents with the Agent Monitoring Dashboard — https://learn.microsoft.com/azure/foundry/observability/how-to/how-to-monitor-agents-dashboard
- Observability in generative AI (evaluation, monitoring, tracing) — https://learn.microsoft.com/azure/foundry/concepts/observability
- Built-in evaluators reference — https://learn.microsoft.com/azure/foundry/concepts/built-in-evaluators
