---
topic: 2
question: 7
type: hotspot
case_study: false
answer: AI-driven insights from customer orders = AI Summaries with Copilot; Anticipate future product needs = Generative insights for Demand planning
---

# Question 7 — Answer

**Correct answers:**
- Provide AI-driven insights from customer orders: **AI Summaries with Copilot**
- Anticipate future product needs: **Generative insights for Demand planning**

## Why these answers are correct

### AI summaries with Copilot for customer order insights

From Microsoft Learn:

> "AI summaries with Copilot... provide a quick overview of the most important information that's related to the page, personalized for the current user. Summaries can include information such as the number of lines on a purchase order, the number of items in a warehouse, or the number of overdue invoices for a vendor."

That description maps directly to the requirement to "surface key information from customer orders" for managers in Dynamics 365 Supply Chain Management. AI Summaries with Copilot is the Microsoft-recommended feature for that scenario.

The Customer credit and collections workspace targets credit and AR workflows, not generalized order insights. Workload insights with Copilot are specific to the Warehouse Management mobile app.

### Generative insights for Demand planning to anticipate future product needs

Demand planning in Dynamics 365 Supply Chain Management uses Copilot and generative insights to forecast demand based on multiple signals and patterns, with cell-level explainability and best-fit forecast models.

From Microsoft Learn:

> "Demand Planning: Copilot, generative insights, and cell-level explainability features improve forecasting accuracy."

> "Forecast with signals: Forecast based on multiple input signals by using calculations based on the Prophet forecast algorithm, XGBoost forecast algorithm, or best-fit forecast model."

That capability is the documented way to help planners "anticipate future product needs more accurately." Power BI is generic analytics. Product information management is master data, not forecasting. The Supplier Communications Agent automates procure-to-pay communications with vendors.

## Microsoft Learn references

- Agents, Copilot, and AI capabilities in Dynamics 365 apps (Supply Chain Management) — https://learn.microsoft.com/dynamics365/copilot/ai-get-started#dynamics-365-supply-chain-management
- Analyze demand plans with Copilot — https://learn.microsoft.com/dynamics365/supply-chain/demand-planning/demand-planning-copilot
- Enhance your demand forecasting and planning (generative insights) — https://learn.microsoft.com/dynamics365/release-plan/2025wave1/finance-supply-chain/dynamics365-supply-chain-management/enhance-demand-forecasting-planning
- AI summaries with Copilot — https://learn.microsoft.com/dynamics365/supply-chain/get-started/copilot-summaries-overview
