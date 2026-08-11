import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { LinkButton } from '@/components/marketing/link-button'
import { PageMeta } from '@/components/marketing/page-meta'
import { siteConfig } from '@/config/site'

const consoleBenefits = [
  'Connect supported AI models through one consistent API.',
  'Keep model access, keys, usage, and costs visible in one place.',
  'Give teams a clearer path from evaluation to production integration.',
] as const

/** 企业认证展示页，仅引导用户进入已配置的控制台，不在官网模拟登录流程。 */
export function AuthPortalPage() {
  const { t } = useTranslation()

  return (
    <div className="relative isolate overflow-hidden bg-hero py-16 sm:py-20 lg:py-28">
      <PageMeta
        title={t('Enterprise console access | {{name}}', { name: siteConfig.name })}
        description={t('Continue to the configured enterprise console to manage AI model access, usage, and team permissions.')}
        robots="noindex, nofollow"
      />
      <div className="hero-grid absolute inset-0 opacity-45" aria-hidden="true" />
      <div className="absolute left-1/2 top-10 -z-10 size-80 -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" aria-hidden="true" />

      <Container className="relative">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl shadow-slate-950/10 lg:grid-cols-[1.08fr_0.92fr]">
          <section className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14 lg:py-16" aria-labelledby="console-access-title">
            <p className="text-sm font-semibold tracking-[0.16em] text-brand uppercase">{t('Enterprise console')}</p>
            <h1 id="console-access-title" className="mt-4 text-balance text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
              {t('Continue to your AI operations workspace')}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
              {t('Authentication continues in the configured console. This public website does not collect or submit your sign-in credentials.')}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href={siteConfig.consoleUrl} size="large">
                {t(siteConfig.consoleConfigured ? 'Open enterprise console' : 'Book a solution review')}
                <span aria-hidden="true">→</span>
              </LinkButton>
              <LinkButton href="/" variant="secondary" size="large">
                {t('Return to website')}
              </LinkButton>
            </div>

            <p className="mt-6 text-sm leading-6 text-muted-foreground">
              {t('If your organization uses a dedicated console address, use the access link provided by your administrator.')}
            </p>
          </section>

          <aside className="relative overflow-hidden bg-ink px-6 py-12 text-white sm:px-10 lg:px-12 lg:py-16" aria-label={t('Platform capabilities')}>
            <div className="cta-orb absolute -right-24 -top-20 size-72 rounded-full" aria-hidden="true" />
            <div className="relative">
              <p className="text-sm font-semibold tracking-[0.16em] text-cyan-300 uppercase">{t('Built for growing teams')}</p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight">{t('A clearer way to operate enterprise AI access')}</h2>
              <p className="mt-5 text-base leading-7 text-slate-300">
                {t('Move model integration and day-to-day governance into one shared workspace for product and engineering teams.')}
              </p>

              <ul className="mt-9 space-y-5">
                {consoleBenefits.map((benefit, index) => (
                  <li key={benefit} className="flex gap-4">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-sm font-semibold text-cyan-200" aria-hidden="true">
                      {index + 1}
                    </span>
                    <span className="pt-1 text-sm leading-6 text-slate-200">{t(benefit)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  )
}
