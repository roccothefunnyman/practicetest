---
topic: 1
question: 8
type: drag-drop
case_study: false
answer: Performance = Move to a multi-agent architecture; Accuracy = Add a grounding data source
---

# Question 8 — Answer

**Correct answer:**
- To improve performance: **Move to a multi-agent architecture.**
- To improve accuracy: **Add a grounding data source.**

## Why these answers are correct

The question describes three symptoms in a single-agent, single-prompt design:
- Frequently produces incomplete results
- Struggles with domain-specific reasoning
- Slow response times

Microsoft Learn's "Transparency Note for Azure Agent Service" calls this out directly: "When a single agent's system message consistently struggles to handle the complexity, breadth, or depth of a task, such as frequently producing incomplete results, hitting reasoning bottlenecks, or requiring extensive domain-specific knowledge, the system may benefit from transitioning to a multi-agent architecture." Splitting the workload into specialized subtasks reduces cognitive overload on any single agent, which addresses both the slow response times and the incomplete results. That maps to the **performance** improvement.

For **accuracy**, Microsoft Learn's grounding data design guidance and the Azure AI Foundry agent transparency note both point to grounding as the lever for accuracy. Adding a grounding data source gives the model authoritative reference content to cite at inference time, which directly addresses domain-specific reasoning gaps and reduces hallucinated or incomplete answers. Grounding is described in Microsoft Learn as the way to "augment generative AI models by using context data during inference" so the model "can answer the user query and form the answer according to the expectations."

## Why the other options are wrong (for the slot they don't fit)

**Add a prebuilt connector** integrates a specific external system but doesn't by itself fix domain reasoning or speed.

**Upgrade to a larger generative AI model** can sometimes improve accuracy and reasoning, but it usually increases latency and cost rather than improving performance, and Microsoft's published guidance for the symptoms listed (incomplete results, domain reasoning, slow response) points to multi-agent decomposition and grounding before model upgrades.

## Microsoft Learn references

- Transparency Note for Azure Agent Service (single vs. multi-agent guidance) — https://learn.microsoft.com/azure/foundry/responsible-ai/agents/transparency-note
- Single agent or multiple agents — https://learn.microsoft.com/azure/cloud-adoption-framework/ai-agents/single-agent-multiple-agents
- Grounding data design for AI workloads on Azure — https://learn.microsoft.com/azure/well-architected/ai/grounding-data-design
- Knowledge sources in Copilot Studio — https://learn.microsoft.com/microsoft-copilot-studio/knowledge-copilot-studio
