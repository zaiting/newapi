import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { LinkButton } from '@/components/marketing/link-button'
import { SectionHeading } from '@/components/marketing/section-heading'

/** 在没有公开客户案例时，以明确标注的示例场景说明落地方式。 */
export function ScenariosSection() {
  const { t } = useTranslation()
  const scenarios = [
    {
      category: t('SaaS product team'),
      title: t('Add assistant features to an existing product'),
      challenge: t('The team needs to test and operate more than one model without maintaining separate provider integrations.'),
      approach: t('Use the unified API for application calls, dedicated keys for environments, and logs for release troubleshooting.'),
      capabilities: [t('Unified API'), t('API key isolation'), t('Request logs')],
    },
    {
      category: t('Growing business'),
      title: t('Build an internal knowledge workflow'),
      challenge: t('Different departments need controlled access to model capabilities while usage remains visible to administrators.'),
      approach: t('Separate access by user or key, define available models, and review usage through shared operational views.'),
      capabilities: [t('Model permissions'), t('Usage quotas'), t('Usage visibility')],
    },
    {
      category: t('Software service provider'),
      title: t('Deliver AI applications for multiple workloads'),
      challenge: t('Delivery teams need a consistent integration layer while each workload keeps its own access boundary.'),
      approach: t('Create dedicated credentials, configure workload-specific model access, and centralize provider operations.'),
      capabilities: [t('Dedicated credentials'), t('Model configuration'), t('Central operations')],
    },
  ]

  return (
    <section className="bg-muted/60 py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={t('Typical application scenarios')}
            title={t('See how a unified AI layer fits into real delivery work')}
            description={t('These are illustrative scenarios, not customer claims. They show how available platform capabilities can be combined.')}
          />
          <LinkButton href="/customers" variant="secondary">{t('Explore application scenarios')}</LinkButton>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {scenarios.map((scenario) => (
            <article key={scenario.title} className="flex flex-col rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-brand">{scenario.category}</p>
                <span className="rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">{t('Illustrative scenario')}</span>
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">{scenario.title}</h3>
              <dl className="mt-6 space-y-5 text-sm leading-6">
                <div>
                  <dt className="font-semibold text-foreground">{t('Business challenge')}</dt>
                  <dd className="mt-1 text-muted-foreground">{scenario.challenge}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">{t('Possible approach')}</dt>
                  <dd className="mt-1 text-muted-foreground">{scenario.approach}</dd>
                </div>
              </dl>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={t('Relevant platform capabilities')}>
                {scenario.capabilities.map((capability) => (
                  <li key={capability} className="rounded-full bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand">{capability}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
