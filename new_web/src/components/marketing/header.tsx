import { useEffect, useId, useRef, useState } from 'react'
import { ArrowDown01Icon, ArrowRight01Icon, SidebarLeftIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useRouterState } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { MobileNavigation } from '@/components/marketing/mobile-navigation'
import type { MarketingNavigationEntry } from '@/config/navigation'
import {
  isExternalNavigationHref,
  marketingHeaderActions,
  marketingNavigation,
} from '@/config/navigation'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/cn'

interface DesktopNavigationDropdownProps {
  entry: MarketingNavigationEntry
  open: boolean
  pathname: string
  onOpenChange: (open: boolean) => void
  onNavigate: () => void
}

/** 判断导航链接是否对应当前路由。 */
function isNavigationItemActive(pathname: string, href: string) {
  if (!href.startsWith('/')) {
    return false
  }

  const hrefPath = href.split(/[?#]/)[0]
  if (hrefPath === '/') {
    return pathname === '/'
  }

  return pathname === hrefPath || pathname.startsWith(`${hrefPath}/`)
}

/** 生成外部链接所需的安全属性。 */
function getExternalLinkProps(href: string) {
  if (!isExternalNavigationHref(href)) {
    return {}
  }

  return { target: '_blank', rel: 'noreferrer' }
}

/** 桌面端可点击、可键盘操作的导航下拉菜单。 */
function DesktopNavigationDropdown({
  entry,
  open,
  pathname,
  onOpenChange,
  onNavigate,
}: DesktopNavigationDropdownProps) {
  const { t } = useTranslation()
  const menuId = useId()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const active = isNavigationItemActive(pathname, entry.href)

  return (
    <div
      className="relative"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          event.preventDefault()
          onOpenChange(false)
          buttonRef.current?.focus()
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        className={cn(
          'inline-flex min-h-10 items-center gap-1 rounded-lg px-2.5 text-[0.8125rem] font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
          active && 'bg-brand-soft text-brand',
        )}
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={() => onOpenChange(!open)}
      >
        {t(entry.label)}
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          className={cn('size-3.5 transition-transform', open && 'rotate-180')}
          strokeWidth={2}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <div
          id={menuId}
          className="absolute left-0 top-[calc(100%+0.75rem)] w-[40rem] overflow-hidden rounded-2xl border border-border bg-surface p-2 shadow-2xl shadow-slate-950/10"
        >
          <div className="border-b border-border px-4 py-3">
            <a
              href={entry.href}
              className="group flex items-start justify-between gap-5 rounded-xl px-3 py-3 transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              aria-current={active ? 'page' : undefined}
              onClick={onNavigate}
              {...getExternalLinkProps(entry.href)}
            >
              <span>
                <span className="block font-semibold text-foreground">{t(entry.label)}</span>
                {entry.description ? (
                  <span className="mt-1 block max-w-xl text-sm leading-6 text-muted-foreground">{t(entry.description)}</span>
                ) : null}
              </span>
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand"
                strokeWidth={2}
                aria-hidden="true"
              />
            </a>
          </div>
          <ul className="grid grid-cols-2 gap-1 p-2">
            {entry.items?.map((item) => {
              const itemActive = isNavigationItemActive(pathname, item.href)

              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={cn(
                      'block h-full rounded-xl px-3 py-3 transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
                      itemActive && 'bg-brand-soft',
                    )}
                    aria-current={itemActive ? 'page' : undefined}
                    onClick={onNavigate}
                    {...getExternalLinkProps(item.href)}
                  >
                    <span className={cn('block text-sm font-semibold text-foreground', itemActive && 'text-brand')}>
                      {t(item.label)}
                    </span>
                    {item.description ? (
                      <span className="mt-1 block text-xs leading-5 text-muted-foreground">{t(item.description)}</span>
                    ) : null}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

/** 企业官网全局 Header，提供桌面导航、移动抽屉与核心转化入口。 */
export function MarketingHeader() {
  const { t } = useTranslation()
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const desktopNavigationRef = useRef<HTMLElement>(null)
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 12)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setOpenMenu(null)
    setMobileNavigationOpen(false)
  }, [pathname])

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (desktopNavigationRef.current && !desktopNavigationRef.current.contains(event.target as Node)) {
        setOpenMenu(null)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [])

  const solidHeader = pathname !== '/' || scrolled || openMenu !== null

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-colors',
        solidHeader
          ? 'border-border/90 bg-background/95 shadow-sm shadow-slate-950/[0.03] backdrop-blur-xl'
          : 'border-transparent bg-background/75 backdrop-blur-md',
      )}
    >
      <div className="mx-auto flex min-h-[4.5rem] w-full max-w-[90rem] items-center gap-5 px-5 sm:px-8">
        <a
          href="/"
          className="inline-flex shrink-0 items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          aria-label={t('{{name}} home', { name: siteConfig.name })}
        >
          <span className="relative grid size-10 place-items-center overflow-hidden rounded-xl bg-brand text-base font-bold tracking-tight text-white shadow-sm" aria-hidden="true">
            <span className="absolute -right-3 -top-3 size-7 rounded-full bg-cyan-300/40" />
            <span className="relative">壹</span>
          </span>
          <span className="leading-none">
            <span className="block text-base font-semibold tracking-tight text-foreground">{siteConfig.name}</span>
            <span className="mt-1 hidden text-[0.6875rem] font-medium tracking-wide text-muted-foreground sm:block">{t('Enterprise AI gateway')}</span>
          </span>
        </a>

        <nav
          ref={desktopNavigationRef}
          className="ml-auto hidden items-center gap-0.5 min-[1360px]:flex"
          aria-label={t('Primary navigation')}
        >
          {marketingNavigation.map((entry) => {
            if (entry.items) {
              return (
                <DesktopNavigationDropdown
                  key={entry.label}
                  entry={entry}
                  open={openMenu === entry.label}
                  pathname={pathname}
                  onOpenChange={(open) => setOpenMenu(open ? entry.label : null)}
                  onNavigate={() => setOpenMenu(null)}
                />
              )
            }

            const active = isNavigationItemActive(pathname, entry.href)
            return (
              <a
                key={entry.label}
                href={entry.href}
                className={cn(
                  'inline-flex min-h-10 items-center rounded-lg px-2.5 text-[0.8125rem] font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
                  active && 'bg-brand-soft text-brand',
                )}
                aria-current={active ? 'page' : undefined}
                onClick={() => setOpenMenu(null)}
                {...getExternalLinkProps(entry.href)}
              >
                {t(entry.label)}
              </a>
            )
          })}
        </nav>

        <div className="ml-auto hidden shrink-0 items-center gap-2 min-[1360px]:flex">
          <a
            href={marketingHeaderActions[0].href}
            className="inline-flex min-h-10 items-center rounded-xl px-3 text-sm font-semibold text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            {...getExternalLinkProps(marketingHeaderActions[0].href)}
          >
            {t(marketingHeaderActions[0].label)}
          </a>
          <a
            href={marketingHeaderActions[1].href}
            className="inline-flex min-h-10 items-center rounded-xl bg-brand px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            {...getExternalLinkProps(marketingHeaderActions[1].href)}
          >
            {t(marketingHeaderActions[1].label)}
          </a>
        </div>

        <button
          ref={mobileMenuButtonRef}
          type="button"
          className="ml-auto inline-flex size-11 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition hover:border-brand/40 hover:bg-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand min-[1360px]:hidden"
          aria-label={t('Open navigation')}
          aria-expanded={mobileNavigationOpen}
          onClick={() => setMobileNavigationOpen(true)}
        >
          <HugeiconsIcon icon={SidebarLeftIcon} className="size-5" strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      <MobileNavigation
        open={mobileNavigationOpen}
        onOpenChange={setMobileNavigationOpen}
        returnFocusRef={mobileMenuButtonRef}
      />
    </header>
  )
}
