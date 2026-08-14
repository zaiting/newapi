import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams, useRouterState } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { TurnstileChallenge } from '@/components/auth/turnstile-challenge'
import { Container } from '@/components/marketing/container'
import {
  completeAuthentication,
  getAuthStatus,
  getPendingTwoFactorFlow,
  postJson,
  preparePasskeyRequestOptions,
  readRedirectTarget,
  requestApi,
  sanitizeAuthRedirect,
  serializePasskeyAssertion,
  setPendingTwoFactorFlow,
  type AuthBundle,
  type AuthStatus,
} from '@/lib/auth'

type AuthenticationMode = 'sign-in' | 'sign-up'

function getStatusValue(status: AuthStatus, key: keyof AuthStatus) {
  return status[key]
}

function createOAuthUrl(provider: string, status: AuthStatus, state: string) {
  const callbackUrl = `${window.location.origin}/oauth/${provider}`
  if (provider === 'github' && status.github_client_id) {
    return `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(status.github_client_id)}&state=${encodeURIComponent(state)}&scope=user:email`
  }
  if (provider === 'discord' && status.discord_client_id) {
    const url = new URL('https://discord.com/oauth2/authorize')
    url.searchParams.set('client_id', status.discord_client_id)
    url.searchParams.set('redirect_uri', callbackUrl)
    url.searchParams.set('response_type', 'code')
    url.searchParams.set('scope', 'identify+openid')
    url.searchParams.set('state', state)
    return url.toString()
  }
  if (provider === 'oidc' && status.oidc_authorization_endpoint && status.oidc_client_id) {
    const url = new URL(status.oidc_authorization_endpoint)
    url.searchParams.set('client_id', status.oidc_client_id)
    url.searchParams.set('redirect_uri', callbackUrl)
    url.searchParams.set('response_type', 'code')
    url.searchParams.set('scope', 'openid profile email')
    url.searchParams.set('state', state)
    return url.toString()
  }
  if (provider === 'linuxdo' && status.linuxdo_client_id) {
    return `https://connect.linux.do/oauth2/authorize?response_type=code&client_id=${encodeURIComponent(status.linuxdo_client_id)}&state=${encodeURIComponent(state)}`
  }
  const customProvider = status.custom_oauth_providers?.find((item) => item.slug === provider)
  if (!customProvider?.authorization_endpoint || !customProvider.client_id) return null
  const url = new URL(customProvider.authorization_endpoint)
  url.searchParams.set('client_id', customProvider.client_id)
  url.searchParams.set('redirect_uri', callbackUrl)
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('state', state)
  if (customProvider.scopes) url.searchParams.set('scope', customProvider.scopes)
  return url.toString()
}

