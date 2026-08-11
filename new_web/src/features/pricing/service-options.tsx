import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { LinkButton } from '@/components/marketing/link-button'
import { SectionHeading } from '@/components/marketing/section-heading'
import { siteConfig } from '@/config/site'

/** 展示不包含虚构金额或服务承诺的三种产品使用方式。 */
export function ServiceOptions() {
  const { t } = useTranslation()
  const options = [
    {
      label: t('Self-service access'),
      audience: t('For development validation and small projects'),
      commercialModel: t('Use the billing method configured in the platform'),
      description: t('Create credentials, connect supported models, and review basic usage and request records through the available product capabilities.'),
      features: [t('Self-service account entry'), t('Application API keys'), t('Supported model access'), t('Basic usage and logs')],
      action: t('Start integration'),
      href: siteConfig.consoleUrl,
      highlighted: false,
    },
    {
      label: t('Enterprise service'),
      audience: t('For teams and production workloads'),
      commercialModel: t('Scope and commercial terms confirmed through review'),
      description: t('Evaluate team access, usage governance, production integration requirements, and available technical support with the enterprise team.'),
      features: [t('Team access review'), t('Usage governance'), t('Architecture assessment'), t('Support scope confirmation')],
      action: t('Contact enterprise services'),
      href: '/contact',
      highlighted: true,
    },
    {
      label: t('Dedicated solution'),
      audience: t('For specialized deployment or provider requirements'),
      commercialModel: t('Availability confirmed after technical assessment'),
      description: t('Discuss dedicated instances, private deployment, custom provider connections, or dedicated support only when those options match actual delivery capabilities.'),
      features: [t('Deployment feasibility review'), t('Custom provider assessment'), t('Security boundary review'), t('Delivery scope confirmation')],
      action: t('Discuss requirements'),
      href: '/contact',
      highlighted: false,
    },
  ]

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={t('Ways to use the platform')}
          title={t('Choose an engagement path that matches your operating stage')}
          description={t('The options below describe how teams can evaluate the platform. Exact capabilities, support scope, and commercial terms depend on current configuration and written confirmation.')}
          align="center"
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {options.map((option) => (
            <article key={option.label} className={option.highlighted ? 'relative rounded-3xl border border-brand bg-ink p-7 text-white shadow-xl lg:-translate-y-2' : 'relative rounded-3xl border border-border bg-surface p-7 shadow-sm'}>
              {option.highlighted ? <span className="absolute right-5 top-5 rounded-full bg-cyan-300/15 px-3 py-1 text-xs font-semibold text-cyan-200">{t('Enterprise evaluation')}</span> : null}
              <p className={option.highlighted ? 'text-sm font-semibold text-cyan-300' : 'text-sm font-semibold text-brand'}>{option.audience}</p>
              <h3 className={option.highlighted ? 'mt-4 text-2xl font-semibold text-white' : 'mt-4 text-2xl font-semibold text-foreground'}>{option.label}</h3>
              <p className={option.highlighted ? 'mt-3 min-h-12 text-sm font-medium text-slate-200' : 'mt-3 min-h-12 text-sm font-medium text-foreground'}>{option.commercialModel}</p>
              <p className={option.highlighted ? 'mt-5 text-sm leading-7 text-slate-300' : 'mt-5 text-sm leading-7 text-muted-foreground'}>{option.description}</p>
              <ul className="mt-6 space-y-3">
                {option.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <span className={option.highlighted ? 'mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-300/15 text-cyan-200' : 'mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand'} aria-hidden="true">✓</span>
                    <span className={option.highlighted ? 'text-slate-200' : 'text-foreground'}>{feature}</span>
                  </li>
                ))}
              </ul>
              <LinkButton href={option.href} variant={option.highlighted ? 'primary' : 'secondary'} className="mt-8 w-full">
                {option.action}
              </LinkButton>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
