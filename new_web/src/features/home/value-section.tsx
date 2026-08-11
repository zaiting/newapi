import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { SectionHeading } from '@/components/marketing/section-heading'

/** 首页四项核心价值，以业务能力和产品化界面同时说明。 */
export function ValueSection() {
  const { t } = useTranslation()

  return (
    <section className="bg-muted/60 py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={t('Built for practical AI delivery')}
          title={t('Move from model access to dependable business operations')}
          description={t('Give product, engineering, and operations teams one shared foundation for integrating and managing AI.')}
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <article className="overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-sm font-semibold text-brand">{t('Connect faster')}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{t('One interface, less repeated integration work')}</h3>
                <p className="mt-4 leading-7 text-muted-foreground">{t('Use a unified API pattern across model providers to reduce the work involved in model changes and application migration.')}</p>
              </div>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-soft font-mono text-lg font-bold text-brand" aria-hidden="true">{'</>'}</span>
            </div>
            <div className="mt-8 overflow-hidden rounded-2xl bg-slate-950 p-4 font-mono text-xs leading-6 text-slate-300 sm:p-5 sm:text-sm">
              <div><span className="text-violet-300">const</span> client = <span className="text-cyan-300">new</span> AIClient({'{'}</div>
              <div className="pl-4">baseURL: <span className="text-emerald-300">&quot;/v1&quot;</span>,</div>
              <div className="pl-4">apiKey: process.env.AI_API_KEY</div>
              <div>{'}'})</div>
              <div className="mt-2 text-slate-500">// {t('Switch models through configuration')}</div>
              <div><span className="text-violet-300">await</span> client.chat.completions.create({'({'}</div>
              <div className="pl-4">model: <span className="text-emerald-300">&quot;configured-model&quot;</span></div>
              <div>{'})'})</div>
            </div>
          </article>

          <article className="overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-sm font-semibold text-brand">{t('Operate reliably')}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{t('Keep one channel issue from defining the whole experience')}</h3>
                <p className="mt-4 leading-7 text-muted-foreground">{t('Distribute requests according to channel status and operating strategy, with alternative channels available when configured.')}</p>
              </div>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-lg font-bold text-cyan-700" aria-hidden="true">↗</span>
            </div>
            <div className="mt-8 rounded-2xl border border-border bg-slate-50 p-5">
              <div className="flex items-center gap-3 rounded-xl border border-brand/20 bg-white p-4 shadow-sm">
                <span className="size-2.5 rounded-full bg-emerald-500" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">{t('Primary channel')}</p>
                  <p className="text-xs text-muted-foreground">{t('Available for routing')}</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">{t('Healthy')}</span>
              </div>
              <div className="ml-8 h-5 border-l-2 border-dashed border-brand/30" aria-hidden="true" />
              <div className="flex items-center gap-3 rounded-xl border border-border bg-white p-4">
                <span className="size-2.5 rounded-full bg-blue-500" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">{t('Alternative channel')}</p>
                  <p className="text-xs text-muted-foreground">{t('Ready when strategy requires it')}</p>
                </div>
                <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">{t('Standby')}</span>
              </div>
            </div>
          </article>

          <article className="overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-sm font-semibold text-brand">{t('Stay in control')}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{t('Manage enterprise AI access from one place')}</h3>
                <p className="mt-4 leading-7 text-muted-foreground">{t('Bring users, API keys, model permissions, quotas, and usage boundaries into a consistent management workflow.')}</p>
              </div>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-lg font-bold text-violet-700" aria-hidden="true">◎</span>
            </div>
            <div className="mt-8 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 rounded-2xl border border-border bg-slate-50 p-5 text-center">
              <div className="space-y-2">
                <div className="rounded-xl border border-border bg-white px-3 py-3 text-sm font-medium">{t('Team member')}</div>
                <div className="rounded-xl border border-border bg-white px-3 py-3 text-sm font-medium">{t('Business service')}</div>
              </div>
              <div className="text-brand" aria-hidden="true">→</div>
              <div className="rounded-xl border border-brand/20 bg-brand-soft p-4">
                <p className="text-sm font-semibold text-brand">{t('Access policy')}</p>
                <div className="mt-3 space-y-2 text-xs text-muted-foreground">
                  <p>{t('Allowed models')}</p>
                  <p>{t('Usage quota')}</p>
                  <p>{t('API key scope')}</p>
                </div>
              </div>
            </div>
          </article>

          <article className="overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-sm font-semibold text-brand">{t('See what matters')}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{t('Keep a clear record of every model call')}</h3>
                <p className="mt-4 leading-7 text-muted-foreground">{t('Review usage, cost, errors, and model activity by user and time range from a unified operating view.')}</p>
              </div>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-lg font-bold text-amber-700" aria-hidden="true">▥</span>
            </div>
            <div className="mt-8 rounded-2xl border border-border bg-slate-50 p-5">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-foreground">{t('Usage trend')}</p>
                <span className="rounded-full border border-border bg-white px-2.5 py-1 text-xs text-muted-foreground">{t('Sample data')}</span>
              </div>
              <div className="mt-5 flex h-28 items-end gap-2" role="img" aria-label={t('Illustrative usage chart')}>
                {[38, 54, 46, 72, 61, 82, 68, 88].map((height, index) => (
                  <span key={height + index} className="flex-1 rounded-t-md bg-gradient-to-t from-brand to-cyan-400" style={{ height: height + '%' }} />
                ))}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                <span>{t('Requests')}</span>
                <span>{t('Cost')}</span>
                <span>{t('Errors')}</span>
              </div>
            </div>
          </article>
        </div>
      </Container>
    </section>
  )
}
