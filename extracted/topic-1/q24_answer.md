---
topic: 1
question: 24
type: drag-drop
case_study: false
answer: Orchestrate the sales order fulfillment and shipping = Task; Analyze historical data and trends = Autonomous
---

# Question 24 — Answer

**Correct answer:**
- Orchestrate the sales order fulfillment and shipping: **Task**
- Analyze historical data and trends to replenish stock: **Autonomous**

## Why these answers are correct

Microsoft Learn's Cloud Adoption Framework for AI agents categorizes agents as productivity (retrieval), task (action), and automation (autonomous) agents. The Microsoft Copilot Studio guidance and Dynamics 365 Business Central agent documentation also describe these roles in the same way:

- **Task agent** for sales order fulfillment and shipping. A task agent "performs specific tasks within defined workflows, such as updating records or triggering processes." That maps cleanly to orchestrating sales order fulfillment and shipping, which is a workflow with defined steps and structured handoffs (verify items, create the order, generate shipping documents, notify the customer).

- **Autonomous agent** for analyzing historical data and trends to replenish stock. Microsoft Learn's "Design autonomous agent capabilities" article describes autonomous agents as agents that "perceive events, make decisions, and execute tasks independently by using triggers, instructions, and guardrails," and that "operate continuously in the background, monitoring data, reacting to conditions, and running workflows at scale." Replenishment driven by historical-trend analysis is exactly that pattern: the agent monitors stock levels and historical sales, decides when and how much to reorder, and triggers the replenishment process without waiting for a user prompt.

## Why the other option is wrong

**Prompt-and-response** agents respond to direct user questions with retrieved or generated answers. Neither orchestration of multi-step fulfillment nor autonomous trend monitoring fits a simple prompt-and-response model.

## Microsoft Learn references

- AI agent adoption (productivity, task, automation agents) — https://learn.microsoft.com/azure/cloud-adoption-framework/ai-agents/
- Design autonomous agent capabilities — https://learn.microsoft.com/microsoft-copilot-studio/guidance/autonomous-agents
- Sales Order Agent overview (task automation example) — https://learn.microsoft.com/dynamics365/business-central/sales-order-agent
- Commerce agent templates (Inventory Fulfillment Agent) — https://learn.microsoft.com/dynamics365/guidance/agent-templates/commerce-agent-templates
