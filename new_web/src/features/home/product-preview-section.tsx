import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { LinkButton } from '@/components/marketing/link-button'
import { SectionHeading } from '@/components/marketing/section-heading'

/** 使用可访问标签页展示不同企业治理界面的演示视图。 */
export function ProductPreviewSection() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState(0)
  const panels = [
    {
      label: t('Usage overview'),
      title: t('Understand model activity across the workspace'),
      description: t('Review request patterns, model usage, and operating signals from a shared overview.'),
      cards: [
        { label: t('Request activity'), value: t('Active'), tone: 'text-emerald-700 bg-emerald-50' },
        { label: t('Model usage'), value: t('Visible'), tone: 'text-blue-700 bg-blue-50' },
        { label: t('Cost tracking'), value: t('Available'), tone: 'text-violet-700 bg-violet-50' },
      ],
      rows: [
        { primary: t('Customer assistant'), secondary: t('Configured chat model'), status: t('Operating normally') },
        { primary: t('Knowledge workflow'), secondary: t('Configured reasoning model'), status: t('Policy applied') },
        { primary: t('Content workflow'), secondary: t('Configured generation model'), status: t('Usage recorded') },
      ],
    },
    {
      label: t('API key management'),
      title: t('Separate access for teams and applications'),
      description: t('Create dedicated credentials and keep their model scope and usage boundaries easier to review.'),
      cards: [
        { label: t('Credential scope'), value: t('Separated'), tone: 'text-blue-700 bg-blue-50' },
        { label: t('Model access'), value: t('Controlled'), tone: 'text-violet-700 bg-violet-50' },
        { label: t('Usage boundary'), value: t('Configured'), tone: 'text-emerald-700 bg-emerald-50' },
      ],
      rows: [
        { primary: t('Production application'), secondary: t('Dedicated API key'), status: t('Enabled') },
        { primary: t('Development environment'), secondary: t('Restricted API key'), status: t('Limited scope') },
        { primary: t('Internal workflow'), secondary: t('Team API key'), status: t('Quota applied') },
      ],
    },
    {
      label: t('Model management'),
      title: t('Keep available models aligned with business needs'),
      description: t('Organize provider channels and expose only the models that each workload is intended to use.'),
      cards: [
        { label: t('Provider channels'), value: t('Managed'), tone: 'text-cyan-700 bg-cyan-50' },
        { label: t('Model catalog'), value: t('Configured'), tone: 'text-blue-700 bg-blue-50' },
        { label: t('Routing policy'), value: t('Applied'), tone: 'text-emerald-700 bg-emerald-50' },
      ],
      rows: [
        { primary: t('General chat'), secondary: t('Primary and alternative channels'), status: t('Available') },
        { primary: t('Reasoning tasks'), secondary: t('Selected model access'), status: t('Available') },
        { primary: t('Embedding tasks'), secondary: t('Dedicated model group'), status: t('Available') },
      ],
    },
    {
      label: t('Request logs'),
      title: t('Investigate calls without switching provider consoles'),
      description: t('Filter model activity and review request outcomes through one operational log workflow.'),
      cards: [
        { label: t('Successful calls'), value: t('Searchable'), tone: 'text-emerald-700 bg-emerald-50' },
        { label: t('Failed calls'), value: t('Traceable'), tone: 'text-rose-700 bg-rose-50' },
        { label: t('Model activity'), value: t('Filterable'), tone: 'text-blue-700 bg-blue-50' },
      ],
      rows: [
        { primary: t('Chat completion request'), secondary: t('Production application'), status: t('Completed') },
        { primary: t('Reasoning request'), secondary: t('Knowledge workflow'), status: t('Completed') },
        { primary: t('Generation request'), secondary: t('Content workflow'), status: t('Review available') },
      ],
    },
    {
      label: t('Cost analysis'),
      title: t('Make model consumption easier to understand'),
      description: t('Review usage and cost records by model, user, and time range to support internal allocation.'),
      cards: [
        { label: t('Usage records'), value: t('Centralized'), tone: 'text-blue-700 bg-blue-50' },
        { label: t('Model comparison'), value: t('Available'), tone: 'text-violet-700 bg-violet-50' },
        { label: t('Allocation view'), value: t('Reviewable'), tone: 'text-amber-700 bg-amber-50' },
      ],
      rows: [
        { primary: t('Business application'), secondary: t('Grouped usage records'), status: t('Ready for review') },
        { primary: t('Development team'), secondary: t('Separated API key usage'), status: t('Ready for review') },
        { primary: t('Shared services'), secondary: t('Model-level usage'), status: t('Ready for review') },
      ],
    },
  ]
  const activePanel = panels[activeTab]

  return (
    <section className="bg-muted/60 py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={t('Product experience')}
            title={t('Manage enterprise models, usage, and cost in one place')}
            description={t('The interface below uses illustrative data to demonstrate how key operating workflows can be organized.')}
          />
          <LinkButton href="/product" variant="secondary">{t('Explore the product')}</LinkButton>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-border bg-surface shadow-xl shadow-slate-200/60">
          <div className="border-b border-border bg-slate-50 px-3 pt-3 sm:px-5 sm:pt-5">
            <div className="flex gap-2 overflow-x-auto pb-3" role="tablist" aria-label={t('Product interface previews')}>
              {panels.map((panel, index) => (
                <button
                  key={panel.label}
                  id={'home-product-tab-' + index}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === index}
                  aria-controls="home-product-panel"
                  tabIndex={activeTab === index ? 0 : -1}
                  onClick={() => setActiveTab(index)}
                  className={
                    'shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transition-none ' +
                    (activeTab === index ? 'bg-brand text-white shadow-sm' : 'text-muted-foreground hover:bg-white hover:text-foreground')
                  }
                >
                  {panel.label}
                </button>
              ))}
            </div>
          </div>

          <div
            id="home-product-panel"
            role="tabpanel"
            aria-labelledby={'home-product-tab-' + activeTab}
            className="grid min-h-[500px] lg:grid-cols-[240px_minmax(0,1fr)]"
          >
            <aside className="hidden border-r border-border bg-slate-950 p-5 text-slate-300 lg:block" aria-label={t('Demo workspace navigation')}>
              <div className="rounded-xl border border-white/10 bg-white/[0.06] p-3">
                <p className="text-xs text-slate-500">{t('Workspace')}</p>
                <p className="mt-1 text-sm font-semibold text-white">{t('Demo workspace')}</p>
              </div>
              <nav className="mt-6 space-y-2" aria-label={t('Product areas')}>
                {panels.map((panel, index) => (
                  <button
                    key={panel.label}
                    type="button"
                    onClick={() => setActiveTab(index)}
                    className={'w-full rounded-lg px-3 py-2.5 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 motion-reduce:transition-none ' + (activeTab === index ? 'bg-white/10 font-semibold text-white' : 'hover:bg-white/[0.06]')}
                  >
                    {panel.label}
                  </button>
                ))}
              </nav>
            </aside>

            <div className="min-w-0 p-5 sm:p-7 lg:p-9">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold tracking-[0.14em] text-brand uppercase">{t('Illustrative product view')}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{activePanel.title}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{activePanel.description}</p>
                </div>
                <span className="w-fit rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800">{t('Sample data only')}</span>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {activePanel.cards.map((card) => (
                  <div key={card.label} className="rounded-2xl border border-border p-4">
                    <p className="text-xs text-muted-foreground">{card.label}</p>
                    <p className={'mt-3 w-fit rounded-full px-2.5 py-1 text-sm font-semibold ' + card.tone}>{card.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 overflow-hidden rounded-2xl border border-border">
                <div className="flex items-center justify-between border-b border-border bg-slate-50 px-4 py-3 sm:px-5">
                  <p className="text-sm font-semibold text-foreground">{activePanel.label}</p>
                  <span className="text-xs text-muted-foreground">{t('Demonstration view')}</span>
                </div>
                <div className="divide-y divide-border">
                  {activePanel.rows.map((row) => (
                    <div key={row.primary} className="grid gap-3 px-4 py-4 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto] sm:items-center sm:px-5">
                      <p className="text-sm font-semibold text-foreground">{row.primary}</p>
                      <p className="text-sm text-muted-foreground">{row.secondary}</p>
                      <span className="w-fit rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">{row.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-border bg-slate-50 p-4 sm:p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold text-foreground">{t('Activity pattern')}</p>
                  <p className="text-xs text-muted-foreground">{t('No production data shown')}</p>
                </div>
                <div className="mt-5 flex h-24 items-end gap-2" aria-hidden="true">
                  {[42, 58, 49, 76, 63, 84, 71, 91, 79, 86].map((height, index) => (
                    <span key={height + index} className="flex-1 rounded-t bg-brand/70" style={{ height: height + '%' }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
