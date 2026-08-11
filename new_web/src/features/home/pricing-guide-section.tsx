import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { LinkButton } from '@/components/marketing/link-button'
import { SectionHeading } from '@/components/marketing/section-heading'

/** 首页价格引导，不承诺未确认的套餐、价格或服务等级。 */
export function PricingGuideSection() {
  const { t } = useTranslation()
  const paths = [
    {
      label: t('Self-service access'),
      audience: t('For developers and small projects'),
      description: t('Review available models and their current usage pricing, then begin integration through the console.'),
      items: [t('Explore enabled models'), t('Create an API key'), t('Review usage records')],
    },
    {
      label: t('Team rollout'),
      audience: t('For teams operating shared AI workloads'),
      description: t('Plan user access, model scope, quotas, and operational responsibilities before production rollout.'),
      items: [t('Separate team access'), t('Define usage boundaries'), t('Centralize operating logs')],
    },
    {
      label: t('Solution review'),
      audience: t('For businesses with integration requirements'),
      description: t('Discuss provider compatibility, migration scope, governance needs, and a practical implementation path.'),
      items: [t('Review technical fit'), t('Clarify deployment requirements'), t('Plan the integration path')],
    },
  ]

  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={t('Choose your path')}
          title={t('From development testing to business production, start where you are')}
          description={t('Model availability, pricing, and service options should be reviewed from current product information before you decide.')}
          align="center"
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {paths.map((pathItem, index) => (
            <article key={pathItem.label} className={'flex flex-col rounded-3xl border p-6 sm:p-7 ' + (index === 1 ? 'border-brand/30 bg-brand-soft shadow-lg shadow-blue-100' : 'border-border bg-surface shadow-sm')}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-brand">{pathItem.label}</p>
                  <h3 className="mt-2 text-xl font-semibold text-foreground">{pathItem.audience}</h3>
                </div>
                {index === 1 ? <span className="rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">{t('For growing teams')}</span> : null}
              </div>
              <p className="mt-5 text-sm leading-7 text-muted-foreground">{pathItem.description}</p>
              <ul className="mt-6 space-y-3 text-sm text-foreground">
                {pathItem.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-emerald-600" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                {index === 0 ? (
                  <LinkButton href="/pricing" variant="secondary" className="w-full">{t('View models and pricing')}</LinkButton>
                ) : (
                  <LinkButton href="/contact" variant={index === 1 ? 'primary' : 'secondary'} className="w-full">{t('Book a solution review')}</LinkButton>
                )}
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">{t('This section does not represent fixed plans, guaranteed service levels, or a pricing commitment.')}</p>
      </Container>
    </section>
  )
}
