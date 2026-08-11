import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { LinkButton } from '@/components/marketing/link-button'
import { PageHero } from '@/components/marketing/page-hero'
import { SectionHeading } from '@/components/marketing/section-heading'
import { siteConfig } from '@/config/site'
import { EvidenceNotice, TrustSection } from '@/features/trust/trust-section'

const inquiryItems = [
  {
    title: 'AI features for a product',
    description: 'Plan how an existing software product can add text, image, audio or multimodal model capabilities.',
  },
  {
    title: 'Unified multi-model access',
    description: 'Create a consistent application interface for evaluating or switching between model providers.',
  },
  {
    title: 'Customer service and knowledge assistants',
    description: 'Discuss assisted service, retrieval workflows, review steps and application-level permission boundaries.',
  },
  {
    title: 'Content generation workflows',
    description: 'Design governed drafting workflows with review responsibility, usage limits and model selection criteria.',
  },
  {
    title: 'Cost and permission governance',
    description: 'Clarify API key ownership, quota controls, usage records and team operating responsibilities.',
  },
  {
    title: 'Dedicated deployment discussion',
    description: 'Confirm deployment expectations, data handling questions and the operational scope that needs written agreement.',
  },
]

const preparationItems = [
  'Your name and company',
  'A work email or preferred contact channel',
  'Company size and responsible team',
  'The business workflow you want to improve',
  'Expected usage scale, if known',
  'Data, deployment or governance requirements',
]

function isConfiguredEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !/@example\.(com|org|net)$/i.test(email)
}

/** 企业咨询联系页；本期仅提供真实跳转，不模拟表单提交。 */
export function ContactPage() {
  const { t } = useTranslation()
  const hasContactEmail = isConfiguredEmail(siteConfig.contactEmail)
  const emailSubject = encodeURIComponent(t('Enterprise AI integration consultation'))
  const emailHref = hasContactEmail ? 'mailto:' + siteConfig.contactEmail + '?subject=' + emailSubject : ''

  return (
    <div>
      <PageHero
        eyebrow={t('Contact enterprise services')}
        title={t('Tell us about your AI integration needs.')}
        description={t('This page is for product AI capabilities, unified model access, customer service, knowledge assistants, content workflows, cost governance and deployment discussions.')}
        actions={(
          <>
            {hasContactEmail ? <LinkButton href={emailHref} size="large">{t('Email enterprise services')}</LinkButton> : null}
            <LinkButton href={siteConfig.docsUrl} variant={hasContactEmail ? 'secondary' : 'primary'} size="large">
              {t('Read the documentation')}
            </LinkButton>
          </>
        )}
        aside={(
          <div className="rounded-3xl border border-border bg-white/90 p-7 shadow-xl shadow-blue-950/5 sm:p-8">
            <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">{t('Fastest way to start')}</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">{t('Send context, not just a request for a demo.')}</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{t('A short description of the workflow, users, data boundary and expected usage helps the first conversation stay practical.')}</p>
            {hasContactEmail ? (
              <a className="mt-6 block break-all rounded-2xl bg-brand-soft px-4 py-3 text-sm font-semibold text-brand hover:underline" href={emailHref}>
                {siteConfig.contactEmail}
              </a>
            ) : (
              <p className="mt-6 rounded-2xl border border-dashed border-border bg-muted/60 px-4 py-3 text-sm leading-6 text-muted-foreground">
                {t('A public contact email has not been configured for this deployment. Use the documentation or self-service entry below.')}
              </p>
            )}
          </div>
        )}
      />

      <TrustSection
        eyebrow="Consultation topics"
        title="Choose the discussion that matches your current stage."
        description="You do not need a complete technical plan before contacting us. A clear business workflow and responsibility boundary are enough to begin."
        items={inquiryItems}
        columns={3}
      />

      <section className="border-y border-border bg-muted/60 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t('Before you contact us')}
            title={t('Prepare the information needed for a useful first review.')}
            description={t('Share only the minimum context required. Do not include API keys, provider credentials, personal data or confidential production content in the initial message.')}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {preparationItems.map((item, index) => (
              <div key={item} className="rounded-2xl border border-border bg-surface p-5">
                <span className="text-xs font-semibold text-brand">{String(index + 1).padStart(2, '0')}</span>
                <p className="mt-3 text-sm font-medium leading-6 text-foreground">{t(item)}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <EvidenceNotice
            eyebrow="No simulated submission"
            title="This page does not submit a contact form."
            description="We do not display a false success message or store inquiry details without a real consultation endpoint. Use the configured email link, documentation or self-service console entry."
          />
          <div className="rounded-3xl border border-border bg-surface p-7 shadow-sm sm:p-8">
            <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">{t('Self-service paths')}</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">{t('Continue without a consultation')}</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{t('Use the documentation to review integration details, or enter the console to begin with the capabilities currently available in this deployment.')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <LinkButton href={siteConfig.docsUrl} variant="secondary">{t('Open documentation')}</LinkButton>
              <LinkButton href={siteConfig.consoleUrl}>{t(siteConfig.consoleConfigured ? 'Open console' : 'Book a solution review')}</LinkButton>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
