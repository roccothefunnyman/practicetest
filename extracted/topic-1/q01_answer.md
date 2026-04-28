---
topic: 1
question: 1
type: hotspot
case_study: true
answer: Microsoft Power Platform Well-Architected framework; Success by Design
---

# Question 1 — Answer

**Correct answer:**
- For Microsoft Copilot Studio best practices: **Microsoft Power Platform Well-Architected framework**
- For conversational user experiences: **Success by Design**

## Why these answers are correct

Fabrikam's case study calls out two distinct sets of guidance the team needs:

1. Microsoft-recommended best practices for the Copilot Studio agent itself (the low-code agent built on Dataverse).
2. Microsoft recommendations for the agent's conversational user experience (the headset-driven AI agent for the sales executives).

**Microsoft Power Platform Well-Architected framework** is the published Microsoft framework for designing, planning, and implementing modern application workloads with Power Platform, including Copilot Studio agents. It is organized around five pillars (Reliability, Security, Operational Excellence, Performance Efficiency, Experience Optimization) and is what Microsoft Learn directs makers to when they want best-practice design guidance for Copilot Studio.

**Success by Design** includes Microsoft's prescriptive guidance for conversational user experiences in Power Platform and Dynamics 365 implementations. The Power Platform Well-Architected Experience Optimization pillar (which is part of the broader Microsoft guidance set) publishes the article "Recommendations for designing conversational user experiences" for conversational AI design. In this exam family, "conversational user experiences" maps to Success by Design's experience guidance for Dynamics 365 and Power Platform projects, which is what Fabrikam's stated requirement ("the final AI agent must follow Microsoft recommendations for a conversational user experience") points to.

## Why the other options are wrong

**ALM Accelerator for Microsoft Power Platform** is a tool for application lifecycle management (source control, pipelines, deployments). It is not a best-practice or conversational-design framework.

**Microsoft Cloud Adoption Framework for Azure** is the framework for adopting Azure infrastructure (used in Question 2 for the infrastructure migration), not Copilot Studio agent design or conversational UX.

## Microsoft Learn references

- Microsoft Power Platform Well-Architected — https://learn.microsoft.com/power-platform/well-architected/
- Recommendations for designing conversational user experiences — https://learn.microsoft.com/power-platform/well-architected/experience-optimization/conversation-design
- Power Platform and Copilot Studio Architecture Center — https://learn.microsoft.com/power-platform/architecture/architecture-center-overview
- Introduction to Success by Design — https://learn.microsoft.com/dynamics365/guidance/implementation-guide/success-by-design
