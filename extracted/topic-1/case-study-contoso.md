# Topic 1 Case Study: Contoso, Ltd.

## Overview

Contoso, Ltd. is a high-tech manufacturing company that uses Microsoft Dynamics 365 Finance. Dynamics 365 Supply Chain Management, and Dynamics 365 Commerce for its North American operations. The company designs and develops innovative products that have many patents and proprietary technologies. The patents and engineering designs are closely guarded secrets.

Contoso executives want to integrate and adopt AI solutions to help scale the company in preparation for an anticipated period of rapid growth. The company has multiple legal entities and Azure subscriptions that will be used in the adopted AI solutions.

## Requirements

### AI Adoption

The following executives will have specific responsibilities in the overall AI adoption:

- Chief Technology Officer (CTO): Select one Dynamics 365 Finance, Dynamics 365 Supply Chain Management or Dynamics 365 Commerce prebuilt AI agent and one custom Microsoft Copilot Studio AI agent to prioritize and deploy during the initial AI adoption phase.
- Chief Information Officer (CIO): Ensure that appropriate security labels are assigned to the data used by the AI agents.
- Chief Financial Officer (CFO): Analyze the return on investment (ROI) for the AI agents being deployed.
- Chief Information Security Officer (CISO): Discover and inventory AI resources for auditing.
- Chief Executive Officer (CEO): Ensure that all solutions adhere to industry-standard responsible AI practices.

All AI initiatives and agents will have a detailed business use case, a defined audience profile, and an estimated ROI that will compare the cost savings of the current process against the estimated costs of using the new AI solutions.

The company's research and development (R&D) department already has a custom Model Context Protocol (MCP) server that contains comprehensive product specifications and compliance data.

### Prebuilt AI Agent

The CTO has NOT yet selected which prebuilt AI agent to use in Dynamics 365 Supply Chain Management. The CTO wants to view available agent templates to identify which agent will add the most business value.

Depending on which high-priority AI agents are identified, its agent capabilities must be previewed in a discovery meeting with the relevant business operation stakeholders.

### Custom AI Agent

Contoso has identified the following custom AI agent requirements:

- The custom AI agent will use data from Dynamics 365 Supply Chain Management to answer questions for the manufacturing team as a low-code solution.
- The custom AI agent will be accessible from within Microsoft Teams.
- The custom AI agent must be designed to eventually connect to other agents that can be selected based on their description.
- The topics used in the custom AI agent will be selected based NOT on a trigger phrase, but on a description of the purpose of the query, to make the interactions more conversational.
- The custom AI agent must be able to answer questions about product specifications by using existing technologies. The product specifications are maintained by the R&D department.
- The custom AI agent must be integrated with and accessible from Dynamics 365 Supply Chain Management.
- The custom AI agent must be able to use Dynamics 365 Supply Chain Management business logic that is stored outside of the application.

### Analysis, Reporting, and Troubleshooting

Contoso has identified the following analysis, reporting, and troubleshooting requirements:

- The CISO will audit all the AI solutions monthly for compliance and security.
- The CFO will analyze all the AI solutions quarterly to compare the estimated ROI against actual measured efficiencies and adoption. The CFO will use the Copilot Studio agent usage estimator to perform this analysis.
- The CISO wants to identify how much sensitive data was accessed for a given AI agent run and who accessed the data. Too much sensitive data accessed by a single user might indicate a high security risk.
- The CTO wants to track user feedback on the quality of the AI agent responses during user interactions with the agents. Consistently poor feedback will trigger an escalated reengineering discussion.
- The CEO wants a quarterly assessment of all the required metrics for their specific responsibilities. The tools used for the assessments must be Microsoft-recommended and must verify reliability, interpretability, fairness, and compliance.
- The CFO wants to identify how many interactions with the AI agents are abandoned on a given day as compared to resolved conversations. Too many abandoned sessions might indicate that Copilot Studio credits are being used inefficiently by end users.
