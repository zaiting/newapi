import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { FinalCTA } from '@/components/marketing/final-cta'
import { LinkButton } from '@/components/marketing/link-button'
import { PageHero } from '@/components/marketing/page-hero'
import { SectionHeading } from '@/components/marketing/section-heading'
import { siteConfig } from '@/config/site'
import { EvidenceNotice } from '@/features/trust/trust-section'

const resourceItems = [
  {
    category: 'Getting started',
    title: 'Quick integration guide',
    description: 'Review the currently available documentation and understand the first application integration path.',
    href: 'docs',
  },
  {
    category: 'Model decisions',
    title: 'Model capability and price comparison',
    description: 'Use the model and pricing pages to compare the information currently published by this deployment.',
    href: 'pricing',
  },
  {
    category: 'Architecture',
    title: 'Multi-model routing practices',
    description: 'Planned guidance for fallback design, routing boundaries, provider differences and operational review.',
  },
  {
    category: 'Governance',
    title: 'AI cost governance guide',
    description: 'Planned guidance for ownership, quotas, usage review and cost-aware model selection.',
  },
  {
    category: 'Security',
    title: 'Enterprise API key management guide',
    description: 'Planned guidance for credential ownership, application separation, revocation and replacement.',
  },
  {
    category: 'Updates',
    title: 'Product updates and notices',
    description: 'A future home for verified product changes, availability notes and operating announcements.',
  },
]

/** 企业 AI 集成资源中心。 */
export function ResourcesPage() {
  const { t } = useTranslation()

  return (
    <div>
      <PageHero
        eyebrow={t('Resource center')}
        title={t('Practical guidance for enterprise AI integration.')}
        description={t('Use current documentation and model information today, while deeper architecture and governance guides are prepared as verified resources rather than placeholder articles.')}
        actions={(
          <>
            <LinkButton href={siteConfig.docsUrl} size="large">{t('Open documentation')}</LinkButton>
            <LinkButton href="/pricing" variant="secondary" size="large">{t('Compare models and pricing')}</LinkButton>
          </>
        )}
        aside={(
          <div className="rounded-3xl border border-border bg-white/90 p-7 shadow-xl shadow-blue-950/5 sm:p-8">
            <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">{t('Resource principles')}</p>
            <ul className="mt-5 space-y-4">
              {[
                'Separate current documentation from planned content',
                'State the source and freshness of comparison data',
                'Explain decisions instead of publishing unsupported conclusions',
                'Keep credentials and private production data out of examples',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  <span>{t(item)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      />

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t('Browse resources')}
            title={t('Start with available material and see what is planned next.')}
            description={t('A resource is linked only when a real destination exists. Planned topics are labeled clearly and do not lead to empty articles.')}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {resourceItems.map((resource) => {
              const href = resource.href === 'docs' ? siteConfig.docsUrl : resource.href === 'pricing' ? '/pricing' : ''
              return (
                <article key={resource.title} className="flex min-h-72 flex-col rounded-3xl border border-border bg-surface p-7 shadow-sm">
                  <p className="text-xs font-semibold tracking-[0.14em] text-brand uppercase">{t(resource.category)}</p>
                  <h2 className="mt-4 text-xl font-semibold tracking-tight text-foreground">{t(resource.title)}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{t(resource.description)}</p>
                  <div className="mt-auto pt-8">
                    {href ? (
                      <LinkButton href={href} variant="secondary">{t('Open resource')}</LinkButton>
                    ) : (
                      <span className="inline-flex min-h-10 items-center rounded-xl border border-dashed border-border bg-muted/60 px-4 text-sm font-medium text-muted-foreground">
                        {t('Planned resource')}
                      </span>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-muted/60 py-20 sm:py-24">
        <Container>
          <EvidenceNotice
            eyebrow="Model evaluation"
            title="Need model rankings or capability guidance?"
            description="The model evaluation page explains the dimensions a useful comparison should include. It does not publish an authoritative ranking without a named data source, methodology and update time."
            actions={(
              <>
                <LinkButton href="/resources/model-rankings">{t('Review the evaluation framework')}</LinkButton>
                <LinkButton href="/pricing" variant="secondary">{t('View model pricing')}</LinkButton>
              </>
            )}
          />
        </Container>
      </section>

      <FinalCTA />
    </div>
  )
}
