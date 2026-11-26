/**
 * Anonymous skill install record: the `eufemia skills install|update|uninstall`
 * CLI reports the action, the skills folder, a coarse environment label and the
 * Eufemia version. Every field is a closed vocabulary or a validated shape, so
 * no identifiers or free text (such as a custom folder path) reach storage.
 */

import {
  isIsoTimestamp,
  isKnownEnv,
  isSemver,
  parseIngestBatch,
  type ValidationResult,
} from './shared.js'

export type SkillInstallAction = 'install' | 'update' | 'uninstall'

const ACTIONS: ReadonlySet<string> = new Set<SkillInstallAction>([
  'install',
  'update',
  'uninstall',
])

const isSkillInstallAction = (
  value: unknown
): value is SkillInstallAction =>
  typeof value === 'string' && ACTIONS.has(value)

const KNOWN_TARGETS: ReadonlySet<string> = new Set([
  '.claude/skills',
  '.github/skills',
  '.agents/skills',
])

/** A single anonymous skill install event sent by the Eufemia CLI. */
export type SkillInstallInput = {
  action: SkillInstallAction
  target: string
  env?: string
  eufemiaVersion?: string
  timestamp?: string
}

export type SkillInstallRecord = {
  action: SkillInstallAction
  target: string
  env: string
  eufemia_version: string
  timestamp: string
  created_at: string
}

/**
 * Validate an untrusted ingest payload (one event or an array) into a batch of
 * skill install events. A target outside the known folders becomes `custom`.
 */
export function validateSkillInstalls(
  input: unknown
): ValidationResult<SkillInstallInput> {
  const batch = parseIngestBatch(input)
  if (!batch.ok) {
    return batch
  }

  const errors: string[] = []
  const value: SkillInstallInput[] = []

  batch.value.forEach((event, index) => {
    if (
      typeof event !== 'object' ||
      event === null ||
      Array.isArray(event)
    ) {
      errors.push(`Event ${index} must be a JSON object`)
      return
    }

    const { action, target, env, eufemiaVersion, timestamp } =
      event as Record<string, unknown>
    const eventErrors: string[] = []
    const isKnownAction = isSkillInstallAction(action)
    const isTargetString = typeof target === 'string'

    if (!isKnownAction) {
      eventErrors.push(
        `Event ${index}: "action" must be install, update or uninstall`
      )
    }

    if (!isTargetString) {
      eventErrors.push(`Event ${index}: "target" must be a string`)
    }

    if (eufemiaVersion !== undefined && !isSemver(eufemiaVersion)) {
      eventErrors.push(
        `Event ${index}: "eufemiaVersion" must be a semver string`
      )
    }

    if (timestamp !== undefined && !isIsoTimestamp(timestamp)) {
      eventErrors.push(
        `Event ${index}: "timestamp" must be an ISO date string`
      )
    }

    if (eventErrors.length > 0 || !isKnownAction || !isTargetString) {
      errors.push(...eventErrors)
      return
    }

    value.push({
      action,
      target: KNOWN_TARGETS.has(target) ? target : 'custom',
      ...(isKnownEnv(env) ? { env } : {}),
      ...(typeof eufemiaVersion === 'string' ? { eufemiaVersion } : {}),
      ...(typeof timestamp === 'string' ? { timestamp } : {}),
    })
  })

  if (errors.length > 0) {
    return { ok: false, errors }
  }

  return { ok: true, value }
}

/** Build the stored record; every absent field defaults so the row shape is stable. */
export function buildSkillInstallRecord(
  input: SkillInstallInput,
  createdAt: string
): SkillInstallRecord {
  return {
    action: input.action,
    target: input.target,
    env: input.env ?? 'unknown',
    eufemia_version: input.eufemiaVersion ?? 'unknown',
    timestamp: input.timestamp ?? createdAt,
    created_at: createdAt,
  }
}
