import { useTranslation } from 'react-i18next'

import { LinkButton } from '@/components/marketing/link-button'

import type { SolutionContent } from './types'

interface SolutionCardProps {
  solution: SolutionContent
  index: number
}

/** 解决方案总览卡片，统一呈现场景问题、平台能力和适用对象。 */
export function SolutionCard({ solution, index }: SolutionCardProps) {
  const { t } = useTranslation()

  return (
    <article className="group flex h-full flex-col rounded-3xl border border-border bg-surface p-6 shadow-[0_18px_55px_-42px_rgba(7,20,38,0.45)] transition hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_24px_70px_-42px_rgba(37,99,235,0.38)] sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-soft text-sm font-semibold text-brand">{String(index + 1).padStart(2, '0')}</span>
        <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">{t('Business solution')}</span>
      </div>
      <h2 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">{solution.name}</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">{solution.overview.businessGoal}</p>

      <dl className="mt-6 space-y-5 border-t border-border pt-6">
        <div>
          <dt className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">{t('Customer challenge')}</dt>
          <dd className="mt-2 text-sm leading-6 text-foreground">{solution.overview.customerProblem}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">{t('Recommended capabilities')}</dt>
          <dd className="mt-3 flex flex-wrap gap-2">
            {solution.overview.recommendedCapabilities.map((capability) => (
              <span key={capability} className="rounded-lg bg-brand-soft px-2.5 py-1.5 text-xs font-medium text-brand-strong">{capability}</span>
            ))}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">{t('Implementation approach')}</dt>
          <dd className="mt-2 text-sm leading-6 text-foreground">{solution.overview.implementationSummary}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">{t('Suitable for')}</dt>
          <dd className="mt-2 text-sm leading-6 text-foreground">{solution.overview.suitableFor}</dd>
        </div>
      </dl>

      <div className="mt-auto pt-7">
        <LinkButton href={`/solutions/${solution.slug}`} variant="secondary" className="w-full justify-between group-hover:border-brand/40">
          <span>{t('View solution')}</span>
          <span aria-hidden="true">→</span>
        </LinkButton>
      </div>
    </article>
  )
}
