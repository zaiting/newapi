import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/cn'

/** 统一约束营销页面内容宽度和水平留白。 */
export function Container({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div className={cn('mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10', className)} {...props} />
}
