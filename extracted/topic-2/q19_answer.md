---
topic: 2
question: 19
type: multiple-choice
case_study: false
answer: A
---

# Question 19 — Answer

**Correct answer: A. Computer Use in Copilot Studio**

## Why A is correct

The web app's UI changes frequently, which breaks brittle automations that target specific selectors or coordinates. Computer Use in Copilot Studio is built on a Computer-Using Agent model that combines computer vision and reasoning to interpret the screen at runtime, so it adapts when buttons or layouts shift, with no maker code changes.

From Microsoft Learn:

> "Computer use is a feature in Copilot Studio that enables your agent to interact with any system with a graphical user interface (GUI), such as websites or desktop applications."

> "Computer use runs on Computer-Using Agents (CUA), an AI model that combines computer vision and reasoning to navigate and interact with GUIs. It adapts to interface changes, so it continues working even if buttons or layouts shift."

That is exactly the requirement: keep the agent working through frequent UI changes, while minimizing changes to the agent.

## Why the other options are wrong

**B. Custom models in Azure AI Studio** introduce model-training effort and don't, on their own, perform GUI automation that adapts to UI changes.

**C. Conversation topics in Copilot Studio** are conversational dialog steps. They aren't a GUI automation engine and don't help with UI drift in a target web app.

**D. An agent flow in Copilot Studio** runs deterministic actions through Power Platform connectors. If the target web app has no API and the UI keeps changing, an agent flow doesn't adapt to UI changes the way Computer Use does.

## Microsoft Learn references

- Automate web and desktop apps with computer use (Copilot Studio) — https://learn.microsoft.com/microsoft-copilot-studio/computer-use
- Computer use release plan — https://learn.microsoft.com/power-platform/release-plan/2025wave1/microsoft-copilot-studio/automate-web-desktop-apps-computer-use
- FAQ for the computer use tool — https://learn.microsoft.com/microsoft-copilot-studio/faqs-computer-use
