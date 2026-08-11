import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { LinkButton } from '@/components/marketing/link-button'
import { PageMeta } from '@/components/marketing/page-meta'
import { siteConfig } from '@/config/site'

interface ServiceErrorPageProps {
  statusCode: 500 | 503
}

/** 500 与 503 服务错误页，不暴露内部异常信息，并提供重试和返回入口。 */
export function ServiceErrorPage({ statusCode }: ServiceErrorPageProps) {
  const { t } = useTranslation()
  const isUnavailable = statusCode === 503
  const headingId = 'service-error-' + statusCode
  const title = isUnavailable ? t('The service is temporarily unavailable') : t('Something interrupted this request')
  const description = isUnavailable
    ? t('The service cannot complete your request right now. Please wait a moment and try again.')
    : t('An unexpected service error prevented this page from loading. You can retry without changing your account or settings.')

  return (
    <div className="relative isolate overflow-hidden bg-hero py-20 sm:py-24 lg:py-32">
      <PageMeta
        title={isUnavailable ? t('Service unavailable | {{name}}', { name: siteConfig.name }) : t('Service error | {{name}}', { name: siteConfig.name })}
        description={description}
        robots="noindex, nofollow"
      />
      <div className="hero-grid absolute inset-0 opacity-45" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/2 -z-10 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-3xl" aria-hidden="true" />

      <Container className="relative">
        <section className="mx-auto max-w-3xl text-center" aria-labelledby={headingId}>
          <p className="text-sm font-semibold tracking-[0.2em] text-brand uppercase">{statusCode}</p>
          <h1 id={headingId} className="mt-5 text-balance text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">{description}</p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-6 text-base font-medium text-white shadow-sm transition hover:bg-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              onClick={() => window.location.reload()}
            >
              {t('Try again')}
            </button>
            <LinkButton href="/" variant="secondary" size="large">
              {t('Return to homepage')}
            </LinkButton>
          </div>

          <p className="mt-8 text-sm leading-6 text-muted-foreground">
            {t('If the issue continues, contact your service administrator and include the time when the problem occurred.')}
          </p>
        </section>
      </Container>
    </div>
  )
}
