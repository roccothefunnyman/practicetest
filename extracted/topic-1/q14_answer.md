---
topic: 1
question: 14
type: multiple-choice
case_study: false
answer: D
---

# Question 14 — Answer

**Correct answer: D. Identify and quantify all the development, deployment, and operating costs.**

## Why D is correct

ROAI is, at its core, benefits relative to costs. To make the analysis accurate, you have to establish the cost baseline first. Microsoft Learn's "Plan to manage costs for Azure OpenAI" and "Quantify business value" guidance both put cost identification at the start of any ROI / ROAI analysis. The Azure Cloud Adoption Framework's "Business plan for AI agents" and "Plan for AI adoption" articles also describe baseline costs (development, deployment, operating) as the starting point for return-on-investment analysis, then comparing those costs against measurable benefits.

Without identifying and quantifying full costs (people, model usage, infrastructure, integration, support, retraining, governance), any subsequent metric or benchmark is built on an incomplete denominator. That is why the **first** step is identifying and quantifying all costs.

## Why the other options are wrong

**A. Establish the AI performance metrics** is necessary later in the analysis, but you can't relate performance to ROAI until you know the cost basis you are measuring performance against.

**B. Conduct an AI market benchmarking study** is useful context but doesn't tell you anything about your own deployment's economics. ROAI accuracy depends on your costs and your benefits, not industry averages.

**C. Model the customer experience** informs benefits estimation but is not the first step. You need a cost baseline first.

## Microsoft Learn references

- Business plan for AI agents (define success metrics, decision gates) — https://learn.microsoft.com/azure/cloud-adoption-framework/ai-agents/business-strategy-plan
- Plan to manage costs for Azure OpenAI — https://learn.microsoft.com/azure/ai-foundry/openai/how-to/manage-costs
- Quantify business value (FinOps) — https://learn.microsoft.com/cloud-computing/finops/framework/quantify/quantify-business-value
- Plan for AI adoption — https://learn.microsoft.com/azure/cloud-adoption-framework/ai/plan
