import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { LinkButton } from '@/components/marketing/link-button'
import { PageHero } from '@/components/marketing/page-hero'
import { siteConfig } from '@/config/site'
import { BillingGuide } from '@/features/pricing/billing-guide'
import { ModelPriceExplorer } from '@/features/pricing/model-price-explorer'
import { PricingFAQ } from '@/features/pricing/pricing-faq'
import { ServiceOptions } from '@/features/pricing/service-options'

/** 模型与价格页面，同时服务开发者价格查询和企业方案评估。 */
export function PricingPage() {
  const { t } = useTranslation()

  return (
    <>
      <PageHero
        eyebrow={t('Models and pricing')}
        title={t('Understand model usage and enterprise service options clearly')}
        description={t('Compare illustrative billing structures, understand measurement units, and choose an evaluation path for unified model access, usage visibility, and cost governance.')}
        actions={
          <>
            <LinkButton href="#model-catalog" size="large">{t('Explore model billing')}</LinkButton>
            <LinkButton href="/contact" variant="secondary" size="large">{t('Contact enterprise services')}</LinkButton>
          </>
        }
        aside={<PricingHeroSummary />}
      />

      <ServiceOptions />
      <ModelPriceExplorer />
      <BillingGuide />
      <PricingFAQ />

      <section className="py-20 sm:py-24">
        <Container>
          <div className="rounded-3xl border border-border bg-surface px-6 py-12 text-center shadow-lg sm:px-10">
            <p className="text-sm font-semibold tracking-[0.16em] text-brand uppercase">{t('Need verified commercial terms?')}</p>
            <h2 className="mx-auto mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{t('Review models, usage patterns, and delivery requirements with the right context')}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground">{t('Use the documentation for technical evaluation or contact the enterprise team to confirm current capabilities, rates, and service scope.')}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <LinkButton href={siteConfig.docsUrl} variant="secondary" size="large">{t('View API documentation')}</LinkButton>
              <LinkButton href="/contact" size="large">{t('Request a pricing review')}</LinkButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

/** 价格页首屏展示从用量到费用记录的透明链路。 */
function PricingHeroSummary() {
  const { t } = useTranslation()
  const items = [
    { label: t('Usage dimensions'), value: t('Tokens, requests, media, tasks') },
    { label: t('Rate configuration'), value: t('Currency, unit, effective rate') },
    { label: t('Cost review'), value: t('Model, user, project, time range') },
  ]

  return (
    <div className="rounded-3xl border border-border bg-surface p-6 shadow-2xl shadow-blue-950/10 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">{t('Transparent billing path')}</p>
          <h2 className="mt-2 text-xl font-semibold text-foreground">{t('From usage to reviewable records')}</h2>
        </div>
        <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">{t('Illustrative')}</span>
      </div>

      <dl className="mt-6 space-y-3">
        {items.map((item, index) => (
          <div key={item.label} className="grid grid-cols-[2.5rem_1fr] gap-3 rounded-xl border border-border bg-muted/50 p-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-xs font-bold text-white" aria-hidden="true">0{index + 1}</span>
            <div>
              <dt className="text-sm font-semibold text-foreground">{item.label}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{item.value}</dd>
            </div>
          </div>
        ))}
      </dl>

      <p className="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-xs leading-6 text-amber-900">{t('Commercial amounts appear only after verified pricing data is connected.')}</p>
    </div>
  )
}
