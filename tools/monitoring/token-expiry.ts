import type { Check } from './report-incident.ts'

const DAY = 86_400_000
const WARN_WITHIN_DAYS = 14
const HEADER = 'GitHub-Authentication-Token-Expiration'

export function daysUntilExpiry(headers: Headers, now = Date.now()) {
  const expiresAt = Date.parse(headers.get(HEADER) ?? '')
  return Number.isNaN(expiresAt)
    ? undefined
    : Math.floor((expiresAt - now) / DAY)
}

export function tokenExpiryCheck(
  name: string,
  headers: Headers,
  now = Date.now()
): Check {
  const header = headers.get(HEADER)
  if (!header) {
    return { name, ok: true, detail: 'no expiry date reported' }
  }
  const daysLeft = daysUntilExpiry(headers, now)
  if (daysLeft === undefined) {
    return { name, ok: false, detail: 'unreadable expiry date' }
  }

  const date = new Date(header).toISOString().slice(0, 10)
  const when =
    daysLeft === 0
      ? 'today'
      : `in ${daysLeft} ${daysLeft === 1 ? 'day' : 'days'}`
  return {
    name,
    ok: daysLeft > WARN_WITHIN_DAYS,
    detail: `expires ${when} (${date})`,
  }
}
