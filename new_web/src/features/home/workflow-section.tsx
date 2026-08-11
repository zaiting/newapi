import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { SectionHeading } from '@/components/marketing/section-heading'

/** 展示从供应商接入到调用治理的完整产品工作流程。 */
export function WorkflowSection() {
  const { t } = useTranslation()
  const workflowSteps = [
    { title: t('Connect model providers'), description: t('Add supported providers or existing compatible channels to the platform.'), visual: t('Provider') },
    { title: t('Create an enterprise API key'), description: t('Issue a dedicated credential for the application or team that will make requests.'), visual: t('API Key') },
    { title: t('Configure models and quotas'), description: t('Define which models can be used and set practical access boundaries.'), visual: t('Policy') },
    { title: t('Call the unified API'), description: t('Let business applications send requests through one consistent integration.'), visual: t('/v1') },
    { title: t('Review usage and operations'), description: t('Use unified usage, cost, and error logs to support day-to-day operations.'), visual: t('Logs') },
  ]

  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={t('A practical operating workflow')}
          title={t('From model access to enterprise governance in one platform')}
          description={t('Start with the providers you already use, then add consistent access, policy, and operational visibility around them.')}
          align="center"
        />
        <div className="relative mt-14">
          <div className="absolute left-[10%] right-[10%] top-9 hidden border-t-2 border-dashed border-brand/20 md:block" aria-hidden="true" />
          <ol className="relative grid gap-4 md:grid-cols-5">
            {workflowSteps.map((step, index) => (
            <li key={step.title} className="relative rounded-2xl border border-border bg-surface p-5 shadow-sm">
              <div className="relative z-10 flex items-center justify-between gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-brand text-sm font-bold text-white" aria-hidden="true">{index + 1}</span>
                <span className="rounded-lg border border-border bg-muted px-2.5 py-1 font-mono text-xs font-semibold text-muted-foreground">{step.visual}</span>
              </div>
              <h3 className="mt-5 text-base font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.description}</p>
            </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
