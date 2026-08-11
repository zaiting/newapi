import { cn } from '@/lib/cn'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

/** 营销页面通用区块标题。 */
export function SectionHeading({ eyebrow, title, description, align = 'left', className }: SectionHeadingProps) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? <p className="mb-3 text-sm font-semibold tracking-[0.16em] text-brand uppercase">{eyebrow}</p> : null}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">{title}</h2>
      {description ? <p className="mt-5 text-pretty text-base leading-8 text-muted-foreground sm:text-lg">{description}</p> : null}
    </div>
  )
}
