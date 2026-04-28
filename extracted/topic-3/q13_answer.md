---
topic: 3
question: 13
type: hotspot
case_study: false
answer: Test scenario = Run task-based scenarios that involve both apps; Metric = Track the successful completion of cross-app tasks
---

# Question 13 — Answer

**Correct answer:**
- **Test scenario: Run task-based scenarios that involve both apps.**
- **Metric: Track the successful completion of cross-app tasks.**

## Why these selections are correct

The agent must coordinate tasks across Dynamics 365 Customer Service and Dynamics 365 Sales and interpret user input to produce contextually relevant outputs. End-to-end testing for that requires task-based scenarios that exercise both applications together. Isolated tests in each app would not validate cross-app coordination, and visual consistency tests do not validate functional behavior.

Microsoft's evaluation guidance for Copilot Studio agents focuses on real task execution. The Copilot Studio Kit and Power Platform pipelines run automated test cases that validate agent behavior end-to-end before promotion. Tracking successful completion of those cross-app tasks is the metric that reflects whether the agent actually performed the intended work. Initial prompt response time measures latency only, and click rate is not a meaningful agent quality metric.

## Microsoft Learn references

- Automate testing and deployment of agents using pipelines in Power Platform — https://learn.microsoft.com/microsoft-copilot-studio/guidance/kit-automate-test-deploy
- Copilot Studio Kit overview — https://learn.microsoft.com/microsoft-copilot-studio/guidance/kit-overview
- Improve your Copilot Studio projects (analytics and outcomes) — https://learn.microsoft.com/microsoft-copilot-studio/guidance/improve-overview
- Measure agent outcomes — https://learn.microsoft.com/microsoft-copilot-studio/guidance/measuring-outcomes
