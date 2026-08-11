import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { SectionHeading } from '@/components/marketing/section-heading'

/** 展示从现有模型接口迁移至统一网关的评估与验证步骤。 */
export function MigrationFlow() {
  const { t } = useTranslation()
  const steps = [
    {
      number: '1',
      title: t('Review the current integration'),
      description: t('Inventory the endpoints, models, authentication methods, streaming behavior, and request fields already used by the application.'),
    },
    {
      number: '2',
      title: t('Connect the unified gateway'),
      description: t('Replace the base URL or introduce the gateway at the application boundary after confirming protocol compatibility.'),
    },
    {
      number: '3',
      title: t('Create scoped API keys'),
      description: t('Assign a dedicated credential to each application and configure the required model access, quota, and validity boundaries.'),
    },
    {
      number: '4',
      title: t('Select and validate models'),
      description: t('Map application scenarios to supported models and verify response quality, streaming, latency, and error handling.'),
    },
    {
      number: '5',
      title: t('Verify with usage logs'),
      description: t('Use request and task records to confirm routing results, status, latency, and usage before expanding production traffic.'),
    },
  ]

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={t('Migration path')}
          title={t('Move from existing model APIs without rewriting the entire business')}
          description={t('A practical migration starts with compatibility assessment, controlled configuration changes, and observable validation rather than assuming every protocol is identical.')}
        />

        <ol className="mt-12 grid gap-4 md:grid-cols-5">
          {steps.map((step, index) => (
            <li key={step.number} className="relative rounded-2xl border border-border bg-surface p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">{step.number}</span>
                {index < steps.length - 1 ? <span className="h-px flex-1 bg-border md:hidden" aria-hidden="true" /> : null}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 rounded-2xl border border-brand/20 bg-brand-soft p-5 text-sm leading-7 text-foreground">
          <strong>{t('Migration note:')}</strong>{' '}
          {t('The required changes depend on the provider protocol, model features, and application behavior. Validate compatibility before production rollout.')}
        </div>
      </Container>
    </section>
  )
}
