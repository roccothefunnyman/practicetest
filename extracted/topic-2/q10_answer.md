---
topic: 2
question: 10
type: multiple-choice
case_study: false
answer: C
---

# Question 10 — Answer

**Correct answer: C. Computer Use in Copilot Studio**

## Why C is correct

The scenario describes an agent that simulates user interactions on third-party apps and websites: clicking buttons, entering text, and extracting information from screens. Computer Use is the Microsoft-documented Copilot Studio tool built specifically for that pattern.

From Microsoft Learn:

> "Computer use is a feature in Copilot Studio that enables your agent to interact with any system with a graphical user interface (GUI), such as websites or desktop applications. It performs actions like pressing buttons, selecting menu options, and typing into fields—just like a human user. You simply describe the task in natural language, and the agent executes it on a configured computer with a virtual mouse and keyboard."

> "Computer use runs on Computer-Using Agents (CUA), an AI model that combines computer vision and reasoning to navigate and interact with GUIs. It adapts to interface changes... It's useful for automated data entry, invoice processing, and data extraction."

That maps line-for-line to the question's requirements.

## Why the other options are wrong

**A. Model Context Protocol (MCP)** is a standardized protocol for connecting agents to external tools, data, and services through a server. It does not click buttons or interact with arbitrary GUIs.

**B. A natural language understanding + (NLU+) model in Copilot Studio** improves intent recognition and entity extraction from user utterances. It does not perform GUI automation.

**D. Copilot skills** are reusable Bot Framework conversational components. They are not designed to drive a virtual mouse and keyboard across third-party UIs.

## Microsoft Learn references

- Automate web and desktop apps with computer use (Copilot Studio) — https://learn.microsoft.com/microsoft-copilot-studio/computer-use
- Computer use release plan (Copilot Studio) — https://learn.microsoft.com/power-platform/release-plan/2025wave1/microsoft-copilot-studio/automate-web-desktop-apps-computer-use
- FAQ for the computer use tool — https://learn.microsoft.com/microsoft-copilot-studio/faqs-computer-use
