import { useEffect } from 'react'

import { applyPageMetadata, type PageMetadata } from '@/lib/page-meta'

/** 在客户端路由切换和语言变化时同步更新当前页面的 SEO 元信息。 */
export function PageMeta(metadata: PageMetadata) {
  const {
    title,
    description,
    robots,
    canonicalUrl,
    openGraphTitle,
    openGraphDescription,
    openGraphImage,
    openGraphType,
  } = metadata

  useEffect(
    () =>
      applyPageMetadata({
        title,
        description,
        robots,
        canonicalUrl,
        openGraphTitle,
        openGraphDescription,
        openGraphImage,
        openGraphType,
      }),
    [
      title,
      description,
      robots,
      canonicalUrl,
      openGraphTitle,
      openGraphDescription,
      openGraphImage,
      openGraphType,
    ],
  )

  return null
}
