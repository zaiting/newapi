import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { SectionHeading } from '@/components/marketing/section-heading'

/** 对比多供应商直连方式与统一治理后的工作方式。 */
export function PainPointsSection() {
  const { t } = useTranslation()
  const commonProblems = [
    t('Every provider has a different API and authentication flow.'),
    t('Provider credentials are scattered across projects and environments.'),
    t('A single channel failure can interrupt customer-facing features.'),
    t('Usage and cost are split across multiple provider consoles.'),
    t('Teams struggle to control model access and quotas by user or workload.'),
    t('Failed requests require investigation across disconnected systems.'),
  ]
  const platformChanges = [
    t('Call multiple model providers through a unified interface.'),
    t('Manage provider credentials and enterprise API keys centrally.'),
    t('Apply routing strategies and prepare alternative channels.'),
    t('Review usage, tokens, cost, and errors in one place.'),
    t('Control model access and quotas for different users and workloads.'),
    t('Use unified logs to locate operational issues faster.'),
  ]

  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={t('Why a unified platform')}
          title={t('Connecting multiple AI models should not mean maintaining multiple systems')}
          description={t('Replace fragmented integrations and provider consoles with a consistent operating layer for your team.')}
          align="center"
        />
        <div className="mt-12 grid overflow-hidden rounded-3xl border border-border bg-surface shadow-sm lg:grid-cols-2">
          <article className="border-b border-border bg-slate-50 p-6 sm:p-9 lg:border-b-0 lg:border-r">
            <p className="text-sm font-semibold tracking-[0.14em] text-slate-500 uppercase">{t('Without unified governance')}</p>
            <h3 className="mt-3 text-2xl font-semibold text-foreground">{t('Common integration friction')}</h3>
            <ul className="mt-7 space-y-4">
              {commonProblems.map((problem) => (
                <li key={problem} className="flex gap-3 text-sm leading-6 text-muted-foreground sm:text-base">
                  <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-700" aria-hidden="true">×</span>
                  <span>{problem}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="bg-gradient-to-br from-blue-50 to-white p-6 sm:p-9">
            <p className="text-sm font-semibold tracking-[0.14em] text-brand uppercase">{t('With one operating layer')}</p>
            <h3 className="mt-3 text-2xl font-semibold text-foreground">{t('A clearer way to deliver AI')}</h3>
            <ul className="mt-7 space-y-4">
              {platformChanges.map((change) => (
                <li key={change} className="flex gap-3 text-sm leading-6 text-muted-foreground sm:text-base">
                  <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700" aria-hidden="true">✓</span>
                  <span>{change}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </Container>
    </section>
  )
}
