import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { LinkButton } from '@/components/marketing/link-button'
import { SectionHeading } from '@/components/marketing/section-heading'
import { getDemoModelCatalog, type ModelCategory } from '@/features/pricing/pricing-data'

/** 提供纯前端的演示模型搜索、供应来源筛选和能力类型筛选。 */
export function ModelPriceExplorer() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [providerId, setProviderId] = useState('all')
  const [category, setCategory] = useState<'all' | ModelCategory>('all')
  const models = useMemo(() => getDemoModelCatalog(t), [t])
  const providers = useMemo(() => {
    const uniqueProviders = new Map(models.map((model) => [model.providerId, model.providerName] as const))
    return Array.from(uniqueProviders, ([id, name]) => ({ id, name }))
  }, [models])

  const filteredModels = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase()
    return models.filter((model) => {
      const matchesSearch = normalizedQuery.length === 0 || [model.name, model.providerName, model.useCase].some((value) => value.toLocaleLowerCase().includes(normalizedQuery))
      const matchesProvider = providerId === 'all' || model.providerId === providerId
      const matchesCategory = category === 'all' || model.category === category
      return matchesSearch && matchesProvider && matchesCategory
    })
  }, [category, models, providerId, searchQuery])

  /** 清空所有筛选条件并恢复完整演示目录。 */
  function clearFilters() {
    setSearchQuery('')
    setProviderId('all')
    setCategory('all')
  }

  return (
    <section id="model-catalog" className="border-y border-border bg-muted/50 py-20 sm:py-24">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={t('Model pricing catalog')}
            title={t('Explore model billing structures before configuration')}
            description={t('This interactive catalog uses illustrative model names and does not publish real provider rates. Connect it to verified pricing data before presenting commercial amounts.')}
          />
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900 lg:max-w-sm">
            <strong>{t('Demo data')}</strong>{' '}
            {t('No amount shown on this page is a provider quote or a platform commitment.')}
          </div>
        </div>

        <div className="mt-10 grid gap-4 rounded-2xl border border-border bg-surface p-4 shadow-sm md:grid-cols-3 md:p-5">
          <label className="grid gap-2 text-sm font-medium text-foreground">
            <span>{t('Search models')}</span>
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={t('Search by model, connection, or use case')}
              className="min-h-11 rounded-xl border border-border bg-white px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/15"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-foreground">
            <span>{t('Provider connection')}</span>
            <select
              value={providerId}
              onChange={(event) => setProviderId(event.target.value)}
              className="min-h-11 rounded-xl border border-border bg-white px-4 text-sm text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15"
            >
              <option value="all">{t('All provider connections')}</option>
              {providers.map((provider) => <option key={provider.id} value={provider.id}>{provider.name}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-foreground">
            <span>{t('Model type')}</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as 'all' | ModelCategory)}
              className="min-h-11 rounded-xl border border-border bg-white px-4 text-sm text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15"
            >
              <option value="all">{t('All model types')}</option>
              <option value="text">{t('Text')}</option>
              <option value="image">{t('Image')}</option>
              <option value="audio">{t('Audio')}</option>
              <option value="video">{t('Video')}</option>
            </select>
          </label>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground" aria-live="polite">{t('{{count}} demo models', { count: filteredModels.length })}</p>
          {searchQuery || providerId !== 'all' || category !== 'all' ? (
            <button type="button" onClick={clearFilters} className="min-h-10 rounded-lg px-3 text-sm font-medium text-brand transition hover:bg-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
              {t('Clear filters')}
            </button>
          ) : null}
        </div>

        {filteredModels.length > 0 ? (
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {filteredModels.map((model) => (
              <article key={model.id} className="rounded-2xl border border-border bg-surface p-6 shadow-sm transition hover:border-brand/40 hover:shadow-lg">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong">{model.categoryLabel}</span>
                      <span className="text-xs text-muted-foreground">{model.providerName}</span>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-foreground">{model.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{model.useCase}</p>
                  </div>
                  <span className="rounded-lg border border-border px-2.5 py-1 text-xs text-muted-foreground">{model.updatedLabel}</span>
                </div>

                <dl className="mt-6 divide-y divide-border rounded-xl border border-border">
                  {model.billing.map((billingItem) => (
                    <div key={billingItem.label} className="grid gap-2 p-4 sm:grid-cols-[0.7fr_1fr_1.35fr] sm:items-center">
                      <dt className="text-sm font-medium text-foreground">{billingItem.label}</dt>
                      <dd className="text-xs leading-5 text-muted-foreground">{billingItem.unit}</dd>
                      <dd className="text-sm font-medium text-foreground sm:text-right">{billingItem.rate}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="text-xs text-muted-foreground">{t('Currency and rate are provided by verified configuration')}</span>
                  <LinkButton href={'/pricing/' + model.id} variant="ghost" aria-label={t('View pricing details for {{model}}', { model: model.name })}>
                    {t('View details')} <span className="ml-2" aria-hidden="true">→</span>
                  </LinkButton>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-dashed border-border bg-surface px-6 py-14 text-center">
            <h3 className="text-lg font-semibold text-foreground">{t('No demo models match these filters')}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t('Clear the filters or try a broader search term.')}</p>
            <button type="button" onClick={clearFilters} className="mt-5 min-h-10 rounded-xl bg-brand px-4 text-sm font-medium text-white hover:bg-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
              {t('Show all demo models')}
            </button>
          </div>
        )}
      </Container>
    </section>
  )
}
