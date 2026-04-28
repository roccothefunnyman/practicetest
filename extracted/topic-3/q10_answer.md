---
topic: 3
question: 10
type: hotspot
case_study: false
answer: Copilot Studio = Microsoft Power Platform deployment pipeline; Microsoft Foundry = Azure DevOps pipeline
---

# Question 10 — Answer

**Correct answer:**
- **Copilot Studio: Use a Microsoft Power Platform deployment pipeline.**
- **Microsoft Foundry: Use an Azure DevOps pipeline.**

## Why these selections are correct

**Copilot Studio agents are Power Platform solution components.** Microsoft's documented ALM path for Copilot Studio is to package the agent inside a solution and promote it across dev, test, and production with Pipelines in Power Platform. Pipelines are repeatable, automated, and require no manual intervention, and they natively understand Dataverse and Copilot Studio dependencies. Bicep does not deploy Copilot Studio agents.

**Microsoft Foundry agents are Azure resources.** Microsoft Learn provides Bicep templates and Azure CLI/PowerShell deployment patterns for Foundry. To make the deployment fully repeatable across dev, test, and production with isolation and no manual intervention, the template should run inside an Azure DevOps pipeline (or GitHub Actions equivalent) using the AzureResourceManagerTemplateDeployment task. Pipelines in Power Platform and Bicep on its own do not satisfy "repeatable and fully automated" end-to-end for a Foundry agent stored in source control. An Azure DevOps pipeline does, and it can invoke the Bicep template as part of its job.

## Why the other options are wrong

**Copilot Studio with Bicep file** is not supported. Bicep cannot deploy Copilot Studio agents.

**Copilot Studio export from source repo, import to target** is a manual operation. It violates the "no manual intervention" rule.

**Microsoft Foundry with Power Platform deployment pipeline** is not supported. Power Platform pipelines target Dataverse solution components, not Azure resources.

**Microsoft Foundry with Bicep file alone** describes the artifact, not the automation. A Bicep file by itself does not deploy automatically; you need a pipeline orchestrating the deployment.

## Microsoft Learn references

- Pipelines in Power Platform — https://learn.microsoft.com/power-platform/alm/pipelines
- Solution management in Microsoft Copilot Studio — https://learn.microsoft.com/microsoft-copilot-studio/authoring-solutions-overview
- Quickstart: Deploy a Microsoft Foundry resource by using a Bicep file — https://learn.microsoft.com/azure/foundry/how-to/create-resource-template
- Integrate Bicep with Azure Pipelines — https://learn.microsoft.com/azure/azure-resource-manager/bicep/add-template-to-azure-pipelines
- AzureResourceManagerTemplateDeployment@3 task — https://learn.microsoft.com/azure/devops/pipelines/tasks/reference/azure-resource-manager-template-deployment-v3
