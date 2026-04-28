---
topic: 1
question: 32
type: multiple-choice
case_study: true
answer: C
---

# Question 32 — Answer

**Correct answer: C. generative orchestration**

## Why C is correct

The Contoso case study calls out two requirements that map directly to generative orchestration:

1. "The custom AI agent must be designed to eventually connect to other agents that can be selected based on their description."
2. "The topics used in the custom AI agent will be selected based NOT on a trigger phrase, but on a description of the purpose of the query, to make the interactions more conversational."

Microsoft Learn's "Orchestrate agent behavior with generative AI" article maps these requirements to generative orchestration explicitly:

- "With generative orchestration, an agent answers user queries or responds to event triggers by selecting the most appropriate combination of topics, tools, and knowledge. Each topic has a description that informs the agent of its purpose."
- "The agent selects topics based on the description of their purpose."
- "The agent selects child and connected agents based on their description."

By contrast, classic orchestration uses trigger phrases to match topics, which is exactly what the case study says Contoso doesn't want. Classic orchestration also doesn't support "Child and connected agents" selection by description.

Generative orchestration is the only option that supports both requirements (description-based topic selection and description-based agent-to-agent routing).

## Why the other options are wrong

**A. AI-assisted evaluators** are agent quality evaluators used in test sets to grade response quality. They don't determine how the agent selects topics or connects to other agents.

**B. Classic orchestration** uses trigger phrases for topic selection, which directly contradicts Contoso's requirement that topics be selected by description. Classic orchestration also does not support agent-to-agent connection selection by description.

**D. Azure OpenAI reasoning models** are a class of language models. The orchestration mode is a separate setting from the model choice. The case study's requirements describe orchestration behavior (description-based selection, multi-agent connections), not a model class.

## Microsoft Learn references

- Orchestrate agent behavior with generative AI — https://learn.microsoft.com/microsoft-copilot-studio/advanced-generative-actions
- FAQ for using generative orchestration — https://learn.microsoft.com/microsoft-copilot-studio/faqs-generative-orchestration
- Set topic triggers (The agent chooses) — https://learn.microsoft.com/microsoft-copilot-studio/authoring-triggers
- Add other agents overview (connect to other agents) — https://learn.microsoft.com/microsoft-copilot-studio/authoring-add-other-agents
- Apply generative orchestration capabilities — https://learn.microsoft.com/microsoft-copilot-studio/guidance/generative-orchestration
