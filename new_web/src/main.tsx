import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'

import { i18nReady } from '@/i18n'
import { router } from '@/app/router'
import '@/styles/index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

const websiteRootElement = rootElement

/** 等待首选语言资源加载完成后再挂载官网，避免首屏语言闪烁或回退。 */
async function bootstrapWebsite() {
  await i18nReady
  createRoot(websiteRootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}

void bootstrapWebsite()
