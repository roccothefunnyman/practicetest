---
topic: 3
question: 6
type: multi-select
case_study: false
answer: A, D
---

# Question 6 — Answer

**Correct answer: A. Microsoft Purview and D. Microsoft Defender**

## Why A and D are correct

The three requirements break cleanly across the two services Microsoft positions for AI security and governance.

**Microsoft Defender (for Cloud / Defender XDR for AI)** identifies and mitigates risks that relate to AI use. Microsoft Learn describes Defender for Cloud's AI security posture management and AI threat protection: discovering generative AI workloads and agents (including Copilot Studio agents through Defender for Cloud Apps), surfacing vulnerabilities and attack paths, and detecting threats such as prompt injection and abnormal execution against Microsoft Foundry workloads.

**Microsoft Purview** protects AI apps and the data they process and supports responsible AI governance. Microsoft Learn calls out DSPM for AI, DLP, sensitivity labels, audit, communication compliance, and insider risk management as the controls for monitoring AI interactions, retaining and logging prompts and responses, detecting policy violations, and investigating incidents.

Together they cover all three requirements: risk identification (Defender), data protection (Purview), and responsible AI governance through retention, logging, policy detection, and investigation (Purview).

## Why the other options are wrong

**B. Azure AI Content Safety** filters harmful content in prompts and responses (violence, hate, sexual, self-harm, jailbreak detection). It is one piece of model safety, but it does not log interactions, detect policy violations across the broader environment, or investigate incidents.

**C. Role-based access control (RBAC) in Microsoft Foundry** restricts who can configure or fine-tune Foundry resources. It is an identity control, not a risk-mitigation, data-protection, or incident-investigation platform for Microsoft 365 Copilot agents.

## Microsoft Learn references

- Microsoft Purview data security and compliance protections for generative AI apps — https://learn.microsoft.com/purview/ai-microsoft-purview
- DSPM for AI in Microsoft Purview — https://learn.microsoft.com/purview/data-security-posture-management-learn-about
- Microsoft Defender for Cloud AI security and threat protection — https://learn.microsoft.com/azure/defender-for-cloud/defender-for-cloud-introduction#ai-security-and-threat-protection
- Discover AI agents and assess security posture using Microsoft Defender — https://learn.microsoft.com/defender-xdr/security-for-ai/ai-agent-inventory
