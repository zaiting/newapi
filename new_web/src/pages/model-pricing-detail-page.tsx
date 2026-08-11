import { useParams } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { LinkButton } from '@/components/marketing/link-button'
import { ModelPricingDetail } from '@/features/pricing/model-pricing-detail'
import { getDemoModelCatalog } from '@/features/pricing/pricing-data'

/** 根据路由中的 modelId 展示演示模型价格详情，并处理未知标识。 */
export function ModelPricingDetailPage() {
  const { t } = useTranslation()
  const params = useParams({ strict: false }) as { modelId?: string }
  const modelId = params.modelId ?? ''
  const model = getDemoModelCatalog(t).find((item) => item.id === modelId)

  if (!model) {
    return (
      <section className="bg-hero py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-surface px-6 py-14 text-center shadow-xl sm:px-10">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-xl font-bold text-brand" aria-hidden="true">?</span>
            <p className="mt-6 text-sm font-semibold tracking-[0.16em] text-brand uppercase">{t('Model not found')}</p>
            <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{t('This demo model ID is not available')}</h1>
            <p className="mt-5 text-base leading-8 text-muted-foreground">{t('The model may have been removed from the illustrative catalog, or the link may be incomplete. Return to pricing to choose an available demo entry.')}</p>
            {modelId ? <p className="mt-4 rounded-xl bg-muted px-4 py-3 font-mono text-sm text-muted-foreground">{modelId}</p> : null}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <LinkButton href="/pricing#model-catalog" size="large">{t('Browse model catalog')}</LinkButton>
              <LinkButton href="/contact" variant="secondary" size="large">{t('Contact enterprise services')}</LinkButton>
            </div>
          </div>
        </Container>
      </section>
    )
  }

  return <ModelPricingDetail model={model} />
}
