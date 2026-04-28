---
topic: 1
question: 9
type: multiple-choice
case_study: false
answer: C
---

# Question 9 — Answer

**Correct answer: C. Configure a task agent to generate fraud risk scores for the human analyst to review.**

## Why C is correct

The requirement has two parts:
1. Automate the review process for customer transaction histories.
2. Ensure escalations reach a **human analyst for final decision making**.

A task agent that generates fraud risk scores fits both parts. The agent takes a defined task (analyze the transaction history, output a risk score), the human analyst reviews the score, and the analyst still owns the final escalation decision. This pattern is the human-in-the-loop design Microsoft Learn recommends for sensitive financial scenarios. The Azure Cloud Adoption Framework's AI agent guidance describes task agents as agents that "perform specific tasks within defined workflows" with knowledge plus action tools, and recommends keeping autonomous decision-making out of high-stakes financial processes.

The Microsoft Copilot Studio responsible AI guidance and the Copilot Studio anomaly detection solution idea both stress that for finance fraud-style work, the agent should surface findings (with severity scores and recommendations) and route them to a human reviewer rather than auto-resolving cases.

## Why the other options are wrong

**A. Deploy an autonomous agent that closes non-fraud cases automatically** removes the human from cases the agent decides are not fraud. That violates the requirement that escalations reach a human analyst for final decision making, and it conflicts with Microsoft's responsible AI guidance for high-impact financial actions.

**B. Use Microsoft 365 Copilot in Word to automatically finalize fraud detection policies** is unrelated. Word Copilot drafts documents; it doesn't review transactions or generate risk scores.

**D. Export the data to a data lake for analysis in Microsoft Power BI** gives the analyst dashboards but no automation of the review process. Power BI is reporting, not an agent.

## Microsoft Learn references

- AI agent types (task agents) — https://learn.microsoft.com/azure/cloud-adoption-framework/ai-agents/
- Build anomaly detection with Copilot Studio and Fabric — https://learn.microsoft.com/power-platform/architecture/solution-ideas/agent-anomaly-detection
- Responsible AI principles for Copilot Studio — https://learn.microsoft.com/microsoft-copilot-studio/guidance/responsible-ai
- Best practices for integrating and deploying Copilot Studio (human oversight) — https://learn.microsoft.com/microsoft-copilot-studio/system-service-card-copilot-studio
