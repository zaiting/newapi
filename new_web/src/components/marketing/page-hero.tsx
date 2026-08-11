import type { ReactNode } from 'react'

import { Container } from '@/components/marketing/container'

interface PageHeroProps {
  eyebrow?: string
  title: string
  description: string
  actions?: ReactNode
  aside?: ReactNode
}

/** 公共内页首屏结构。 */
export function PageHero({ eyebrow, title, description, actions, aside }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-hero py-20 sm:py-24 lg:py-28">
      <div className="hero-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-3xl">
          {eyebrow ? <p className="mb-4 text-sm font-semibold tracking-[0.16em] text-brand uppercase">{eyebrow}</p> : null}
          <h1 className="text-balance text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">{description}</p>
          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
        {aside ? <div>{aside}</div> : null}
      </Container>
    </section>
  )
}
