---
topic: 1
question: 2
type: multiple-choice
case_study: true
answer: A
---

# Question 2 — Answer

**Correct answer: A. Microsoft Cloud Adoption Framework for Azure**

## Why A is correct

The case study sets two requirements that together point directly at the Cloud Adoption Framework (CAF):

1. "Azure must be used for all future infrastructure workloads."
2. "The company must follow Microsoft-recommended methodologies for infrastructure migration to the cloud."

The Microsoft Cloud Adoption Framework for Azure is Microsoft's prescriptive, end-to-end methodology for adopting Azure. It explicitly covers infrastructure migration through the CAF Migrate methodology (Plan, Prepare, Execute, Optimize, Decommission), and it is the framework Microsoft Learn points enterprises to when they need to "evaluate their existing IT estate and determine the best migration strategy for each workload."

From Microsoft Learn:

> "The Cloud Adoption Framework is about adopting cloud technologies and integrating them into your business. It provides proven practices to govern, secure, and manage all workloads. It provides structured processes for migrating, modernizing, and building cloud-native solutions."

> "If you're new to Azure, start here. The Cloud Adoption Framework guides you through organizational preparation. It describes Azure enrollment setup, platform landing zone configuration, and migration plan prioritization. Complete these foundational steps before you move workloads."

That maps cleanly to Fabrikam's stated need: a Microsoft-recommended methodology for migrating on-premises infrastructure to Azure.

## Why the other options are wrong

**B. Success by Design** is Microsoft's framework for **Dynamics 365 implementation projects**, not infrastructure migration. Microsoft Learn describes it as "prescriptive guidance (approaches and recommended practices) for successfully architecting, building, testing, and deploying Dynamics 365 solutions." Fabrikam will use Success by Design when it implements Dynamics 365 Sales (a separate workstream in this case study), but it is not the framework for moving infrastructure to Azure.

**C. Microsoft Power Platform Center of Excellence (CoE)** is a governance and adoption toolkit for Power Platform environments (apps, flows, makers, environments). It is not an infrastructure-migration framework.

**D. Microsoft Power Platform Project Setup Wizard** scaffolds a Power Platform implementation project. It is not a methodology for migrating on-premises infrastructure to Azure.

## Microsoft Learn references

- What is the Microsoft Cloud Adoption Framework? — https://learn.microsoft.com/azure/cloud-adoption-framework/overview
- Migrate workloads to Azure (CAF as the recommended migration starting point) — https://learn.microsoft.com/azure/migration/migrate-to-azure
- CAF Migrate — Plan your migration — https://learn.microsoft.com/azure/cloud-adoption-framework/migrate/plan-migration
- CAF Plan — Prepare your organization for the cloud — https://learn.microsoft.com/azure/cloud-adoption-framework/plan/prepare-organization-for-cloud
- Introduction to Success by Design (scope: Dynamics 365 implementations) — https://learn.microsoft.com/dynamics365/guidance/implementation-guide/success-by-design
