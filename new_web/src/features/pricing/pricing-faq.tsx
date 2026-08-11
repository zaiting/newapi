import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { SectionHeading } from '@/components/marketing/section-heading'

/** 回答模型计费和企业报价中的常见问题。 */
export function PricingFAQ() {
  const { t } = useTranslation()
  const questions = [
    {
      question: t('How are tokens calculated?'),
      answer: t('Token calculation depends on the tokenizer and protocol used by the selected model. Use the verified model documentation and platform usage records for the applicable calculation method.'),
    },
    {
      question: t('Why do models have different prices?'),
      answer: t('Providers can use different cost structures for model capability, modality, context, latency, input, output, quality, duration, and other billing dimensions.'),
    },
    {
      question: t('How can I review actual cost?'),
      answer: t('Use the usage and billing records available to your account, then reconcile them with the configured currency, unit, rate, and any agreed service terms.'),
    },
    {
      question: t('Can usage limits be configured?'),
      answer: t('The product supports access and quota controls in applicable configurations. Confirm the exact limit behavior and notification options for your deployment before relying on them.'),
    },
    {
      question: t('How do enterprise customers receive a quote?'),
      answer: t('Share the required models, expected usage pattern, team structure, deployment constraints, and support needs so the enterprise team can confirm scope and commercial terms.'),
    },
    {
      question: t('How are pricing updates communicated?'),
      answer: t('The effective channel and notice period should follow the applicable account configuration or written agreement. Do not rely on this illustrative page as a pricing notice.'),
    },
  ]

  return (
    <section className="border-t border-border bg-muted/50 py-20 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <SectionHeading
          eyebrow={t('Pricing FAQ')}
          title={t('Common questions about model usage and billing')}
          description={t('These answers explain general billing concepts. Verified configuration and written commercial terms take precedence.')}
        />

        <div className="divide-y divide-border rounded-2xl border border-border bg-surface px-5 sm:px-7">
          {questions.map((item, index) => (
            <details key={item.question} className="group py-5" open={index === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4">
                <span>{item.question}</span>
                <span className="text-xl font-normal text-brand transition group-open:rotate-45 motion-reduce:transition-none" aria-hidden="true">+</span>
              </summary>
              <p className="pr-10 pt-4 text-sm leading-7 text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  )
}
