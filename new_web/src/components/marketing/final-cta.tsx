import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { LinkButton } from '@/components/marketing/link-button'
import { siteConfig } from '@/config/site'

/** 全站公共底部转化区。 */
export function FinalCTA() {
  const { t } = useTranslation()

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-14 text-white shadow-2xl sm:px-12 lg:px-16">
          <div className="cta-orb absolute -right-24 -top-24 h-72 w-72 rounded-full" aria-hidden="true" />
          <div className="relative max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.16em] text-cyan-300 uppercase">{t('Start building')}</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">{t('Ready to connect AI to your business?')}</h2>
            <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">{t('Start with one unified model API and build a clearer, safer AI delivery workflow for your team.')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href={siteConfig.consoleUrl} size="large">{t(siteConfig.consoleConfigured ? 'Start for free' : 'Book a solution review')}</LinkButton>
              <LinkButton href="/contact" variant="secondary" size="large" className="border-white/20 bg-white/10 text-white hover:bg-white/15">{t('Book a solution review')}</LinkButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
