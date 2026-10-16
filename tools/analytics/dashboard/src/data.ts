// Data layer for the dashboard: fetch the access-controlled snapshot and reduce
// it to the view models the UI renders. Kept free of React/DOM so it can be
// unit-tested and reused.

import { beginAuthRetry, clearAuthRetry, type Session } from './auth'

export type PortalView = {
  path?: string
  env?: string
  timestamp?: string
}

export type CountListItem = { name: string; count: number }

export type McpTransportUsage = {
  total?: number
  perTool?: CountListItem[]
  perComponent?: CountListItem[]
  perPath?: CountListItem[]
  perVersion?: CountListItem[]
}

export type McpUsage = {
  web?: McpTransportUsage
  local?: McpTransportUsage
}

export type ComponentUsage = {
  total?: number
  perComponent?: CountListItem[]
  perApp?: CountListItem[]
  perVersion?: CountListItem[]
}

export type DashboardPayload = {
  generatedAt?: string
  portalViews?: PortalView[]
  mcpUsage?: McpUsage
  componentUsage?: ComponentUsage
}

export type ViewRow = {
  path: string
  day: string
  env: string
}

export function toViewRow(view: PortalView): ViewRow {
  const path = view.path ?? '—'
  const day = (view.timestamp ?? '').slice(0, 10)
  const env = view.env ?? ''

  return { path, day, env }
}

/**
 * Freshness line for the meta row. Surfaces the snapshot time even when there
 * are no records, so a viewer can tell the pipeline ran and the data is empty
 * rather than stale.
 */
export function snapshotMeta(
  payload: DashboardPayload | null,
  count: number
): string {
  const generated = payload && payload.generatedAt
  const when = generated ? new Date(generated).toLocaleString() : ''

  if (count === 0) {
    return when
      ? `No data yet (snapshot generated ${when}).`
      : 'No data yet.'
  }

  return when ? `Snapshot generated ${when}` : ''
}

/**
 * User-facing message for a non-ok data API response. A 503 is the expected
 * just-after-deploy state (the snapshot is not generated yet), so it gets
 * softer, actionable copy; other statuses keep the generic error text.
 */
export function dataErrorMessage(status: number): string {
  if (status === 503) {
    return 'The dashboard data is being prepared. This can happen right after a deploy. Please refresh in a moment. If it persists, contact the dashboard owner.'
  }

  return `The data API returned an error (${status}). Please try again later, or contact the dashboard owner if it persists.`
}

export type DataResult =
  | { kind: 'empty' }
  | { kind: 'retry' }
  | { kind: 'error'; message: string }
  | { kind: 'data'; payload: DashboardPayload }

/**
 * Fetch the dashboard snapshot from the protected API. Returns a discriminated
 * result so the caller owns rendering and navigation; this function only
 * manages the sign-in retry marker.
 */
export async function loadDashboardData(
  session: Session | null,
  apiBaseUrl: string | undefined
): Promise<DataResult> {
  if (!session) {
    return { kind: 'empty' }
  }

  if (!apiBaseUrl) {
    return {
      kind: 'error',
      message:
        'The dashboard has no data API address configured. Please contact the dashboard owner.',
    }
  }

  const base = apiBaseUrl.replace(/\/$/, '')

  let response: Response
  try {
    response = await fetch(`${base}/data`, {
      headers: { Authorization: `Bearer ${session.accessToken}` },
      cache: 'no-store',
    })
  } catch {
    return {
      kind: 'error',
      message:
        'Could not reach the data API. Check your connection and refresh, or contact the dashboard owner if it persists.',
    }
  }

  if (response.status === 401) {
    if (beginAuthRetry()) {
      return { kind: 'retry' }
    }

    return {
      kind: 'error',
      message:
        'The data API rejected your access. Please try again later, or contact the dashboard owner if it persists.',
    }
  }

  if (!response.ok) {
    return { kind: 'error', message: dataErrorMessage(response.status) }
  }

  clearAuthRetry()

  try {
    return { kind: 'data', payload: await response.json() }
  } catch {
    return {
      kind: 'error',
      message:
        'The data API sent a response the dashboard could not read. Please try again later, or contact the dashboard owner if it persists.',
    }
  }
}

export function countBy(
  items: ViewRow[],
  key: keyof ViewRow
): Map<string, number> {
  const counts = new Map<string, number>()

  for (const item of items) {
    const value = item[key]
    if (!value) {
      continue
    }

    counts.set(value, (counts.get(value) ?? 0) + 1)
  }

  return counts
}

/** Turn a counts map into a sorted, optionally limited list. */
export function rank(
  counts: Map<string, number>,
  { sort = 'desc', limit }: { sort?: 'desc' | 'key'; limit?: number } = {}
): CountListItem[] {
  const entries = [...counts.entries()]
  entries.sort((a, b) =>
    sort === 'key' ? a[0].localeCompare(b[0]) : b[1] - a[1]
  )

  const ranked = limit ? entries.slice(0, limit) : entries

  return ranked.map(([name, count]) => ({ name, count }))
}

export type Kpi = { value: number; label: string }

export type DashboardView = {
  allRows: ViewRow[]
  rows: ViewRow[]
  envs: string[]
  kpis: Kpi[]
}

/**
 * Derive the portal-view model the dashboard renders: the view rows, the
 * distinct environments for the filter, the rows scoped to the selected
 * environment, and the key figures for that scope. Kept pure so the filter and
 * gating behaviour can be tested without rendering.
 */
export function dashboardView(
  payload: DashboardPayload | null,
  env: string
): DashboardView {
  const views = payload?.portalViews
  const allRows = (Array.isArray(views) ? views : []).map(toViewRow)
  const envs = [
    ...new Set(allRows.map((r) => r.env).filter(Boolean)),
  ].sort()
  const rows = env ? allRows.filter((r) => r.env === env) : allRows

  const kpis: Kpi[] = [
    { value: rows.length, label: 'Latest views' },
    {
      value: new Set(rows.map((r) => r.path).filter(Boolean)).size,
      label: 'Unique URLs',
    },
    {
      value: new Set(rows.map((r) => r.day).filter(Boolean)).size,
      label: 'Days covered',
    },
  ]

  return { allRows, rows, envs, kpis }
}
