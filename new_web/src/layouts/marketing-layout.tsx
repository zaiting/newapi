import { Outlet } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { MarketingFooter } from '@/components/marketing/footer'
import { MarketingHeader } from '@/components/marketing/header'
import { MarketingRouteMeta } from '@/components/marketing/marketing-route-meta'

/** 企业官网公共布局，统一承载跳转链接、全局导航、主体内容与 Footer。 */
export function MarketingLayout() {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white shadow-lg transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
      >
        {t('Skip to main content')}
      </a>
      <MarketingHeader />
      <MarketingRouteMeta />
      <main id="main-content" className="min-h-[60vh] flex-1" tabIndex={-1}>
        <Outlet />
      </main>
      <MarketingFooter />
    </div>
  )
}
