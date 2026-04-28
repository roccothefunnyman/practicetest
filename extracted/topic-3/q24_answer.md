---
topic: 3
question: 24
type: multiple-choice
case_study: false
answer: A
---

# Question 24 — Answer

**Correct answer: A. Application Insights**

## Why A is correct

Application Insights is the Azure service Microsoft positions for comprehensive Copilot Studio agent telemetry. Microsoft Learn explains that Copilot Studio sends conversations, events, exceptions, latency, and tool usage to Application Insights and that the Copilot Studio Dashboard workbook surfaces single-pane operational metrics across these signals. For agents running across multiple channels, Application Insights captures the channel dimension on each event, allowing cross-channel performance comparisons through Azure Workbooks, Log Analytics queries, and dashboards.

## Why the other options are wrong

**B. Azure Advisor** issues best-practice recommendations on Azure resources. It is not a telemetry surface for Copilot Studio agents.

**C. Azure DevOps** provides source control and pipelines for ALM. It does not collect agent telemetry.

**D. Microsoft Dynamics 365 Customer Voice** is a survey product. It captures user feedback, not comprehensive agent telemetry.

## Microsoft Learn references

- Capture telemetry with Application Insights (Copilot Studio) — https://learn.microsoft.com/microsoft-copilot-studio/advanced-bot-framework-composer-capture-telemetry
- Configure telemetry to capture bot data — https://learn.microsoft.com/microsoft-copilot-studio/advanced-bot-framework-composer-capture-telemetry
- Combine web and agent analytics — https://learn.microsoft.com/microsoft-copilot-studio/guidance/pass-web-analytics-tracking-id-from-webpage
