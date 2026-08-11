import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { FinalCTA } from '@/components/marketing/final-cta'
import { LinkButton } from '@/components/marketing/link-button'
import { PageHero } from '@/components/marketing/page-hero'
import { SectionHeading } from '@/components/marketing/section-heading'
import { IndustryCard } from '@/features/industries/industry-card'
import { useIndustriesContent } from '@/features/industries/use-industries-content'

/** 行业解决方案总览页。 */
export function IndustriesPage() {
  const { t } = useTranslation()
  const industries = useIndustriesContent()

  return (
    <>
      <PageHero
        eyebrow={t('Industry solutions')}
        title={t('Apply AI through the systems and rules your industry already depends on.')}
        description={t('Find practical entry points for model integration by industry, with explicit data sources, operating controls, human review, and platform responsibility boundaries.')}
        actions={
          <>
            <LinkButton href="#industry-catalog" size="large">{t('Explore industries')}</LinkButton>
            <LinkButton href="/contact" variant="secondary" size="large">{t('Discuss your workflow')}</LinkButton>
          </>
        }
        aside={
          <div className="rounded-3xl border border-border bg-surface p-6 shadow-[0_28px_90px_-50px_rgba(37,99,235,0.5)] sm:p-8">
            <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">{t('Industry implementation lens')}</p>
            <div className="mt-6 grid grid-cols-[auto_1fr] gap-x-4 gap-y-5">
              {[
                { label: t('Authority'), value: t('Which system owns the facts and final action?') },
                { label: t('Context'), value: t('What approved data may be sent to the model?') },
                { label: t('Control'), value: t('Who can access models and how is usage bounded?') },
                { label: t('Review'), value: t('Where must a person verify or approve the output?') },
              ].map((item, index) => (
                <div key={item.label} className="contents">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-brand-soft text-sm font-semibold text-brand">{index + 1}</span>
                  <div className="border-b border-border pb-5 last:border-b-0 last:pb-0">
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
      />

      <section id="industry-catalog" className="scroll-mt-20 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t('Industry catalog')}
            title={t('Start from workflows that are recognizable to your team')}
            description={t('Each industry page connects realistic business scenarios to an integration architecture, platform controls, and clear data and use boundaries.')}
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {industries.map((industry, index) => (
              <IndustryCard key={industry.slug} industry={industry} index={index} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-muted py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t('Shared operating model')}
            title={t('Different industries, the same need for controlled model access')}
            description={t('Industry workflows differ, but production use consistently requires authoritative data, application controls, governed model access, and accountable review.')}
          />
          <div className="mt-12 grid gap-4 lg:grid-cols-4">
            {[
              {
                number: '01',
                title: t('Authoritative systems'),
                description: t('Business platforms retain customer, product, document, learning, order, and policy truth.'),
              },
              {
                number: '02',
                title: t('Workflow orchestration'),
                description: t('Applications prepare context, enforce permissions, validate output, and manage human review.'),
              },
              {
                number: '03',
                title: t('Governed model access'),
                description: t('The platform centralizes keys, configured models, quotas, routing, request logs, and usage visibility.'),
              },
              {
                number: '04',
                title: t('Operational ownership'),
                description: t('Named business and technical owners review quality, cost, incidents, and model changes over time.'),
              },
            ].map((item) => (
              <article key={item.number} className="rounded-3xl border border-border bg-surface p-6">
                <span className="text-sm font-semibold text-brand">{item.number}</span>
                <h2 className="mt-4 text-lg font-semibold text-foreground">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <SectionHeading
            eyebrow={t('Choose the right entry point')}
            title={t('Industry context guides the workflow; solution patterns guide the implementation')}
            description={t('Use industry pages to define authoritative systems and risk boundaries, then choose a solution pattern for product integration, service assistance, knowledge, content, or development governance.')}
          />
          <div className="rounded-3xl border border-border bg-ink p-6 text-white sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: t('Industry question'), description: t('Where can AI enter the workflow without taking over business authority?') },
                { title: t('Solution question'), description: t('Which integration, model access, quota, logging, and review pattern fits that workflow?') },
              ].map((item) => (
                <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                  <h2 className="font-semibold text-white">{item.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{item.description}</p>
                </article>
              ))}
            </div>
            <LinkButton href="/solutions" variant="secondary" className="mt-5 w-full border-white/20 bg-white/10 text-white hover:bg-white/15">
              {t('Compare solution patterns')}
            </LinkButton>
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  )
}
