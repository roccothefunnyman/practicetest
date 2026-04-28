---
topic: 2
question: 29
type: hotspot
case_study: true
answer: Expose data to the agent = a custom connector; Add to the agent = the MCP server
---

# Question 29 — Answer

**Correct answers:**
- To expose the data to the agent, create: **a custom connector**
- Add to the agent: **the MCP server**

## Why these answers are correct

The Contoso case study states that the R&D department already has a custom Model Context Protocol (MCP) server containing comprehensive product specifications and compliance data. The custom AI agent must answer questions about product specifications using existing technologies, and it must be designed to eventually connect to other agents that can be selected based on description (a generative orchestration design pattern).

### Expose the data to the agent: a custom connector

In Copilot Studio, MCP servers are connected to agents through a custom connector. The connector wraps the MCP server's HTTPS endpoint and includes the `x-ms-agentic-protocol: mcp-streamable-1.0` property required for MCP communication.

From Microsoft Learn:

> "The Copilot Studio agent connects to MCP servers by using a custom connector."

> "Create a new custom connector using the Create from blank option... Set Scheme to HTTPS. Set Host to the CONTAINER_APP_URL value... Toggle Swagger editor to enter the editor view. Expose a POST method at the root path with a custom x-ms-agentic-protocol: mcp-streamable-1.0 property. This property is required for the custom connector to interact with the API by using the MCP protocol."

A custom connector (not a Bot Service channel, custom OData entity, or Semantic Kernel) is the documented way to expose the existing MCP server's data to the Copilot Studio agent.

### Add to the agent: the MCP server

After the custom connector is in place, the maker adds the MCP server itself as a tool on the agent. Each MCP tool and resource published by the server then becomes available, by name and description, for the agent to choose at runtime.

From Microsoft Learn:

> "Each tool or resource that a connected MCP server publishes is automatically available for use in Copilot Studio. The server provides the name, description, inputs, and outputs. When you update or remove tools and resources on the MCP server, Copilot Studio dynamically reflects these changes."

> "Add MCP server tools and resources to your agent so that your Copilot Studio agent can use them."

That fits the case study's requirements to use the existing R&D MCP server, integrate with existing technologies, and select capabilities based on description for conversational interactions.

An event trigger is for autonomous agent responses to events, a REST API tool would require building a separate tool against an OpenAPI spec rather than using the existing MCP server, and a generic tool isn't the specific named option that maps to the MCP server scenario.

## Microsoft Learn references

- Extend your agent with Model Context Protocol (Copilot Studio) — https://learn.microsoft.com/microsoft-copilot-studio/agent-extend-action-mcp
- Connect your agent to an existing MCP server — https://learn.microsoft.com/microsoft-copilot-studio/mcp-add-existing-server-to-agent
- Add tools and resources from a Model Context Protocol (MCP) server to your agent — https://learn.microsoft.com/microsoft-copilot-studio/mcp-add-components-to-agent
- Deploy a self-hosted remote Azure MCP Server and connect to it using Copilot Studio (custom connector pattern) — https://learn.microsoft.com/azure/developer/azure-mcp-server/how-to/deploy-remote-mcp-server-copilot-studio
