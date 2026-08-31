// OpenID Connect sign-in (authorization code + PKCE) for the dashboard.
//
// Public client: no secret in the browser. Only users assigned to the app
// registration receive a token (enforced by Entra "assignment required"), so
// this also controls who can sign in.
//
// Scope note: on a static site this gates the UI. It does not, on its own,
// protect a publicly served data file — real data protection requires the host
// to enforce auth on the files, or serving data from a token-protected API.

let config = {}
const BASE_SCOPE = 'openid profile email'
const SESSION_KEY = 'eufemia-analytics-session'
const FLOW_KEY = 'eufemia-analytics-flow'
const RETRY_KEY = 'eufemia-analytics-retry'

function authority() {
  return `https://login.microsoftonline.com/${config.tenantId}`
}

// Request the API scope alongside sign-in so the token endpoint returns an
// access token the dashboard API accepts.
export function scopes(cfg = config) {
  return cfg.apiScope ? `${BASE_SCOPE} ${cfg.apiScope}` : BASE_SCOPE
}

async function loadConfig() {
  try {
    const response = await fetch('./config.json', { cache: 'no-store' })
    if (response.ok) {
      return await response.json()
    }
  } catch {
    // No configuration present; sign-in stays off for local preview.
  }

  return {}
}

function base64Url(bytes) {
  let binary = ''
  for (const byte of new Uint8Array(bytes)) {
    binary += String.fromCharCode(byte)
  }

  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

function randomString(length = 64) {
  const bytes = crypto.getRandomValues(new Uint8Array(length))

  return base64Url(bytes).slice(0, length)
}

async function challengeFrom(verifier) {
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(verifier)
  )

  return base64Url(digest)
}

function decodeJwt(token) {
  try {
    let payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    payload = payload.padEnd(Math.ceil(payload.length / 4) * 4, '=')

    // atob yields a byte string; decode it as UTF-8 so names with æ/ø/å survive.
    const json = new TextDecoder().decode(
      Uint8Array.from(atob(payload), (char) => char.charCodeAt(0))
    )

    return JSON.parse(json)
  } catch {
    return {}
  }
}

export function readSession() {
  try {
    const session = JSON.parse(
      sessionStorage.getItem(SESSION_KEY) || 'null'
    )
    // Require an access token as well: a session persisted by an older build
    // has no token and can't call the data API, so treat it as invalid and
    // force a clean re-auth rather than sending "Bearer undefined".
    if (session && session.accessToken && session.expiresAt > Date.now()) {
      return session
    }
  } catch {
    // Fall through to a clean state.
  }

  clearSession()

  return null
}

async function redirectToLogin() {
  const verifier = randomString(64)
  const state = randomString(32)
  sessionStorage.setItem(FLOW_KEY, JSON.stringify({ verifier, state }))

  const params = new URLSearchParams({
    client_id: config.clientId,
    response_type: 'code',
    redirect_uri: config.redirectUri,
    scope: scopes(),
    code_challenge: await challengeFrom(verifier),
    code_challenge_method: 'S256',
    state,
  })

  window.location.assign(`${authority()}/oauth2/v2.0/authorize?${params}`)
}

async function exchangeCode(code, returnedState) {
  const flow = JSON.parse(sessionStorage.getItem(FLOW_KEY) || 'null')
  sessionStorage.removeItem(FLOW_KEY)

  if (!flow || flow.state !== returnedState) {
    throw new Error('Sign-in state did not match; please try again.')
  }

  const response = await fetch(`${authority()}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: config.clientId,
      grant_type: 'authorization_code',
      code,
      redirect_uri: config.redirectUri,
      code_verifier: flow.verifier,
    }),
  })

  if (!response.ok) {
    throw new Error(`Token request failed (${response.status}).`)
  }

  const tokens = await response.json()
  const claims = decodeJwt(tokens.id_token)

  const session = {
    name: claims.name || claims.preferred_username || 'Signed in',
    accessToken: tokens.access_token,
    expiresAt:
      Date.now() + (Number(tokens.expires_in) || 3600) * 1000 - 60000,
  }
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))

  return session
}

// Complete an in-progress sign-in redirect. Callback params are processed only
// when we started the flow, so stray URL params are ignored.
async function completeRedirect() {
  if (!sessionStorage.getItem(FLOW_KEY)) {
    return null
  }

  const url = new URL(window.location.href)
  const idpError = url.searchParams.get('error')
  if (idpError) {
    sessionStorage.removeItem(FLOW_KEY)
    throw new Error(url.searchParams.get('error_description') || idpError)
  }

  const code = url.searchParams.get('code')
  if (!code) {
    return null
  }

  const session = await exchangeCode(code, url.searchParams.get('state'))
  for (const key of ['code', 'state', 'session_state']) {
    url.searchParams.delete(key)
  }
  window.history.replaceState(
    {},
    document.title,
    url.pathname + url.search
  )

  return session
}

/**
 * Resolve the current session, running the redirect flow when needed.
 * Returns null when sign-in is not configured (local scaffold preview).
 */
export async function ensureSignedIn() {
  config = await loadConfig()

  if (!config.clientId || !config.tenantId) {
    return null
  }

  // The decision to grant access hinges on a validated session, not on any
  // raw URL parameter.
  const session = (await completeRedirect()) || readSession()
  if (session) {
    return session
  }

  await redirectToLogin()

  // The redirect navigates away, so nothing after this resolves.
  return new Promise(() => {})
}

export function signOut() {
  clearSession()

  const params = new URLSearchParams({
    post_logout_redirect_uri: config.redirectUri || window.location.origin,
  })
  window.location.assign(`${authority()}/oauth2/v2.0/logout?${params}`)
}

export function getApiBaseUrl() {
  return config.apiBaseUrl
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY)
}

// Grant a single sign-in retry after the API rejects a token, so a persistently
// refused token surfaces an error instead of looping between clear and reload.
export function beginAuthRetry() {
  if (sessionStorage.getItem(RETRY_KEY)) {
    return false
  }

  sessionStorage.setItem(RETRY_KEY, '1')

  return true
}

export function clearAuthRetry() {
  sessionStorage.removeItem(RETRY_KEY)
}
