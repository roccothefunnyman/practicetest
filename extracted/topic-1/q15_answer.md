---
topic: 1
question: 15
type: drag-drop
case_study: false
answer: Properly exchanges data between the Dynamics 365 apps = Integration; Aligns with defined user workflows and business processes = User acceptance
---

# Question 15 — Answer

**Correct answer:**
- Properly exchanges data between the Dynamics 365 apps: **Integration**
- Aligns with defined user workflows and business processes: **User acceptance**

## Why these answers are correct

Microsoft Learn's "Types of tests" article and the broader Dynamics 365 testing strategy guidance map test types directly to these requirements:

- **Integration testing** is described as "testing how different components or systems work together, such as data flows, interfaces, and APIs." That is precisely the test type for verifying that Dynamics 365 Sales and Dynamics 365 Finance correctly exchange data.

- **User acceptance testing (UAT)** is described as "testing the solution from the user's perspective" and is performed by business users who run real-life process simulations to confirm the solution supports business operations and goals. UAT is the documented test type for validating alignment with user workflows and business processes, and it's a prerequisite for go-live in Success by Design.

## Why the other options are wrong (for the slot they don't fit)

**Drift** typically refers to model drift or configuration drift monitoring, not functional testing of data exchange or workflow alignment.

**Exploratory** testing finds issues through ad hoc investigation. It is not the structured method for confirming data exchange between two business apps or aligning a solution to defined workflows.

**Performance** testing measures speed, throughput, and scalability. It does not confirm functional data exchange or workflow alignment.

## Microsoft Learn references

- Types of tests — https://learn.microsoft.com/dynamics365/guidance/implementation-guide/testing-strategy-test-types
- Test your Dynamics 365 solution before deployment — https://learn.microsoft.com/dynamics365/guidance/implementation-guide/testing-strategy
- Perform user acceptance testing in finance and operations apps (training) — https://learn.microsoft.com/training/modules/perform-uat-finance-operations/
