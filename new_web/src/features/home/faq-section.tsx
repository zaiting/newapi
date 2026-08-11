import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { SectionHeading } from '@/components/marketing/section-heading'

/** 首页常见问题，回答基于当前平台可验证的接入与治理能力。 */
export function FaqSection() {
  const { t } = useTranslation()
  const faqs = [
    {
      question: t('Do I need to rewrite my existing OpenAI integration?'),
      answer: t('If your application already follows an OpenAI-compatible request pattern, migration can often begin by changing the base URL, API key, and model configuration. Verify the endpoints and parameters your workload uses before release.'),
    },
    {
      question: t('Which models and providers are supported?'),
      answer: t('Support depends on the channels enabled in your deployment. Review the current model and pricing page or the available model list in the console for the most relevant information.'),
    },
    {
      question: t('How can we manage API keys for different projects?'),
      answer: t('Create separate API keys for applications, environments, or teams, then configure the model access and usage boundaries available in your deployment. Avoid sharing one credential across unrelated workloads.'),
    },
    {
      question: t('How can we understand model cost by user or workload?'),
      answer: t('Use separate users or API keys to establish clear allocation boundaries, then review usage and cost records by user, model, and time range in the available logs and overview pages.'),
    },
    {
      question: t('What happens when a model provider channel has a problem?'),
      answer: t('The platform can organize multiple channels and apply configured routing strategies. Actual fallback behavior depends on the channels and policies your administrator has configured.'),
    },
    {
      question: t('Does the platform record request and response content?'),
      answer: t('Logging and data-recording behavior depends on deployment settings and the enabled features. Review those settings for your environment and avoid sending data that is not required for the model task.'),
    },
    {
      question: t('How do we obtain technical support?'),
      answer: t('Use the contact page to describe your integration, provider, and deployment requirements. Available support arrangements should be confirmed before project planning.'),
    },
    {
      question: t('Can we connect an existing model service or compatible endpoint?'),
      answer: t('Compatible and custom channel options are available for supported request formats. Confirm authentication, model naming, request parameters, streaming behavior, and error responses during technical evaluation.'),
    },
  ]

  return (
    <section className="bg-muted/60 py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
          <div>
            <SectionHeading
              eyebrow={t('Frequently asked questions')}
              title={t('Plan your AI integration with clearer expectations')}
              description={t('These answers outline the platform approach without replacing a technical review of your own deployment.')}
            />
            <a href="/contact" className="mt-7 inline-flex text-sm font-semibold text-brand hover:text-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
              {t('Ask a technical question')} <span className="ml-1" aria-hidden="true">→</span>
            </a>
          </div>
          <div className="divide-y divide-border overflow-hidden rounded-3xl border border-border bg-surface px-5 shadow-sm sm:px-7">
            {faqs.map((faq, index) => (
              <details key={faq.question} className="group" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-lg text-brand transition group-open:rotate-45 motion-reduce:transition-none" aria-hidden="true">+</span>
                </summary>
                <p className="max-w-3xl pb-6 pr-8 text-sm leading-7 text-muted-foreground sm:text-base">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
