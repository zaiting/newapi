import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { LinkButton } from '@/components/marketing/link-button'
import { PageMeta } from '@/components/marketing/page-meta'
import { siteConfig } from '@/config/site'

/** 企业官网 404 页面，为失效地址提供清晰且可执行的返回路径。 */
export function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <div className="relative isolate overflow-hidden bg-hero py-20 sm:py-24 lg:py-32">
      <PageMeta
        title={t('Page not found | {{name}}', { name: siteConfig.name })}
        description={t('The requested page could not be found. Return to the website or continue to the enterprise console.')}
        robots="noindex, nofollow"
      />
      <div className="hero-grid absolute inset-0 opacity-45" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/2 -z-10 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-3xl" aria-hidden="true" />

      <Container className="relative">
        <section className="mx-auto max-w-3xl text-center" aria-labelledby="not-found-title">
          <p className="text-sm font-semibold tracking-[0.2em] text-brand uppercase">404</p>
          <h1 id="not-found-title" className="mt-5 text-balance text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
            {t('We could not find this page')}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
            {t('The page may have moved, or the address may be incorrect. Use one of the paths below to continue.')}
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <LinkButton href="/" size="large">
              {t('Return to homepage')}
            </LinkButton>
            <LinkButton href={siteConfig.consoleUrl} variant="secondary" size="large">
              {t(siteConfig.consoleConfigured ? 'Open enterprise console' : 'Contact us')}
            </LinkButton>
          </div>

          <nav className="mt-12 border-t border-border pt-8" aria-label={t('Helpful links')}>
            <p className="text-sm font-medium text-foreground">{t('Looking for something specific?')}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-medium text-brand">
              <a className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4" href="/product">
                {t('Explore the product')}
              </a>
              <a className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4" href="/solutions">
                {t('Browse solutions')}
              </a>
              <a className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4" href={siteConfig.docsUrl}>
                {t('Read developer resources')}
              </a>
            </div>
          </nav>
        </section>
      </Container>
    </div>
  )
}
