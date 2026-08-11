import { useRouterState } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { PageMeta } from '@/components/marketing/page-meta'
import { siteConfig } from '@/config/site'

interface RouteMetaEntry {
  path: string
  title: string
  description: string
  exact?: boolean
}

const defaultDescription = 'A unified AI model access and governance platform for growing teams, helping businesses connect models, manage access, and understand usage in one place.'

const validDynamicPaths = new Set([
  '/solutions/saas-ai',
  '/solutions/customer-service',
  '/solutions/knowledge-assistant',
  '/solutions/content-generation',
  '/solutions/developer-platform',
  '/industries/software-internet',
  '/industries/ecommerce-retail',
  '/industries/business-services',
  '/industries/education-training',
  '/pricing/text-general',
  '/pricing/text-reasoning',
  '/pricing/image-generation',
  '/pricing/audio-realtime',
  '/pricing/video-generation',
])

const dynamicRoutePrefixes = ['/solutions/', '/industries/', '/pricing/'] as const

const routeMetadata: readonly RouteMetaEntry[] = [
  { path: '/', exact: true, title: 'A clearer way to deliver AI', description: defaultDescription },
  { path: '/product', title: 'Product', description: 'Explore the platform capabilities that support AI delivery from integration to governance.' },
  { path: '/solutions', title: 'Solutions', description: 'See how a unified model layer supports common business workflows.' },
  { path: '/industries', title: 'Industries', description: 'Explore practical AI integration paths for different types of growing businesses.' },
  { path: '/pricing', title: 'Models and pricing', description: defaultDescription },
  { path: '/security', title: 'Security and service', description: defaultDescription },
  { path: '/customers', title: 'Customers', description: defaultDescription },
  { path: '/about', title: 'About us', description: defaultDescription },
  { path: '/contact', title: 'Contact us', description: defaultDescription },
  { path: '/resources/model-rankings', exact: true, title: 'Model insights', description: defaultDescription },
  { path: '/resources', title: 'Resource center', description: defaultDescription },
  { path: '/rankings', title: 'Model insights', description: defaultDescription },
  { path: '/privacy-policy', title: 'Privacy policy', description: defaultDescription },
  { path: '/user-agreement', title: 'User agreement', description: defaultDescription },
]

/** 根据当前营销路由集中维护页面标题、摘要和规范地址。 */
export function MarketingRouteMeta() {
  const { t } = useTranslation()
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const metadata = routeMetadata.find((entry) => entry.exact ? pathname === entry.path : pathname === entry.path || pathname.startsWith(entry.path + '/'))
  const isUnknownDynamicPath = dynamicRoutePrefixes.some((prefix) => pathname.startsWith(prefix)) && !validDynamicPaths.has(pathname)

  if (!metadata) {
    return null
  }

  return (
    <PageMeta
      title={t(metadata.title) + ' | ' + siteConfig.name}
      description={t(metadata.description)}
      canonicalUrl={pathname}
      robots={isUnknownDynamicPath ? 'noindex, nofollow' : 'index, follow'}
    />
  )
}
