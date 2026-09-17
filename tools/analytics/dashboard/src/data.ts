// Data layer for the dashboard: fetch the access-controlled snapshot and reduce
// it to the view models the UI renders. Kept free of React/DOM so it can be
// unit-tested and reused.

import { beginAuthRetry, clearAuthRetry, type Session } from './auth'

export type AnalyticsRecord = {
  name?: string
  path?: string
  type?: string
  id?: string
  env?: string
  created_at?: string
  timestamp?: string
}

export type McpCount = { name: string; count: number }

export type McpUsage = {
  total?: number
  perTool?: McpCount[]
  perComponent?: McpCount[]
  perPath?: McpCount[]
}

export type DashboardPayload = {
  generatedAt?: string
  portalViews?: AnalyticsRecord[]
  mcpUsage?: McpUsage
}

export type ViewRow = {
  label: string
  day: string
  env: string
}

/** Normalise the stored shape to a common view model. */
export function normalise(record: AnalyticsRecord): ViewRow {
  const label =
    record.name ?? record.path ?? record.type ?? record.id ?? '—'
  const when = record.created_at ?? record.timestamp ?? ''
  const day = typeof when === 'string' ? when.slice(0, 10) : ''
  const env = record.env ?? ''

  return { label, day, env }
}

export function toRecords(
  payload: DashboardPayload | AnalyticsRecord[] | null
): AnalyticsRecord[] {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && Array.isArray(payload.portalViews)) {
    return payload.portalViews
  }

  return []
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
  | { kind: 'rejected' }
  | { kind: 'error'; status: number }
  | { kind: 'data'; payload: DashboardPayload }

/**
 * Fetch dashboard records from the protected API. Returns a discriminated
 * result so the caller owns rendering and navigation; this function only
 * manages the sign-in retry marker.
 */
export async function loadDashboardData(
  session: Session | null,
  apiBaseUrl: string | undefined
): Promise<DataResult> {
  if (!session || !apiBaseUrl) {
    return { kind: 'empty' }
  }

  const base = apiBaseUrl.replace(/\/$/, '')

  let response: Response
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

/** Turn a counts map into a sorted, optionally limited, ranked list. */
export function rank(
  counts: Map<string, number>,
  { sort = 'desc', limit }: { sort?: 'desc' | 'key'; limit?: number } = {}
): McpCount[] {
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
 * Derive the portal-view model the dashboard renders: the normalised rows, the
 * distinct environments for the filter, the rows scoped to the selected
 * environment, and the key figures for that scope. Kept pure so the filter and
 * gating behaviour can be tested without rendering.
 */
export function dashboardView(
  payload: DashboardPayload | null,
  env: string
): DashboardView {
  const allRows = toRecords(payload).map(normalise)
  const envs = [
    ...new Set(allRows.map((r) => r.env).filter(Boolean)),
  ].sort()
  const rows = env ? allRows.filter((r) => r.env === env) : allRows

  const kpis: Kpi[] = [
    { value: rows.length, label: 'Records' },
    {
      value: new Set(rows.map((r) => r.label).filter(Boolean)).size,
      label: 'Unique pages',
    },
    {
      value: new Set(rows.map((r) => r.day).filter(Boolean)).size,
      label: 'Days with data',
    },
  ]

  return { allRows, rows, envs, kpis }
}
