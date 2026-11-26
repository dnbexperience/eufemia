import { isTelemetryOptedOut } from '../mcp/telemetryOptOut.js'

/**
 * Anonymous, opt-out usage stats for `eufemia skills install|update|uninstall`.
 *
 * Only a closed vocabulary leaves the machine: the action, one of the known
 * skills folders (any other folder is sent as `custom`, never as a path) and
 * the Eufemia version. No machine, user or project identifier is sent.
 */

const ENDPOINT =
  'https://server.eufemia.dnb.no/analytics/collect-skill-installs'

const POST_TIMEOUT_MS = 1000

const NOTICE =
  'Eufemia collects anonymous skills install stats; disable with EUFEMIA_SKILLS_TELEMETRY=0 or DO_NOT_TRACK=1'

export type SkillInstallEvent = {
  action: 'install' | 'update' | 'uninstall'
  target: string
  eufemiaVersion: string
}

export type ReportSkillInstalls = (
  events: SkillInstallEvent[]
) => Promise<void>

type ReportSkillInstallsOptions = {
  env?: NodeJS.ProcessEnv
  fetchImpl?: typeof fetch
  notice?: (message: string) => void
}

export async function reportSkillInstalls(
  events: SkillInstallEvent[],
  {
    env = process.env,
    fetchImpl = fetch,
    notice = console.error,
  }: ReportSkillInstallsOptions = {}
) {
  if (
    events.length === 0 ||
    isTelemetryOptedOut(env, 'EUFEMIA_SKILLS_TELEMETRY')
  ) {
    return
  }

  notice(NOTICE)

  try {
    await fetchImpl(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(events),
      signal: AbortSignal.timeout(POST_TIMEOUT_MS),
    })
  } catch {
    // Stats must never fail the command.
  }
}
