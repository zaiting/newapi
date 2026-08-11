import { useParams } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { LinkButton } from '@/components/marketing/link-button'
import { PageHero } from '@/components/marketing/page-hero'
import { SolutionDetail } from '@/features/solutions/solution-detail'
import { useSolutionsContent } from '@/features/solutions/use-solutions-content'

/** 按路由 slug 渲染对应的解决方案详情。 */
export function SolutionDetailPage() {
  const { t } = useTranslation()
  const params = useParams({ strict: false }) as { solutionId?: string }
  const solutions = useSolutionsContent()
  const solution = solutions.find((item) => item.slug === params.solutionId)

  if (!solution) {
    return (
      <PageHero
        eyebrow={t('Solution not found')}
        title={t('This solution page is not available.')}
        description={t('The requested solution may have moved. Return to the solution catalog to choose an available business workflow.')}
        actions={<LinkButton href="/solutions" size="large">{t('View all solutions')}</LinkButton>}
        aside={
          <div className="rounded-3xl border border-border bg-surface p-8 text-center shadow-[0_24px_70px_-45px_rgba(7,20,38,0.4)]">
            <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-brand-soft text-xl font-semibold text-brand" aria-hidden="true">?</span>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">{t('Available solution pages cover SaaS AI integration, customer service, knowledge assistants, content generation, and AI development workflows.')}</p>
          </div>
        }
      />
    )
  }

  return <SolutionDetail solution={solution} />
}