/** 与原 web 保持相同的登录和注册入口，真实提交至同源后端 API。 */
export function AuthenticationPage({ mode }: { mode: AuthenticationMode }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [status, setStatus] = useState<AuthStatus>({})
  const [statusReady, setStatusReady] = useState(false)
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')

  useEffect(() => {
    let active = true
    void getAuthStatus().then((nextStatus) => {
      if (active) setStatus(nextStatus)
    }).catch(() => {
      if (active) setMessage(t('Authentication is currently unavailable.'))
    }).finally(() => {
      if (active) setStatusReady(true)
    })
    return () => { active = false }
  }, [t])

  const startOAuth = useCallback(async (provider: string) => {
    setPending(true)
    setMessage('')
    try {
      const response = await postJson<string | { flow_token?: string }>('/api/oauth/state', { provider, intent: 'login' })
      const state = typeof response.data === 'string' ? response.data : response.data?.flow_token
      const url = state ? createOAuthUrl(provider, status, state) : null
      if (!response.success || !url) throw new Error(response.message || t('Request failed. Please try again.'))
      window.location.assign(url)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : t('Request failed. Please try again.'))
      setPending(false)
    }
  }, [status, t])

  const signInWithPasskey = useCallback(async () => {
    if (!window.PublicKeyCredential || !navigator.credentials) {
      setMessage(t('Passkey is not supported on this device.'))
      return
    }
    setPending(true)
    setMessage('')
    try {
      const begin = await postJson<{ options?: unknown; flow_token?: string }>('/api/user/passkey/login/begin')
      const flowToken = begin.data?.flow_token
      if (!begin.success || !flowToken) throw new Error(begin.message || t('Request failed. Please try again.'))
      const publicKey = preparePasskeyRequestOptions(begin.data?.options ?? begin.data)
      const credential = await navigator.credentials.get({ publicKey }) as PublicKeyCredential | null
      if (!credential) throw new Error(t('Passkey login was cancelled.'))
      const finish = await postJson<AuthBundle>('/api/user/passkey/login/finish', { flow_token: flowToken, credential: serializePasskeyAssertion(credential) })
      if (!finish.success || !finish.data) throw new Error(finish.message || t('Request failed. Please try again.'))
      completeAuthentication(finish.data, readRedirectTarget())
    } catch (error) {
      setMessage(error instanceof Error ? error.message : t('Request failed. Please try again.'))
    } finally {
      setPending(false)
    }
  }, [t])

  async function submitSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    const username = String(values.get('username') ?? '').trim()
    const password = String(values.get('password') ?? '')
    if (!username || !password) return setMessage(t('Please enter a username and password.'))
    if (status.turnstile_check && !turnstileToken) return setMessage(t('Please complete the security check.'))
    setPending(true)
    setMessage('')
    try {
      const response = await postJson<AuthBundle | { require_2fa?: boolean; flow_token?: string }>(`/api/user/login?turnstile=${encodeURIComponent(turnstileToken)}`, { username, password })
      if (!response.success || !response.data) throw new Error(response.message || t('Request failed. Please try again.'))
      if ('require_2fa' in response.data && response.data.require_2fa && response.data.flow_token) {
        setPendingTwoFactorFlow(response.data.flow_token)
        await navigate({ to: '/otp', search: readRedirectTarget() ? { redirect: readRedirectTarget()! } : undefined })
        return
      }
      completeAuthentication(response.data as AuthBundle, readRedirectTarget())
    } catch (error) {
      setMessage(error instanceof Error ? error.message : t('Request failed. Please try again.'))
    } finally {
      setPending(false)
    }
  }

  async function submitSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    const username = String(values.get('username') ?? '').trim()
    const password = String(values.get('password') ?? '')
    const confirmPassword = String(values.get('confirm-password') ?? '')
    const email = String(values.get('email') ?? '').trim()
    const verificationCode = String(values.get('verification-code') ?? '').trim()
    if (!username || !password) return setMessage(t('Please enter a username and password.'))
    if (password.length < 8 || password.length > 20) return setMessage(t('Password must be 8 to 20 characters.'))
    if (password !== confirmPassword) return setMessage(t('Passwords do not match.'))
    if (status.email_verification && (!email || !verificationCode)) return setMessage(t('Registration requires email verification.'))
    if (status.turnstile_check && !turnstileToken) return setMessage(t('Please complete the security check.'))
    setPending(true)
    setMessage('')
    try {
      const response = await postJson(`/api/user/register?turnstile=${encodeURIComponent(turnstileToken)}`, {
        username, password, email: email || undefined, verification_code: verificationCode || undefined,
      })
      if (!response.success) throw new Error(response.message || t('Request failed. Please try again.'))
      await navigate({ to: '/sign-in', replace: true })
    } catch (error) {
      setMessage(error instanceof Error ? error.message : t('Request failed. Please try again.'))
    } finally {
      setPending(false)
    }
  }

  async function sendVerificationCode() {
    const email = (document.getElementById('auth-email') as HTMLInputElement | null)?.value.trim() ?? ''
    if (!email) return setMessage(t('Please enter your email address.'))
    if (status.turnstile_check && !turnstileToken) return setMessage(t('Please complete the security check.'))
    setPending(true)
    setMessage('')
    try {
      const response = await requestApi(`/api/verification?email=${encodeURIComponent(email)}&turnstile=${encodeURIComponent(turnstileToken)}`)
      if (!response.success) throw new Error(response.message || t('Request failed. Please try again.'))
      setMessage(t('Verification code sent.'))
    } catch (error) {
      setMessage(error instanceof Error ? error.message : t('Request failed. Please try again.'))
    } finally {
      setPending(false)
    }
  }

  const providers = [
    status.github_oauth ? ['github', 'GitHub'] : null,
    status.discord_oauth ? ['discord', 'Discord'] : null,
    status.oidc_enabled ? ['oidc', status.oidc_display_name?.trim() || 'OIDC'] : null,
    status.linuxdo_oauth ? ['linuxdo', 'LinuxDO'] : null,
    ...(status.custom_oauth_providers?.map((provider) => [provider.slug, provider.name] as const) ?? []),
  ].filter((provider): provider is readonly [string, string] => provider !== null)
  const registrationDisabled = statusReady && (!getStatusValue(status, 'register_enabled') || !getStatusValue(status, 'password_register_enabled'))

  return (
    <main className="min-h-screen bg-hero py-12 sm:py-16">
      <Container className="max-w-xl">
        <section className="rounded-3xl border border-border bg-surface p-6 shadow-xl shadow-slate-950/10 sm:p-10" aria-labelledby="authentication-title">
          <a href="/" className="text-sm font-semibold text-brand hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">{t('Return to website')}</a>
          <h1 id="authentication-title" className="mt-6 text-3xl font-semibold tracking-tight text-foreground">
            {mode === 'sign-in' ? t('Sign in to your account') : t('Create your account')}
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {mode === 'sign-in' ? t("Don't have an account?") : t('Already have an account?')}{' '}
            <a href={mode === 'sign-in' ? '/sign-up' : '/sign-in'} className="font-semibold text-brand hover:underline">{mode === 'sign-in' ? t('Create account') : t('Sign in')}</a>
          </p>
          {message ? <p className="mt-5 rounded-xl border border-brand/20 bg-brand-soft px-4 py-3 text-sm text-foreground" role="status">{message}</p> : null}
          {mode === 'sign-up' && registrationDisabled ? <p className="mt-5 text-sm text-muted-foreground">{t('Registration is currently unavailable.')}</p> : (
            <form className="mt-7 grid gap-5" onSubmit={mode === 'sign-in' ? submitSignIn : submitSignUp}>
              <label className="grid gap-2 text-sm font-medium text-foreground"><span>{t('Username or email')}</span><input name="username" autoComplete="username" disabled={pending} className="min-h-11 rounded-xl border border-border bg-background px-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" /></label>
              <label className="grid gap-2 text-sm font-medium text-foreground"><span>{t('Password')}</span><input name="password" type="password" autoComplete={mode === 'sign-in' ? 'current-password' : 'new-password'} disabled={pending} className="min-h-11 rounded-xl border border-border bg-background px-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" /></label>
              {mode === 'sign-up' ? <>
                <label className="grid gap-2 text-sm font-medium text-foreground"><span>{t('Confirm password')}</span><input name="confirm-password" type="password" autoComplete="new-password" disabled={pending} className="min-h-11 rounded-xl border border-border bg-background px-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" /></label>
                {status.email_verification ? <><label className="grid gap-2 text-sm font-medium text-foreground"><span>{t('Email')}</span><input id="auth-email" name="email" type="email" autoComplete="email" disabled={pending} className="min-h-11 rounded-xl border border-border bg-background px-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" /></label><div className="grid gap-2 sm:grid-cols-[1fr_auto]"><label className="grid gap-2 text-sm font-medium text-foreground"><span>{t('Verification code')}</span><input name="verification-code" autoComplete="one-time-code" disabled={pending} className="min-h-11 rounded-xl border border-border bg-background px-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" /></label><button type="button" onClick={sendVerificationCode} disabled={pending} className="mt-7 min-h-11 rounded-xl border border-border px-4 text-sm font-semibold hover:bg-muted disabled:opacity-50">{t('Send code')}</button></div></> : null}
              </> : null}
              {status.turnstile_check && status.turnstile_site_key ? <TurnstileChallenge siteKey={status.turnstile_site_key} onTokenChange={setTurnstileToken} /> : null}
              <button type="submit" disabled={pending || !statusReady} className="min-h-12 rounded-xl bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:opacity-50">{pending ? t('Please wait...') : mode === 'sign-in' ? t('Sign in') : t('Create account')}</button>
            </form>
          )}
          {mode === 'sign-in' && status.passkey_login ? <button type="button" onClick={signInWithPasskey} disabled={pending} className="mt-4 min-h-11 w-full rounded-xl border border-border text-sm font-semibold hover:bg-muted disabled:opacity-50">{t('Sign in with Passkey')}</button> : null}
          {mode === 'sign-in' && providers.length > 0 ? <div className="mt-6 border-t border-border pt-6"><p className="mb-3 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">{t('Or continue with')}</p><div className="grid gap-2">{providers.map(([provider, name]) => <button key={provider} type="button" onClick={() => void startOAuth(provider)} disabled={pending} className="min-h-11 rounded-xl border border-border text-sm font-semibold hover:bg-muted disabled:opacity-50">{t('Continue with {{name}}', { name })}</button>)}</div></div> : null}
        </section>
      </Container>
    </main>
  )
}

