---
topic: 2
question: 20
type: multiple-choice
case_study: false
answer: C
---

# Question 20 — Answer

**Correct answer: C. Microsoft Copilot Studio and AI Builder**

## Why C is correct

The requirements line up with the Microsoft-documented invoice processing pattern that uses AI Builder for document understanding and Copilot Studio for the agent and approval experience inside Microsoft Teams.

From Microsoft Learn (Streamline document processing with AI Builder):

> "AI Builder: Extracts key data from documents using prebuilt or custom models. Power Automate: Orchestrates workflows for document processing. Microsoft Dataverse: Serves as the central data store for extracted document data and tracks document progress through the business process."

From Microsoft Learn (Multistage and AI approvals in agent flows):

> "AI approvals are intelligent, automated decision steps in approval workflows. AI approvals use AI to evaluate approval requests against your business rules and return an 'Approved' or 'Rejected' decision with a rationale."

> "Responding to approvals... Users assigned to approvals can respond through: Microsoft Teams approvals app, Outlook, Power Automate portal."

AI Builder handles document analysis and data validation across multiple invoice formats. Copilot Studio (with agent flows and approvals) automates multi-step processing, exposes the agent and approval interaction inside Microsoft Teams, and minimizes development effort through low-code configuration of approval workflows.

## Why the other options are wrong

**A. Azure Document Intelligence in Foundry Tools and Azure Logic Apps** is a pro-developer pattern that requires more development effort than the low-code Copilot Studio plus AI Builder pattern. It also does not provide the native Teams agent and approval experience the question requires.

**B. A SharePoint agent** is a content-grounded Q&A agent over SharePoint sites. It is not designed to extract invoice fields from many formats, validate data, route approvals, or drive multi-step processing.

**D. Azure OpenAI and Azure Functions** is a pro-code pattern that requires significant custom development. It does not minimize development effort or provide built-in approval workflows.

## Microsoft Learn references

- Streamline document processing with AI Builder — https://learn.microsoft.com/power-platform/architecture/reference-architectures/ai-document-processing
- Automate vendor invoice processing with Power Automate and AI Builder — https://learn.microsoft.com/power-platform/architecture/reference-architectures/vendor-invoice-integration
- Multistage and AI approvals in agent flows — https://learn.microsoft.com/microsoft-copilot-studio/flows-advanced-approvals
- FAQ for AI Approvals — https://learn.microsoft.com/microsoft-copilot-studio/faqs-ai-approvals
