import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { LinkButton } from '@/components/marketing/link-button'
import { PageHero } from '@/components/marketing/page-hero'
import { SectionHeading } from '@/components/marketing/section-heading'

import { SolutionArchitecture } from './solution-architecture'
import type { SolutionContent } from './types'

interface SolutionDetailProps {
  solution: SolutionContent
}

/** 解决方案详情模板，通过完整场景数据呈现差异化业务内容。 */
export function SolutionDetail({ solution }: SolutionDetailProps) {
  const { t } = useTranslation()

  return (
    <>
      <div className="border-b border-border bg-surface">
        <Container className="flex min-h-12 items-center gap-2 text-sm text-muted-foreground">
          <a href="/solutions" className="rounded-md transition hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">{t('Solutions')}</a>
          <span aria-hidden="true">/</span>
          <span className="truncate text-foreground" aria-current="page">{solution.name}</span>
        </Container>
      </div>

      <PageHero
        eyebrow={solution.name}
        title={solution.heroTitle}
        description={solution.heroDescription}
        actions={
          <>
            <LinkButton href={solution.cta.primary.href} size="large">{solution.cta.primary.label}</LinkButton>
            <LinkButton href="/solutions" variant="secondary" size="large">{t('Compare solutions')}</LinkButton>
          </>
        }
        aside={<SolutionArchitecture architecture={solution.architecture} compact />}
      />

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t('Business challenges')}
            title={t('What the solution must address before model selection')}
            description={t('A production workflow needs clear ownership, controls, and failure handling in addition to model quality.')}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {solution.challenges.map((challenge, index) => (
              <article key={challenge.title} className="rounded-3xl border border-border bg-surface p-6 sm:p-7">
                <div className="flex items-start gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted text-sm font-semibold text-brand">{index + 1}</span>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">{challenge.title}</h2>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{challenge.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-muted py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t('Capability mapping')}
            title={t('Keep business responsibilities and platform responsibilities explicit')}
            description={t('The platform governs access to configured models. Business context, permissions, workflows, and final decisions stay with enterprise systems.')}
          />
          <dl className="mt-10 overflow-hidden rounded-3xl border border-border bg-surface">
            {solution.capabilityMappings.map((mapping, index) => (
              <div key={mapping.businessNeed} className="grid gap-3 border-b border-border p-6 last:border-b-0 md:grid-cols-[0.8fr_1.2fr] md:gap-8 md:p-8">
                <div>
                  <dt className="text-xs font-semibold tracking-[0.12em] text-brand uppercase">{t('Business need')} {String(index + 1).padStart(2, '0')}</dt>
                  <dd className="mt-2 text-base font-semibold leading-7 text-foreground">{mapping.businessNeed}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">{t('Platform role')}</dt>
                  <dd className="mt-2 text-sm leading-7 text-muted-foreground">{mapping.platformRole}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t('Workflow opportunities')}
            title={t('Apply AI where the task and review path are clear')}
            description={t('Use bounded scenarios to evaluate whether model quality, latency, cost, and risk fit the business process.')}
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {solution.scenarios.map((scenario) => (
              <article key={scenario.title} className="rounded-3xl border border-border bg-surface p-6">
                <div className="mb-5 h-1 w-12 rounded-full bg-brand" aria-hidden="true" />
                <h2 className="text-lg font-semibold text-foreground">{scenario.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{scenario.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-ink py-20 text-white sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t('Implementation path')}
            title={t('Move from a bounded workflow to controlled production use')}
            description={t('The sequence is repeatable, but scope and timing depend on existing systems, data readiness, and review requirements.')}
            className="[&_h2]:text-white [&_p:last-child]:text-slate-300"
          />
          <ol className="mt-12 grid gap-5 lg:grid-cols-5">
            {solution.implementation.map((step, index) => (
              <li key={step.title} className="relative rounded-3xl border border-white/10 bg-white/[0.06] p-6">
                <span className="text-sm font-semibold text-cyan-300">{t('Step')} {String(index + 1).padStart(2, '0')}</span>
                <h2 className="mt-4 text-lg font-semibold leading-7 text-white">{step.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <SectionHeading
            eyebrow={t('Operating boundaries')}
            title={t('Design for responsible use, not unattended automation')}
            description={t('These boundaries should be translated into application rules, access policies, review steps, and incident procedures.')}
          />
          <ul className="space-y-4">
            {solution.boundaries.map((boundary, index) => (
              <li key={boundary} className="flex gap-4 rounded-2xl border border-border bg-muted p-5">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white">{index + 1}</span>
                <span className="text-sm leading-7 text-foreground">{boundary}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-14 text-white shadow-2xl sm:px-12 lg:px-16">
            <div className="cta-orb absolute -right-24 -top-24 h-72 w-72 rounded-full" aria-hidden="true" />
            <div className="relative max-w-3xl">
              <p className="text-sm font-semibold tracking-[0.16em] text-cyan-300 uppercase">{solution.cta.eyebrow}</p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">{solution.cta.title}</h2>
              <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">{solution.cta.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href={solution.cta.primary.href} size="large">{solution.cta.primary.label}</LinkButton>
                <LinkButton href={solution.cta.secondary.href} variant="secondary" size="large" className="border-white/20 bg-white/10 text-white hover:bg-white/15">{solution.cta.secondary.label}</LinkButton>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
