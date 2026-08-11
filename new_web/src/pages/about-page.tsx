import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { FinalCTA } from '@/components/marketing/final-cta'
import { LinkButton } from '@/components/marketing/link-button'
import { PageHero } from '@/components/marketing/page-hero'
import { SectionHeading } from '@/components/marketing/section-heading'
import { siteConfig } from '@/config/site'
import { EvidenceNotice, TrustSection } from '@/features/trust/trust-section'

const problemItems = [
  {
    title: 'Provider APIs are fragmented',
    description: 'Different interfaces, credentials and model conventions increase integration and maintenance work for a small technical team.',
  },
  {
    title: 'AI infrastructure is hard to standardize',
    description: 'Teams need a consistent application boundary before they can compare, replace or combine model providers responsibly.',
  },
  {
    title: 'Keys, permissions and cost need ownership',
    description: 'Production use requires more than a successful API call. Access, budgets and operational records need clear owners.',
  },
  {
    title: 'Model decisions change over time',
    description: 'Capabilities, availability and pricing evolve, so applications should avoid unnecessary dependence on one model interface.',
  },
]

const principleItems = [
  {
    eyebrow: 'Practical',
    title: 'Technology must serve a real workflow',
    description: 'We start from the task, users and operating responsibilities rather than adding AI only for presentation value.',
  },
  {
    eyebrow: 'Open',
    title: 'Model choices should remain replaceable',
    description: 'A unified access layer helps teams evaluate models without turning one provider decision into permanent application architecture.',
  },
  {
    eyebrow: 'Visible',
    title: 'Usage and cost should be understandable',
    description: 'Teams need records and boundaries that support review, budgeting and troubleshooting as usage grows.',
  },
  {
    eyebrow: 'Responsible',
    title: 'Data and permission boundaries must be explicit',
    description: 'Deployment policy, upstream terms and internal responsibility should be confirmed before sensitive or production workloads begin.',
  },
]

/** 关于企业官网与服务理念页面。 */
export function AboutPage() {
  const { t } = useTranslation()

  return (
    <div>
      <PageHero
        eyebrow={t('About {{brand}}', { brand: siteConfig.name })}
        title={t('Help more businesses use AI capabilities reliably.')}
        description={t('We focus on model integration, enterprise governance and practical delivery so small and medium-sized teams can move from experimentation to maintainable AI-enabled products.')}
        actions={(
          <>
            <LinkButton href="/product" size="large">{t('Explore the platform')}</LinkButton>
            <LinkButton href="/contact" variant="secondary" size="large">{t('Talk with us')}</LinkButton>
          </>
        )}
        aside={(
          <div className="rounded-3xl border border-border bg-white/90 p-7 shadow-xl shadow-blue-950/5 sm:p-8">
            <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">{t('Our focus')}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ['01', 'Connect models'],
                ['02', 'Govern access and usage'],
                ['03', 'Support business delivery'],
              ].map(([number, label]) => (
                <div key={number} className="flex items-center gap-4 rounded-2xl bg-muted/70 p-4">
                  <span className="text-sm font-semibold text-brand">{number}</span>
                  <span className="text-sm font-medium text-foreground">{t(label)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      />

      <TrustSection
        eyebrow="Problems we address"
        title="Reduce the integration burden between business applications and model providers."
        description="Small and medium-sized teams often face infrastructure decisions before they can validate whether an AI workflow creates value."
        items={problemItems}
        columns={2}
      />

      <TrustSection
        eyebrow="Service principles"
        title="Build for practical choice, visibility and responsibility."
        description="These principles guide how we explain the platform and how we approach solution discussions."
        items={principleItems}
        columns={2}
        muted
      />

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t('How we work')}
            title={t('Move from a clear problem statement to an operable delivery plan.')}
            description={t('A solution discussion should make the application boundary, model role, data policy and operating owner visible before implementation begins.')}
          />
          <ol className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              {
                title: 'Clarify the workflow',
                description: 'Describe the user, task, input, expected output and the point where human judgment remains necessary.',
              },
              {
                title: 'Choose an integration boundary',
                description: 'Decide how applications call models, where credentials live and which provider-specific behavior must remain visible.',
              },
              {
                title: 'Plan ongoing governance',
                description: 'Assign responsibility for access, usage review, cost limits, content quality and deployment-specific data handling.',
              },
            ].map((step, index) => (
              <li key={step.title} className="rounded-3xl border border-border bg-surface p-7 shadow-sm">
                <span className="text-sm font-semibold text-brand">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-5 text-xl font-semibold text-foreground">{t(step.title)}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{t(step.description)}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="pb-8">
        <Container>
          <EvidenceNotice
            eyebrow="Verified company information"
            title="Company details are published only when they are configured and verified."
            description="Legal entity, location, filing information, working hours and support channels are not filled with template data. Contact us if you need the verified contracting or service entity for this deployment."
            actions={<LinkButton href="/contact">{t('Request company information')}</LinkButton>}
          />
        </Container>
      </section>

      <FinalCTA />
    </div>
  )
}
