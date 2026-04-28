# Topic 1 Case Study: Fabrikam, Inc.

## Background

Fabrikam, Inc., is a global consumer goods company that is undergoing a digital transformation initiative to migrate its entire infrastructure to the Microsoft cloud. As a key element of this cloud migration, the company will implement Microsoft Dynamics 365 Sales, moving away from the current on-premises proprietary technologies used by its business-to-business (B2B) sales team.

As part of the cloud migration, Fabrikam will adopt an AI-first approach to its business solutions and implement AI solutions, wherever possible, to streamline operations.

## Problem Statements

Fabrikam's infrastructure currently relies on various on-premises systems that require sales executives to use corporate computers with physical keyboards to access business information during customer interactions. Mobile phones cannot be used for these purposes, as the systems depend on keyboard input. As a result, the sales executives spend a lot of time using keyboards to search for data on several disparate systems and file servers, rather than focusing on the customers. This affects the customer experience.

Fabrikam stakeholders are concerned that users will be hesitant to adopt AI. If the AI initiatives are NOT adopted, cost savings will never be realized. Additionally, funding for future AI initiatives will depend on demonstrating an increase in AI adoption month over month. As the AI agent initiative for the sales team will be the first for Fabrikam, the rapid adoption of the agent is a high priority.

## Planned Initiatives

### General

Fabrikam management has prioritized AI-driven projects to improve efficiency, customer engagement, and responsible AI adoption. The current application infrastructure is on-premises and must be migrated to the cloud to support the adoption of these technologies.

### Infrastructure Migration

Fabrikam plans to migrate from its current on-premises infrastructure to a completely cloud-based topology; this will include user authentication, the security framework, and, primarily, the adoption of the services by end users.

All the data from the different systems will be consolidated into a single data source - a common data model that will use a Microsoft Dataverse environment as a single source of truth (SSOT) for the sales team.

### Sales Cycle Enablement

To achieve the company's objectives, Fabrikam intends to implement the following strategies to enhance the sales cycle:

- Use low-code development to create a single AI agent that has Dataverse as its core component.
- Ensure that sales managers can access unanswered correspondence from prospects and intervene as appropriate.
- Replace the previous proprietary software with Dynamics 365 Sales to track sales cycles and customer interactions.
- Have the sales executives use Dynamics 365 Sales to track interactions for open opportunities and send follow-up communications to prospects.
- Have the sales executives use handsfree headsets to interact with an AI agent when they have questions about internal policies or customer data.

## Requirements

### Infrastructure Migration

Fabrikam has identified the following infrastructure migration requirements:

- Azure must be used for all future infrastructure workloads.
- The company must follow Microsoft-recommended methodologies for infrastructure migration to the cloud.
- Any created AI agents must have their return on investment (ROI) calculated to ensure that the solution will save the company money.

### Sales Cycle Enablement

Fabrikam has identified the following requirements for sales cycle enablement:

- The final AI agent must follow Microsoft recommendations for a conversational user experience.
- A designated checklist must be reviewed to ensure that the AI agent follows Microsoft deployment recommendations for a compliant solution.
- Detailed telemetry must be logged for the first created AI agent to help troubleshoot and optimize the agent during the initial AI agent adoption process.
- Unexpected AI agent actions must end in an escalation to a live representative. For example, a sales executive must be rerouted to a representative if the agent cannot answer a question after two failed attempts.
- The return on investment (ROI) of switching from the current process to the future process is required for stakeholder sign off.
- The sales team must use Dynamics 365 Sales to correspond with prospects more quickly and efficiently than currently.
- Sales managers must report on the adoption of the AI agent to key Fabrikam stakeholders on a monthly basis.
- Any sensitive information, such as user IDs and names, shared via the AI agent must be tracked for future auditing.
