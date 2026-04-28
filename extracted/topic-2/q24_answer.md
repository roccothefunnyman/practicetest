---
topic: 2
question: 24
type: multiple-choice
case_study: false
answer: B
---

# Question 24 — Answer

**Correct answer: B. a Model Context Protocol (MCP) server**

## Why B is correct

Microsoft Foundry agents (and Copilot Studio agents) use MCP to discover and call external tools at runtime through a standardized protocol. When tools are added or changed on an MCP server, the agent dynamically picks them up without an agent update.

From Microsoft Learn:

> "Each tool or resource that a connected MCP server publishes is automatically available for use in Copilot Studio. The server provides the name, description, inputs, and outputs. When you update or remove tools and resources on the MCP server, Copilot Studio dynamically reflects these changes. This process ensures users always have the latest versions and removes obsolete tools and resources."

> "MCP is especially valuable when upstream APIs change frequently. Instead of updating every agent that consumes the API, you modify the definition once on the MCP server, and all agents automatically use the updated version without republishing."

That is precisely the requirement: dynamically use external tools at runtime without updating the agent.

## Why the other options are wrong

**A. A Microsoft Foundry hub** is a top-level Foundry workspace organization construct. It does not, by itself, expose external tools to agents at runtime.

**C. Azure AI Search** is a retrieval service for grounded knowledge. It returns search results, not callable external tools that change dynamically.

**D. Microsoft Copilot Studio** is an authoring product. It is not the dynamic-tool mechanism the question is asking for; MCP is.

## Microsoft Learn references

- Extend your agent with Model Context Protocol — https://learn.microsoft.com/microsoft-copilot-studio/agent-extend-action-mcp
- Use agent tools to extend, automate, and enhance your agents (when to use MCP) — https://learn.microsoft.com/microsoft-copilot-studio/guidance/agent-tools
- Tool best practices for Microsoft Foundry Agent Service (MCP support) — https://learn.microsoft.com/azure/foundry/agents/concepts/tool-best-practice
- What is Microsoft Foundry Agent Service? — https://learn.microsoft.com/azure/foundry/agents/overview
