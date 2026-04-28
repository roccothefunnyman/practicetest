---
topic: 1
question: 21
type: multiple-choice
case_study: false
answer: C
---

# Question 21 — Answer

**Correct answer: C. Implement Microsoft Power Platform connectors.**

## Why C is correct

The agent has to deliver accurate and timely responses while reaching customer data spread across four very different systems: ServiceNow, Dynamics 365 Finance, Dynamics 365 Supply Chain Management, and Excel files in SharePoint Online. The Microsoft-recommended way to bring all four into a single Copilot Studio agent is via Power Platform connectors.

Microsoft Learn's "Add Power Platform connectors as knowledge (preview)" lists supported connectors that include exactly the systems in the question (ServiceNow, Dynamics 365, SharePoint, plus many others). Connectors give the agent live, authenticated access to those systems for both data retrieval (knowledge grounding) and actions. They also respect each source system's permissions and security model.

This is the documented Microsoft approach for an agent that must span heterogeneous enterprise systems and deliver current, accurate responses without copying or staging data into a separate store.

## Why the other options are wrong

**A. Implement a model router for query handling** routes between language models based on cost or capability. It does not address how the agent reaches data spread across ServiceNow, Dynamics 365, and SharePoint.

**B. Create custom prompts** does not connect the agent to data. Prompts shape model behavior; they don't bridge external systems.

**D. Enable incremental indexing in Azure AI Search** is a data preparation optimization for Azure AI Search indexes. It is helpful when AI Search is the grounding store, but it doesn't connect the agent to ServiceNow, Dynamics 365 Finance, Dynamics 365 Supply Chain Management, or SharePoint Excel files. The question is about reaching multiple disparate sources, not about indexing speed in one of them.

## Microsoft Learn references

- Add Power Platform connectors as knowledge — https://learn.microsoft.com/microsoft-copilot-studio/knowledge-real-time-connectors
- Use Power Platform connectors in Copilot Studio — https://learn.microsoft.com/microsoft-copilot-studio/advanced-connectors
- Microsoft 365 Copilot connectors overview — https://learn.microsoft.com/microsoft-365/copilot/connectors/overview
- Add unstructured data as a knowledge source (SharePoint) — https://learn.microsoft.com/microsoft-copilot-studio/knowledge-add-unstructured-data
