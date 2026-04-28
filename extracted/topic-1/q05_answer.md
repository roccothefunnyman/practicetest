---
topic: 1
question: 5
type: multiple-choice
case_study: false
answer: D
---

# Question 5 — Answer

**Correct answer: D. a file upload**

## Why D is correct

Microsoft Learn's guidance for extending Copilot in finance and operations apps ("Add knowledge to generative help and guidance with Copilot") states directly that you add additional knowledge by **uploading files** to the *Copilot for finance and operations apps* agent in Copilot Studio: "You can add knowledge to the Copilot help and guidance feature by uploading files to Copilot Studio (in file formats such as PDF, RTF, or Word)."

The article also explains why other knowledge source types are different: "If you want to add other types of knowledge (such as from SharePoint or other data sources), then you must add your own topic in the Copilot for Finance and Operations apps agent in Copilot Studio." That confirms file upload is the option that satisfies the constraint of not adding new topics.

The conversational boosting topic (out-of-the-box) handles uploaded files automatically, so no new topic is required. That meets the "must NOT add new topics" requirement and adds a usable knowledge source for internal business processes.

## Why the other options are wrong

**A. Microsoft Dataverse** is supported as a knowledge source for the agent, but using Dataverse virtual entities published from finance and operations apps is explicitly called out on Microsoft Learn as not currently supported. Adding native Dataverse tables also typically involves more configuration effort and is geared toward grounded data, not generic business-process documentation.

**B. a public website** is a Bing/web grounding option. It is not how internal business process documentation is typically added, and it doesn't satisfy "internal business processes" since it pulls from public web data.

**C. Azure AI Search** is not the documented method to add knowledge to the Copilot for finance and operations apps agent without authoring a new topic. Adding Azure AI Search as a generative-answers source per Microsoft Learn requires custom topic configuration, which violates the "must NOT add new topics" requirement.

## Microsoft Learn references

- Add knowledge to generative help and guidance with Copilot — https://learn.microsoft.com/dynamics365/fin-ops-core/dev-itpro/copilot/extend-copilot-generative-help
- Upload files as a knowledge source (Copilot Studio) — https://learn.microsoft.com/microsoft-copilot-studio/knowledge-add-file-upload
- Generative help and guidance with Copilot — https://learn.microsoft.com/dynamics365/fin-ops-core/fin-ops/copilot/copilot-generative-help
