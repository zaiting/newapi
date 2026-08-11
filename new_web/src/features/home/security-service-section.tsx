import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { LinkButton } from '@/components/marketing/link-button'
import { SectionHeading } from '@/components/marketing/section-heading'

/** 说明企业生产环境可使用的管理、安全与支持能力。 */
export function SecurityServiceSection() {
  const { t } = useTranslation()
  const capabilities = [
    { title: t('Secure transport and authentication'), description: t('Use HTTPS and authenticated API access as the baseline for model calls.') },
    { title: t('Users, roles, and permissions'), description: t('Separate administrative responsibilities and model access across the organization.') },
    { title: t('API key isolation'), description: t('Issue dedicated credentials instead of sharing one provider key across every application.') },
    { title: t('Rate limits and quotas'), description: t('Apply practical usage boundaries to reduce accidental or uncontrolled consumption.') },
    { title: t('Operational logs and error tracing'), description: t('Keep request outcomes available for troubleshooting and operational review.') },
    { title: t('Configurable data handling'), description: t('Review logging and data-recording settings according to your deployment requirements.') },
  ]

  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div>
            <SectionHeading
              eyebrow={t('Security and service')}
              title={t('Management and security capabilities for production AI workloads')}
              description={t('Build access, usage boundaries, and operational visibility into the same platform that connects your models.')}
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/security">{t('Explore security capabilities')}</LinkButton>
              <LinkButton href="/contact" variant="secondary">{t('Discuss deployment requirements')}</LinkButton>
            </div>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">{t('Security outcomes depend on your deployment, provider configuration, and operating policies. Review the available controls for your environment.')}</p>
          </div>

          <div className="relative">
            <div className="absolute inset-8 -z-10 rounded-full bg-brand/10 blur-3xl" aria-hidden="true" />
            <div className="rounded-3xl border border-border bg-slate-950 p-5 shadow-xl sm:p-7">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs font-semibold tracking-[0.14em] text-cyan-300 uppercase">{t('Control layer')}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{t('Access, policy, and visibility')}</h3>
                </div>
                <div className="flex size-12 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 text-xl text-cyan-200" aria-hidden="true">◇</div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {capabilities.map((capability) => (
                  <article key={capability.title} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                    <div className="flex items-center gap-3">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-emerald-400/15 text-xs font-bold text-emerald-300" aria-hidden="true">✓</span>
                      <h4 className="text-sm font-semibold text-white">{capability.title}</h4>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{capability.description}</p>
                  </article>
                ))}
              </div>
              <div className="mt-4 rounded-2xl border border-dashed border-white/15 p-4 text-center text-sm text-slate-400">
                {t('Technical support options can be reviewed for your implementation needs.')}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
