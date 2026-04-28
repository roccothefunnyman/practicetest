---
topic: 3
question: 18
type: multi-select
case_study: false
answer: A, E
---

# Question 18 — Answer

**Correct answer: A. Associate the storage location to the fine-tuning job and E. Store the training data in Azure Blob Storage that has version control enabled.**

## Why A and E are correct

The two requirements are tracking and versioning training data, and consistent retraining with approved data.

**Azure Blob Storage with versioning enabled** is the durable, versioned data store Microsoft recommends for fine-tuning datasets. Microsoft Learn states: "For large data files, we recommend that you import from an Azure Blob store. Large files can become unstable when uploaded through multipart forms because the requests are atomic and can't be retried or resumed." Blob Storage's blob versioning automatically maintains previous versions of objects, so you can audit changes and roll back to an approved dataset version.

**Associating the storage location to the fine-tuning job** ensures every retraining run pulls from the same governed source. The fine-tuning job references the dataset in Blob Storage, the version is recorded with the job, and the team retrains consistently against approved data.

## Why the other options are wrong

**B. Create a content filter.** Content filters control output safety. They do not version training data.

**C. Store the training data in Azure Files.** Azure Files is an SMB/NFS file share. It is not the recommended pattern for fine-tuning datasets and lacks the same versioning model. Microsoft Learn specifically recommends Blob Storage for large fine-tuning files.

**D. Upload the training data to Microsoft Foundry data files.** Direct uploads through Foundry are appropriate for small files, but they do not give you versioning or change tracking. The recommendation is Blob Storage with versioning.

## Microsoft Learn references

- Customize a model with fine-tuning (upload training data) — https://learn.microsoft.com/azure/ai-foundry/openai/how-to/fine-tuning
- What is Azure Blob Storage? — https://learn.microsoft.com/azure/storage/blobs/storage-blobs-overview
- Blob versioning — https://learn.microsoft.com/azure/storage/blobs/versioning-overview
- Design training data for AI workloads on Azure — https://learn.microsoft.com/azure/well-architected/ai/training-data-design
