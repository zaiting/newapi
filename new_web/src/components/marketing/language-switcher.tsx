import { useId } from 'react'
import { ArrowDown01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useTranslation } from 'react-i18next'

import { changeWebsiteLanguage } from '@/i18n'
import { cn } from '@/lib/cn'

const supportedLanguages = [
  { code: 'zh', label: 'Simplified Chinese', shortLabel: '简中' },
  { code: 'en', label: 'English', shortLabel: 'EN' },
] as const

interface LanguageSwitcherProps {
  className?: string
  compact?: boolean
  inverted?: boolean
}

/** 规范化浏览器或 i18next 返回的语言代码。 */
function resolveSupportedLanguage(language: string) {
  const normalizedLanguage = language.toLowerCase()
  const exactLanguage = supportedLanguages.find((item) => item.code === normalizedLanguage)
  if (exactLanguage) {
    return exactLanguage.code
  }

  const baseLanguage = normalizedLanguage.split('-')[0]
  return supportedLanguages.find((item) => item.code === baseLanguage)?.code || 'zh'
}

/** 企业官网语言切换器，使用原生选择控件确保键盘与辅助技术可用。 */
export function LanguageSwitcher({ className, compact = false, inverted = false }: LanguageSwitcherProps) {
  const selectId = useId()
  const { i18n, t } = useTranslation()
  const currentLanguage = resolveSupportedLanguage(i18n.resolvedLanguage || i18n.language || 'zh')

  return (
    <div className={cn('relative inline-flex', compact ? 'w-[5.25rem]' : 'w-full sm:w-44', className)}>
      <label className="sr-only" htmlFor={selectId}>{t('Select language')}</label>
      <select
        id={selectId}
        value={currentLanguage}
        onChange={(event) => void changeWebsiteLanguage(event.target.value)}
        className={cn(
          'min-h-10 w-full cursor-pointer appearance-none rounded-xl border bg-transparent py-2 pl-3 pr-9 text-sm font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
          inverted
            ? 'border-white/20 text-white hover:border-white/40 focus-visible:ring-offset-ink'
            : 'border-border text-foreground hover:border-brand/40 focus-visible:ring-offset-background',
        )}
        aria-label={t('Select language')}
      >
        {supportedLanguages.map((language) => (
          <option key={language.code} value={language.code} className="text-foreground">
            {compact ? language.shortLabel : t(language.label)}
          </option>
        ))}
      </select>
      <HugeiconsIcon
        icon={ArrowDown01Icon}
        className={cn('pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2', inverted ? 'text-slate-300' : 'text-muted-foreground')}
        strokeWidth={2}
        aria-hidden="true"
      />
    </div>
  )
}
