import { createHash } from 'node:crypto'
import type { Report } from '../../monitoring/report-incident.ts'
import { logFailure } from './diagnostics.ts'

export type Observation =
  | { kind: 'service'; service: 'CDN' | 'MCP'; report: Report }
  | { kind: 'alarm'; name: string; status: 'ALARM' | 'OK'; at: string }
type Source = {
  at: string
  status: Report['status']
  checks: number
  incidents: number
  downtimeMs: number
  outage?: { started: string; thread?: string }
}
type Pending = {
  type: 'outage' | 'recovery'
  source: string
  id: string
  text: string
  thread?: string
}
export type NotificationState = {
  sources: Record<string, Source>
  history?: { source: string; started: string; recovered: string }[]
  alarms?: Record<string, { at: string; status: 'ALARM' | 'OK' }>
  summary?: string
  pending?: Pending
}
type Dependencies = {
  load: () => Promise<NotificationState>
  save: (state: NotificationState) => Promise<void>
  post: (text: string, id: string, thread?: string) => Promise<string>
  update: (timestamp: string, text: string) => Promise<void>
}

function messageId(value: string) {
  const hash = createHash('sha256').update(value).digest('hex')
  return [
    hash.slice(0, 8),
    hash.slice(8, 12),
    '4' + hash.slice(13, 16),
    '8' + hash.slice(17, 20),
    hash.slice(20, 32),
  ].join('-')
}

export function summaryText(state: NotificationState) {
  const rows = Object.entries(state.sources).sort(([a], [b]) =>
    a.localeCompare(b)
  )
  const latest = state.history?.at(-1)
  return [
    '*Eufemia monitoring overview*',
    ...rows.map(([name, source]) => {
      const duration =
        source.downtimeMs +
        (source.outage
          ? Math.max(
              0,
              Date.parse(source.at) - Date.parse(source.outage.started)
            )
          : 0)
      const runs =
        name === 'Monitoring'
          ? ''
          : ', ' + source.checks + ' observed checks'
      return (
        name +
        ': ' +
        source.status +
        runs +
        ', ' +
        source.incidents +
        ' incidents, ' +
        Math.round(duration / 60000) +
        ' minutes observed incident time. Last observation: ' +
        source.at
      )
    }),
    ...(latest
      ? [
          'Recent recovery: ' +
            latest.source +
            ', ' +
            latest.started +
            ' to ' +
            latest.recovered,
        ]
      : []),
    'Observed incident time runs from the first failed check to the first healthy check. Hourly sampling cannot measure exact downtime. Freshness and monitor failures are not necessarily service outages.',
    'Counts begin when this summary is initialized. Missing checks are reported separately as monitoring incidents.',
  ].join('\n')
}

// The notifier Lambda has reserved concurrency 1, serializing this shared state.
export async function processNotification(
  event: Observation,
  dependencies: Dependencies
) {
  const state = await dependencies.load()
  async function deliver() {
    const pending = state.pending
    if (!pending) {
      return
    }
    const timestamp = await dependencies.post(
      pending.text,
      pending.id,
      pending.thread
    )
    const source = state.sources[pending.source]
    if (pending.type === 'outage' && source?.outage) {
      source.outage.thread = timestamp
    } else if (pending.type === 'recovery' && source) {
      if (source.outage) {
        source.downtimeMs += Math.max(
          0,
          Date.parse(source.at) - Date.parse(source.outage.started)
        )
        state.history ??= []
        state.history.push({
          source: pending.source,
          started: source.outage.started,
          recovered: source.at,
        })
        state.history = state.history.slice(-50)
      }
      delete source.outage
    }
    delete state.pending
    await dependencies.save(state)
  }
  await deliver()

  const name = event.kind === 'service' ? event.service : 'Monitoring'
  const at = event.kind === 'service' ? event.report.checkedAt : event.at
  const previous = state.sources[name]
  let status: Report['status']
  let accept: boolean
  if (event.kind === 'alarm') {
    state.alarms ??= {}
    const old = state.alarms[event.name]
    accept = !old || Date.parse(at) > Date.parse(old.at)
    if (accept) {
      state.alarms[event.name] = { at, status: event.status }
    }
    status = Object.values(state.alarms).some(
      (alarm) => alarm.status === 'ALARM'
    )
      ? 'unhealthy'
      : 'healthy'
  } else {
    accept = !previous || Date.parse(at) > Date.parse(previous.at)
    status = event.report.status
  }
  if (accept) {
    const source: Source = previous ?? {
      at,
      status,
      checks: 0,
      incidents: 0,
      downtimeMs: 0,
    }
    // Different alarms may arrive out of order. Preserve the newest group time.
    source.at =
      !previous || Date.parse(at) > Date.parse(previous.at)
        ? at
        : previous.at
    source.status =
      status === 'pending' && source.outage ? 'unhealthy' : status
    if (event.kind === 'service') {
      source.checks++
    }
    state.sources[name] = source
    if (status === 'unhealthy' && !source.outage) {
      source.outage = { started: source.at }
      source.incidents++
      const checks =
        event.kind === 'service'
          ? event.report.checks
              .filter((check) => !check.ok && !check.pending)
              .map((check) => check.name)
              .join(', ')
          : 'Monitor-health alarm active. Check AWS logs and delivery.'
      state.pending = {
        type: 'outage',
        source: name,
        id: messageId(name + ':' + source.outage.started + ':outage'),
        text:
          'Eufemia ' +
          name +
          ' incident detected.\n' +
          checks +
          '\nFirst observed: ' +
          source.outage.started,
      }
    } else if (status === 'healthy' && source.outage) {
      if (!source.outage.thread) {
        throw new Error('Incident thread is not recorded')
      }
      const duration = Math.max(
        0,
        Date.parse(source.at) - Date.parse(source.outage.started)
      )
      state.pending = {
        type: 'recovery',
        source: name,
        thread: source.outage.thread,
        id: messageId(name + ':' + source.outage.started + ':recovery'),
        text:
          'Eufemia ' +
          name +
          ' recovered.\nObserved incident window: ' +
          Math.round(duration / 60000) +
          ' minutes.\nHealthy at: ' +
          source.at,
      }
    }
    await dependencies.save(state)
    await deliver()
  }
  // The overview must not interrupt incident delivery or create replacement posts.
  try {
    if (!state.summary) {
      state.summary = await dependencies.post(
        summaryText(state),
        messageId('eufemia-monitoring-summary')
      )
      await dependencies.save(state)
    } else {
      await dependencies.update(state.summary, summaryText(state))
    }
  } catch (error) {
    logFailure('notifications', 'summary update', error)
  }
}
