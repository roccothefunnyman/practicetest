---
topic: 1
question: 4
type: drag-drop
case_study: false
answer: Agent1 = Natural language understanding (NLU); Agent2 = Natural language understanding + (NLU+)
---

# Question 4 — Answer

**Correct answer:**
- Agent1: **Natural language understanding (NLU)**
- Agent2: **Natural language understanding + (NLU+)**

## Why these answers are correct

The requirements are:
- Standard model (no Azure dependency, no bring-your-own model)
- No generative orchestration (so this is classic orchestration with the built-in NLU options)
- Agent1: simple and short phrases per topic
- Agent2: integration with Dynamics 365 Contact Center voice channel

Microsoft Learn's "Natural language understanding (NLU) overview" and "Design effective language understanding" articles describe the classic orchestration options:

- **NLU** is the original built-in model. It is described as the option to use "if you want an easier programmable design or have simpler orchestration needs" and supports "5 to 20 short phrases per topic." That matches Agent1's requirement for simple, short phrases.

- **NLU+** is the high-accuracy enterprise option. Microsoft Learn states explicitly: "The NLU+ option is available when you manage your voice or chat channels with a Dynamics 365 Contact Center license," and "if you have a voice-enabled agent, your NLU+ training data is also used to optimize your speech recognition capabilities." That maps directly to Agent2's Dynamics 365 Contact Center voice channel requirement.

## Why the other options are wrong

**Azure Language in Foundry Tools** is not one of the Copilot Studio language model options for an agent's NLU configuration; the Copilot Studio classic orchestration options are NLU, NLU+, and Azure CLU.

**Azure OpenAI** is associated with generative orchestration and generative answers, which the requirements explicitly exclude. It is also not a "standard model" per the question.

**Conversational language understanding (CLU)** requires an Azure subscription, ongoing model maintenance in Azure, and is described as the "bring-your-own NLU" option. It is not the standard model the requirements call for.

## Microsoft Learn references

- Natural language understanding (NLU) overview — https://learn.microsoft.com/microsoft-copilot-studio/nlu-overview
- Design effective language understanding — https://learn.microsoft.com/microsoft-copilot-studio/guidance/language-understanding
- Configure NLU+ — https://learn.microsoft.com/microsoft-copilot-studio/nlu-plus-configure
- Voice-enabled agent overview — https://learn.microsoft.com/microsoft-copilot-studio/voice-overview
