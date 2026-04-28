---
topic: 1
question: 29
type: hotspot
case_study: false
answer: Centralized workspace = A Microsoft Foundry hub; Generate short overviews = An AI Builder prebuilt prompt
---

# Question 29 — Answer

**Correct answer:**
- Use a centralized workspace: **A Microsoft Foundry hub**
- Generate short overviews: **An AI Builder prebuilt prompt**

## Why these answers are correct

For the centralized AI workspace requirement, **a Microsoft Foundry hub** is the documented Microsoft pattern. Microsoft Foundry hubs are the central workspace for managing AI models, projects, and resources in Azure. They give teams a shared location for model deployment, governance, and collaboration. Microsoft Learn's Foundry control-plane and architecture documentation describe hubs as the centralized organizational container for AI work.

For generating short overviews of unstructured text **without requiring additional training or coding**, **an AI Builder prebuilt prompt** is the right answer. Microsoft Learn's "Get started with prebuilt prompts" article documents the AISummarize prebuilt prompt, which "summarizes the text that you provide" (input: text, output: summarized text). It is available out of the box in Power Automate, Power Apps, and Dataverse low-code plug-ins. No training is required and no code has to be written, which exactly matches the requirement.

## Why the other options are wrong (for the slot they don't fit)

**Azure OpenAI Foundry** is a model service, not a centralized AI workspace abstraction in the way a Foundry hub is.

**Microsoft Copilot Studio** is the platform for building agents, not the centralized workspace for AI models in the Foundry sense.

**Microsoft Dataverse** is the data backbone, not an AI model workspace.

**An AI Builder prebuilt model** refers to AI Builder's prebuilt models (form processing, receipt processing, etc.), which are separate from prebuilt prompts. The prebuilt prompts (AISummarize, AISentiment, AIReply, AIClassify, AIExtract, AITranslate) are the no-training, no-coding text-generation features.

**Azure OpenAI** requires more setup than the requirement allows ("without requiring additional training or coding") and is not an AI Builder out-of-the-box prompt.

**GitHub Copilot** is a developer code-completion tool, not a Power Automate text-summarization feature.

**Microsoft Copilot in Power Automate** assists makers in building flows; it is not the no-code summarization element you place inside a flow.

## Microsoft Learn references

- Get started with prebuilt prompts (AISummarize) — https://learn.microsoft.com/ai-builder/prebuilt-prompts
- Microsoft Foundry hubs (architecture overview) — https://learn.microsoft.com/azure/foundry/concepts/foundry-models-overview
- AI Builder in Power Automate overview — https://learn.microsoft.com/ai-builder/use-in-flow-overview
- Prompt builder — https://learn.microsoft.com/power-platform/release-plan/2025wave1/ai-builder/prompt-builder
