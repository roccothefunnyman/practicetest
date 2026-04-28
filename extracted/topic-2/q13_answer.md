---
topic: 2
question: 13
type: hotspot
case_study: false
answer: Custom knowledge sources = Must be uploaded to the agent; AI general knowledge = Must be disabled for the agent
---

# Question 13 — Answer

**Correct answers:**
- Custom knowledge sources: **Must be uploaded to the agent**
- AI general knowledge: **Must be disabled for the agent**

## Why these answers are correct

The agent in question provides in-app help and guidance for finance and operations apps. The requirement is to minimize the risk of inaccurate responses.

### Custom knowledge sources must be uploaded to the agent

From Microsoft Learn:

> "You can add knowledge to the Copilot help and guidance feature by uploading files to Copilot Studio (in file formats such as PDF, RTF, or Word). If you want to add other types of knowledge (such as from Sharepoint or other data sources), then you must add your own topic in the Copilot for Finance and Operations apps agent in Copilot Studio."

Uploading approved, organization-specific content into the Copilot for Finance and Operations apps agent grounds answers in trusted sources, which reduces the risk of inaccurate responses.

### AI general knowledge must be disabled

From Microsoft Learn:

> "You can add the capability for Copilot to use AI general knowledge to answer general questions. This content includes information that is part of the language model that is used, web content that is identified through Bing Search, and information from other sources. Copilot uses this information after it exhausts the information from your custom knowledge sources."

> "Warning: When the use of general knowledge is enabled, it can increase the richness of Copilot responses. However, it also increases the risk that answers might include incorrect content. Before you publish AI general knowledge to your production system, be sure to carefully consider and test it."

When the requirement is to minimize the risk of inaccurate responses, the Microsoft-documented guidance is to keep AI general knowledge disabled so the agent answers only from grounded, trusted sources.

## Microsoft Learn references

- Add knowledge to generative help and guidance with Copilot — https://learn.microsoft.com/dynamics365/fin-ops-core/dev-itpro/copilot/extend-copilot-generative-help
- Generative help and guidance with Copilot (overview) — https://learn.microsoft.com/dynamics365/fin-ops-core/fin-ops/copilot/copilot-generative-help
- Enable generative help and guidance with Copilot — https://learn.microsoft.com/dynamics365/fin-ops-core/dev-itpro/copilot/enable-copilot-generative-help
