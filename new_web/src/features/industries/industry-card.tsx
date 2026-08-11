import { useTranslation } from 'react-i18next'

import { LinkButton } from '@/components/marketing/link-button'

import type { IndustryContent } from './types'

interface IndustryCardProps {
  industry: IndustryContent
  index: number
}

/** 行业总览卡片，突出业务场景、接入位置和治理能力。 */
export function IndustryCard({ industry, index }: IndustryCardProps) {
  const { t } = useTranslation()

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_18px_55px_-42px_rgba(7,20,38,0.45)] transition hover:-translate-y-1 hover:border-brand/30">
      <div className="border-b border-border bg-muted p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-brand text-sm font-semibold text-white">{String(index + 1).padStart(2, '0')}</span>
          <span className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">{t('Industry')}</span>
        </div>
        <h2 className="mt-7 text-2xl font-semibold tracking-tight text-foreground">{industry.name}</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{industry.overview.summary}</p>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <dl className="space-y-6">
          <div>
            <dt className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">{t('Common scenarios')}</dt>
            <dd className="mt-3 flex flex-wrap gap-2">
              {industry.overview.commonScenarios.map((scenario) => (
                <span key={scenario} className="rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs font-medium text-foreground">{scenario}</span>
              ))}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">{t('Where AI enters the workflow')}</dt>
            <dd className="mt-2 text-sm leading-6 text-foreground">{industry.overview.workflowEntry}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">{t('Access and governance')}</dt>
            <dd className="mt-3 grid gap-2 sm:grid-cols-3">
              {industry.overview.governanceCapabilities.map((capability) => (
                <span key={capability} className="rounded-xl bg-brand-soft px-3 py-2 text-center text-xs font-medium leading-5 text-brand-strong">{capability}</span>
              ))}
            </dd>
          </div>
        </dl>
        <div className="mt-auto pt-8">
          <LinkButton href={`/industries/${industry.slug}`} variant="secondary" className="w-full justify-between group-hover:border-brand/40">
            <span>{t('View industry solution')}</span>
            <span aria-hidden="true">→</span>
          </LinkButton>
        </div>
      </div>
    </article>
  )
}
