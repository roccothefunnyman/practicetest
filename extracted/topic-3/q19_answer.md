---
topic: 3
question: 19
type: hotspot
case_study: false
answer: Enforce regions = Azure Policy; Continuous compliance verification = Microsoft Defender for Cloud
---

# Question 19 — Answer

**Correct answer:**
- **Enforces the deployment of the resources to only approved regions: Azure Policy**
- **Provides continuous compliance verification of the resources: Microsoft Defender for Cloud**

## Why these selections are correct

**Azure Policy** is the Azure service for enforcing what can be deployed and where. The built-in `allowedLocations` policy and similar definitions block deployments to non-approved regions and audit existing resources. That is exactly the "enforce deployment to only approved regions" requirement.

**Microsoft Defender for Cloud** provides continuous regulatory compliance assessment through the Compliance dashboard. Defender for Cloud continuously evaluates resources against built-in or custom standards (NIST, ISO 27001, PCI DSS, custom standards), produces compliance scores, and surfaces non-compliant resources for remediation. Microsoft Learn describes this as cloud security posture management with continuous monitoring.

Azure Monitor handles logs and metrics, Microsoft Purview governs data, and Microsoft Sentinel is the SIEM for threat investigation. None of those is the continuous-compliance evaluator that Defender for Cloud is.

## Microsoft Learn references

- Use Azure Policy to enforce residency — https://learn.microsoft.com/azure/cosmos-db/data-residency#use-azure-policy-to-enforce-the-residency-requirements
- Azure Policy overview — https://learn.microsoft.com/azure/governance/policy/overview
- Microsoft Defender for Cloud overview (CSPM and compliance) — https://learn.microsoft.com/azure/defender-for-cloud/defender-for-cloud-introduction
- Regulatory compliance in Defender for Cloud — https://learn.microsoft.com/azure/defender-for-cloud/concept-regulatory-compliance
