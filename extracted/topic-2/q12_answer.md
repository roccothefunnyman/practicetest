---
topic: 2
question: 12
type: multiple-choice
case_study: false
answer: D
---

# Question 12 — Answer

**Correct answer: D. a Microsoft Copilot Studio agent that uses Microsoft Power Automate workflows**

## Why D is correct

The scenario calls for a low-development-effort solution that supports intelligent automation, integrates with multiple systems, and handles a connected sequence of tasks: extract order details from files, save and update records in a database, and send confirmation emails. A Copilot Studio agent that uses Power Automate workflows (cloud flows or agent flows) is the Microsoft-recommended low-code pattern for this combination of conversational, intelligent, and deterministic automation.

From Microsoft Learn:

> "Agents built in Copilot Studio gain new capabilities through integration with other online services... Power Platform offers a rich ecosystem of built-in connectors that are available to Copilot Studio."

> "Agent flows execute a series of actions in a predefined sequence. They use the low-code actions found in Power Platform connectors. Agents can pass values as input to an agent flow and receive their outputs."

> "Streamline document processing with AI Builder... Power Automate orchestrates workflows for document processing."

This pattern is also reflected in Microsoft's reference architectures for vendor invoice processing and document processing, where Power Automate cloud flows orchestrate the work, AI Builder or AI prompts handle extraction, and Dataverse or back-end systems store the records.

## Why the other options are wrong

**A. A workflow in Azure Logic Apps** can orchestrate the work, but it is a pro-developer service and does not minimize development effort or provide a built-in conversational front door for review and exception handling.

**B. A multi-agent solution that uses the Semantic Kernel SDK** is a code-first multi-agent framework. It is heavier than the requirement and increases development effort.

**C. A multi-agent solution that uses Microsoft Foundry Agent Service** is a code- and configuration-driven platform for hosted, prompt, or workflow agents. It does more than required and is not the low-code, low-effort solution Microsoft recommends for this scenario.

## Microsoft Learn references

- Plan and design integration strategies (Copilot Studio integrations) — https://learn.microsoft.com/microsoft-copilot-studio/guidance/integrations
- Use agent flows with your agent — https://learn.microsoft.com/microsoft-copilot-studio/advanced-flow
- Streamline document processing with AI Builder — https://learn.microsoft.com/power-platform/architecture/reference-architectures/ai-document-processing
- Automate vendor invoice processing with Power Automate and AI Builder — https://learn.microsoft.com/power-platform/architecture/reference-architectures/vendor-invoice-integration
