---
topic: 1
question: 11
type: multiple-choice
case_study: false
answer: D
---

# Question 11 — Answer

**Correct answer: D. Centralize the product catalog data in Microsoft Dataverse and expose the data to both agents.**

## Why D is correct

The scenario has two AI systems (a Copilot Studio agent for Dynamics 365 Commerce, and a Power Apps inventory management solution) that both need a consistent view of product catalog data. Microsoft's documented pattern is to centralize that kind of master data in Microsoft Dataverse and use it as a single source of truth.

Microsoft Learn ("Why choose Microsoft Dataverse?") describes Dataverse as the platform's central data store, with built-in security, native integration with Power Apps, Power Automate, Dynamics 365, and Copilot Studio, and AI-ready features (Dataverse search, glossary terms, synonyms) that support generative AI grounding. The Power Platform Well-Architected guidance for Copilot Studio agents recommends consolidating data on a centralized platform such as Dataverse to streamline access and management for multiple agents.

Centralization also avoids data drift and inconsistent answers across the two AI systems, which is the core of "consistent source for multiple AI systems."

## Why the other options are wrong

**A. Let each agent scrape product details from Microsoft SharePoint Online libraries** produces inconsistent results, depends on document layout, scales poorly, and violates the "consistent source" requirement.

**B. Store the product catalog data in a separate custom table for each agent** duplicates data, creates synchronization problems, and directly contradicts the requirement for a single consistent source.

**C. Configure prompts to pull product details from the PDFs of external vendors** routes catalog data through external documents, creates lag and accuracy problems, and is not a centralized authoritative source.

## Microsoft Learn references

- Why choose Microsoft Dataverse? — https://learn.microsoft.com/power-apps/maker/data-platform/why-dataverse-overview
- Add Dataverse tables as a knowledge source — https://learn.microsoft.com/microsoft-copilot-studio/knowledge-add-dataverse
- Power Platform Well-Architected: Experience Optimization (consolidate data on Dataverse) — https://learn.microsoft.com/power-platform/architecture/solution-ideas/agent-custom-contact-center
