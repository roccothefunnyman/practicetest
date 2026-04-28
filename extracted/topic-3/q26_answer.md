---
topic: 3
question: 26
type: multiple-choice
case_study: false
answer: C
---

# Question 26 — Answer

**Correct answer: C. Reconfigure the prompts to limit the amount of retrieved content from the knowledge sources.**

## Why C is correct

Token usage on a RAG-style agent is dominated by the retrieved content stuffed into the prompt context for grounding. When telemetry shows the agent is hitting its token cap, the highest-leverage fix is to reduce the volume of retrieved content per prompt while keeping the same knowledge sources in scope. Microsoft's optimization guidance points to refining prompts and retrieval to reduce ambiguity and tighten the context window. Limiting retrieved chunks per call drops token consumption while preserving response quality, because the agent still consults all the knowledge sources, just less of each per turn.

## Why the other options are wrong

**A. Chunk documents during indexing.** Chunking is good practice for retrieval quality, but it does not by itself reduce the number of chunks pulled into the prompt. Without limiting how many chunks the prompt retrieves, token usage stays high.

**B. Reduce the number of knowledge sources used by the agent.** Cutting knowledge sources risks degrading response quality, which violates the "without degrading quality" requirement.

**D. Lower the maximum token usage limit for the responses.** Capping the response length might truncate the answer, which degrades quality. It does not address the input-side token consumption from retrieval.

## Microsoft Learn references

- Optimize prompts and instructions (Copilot Studio) — https://learn.microsoft.com/microsoft-copilot-studio/guidance/optimize-prompts-overview
- Knowledge sources summary (Copilot Studio) — https://learn.microsoft.com/microsoft-copilot-studio/knowledge-copilot-studio
- Observability in generative AI (token usage and latency) — https://learn.microsoft.com/azure/foundry/concepts/observability