/** 2FA 登录流使用内存中的后端 flow token，与原 web 的页面刷新失效语义保持一致。 */
export function OtpPage() {
  const { t } = useTranslation()
  const [code, setCode] = useState('')
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState('')
  const [backupCode, setBackupCode] = useState(false)

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const flowToken = getPendingTwoFactorFlow()
    if (!flowToken) return setMessage(t('Login flow expired. Please sign in again.'))
    const normalizedCode = backupCode ? code.replaceAll('-', '') : code
    if (backupCode ? !/^[a-z0-9]{8}$/i.test(normalizedCode) : !/^\d{6}$/.test(normalizedCode)) return setMessage(t('Enter a valid verification code.'))
    setPending(true)
    try {
      const response = await postJson<AuthBundle>('/api/user/login/2fa', { code: normalizedCode, flow_token: flowToken })
      if (!response.success || !response.data) throw new Error(response.message || t('Request failed. Please try again.'))
      completeAuthentication(response.data, readRedirectTarget())
    } catch (error) {
      setMessage(error instanceof Error ? error.message : t('Request failed. Please try again.'))
    } finally { setPending(false) }
  }

  return <main className="min-h-screen bg-hero py-12 sm:py-16"><Container className="max-w-xl"><section className="rounded-3xl border border-border bg-surface p-6 shadow-xl shadow-slate-950/10 sm:p-10"><h1 className="text-3xl font-semibold tracking-tight">{t('Two-factor authentication')}</h1><p className="mt-3 text-sm text-muted-foreground">{t('Enter the 6-digit code or backup code.')}</p>{message ? <p className="mt-5 text-sm text-brand" role="status">{message}</p> : null}<form className="mt-7 grid gap-5" onSubmit={submit}><label className="grid gap-2 text-sm font-medium"><span>{backupCode ? t('Backup code') : t('Verification code')}</span><input value={code} onChange={(event) => setCode(event.target.value)} autoComplete="one-time-code" className="min-h-11 rounded-xl border border-border bg-background px-3" /></label><button type="submit" disabled={pending} className="min-h-12 rounded-xl bg-brand font-semibold text-white disabled:opacity-50">{pending ? t('Please wait...') : t('Verify and sign in')}</button></form><div className="mt-5 flex gap-4 text-sm"><button type="button" onClick={() => { setBackupCode((value) => !value); setCode('') }} className="font-semibold text-brand hover:underline">{backupCode ? t('Use authenticator code') : t('Use a backup code')}</button><a href="/sign-in" className="font-semibold text-brand hover:underline">{t('Back to sign in')}</a></div></section></Container></main>
}

