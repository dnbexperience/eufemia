import { services, serviceName } from './monitor.ts'
import type { Service } from './monitor.ts'
import type { NotificationState, Observation } from './notifications.ts'

const hour = 3600000
const oslo = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Oslo',
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
})

// Small hourly buckets bound the shared DynamoDB item, including extra checks.
export type WeeklyState = {
  since: string
  hours: Record<
    string,
    Partial<Record<Service, [number, number, number, number]>>
  >
  sent?: string
  pending?: { at: string; text: string }
}

export function recordWeeklyObservation(
  state: NotificationState,
  event: Extract<Observation, { kind: 'service' }>,
  incident: boolean
) {
  const at = Date.parse(event.report.checkedAt)
  const weekly = (state.weekly ??= {
    since: event.report.checkedAt,
    hours: {},
  })
  const bucket = Math.floor(at / hour)
  const newest = Math.max(bucket, ...Object.keys(weekly.hours).map(Number))
  if (bucket > newest - 24 * 15) {
    const sources = (weekly.hours[bucket] ??= {})
    const counts = (sources[event.service] ??= [0, 0, 0, 0])
    counts[{ healthy: 0, unhealthy: 1, pending: 2 }[event.report.status]]++
    counts[3] += Number(incident)
  }
  for (const key of Object.keys(weekly.hours)) {
    if (Number(key) <= newest - 24 * 15) {
      delete weekly.hours[key]
    }
  }
}

export function weeklyPeriod(at: string) {
  const end = Date.parse(at)
  const local = Object.fromEntries(
    oslo.formatToParts(end).map(({ type, value }) => [type, value])
  )
  if (
    local.weekday !== 'Mon' ||
    local.hour !== '09' ||
    local.minute !== '00' ||
    local.second !== '00'
  ) {
    throw new Error('Invalid weekly report time')
  }
  // The preceding Monday can have a different UTC offset.
  const previous = end - 7 * 24 * hour
  const previousHour = Number(
    oslo.formatToParts(previous).find(({ type }) => type === 'hour')?.value
  )
  return { start: previous + (9 - previousHour) * hour, end }
}

const descriptions: Record<Service, string> = {
  CDN: 'public assets',
  MCP: 'HTTP server',
  Analytics: 'API and dashboard',
  Tokens: 'scheduled workflows',
}

export function weeklyText(state: NotificationState, at: string) {
  const { start, end } = weeklyPeriod(at)
  const since = Math.max(start, Date.parse(state.weekly?.since ?? at))
  const firstHour = Math.ceil(since / hour)
  const expected = Math.max(0, end / hour - firstHour)
  const alarms = Object.values(state.alarms ?? {}).filter(
    ({ status }) => status === 'ALARM'
  ).length
  return [
    '*Eufemia monitoring weekly report*',
    'Period (UTC): ' +
      new Date(since).toISOString() +
      ' to ' +
      new Date(end).toISOString(),
    ...(since > start
      ? ['Partial week: weekly statistics started during this period.']
      : []),
    ...services.map((service) => {
      const source = state.sources[service]
      const counts = [0, 0, 0, 0]
      let observed = 0
      for (const [key, sources] of Object.entries(
        state.weekly?.hours ?? {}
      )) {
        const bucket = Number(key)
        const values = sources[service]
        if (
          values &&
          bucket >= Math.floor(since / hour) &&
          bucket < end / hour
        ) {
          values.forEach((value, index) => {
            counts[index] += value
          })
          if (bucket >= firstHour) {
            observed++
          }
        }
      }
      const status = !source
        ? 'no observations'
        : end - Date.parse(source.at) >= 2 * hour
          ? 'stale (last: ' + source.status + ')'
          : source.status
      return [
        serviceName(service) +
          ' (' +
          descriptions[service] +
          '): ' +
          status,
        'Observations: ' +
          (counts[0] + counts[1] + counts[2]) +
          ' (' +
          counts[0] +
          ' healthy, ' +
          counts[1] +
          ' failed, ' +
          counts[2] +
          ' pending); new incidents: ' +
          counts[3],
        observed +
          '/' +
          expected +
          ' full hourly windows observed; ' +
          (expected - observed) +
          ' missing',
        'Latest observation: ' + (source?.at ?? 'none'),
      ].join('\n')
    }),
    'Active monitor alarms: ' + alarms + '.',
    'Counts are accepted observations, including smoke checks and retries. Multiple observations in one UTC hour cover only one hourly window. Missing windows indicate monitoring gaps, not confirmed service downtime.',
    'These checks run from AWS against public endpoints; they do not verify access from the internal network. A delivered report confirms this notification path worked at delivery time.',
  ].join('\n\n')
}
