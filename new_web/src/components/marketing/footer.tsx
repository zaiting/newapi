import { ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { LanguageSwitcher } from '@/components/marketing/language-switcher'
import { isExternalNavigationHref, marketingFooterNavigation } from '@/config/navigation'
import { siteConfig } from '@/config/site'

/** 企业官网全局 Footer，集中提供产品、方案、公司与法律入口。 */
export function MarketingFooter() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()
  const hasConfiguredContactEmail = !siteConfig.contactEmail.toLowerCase().endsWith('@example.com')

  return (
    <footer className="bg-ink text-white">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.2fr_2fr] lg:gap-16">
          <div className="max-w-md">
            <a
              href="/"
              className="inline-flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              aria-label={t('{{name}} home', { name: siteConfig.name })}
            >
              <span className="relative grid size-11 place-items-center overflow-hidden rounded-xl bg-brand text-base font-bold tracking-tight text-white" aria-hidden="true">
                <span className="absolute -right-3 -top-3 size-8 rounded-full bg-cyan-300/40" />
                <span className="relative">壹</span>
              </span>
              <span className="text-lg font-semibold tracking-tight">{siteConfig.name}</span>
            </a>
            <p className="mt-6 text-pretty text-base leading-7 text-slate-300">
              {t('A unified AI model access and governance platform for growing teams, helping businesses connect models, manage access, and understand usage in one place.')}
            </p>
            <a
              href="/contact"
              className="group mt-7 inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-4 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              {t('Discuss your AI integration plan')}
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                className="size-4 transition-transform group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden="true"
              />
            </a>
            {hasConfiguredContactEmail ? (
              <p className="mt-5 text-sm text-slate-400">
                <span>{t('Business contact')}: </span>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="rounded text-slate-200 underline decoration-white/20 underline-offset-4 transition hover:decoration-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  {siteConfig.contactEmail}
                </a>
              </p>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {marketingFooterNavigation.map((section) => (
              <nav key={section.label} aria-label={t(section.label)}>
                <h2 className="text-sm font-semibold text-white">{t(section.label)}</h2>
                <ul className="mt-5 space-y-3.5">
                  {section.items.map((item) => {
                    const external = isExternalNavigationHref(item.href)

                    return (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          target={external ? '_blank' : undefined}
                          rel={external ? 'noreferrer' : undefined}
                          className="rounded text-sm leading-6 text-slate-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                        >
                          {t(item.label)}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2 text-sm text-slate-400">
            <p>{t('© {{year}} {{name}}. All rights reserved.', { year: currentYear, name: siteConfig.name })}</p>
            <p>{t('Product capabilities and availability are subject to the current platform configuration.')}</p>
          </div>
          <LanguageSwitcher className="sm:w-44" inverted />
        </div>
      </Container>
    </footer>
  )
}
