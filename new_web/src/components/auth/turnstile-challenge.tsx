import { useEffect, useRef } from 'react'

interface TurnstileApi {
  render: (element: HTMLElement, options: { sitekey: string; callback: (token: string) => void; 'expired-callback': () => void }) => string
  remove: (widgetId: string) => void
}

declare global {
  interface Window { turnstile?: TurnstileApi }
}

interface TurnstileChallengeProps { siteKey: string; onTokenChange: (token: string) => void }

/** 按状态接口要求加载 Turnstile，令牌仅保留在当前页面提交状态中。 */
export function TurnstileChallenge({ siteKey, onTokenChange }: TurnstileChallengeProps) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let widgetId: string | undefined
    const render = () => {
      if (!hostRef.current || !window.turnstile) return
      widgetId = window.turnstile.render(hostRef.current, { sitekey: siteKey, callback: onTokenChange, 'expired-callback': () => onTokenChange('') })
    }
    const existing = document.querySelector<HTMLScriptElement>('script[data-new-web-turnstile]')
    if (existing) {
      existing.addEventListener('load', render, { once: true })
      render()
    } else {
      const script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      script.async = true
      script.defer = true
      script.dataset.newWebTurnstile = 'true'
      script.addEventListener('load', render, { once: true })
      document.head.append(script)
    }
    return () => { if (widgetId && window.turnstile) window.turnstile.remove(widgetId) }
  }, [onTokenChange, siteKey])

  return <div ref={hostRef} />
}
