import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { SectionHeading } from '@/components/marketing/section-heading'

/** 解释价格来源、计量单位、平台费用和最终账单口径。 */
export function BillingGuide() {
  const { t } = useTranslation()
  const principles = [
    {
      title: t('Pricing data source'),
      description: t('Production pricing should come from verified provider information and the platform pricing configuration. The current catalog is illustrative only.'),
    },
    {
      title: t('Currency and measurement units'),
      description: t('Every published rate should state its currency and whether it is measured by tokens, images, audio, duration, tasks, or another explicit unit.'),
    },
    {
      title: t('Platform service fees'),
      description: t('The commercial page must state whether a displayed amount includes any platform service fee. This demo intentionally does not assume one.'),
    },
    {
      title: t('Final usage record'),
      description: t('Actual charges should be reconciled against the platform usage and billing records defined in the applicable agreement or account configuration.'),
    },
    {
      title: t('Upstream price changes'),
      description: t('When upstream rates change, verified pricing data, effective dates, and customer communication should be updated before new rates are presented.'),
    },
  ]

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={t('Billing transparency')}
          title={t('Make every billing unit and data boundary explicit')}
          description={t('A commercial pricing experience should help buyers understand what is measured, where rates come from, and which record determines the final cost.')}
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {principles.map((principle, index) => (
            <article key={principle.title} className="rounded-2xl border border-border bg-surface p-5">
              <span className="text-xs font-semibold tracking-[0.16em] text-brand" aria-hidden="true">0{index + 1}</span>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{principle.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{principle.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
