---
topic: 3
question: 37
type: multiple-choice
case_study: false
answer: D
---

# Question 37 — Answer

**Correct answer: D. Modify the contents of the training dataset.**

## Why D is correct

The bias is producing different emails based on customer traits, which is a fairness problem rooted in the data the model learned from. Microsoft's Responsible AI principles include fairness, and the practical mitigation guidance for biased outputs starts with the dataset: identify under-represented or skewed groups in the training data, then rebalance, augment, or curate the dataset to reduce bias before retraining. Microsoft's Responsible AI dashboard, Fairlearn, and the Responsible AI scorecard all support this data-centered fairness assessment and mitigation flow.

## Why the other options are wrong

**A. Modify Solution1 to randomly generate emails for different traits.** Randomization masks the issue but does not address the underlying bias and could degrade quality for everyone.

**B. Modify the system instructions of Solution1.** Prompt instructions can influence behavior, but they do not fix bias baked into the underlying model. The model still reflects the training data distribution.

**C. Retrain the model by using a larger dataset.** Larger does not equal less biased. Adding more skewed data can amplify existing bias. The correct fairness intervention is to modify the dataset's contents to address the imbalance, not just its size.

## Microsoft Learn references

- Microsoft Responsible AI standard and principles — https://www.microsoft.com/ai/responsible-ai
- Assess AI systems by using the Responsible AI dashboard — https://learn.microsoft.com/azure/machine-learning/concept-responsible-ai-dashboard
- What is Responsible AI? — https://learn.microsoft.com/azure/machine-learning/concept-responsible-ai
- Fairness assessment in Responsible AI — https://learn.microsoft.com/azure/machine-learning/concept-fairness-ml
