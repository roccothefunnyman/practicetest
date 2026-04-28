---
topic: 1
question: 23
type: multiple-choice
case_study: false
answer: C
---

# Question 23 — Answer

**Correct answer: C. Endorse the semantic model.**

## Why C is correct

The objective is to make the data available as a grounding source for AI systems that answer queries against a subset of corporate data. The data already lives in Dataverse, the canvas app already uses it, and a Power BI semantic model already connects to Dataverse via DirectQuery.

Microsoft Learn's "Endorse your content" and "Add a Power BI semantic model as a data source to Fabric data agent" articles explain that semantic models endorsed (promoted or certified) in Power BI are clearly identified, prioritized in searches, and discoverable. Endorsement is the documented way to mark a semantic model as authoritative and ready for reuse, including for AI grounding scenarios such as Power BI Copilot, Fabric Data Agents, and Microsoft 365 Copilot. The semantic model best practices article for data agents calls out that endorsement combined with Prep for AI is what makes a semantic model a reliable grounding source for AI systems.

Endorsing the semantic model surfaces it in the OneLake catalog and in AI tools as a trusted grounding source, which directly satisfies the requirement to "make the data available as a grounding data source for AI systems."

## Why the other options are wrong

**A. Populate a Dataverse table** doesn't add anything new for grounding. The Dataverse data is already there and is already queried by the existing semantic model.

**B. Share WS1** controls workspace access but does not endorse or expose the model as a discoverable, trusted AI grounding source.

**D. Export the semantic model** moves it out of the Power BI service, which removes the integrated AI grounding pathway. Exported model files are not a grounding source for live AI queries.

## Microsoft Learn references

- Endorse your content (Power BI promotion and certification) — https://learn.microsoft.com/power-bi/collaborate-share/service-endorse-content
- Promote and certify Power BI content with endorsement — https://learn.microsoft.com/power-bi/collaborate-share/service-endorsement-overview
- Add a Power BI semantic model as a data source to Fabric data agent — https://learn.microsoft.com/fabric/data-science/data-agent-semantic-model
- Semantic model best practices for data agent — https://learn.microsoft.com/fabric/data-science/semantic-model-best-practices
