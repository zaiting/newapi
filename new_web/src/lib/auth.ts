export interface ApiResponse<T = unknown> {
  success: boolean
  message: string
  data?: T
}

export interface AuthBundle {
  access_token: string
  token_type: string
  access_expires_at: number
  session: { sid: string }
  user: { language?: string }
}

export interface AuthStatus {
  register_enabled?: boolean
  password_login_enabled?: boolean
  password_register_enabled?: boolean
  email_verification?: boolean
  turnstile_check?: boolean
  turnstile_site_key?: string
  passkey_login?: boolean
  github_oauth?: boolean
  github_client_id?: string
  discord_oauth?: boolean
  discord_client_id?: string
  oidc_enabled?: boolean
  oidc_authorization_endpoint?: string
  oidc_client_id?: string
  oidc_display_name?: string
  linuxdo_oauth?: boolean
  linuxdo_client_id?: string
  custom_oauth_providers?: Array<{ name: string; slug: string; client_id: string; authorization_endpoint: string; scopes?: string }>
}

let pendingTwoFactorFlow: string | null = null

/** 与后端保持同源调用，并始终携带服务端维护的刷新会话 Cookie。 */
export async function requestApi<T>(path: string, init: RequestInit = {}): Promise<ApiResponse<T>> {
  const response = await fetch(path, {
    ...init,
    credentials: 'include',
    headers: { Accept: 'application/json', ...init.headers },
  })
  const payload = await response.json().catch(() => null) as ApiResponse<T> | null
  if (payload) return payload
  return { success: false, message: `Request failed (${response.status})` }
}

export async function getAuthStatus(): Promise<AuthStatus> {
  const response = await requestApi<AuthStatus>('/api/status')
  return response.data ?? (response as unknown as AuthStatus)
}

export function postJson<T>(path: string, body?: unknown) {
  return requestApi<T>(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
}

/** 仅允许认证完成后回到当前站点，避免 redirect 参数造成开放重定向。 */
export function sanitizeAuthRedirect(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const target = value.trim()
  if (!target || target.includes('\\') || target.startsWith('//')) return null
  try {
    const url = target.startsWith('/') ? new URL(target, window.location.origin) : new URL(target)
    return url.origin === window.location.origin && /^(https?):$/.test(url.protocol)
      ? `${url.pathname}${url.search}${url.hash}`
      : null
  } catch {
    return null
  }
}

export function readRedirectTarget() {
  return sanitizeAuthRedirect(new URLSearchParams(window.location.search).get('redirect'))
}

export function completeAuthentication(bundle: AuthBundle, redirect?: string | null) {
  pendingTwoFactorFlow = null
  if (bundle.user.language) void import('@/i18n').then(({ i18n }) => i18n.changeLanguage(bundle.user.language!))
  window.location.assign(redirect ?? '/dashboard')
}

export function setPendingTwoFactorFlow(flowToken: string) {
  pendingTwoFactorFlow = flowToken
}

export function getPendingTwoFactorFlow() {
  return pendingTwoFactorFlow
}

function base64UrlToBuffer(value: string) {
  const padding = '='.repeat((4 - (value.length % 4)) % 4)
  const binary = window.atob((value + padding).replace(/-/g, '+').replace(/_/g, '/'))
  return Uint8Array.from(binary, (character) => character.charCodeAt(0)).buffer
}

function bufferToBase64Url(value: ArrayBuffer) {
  const binary = String.fromCharCode(...new Uint8Array(value))
  return window.btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

/** 将后端返回的 WebAuthn 选项转换为浏览器所需的二进制字段。 */
export function preparePasskeyRequestOptions(payload: unknown): PublicKeyCredentialRequestOptions {
  const source = payload as { publicKey?: Record<string, unknown>; PublicKey?: Record<string, unknown>; response?: Record<string, unknown> }
  const options = source.publicKey ?? source.PublicKey ?? source.response
  if (!options || typeof options.challenge !== 'string') throw new Error('Invalid Passkey options')
  const allowCredentials = Array.isArray(options.allowCredentials)
    ? options.allowCredentials.map((credential) => {
      const value = credential as Record<string, unknown>
      return { ...value, id: base64UrlToBuffer(String(value.id)) } as PublicKeyCredentialDescriptor
    })
    : undefined
  return { ...options, challenge: base64UrlToBuffer(options.challenge), allowCredentials } as PublicKeyCredentialRequestOptions
}

export function serializePasskeyAssertion(credential: PublicKeyCredential) {
  const response = credential.response as AuthenticatorAssertionResponse
  return {
    id: credential.id,
    rawId: bufferToBase64Url(credential.rawId),
    type: credential.type,
    authenticatorAttachment: credential.authenticatorAttachment,
    response: {
      authenticatorData: bufferToBase64Url(response.authenticatorData),
      clientDataJSON: bufferToBase64Url(response.clientDataJSON),
      signature: bufferToBase64Url(response.signature),
      userHandle: response.userHandle ? bufferToBase64Url(response.userHandle) : null,
    },
    clientExtensionResults: credential.getClientExtensionResults(),
  }
}
