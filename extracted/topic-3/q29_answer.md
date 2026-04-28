---
topic: 3
question: 29
type: multiple-choice
case_study: false
answer: D
---

# Question 29 — Answer

**Correct answer: D. AI quality (AI assisted)**

## Why D is correct

The question describes overall quality and coherence of generated responses, evaluated with GPT-4o as a judge, returning a numeric score per output. That is the AI-assisted quality category in Microsoft Foundry's evaluator framework. Microsoft Learn lists the AI-assisted quality evaluators as Coherence, Fluency, Relevance, Groundedness, Similarity, Retrieval, Response Completeness, and similar measures, all of which use an LLM judge (GPT-4.1, GPT-4o, or an o-series reasoning model) to score outputs on a numeric scale. Coherence specifically "measures the logical and orderly presentation of ideas in a response."

## Why the other options are wrong

**A. AI quality (NLP)** uses traditional NLP overlap metrics such as F1, BLEU, GLEU, ROUGE, METEOR. They compare model output to a ground-truth reference using token overlap and do not require an LLM judge.

**B. Risk and safety** evaluates harmful content (violence, hate, sexual, self-harm, jailbreak susceptibility, protected materials). It is not a measure of overall quality and coherence.

**C. Groundedness** is one specific AI-assisted metric (whether the response is supported by the source data). It does not by itself measure overall quality and coherence; it is a component of the broader AI-assisted quality category.

## Microsoft Learn references

- Built-in evaluators reference (Microsoft Foundry) — https://learn.microsoft.com/azure/foundry/concepts/built-in-evaluators
- General purpose evaluators (Coherence and Fluency) — https://learn.microsoft.com/azure/foundry/concepts/evaluation-evaluators/general-purpose-evaluators
- Evaluate your AI agents (model support for AI-assisted evaluators) — https://learn.microsoft.com/azure/foundry-classic/how-to/develop/agent-evaluate-sdk
- Observability in generative AI — https://learn.microsoft.com/azure/foundry/concepts/observability
