import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { SectionHeading } from '@/components/marketing/section-heading'

/** 展示企业 AI 接入平台的四层架构以及端到端请求路径。 */
export function ProductArchitecture() {
  const { t } = useTranslation()
  const layers = [
    {
      index: '01',
      title: t('Business applications'),
      description: t('Customer service, knowledge bases, SaaS products, content tools, and internal systems.'),
      items: [t('Customer service'), t('Knowledge base'), t('SaaS products'), t('Internal systems')],
    },
    {
      index: '02',
      title: t('Unified access layer'),
      description: t('Connect applications through compatible APIs, centralized authentication, and request transformation.'),
      items: [t('Compatible APIs'), t('Authentication'), t('Request transformation')],
    },
    {
      index: '03',
      title: t('Governance layer'),
      description: t('Coordinate routing, rate limits, permissions, quotas, logs, and cost visibility in one place.'),
      items: [t('Routing'), t('Rate limits'), t('Permissions'), t('Usage and cost')],
    },
    {
      index: '04',
      title: t('Model supply layer'),
      description: t('Connect public models, cloud provider models, compatible endpoints, or models managed by your team.'),
      items: [t('Public models'), t('Cloud providers'), t('Compatible endpoints'), t('Managed models')],
    },
  ]

  return (
    <section className="border-b border-border bg-muted/50 py-20 sm:py-24" aria-label={t('Platform architecture')}>
      <Container>
        <SectionHeading
          eyebrow={t('Platform architecture')}
          title={t('A clear path from business applications to model providers')}
          description={t('Separate application integration, governance, and model supply so teams can evolve each layer without rebuilding the entire AI workflow.')}
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-4">
          {layers.map((layer, layerIndex) => (
            <article key={layer.index} className="relative rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold tracking-[0.18em] text-brand" aria-hidden="true">{layer.index}</span>
                {layerIndex < layers.length - 1 ? (
                  <span className="hidden text-xl text-brand/60 lg:block" aria-hidden="true">→</span>
                ) : null}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-foreground">{layer.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{layer.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={t('Included capabilities')}>
                {layer.items.map((item) => (
                  <li key={item} className="rounded-full bg-brand-soft px-3 py-1.5 text-xs font-medium text-brand-strong">{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
