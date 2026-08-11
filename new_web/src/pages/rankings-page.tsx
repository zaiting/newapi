import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { FinalCTA } from '@/components/marketing/final-cta'
import { LinkButton } from '@/components/marketing/link-button'
import { PageHero } from '@/components/marketing/page-hero'
import { SectionHeading } from '@/components/marketing/section-heading'
import { EvidenceNotice, TrustSection } from '@/features/trust/trust-section'

const evaluationItems = [
  {
    eyebrow: 'Task fit',
    title: 'Capability for the target workflow',
    description: 'Evaluate models against the actual task, language, input type, output format and review requirements instead of one general score.',
  },
  {
    eyebrow: 'Economics',
    title: 'Cost for the expected usage pattern',
    description: 'Compare published prices together with prompt size, output length, retries, caching behavior and expected traffic.',
  },
  {
    eyebrow: 'Integration',
    title: 'Interface and feature compatibility',
    description: 'Check context limits, structured output, tool use, multimodal input and provider-specific behavior required by the application.',
  },
  {
    eyebrow: 'Operations',
    title: 'Latency and service behavior',
    description: 'Measure the region, route, traffic profile and time window that match production instead of reusing unrelated benchmark results.',
  },
  {
    eyebrow: 'Governance',
    title: 'Data and permission requirements',
    description: 'Confirm deployment, retention, upstream terms and internal access boundaries before sensitive workloads are approved.',
  },
  {
    eyebrow: 'Change',
    title: 'Replaceability over time',
    description: 'Consider how the application will test, compare and replace models as capability, availability and pricing change.',
  },
]

/** 模型能力与排行说明页；没有可靠来源时保持空态。 */
export function RankingsPage() {
  const { t } = useTranslation()

  return (
    <div>
      <PageHero
        eyebrow={t('Model capabilities and rankings')}
        title={t('Compare models with a transparent evaluation framework.')}
        description={t('A useful ranking must name its data source, methodology, dimensions and update time. This deployment does not publish an authoritative ranking until those requirements can be met.')}
        actions={(
          <>
            <LinkButton href="#evaluation-framework" size="large">{t('View evaluation dimensions')}</LinkButton>
            <LinkButton href="/pricing" variant="secondary" size="large">{t('Compare published pricing')}</LinkButton>
          </>
        )}
        aside={(
          <div className="rounded-3xl border border-border bg-white/90 p-7 shadow-xl shadow-blue-950/5 sm:p-8">
            <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">{t('Publication status')}</p>
            <dl className="mt-6 space-y-5">
              {[
                ['Ranking data', 'Not published'],
                ['Data source', 'Not available'],
                ['Methodology', 'Evaluation framework only'],
                ['Last updated', 'Not applicable'],
              ].map(([term, value]) => (
                <div key={term} className="flex items-start justify-between gap-5 border-b border-border pb-4 last:border-0 last:pb-0">
                  <dt className="text-sm text-muted-foreground">{t(term)}</dt>
                  <dd className="text-right text-sm font-semibold text-foreground">{t(value)}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      />

      <section className="py-20 sm:py-24">
        <Container>
          <EvidenceNotice
            eyebrow="No unsupported ranking"
            title="No ranking table is displayed without verifiable data."
            description="Internal preferences, provider popularity and isolated benchmark screenshots are not presented as authoritative conclusions. Use the framework below to design an evaluation for your own workload."
            actions={<LinkButton href="/contact">{t('Discuss a model evaluation')}</LinkButton>}
          />
        </Container>
      </section>

      <div id="evaluation-framework">
        <TrustSection
          eyebrow="Evaluation dimensions"
          title="Evaluate the decision from capability, economics, operations and governance."
          description="The right model depends on the workflow and operating context. A single global order can hide the trade-offs that matter to an enterprise application."
          items={evaluationItems}
          columns={3}
          muted
        />
      </div>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t('Minimum publication standard')}
            title={t('What must accompany any future ranking.')}
            description={t('If comparison data is published later, readers should be able to understand where it came from and decide whether it applies to their workload.')}
          />
          <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              ['Name the source', 'Identify the benchmark, provider data or internal test set used for every published result.'],
              ['Define the method', 'Explain prompts, sample size, scoring, region, traffic conditions and known limitations.'],
              ['State the dimensions', 'Separate task quality, price, latency, features and governance instead of hiding them in one score.'],
              ['Show the update time', 'Display when the data was measured or retrieved and remove results that can no longer be verified.'],
            ].map(([title, description], index) => (
              <li key={title} className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
                <span className="text-xs font-semibold text-brand">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 font-semibold text-foreground">{t(title)}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{t(description)}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-3">
            <LinkButton href="/pricing">{t('View model and price information')}</LinkButton>
            <LinkButton href="/resources" variant="secondary">{t('Back to resource center')}</LinkButton>
          </div>
        </Container>
      </section>

      <FinalCTA />
    </div>
  )
}
