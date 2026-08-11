import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { LinkButton } from '@/components/marketing/link-button'
import { SectionHeading } from '@/components/marketing/section-heading'
import { siteConfig } from '@/config/site'

/** 以中性的请求示例说明统一 API 的接入边界和治理流程。 */
export function IntegrationWorkflow() {
  const { t } = useTranslation()
  const requestExample = JSON.stringify(
    {
      model: 'selected-model',
      messages: [{ role: 'user', content: t('Your business prompt') }],
    },
    null,
    2,
  )

  return (
    <section className="border-y border-border bg-ink py-20 text-white sm:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <SectionHeading
            eyebrow={t('Unified API workflow')}
            title={t('Keep application code focused on the business experience')}
            description={t('Applications call one gateway pattern while routing, credentials, usage records, and provider connections remain managed as separate concerns.')}
            className="[&_h2]:text-white [&_p:last-child]:text-slate-300"
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            <li className="rounded-xl border border-white/10 bg-white/5 p-4">
              <strong className="block text-sm font-semibold">{t('For developers')}</strong>
              <span className="mt-2 block text-sm leading-6 text-slate-300">{t('Use a stable endpoint pattern and change models through configuration where supported.')}</span>
            </li>
            <li className="rounded-xl border border-white/10 bg-white/5 p-4">
              <strong className="block text-sm font-semibold">{t('For operations')}</strong>
              <span className="mt-2 block text-sm leading-6 text-slate-300">{t('Review routing, access boundaries, request outcomes, and usage from one operating view.')}</span>
            </li>
          </ul>
          <LinkButton href={siteConfig.docsUrl} variant="secondary" size="large" className="mt-8 border-white/20 bg-white/10 text-white hover:bg-white/15">
            {t('View API documentation')}
          </LinkButton>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-2xl" aria-label={t('Illustrative unified API request')}>
          <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="ml-3 text-xs tracking-wide text-slate-500">POST /v1/chat/completions</span>
          </div>
          <pre className="overflow-x-auto p-5 text-sm leading-7 text-slate-300 sm:p-7"><code>{requestExample}</code></pre>
          <div className="grid border-t border-white/10 sm:grid-cols-3">
            <div className="border-b border-white/10 p-4 sm:border-r sm:border-b-0">
              <span className="text-xs text-slate-500">{t('Route')}</span>
              <strong className="mt-1 block text-sm">{t('Policy matched')}</strong>
            </div>
            <div className="border-b border-white/10 p-4 sm:border-r sm:border-b-0">
              <span className="text-xs text-slate-500">{t('Access')}</span>
              <strong className="mt-1 block text-sm">{t('Key scope checked')}</strong>
            </div>
            <div className="p-4">
              <span className="text-xs text-slate-500">{t('Record')}</span>
              <strong className="mt-1 block text-sm">{t('Usage trace created')}</strong>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
