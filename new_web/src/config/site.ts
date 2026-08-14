const configuredConsoleUrl = import.meta.env.VITE_CONSOLE_URL?.trim().replace(/\/+$/, '')
const configuredDocsUrl = import.meta.env.VITE_DOCS_URL?.trim()

/** 企业官网公共配置；外部入口未配置时回退到真实存在的咨询或资源页面。 */
export const siteConfig = {
  name: '壹点智元',
  consoleUrl: configuredConsoleUrl || '/contact',
  consoleConfigured: Boolean(configuredConsoleUrl),
  signInUrl: '/sign-in',
  signUpUrl: '/sign-up',
  docsUrl: configuredDocsUrl || '/resources',
  docsConfigured: Boolean(configuredDocsUrl),
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL || 'business@example.com',
} as const
