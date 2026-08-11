import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en from '@/i18n/locales/en.json'
import zh from '@/i18n/locales/zh.json'

const supportedLanguages = ['zh', 'en'] as const
type SupportedLanguage = (typeof supportedLanguages)[number]

/** 将浏览器检测到的语言收敛为官网支持的中文或英文。 */
function resolveSupportedLanguage(language: string): SupportedLanguage {
  const normalizedLanguage = language.toLowerCase()
  const exactLanguage = supportedLanguages.find((item) => item === normalizedLanguage)
  if (exactLanguage) {
    return exactLanguage
  }

  const baseLanguage = normalizedLanguage.split('-')[0]
  return supportedLanguages.find((item) => item === baseLanguage) || 'zh'
}

const i18nInitialization = i18n.use(LanguageDetector).use(initReactI18next).init({
  resources: {
    zh: { translation: zh },
    en: { translation: en },
  },
  fallbackLng: 'zh',
  supportedLngs: [...supportedLanguages],
  interpolation: { escapeValue: false },
  detection: { order: ['localStorage'], caches: ['localStorage'] },
})

function syncDocumentLanguage(language: string) {
  document.documentElement.lang = resolveSupportedLanguage(language) === 'zh' ? 'zh-CN' : 'en'
  document.documentElement.dir = 'ltr'
}

i18n.on('languageChanged', syncDocumentLanguage)

/** 等待语言检测完成；未保存偏好时默认使用中文。 */
export const i18nReady = i18nInitialization.then(async () => {
  const initialLanguage = resolveSupportedLanguage(i18n.language || i18n.resolvedLanguage || 'zh')
  await i18n.changeLanguage(initialLanguage)
  syncDocumentLanguage(initialLanguage)
})

/** 切换官网语言，仅支持中文和英文。 */
export async function changeWebsiteLanguage(language: string) {
  await i18n.changeLanguage(resolveSupportedLanguage(language))
}

export { i18n }
