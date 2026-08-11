import { useParams } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { LinkButton } from '@/components/marketing/link-button'
import { PageHero } from '@/components/marketing/page-hero'
import { IndustryDetail } from '@/features/industries/industry-detail'
import { useIndustriesContent } from '@/features/industries/use-industries-content'

/** 按路由 slug 渲染对应的行业详情。 */
export function IndustryDetailPage() {
  const { t } = useTranslation()
  const params = useParams({ strict: false }) as { industryId?: string }
  const industries = useIndustriesContent()
  const industry = industries.find((item) => item.slug === params.industryId)

  if (!industry) {
    return (
      <PageHero
        eyebrow={t('Industry page not found')}
        title={t('This industry page is not available.')}
        description={t('The requested industry may have moved. Return to the industry catalog to review the currently available workflows.')}
        actions={<LinkButton href="/industries" size="large">{t('View all industries')}</LinkButton>}
        aside={
          <div className="rounded-3xl border border-border bg-surface p-8 text-center shadow-[0_24px_70px_-45px_rgba(7,20,38,0.4)]">
            <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-brand-soft text-xl font-semibold text-brand" aria-hidden="true">?</span>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">{t('Available industry pages cover software and internet, e-commerce and retail, business services, and education and training.')}</p>
          </div>
        }
      />
    )
  }

  return <IndustryDetail industry={industry} />
}
