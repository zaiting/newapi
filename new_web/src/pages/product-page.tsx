import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { LinkButton } from '@/components/marketing/link-button'
import { PageHero } from '@/components/marketing/page-hero'
import { siteConfig } from '@/config/site'
import { IntegrationWorkflow } from '@/features/product/integration-workflow'
import { MigrationFlow } from '@/features/product/migration-flow'
import { ProductArchitecture } from '@/features/product/product-architecture'
import { ProductCapabilities } from '@/features/product/product-capabilities'

/** 产品能力页面，面向技术负责人和产品负责人介绍统一模型接入与治理能力。 */
export function ProductPage() {
  const { t } = useTranslation()

  return (
    <>
      <PageHero
        eyebrow={t('Product capabilities')}
        title={t('Enterprise AI model integration and governance in one platform')}
        description={t('Connect models, manage credentials, control access, review usage, and improve service resilience through a unified operating layer.')}
        actions={
          <>
            <LinkButton href={siteConfig.consoleUrl} size="large">{t(siteConfig.consoleConfigured ? 'Start integration' : 'Book a solution review')}</LinkButton>
            <LinkButton href={siteConfig.docsUrl} variant="secondary" size="large">{t('View developer documentation')}</LinkButton>
          </>
        }
        aside={<ProductHeroDiagram />}
      />

      <ProductArchitecture />
      <ProductCapabilities />
      <IntegrationWorkflow />
      <MigrationFlow />

      <section className="py-20 sm:py-24">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-14 text-white shadow-2xl sm:px-12 lg:px-16">
            <div className="cta-orb absolute -right-24 -top-24 h-72 w-72 rounded-full" aria-hidden="true" />
            <div className="relative max-w-3xl">
              <p className="text-sm font-semibold tracking-[0.16em] text-cyan-300 uppercase">{t('Plan your integration')}</p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">{t('Turn model connectivity into a capability your team can operate')}</h2>
              <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">{t('Start with the API documentation or discuss architecture, migration boundaries, and governance requirements with the enterprise team.')}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href={siteConfig.consoleUrl} size="large">{t(siteConfig.consoleConfigured ? 'Start integration' : 'Book a solution review')}</LinkButton>
                <LinkButton href={siteConfig.docsUrl} variant="secondary" size="large" className="border-white/20 bg-white/10 text-white hover:bg-white/15">{t('View API documentation')}</LinkButton>
                <LinkButton href="/contact" variant="ghost" size="large" className="text-white hover:bg-white/10">{t('Book an architecture review')}</LinkButton>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

/** 产品页首屏的轻量平台结构示意，不代表具体供应商或部署承诺。 */
function ProductHeroDiagram() {
  const { t } = useTranslation()
  const nodes = [
    { label: t('Business applications'), detail: t('Web, mobile, SaaS, internal tools') },
    { label: t('Unified model gateway'), detail: t('API, routing, access, usage, logs') },
    { label: t('Supported model connections'), detail: t('Public, cloud, compatible, managed') },
  ]

  return (
    <div role="img" className="rounded-3xl border border-border bg-white/90 p-5 shadow-2xl shadow-blue-950/10 backdrop-blur sm:p-7" aria-label={t('Illustrative platform architecture')}>
      <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">{t('Request path')}</p>
          <p className="mt-1 text-sm text-muted-foreground">{t('A neutral architecture example')}</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">{t('Observable')}</span>
      </div>

      <div className="mt-5 space-y-3">
        {nodes.map((node, index) => (
          <div key={node.label}>
            <div className={index === 1 ? 'rounded-2xl border border-brand/30 bg-brand px-5 py-4 text-white shadow-lg shadow-blue-600/15' : 'rounded-2xl border border-border bg-surface px-5 py-4'}>
              <p className={index === 1 ? 'font-semibold text-white' : 'font-semibold text-foreground'}>{node.label}</p>
              <p className={index === 1 ? 'mt-1 text-sm text-blue-100' : 'mt-1 text-sm text-muted-foreground'}>{node.detail}</p>
            </div>
            {index < nodes.length - 1 ? <div className="mx-auto h-5 w-px bg-brand/40" aria-hidden="true" /> : null}
          </div>
        ))}
      </div>
    </div>
  )
}
