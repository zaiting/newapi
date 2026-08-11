import { useTranslation } from 'react-i18next'

import { siteConfig } from '@/config/site'

import type { IndustryContent } from './types'

/** 将行业内容集中为按 slug 可索引的数据，并在渲染时完成国际化。 */
export function useIndustriesContent(): IndustryContent[] {
  const { t } = useTranslation()

  return [
    {
      slug: 'software-internet',
      name: t('Software and internet'),
      overview: {
        summary: t('Add AI features to digital products and give engineering teams a consistent model development workflow.'),
        commonScenarios: [t('AI product features'), t('Developer tools'), t('Content moderation assistance')],
        workflowEntry: t('Product backend, developer platform, and operational tools.'),
        governanceCapabilities: [t('Unified API'), t('Project keys'), t('Quotas and logs')],
      },
      heroTitle: t('Build AI-enabled software without rebuilding provider integration for every product.'),
      heroDescription: t('Give product and engineering teams one governed model access layer for customer-facing features, internal tools, evaluation, and production operations.'),
      challenges: [
        {
          title: t('Product roadmaps move faster than provider integrations'),
          description: t('Teams need to test and replace models without spreading provider-specific code across every feature service.'),
        },
        {
          title: t('Multi-tenant usage needs product context'),
          description: t('Model consumption must be associated with the correct product, environment, tenant, and feature for support and cost analysis.'),
        },
        {
          title: t('Development and production require different controls'),
          description: t('Shared credentials and identical quotas across environments create unnecessary security and reliability risk.'),
        },
        {
          title: t('AI behavior changes over time'),
          description: t('Model updates, provider availability, and prompt changes require repeatable evaluation and operational monitoring.'),
        },
      ],
      scenarios: [
        {
          title: t('AI features inside SaaS products'),
          description: t('Add writing, summary, extraction, classification, or conversational assistance through a server-side unified API.'),
        },
        {
          title: t('Internal developer assistants'),
          description: t('Provide approved model access for code explanation, documentation drafts, or engineering knowledge workflows.'),
        },
        {
          title: t('User-generated content review assistance'),
          description: t('Use models to flag content for review while deterministic rules and human moderators retain enforcement authority.'),
        },
        {
          title: t('Model evaluation environments'),
          description: t('Compare configured models with documented test inputs before product teams change a production workflow.'),
        },
      ],
      architecture: {
        label: t('Software and internet AI integration architecture'),
        nodes: [
          t('Web, mobile, and SaaS product backends'),
          t('Tenant context, product rules, and feature orchestration'),
          t('Project keys, unified AI API, quotas, and logs'),
          t('Configured text and media model providers'),
        ],
      },
      capabilityMappings: [
        {
          workflowNeed: t('Ship features with less provider coupling'),
          platformCapability: t('Use unified model endpoints and centralized provider configuration behind the product backend.'),
        },
        {
          workflowNeed: t('Separate projects and environments'),
          platformCapability: t('Issue different access keys and usage controls for development, testing, and production workflows.'),
        },
        {
          workflowNeed: t('Attribute usage to product operations'),
          platformCapability: t('Review authorized request and usage logs alongside application tenant and feature identifiers.'),
        },
        {
          workflowNeed: t('Respond to provider changes'),
          platformCapability: t('Adjust configured model channels centrally while the product preserves its own quality and fallback checks.'),
        },
      ],
      boundaries: [
        t('The product remains responsible for tenant isolation, user authorization, business logic, and customer-facing billing.'),
        t('Generated code or automated actions require testing, permission checks, and human approval appropriate to their impact.'),
        t('Request logs complement but do not replace application tracing, model evaluation datasets, or software observability.'),
      ],
      example: {
        title: t('Typical workflow: add a summary feature to a SaaS record view'),
        context: t('A product team wants users to summarize long records without exposing provider credentials or coupling the UI to one model.'),
        steps: [
          t('The product backend verifies the tenant, user permission, and record scope.'),
          t('The backend prepares bounded content and calls an allowed model with a project key.'),
          t('The platform applies access controls and records the model request for authorized review.'),
          t('The product validates and displays the draft summary with a clear user review path.'),
        ],
        outcome: t('The AI feature fits the existing product authorization and operations model while provider access remains centralized.'),
      },
      implementation: [
        {
          title: t('Inventory AI product workflows'),
          description: t('Identify feature owners, tenants, environments, current providers, and sensitive data boundaries.'),
        },
        {
          title: t('Define project access'),
          description: t('Assign keys, allowed models, quotas, and operational owners by product and environment.'),
        },
        {
          title: t('Integrate one bounded feature'),
          description: t('Connect the server-side workflow and establish product-level validation, fallback, and user feedback.'),
        },
        {
          title: t('Evaluate and operate'),
          description: t('Test representative inputs, release gradually, and monitor quality, usage, errors, and provider changes.'),
        },
      ],
      cta: {
        eyebrow: t('For software teams'),
        title: t('Create a reusable AI integration foundation for your product portfolio.'),
        description: t('Review the SaaS product solution or start connecting a development project through the unified API.'),
        primary: { label: t('Explore SaaS AI integration'), href: '/solutions/saas-ai' },
        secondary: { label: t('View API documentation'), href: siteConfig.docsUrl },
      },
    },
    {
      slug: 'ecommerce-retail',
      name: t('E-commerce and retail'),
      overview: {
        summary: t('Apply AI to catalog, content, service, and merchandising workflows while protecting product facts and review controls.'),
        commonScenarios: [t('Product content'), t('Customer service assistance'), t('Catalog enrichment')],
        workflowEntry: t('Commerce platform, product information system, and customer service workspace.'),
        governanceCapabilities: [t('Text and media models'), t('Task tracking'), t('Usage controls')],
      },
      heroTitle: t('Connect AI to commerce workflows without losing control of product truth and publishing decisions.'),
      heroDescription: t('Support product content, merchandising, and customer service with governed model access while commerce systems retain prices, inventory, policy, and order authority.'),
      challenges: [
        {
          title: t('Product facts cannot be invented'),
          description: t('Descriptions and service replies must stay grounded in approved catalog, inventory, promotion, and policy data.'),
        },
        {
          title: t('Campaign peaks create uneven workload'),
          description: t('Bulk content generation and service demand can spike together, requiring bounded batches, quotas, and failure handling.'),
        },
        {
          title: t('Content spans text and media'),
          description: t('Different models and task patterns are needed for descriptions, translations, images, summaries, and support assistance.'),
        },
        {
          title: t('Publishing carries brand and rights risk'),
          description: t('Generated assets need review for accuracy, brand rules, prohibited claims, copyright, and channel requirements.'),
        },
      ],
      scenarios: [
        {
          title: t('Product description drafts'),
          description: t('Generate channel-specific drafts from approved catalog attributes without allowing the model to set price, inventory, or claims.'),
        },
        {
          title: t('Catalog classification assistance'),
          description: t('Suggest categories, attributes, and missing-field candidates for merchandisers to review.'),
        },
        {
          title: t('Customer service reply suggestions'),
          description: t('Draft responses from order context and approved policy content while agents handle exceptions and commitments.'),
        },
        {
          title: t('Campaign asset variations'),
          description: t('Create copy or visual options for editorial selection, brand review, and rights checks before publication.'),
        },
      ],
      architecture: {
        label: t('E-commerce and retail AI integration architecture'),
        nodes: [
          t('Commerce, catalog, order, and service systems'),
          t('Approved product data, campaign rules, and review workflow'),
          t('Unified model access, task status, quotas, and logs'),
          t('Selected text and media model providers'),
        ],
      },
      capabilityMappings: [
        {
          workflowNeed: t('Use product facts as controlled input'),
          platformCapability: t('Accept prompts prepared by the commerce workflow while the source systems remain authoritative for product and order data.'),
        },
        {
          workflowNeed: t('Run text and media tasks'),
          platformCapability: t('Connect supported language and media model channels through the relevant synchronous or task-based APIs.'),
        },
        {
          workflowNeed: t('Control campaign and batch usage'),
          platformCapability: t('Apply key quotas and rate controls while the commerce workflow limits batch size, concurrency, and retries.'),
        },
        {
          workflowNeed: t('Investigate rejected or failed output'),
          platformCapability: t('Use request and task logs together with product, campaign, and reviewer records held by the business system.'),
        },
      ],
      boundaries: [
        t('Commerce systems remain authoritative for prices, inventory, promotions, orders, refunds, and customer eligibility.'),
        t('Generated product claims, translations, images, and service replies require review appropriate to the market and publishing channel.'),
        t('Customer and order data should be minimized and handled according to the retailer privacy, retention, and access policies.'),
      ],
      example: {
        title: t('Typical workflow: prepare product copy for a seasonal campaign'),
        context: t('A merchandising team needs multiple copy variants for selected products while maintaining approved facts and brand language.'),
        steps: [
          t('The catalog system selects approved attributes and excludes restricted or incomplete products.'),
          t('The campaign workflow applies brand instructions and submits bounded generation jobs.'),
          t('The platform routes requests to configured models and records task usage and failures.'),
          t('Merchandisers review, edit, approve, and publish selected variants through the commerce system.'),
        ],
        outcome: t('The team accelerates drafting while the catalog, reviewers, and publishing workflow preserve business control.'),
      },
      implementation: [
        {
          title: t('Select a catalog or service workflow'),
          description: t('Choose one task with authoritative source data, measurable review criteria, and a named business owner.'),
        },
        {
          title: t('Define product truth and content rules'),
          description: t('Specify allowed attributes, prohibited claims, privacy constraints, brand requirements, and escalation conditions.'),
        },
        {
          title: t('Connect task and review systems'),
          description: t('Integrate model access behind commerce services and retain approvals, edits, and publishing controls in existing tools.'),
        },
        {
          title: t('Test peaks and failure recovery'),
          description: t('Validate batch limits, retries, partial failure handling, cost, and review capacity before campaign use.'),
        },
      ],
      cta: {
        eyebrow: t('For commerce teams'),
        title: t('Design AI workflows around product truth, review, and measurable usage.'),
        description: t('Explore content generation and customer service patterns, or discuss how they fit your commerce stack.'),
        primary: { label: t('Explore content generation'), href: '/solutions/content-generation' },
        secondary: { label: t('Book a solution review'), href: '/contact' },
      },
    },
    {
      slug: 'business-services',
      name: t('Business services'),
      overview: {
        summary: t('Support document-heavy, client-facing work with governed model access and clear professional review boundaries.'),
        commonScenarios: [t('Proposal drafting'), t('Knowledge assistance'), t('Service operations')],
        workflowEntry: t('CRM, document systems, ticketing, and professional service workflows.'),
        governanceCapabilities: [t('Controlled model access'), t('Team quotas'), t('Traceable requests')],
      },
      heroTitle: t('Use AI to assist professional workflows while experts retain judgment and client accountability.'),
      heroDescription: t('Connect document, CRM, and service operations to approved models through one controlled layer, with permissions, usage visibility, and review steps aligned to client work.'),
      challenges: [
        {
          title: t('Client context is sensitive and fragmented'),
          description: t('Information may span CRM records, contracts, tickets, and documents with different confidentiality and access requirements.'),
        },
        {
          title: t('Professional output requires accountable review'),
          description: t('Drafts may influence commercial, contractual, financial, or operational decisions and cannot be accepted only because they sound confident.'),
        },
        {
          title: t('Knowledge changes across clients and engagements'),
          description: t('Retrieval and prompt context must reflect the correct client, project, document version, and user permission.'),
        },
        {
          title: t('Usage needs to align with teams and projects'),
          description: t('Shared model access makes it difficult to understand cost, investigate issues, and apply project-specific controls.'),
        },
      ],
      scenarios: [
        {
          title: t('Proposal and report drafting'),
          description: t('Create structured first drafts from approved project facts and templates for consultant or account-owner review.'),
        },
        {
          title: t('Client meeting summaries'),
          description: t('Summarize authorized notes into follow-up items while users verify commitments and ownership.'),
        },
        {
          title: t('Internal knowledge assistance'),
          description: t('Retrieve approved methods, policies, and prior material according to employee and engagement permissions.'),
        },
        {
          title: t('Ticket and request triage'),
          description: t('Suggest categories, priorities, and responsible teams while service rules determine actual routing and escalation.'),
        },
      ],
      architecture: {
        label: t('Business services AI integration architecture'),
        nodes: [
          t('CRM, documents, ticketing, and employee workspace'),
          t('Client permissions, retrieval, templates, and approval workflow'),
          t('Project model access, quotas, and request logs'),
          t('Approved language model providers'),
        ],
      },
      capabilityMappings: [
        {
          workflowNeed: t('Separate client and project access'),
          platformCapability: t('Use project or environment credentials while business systems enforce client identity and document authorization.'),
        },
        {
          workflowNeed: t('Connect approved knowledge context'),
          platformCapability: t('Receive context prepared by the business retrieval service without claiming ownership of the knowledge store.'),
        },
        {
          workflowNeed: t('Understand model usage by team'),
          platformCapability: t('Expose usage and request records that can be associated with internal project metadata.'),
        },
        {
          workflowNeed: t('Support operational investigation'),
          platformCapability: t('Centralize access and upstream request visibility while the service platform retains client and workflow audit trails.'),
        },
      ],
      boundaries: [
        t('AI output is a draft or recommendation and does not replace professional judgment, contractual review, or authorized approval.'),
        t('Client confidentiality and information barriers must be enforced before data is retrieved or submitted to a model.'),
        t('The business remains responsible for records retention, source verification, disclosures, and regulated professional obligations.'),
      ],
      example: {
        title: t('Typical workflow: prepare a client proposal first draft'),
        context: t('An account team wants to reduce repetitive drafting while keeping scope, pricing, commitments, and approval under human control.'),
        steps: [
          t('The CRM and document workflow selects authorized client facts, requirements, and approved templates.'),
          t('A service backend prepares a bounded prompt and sends it through a project-specific key.'),
          t('The platform applies model access controls and records the request for operational review.'),
          t('The account owner verifies scope and claims, edits the draft, and follows the existing approval process.'),
        ],
        outcome: t('Draft preparation becomes more consistent without delegating client commitments or professional accountability to the model.'),
      },
      implementation: [
        {
          title: t('Classify workflows by risk'),
          description: t('Separate low-risk drafting and summarization from decisions involving contracts, money, eligibility, or professional advice.'),
        },
        {
          title: t('Map client data permissions'),
          description: t('Define which systems, roles, documents, and engagement boundaries govern model context.'),
        },
        {
          title: t('Connect one reviewed workflow'),
          description: t('Keep retrieval, templates, approval, and client records in existing systems while centralizing model access.'),
        },
        {
          title: t('Measure quality and accountability'),
          description: t('Track edits, rejected drafts, unsupported claims, usage, and escalation outcomes before expanding.'),
        },
      ],
      cta: {
        eyebrow: t('For service organizations'),
        title: t('Plan AI assistance around client permissions and professional review.'),
        description: t('Explore the knowledge assistant architecture or discuss a document and service workflow with clear responsibility boundaries.'),
        primary: { label: t('Explore knowledge assistants'), href: '/solutions/knowledge-assistant' },
        secondary: { label: t('Discuss your workflow'), href: '/contact' },
      },
    },
    {
      slug: 'education-training',
      name: t('Education and training'),
      overview: {
        summary: t('Support course content, learning assistance, and teaching operations while educators retain curriculum and learner oversight.'),
        commonScenarios: [t('Course content drafts'), t('Learning assistance'), t('Teaching operations')],
        workflowEntry: t('Learning platform, content repository, and educator workspace.'),
        governanceCapabilities: [t('Approved model access'), t('Usage limits'), t('Operational logs')],
      },
      heroTitle: t('Bring AI into learning workflows with educator oversight and explicit learner safeguards.'),
      heroDescription: t('Connect learning platforms and approved course content to selected models while institutions preserve curriculum authority, identity, permissions, assessment rules, and human support.'),
      challenges: [
        {
          title: t('Learning support must match the curriculum'),
          description: t('Generic answers may conflict with course scope, teaching sequence, terminology, or institution policy.'),
        },
        {
          title: t('Learner data requires careful handling'),
          description: t('Age, identity, assignments, progress, and accommodations can be sensitive and should be minimized before model use.'),
        },
        {
          title: t('Assessment integrity needs deterministic rules'),
          description: t('AI assistance must not bypass exam policy, grading authority, plagiarism controls, or instructor review.'),
        },
        {
          title: t('Usage varies across courses and periods'),
          description: t('Enrollment, assignments, and exam periods create different demand, requiring course or project access and quota planning.'),
        },
      ],
      scenarios: [
        {
          title: t('Course material drafting'),
          description: t('Assist educators with outlines, examples, summaries, and question drafts based on approved learning objectives.'),
        },
        {
          title: t('Grounded learning assistance'),
          description: t('Answer learner questions from authorized course content and provide a route to instructors when confidence is insufficient.'),
        },
        {
          title: t('Feedback draft assistance'),
          description: t('Suggest feedback language or common issue categories while educators retain grading and final comments.'),
        },
        {
          title: t('Training content adaptation'),
          description: t('Create format, language, or difficulty variants for review without changing required learning outcomes.'),
        },
      ],
      architecture: {
        label: t('Education and training AI integration architecture'),
        nodes: [
          t('Learning platform, educator tools, and learner identity'),
          t('Curriculum rules, content retrieval, and assessment policy'),
          t('Course model access, quotas, and request logs'),
          t('Approved language and media model providers'),
        ],
      },
      capabilityMappings: [
        {
          workflowNeed: t('Use course-approved content'),
          platformCapability: t('Accept context prepared by the learning or retrieval system while educators own the curriculum and source material.'),
        },
        {
          workflowNeed: t('Separate courses and environments'),
          platformCapability: t('Use dedicated keys and configured model access for pilots, courses, or learning applications.'),
        },
        {
          workflowNeed: t('Limit learner or application consumption'),
          platformCapability: t('Apply available quota and rate controls while the learning platform enforces user-level entitlements.'),
        },
        {
          workflowNeed: t('Review incidents and inappropriate output'),
          platformCapability: t('Provide authorized model request visibility alongside the learning platform learner, course, and feedback records.'),
        },
      ],
      boundaries: [
        t('Educators and institutions retain authority over curriculum, assessment, grading, learner support, and academic integrity.'),
        t('Learner data, especially information about minors, should be minimized and handled under applicable consent, privacy, and retention requirements.'),
        t('AI responses can be incomplete or incorrect and should provide escalation to course sources, instructors, or support staff.'),
      ],
      example: {
        title: t('Typical workflow: answer questions from approved course material'),
        context: t('A training provider wants learners to find explanations in current course content without turning the model into an unsupervised source of truth.'),
        steps: [
          t('The learning platform verifies the learner, enrollment, course, and allowed content scope.'),
          t('A retrieval service selects relevant approved material and passes it to the application backend.'),
          t('The backend calls an allowed model through a course-specific key and records source references.'),
          t('The learning interface shows the response, cited material, and a path to ask an instructor or report a problem.'),
        ],
        outcome: t('Learners receive contextual assistance while course content, permissions, and educator escalation remain authoritative.'),
      },
      implementation: [
        {
          title: t('Choose a learning objective'),
          description: t('Define the learner or educator task, curriculum scope, expected assistance, and prohibited uses.'),
        },
        {
          title: t('Establish content and learner safeguards'),
          description: t('Set source ownership, permission checks, data minimization, assessment rules, and human escalation.'),
        },
        {
          title: t('Pilot with educator review'),
          description: t('Connect one course or training workflow and evaluate representative questions, edge cases, and inappropriate requests.'),
        },
        {
          title: t('Operate by course and policy'),
          description: t('Monitor usage, feedback, model changes, content freshness, and support outcomes before broader rollout.'),
        },
      ],
      cta: {
        eyebrow: t('For learning organizations'),
        title: t('Design AI assistance around curriculum, privacy, and educator oversight.'),
        description: t('Review the knowledge assistant pattern or discuss a learning workflow with explicit content and assessment boundaries.'),
        primary: { label: t('Explore knowledge assistants'), href: '/solutions/knowledge-assistant' },
        secondary: { label: t('Book a solution review'), href: '/contact' },
      },
    },
  ]
}
