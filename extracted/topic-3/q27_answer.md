---
topic: 3
question: 27
type: hotspot
case_study: false
answer: Include = Agent1 and references to the data sources; Reconfigure = The environment variables
---

# Question 27 — Answer

**Correct answer:**
- **Include in the deployment package solution: Agent1 and references to the data sources**
- **Reconfigure after the deployment: The environment variables**

## Why these selections are correct

**Agent1 and references to the data sources:** Each environment has its own Dataverse tables and its own Azure AI Search index, so the production data sources are not the same artifacts as the development data sources. The deployment package should contain the agent and references to the data sources (typically through environment variables), not the data themselves and not the data source connections, which are environment-specific. Microsoft's ALM golden rules recommend exporting agents and components as managed solutions and using environment variables for settings that change across environments.

**Reconfigure the environment variables:** After import, the environment variables that point at the Dataverse table and the Azure AI Search endpoint need to be set to the production values. The Dataverse and Azure AI Search connections also need to authenticate, but Microsoft's guidance is to drive that through environment variables and connection references that are bound after import. Reconfiguring environment variables minimizes downtime, handles credentials securely, and keeps the package portable across environments.

## Microsoft Learn references

- Establish an application lifecycle management strategy (Copilot Studio) — https://learn.microsoft.com/microsoft-copilot-studio/guidance/alm
- Export and import agents using solutions — https://learn.microsoft.com/microsoft-copilot-studio/authoring-solutions-import-export
- Environment variables in solutions — https://learn.microsoft.com/power-apps/maker/data-platform/environmentvariables
- Connection references — https://learn.microsoft.com/power-apps/maker/data-platform/create-connection-reference
