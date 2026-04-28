---
topic: 1
question: 28
type: multiple-choice
case_study: false
answer: C
---

# Question 28 — Answer

**Correct answer: C. Total Cost of Ownership (TCO) Calculator**

## Why C is correct

The requirement is to **evaluate the potential cost** of an Azure AI solution to support an ROAI analysis. That is a forward-looking estimate of cost before deployment, and it is exactly the use case for the Microsoft TCO Calculator.

Microsoft Learn's "Make an inventory and collect data" article describes the TCO Calculator as the tool to "compare the costs of running your workloads on-premises versus on Azure" and to gain "insights into potential cost savings and efficiencies." The "Describe cost management in Azure" learning module teaches the TCO Calculator alongside the Pricing Calculator as the planning tools you use **before** deploying workloads, which is the input ROAI analysis needs.

For an organization evaluating the cost of a new sentiment-analysis solution before deployment, the TCO Calculator (or Pricing Calculator) is the documented planning tool, and TCO is the option offered.

## Why the other options are wrong

**A. Cost Management + Billing** analyzes **actual** Azure spending after deployment. It is not a planning/estimation tool for a solution that hasn't been built yet.

**B. Microsoft Fabric SKU Estimator** estimates Microsoft Fabric capacity costs specifically. It is too narrow for evaluating a broader AI sentiment-analysis solution that may use Azure AI services beyond Fabric.

**D. Azure Reservations** is a purchasing option that gives discounts for committed usage. It is not an estimation tool for evaluating potential cost.

## Microsoft Learn references

- Make an inventory and collect data (TCO Calculator) — https://learn.microsoft.com/azure/app-modernization-guidance/assess/make-an-inventory-and-collect-data
- Compare the Pricing and Total Cost of Ownership calculators (training) — https://learn.microsoft.com/training/modules/describe-cost-management-azure/3-compare-pricing-total-cost-of-ownership-calculators
- Plan to manage costs for Azure OpenAI — https://learn.microsoft.com/azure/ai-foundry/openai/how-to/manage-costs
- Estimate costs with the Azure pricing calculator — https://learn.microsoft.com/azure/cost-management-billing/costs/pricing-calculator
