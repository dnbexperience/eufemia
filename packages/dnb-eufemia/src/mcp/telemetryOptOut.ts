const OFF_VALUES: ReadonlySet<string> = new Set([
  '0',
  'false',
  'off',
  'no',
])

function normalize(value: string | undefined) {
  return (value ?? '').trim().toLowerCase()
}

function isFlagSet(value: string | undefined) {
  const normalized = normalize(value)
  return normalized !== '' && !OFF_VALUES.has(normalized)
}

/**
 * True when telemetry is switched off: the tool's own variable set to
 * `0|false|off|no`, the cross-tool `DO_NOT_TRACK` convention, or a CI
 * environment. Has no imports, so the skills CLI can use it without loading
 * the MCP server.
 */
export function isTelemetryOptedOut(
  env: NodeJS.ProcessEnv,
  variable: string
): boolean {
  return (
    OFF_VALUES.has(normalize(env[variable])) ||
    isFlagSet(env.DO_NOT_TRACK) ||
    isFlagSet(env.CI)
  )
}
