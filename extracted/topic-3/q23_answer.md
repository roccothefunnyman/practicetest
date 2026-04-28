---
topic: 3
question: 23
type: multiple-choice
case_study: false
answer: A
---

# Question 23 — Answer

**Correct answer: A. Track resolution, deflection, and accuracy by using dashboards and use scripts to ensure consistent responses.**

## Why A is correct

The three requirements (evaluate effectiveness during active sessions, validate accuracy and helpfulness, and produce measurable, actionable insights for continuous improvement) align with the Copilot Studio analytics + scripted-test pattern. The Analytics dashboard tracks resolution rate, escalation rate, and deflection in near-real-time, and the Generated answer rate and quality section measures whether responses are accurate. Scripted tests, run through the Test panel or the Copilot Studio Kit's automated testing pipeline, drive consistency by validating the same prompts produce the expected behavior across releases. Together, dashboards plus scripted regression tests deliver measurable signals and a continuous-improvement loop.

## Why the other options are wrong

**B. Perform load testing to validate how the agent scales under a high chat volume.** Load testing measures throughput and latency, not accuracy or helpfulness.

**C. Review historical tickets to find agents that have the shortest resolution times.** Historical ticket review evaluates human reps, not the AI agent's effectiveness during active sessions.

**D. Measure uptime and page load times.** These are infrastructure metrics, not agent quality metrics.

## Microsoft Learn references

- Analyze conversational agent effectiveness — https://learn.microsoft.com/microsoft-copilot-studio/analytics-improve-agent-effectiveness
- Deflection overview — https://learn.microsoft.com/microsoft-copilot-studio/guidance/deflection-overview
- Automate testing and deployment of agents using pipelines in Power Platform — https://learn.microsoft.com/microsoft-copilot-studio/guidance/kit-automate-test-deploy
- Improve your Copilot Studio projects — https://learn.microsoft.com/microsoft-copilot-studio/guidance/improve-overview
