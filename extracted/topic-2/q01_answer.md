---
topic: 2
question: 1
type: multiple-choice
case_study: true
answer: C
---

# Question 1 — Answer

**Correct answer: C. Voice in Microsoft Copilot Studio**

## Why C is correct

The case study tells you the sales executives "use handsfree headsets to interact with an AI agent when they have questions about internal policies or customer data." The Voice agent template in Microsoft Copilot Studio is built specifically for that scenario.

From Microsoft Learn:

> "By using the Voice agent template, you can build a voice-enabled agent that provides an effective self-service, hands-free solution from a phone. Customers can interact with the agent by using natural language and choosing options from a touch-tone menu."

The Voice template enables the Telephony channel by default, includes Speech and DTMF modality, and ships with voice-related system topics (Silence detection, Speech unrecognized, Unknown dial pad press). It is the Microsoft-recommended template when the conversational user experience must be hands-free and speech-driven, which is exactly what Fabrikam's stated requirement specifies.

## Why the other options are wrong

**A. IT Helpdesk in Microsoft Copilot Studio** is a custom agent template aimed at IT support scenarios (password resets, ticket creation, common helpdesk topics). It has no inherent voice or hands-free capability and does not match Fabrikam's hands-free headset requirement.

**B. AI agents in Microsoft Foundry** is a code-first or workflow-first agent platform for prompt agents, workflow agents, and hosted agents. It is more developer-oriented and does not provide a low-code, hands-free voice template aligned to Fabrikam's "single AI agent that has Dataverse as its core component" and conversational sales-executive scenario.

**D. AI chat in Microsoft Foundry** is a text-based chat capability in Foundry. It does not deliver the speech-driven, telephony-style interaction the case study calls for.

## Microsoft Learn references

- Voice agent template (Copilot Studio) — https://learn.microsoft.com/microsoft-copilot-studio/voice-build-from-template
- Configure basic voice agents (SSML, DTMF, transfer, termination) — https://learn.microsoft.com/microsoft-copilot-studio/voice-configuration
- Create a custom agent from an agent template — https://learn.microsoft.com/microsoft-copilot-studio/template-fundamentals
- Microsoft Foundry Agent Service overview (for contrast) — https://learn.microsoft.com/azure/foundry/agents/overview
