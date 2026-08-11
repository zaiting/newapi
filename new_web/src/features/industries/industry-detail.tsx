import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { LinkButton } from '@/components/marketing/link-button'
import { PageHero } from '@/components/marketing/page-hero'
import { SectionHeading } from '@/components/marketing/section-heading'

import type { IndustryContent } from './types'

interface IndustryDetailProps {
  industry: IndustryContent
}

/** 行业详情模板，以行业特有问题、工作流和边界呈现落地方式。 */
export function IndustryDetail({ industry }: IndustryDetailProps) {
  const { t } = useTranslation()

  return (
    <>
      <div className="border-b border-border bg-surface">
        <Container className="flex min-h-12 items-center gap-2 text-sm text-muted-foreground">
          <a href="/industries" className="rounded-md transition hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">{t('Industries')}</a>
          <span aria-hidden="true">/</span>
          <span className="truncate text-foreground" aria-current="page">{industry.name}</span>
        </Container>
      </div>

      <PageHero
        eyebrow={industry.name}
        title={industry.heroTitle}
        description={industry.heroDescription}
        actions={
          <>
            <LinkButton href={industry.cta.primary.href} size="large">{industry.cta.primary.label}</LinkButton>
            <LinkButton href="/contact" variant="secondary" size="large">{t('Discuss your workflow')}</LinkButton>
          </>
        }
        aside={
          <div className="rounded-3xl border border-border bg-ink p-6 text-white shadow-[0_28px_90px_-50px_rgba(7,20,38,0.75)] sm:p-8">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="text-xs font-semibold tracking-[0.16em] text-cyan-300 uppercase">{t('Industry architecture')}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{industry.architecture.label}</p>
              </div>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-300">{t('Reference')}</span>
            </div>
            <ol className="mt-5 space-y-3" aria-label={industry.architecture.label}>
              {industry.architecture.nodes.map((node, index) => (
                <li key={node} className="relative flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-cyan-300 text-sm font-semibold text-ink">{index + 1}</span>
                  <span className="text-sm font-medium leading-6 text-white">{node}</span>
                  {index < industry.architecture.nodes.length - 1 ? <span className="absolute -bottom-3 left-7 z-10 text-xs text-cyan-300" aria-hidden="true">↓</span> : null}
                </li>
              ))}
            </ol>
          </div>
        }
      />

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t('Industry challenges')}
            title={t('Start with the constraints already present in the business')}
            description={t('Industry value comes from fitting AI into authoritative systems, operating rules, and accountable human decisions.')}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {industry.challenges.map((challenge, index) => (
              <article key={challenge.title} className="rounded-3xl border border-border bg-surface p-6 sm:p-7">
                <span className="text-sm font-semibold text-brand">{t('Challenge')} {String(index + 1).padStart(2, '0')}</span>
                <h2 className="mt-4 text-xl font-semibold tracking-tight text-foreground">{challenge.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{challenge.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-muted py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t('Recommended AI scenarios')}
            title={t('Choose workflows with clear source data, review, and escalation')}
            description={t('These scenarios describe where AI may assist. Existing systems remain responsible for authoritative data and final business actions.')}
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            {industry.scenarios.map((scenario, index) => (
              <article key={scenario.title} className="rounded-3xl border border-border bg-surface p-6">
                <span className="flex size-10 items-center justify-center rounded-2xl bg-brand-soft text-sm font-semibold text-brand">{index + 1}</span>
                <h2 className="mt-5 text-lg font-semibold leading-7 text-foreground">{scenario.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{scenario.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t('Platform capability mapping')}
            title={t('Map each workflow requirement to a controlled platform role')}
            description={t('The mapping keeps the platform promise specific and avoids presenting application, data, or industry responsibilities as built-in model gateway features.')}
          />
          <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-surface">
            <div className="hidden grid-cols-2 border-b border-border bg-muted px-8 py-4 text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase md:grid">
              <span>{t('Workflow requirement')}</span>
              <span>{t('Platform contribution')}</span>
            </div>
            <dl>
              {industry.capabilityMappings.map((mapping) => (
                <div key={mapping.workflowNeed} className="grid gap-3 border-b border-border p-6 last:border-b-0 md:grid-cols-2 md:gap-10 md:p-8">
                  <div>
                    <dt className="text-xs font-semibold tracking-[0.12em] text-brand uppercase md:hidden">{t('Workflow requirement')}</dt>
                    <dd className="mt-2 font-semibold leading-7 text-foreground md:mt-0">{mapping.workflowNeed}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase md:hidden">{t('Platform contribution')}</dt>
                    <dd className="mt-2 text-sm leading-7 text-muted-foreground md:mt-0">{mapping.platformCapability}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-ink py-20 text-white sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold tracking-[0.16em] text-cyan-300 uppercase">{t('Representative workflow')}</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{industry.example.title}</h2>
            <p className="mt-5 text-base leading-8 text-slate-300">{industry.example.context}</p>
            <div className="mt-7 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-5">
              <p className="text-xs font-semibold tracking-[0.12em] text-cyan-300 uppercase">{t('Expected operating outcome')}</p>
              <p className="mt-2 text-sm leading-7 text-slate-200">{industry.example.outcome}</p>
            </div>
          </div>
          <ol className="space-y-4">
            {industry.example.steps.map((step, index) => (
              <li key={step} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-cyan-300 text-sm font-semibold text-ink">{index + 1}</span>
                <p className="text-sm leading-7 text-slate-200">{step}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t('Implementation steps')}
            title={t('Move from an industry workflow to a controlled production process')}
            description={t('Implementation depth depends on source systems, permissions, data quality, review policy, and operational ownership.')}
          />
          <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {industry.implementation.map((step, index) => (
              <li key={step.title} className="rounded-3xl border border-border bg-surface p-6">
                <span className="text-sm font-semibold text-brand">{t('Step')} {String(index + 1).padStart(2, '0')}</span>
                <h2 className="mt-4 text-lg font-semibold leading-7 text-foreground">{step.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-y border-border bg-muted py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <SectionHeading
            eyebrow={t('Data and use boundaries')}
            title={t('Keep authority, privacy, and review outside the model output')}
            description={t('Turn each boundary into a concrete application control, operating procedure, and named owner before production use.')}
          />
          <ul className="space-y-4">
            {industry.boundaries.map((boundary, index) => (
              <li key={boundary} className="flex gap-4 rounded-2xl border border-border bg-surface p-5">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white">{index + 1}</span>
                <span className="text-sm leading-7 text-foreground">{boundary}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-14 text-white shadow-2xl sm:px-12 lg:px-16">
            <div className="cta-orb absolute -right-24 -top-24 h-72 w-72 rounded-full" aria-hidden="true" />
            <div className="relative max-w-3xl">
              <p className="text-sm font-semibold tracking-[0.16em] text-cyan-300 uppercase">{industry.cta.eyebrow}</p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">{industry.cta.title}</h2>
              <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">{industry.cta.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href={industry.cta.primary.href} size="large">{industry.cta.primary.label}</LinkButton>
                <LinkButton href={industry.cta.secondary.href} variant="secondary" size="large" className="border-white/20 bg-white/10 text-white hover:bg-white/15">{industry.cta.secondary.label}</LinkButton>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
