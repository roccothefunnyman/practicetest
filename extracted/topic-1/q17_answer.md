---
topic: 1
question: 17
type: hotspot
case_study: false
answer: Vague prompt = Rewrite the prompt with clear and task-specific instructions; Knowledge-base prompt = Use responses with only reference sources and limit the response scope
---

# Question 17 — Answer

**Correct answer:**
- A prompt that has instructions to "help the customer as best you can": **Rewrite the prompt with clear and task-specific instructions.**
- A prompt that helps retrieve product information from a knowledge base: **Use responses with only reference sources and limit the response scope.**

## Why these answers are correct

Microsoft Learn's prompt engineering guidance ("Prompt engineering techniques," "Use prompts to make your agent or agent flow perform specific tasks," "Use prompt modification to provide custom instructions to your agent") states the same principle repeatedly: be specific, give task-specific instructions, and start with clear instructions. Vague prompts like "help the customer as best you can" produce inconsistent and unreliable answers because the model has no concrete task definition. The correct fix is to rewrite the prompt with clear, task-specific instructions.

For the knowledge-base retrieval prompt, the goal is grounded, accurate responses based on the source documents. Microsoft Learn's "Best practices for integrating and deploying Copilot Studio" calls out: "Avoid relying solely on model-generated content for critical decisions, always ground outputs in verifiable data." The right pattern for knowledge-base retrieval is to constrain the response to reference sources and limit the response scope. That reduces hallucination and keeps answers traceable through citations.

## Why the other options are wrong

**Add filler words to make the prompt sound more natural and conversational** introduces noise without adding task clarity. Microsoft's guidance is the opposite: keep prompts brief and specific.

**Keep the prompt vague to enable model flexibility** produces inconsistent responses. Microsoft's prompt engineering guidance explicitly warns against vague or ambiguous language.

**Add several open-ended questions to give the model broader context** widens the response scope, which is the opposite of what's needed for accurate knowledge-base retrieval.

**Remove the knowledge source so that the model responds freely with general product information** removes grounding entirely, which is the worst option for accuracy and consistency.

## Microsoft Learn references

- Prompt engineering techniques — https://learn.microsoft.com/azure/ai-foundry/openai/concepts/prompt-engineering
- Use prompts to make your agent or agent flow perform specific tasks — https://learn.microsoft.com/microsoft-copilot-studio/nlu-prompt-node
- Use prompt modification to provide custom instructions to your agent — https://learn.microsoft.com/microsoft-copilot-studio/nlu-generative-answers-prompt-modification
- Best practices for integrating and deploying Copilot Studio — https://learn.microsoft.com/microsoft-copilot-studio/system-service-card-copilot-studio
