import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { LinkButton } from '@/components/marketing/link-button'
import type { DemoModelPrice } from '@/features/pricing/pricing-data'

interface ModelPricingDetailProps {
  /** 当前详情页匹配到的演示模型。 */
  model: DemoModelPrice
}

/** 展示单个演示模型的计费维度、数据边界和接入下一步。 */
export function ModelPricingDetail({ model }: ModelPricingDetailProps) {
  const { t } = useTranslation()

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-hero py-16 sm:py-20">
        <div className="hero-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <Container className="relative">
          <LinkButton href="/pricing#model-catalog" variant="ghost" className="-ml-4 mb-8">← <span className="ml-2">{t('Back to model pricing')}</span></LinkButton>
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong">{model.categoryLabel}</span>
                <span className="rounded-full border border-border bg-white px-3 py-1 text-xs text-muted-foreground">{t('Illustrative model')}</span>
              </div>
              <h1 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">{model.name}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{model.useCase}</p>
            </div>
            <dl className="grid min-w-64 gap-3 rounded-2xl border border-border bg-surface p-5 shadow-sm">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{t('Provider connection')}</dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">{model.providerName}</dd>
              </div>
              <div className="border-t border-border pt-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{t('Catalog ID')}</dt>
                <dd className="mt-1 font-mono text-sm text-foreground">{model.id}</dd>
              </div>
            </dl>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <p className="text-sm font-semibold tracking-[0.16em] text-brand uppercase">{t('Billing dimensions')}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{t('Review each measurement unit separately')}</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">{t('Input, output, media, duration, quality, and task dimensions may use different rates. This demonstration shows structure only, not commercial amounts.')}</p>

            <dl className="mt-8 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
              {model.billing.map((item) => (
                <div key={item.label} className="grid gap-4 p-5 sm:grid-cols-[0.8fr_1.2fr_1.2fr] sm:items-center sm:p-6">
                  <dt className="font-semibold text-foreground">{item.label}</dt>
                  <dd className="text-sm leading-6 text-muted-foreground">{item.unit}</dd>
                  <dd className="rounded-lg bg-muted px-3 py-2 text-sm font-medium text-foreground sm:text-right">{item.rate}</dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <p className="text-sm font-semibold text-amber-950">{t('Pricing status')}</p>
              <p className="mt-3 text-sm leading-7 text-amber-900">{t('This model entry is static demonstration content. No currency amount, provider rate, platform fee, discount, or effective date is asserted.')}</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h2 className="text-lg font-semibold text-foreground">{t('Before using a published rate')}</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                <li>{t('Confirm the provider and model identifier.')}</li>
                <li>{t('Confirm the currency and measurement unit.')}</li>
                <li>{t('Confirm whether platform fees are included.')}</li>
                <li>{t('Confirm the effective date and final usage record.')}</li>
              </ul>
            </div>
          </aside>
        </Container>
      </section>

      <section className="border-t border-border bg-muted/50 py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-6 rounded-3xl bg-ink px-6 py-10 text-white sm:px-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold tracking-[0.16em] text-cyan-300 uppercase">{t('Next step')}</p>
              <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">{t('Connect verified pricing before making a commercial decision')}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{t('Review the complete catalog or contact the enterprise team to confirm current model support and commercial terms.')}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <LinkButton href="/pricing#model-catalog" variant="secondary" className="border-white/20 bg-white/10 text-white hover:bg-white/15">{t('Browse model catalog')}</LinkButton>
              <LinkButton href="/contact">{t('Request a pricing review')}</LinkButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
