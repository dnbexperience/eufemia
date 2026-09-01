// Renders analytics records as key figures and bar charts. Data is loaded from
// the access-controlled dashboard API; the page shows an empty state when there
// is no data or no data source is configured.

import {
  ensureSignedIn,
  getApiBaseUrl,
  clearSession,
  beginAuthRetry,
  clearAuthRetry,
  signOut,
} from './auth.js'

/** Normalise the stored shape to a common view model. */
function normalise(record) {
  const label =
    record.name ?? record.path ?? record.type ?? record.id ?? '—'
  const when = record.createdAt ?? record.timestamp ?? ''
  const day = typeof when === 'string' ? when.slice(0, 10) : ''
  const env = record.env ?? ''

  return { label, day, env }
}

function toRecords(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && Array.isArray(payload.records)) {
    return payload.records
  }

  return []
}

/**
 * Fetch dashboard records from the protected API. Returns a discriminated
 * result so the caller owns DOM and navigation; this function only manages the
 * sign-in retry marker:
 *   { kind: 'empty' }         no session, no API configured, or a network error
 *   { kind: 'retry' }         token rejected and a sign-in retry is allowed
 *   { kind: 'rejected' }      token rejected after the retry was already used
 *   { kind: 'error', status } the API responded with a non-ok status
 *   { kind: 'data', payload } records fetched successfully
 */
export async function loadDashboardData(session, apiBaseUrl) {
  if (!session || !apiBaseUrl) {
    return { kind: 'empty' }
  }

  const base = apiBaseUrl.replace(/\/$/, '')

  let response
  try {
    response = await fetch(`${base}/data`, {
      headers: { Authorization: `Bearer ${session.accessToken}` },
      cache: 'no-store',
    })
  } catch {
    // Network or endpoint issue; show the empty state.
    return { kind: 'empty' }
  }

  if (response.status === 401) {
    return beginAuthRetry() ? { kind: 'retry' } : { kind: 'rejected' }
  }

  if (!response.ok) {
    return { kind: 'error', status: response.status }
  }

  clearAuthRetry()

  try {
    return { kind: 'data', payload: await response.json() }
  } catch {
    // Malformed body; show the empty state rather than crashing the page.
    return { kind: 'empty' }
  }
}

function countBy(items, key) {
  const counts = new Map()

  for (const item of items) {
    const value = item[key]
    if (!value) {
      continue
    }

    counts.set(value, (counts.get(value) ?? 0) + 1)
  }

  return counts
}

function el(tag, className, text) {
  const node = document.createElement(tag)
  if (className) {
    node.className = className
  }
  if (text !== undefined) {
    node.textContent = text
  }

  return node
}

function renderKpis(rows) {
  const container = document.getElementById('kpis')
  container.replaceChildren()

  const days = new Set(rows.map((r) => r.day).filter(Boolean))
  const labels = new Set(rows.map((r) => r.label).filter(Boolean))

  const kpis = [
    { value: rows.length.toLocaleString(), label: 'Records' },
    { value: labels.size.toLocaleString(), label: 'Unique pages' },
    { value: days.size.toLocaleString(), label: 'Days with data' },
  ]

  for (const kpi of kpis) {
    const card = el('div', 'kpi')
    card.append(
      el('div', 'value', kpi.value),
      el('div', 'label', kpi.label)
    )
    container.append(card)
  }
}

function renderBars(targetId, counts, { sort = 'desc', limit } = {}) {
  const target = document.getElementById(targetId)
  target.replaceChildren()

  let entries = [...counts.entries()]
  entries.sort((a, b) =>
    sort === 'key' ? a[0].localeCompare(b[0]) : b[1] - a[1]
  )
  if (limit) {
    entries = entries.slice(0, limit)
  }

  const max = entries.reduce((m, [, count]) => Math.max(m, count), 0)

  for (const [name, count] of entries) {
    const row = el('div', 'row')

    const track = el('div', 'track')
    const fill = el('div', 'fill')
    fill.style.width = max > 0 ? `${(count / max) * 100}%` : '0'
    track.append(fill)

    row.append(
      el('div', 'name', name),
      track,
      el('div', 'count', count.toLocaleString())
    )
    target.append(row)
  }

  if (entries.length === 0) {
    target.append(el('p', 'meta', 'No data.'))
  }
}

function render(rows) {
  renderKpis(rows)
  renderBars('per-day', countBy(rows, 'day'), { sort: 'key' })
  renderBars('top-names', countBy(rows, 'label'), {
    sort: 'desc',
    limit: 15,
  })
}

function populateEnvFilter(rows, onChange) {
  const select = document.getElementById('env')
  const envs = [...new Set(rows.map((r) => r.env).filter(Boolean))].sort()

  for (const env of envs) {
    const option = el('option', undefined, env)
    option.value = env
    select.append(option)
  }

  select.addEventListener('change', () => onChange(select.value))
}

function renderUser(session) {
  if (!session) {
    return
  }

  const container = document.getElementById('user')
  const button = el('button', 'signout', 'Sign out')
  button.type = 'button'
  button.addEventListener('click', signOut)

  container.replaceChildren(el('span', 'user-name', session.name), button)
  container.hidden = false
}

function showError(message) {
  const box = document.getElementById('error')
  box.textContent = message
  box.hidden = false
}

// Hide the sign-in placeholder and reveal the dashboard. Kept hidden until a
// session is resolved so the dashboard does not flash before the login redirect.
function revealDashboard() {
  hideStatus()

  const dashboard = document.getElementById('dashboard')
  if (dashboard) {
    dashboard.hidden = false
  }
}

function hideStatus() {
  const status = document.getElementById('status')
  if (status) {
    status.hidden = true
  }
}

async function main() {
  let session
  try {
    session = await ensureSignedIn()
  } catch (error) {
    hideStatus()
    showError(`Sign-in failed: ${error.message}`)

    return
  }

  revealDashboard()

  renderUser(session)

  const result = await loadDashboardData(session, getApiBaseUrl())

  if (result.kind === 'retry') {
    // Token rejected; retry sign-in once, then surface an error instead of
    // looping between clearing the session and reloading.
    clearSession()
    window.location.reload()

    return
  }

  if (result.kind === 'rejected') {
    showError(
      'The data API rejected your access. Please try again later, or contact the dashboard owner if it persists.'
    )

    return
  }

  if (result.kind === 'error') {
    showError(
      `The data API returned an error (${result.status}). Please try again later, or contact the dashboard owner if it persists.`
    )

    return
  }

  const payload = result.kind === 'data' ? result.payload : null
  const all = toRecords(payload).map(normalise)

  if (all.length === 0) {
    document.getElementById('meta').textContent = 'No data yet.'

    return
  }

  const generated = payload && payload.generatedAt
  if (generated) {
    document.getElementById('meta').textContent =
      `Snapshot generated ${new Date(generated).toLocaleString()}`
  }

  const apply = (env) =>
    render(env ? all.filter((r) => r.env === env) : all)

  populateEnvFilter(all, apply)
  apply('')
}

// Browser entry point. Guarded so importing this module for its exports (tests)
// does not run the page flow.
if (typeof document !== 'undefined') {
  main()
}
