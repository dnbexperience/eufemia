// Data layer for the dashboard: fetch the access-controlled snapshot and reduce
// it to the view models the UI renders. Kept free of React/DOM so it can be
// unit-tested and reused.

import { beginAuthRetry, clearAuthRetry, type Session } from './auth'

export type CountListItem = { name: string; count: number }

export type McpTransportUsage = {
  total?: number
  perTool?: CountListItem[]
  perComponent?: CountListItem[]
  perPath?: CountListItem[]
  missedLookups?: number
  perLikelyComponent?: CountListItem[]
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

export type PortalViewTrends = {
  perDay?: Array<{ dt: string; env: string; count: number }>
  topPathsPerMonth?: Array<{
    month: string
    env: string
    path: string
    count: number
  }>
  perLocaleAndTheme?: Array<{
    env: string
    locale: string
    theme: string
    count: number
  }>
}

export type DashboardPayload = {
  generatedAt?: string
  portalViewTrends?: PortalViewTrends
  mcpUsage?: McpUsage
  componentUsage?: ComponentUsage
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

function sumCounts<Row extends { count: number }>(
  rows: Row[],
  keyOf: (row: Row) => string
): Map<string, number> {
  return rows.reduce((counts, row) => {
    const key = keyOf(row)

    return counts.set(key, (counts.get(key) ?? 0) + row.count)
  }, new Map<string, number>())
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

export type MonthTopPaths = { month: string; paths: CountListItem[] }

export type PortalViewTrendsView = {
  envs: string[]
  firstDay: string
  lastDay: string
  total: number
  kpis: Kpi[]
  last30Days: CountListItem[]
  perWeek: CountListItem[]
  perMonth: CountListItem[]
  topPathsPerMonth: MonthTopPaths[]
  perLocale: CountListItem[]
  perTheme: CountListItem[]
}

const DAY_MS = 24 * 60 * 60 * 1000

function addDays(day: string, days: number): string {
  return new Date(Date.parse(day) + days * DAY_MS)
    .toISOString()
    .slice(0, 10)
}

function mondayOf(day: string): string {
  return addDays(day, -((new Date(day).getUTCDay() + 6) % 7))
}

function daysBetween(firstDay: string, lastDay: string): string[] {
  const length = (Date.parse(lastDay) - Date.parse(firstDay)) / DAY_MS + 1

  return Array.from({ length: Math.max(length, 0) }, (_, index) =>
    addDays(firstDay, index)
  )
}

/**
 * Derive the page-view trends for the selected environment ('' = all). Days
 * without views count as 0 from the first day with data up to the snapshot
 * day, so gaps show instead of being skipped.
 */
export function portalViewTrendsView(
  payload: DashboardPayload | null,
  env: string
): PortalViewTrendsView {
  const trends = payload?.portalViewTrends
  const perDay = trends?.perDay ?? []
  const envs = [...new Set(perDay.map((row) => row.env))].sort()
  const isInEnv = (row: { env: string }) => !env || row.env === env

  const dayTotals = sumCounts(perDay.filter(isInEnv), (row) => row.dt)
  const days = [...dayTotals.keys()].sort()
  const firstDay = days[0] ?? ''
  const lastDay =
    payload?.generatedAt?.slice(0, 10) || days[days.length - 1] || ''
  const daily = firstDay
    ? daysBetween(firstDay, lastDay).map((day) => ({
        name: day,
        count: dayTotals.get(day) ?? 0,
      }))
    : []

  const total = daily.reduce((sum, day) => sum + day.count, 0)
  const last30Days = daily.slice(-30)

  // The all-environments ranking has an empty env, like the All option.
  const topRows = (trends?.topPathsPerMonth ?? []).filter(
    (row) => row.env === env
  )
  const months = [...new Set(topRows.map((row) => row.month))]
    .sort()
    .reverse()

  const dimensions = (trends?.perLocaleAndTheme ?? []).filter(isInEnv)

  return {
    envs,
    firstDay,
    lastDay,
    total,
    kpis: [
      {
        value: last30Days.reduce((sum, day) => sum + day.count, 0),
        label: 'Views, last 30 days',
      },
      { value: total, label: 'Views in total' },
    ],
    last30Days,
    perWeek: rank(
      sumCounts(daily, (day) => mondayOf(day.name)),
      { sort: 'key' }
    ),
    perMonth: rank(
      sumCounts(daily, (day) => day.name.slice(0, 7)),
      { sort: 'key' }
    ),
    topPathsPerMonth: months.map((month) => ({
      month,
      paths: topRows
        .filter((row) => row.month === month)
        .map((row) => ({ name: row.path, count: row.count }))
        .sort((a, b) => b.count - a.count),
    })),
    perLocale: rank(sumCounts(dimensions, (row) => row.locale)),
    perTheme: rank(sumCounts(dimensions, (row) => row.theme)),
  }
}
