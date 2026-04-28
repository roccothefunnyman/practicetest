---
topic: 1
question: 31
type: multi-select
case_study: true
answer: A, C
---

# Question 31 — Answer

**Correct answers: A. the GPT models used for the agent, and C. the agent orchestration method**

## Why these answers are correct

The Contoso case study states: "The CFO will analyze all the AI solutions quarterly to compare the estimated ROI against actual measured efficiencies and adoption. The CFO will use the Copilot Studio agent usage estimator to perform this analysis."

Microsoft Learn's Copilot Studio billing/licensing pages describe the inputs to the Copilot Studio agent usage estimator directly: "Forecast your agent's Copilot Credits volume using the Microsoft Copilot Studio agent usage estimator. Create estimates and potential consumption impacts by selecting from agent type, traffic, **orchestration**, knowledge, and tools."

The estimator (and Copilot Credits cost in general) is sensitive to two design choices that the CFO would evaluate:

- **A. The GPT models used for the agent.** Copilot Studio's models page and the Application Card describe how different language models (GPT-4o, GPT-4.1, GPT-5, third-party models) drive different consumption and capability profiles. Model choice directly affects Copilot Credit consumption per interaction, which is a primary cost driver in the estimator and therefore central to the CFO's quarterly ROI analysis.

- **C. The agent orchestration method.** Orchestration (generative vs. classic) is an explicit input to the agent usage estimator. Generative orchestration consumes more Copilot Credits per interaction because the model is used to plan and select tools, topics, and knowledge dynamically. Classic orchestration is more deterministic and typically consumes fewer credits. The CFO must consider this in the quarterly analysis.

## Why the other options are wrong

**B. The average characters in a chat message** is not an input to the agent usage estimator and is not a primary Copilot Credit cost driver. Copilot Credits are billed by activity type and orchestration model usage, not character count.

**D. The average session time per agent** is a usage observation metric, not an input to the agent usage estimator. The CFO's tool of choice is the estimator, which forecasts based on agent type, traffic, orchestration, knowledge, and tools. Session time is closer to engagement analytics than ROAI cost forecasting.

## Microsoft Learn references

- Copilot Studio licensing (agent usage estimator) — https://learn.microsoft.com/microsoft-copilot-studio/billing-licensing
- Microsoft Copilot Studio agent usage estimator — https://learn.microsoft.com/microsoft-copilot-studio/agent-usage-estimator
- Billing rates and management (Copilot Credits) — https://learn.microsoft.com/microsoft-copilot-studio/requirements-messages-management
- Select a primary AI model for your agent — https://learn.microsoft.com/microsoft-copilot-studio/authoring-select-agent-model
- Orchestrate agent behavior with generative AI — https://learn.microsoft.com/microsoft-copilot-studio/advanced-generative-actions
