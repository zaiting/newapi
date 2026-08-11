import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { SectionHeading } from '@/components/marketing/section-heading'

/** 汇总官网需要呈现的六项企业级模型接入能力。 */
export function ProductCapabilities() {
  const { t } = useTranslation()
  const capabilities = [
    {
      id: 'unified-model-api',
      marker: 'API',
      title: t('Unified model API'),
      description: t('Use a consistent integration pattern across supported model providers and reduce provider-specific application code.'),
      points: [t('Unified request patterns'), t('Model switching'), t('Integration examples')],
    },
    {
      id: 'model-routing',
      marker: 'RT',
      title: t('Model routing and resilience'),
      description: t('Organize available channels with clear priorities, health visibility, failure handling, and traffic allocation controls.'),
      points: [t('Channel priority'), t('Availability status'), t('Failure handling'), t('Traffic allocation')],
    },
    {
      id: 'api-key-management',
      marker: 'KEY',
      title: t('Enterprise API key management'),
      description: t('Create independent credentials for applications and define practical boundaries for model access, quota, and validity.'),
      points: [t('Application-level keys'), t('Model access scope'), t('Quota and expiration'), t('Credential revocation')],
    },
    {
      id: 'access-control',
      marker: 'IAM',
      title: t('Enterprise access control'),
      description: t('Separate user identities, roles, and administrative responsibilities to keep access aligned with team boundaries.'),
      points: [t('User identity'), t('Role boundaries'), t('Administrative permissions')],
    },
    {
      id: 'usage-and-cost',
      marker: 'COST',
      title: t('Usage and cost governance'),
      description: t('Review token usage, request volume, model cost trends, and consumption by user or project.'),
      points: [t('Token and request metrics'), t('Cost trends'), t('User and project analysis')],
    },
    {
      id: 'logs-and-observability',
      marker: 'LOG',
      title: t('Logs and observability'),
      description: t('Trace request time, selected model, status, latency, task records, and error context without exposing unnecessary sensitive content.'),
      points: [t('Request status'), t('Latency tracking'), t('Error context'), t('Sensitive data controls')],
    },
  ]

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={t('Core capabilities')}
          title={t('Operate model access as a shared business capability')}
          description={t('Give engineering, product, and operations teams a common control plane for integration, governance, observability, and cost review.')}
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {capabilities.map((capability) => (
            <article id={capability.id} key={capability.id} className="group scroll-mt-28 rounded-2xl border border-border bg-surface p-6 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg motion-reduce:transform-none">
              <span className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-lg bg-brand-soft px-2 text-xs font-bold tracking-wide text-brand" aria-hidden="true">
                {capability.marker}
              </span>
              <h3 className="mt-5 text-xl font-semibold text-foreground">{capability.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{capability.description}</p>
              <ul className="mt-5 space-y-3">
                {capability.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm text-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
