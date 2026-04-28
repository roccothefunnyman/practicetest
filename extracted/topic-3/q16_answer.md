---
topic: 3
question: 16
type: hotspot
case_study: false
answer: Recent changes = Run tests against the latest unpublished version of the agent; Validate the flow = Add the flow to the agent as a tool
---

# Question 16 — Answer

**Correct answer:**
- **Validate the most recent changes to the agent before release: Run tests against the latest unpublished version of the agent.**
- **Validate the flow as part of the agent's orchestration: Add the flow to the agent as a tool.**

## Why these selections are correct

**Latest unpublished version:** Microsoft's testing guidance for Copilot Studio is to test agents in the maker authoring environment before publishing. The Test panel and the Copilot Studio Kit run tests against the unpublished, in-progress version so changes are validated before they reach users. Publishing the agent to a channel and testing on live users skips validation, and the production version is what you are trying to gate against.

**Flow as a tool:** Agent flows are added to a Copilot Studio agent as tools so the orchestrator can invoke them as part of conversation logic. Microsoft Learn says that to add a flow to an agent it "must be a solution flow and contain the When an agent calls the flow trigger and the Respond to the agent action," and the agent invokes it through the orchestrator. Validating the flow as part of the agent's orchestration therefore requires adding the flow as a tool. A canvas app is unrelated, and the Power Automate for desktop console is for unattended desktop flow runs, not for orchestrated agent calls.

## Microsoft Learn references

- Use agent flows with your agent — https://learn.microsoft.com/microsoft-copilot-studio/advanced-flow
- Call an agent flow — https://learn.microsoft.com/microsoft-copilot-studio/advanced-use-flow
- Agent flows in Microsoft Copilot Studio FAQ — https://learn.microsoft.com/microsoft-copilot-studio/flows-faqs
- Automate testing and deployment of agents using pipelines in Power Platform — https://learn.microsoft.com/microsoft-copilot-studio/guidance/kit-automate-test-deploy
