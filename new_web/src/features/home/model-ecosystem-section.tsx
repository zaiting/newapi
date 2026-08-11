import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'

/** 展示项目已支持的主要模型生态入口。 */
export function ModelEcosystemSection() {
  const { t } = useTranslation()
  const modelProviders = [
    t('OpenAI'),
    t('Claude'),
    t('Gemini'),
    t('Azure OpenAI'),
    t('AWS Bedrock'),
    t('DeepSeek'),
    t('Mistral'),
    t('Cohere'),
    t('Ollama'),
    t('xAI'),
  ]

  return (
    <section className="border-y border-border bg-surface py-12 sm:py-14" aria-labelledby="model-ecosystem-title">
      <Container>
        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-sm">
            <h2 id="model-ecosystem-title" className="text-xl font-semibold tracking-tight text-foreground">
              {t('Mainstream models, connected through one interface')}
            </h2>
            <a href="/pricing" className="mt-3 inline-flex text-sm font-semibold text-brand hover:text-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
              {t('Explore models and pricing')} <span className="ml-1" aria-hidden="true">→</span>
            </a>
          </div>
          <ul className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5" aria-label={t('Supported provider examples')}>
            {modelProviders.map((provider) => (
              <li key={provider} className="flex min-h-14 items-center justify-center rounded-xl border border-border bg-muted/40 px-3 text-center text-sm font-semibold text-muted-foreground transition hover:border-brand/30 hover:bg-brand-soft hover:text-brand motion-reduce:transition-none">
                {provider}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
