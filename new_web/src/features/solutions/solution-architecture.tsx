import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/cn'

import type { SolutionArchitecture as SolutionArchitectureData } from './types'

interface SolutionArchitectureProps {
  architecture: SolutionArchitectureData
  compact?: boolean
}

/** 用业务可读的流程节点展示解决方案接入架构。 */
export function SolutionArchitecture({ architecture, compact = false }: SolutionArchitectureProps) {
  const { t } = useTranslation()

  return (
    <div
      className={cn(
        'rounded-3xl border border-border bg-ink text-white shadow-[0_24px_80px_-48px_rgba(7,20,38,0.8)]',
        compact ? 'p-5 sm:p-6' : 'p-6 sm:p-8',
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-cyan-300 uppercase">{t('Reference architecture')}</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">{architecture.label}</p>
        </div>
        <span className="shrink-0 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-300">{t('Business controlled')}</span>
      </div>
      <ol className={cn('grid gap-3', compact ? 'mt-5' : 'mt-6')} aria-label={architecture.label}>
        {architecture.nodes.map((node, index) => (
          <li key={node} className="relative flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-cyan-300 text-sm font-semibold text-ink">{index + 1}</span>
            <span className="text-sm font-medium leading-6 text-white sm:text-base">{node}</span>
            {index < architecture.nodes.length - 1 ? (
              <span className="absolute -bottom-3 left-7 z-10 flex size-5 items-center justify-center rounded-full border border-white/10 bg-ink text-xs text-cyan-300" aria-hidden="true">↓</span>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  )
}
