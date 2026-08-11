export type RobotsDirective = 'index, follow' | 'noindex, nofollow'

export interface PageMetadata {
  title: string
  description: string
  robots?: RobotsDirective
  canonicalUrl?: string
  openGraphTitle?: string
  openGraphDescription?: string
  openGraphImage?: string
  openGraphType?: 'website' | 'article'
}

interface AttributeSnapshot {
  name: string
  value: string | null
}

interface ElementSnapshot {
  element: HTMLElement
  created: boolean
  attributes: AttributeSnapshot[]
}

/** 将相对地址解析为安全的 HTTP(S) 绝对地址，拒绝脚本协议等无效输入。 */
function resolvePublicUrl(value: string | undefined) {
  if (!value) {
    return undefined
  }

  try {
    const url = new URL(value, window.location.origin)
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : undefined
  } catch {
    return undefined
  }
}

/** 创建或更新一个 head 元素，并保存原始属性以便页面卸载时恢复。 */
function updateHeadElement<T extends HTMLElement>(
  selector: string,
  createElement: () => T,
  attributes: Record<string, string>,
  snapshots: ElementSnapshot[],
) {
  let element = document.head.querySelector<T>(selector)
  const created = !element

  if (!element) {
    element = createElement()
    document.head.append(element)
  }

  const targetElement = element

  snapshots.push({
    element: targetElement,
    created,
    attributes: Object.keys(attributes).map((name) => ({ name, value: targetElement.getAttribute(name) })),
  })

  Object.entries(attributes).forEach(([name, value]) => {
    targetElement.setAttribute(name, value)
  })
}

/** 获取不含查询参数和锚点的当前页面规范地址。 */
function getCurrentCanonicalUrl() {
  const url = new URL(window.location.href)
  url.search = ''
  url.hash = ''
  return url.toString()
}

/** 安全更新单页应用的标题、描述、索引规则、规范链接和社交分享元数据。 */
export function applyPageMetadata(metadata: PageMetadata) {
  const previousTitle = document.title
  const snapshots: ElementSnapshot[] = []
  const title = metadata.title.trim() || previousTitle
  const description = metadata.description.trim()
  const robots = metadata.robots ?? 'index, follow'
  const canonicalUrl = resolvePublicUrl(metadata.canonicalUrl) ?? getCurrentCanonicalUrl()
  const openGraphTitle = metadata.openGraphTitle?.trim() || title
  const openGraphDescription = metadata.openGraphDescription?.trim() || description
  const openGraphImage = resolvePublicUrl(metadata.openGraphImage)

  document.title = title

  updateHeadElement(
    'meta[name="description"]',
    () => document.createElement('meta'),
    { name: 'description', content: description },
    snapshots,
  )
  updateHeadElement(
    'meta[name="robots"]',
    () => document.createElement('meta'),
    { name: 'robots', content: robots },
    snapshots,
  )
  updateHeadElement(
    'link[rel="canonical"]',
    () => document.createElement('link'),
    { rel: 'canonical', href: canonicalUrl },
    snapshots,
  )
  updateHeadElement(
    'meta[property="og:title"]',
    () => document.createElement('meta'),
    { property: 'og:title', content: openGraphTitle },
    snapshots,
  )
  updateHeadElement(
    'meta[property="og:description"]',
    () => document.createElement('meta'),
    { property: 'og:description', content: openGraphDescription },
    snapshots,
  )
  updateHeadElement(
    'meta[property="og:type"]',
    () => document.createElement('meta'),
    { property: 'og:type', content: metadata.openGraphType ?? 'website' },
    snapshots,
  )
  updateHeadElement(
    'meta[property="og:url"]',
    () => document.createElement('meta'),
    { property: 'og:url', content: canonicalUrl },
    snapshots,
  )
  updateHeadElement(
    'meta[name="twitter:card"]',
    () => document.createElement('meta'),
    { name: 'twitter:card', content: openGraphImage ? 'summary_large_image' : 'summary' },
    snapshots,
  )
  updateHeadElement(
    'meta[name="twitter:title"]',
    () => document.createElement('meta'),
    { name: 'twitter:title', content: openGraphTitle },
    snapshots,
  )
  updateHeadElement(
    'meta[name="twitter:description"]',
    () => document.createElement('meta'),
    { name: 'twitter:description', content: openGraphDescription },
    snapshots,
  )

  if (openGraphImage) {
    updateHeadElement(
      'meta[property="og:image"]',
      () => document.createElement('meta'),
      { property: 'og:image', content: openGraphImage },
      snapshots,
    )
    updateHeadElement(
      'meta[name="twitter:image"]',
      () => document.createElement('meta'),
      { name: 'twitter:image', content: openGraphImage },
      snapshots,
    )
  }

  return () => {
    document.title = previousTitle

    snapshots.reverse().forEach(({ element, created, attributes }) => {
      if (created) {
        element.remove()
        return
      }

      attributes.forEach(({ name, value }) => {
        if (value === null) {
          element.removeAttribute(name)
        } else {
          element.setAttribute(name, value)
        }
      })
    })
  }
}
