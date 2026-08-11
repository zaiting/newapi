import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { LinkButton } from '@/components/marketing/link-button'
import { siteConfig } from '@/config/site'

/** 首页首屏，说明平台定位并以架构视图呈现核心产品路径。 */
export function HeroSection() {
  const { t } = useTranslation()
  const trustSignals = [
    t('Compatible with mainstream APIs'),
    t('Unified multi-model access'),
    t('Visible usage and cost'),
    t('Enterprise access control'),
  ]
  const governanceCapabilities = [t('Access'), t('Routing'), t('Rate limits'), t('Logs'), t('Cost')]
  const providers = [t('OpenAI'), t('Claude'), t('Gemini')]

  return (
    <section className="relative isolate overflow-hidden bg-hero pb-20 pt-20 sm:pb-24 sm:pt-28 lg:pb-28 lg:pt-32">
      <div className="hero-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(460px,0.92fr)] lg:gap-12">
          <div>
            <p className="inline-flex rounded-full border border-brand/20 bg-brand-soft px-4 py-2 text-sm font-semibold text-brand">
              {t('AI model access and governance for growing businesses')}
            </p>
            <h1 className="mt-7 max-w-4xl text-balance text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
              {t('Connect AI to your business faster and operate it with confidence')}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
              {t('Use one interface to connect mainstream models and manage routing, access, usage, cost, and operational logs in one place.')}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <LinkButton href={siteConfig.consoleUrl} size="large" className="w-full sm:w-auto">
                {t(siteConfig.consoleConfigured ? 'Start for free' : 'Book a solution review')}
              </LinkButton>
              <LinkButton href="/contact" variant="secondary" size="large" className="w-full sm:w-auto">
                {t('Book a technical review')}
              </LinkButton>
              <LinkButton href={siteConfig.docsUrl} variant="ghost" size="large" className="w-full sm:w-auto">
                {t('View developer docs')} <span aria-hidden="true">→</span>
              </LinkButton>
            </div>
            <ul className="mt-9 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2" aria-label={t('Platform highlights')}>
              {trustSignals.map((signal) => (
                <li key={signal} className="flex items-center gap-3">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700" aria-hidden="true">✓</span>
                  {signal}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-2xl" role="img" aria-label={t('Unified AI access architecture')}>
            <div className="absolute -inset-8 -z-10 rounded-full bg-brand/10 blur-3xl" aria-hidden="true" />
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-3 shadow-2xl shadow-blue-950/20 sm:p-5">
              <div className="flex items-center justify-between border-b border-white/10 px-2 pb-4">
                <div className="flex items-center gap-2" aria-hidden="true">
                  <span className="size-2.5 rounded-full bg-rose-400" />
                  <span className="size-2.5 rounded-full bg-amber-300" />
                  <span className="size-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-300">{t('Architecture preview')}</span>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
                <p className="text-xs font-semibold tracking-[0.14em] text-slate-400 uppercase">{t('Business applications')}</p>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs font-medium text-slate-200 sm:text-sm">
                  <span className="rounded-lg border border-white/10 bg-white/[0.06] px-2 py-3">{t('SaaS product')}</span>
                  <span className="rounded-lg border border-white/10 bg-white/[0.06] px-2 py-3">{t('Customer service')}</span>
                  <span className="rounded-lg border border-white/10 bg-white/[0.06] px-2 py-3">{t('Knowledge assistant')}</span>
                </div>
              </div>

              <div className="flex justify-center py-2 text-cyan-300" aria-hidden="true">↓</div>

              <div className="rounded-2xl border border-cyan-300/30 bg-gradient-to-br from-blue-500/25 to-cyan-400/10 p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.14em] text-cyan-300 uppercase">{t('Unified AI API')}</p>
                    <p className="mt-1 text-sm text-slate-200">{t('One endpoint for application integration')}</p>
                  </div>
                  <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">{t('Policy active')}</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
                  {governanceCapabilities.map((capability) => (
                    <span key={capability} className="rounded-lg border border-white/10 bg-slate-950/40 px-2 py-2 text-center text-xs text-slate-200">
                      {capability}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-center py-2 text-cyan-300" aria-hidden="true">↓</div>

              <div className="grid grid-cols-3 gap-2">
                {providers.map((provider) => (
                  <div key={provider} className="rounded-xl border border-white/10 bg-white/[0.04] px-2 py-3 text-center text-xs font-semibold text-slate-200 sm:text-sm">
                    {provider}
                  </div>
                ))}
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                  <p className="text-xs text-slate-400">{t('Request routing')}</p>
                  <p className="mt-1 text-sm font-semibold text-emerald-300">{t('Strategy managed')}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                  <p className="text-xs text-slate-400">{t('Usage visibility')}</p>
                  <p className="mt-1 text-sm font-semibold text-cyan-300">{t('Logs available')}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                  <p className="text-xs text-slate-400">{t('Access policy')}</p>
                  <p className="mt-1 text-sm font-semibold text-blue-300">{t('Centrally controlled')}</p>
                </div>
              </div>
              <p className="mt-3 text-right text-[11px] text-slate-500">{t('Illustrative product view')}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
