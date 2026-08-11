import type { TFunction } from 'i18next'

export type ModelCategory = 'text' | 'image' | 'audio' | 'video'

export interface DemoBillingItem {
  /** 计费用量名称。 */
  label: string
  /** 计量单位说明。 */
  unit: string
  /** 演示费率状态，不代表真实报价。 */
  rate: string
}

export interface DemoModelPrice {
  /** 用于详情路由的稳定演示标识。 */
  id: string
  /** 模型展示名称。 */
  name: string
  /** 中性的连接来源标识。 */
  providerId: string
  /** 中性的连接来源名称。 */
  providerName: string
  /** 模型能力分类。 */
  category: ModelCategory
  /** 已国际化的分类名称。 */
  categoryLabel: string
  /** 适用场景说明。 */
  useCase: string
  /** 计费项列表。 */
  billing: DemoBillingItem[]
  /** 数据状态说明。 */
  updatedLabel: string
}

/** 生成仅用于官网交互演示的模型价格目录，不包含真实供应商费率。 */
export function getDemoModelCatalog(t: TFunction): DemoModelPrice[] {
  const unavailableRate = t('Rate available after pricing configuration')
  const demonstrationStatus = t('Illustrative catalog data')

  return [
    {
      id: 'text-general',
      name: t('Demo text model'),
      providerId: 'unified-provider',
      providerName: t('Unified provider connection'),
      category: 'text',
      categoryLabel: t('Text'),
      useCase: t('General chat, extraction, summarization, and content workflows.'),
      billing: [
        { label: t('Input'), unit: t('Per configured input token unit'), rate: unavailableRate },
        { label: t('Output'), unit: t('Per configured output token unit'), rate: unavailableRate },
      ],
      updatedLabel: demonstrationStatus,
    },
    {
      id: 'text-reasoning',
      name: t('Demo reasoning model'),
      providerId: 'cloud-connection',
      providerName: t('Cloud provider connection'),
      category: 'text',
      categoryLabel: t('Text'),
      useCase: t('Structured reasoning, analysis, and multi-step business tasks.'),
      billing: [
        { label: t('Input'), unit: t('Per configured input token unit'), rate: unavailableRate },
        { label: t('Output'), unit: t('Per configured output token unit'), rate: unavailableRate },
      ],
      updatedLabel: demonstrationStatus,
    },
    {
      id: 'image-generation',
      name: t('Demo image model'),
      providerId: 'compatible-endpoint',
      providerName: t('Compatible endpoint'),
      category: 'image',
      categoryLabel: t('Image'),
      useCase: t('Image generation and visual content workflows.'),
      billing: [
        { label: t('Image generation'), unit: t('Per configured image unit'), rate: unavailableRate },
        { label: t('Quality or size factor'), unit: t('Applied when configured'), rate: unavailableRate },
      ],
      updatedLabel: demonstrationStatus,
    },
    {
      id: 'audio-realtime',
      name: t('Demo audio model'),
      providerId: 'unified-provider',
      providerName: t('Unified provider connection'),
      category: 'audio',
      categoryLabel: t('Audio'),
      useCase: t('Speech recognition, speech generation, and real-time audio workflows.'),
      billing: [
        { label: t('Audio input'), unit: t('Per configured audio unit'), rate: unavailableRate },
        { label: t('Audio output'), unit: t('Per configured audio unit'), rate: unavailableRate },
      ],
      updatedLabel: demonstrationStatus,
    },
    {
      id: 'video-generation',
      name: t('Demo video model'),
      providerId: 'cloud-connection',
      providerName: t('Cloud provider connection'),
      category: 'video',
      categoryLabel: t('Video'),
      useCase: t('Video generation workflows with duration and output settings.'),
      billing: [
        { label: t('Video generation'), unit: t('Per configured duration or task unit'), rate: unavailableRate },
        { label: t('Resolution or quality factor'), unit: t('Applied when configured'), rate: unavailableRate },
      ],
      updatedLabel: demonstrationStatus,
    },
  ]
}
