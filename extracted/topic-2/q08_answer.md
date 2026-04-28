---
topic: 2
question: 8
type: hotspot
case_study: false
answer: Answer questions about company policies = From Copilot Studio, add SharePoint as a knowledge source; Identify which departments and policies are connected = From Copilot Studio, configure the SharePoint tool
---

# Question 8 — Answer

**Correct answers:**
- Enable the agent to answer questions about company policies: **From Copilot Studio, add SharePoint as a knowledge source.**
- Identify which departments and policies are connected: **From Copilot Studio, configure the SharePoint tool.**

## Why these answers are correct

### Add SharePoint as a knowledge source

From Microsoft Learn:

> "SharePoint as a knowledge source works by pairing your agent with a SharePoint URL or SharePoint lists."

> "When a user asks a question and the agent doesn't have a topic to use for an answer, the agent searches the URL and all subpaths... Generative answers summarize this content into a targeted response."

Adding the SharePoint document library as a knowledge source is the Microsoft-documented way to let a Copilot Studio agent answer policy questions grounded in 10,000 PDFs. Building a custom Foundry model, importing PDFs into Dataverse, or using AI Builder to feed SharePoint content are not the Microsoft-recommended low-code path here.

### Configure the SharePoint tool to use the Department column

The agent needs to understand that each policy PDF is associated with a Department column value. The SharePoint tool (along with SharePoint metadata filters and advanced settings on a SharePoint knowledge source) lets the agent reason over SharePoint metadata such as Title, Author, Modified by, Modified on, and other refinable managed properties.

From Microsoft Learn:

> "Improve response accuracy with SharePoint metadata filters. Use metadata like filename, owner, and modified date to refine knowledge retrieval and ensure responses come from the most relevant, up-to-date documents."

> "Makers can aid the performance of their agent's SharePoint knowledge source by specifying search query parameters... Build your filters to include or exclude information from your SharePoint knowledge source."

Configuring the SharePoint tool exposes that metadata to the agent so it can identify which department a policy belongs to. Purview sensitivity labels classify content for protection, not for connecting policies to departments. A Dataverse table for departments duplicates the existing SharePoint column. SharePoint Premium is not a prerequisite for this scenario.

## Microsoft Learn references

- Add SharePoint as a knowledge source (Copilot Studio) — https://learn.microsoft.com/microsoft-copilot-studio/knowledge-add-sharepoint
- Filter your SharePoint source (advanced settings, metadata filters) — https://learn.microsoft.com/microsoft-copilot-studio/knowledge-add-sharepoint#filter-your-sharepoint-source
- Add knowledge to an agent — https://learn.microsoft.com/microsoft-copilot-studio/knowledge-add-existing-copilot
- What's new in Copilot Studio (SharePoint metadata filters) — https://learn.microsoft.com/microsoft-copilot-studio/whats-new
