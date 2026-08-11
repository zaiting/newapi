import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { FinalCTA } from '@/components/marketing/final-cta'
import { LinkButton } from '@/components/marketing/link-button'
import { PageHero } from '@/components/marketing/page-hero'
import { EvidenceNotice, TrustSection } from '@/features/trust/trust-section'

const scenarioItems = [
  {
    eyebrow: 'Reference scenario',
    title: 'Add AI capabilities to a SaaS product',
    description: 'A product team connects text or multimodal models through one API layer and keeps model selection replaceable as the product evolves.',
    points: ['Unified application integration', 'Model comparison before rollout', 'Usage and cost visibility'],
  },
  {
    eyebrow: 'Reference scenario',
    title: 'Build an assisted customer service workflow',
    description: 'A service team uses models for drafting, summarization or classification while retaining business rules and human review where needed.',
    points: ['Multi-model experimentation', 'Clear usage boundaries', 'Reviewable call records'],
  },
  {
    eyebrow: 'Reference scenario',
    title: 'Create an enterprise knowledge assistant',
    description: 'A team connects model calls to its own retrieval and permission architecture instead of treating the model as the source of business truth.',
    points: ['Application-controlled context', 'Replaceable model layer', 'Deployment-specific data policy'],
  },
  {
    eyebrow: 'Reference scenario',
    title: 'Support governed content generation',
    description: 'Marketing or operations teams generate drafts through managed applications with budget limits, review steps and clear responsibility for publication.',
    points: ['Cost-aware model choice', 'Application-level review flow', 'No unverified automation claims'],
  },
]

const evidenceItems = [
  {
    title: 'Customer context',
    description: 'Industry, team responsibilities and the original workflow should be described without exposing confidential information.',
  },
  {
    title: 'Verified problem and approach',
    description: 'The case should explain the original constraint, selected capability and delivery process rather than relying on generic praise.',
  },
  {
    title: 'Measurable result',
    description: 'Any number must have a defined baseline, measurement method, time range and customer approval before publication.',
  },
  {
    title: 'Authorized customer statement',
    description: 'Names, logos and quotations are published only after the relevant organization has granted permission.',
  },
]

/** 典型应用场景与未来客户案例承载页。 */
export function CustomersPage() {
  const { t } = useTranslation()

  return (
    <div>
      <PageHero
        eyebrow={t('Typical application scenarios')}
        title={t('See how a unified model layer can fit real business workflows.')}
        description={t('The scenarios on this page are reference architectures, not customer claims. They are designed to help small and medium-sized businesses discuss a practical starting point.')}
        actions={(
          <>
            <LinkButton href="#reference-scenarios" size="large">{t('Explore reference scenarios')}</LinkButton>
            <LinkButton href="/contact" variant="secondary" size="large">{t('Discuss your workflow')}</LinkButton>
          </>
        )}
        aside={(
          <EvidenceNotice
            eyebrow="Evidence boundary"
            title="No fictional customer stories"
            description="Until a customer has approved a publishable case, we use clearly labeled reference scenarios without invented company names, logos, quotations or improvement percentages."
          />
        )}
      />

      <div id="reference-scenarios">
        <TrustSection
          eyebrow="Reference architectures"
          title="Start with the business workflow, then choose the model capability."
          description="Each example shows a possible delivery pattern. Actual architecture, data policy, model availability and operating responsibility must be confirmed for each organization."
          items={scenarioItems}
          columns={2}
        />
      </div>

      <TrustSection
        eyebrow="Decision checklist"
        title="Questions to answer before selecting a solution path."
        description="A useful solution review connects technical choices to ownership, risk and ongoing operations."
        items={[
          {
            title: 'What should the model do?',
            description: 'Define the task, expected input and acceptable output before comparing providers or model names.',
          },
          {
            title: 'Where must people stay in control?',
            description: 'Identify approvals, exception handling and content review steps that should remain part of the workflow.',
          },
          {
            title: 'Which data can enter the workflow?',
            description: 'Classify business data and confirm the deployment and upstream provider policy before production use.',
          },
          {
            title: 'How will usage be governed?',
            description: 'Set ownership, access, quota and review expectations for the application and its API keys.',
          },
        ]}
        columns={2}
        muted
      />

      <section className="py-20 sm:py-24">
        <Container>
          <EvidenceNotice
            eyebrow="Future customer cases"
            title="What a publishable customer case must contain."
            description="When verified customer stories become available, they should help buyers evaluate fit instead of functioning as unsupported marketing decoration."
            points={evidenceItems.map((item) => item.title)}
            actions={<LinkButton href="/contact">{t('Share your requirements')}</LinkButton>}
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {evidenceItems.map((item) => (
              <article key={item.title} className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="font-semibold text-foreground">{t(item.title)}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{t(item.description)}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <FinalCTA />
    </div>
  )
}
