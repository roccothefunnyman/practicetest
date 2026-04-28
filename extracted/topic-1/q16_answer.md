---
topic: 1
question: 16
type: multiple-choice
case_study: false
answer: D
---

# Question 16 — Answer

**Correct answer: D. Ensure that cross-region data movement is enabled for the Canadian environment and connector dependencies.**

## Why D is correct

The agent will live in a Canadian environment using Canadian Dataverse data, but it depends on an Azure OpenAI connector hosted in the United States. Microsoft Learn's "Move data across regions for Copilots, AI agents, and generative AI features" article is explicit:

> "When the **Move data across regions** checkbox is selected, your inputs (prompts) and outputs (results) might move outside of your region to the location where the generative AI feature is hosted. ... Some regions may have limited capacity, or no capacity at all. To ensure availability of Copilots and generative AI features, we may need to move the data outside of the region for processing."

For the Canada region, the table shows that data may be processed in the United States for Azure OpenAI. The administrator must explicitly enable the "Move data across regions" setting in the Power Platform admin center for the environment, and the related connector dependencies must support that flow. Without it, the agent's cross-region path is blocked or unsupported, and the data residency policy is not addressed.

This is the documented Microsoft administrative step for adhering to data residency and data movement policies in this exact scenario before the agent is deployed.

## Why the other options are wrong

**A. Ensure that the data processed by Azure OpenAI is stored in the United States** is not the residency choice you make at the agent layer. Microsoft Learn states explicitly that "Microsoft doesn't log, store, or retain any input or output data during this process. There is no persistence of the data." You don't configure US storage for processed prompts; you control whether data movement is allowed.

**B. From the Microsoft Purview portal, validate the Data loss prevention settings** is good practice for sensitive data, but DLP validation alone does not address the cross-region data movement consent requirement. The Power Platform admin center is the location for that consent, not Purview.

**C. Migrate the tenant to the United States** is disproportionate, breaks Canadian data residency, and is not a Microsoft-recommended response to a US-hosted connector dependency.

## Microsoft Learn references

- Move data across regions for Copilots, AI agents, and generative AI features — https://learn.microsoft.com/power-platform/admin/geographical-availability-copilot
- Configure data movement across geographic locations for generative AI — https://learn.microsoft.com/microsoft-copilot-studio/manage-data-movement-outside-us
- Geographic data residency in Copilot Studio — https://learn.microsoft.com/microsoft-copilot-studio/geo-data-residency
