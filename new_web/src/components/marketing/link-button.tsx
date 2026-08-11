import type { AnchorHTMLAttributes, ReactNode } from 'react'

import { isExternalNavigationHref } from '@/config/navigation'
import { cn } from '@/lib/cn'

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'default' | 'large'
}

/** 官网统一链接按钮，外部 HTTP(S) 地址默认在新标签页安全打开。 */
export function LinkButton({ children, className, href = '', rel, size = 'default', target, variant = 'primary', ...props }: LinkButtonProps) {
  const external = isExternalNavigationHref(href)
  const resolvedTarget = target ?? (external ? '_blank' : undefined)
  const resolvedRel = rel ?? (resolvedTarget === '_blank' ? 'noopener noreferrer' : undefined)

  return (
    <a
      href={href}
      target={resolvedTarget}
      rel={resolvedRel}
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
        size === 'large' ? 'min-h-12 px-6 text-base' : 'min-h-10 px-4 text-sm',
        variant === 'primary' && 'bg-brand text-white shadow-sm hover:bg-brand-strong',
        variant === 'secondary' && 'border border-border bg-surface text-foreground hover:border-brand/40 hover:bg-brand-soft',
        variant === 'ghost' && 'text-foreground hover:bg-muted',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  )
}
