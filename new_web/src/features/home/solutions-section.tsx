import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { SectionHeading } from '@/components/marketing/section-heading'

/** 按核心业务场景提供解决方案入口。 */
export function SolutionsSection() {
  const { t } = useTranslation()
  const solutions = [
    {
      title: t('AI for SaaS products'),
      problem: t('Add AI features without binding the product to one provider integration.'),
      capability: t('Unified API, model choice, access keys, and usage visibility'),
      audience: t('For SaaS product and engineering teams'),
      href: '/solutions/saas-ai',
      accent: 'from-blue-500/20 to-cyan-400/10',
      symbol: t('SaaS'),
    },
    {
      title: t('Intelligent customer service'),
      problem: t('Support conversational workloads while keeping model access and failures observable.'),
      capability: t('Model routing, quotas, logs, and alternative channels'),
      audience: t('For service operations and support platforms'),
      href: '/solutions/customer-service',
      accent: 'from-cyan-500/20 to-emerald-400/10',
      symbol: t('CX'),
    },
    {
      title: t('Enterprise knowledge assistant'),
      problem: t('Connect knowledge applications to suitable models through a manageable access layer.'),
      capability: t('Model permissions, API key isolation, and operational logs'),
      audience: t('For internal tools and knowledge teams'),
      href: '/solutions/knowledge-assistant',
      accent: 'from-violet-500/20 to-blue-400/10',
      symbol: t('KB'),
    },
    {
      title: t('Content generation workflows'),
      problem: t('Support varied generation tasks without scattering provider accounts across the team.'),
      capability: t('Multi-model access, usage controls, and cost review'),
      audience: t('For marketing and content product teams'),
      href: '/solutions/content-generation',
      accent: 'from-amber-400/20 to-orange-400/10',
      symbol: t('CG'),
    },
    {
      title: t('AI development and testing'),
      problem: t('Evaluate model behavior and change providers without rebuilding the surrounding application.'),
      capability: t('Compatible interfaces, model configuration, and request logs'),
      audience: t('For AI engineering and delivery teams'),
      href: '/solutions/developer-platform',
      accent: 'from-rose-400/20 to-violet-400/10',
      symbol: t('DEV'),
    },
  ]

  return (
    <section className="bg-ink py-20 text-white sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={t('Solutions')}
          title={t('AI access capabilities for different business scenarios')}
          description={t('Start from a concrete workload, then apply the model access and governance capabilities that the team actually needs.')}
          className="[&_h2]:text-white [&_p:last-child]:text-slate-300"
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {solutions.map((solution) => (
            <article key={solution.title} className="group flex min-h-full flex-col rounded-3xl border border-white/10 bg-white/[0.05] p-5 transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.08] motion-reduce:transform-none motion-reduce:transition-none">
              <div className={'flex h-28 items-end rounded-2xl bg-gradient-to-br p-4 ' + solution.accent}>
                <span className="rounded-lg border border-white/15 bg-slate-950/30 px-3 py-1.5 font-mono text-xs font-bold tracking-wide text-cyan-200">{solution.symbol}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold">{solution.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{solution.problem}</p>
              <dl className="mt-5 space-y-3 border-t border-white/10 pt-5 text-sm">
                <div>
                  <dt className="font-semibold text-slate-200">{t('Useful capabilities')}</dt>
                  <dd className="mt-1 leading-6 text-slate-400">{solution.capability}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-200">{t('Best suited for')}</dt>
                  <dd className="mt-1 leading-6 text-slate-400">{solution.audience}</dd>
                </div>
              </dl>
              <a href={solution.href} className="mt-auto inline-flex pt-6 text-sm font-semibold text-cyan-300 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink">
                {t('View solution')} <span className="ml-1 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
