---
topic: 3
question: 20
type: multiple-choice
case_study: false
answer: E
---

# Question 20 — Answer

**Correct answer: E. Microsoft Purview**

## Why E is correct

The requirement is governance that monitors and audits changes to model configurations and data usage with minimal administrative effort. Microsoft Purview is the unified governance and compliance platform Microsoft positions for AI workloads. Microsoft Learn describes Purview's native integration with Azure AI Foundry: "Azure Admins can turn on the setting for any given Azure subscription. There's no action your developers need to take. This setting enables data from all Azure AI based applications running in that subscription to be sent to Microsoft Purview to support governance and compliance outcomes." Purview Audit captures activity logs, DSPM for AI provides visibility into data interactions and policy violations, and the integration is configured at the subscription level, which minimizes administrative effort.

## Why the other options are wrong

**A. Azure Monitor** collects logs and metrics for diagnostics. It can ingest activity but does not provide AI-specific governance, audit, and data usage tracking out of the box.

**B. Azure Stream Analytics** processes streaming data. It is not a governance tool.

**C. Azure API Management** front-doors APIs and enforces gateway policies. It does not audit AI model configuration changes.

**D. Azure Policy** enforces rules on resource configurations and detects non-compliance. It does not capture detailed audit trails for data usage or AI app interactions.

## Microsoft Learn references

- Use Microsoft Purview to manage data security and compliance for Microsoft Foundry — https://learn.microsoft.com/purview/ai-azure-foundry
- Microsoft Purview data security and compliance protections for generative AI apps — https://learn.microsoft.com/purview/ai-microsoft-purview
- Audit Copilot Studio activities in Microsoft Purview — https://learn.microsoft.com/microsoft-copilot-studio/admin-logging-copilot-studio
- Enable Data Security for Azure AI with Microsoft Purview — https://learn.microsoft.com/azure/defender-for-cloud/ai-onboarding#enable-data-security-for-azure-ai-with-microsoft-purview