/** OAuth 回调仅向同源后端交换授权码，随后沿用与密码登录相同的安全跳转。 */
export function OAuthCallbackPage() {
  const { t } = useTranslation()
  const { provider } = useParams({ from: '/oauth/$provider' })
  const [message, setMessage] = useState(t('Completing sign in...'))

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const code = query.get('code') ?? ''
    const state = query.get('state') ?? ''
    if (!code) { setMessage(t('OAuth failed. Please sign in again.')); return }
    void requestApi<AuthBundle>(`/api/oauth/${encodeURIComponent(provider)}?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`).then((response) => {
      if (!response.success || !response.data) throw new Error(response.message || t('OAuth failed. Please sign in again.'))
      completeAuthentication(response.data, sanitizeAuthRedirect(query.get('redirect')))
    }).catch((error: unknown) => setMessage(error instanceof Error ? error.message : t('OAuth failed. Please sign in again.')))
  }, [provider, t])

  return <main className="min-h-screen bg-hero py-12"><Container className="max-w-xl"><p className="rounded-3xl border border-border bg-surface p-10 text-center text-sm text-muted-foreground" role="status">{message}</p></Container></main>
}

/** 保留原 web 的旧认证地址，并完整透传查询参数以兼容历史链接。 */
export function LegacyAuthenticationRedirect({ to }: { to: '/sign-in' | '/sign-up' }) {
  const navigate = useNavigate()
  const search = useRouterState({ select: (state) => state.location.search })

  useEffect(() => {
    void navigate({ to, search, replace: true })
  }, [navigate, search, to])

  return null
}
