---
topic: 3
question: 7
type: multiple-choice
case_study: false
answer: B
---

# Question 7 — Answer

**Correct answer: B. alignment of the output to domain-specific tasks**

## Why B is correct

The question asks whether the model's outputs are appropriate and meaningful for business reports based on internal enterprise data. That is a quality-of-output question, and Microsoft's evaluation guidance maps it to AI quality metrics that measure how well the response reflects the intended task and domain. Microsoft Foundry evaluators include task adherence, intent resolution, relevance, groundedness, and similar AI-assisted quality measures designed to test whether the output matches the domain task. Domain-specific alignment is the dimension that determines whether the output is appropriate and meaningful for the use case.

## Why the other options are wrong

**A. The number of active users interacting with the model** is an adoption metric. It says nothing about whether the outputs themselves are appropriate or meaningful.

**C. The average system resource usage during inference** is an operational metric (compute, latency, cost). It does not measure output quality.

**D. The model training duration** is a process metric for fine-tuning. It does not measure whether the resulting outputs are appropriate for business reports.

## Microsoft Learn references

- Built-in evaluators reference (Microsoft Foundry) — https://learn.microsoft.com/azure/foundry/concepts/built-in-evaluators
- Observability in generative AI (evaluation, monitoring, tracing) — https://learn.microsoft.com/azure/foundry/concepts/observability
- Evaluation metrics built-in (Azure AI Studio) — https://learn.microsoft.com/azure/ai-studio/concepts/evaluation-metrics-built-in
