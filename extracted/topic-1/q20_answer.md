---
topic: 1
question: 20
type: multiple-choice
case_study: false
answer: B
---

# Question 20 — Answer

**Correct answer: B. Verify and cleanse the Dataverse data.**

## Why B is correct

The agent fails to return relevant or accurate results, and the goal is to improve the quality and reliability of **data grounding**. Grounding quality is a function of the source data quality. Microsoft Learn's Power Platform Well-Architected guidance for Copilot Studio agents states this directly: "The principle of 'garbage in, garbage out' is particularly important for agents and emphasizes the need for high-quality data. Providing accurate information to the agent ensures reliable and correct responses."

Microsoft Learn's "Improve copilot responses from Microsoft Dataverse" article also confirms that the lever for accuracy when an agent grounds in Dataverse is the data itself (cleanliness, descriptions, synonyms, glossary terms). Verifying and cleansing the Dataverse data is the targeted action that improves grounding quality, which directly improves the agent's relevance and accuracy.

## Why the other options are wrong

**A. Retrain Agent1** is not how Copilot Studio agents work for grounded data. Copilot Studio agents don't get "retrained" on Dataverse data. They retrieve grounded answers from the data sources at runtime, so retraining isn't the lever for grounding quality.

**C. Use an adaptive card in Agent1** changes how responses are presented to users. It doesn't change the data the agent grounds in.

**D. Add example user inputs to the training data of Agent1** improves intent recognition for classic-orchestration trigger phrases. It doesn't fix grounding quality from Dataverse.

## Microsoft Learn references

- Improve copilot responses from Microsoft Dataverse — https://learn.microsoft.com/power-apps/maker/data-platform/data-platform-copilot
- Custom contact center solution with Copilot Studio agent (Reliability: garbage in, garbage out) — https://learn.microsoft.com/power-platform/architecture/solution-ideas/agent-custom-contact-center
- Add Dataverse tables as a knowledge source — https://learn.microsoft.com/microsoft-copilot-studio/knowledge-add-dataverse
- Grounding data design for AI workloads on Azure — https://learn.microsoft.com/azure/well-architected/ai/grounding-data-design
