import { useEffect, useId, useRef } from 'react'
import type { RefObject } from 'react'
import { Cancel01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useRouterState } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import {
  isExternalNavigationHref,
  marketingHeaderActions,
  marketingNavigation,
} from '@/config/navigation'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/cn'

interface MobileNavigationProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  returnFocusRef: RefObject<HTMLButtonElement | null>
}

/** 判断移动导航链接是否对应当前页面。 */
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

/** 移动端官网导航抽屉，包含焦点约束、Escape 关闭和背景滚动锁定。 */
export function MobileNavigation({ open, onOpenChange, returnFocusRef }: MobileNavigationProps) {
  const { t } = useTranslation()
  const titleId = useId()
  const panelRef = useRef<HTMLElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const pathname = useRouterState({ select: (state) => state.location.pathname })

  useEffect(() => {
    if (!open) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus())

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onOpenChange(false)
        returnFocusRef.current?.focus()
        return
      }

      if (event.key !== 'Tab' || !panelRef.current) {
        return
      }

      const focusableElements = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      )

      if (focusableElements.length === 0) {
        event.preventDefault()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      returnFocusRef.current?.focus()
    }
  }, [onOpenChange, open, returnFocusRef])

  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[70] min-[1360px]:hidden">
      <div
        className="absolute inset-0 bg-ink/55 backdrop-blur-sm"
        aria-hidden="true"
        onClick={() => onOpenChange(false)}
      />
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="absolute inset-y-0 right-0 flex h-[100svh] w-full max-w-md flex-col overflow-hidden bg-surface shadow-2xl"
      >
        <div className="flex min-h-18 items-center justify-between border-b border-border px-5">
          <a
            href="/"
            className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            onClick={() => onOpenChange(false)}
          >
            <span className="grid size-9 place-items-center rounded-xl bg-brand text-sm font-bold tracking-tight text-white" aria-hidden="true">N</span>
            <span className="font-semibold tracking-tight text-foreground">{siteConfig.name}</span>
          </a>
          <h2 id={titleId} className="sr-only">{t('Site navigation')}</h2>
          <button
            ref={closeButtonRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-xl text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            onClick={() => {
              onOpenChange(false)
              returnFocusRef.current?.focus()
            }}
            aria-label={t('Close navigation')}
          >
            <HugeiconsIcon icon={Cancel01Icon} className="size-5" strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-6" aria-label={t('Mobile navigation')}>
          <div className="space-y-7">
            {marketingNavigation.map((entry) => (
              <section key={entry.label} aria-labelledby={`mobile-nav-${entry.label.toLowerCase().replaceAll(' ', '-')}`}>
                <a
                  id={`mobile-nav-${entry.label.toLowerCase().replaceAll(' ', '-')}`}
                  href={entry.href}
                  target={isExternalNavigationHref(entry.href) ? '_blank' : undefined}
                  rel={isExternalNavigationHref(entry.href) ? 'noreferrer' : undefined}
                  className={cn(
                    'flex min-h-11 items-center justify-between rounded-xl px-3 text-base font-semibold text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
                    isNavigationItemActive(pathname, entry.href) && 'bg-brand-soft text-brand',
                  )}
                  aria-current={isNavigationItemActive(pathname, entry.href) ? 'page' : undefined}
                  onClick={() => onOpenChange(false)}
                >
                  {t(entry.label)}
                  <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" strokeWidth={2} aria-hidden="true" />
                </a>

                {entry.items ? (
                  <ul className="mt-2 grid gap-1 border-l border-border pl-4">
                    {entry.items.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          target={isExternalNavigationHref(item.href) ? '_blank' : undefined}
                          rel={isExternalNavigationHref(item.href) ? 'noreferrer' : undefined}
                          className={cn(
                            'block rounded-lg px-3 py-2.5 text-sm leading-5 text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
                            isNavigationItemActive(pathname, item.href) && 'text-brand',
                          )}
                          aria-current={isNavigationItemActive(pathname, item.href) ? 'page' : undefined}
                          onClick={() => onOpenChange(false)}
                        >
                          {t(item.label)}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </nav>

        <div className="border-t border-border bg-muted/50 px-5 py-5">
          <div className="grid gap-2 sm:grid-cols-2">
            {marketingHeaderActions.map((action, index) => (
              <a
                key={action.label}
                href={action.href}
                target={isExternalNavigationHref(action.href) ? '_blank' : undefined}
                rel={isExternalNavigationHref(action.href) ? 'noreferrer' : undefined}
                className={cn(
                  'inline-flex min-h-11 items-center justify-center rounded-xl px-4 text-center text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
                  index === 1
                    ? 'bg-brand text-white hover:bg-brand-strong'
                    : 'border border-border bg-surface text-foreground hover:border-brand/40 hover:bg-brand-soft',
                )}
                onClick={() => onOpenChange(false)}
              >
                {t(action.label)}
              </a>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}
