---
topic: 2
question: 4
type: multiple-choice
case_study: false
answer: D
---

# Question 4 — Answer

**Correct answer: D. Configure Microsoft Graph access.**

## Why D is correct

Microsoft 365 Copilot uses Microsoft Graph to bring tenant data (SharePoint sites, OneDrive, Teams chats and meetings, email, calendar) into prompts and responses. To let employees query a subset of SharePoint Online sites and Teams content with natural language and get contextually relevant responses, the design depends on Microsoft Graph access.

From Microsoft Learn:

> "Microsoft Graph includes information on users, their activities, and the organization data they can access. The Microsoft Graph API brings a personalized context into the prompt, like information from a user's emails, chats, documents, and meetings."

> "Microsoft 365 Copilot enhances search relevance and accuracy by using advanced lexical and semantic understanding of Microsoft Graph data, resulting in more contextually precise information retrieval. Copilot preserves security, compliance, and privacy, ensuring organizational boundaries are respected."

Configuring Microsoft Graph access (including semantic indexing for Microsoft 365 Copilot and the user's permissioned SharePoint and Teams content) is the foundational design step for natural-language queries that return contextually relevant answers in Microsoft 365 Copilot.

## Why the other options are wrong

**A. Build a Microsoft Power Automate desktop flow to read the SharePoint content and post the responses to Teams.** Desktop flows automate UI tasks on a local machine. They don't enable natural-language prompts in Microsoft 365 Copilot or contextual grounding in Graph.

**B. Modify SharePoint settings.** Adjusting site-level SharePoint settings alone does not deliver Microsoft 365 Copilot natural-language querying. Copilot's grounding still requires Microsoft Graph access and the appropriate Copilot service plan.

**C. Create a custom REST API that crawls the SharePoint content.** Building a custom crawler duplicates work that Microsoft Graph and the semantic index already perform, bypasses native security trimming, and isn't the design Microsoft recommends.

## Microsoft Learn references

- Microsoft 365 Copilot overview (Graph and semantic index) — https://learn.microsoft.com/microsoft-365/copilot/microsoft-365-copilot-overview
- Microsoft 365 Copilot architecture — https://learn.microsoft.com/microsoft-365/copilot/microsoft-365-copilot-architecture
- Overview of Microsoft Graph — https://learn.microsoft.com/graph/overview
- Microsoft 365 Copilot service plans (SharePoint and Teams plans) — https://learn.microsoft.com/microsoft-365/copilot/microsoft-365-copilot-service-plans
