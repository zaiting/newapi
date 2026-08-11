import { useTranslation } from 'react-i18next'

import { siteConfig } from '@/config/site'

import type { SolutionContent } from './types'

/** 将解决方案内容集中为按 slug 可索引的数据，并在渲染时完成国际化。 */
export function useSolutionsContent(): SolutionContent[] {
  const { t } = useTranslation()

  return [
    {
      slug: 'saas-ai',
      name: t('SaaS product AI integration'),
      overview: {
        businessGoal: t('Add AI capabilities to an existing software product without coupling every feature to a single model provider.'),
        customerProblem: t('Provider APIs differ, tenant usage is hard to attribute, and model changes can spread through product code.'),
        recommendedCapabilities: [
          t('Unified model API'),
          t('Tenant-aware API keys'),
          t('Quota and usage logs'),
        ],
        implementationSummary: t('Connect one product workflow first, validate usage and cost, then expand to more features.'),
        suitableFor: t('SaaS companies, software vendors, and independent product teams.'),
      },
      heroTitle: t('Add AI capabilities to your SaaS product through one integration layer.'),
      heroDescription: t('Keep product teams focused on customer workflows while a unified access layer handles model credentials, usage controls, provider routing, and operational visibility.'),
      challenges: [
        {
          title: t('Provider differences reach product code'),
          description: t('Different request formats, model names, and error behaviors increase the cost of adding and changing providers.'),
        },
        {
          title: t('Multi-tenant usage needs clear ownership'),
          description: t('Calls should be attributable to the correct product, tenant, or environment before they become a billing and support problem.'),
        },
        {
          title: t('Cost is difficult to forecast'),
          description: t('Model choice, context size, and user behavior can change consumption, so teams need observable usage rather than assumptions.'),
        },
        {
          title: t('Model availability can affect product reliability'),
          description: t('A product should be able to adjust model and provider configuration without rewriting every AI feature.'),
        },
      ],
      architecture: {
        label: t('Recommended SaaS AI integration architecture'),
        nodes: [
          t('SaaS product and tenant workflows'),
          t('Unified AI API and access policy'),
          t('Model routing, quotas, and logs'),
          t('Configured model providers'),
        ],
      },
      capabilityMappings: [
        {
          businessNeed: t('Develop features against a stable interface'),
          platformRole: t('Expose a unified API so product code is less dependent on individual provider formats.'),
        },
        {
          businessNeed: t('Separate tenant and environment access'),
          platformRole: t('Issue and manage keys with the access scope and quota rules configured by the team.'),
        },
        {
          businessNeed: t('Understand which features consume models'),
          platformRole: t('Record request logs and usage information for operational review and product analysis.'),
        },
        {
          businessNeed: t('Change model strategy over time'),
          platformRole: t('Centralize model and channel configuration instead of embedding provider credentials in feature code.'),
        },
      ],
      scenarios: [
        {
          title: t('Writing and rewriting'),
          description: t('Add drafting, tone adjustment, and structured content features inside existing product workflows.'),
        },
        {
          title: t('Summaries and extraction'),
          description: t('Turn long records into concise summaries or extract fields for review, while keeping business validation in the product.'),
        },
        {
          title: t('Question answering'),
          description: t('Connect product context or an external retrieval service before sending grounded prompts to a selected model.'),
        },
        {
          title: t('Classification and analysis'),
          description: t('Use models to assist tagging, routing, and analysis, with deterministic rules for actions that require certainty.'),
        },
      ],
      implementation: [
        {
          title: t('Define one product workflow'),
          description: t('Choose a bounded feature with a clear input, expected output, owner, and fallback behavior.'),
        },
        {
          title: t('Create access and model configuration'),
          description: t('Create a project key, select allowed models, and set usage controls for the target environment.'),
        },
        {
          title: t('Integrate the unified API'),
          description: t('Connect the product backend to the API and keep provider credentials outside client applications.'),
        },
        {
          title: t('Validate quality, usage, and errors'),
          description: t('Test representative inputs, review logs, compare model behavior, and define user-facing error handling.'),
        },
        {
          title: t('Release and expand deliberately'),
          description: t('Monitor production usage and extend to additional product features only after the first workflow is stable.'),
        },
      ],
      boundaries: [
        t('The SaaS product remains responsible for tenant identity, business authorization, and customer-facing billing rules.'),
        t('Model output is probabilistic and should be validated before it triggers irreversible business actions.'),
        t('Provider availability, model behavior, and pricing can change; production workflows need fallbacks and ongoing evaluation.'),
      ],
      cta: {
        eyebrow: t('Build the first workflow'),
        title: t('Connect your product to a unified AI API.'),
        description: t('Start with the developer documentation, then validate a real product workflow in your own environment.'),
        primary: { label: t('View API documentation'), href: siteConfig.docsUrl },
        secondary: { label: t('Open the console'), href: siteConfig.consoleUrl },
      },
    },
    {
      slug: 'customer-service',
      name: t('AI-assisted customer service'),
      overview: {
        businessGoal: t('Introduce AI assistance into customer service while retaining business rules, traceability, and human control.'),
        customerProblem: t('Peak traffic, sensitive conversations, variable answer quality, and unclear cost make direct model integration risky.'),
        recommendedCapabilities: [
          t('Multi-model access'),
          t('Rate limits and quotas'),
          t('Request logs and cost visibility'),
        ],
        implementationSummary: t('Begin with agent assistance and reviewable tasks before considering higher levels of automation.'),
        suitableFor: t('E-commerce, SaaS, business service teams, and companies with customer support operations.'),
      },
      heroTitle: t('Bring stable and controllable AI assistance into customer service.'),
      heroDescription: t('Connect support workflows to multiple model options through one governed access layer, while keeping customer context, response policy, and escalation logic in your service system.'),
      challenges: [
        {
          title: t('Traffic changes with service demand'),
          description: t('Campaigns, incidents, and product releases can create sudden request spikes that require explicit rate and quota controls.'),
        },
        {
          title: t('A plausible answer can still be wrong'),
          description: t('Support responses need knowledge grounding, business constraints, and human review for sensitive or high-impact questions.'),
        },
        {
          title: t('Conversation data may be sensitive'),
          description: t('Teams need to minimize submitted data and apply their own privacy, retention, and access policies before calling a model.'),
        },
        {
          title: t('Errors need operational context'),
          description: t('Support and engineering teams need request records to distinguish workflow errors, access issues, and upstream model failures.'),
        },
      ],
      architecture: {
        label: t('Recommended AI-assisted customer service architecture'),
        nodes: [
          t('Customer service channels and agent workspace'),
          t('Business rules, knowledge retrieval, and escalation'),
          t('Unified AI access, limits, and logs'),
          t('Selected language models'),
        ],
      },
      capabilityMappings: [
        {
          businessNeed: t('Use different models for different support tasks'),
          platformRole: t('Provide one access layer for configured models so teams can evaluate quality, speed, and cost.'),
        },
        {
          businessNeed: t('Protect service capacity during peaks'),
          platformRole: t('Apply configured rate limits and quotas to keys, users, or service environments.'),
        },
        {
          businessNeed: t('Trace a failed or disputed suggestion'),
          platformRole: t('Expose request and task logs for authorized operational review.'),
        },
        {
          businessNeed: t('Attribute model usage to a support workflow'),
          platformRole: t('Provide usage and cost records that can be combined with the company own service metrics.'),
        },
      ],
      scenarios: [
        {
          title: t('Reply suggestions for agents'),
          description: t('Draft a response from approved context while the support agent reviews and sends the final message.'),
        },
        {
          title: t('Conversation summaries'),
          description: t('Summarize long conversations for handoffs, follow-up, or case review without replacing the original record.'),
        },
        {
          title: t('Ticket classification'),
          description: t('Suggest categories, urgency, or destination queues, with rules for mandatory escalation.'),
        },
        {
          title: t('Service quality analysis'),
          description: t('Assist reviewers in finding conversations that may need attention, while final quality decisions remain with the team.'),
        },
      ],
      implementation: [
        {
          title: t('Choose an assistive task'),
          description: t('Start with summaries, classification, or reply suggestions that can be reviewed before use.'),
        },
        {
          title: t('Define context and redaction rules'),
          description: t('Specify which customer data may be submitted, what must be removed, and when a human must take over.'),
        },
        {
          title: t('Connect service orchestration'),
          description: t('Let the customer service system assemble approved context and call the unified AI endpoint from the server side.'),
        },
        {
          title: t('Evaluate with representative conversations'),
          description: t('Review answer quality, refusal behavior, latency, usage, and failure handling across real conversation categories.'),
        },
        {
          title: t('Roll out with monitoring'),
          description: t('Release to a controlled group, review logs and feedback, and expand only when service owners approve.'),
        },
      ],
      boundaries: [
        t('AI assistance does not replace service policy, knowledge management, identity checks, or human escalation.'),
        t('Sensitive, contractual, financial, or safety-related responses should require explicit business rules and human review.'),
        t('The enterprise is responsible for lawful collection, minimization, retention, and use of customer conversation data.'),
      ],
      cta: {
        eyebrow: t('Review your service workflow'),
        title: t('Plan an AI-assisted support architecture around your existing system.'),
        description: t('Map the service tasks, knowledge sources, data boundaries, and review points before selecting models.'),
        primary: { label: t('Book a solution review'), href: '/contact' },
        secondary: { label: t('Explore platform capabilities'), href: '/product' },
      },
    },
    {
      slug: 'knowledge-assistant',
      name: t('Enterprise knowledge assistant'),
      overview: {
        businessGoal: t('Connect enterprise knowledge workflows to mainstream models through a controlled model access layer.'),
        customerProblem: t('Knowledge sources, retrieval, permissions, model access, and usage governance are separate responsibilities that must work together.'),
        recommendedCapabilities: [
          t('Unified model access'),
          t('Access and quota controls'),
          t('Usage and request logs'),
        ],
        implementationSummary: t('Keep knowledge storage and retrieval in dedicated systems, and use the platform for governed model access.'),
        suitableFor: t('Organizations building internal search, employee assistants, product Q&A, or sales enablement tools.'),
      },
      heroTitle: t('Connect enterprise knowledge to models without blurring system responsibilities.'),
      heroDescription: t('Use your existing content system, retrieval service, and permission model to prepare grounded context, then call selected models through a unified and observable access layer.'),
      challenges: [
        {
          title: t('Knowledge is distributed across systems'),
          description: t('Policies, product documents, tickets, and training materials often have different owners, formats, and update cycles.'),
        },
        {
          title: t('Retrieval must respect permissions'),
          description: t('A model should only receive content that the requesting user is already authorized to access.'),
        },
        {
          title: t('Grounded answers still need evaluation'),
          description: t('Retrieved context can be incomplete or outdated, and models may still produce unsupported conclusions.'),
        },
        {
          title: t('Model usage requires governance'),
          description: t('Teams need controlled credentials, approved models, quotas, and logs separate from the knowledge system itself.'),
        },
      ],
      architecture: {
        label: t('Recommended enterprise knowledge assistant architecture'),
        nodes: [
          t('Business application and user identity'),
          t('Knowledge store, permissions, and retrieval service'),
          t('Unified AI access, quotas, and logs'),
          t('Selected language models'),
        ],
      },
      capabilityMappings: [
        {
          businessNeed: t('Retrieve authoritative company content'),
          platformRole: t('Receive prepared context from an external retrieval service; the platform does not replace a knowledge base or vector database.'),
        },
        {
          businessNeed: t('Use approved models through controlled credentials'),
          platformRole: t('Centralize model access and issue keys according to the team configured scope.'),
        },
        {
          businessNeed: t('Limit consumption by application or environment'),
          platformRole: t('Apply configured quotas and access policies to the model calling layer.'),
        },
        {
          businessNeed: t('Investigate answer generation issues'),
          platformRole: t('Provide authorized request records while the application retains citations, retrieval traces, and user feedback.'),
        },
      ],
      scenarios: [
        {
          title: t('Policy and process questions'),
          description: t('Retrieve current internal rules and provide an answer with source references supplied by the business application.'),
        },
        {
          title: t('Product information assistance'),
          description: t('Help service or sales teams navigate approved product documentation and compare relevant sections.'),
        },
        {
          title: t('Employee onboarding and training'),
          description: t('Guide employees to learning material while preserving the source documents as the authority.'),
        },
        {
          title: t('Internal search assistance'),
          description: t('Turn natural-language questions into a retrieval workflow and summarize only the content the user can access.'),
        },
      ],
      implementation: [
        {
          title: t('Define the knowledge boundary'),
          description: t('Choose authoritative sources, owners, update rules, and content that must not enter the assistant.'),
        },
        {
          title: t('Build permission-aware retrieval'),
          description: t('Use an external search or vector retrieval service that filters content with the current user identity.'),
        },
        {
          title: t('Connect governed model access'),
          description: t('Send the question and approved retrieved context through a project key to an allowed model.'),
        },
        {
          title: t('Evaluate grounding and refusal'),
          description: t('Test missing, conflicting, outdated, and unauthorized content, not only successful questions.'),
        },
        {
          title: t('Operate with ownership'),
          description: t('Assign owners for source quality, retrieval, model configuration, feedback, and incident review.'),
        },
      ],
      boundaries: [
        t('The platform provides model access and governance; it is not presented as a built-in document ingestion, search, or vector database product.'),
        t('The business application must enforce user identity and document permissions before context is sent to a model.'),
        t('Answers should expose source references when available and allow users to report unsupported or outdated information.'),
      ],
      cta: {
        eyebrow: t('Clarify the architecture'),
        title: t('Design a knowledge assistant with explicit data and system boundaries.'),
        description: t('Review how identity, retrieval, model access, logging, and human ownership fit together in your environment.'),
        primary: { label: t('Discuss the technical architecture'), href: '/contact' },
        secondary: { label: t('Review security practices'), href: '/security' },
      },
    },
    {
      slug: 'content-generation',
      name: t('Multimodal content generation'),
      overview: {
        businessGoal: t('Give content workflows controlled access to text, image, audio, and video model providers.'),
        customerProblem: t('Different task formats, asynchronous generation, failed jobs, and variable cost complicate content production at scale.'),
        recommendedCapabilities: [
          t('Text and media model access'),
          t('Task logs and status visibility'),
          t('Quota and cost analysis'),
        ],
        implementationSummary: t('Separate creative workflow, review, and asset management from the model access and task tracking layer.'),
        suitableFor: t('E-commerce teams, marketing organizations, content platforms, and creative software providers.'),
      },
      heroTitle: t('Connect text, image, audio, and video generation through one governed platform.'),
      heroDescription: t('Standardize how teams access configured model providers, monitor synchronous and asynchronous tasks, and understand usage while preserving human review and content compliance workflows.'),
      challenges: [
        {
          title: t('Media models use different task patterns'),
          description: t('Text may return immediately while image, audio, or video generation can require task creation, polling, and result handling.'),
        },
        {
          title: t('Batch work magnifies failures and cost'),
          description: t('Large content runs need bounded inputs, retry policies, status tracking, and clear ownership of partial failures.'),
        },
        {
          title: t('Creative quality is subjective'),
          description: t('Teams need review criteria and version selection rather than treating every generated result as publishable.'),
        },
        {
          title: t('Generated content carries compliance risk'),
          description: t('Copyright, brand, privacy, factual accuracy, and platform policies must be handled by the publishing organization.'),
        },
      ],
      architecture: {
        label: t('Recommended content generation architecture'),
        nodes: [
          t('Content workflow and asset system'),
          t('Prompt templates, review rules, and task orchestration'),
          t('Unified model access, task logs, and quotas'),
          t('Text and media model providers'),
        ],
      },
      capabilityMappings: [
        {
          businessNeed: t('Access multiple content model types'),
          platformRole: t('Provide configured access to supported text, image, audio, and video model channels through the relevant APIs.'),
        },
        {
          businessNeed: t('Track long-running generation'),
          platformRole: t('Record supported task status and result information for asynchronous model workflows.'),
        },
        {
          businessNeed: t('Control batch consumption'),
          platformRole: t('Use keys, quotas, and rate controls while the workflow system limits batch size and retry behavior.'),
        },
        {
          businessNeed: t('Review usage by workflow'),
          platformRole: t('Expose logs and usage data that teams can combine with campaign, asset, or product identifiers.'),
        },
      ],
      scenarios: [
        {
          title: t('Product and campaign copy'),
          description: t('Generate draft descriptions, headlines, and variants from approved product facts and brand instructions.'),
        },
        {
          title: t('Image ideation and production'),
          description: t('Create visual concepts or assets for human selection, editing, and rights review.'),
        },
        {
          title: t('Summaries and translations'),
          description: t('Adapt approved source material for different channels and languages with editorial review.'),
        },
        {
          title: t('Audio and video tasks'),
          description: t('Submit supported media jobs and track their status within a business-owned production workflow.'),
        },
      ],
      implementation: [
        {
          title: t('Define the content specification'),
          description: t('Set source-of-truth data, brand rules, prohibited content, output format, and reviewer responsibility.'),
        },
        {
          title: t('Select models by media task'),
          description: t('Evaluate supported models for quality, latency, task pattern, and usage cost instead of using one model for every asset.'),
        },
        {
          title: t('Build bounded task orchestration'),
          description: t('Control batch size, retries, status polling, result storage, and failure recovery in the content system.'),
        },
        {
          title: t('Add review and provenance records'),
          description: t('Keep prompts, source data, selected outputs, edits, and approvals according to the organization policy.'),
        },
        {
          title: t('Monitor and refine'),
          description: t('Review task logs, cost, rejection reasons, and model changes as the workflow expands.'),
        },
      ],
      boundaries: [
        t('Generated content should not be published automatically without the review level required by the business and destination channel.'),
        t('The enterprise remains responsible for copyright, trademarks, likeness rights, privacy, factual accuracy, and disclosure obligations.'),
        t('Task completion and output quality depend on the selected upstream model; workflows need failure and retry handling.'),
      ],
      cta: {
        eyebrow: t('Plan a governed content workflow'),
        title: t('Evaluate models and operating controls for each content type.'),
        description: t('Review supported model options, then test a bounded production workflow with clear approval and failure handling.'),
        primary: { label: t('View supported models'), href: '/pricing' },
        secondary: { label: t('Start integrating'), href: siteConfig.consoleUrl },
      },
    },
    {
      slug: 'developer-platform',
      name: t('AI development and testing platform'),
      overview: {
        businessGoal: t('Give multiple AI projects and engineering teams one controlled entry point for development, evaluation, and operations.'),
        customerProblem: t('Scattered provider keys, inconsistent environments, unclear usage ownership, and fragmented logs slow down delivery.'),
        recommendedCapabilities: [
          t('Centralized project keys'),
          t('Playground and model access'),
          t('Logs, quotas, and cost visibility'),
        ],
        implementationSummary: t('Standardize project access first, then establish a repeatable test, release, and monitoring workflow.'),
        suitableFor: t('Companies operating multiple AI applications, environments, or engineering teams.'),
      },
      heroTitle: t('Create one governed AI development entry point for your teams.'),
      heroDescription: t('Centralize model access, separate project credentials, compare configured models, and trace usage without asking every team to maintain its own provider integration layer.'),
      challenges: [
        {
          title: t('Provider keys are scattered'),
          description: t('Credentials copied into local environments and project settings are difficult to rotate, scope, and audit consistently.'),
        },
        {
          title: t('Teams test in different conditions'),
          description: t('Inconsistent model names, parameters, and provider accounts make evaluation results difficult to compare.'),
        },
        {
          title: t('Usage cannot be assigned clearly'),
          description: t('Shared credentials hide which project, environment, or team generated model consumption.'),
        },
        {
          title: t('Production errors are fragmented'),
          description: t('When each application has a separate integration, operators lack a shared place to inspect access and upstream failures.'),
        },
      ],
      architecture: {
        label: t('Recommended AI development platform architecture'),
        nodes: [
          t('Developer tools and business applications'),
          t('Project keys and environment policies'),
          t('Unified AI gateway, quotas, and logs'),
          t('Configured model providers'),
        ],
      },
      capabilityMappings: [
        {
          businessNeed: t('Separate development, testing, and production'),
          platformRole: t('Use distinct keys and configuration boundaries for projects and environments.'),
        },
        {
          businessNeed: t('Compare models before release'),
          platformRole: t('Use the available Playground and unified APIs to test configured models with representative prompts.'),
        },
        {
          businessNeed: t('Control team consumption'),
          platformRole: t('Apply permissions, quotas, and rate limits according to the organization account model.'),
        },
        {
          businessNeed: t('Investigate integration failures'),
          platformRole: t('Use request logs and upstream error information as part of the engineering incident workflow.'),
        },
      ],
      scenarios: [
        {
          title: t('Shared model evaluation'),
          description: t('Let teams compare approved model options using the same access layer and documented test inputs.'),
        },
        {
          title: t('Project-level access'),
          description: t('Assign credentials by application or environment instead of sharing provider keys across repositories.'),
        },
        {
          title: t('Release readiness checks'),
          description: t('Review model behavior, error handling, quotas, and expected usage before production rollout.'),
        },
        {
          title: t('Operational troubleshooting'),
          description: t('Correlate application incidents with authorized request logs and provider responses.'),
        },
      ],
      implementation: [
        {
          title: t('Inventory projects and credentials'),
          description: t('Identify applications, environments, owners, current providers, and credentials that need a controlled migration.'),
        },
        {
          title: t('Define access boundaries'),
          description: t('Decide which teams and projects may use each model and how quotas should be assigned.'),
        },
        {
          title: t('Standardize the integration path'),
          description: t('Adopt the unified endpoint and project keys in development and automated test environments first.'),
        },
        {
          title: t('Establish evaluation and release checks'),
          description: t('Document representative prompts, quality criteria, failure behavior, and usage expectations for each project.'),
        },
        {
          title: t('Move to production monitoring'),
          description: t('Release with separate production access, log review, quota alerts, and named operational owners.'),
        },
      ],
      boundaries: [
        t('The platform centralizes model access but does not replace application testing, prompt evaluation, or software release governance.'),
        t('Teams should keep provider and platform keys on trusted servers and out of browser code, mobile packages, and source control.'),
        t('Access logs support investigation, while application-level tracing remains necessary for complete end-to-end diagnosis.'),
      ],
      cta: {
        eyebrow: t('Standardize team access'),
        title: t('Move AI projects toward one development and operations workflow.'),
        description: t('Start in the console, validate configured models, and use the API documentation to connect a real project.'),
        primary: { label: t('Open the console'), href: siteConfig.consoleUrl },
        secondary: { label: t('View API documentation'), href: siteConfig.docsUrl },
      },
    },
  ]
}
