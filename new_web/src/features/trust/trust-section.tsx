import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { SectionHeading } from '@/components/marketing/section-heading'
import { cn } from '@/lib/cn'

export interface TrustContentItem {
  eyebrow?: string
  title: string
  description: string
  points?: string[]
  footer?: ReactNode
}

interface TrustSectionProps {
  eyebrow?: string
  title: string
  description?: string
  items: TrustContentItem[]
  columns?: 2 | 3
  muted?: boolean
  children?: ReactNode
}

/** 用于安全、公司与资源页面的统一信息卡片区块。 */
export function TrustSection({
  eyebrow,
  title,
  description,
  items,
  columns = 3,
  muted = false,
  children,
}: TrustSectionProps) {
  const { t } = useTranslation()

  return (
    <section className={cn('py-20 sm:py-24', muted && 'border-y border-border bg-muted/60')}>
      <Container>
        <SectionHeading
          eyebrow={eyebrow ? t(eyebrow) : undefined}
          title={t(title)}
          description={description ? t(description) : undefined}
        />
        <div
          className={cn(
            'mt-10 grid gap-5',
            columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3',
          )}
        >
          {items.map((item, index) => (
            <article
              key={item.title}
              className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none sm:p-7"
            >
              <div className="mb-6 flex items-center justify-between gap-4">
                <span className="inline-flex min-h-8 items-center rounded-full bg-brand-soft px-3 text-xs font-semibold tracking-[0.12em] text-brand uppercase">
                  {item.eyebrow ? t(item.eyebrow) : String(index + 1).padStart(2, '0')}
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-foreground">{t(item.title)}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">{t(item.description)}</p>
              {item.points?.length ? (
                <ul className="mt-5 space-y-3 border-t border-border pt-5">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-6 text-foreground/85">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                      <span>{t(point)}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              {item.footer ? <div className="mt-auto pt-6">{item.footer}</div> : null}
            </article>
          ))}
        </div>
        {children ? <div className="mt-10">{children}</div> : null}
      </Container>
    </section>
  )
}

interface EvidenceNoticeProps {
  eyebrow?: string
  title: string
  description: string
  points?: string[]
  actions?: ReactNode
  className?: string
}

/** 展示需要事实边界或人工确认的重要说明。 */
export function EvidenceNotice({ eyebrow, title, description, points, actions, className }: EvidenceNoticeProps) {
  const { t } = useTranslation()

  return (
    <div className={cn('rounded-3xl border border-brand/20 bg-brand-soft/70 p-6 sm:p-8 lg:p-10', className)}>
      {eyebrow ? <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">{t(eyebrow)}</p> : null}
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{t(title)}</h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">{t(description)}</p>
      {points?.length ? (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {points.map((point) => (
            <li key={point} className="flex gap-3 rounded-xl border border-white/80 bg-white/70 px-4 py-3 text-sm leading-6 text-foreground">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
              <span>{t(point)}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {actions ? <div className="mt-7 flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  )
}
