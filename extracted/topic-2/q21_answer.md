---
topic: 2
question: 21
type: multiple-choice
case_study: false
answer: B
---

# Question 21 — Answer

**Correct answer: B. Create a custom connector in Copilot Studio and use the connector to call the API.**

## Why B is correct

A custom connector in Copilot Studio is a low-code wrapper around a REST API. It supports standard authentication (Microsoft Entra ID, OAuth 2.0, basic auth, API key), can be reused across agents, and is the Microsoft-recommended way to securely call a REST API from a Copilot Studio agent with minimal development effort.

From Microsoft Learn:

> "A custom connector is a wrapper around a REST API that allows Logic Apps, Power Automate, Power Apps, or Copilot Studio to communicate with that REST or SOAP API."

> "Custom connectors: When there's no prebuilt connector available, you can build your own connector for a service. They're a no-code or low-code wrapper for REST APIs."

> "Use one of these standard authentication methods for your APIs and connectors (Microsoft Entra ID is recommended): Generic OAuth 2.0; OAuth 2.0 for specific services... Basic authentication; API Key."

That covers both the secure REST API call and the minimal-development-effort requirement.

## Why the other options are wrong

**A. Export the agent as a managed solution and customize the agent in Power Apps.** Exporting and re-customizing in Power Apps doesn't securely call a REST API and doesn't minimize development effort.

**C. Use a Microsoft Power Automate desktop flow to screen scrape the warranty data.** Screen scraping is brittle, doesn't use the REST API, and isn't a secure or low-effort way to retrieve warranty data.

**D. Add the warranty data to the Fallback topic.** The Fallback topic captures unrecognized intent. It doesn't retrieve live data from a REST API and isn't the design pattern for secure API integration.

## Microsoft Learn references

- Use Power Platform connectors as tools (Copilot Studio) — https://learn.microsoft.com/microsoft-copilot-studio/advanced-connectors
- Custom connectors overview — https://learn.microsoft.com/connectors/custom-connectors/
- Plan and design integration strategies (Copilot Studio) — https://learn.microsoft.com/microsoft-copilot-studio/guidance/integrations
- Extend your agent with tools from a REST API (preview) — https://learn.microsoft.com/microsoft-copilot-studio/agent-extend-action-rest-api
