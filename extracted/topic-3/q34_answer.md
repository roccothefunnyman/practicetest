---
topic: 3
question: 34
type: drag-drop
case_study: false
answer: Compliance = Microsoft Purview; Performance/operational health = Azure Monitor
---

# Question 34 — Answer

**Correct answer:**
- **Monitors AI apps and agents for compliance: Microsoft Purview**
- **Monitors performance metrics and operational health: Azure Monitor**

## Why these selections are correct

**Microsoft Purview** is Microsoft's compliance and governance platform for AI. Microsoft Learn describes Purview's native integration with Microsoft Foundry and Azure OpenAI: subscription-level toggling sends prompts and responses to Purview for audit, communication compliance, DLP, DSPM for AI, and insider risk monitoring. That matches "monitor AI apps and agents for compliance" and uses Azure-native capabilities with minimal development effort.

**Azure Monitor** collects metrics, logs, and traces from Azure OpenAI and Foundry resources. It is the Azure-native observability platform for performance and operational health: latency, throughput, request volume, errors, dependencies. Application Insights (a feature of Azure Monitor) feeds the Foundry Agent Monitoring Dashboard.

Defender protects against threats and discovers AI workloads but is not the operational performance monitor. Azure Policy enforces configuration, API Management front-doors APIs, and Stream Analytics processes streaming data, none of which fits either requirement.

## Microsoft Learn references

- Use Microsoft Purview to manage data security and compliance for Microsoft Foundry — https://learn.microsoft.com/purview/ai-azure-foundry
- Microsoft Purview data security and compliance protections for generative AI apps — https://learn.microsoft.com/purview/ai-microsoft-purview
- Monitor agents with the Agent Monitoring Dashboard (Azure Monitor / App Insights) — https://learn.microsoft.com/azure/foundry/observability/how-to/how-to-monitor-agents-dashboard
- Azure Monitor overview — https://learn.microsoft.com/azure/azure-monitor/overview
