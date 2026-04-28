---
topic: 1
question: 18
type: hotspot
case_study: false
answer: Prompt validation = Use prompts that have varied phrasing; Metrics = Response relevance and accuracy
---

# Question 18 — Answer

**Correct answer:**
- Prompt validation techniques: **Use prompts that have varied phrasing.**
- Metrics: **Response relevance and accuracy**

## Why these answers are correct

For prompt validation, Microsoft's prompt engineering guidance and Copilot Studio testing guidance both stress that you should test against varied phrasings of the same intent. Real users won't all phrase a question the same way, so validating with varied phrasing is how you confirm the agent generalizes. Microsoft Learn's "Test your agent" and "Best practices for integrating and deploying Copilot Studio" sections call out simulating real-world scenarios and varied user inputs as the way to verify the agent generates accurate, contextually relevant responses.

For the metric, Microsoft Learn's evaluation overview and Copilot Studio analytics guidance describe response relevance and accuracy as the primary qualitative metrics for prompt engineering testing. The Copilot Studio Application Card explicitly lists evaluation as the practice of "assessing agent quality, performance, safety, and reliability," with response quality (relevance and accuracy) at the center. Counting words generated or generation time tells you nothing about whether the response was correct or contextually useful.

## Why the other options are wrong

**Exclude domain-specific terminology from the prompts** would reduce realism and break domain-specific reasoning testing. Real prompts in production use domain terminology, so testing should include it, not exclude it.

**Use only simple, one-word prompts** is unrealistic and doesn't test how the agent handles real user input.

**The number of words generated per response** is not a quality signal. A long answer can be wrong; a short answer can be correct.

**The response generation time** is a performance metric, not a metric for prompt engineering accuracy. You measure latency separately from response correctness.

## Microsoft Learn references

- Prompt engineering techniques — https://learn.microsoft.com/azure/ai-foundry/openai/concepts/prompt-engineering
- Test your agent — https://learn.microsoft.com/microsoft-copilot-studio/authoring-test-bot
- Application Card: Microsoft Copilot Studio (Evaluation) — https://learn.microsoft.com/microsoft-copilot-studio/system-service-card-copilot-studio
- Evaluate generative AI applications — https://learn.microsoft.com/azure/ai-foundry/concepts/evaluation-approach-gen-ai
