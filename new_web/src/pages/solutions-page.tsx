import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { FinalCTA } from '@/components/marketing/final-cta'
import { LinkButton } from '@/components/marketing/link-button'
import { PageHero } from '@/components/marketing/page-hero'
import { SectionHeading } from '@/components/marketing/section-heading'
import { SolutionCard } from '@/features/solutions/solution-card'
import { useSolutionsContent } from '@/features/solutions/use-solutions-content'

/** 企业解决方案总览页。 */
export function SolutionsPage() {
  const { t } = useTranslation()
  const solutions = useSolutionsContent()

  const implementationSteps = [
    {
      title: t('Assess the business workflow'),
      description: t('Define the user, task, expected output, system owner, and the decision that AI may assist.'),
    },
    {
      title: t('Select models and providers'),
      description: t('Evaluate quality, latency, supported modalities, availability, and cost for the target workflow.'),
    },
    {
      title: t('Configure access and integration'),
      description: t('Create project credentials, allowed model access, quotas, and the server-side API integration.'),
    },
    {
      title: t('Test quality, risk, and cost'),
      description: t('Use representative inputs, failure cases, and usage estimates before exposing the workflow to more users.'),
    },
    {
      title: t('Release and monitor continuously'),
      description: t('Review logs, errors, model changes, cost, user feedback, and business outcomes after launch.'),
    },
  ]

  return (
    <>
      <PageHero
        eyebrow={t('Enterprise AI solutions')}
        title={t('Bring AI capabilities into real business workflows.')}
        description={t('From customer-facing product features to internal operations, use one model access and governance layer to reduce integration complexity for small and medium-sized businesses.')}
        actions={
          <>
            <LinkButton href="#solution-catalog" size="large">{t('Choose a solution')}</LinkButton>
            <LinkButton href="/contact" variant="secondary" size="large">{t('Book a solution review')}</LinkButton>
          </>
        }
        aside={
          <div className="rounded-3xl border border-border bg-surface p-6 shadow-[0_28px_90px_-50px_rgba(37,99,235,0.5)] sm:p-8">
            <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">{t('Start from a business goal')}</p>
            <div className="mt-5 space-y-3">
              {[
                t('Improve customer service efficiency'),
                t('Add AI features to an existing product'),
                t('Build an enterprise knowledge assistant'),
                t('Produce content across channels'),
                t('Standardize AI development and testing'),
              ].map((goal, index) => (
                <div key={goal} className="flex items-center gap-3 rounded-2xl border border-border bg-muted p-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-brand text-xs font-semibold text-white">{index + 1}</span>
                  <span className="text-sm font-medium leading-6 text-foreground">{goal}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 border-t border-border pt-5 text-sm leading-6 text-muted-foreground">{t('Choose the workflow first. Model selection and technical configuration follow the business requirement.')}</p>
          </div>
        }
      />

      <section id="solution-catalog" className="scroll-mt-20 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t('Solution catalog')}
            title={t('Match platform capabilities to the outcome your team needs')}
            description={t('Each solution combines a business workflow, an integration architecture, operating controls, and clear responsibility boundaries.')}
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {solutions.map((solution, index) => (
              <SolutionCard key={solution.slug} solution={solution} index={index} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-muted py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t('Delivery framework')}
            title={t('A practical path from business assessment to production monitoring')}
            description={t('The same governance questions apply across solutions, while the implementation scope depends on your systems, data, and review requirements.')}
          />
          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {implementationSteps.map((step, index) => (
              <li key={step.title} className="rounded-3xl border border-border bg-surface p-6">
                <span className="text-sm font-semibold text-brand">{t('Step')} {String(index + 1).padStart(2, '0')}</span>
                <h2 className="mt-4 text-lg font-semibold leading-7 text-foreground">{step.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 rounded-2xl border border-brand/15 bg-brand-soft p-5 text-sm leading-7 text-foreground">
            <strong>{t('Planning note:')}</strong> {t('No fixed launch timeline is assumed. Delivery depends on workflow complexity, integration readiness, data controls, and acceptance criteria.')}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeading
            eyebrow={t('Architecture principle')}
            title={t('Keep the model gateway between business systems and providers')}
            description={t('A unified access layer reduces repeated provider integration while preserving application ownership of identity, business rules, data, and final actions.')}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: t('Business system'), description: t('Owns users, workflow context, permissions, and customer experience.') },
              { title: t('AI orchestration'), description: t('Prepares prompts, retrieval context, validation, and fallback behavior.') },
              { title: t('Model access platform'), description: t('Controls keys, allowed models, quotas, routing, logs, and usage visibility.') },
              { title: t('Model providers'), description: t('Supply the selected model capabilities under their own availability and policy terms.') },
            ].map((layer, index) => (
              <article key={layer.title} className="rounded-2xl border border-border bg-surface p-5">
                <span className="text-xs font-semibold tracking-[0.12em] text-brand uppercase">{t('Layer')} {index + 1}</span>
                <h2 className="mt-3 font-semibold text-foreground">{layer.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{layer.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  )
}
