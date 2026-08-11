import { siteConfig } from '@/config/site'

/** 官网导航链接配置。 */
export interface MarketingNavigationItem {
  label: string
  href: string
  description?: string
}

/** 官网一级导航配置，可选附带下拉菜单。 */
export interface MarketingNavigationEntry extends MarketingNavigationItem {
  items?: readonly MarketingNavigationItem[]
}

/** 官网页脚导航分组。 */
export interface MarketingFooterSection {
  label: string
  items: readonly MarketingNavigationItem[]
}

/** 顶部主导航，文案以英文源文本作为国际化键。 */
export const marketingNavigation: readonly MarketingNavigationEntry[] = [
  {
    label: 'Product',
    href: '/product',
    description: 'Explore the platform capabilities that support AI delivery from integration to governance.',
    items: [
      {
        label: 'Unified model API',
        href: '/product#unified-model-api',
        description: 'Connect business applications to multiple model providers through one consistent API.',
      },
      {
        label: 'Model routing and resilience',
        href: '/product#model-routing',
        description: 'Coordinate available channels and reduce the impact of a single provider interruption.',
      },
      {
        label: 'Enterprise API key management',
        href: '/product#api-key-management',
        description: 'Separate application access, model permissions, quotas, and key lifecycles.',
      },
      {
        label: 'Usage and cost governance',
        href: '/product#usage-and-cost',
        description: 'Review model consumption and cost records in one place.',
      },
      {
        label: 'Logs and observability',
        href: '/product#logs-and-observability',
        description: 'Trace request status, latency, models, and errors through unified logs.',
      },
      {
        label: 'Enterprise access control',
        href: '/product#access-control',
        description: 'Manage user roles and administration boundaries for your team.',
      },
      {
        label: 'API documentation',
        href: siteConfig.docsUrl,
        description: 'Review integration guidance and API references.',
      },
      {
        label: 'Models and pricing',
        href: '/pricing',
        description: 'Compare available model options and published usage pricing.',
      },
    ],
  },
  {
    label: 'Solutions',
    href: '/solutions',
    description: 'See how a unified model layer supports common business workflows.',
    items: [
      { label: 'AI for SaaS products', href: '/solutions/saas-ai' },
      { label: 'AI customer service', href: '/solutions/customer-service' },
      { label: 'Enterprise knowledge assistant', href: '/solutions/knowledge-assistant' },
      { label: 'Content generation', href: '/solutions/content-generation' },
      { label: 'AI development and testing', href: '/solutions/developer-platform' },
    ],
  },
  {
    label: 'Industries',
    href: '/industries',
    description: 'Explore practical AI integration paths for different types of growing businesses.',
    items: [
      { label: 'Software and internet', href: '/industries/software-internet' },
      { label: 'Ecommerce and retail', href: '/industries/ecommerce-retail' },
      { label: 'Business services', href: '/industries/business-services' },
      { label: 'Education and training', href: '/industries/education-training' },
    ],
  },
  { label: 'Customers', href: '/customers' },
  { label: 'Models and pricing', href: '/pricing' },
  { label: 'Security and service', href: '/security' },
  { label: 'Documentation', href: siteConfig.docsUrl },
]

/** Header 右侧转化入口。 */
export const marketingHeaderActions: readonly MarketingNavigationItem[] = [
  { label: siteConfig.consoleConfigured ? 'Sign in to console' : 'Contact us', href: siteConfig.consoleUrl },
  { label: siteConfig.consoleConfigured ? 'Start for free' : 'Book a solution review', href: siteConfig.consoleUrl },
]

/** Footer 导航，避免展示未配置的状态页、备案或认证信息。 */
export const marketingFooterNavigation: readonly MarketingFooterSection[] = [
  {
    label: 'Product',
    items: [
      { label: 'Product capabilities', href: '/product' },
      { label: 'Models and pricing', href: '/pricing' },
      { label: 'API documentation', href: siteConfig.docsUrl },
      { label: 'Model insights', href: '/resources/model-rankings' },
    ],
  },
  {
    label: 'Solutions',
    items: [
      { label: 'AI for SaaS products', href: '/solutions/saas-ai' },
      { label: 'AI customer service', href: '/solutions/customer-service' },
      { label: 'Enterprise knowledge assistant', href: '/solutions/knowledge-assistant' },
      { label: 'Content generation', href: '/solutions/content-generation' },
      { label: 'AI development and testing', href: '/solutions/developer-platform' },
    ],
  },
  {
    label: 'Company',
    items: [
      { label: 'About us', href: '/about' },
      { label: 'Customer scenarios', href: '/customers' },
      { label: 'Contact us', href: '/contact' },
      { label: 'Resource center', href: '/resources' },
    ],
  },
  {
    label: 'Legal and security',
    items: [
      { label: 'Security and service', href: '/security' },
      { label: 'Privacy policy', href: '/privacy-policy' },
      { label: 'User agreement', href: '/user-agreement' },
    ],
  },
]

/** 判断导航目标是否会离开当前站点。 */
export function isExternalNavigationHref(href: string) {
  return /^(?:https?:)?\/\//i.test(href)
}
