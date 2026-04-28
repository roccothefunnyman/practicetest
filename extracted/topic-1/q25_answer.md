---
topic: 1
question: 25
type: multiple-choice
case_study: false
answer: B
---

# Question 25 — Answer

**Correct answer: B. Identify and address biased data.**

## Why B is correct

The objective is to ensure the data ingested by the agent is **clean and suitable for the intended use** before generating monthly insights into customer sentiment. Microsoft Learn's responsible AI guidance for Copilot Studio and the Customer Insights sentiment analysis documentation both call out the same risk: biased input data leads to biased outputs and decisions, especially in sentiment analysis (where digital-only feedback or skewed sources misrepresent the customer base).

The "Apply responsible AI principles" article for Copilot Studio recommends using "diverse and representative data" and using "bias detection and mitigation tools" to "detect biases in the AI models" and apply corrective actions. The "Analyze sentiment in customer feedback" Customer Insights documentation explicitly warns about potential bias in feedback data and the need to address it before analysis. Identifying and addressing biased data is the data-preparation step that makes the ingested data suitable for the intended use.

## Why the other options are wrong

**A. Create a workflow in Microsoft Power Automate** is an automation step, not a data quality / bias step. It moves data; it doesn't make it clean or unbiased.

**C. Create an agent flow in Microsoft Copilot Studio** is also automation orchestration, not data preparation.

**D. Sort the database by customer last name** has no impact on data quality, suitability, or bias.

## Microsoft Learn references

- Apply responsible AI principles (Copilot Studio) — https://learn.microsoft.com/microsoft-copilot-studio/guidance/responsible-ai
- Analyze sentiment in customer feedback (potential bias) — https://learn.microsoft.com/dynamics365/customer-insights/data/sentiment-analysis
- Understanding Data Curation and Management for AI Projects — https://learn.microsoft.com/ai/playbook/capabilities/data-curation/
- Design training data for AI workloads on Azure — https://learn.microsoft.com/azure/well-architected/ai/training-data-design
