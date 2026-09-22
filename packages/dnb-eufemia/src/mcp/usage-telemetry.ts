/**
 * Anonymous, opt-out usage telemetry for the local (stdio) Eufemia MCP server.
 *
 * The local server ships inside `@dnb/eufemia` and runs on public,
 * open-source machines, so it can hold neither a secret nor an IAM role. It
 * therefore uses the browser model: it POSTs an anonymous record to an
 * edge-locked ingest route (Akamai injects `X-Edge-Auth`); the client holds
 * nothing. The ingest side (route, validator, store) lives in `tools/analytics`.
 *
 * Anonymity is the gate. Only a closed, public vocabulary leaves the machine:
 * the tool name (from the fixed registered set), an optional component name or
 * doc path (shape-validated), and the running Eufemia version (semver). No
 * machine id, install id, IP, session/correlation id or free text — in
 * particular a `docs_search` event is a tool count only and never carries its
 * query.
 *
 * The beacon is fire-and-forget: it is never awaited on the tool-call path,
 * uses a short abort timeout, and swallows every error, so telemetry can
 * neither block nor break an MCP response.
 */

import fs from 'node:fs'
import path from 'node:path'

const DEFAULT_ENDPOINT =
  'https://server.eufemia.dnb.no/analytics/collect-local-mcp-usage'

/** Abort the beacon quickly; it must never delay the process. */
const BEACON_TIMEOUT_MS = 1000

const FIRST_RUN_NOTICE =
  'Eufemia MCP collects anonymous usage stats; disable with EUFEMIA_MCP_TELEMETRY=0'

// The registered docs-server tools. A record is emitted only for a call to one
// of these, so an unknown method never produces a beacon. Kept in sync with the
// ingest validator's KNOWN_TOOLS (tools/analytics/src/records/mcp-usage.ts).
export const KNOWN_TOOLS: ReadonlySet<string> = new Set([
  'docs_entry',
  'docs_meta',
  'portal_content_workflow',
  'review_rules',
  'docs_index',
  'docs_list',
  'docs_read',
  'docs_search',
  'component_find',
  'component_doc',
  'component_api',
  'component_props',
])

// Tools whose event carries a component (a closed, public vocabulary). A
// component on any other tool — including docs_search — is never sent.
const COMPONENT_TOOLS: ReadonlySet<string> = new Set([
  'component_find',
  'component_doc',
  'component_api',
  'component_props',
])

// Tools whose event carries a doc path. docs_search is deliberately absent, so
// neither its prefix nor its query text is ever captured.
const PATH_TOOLS: ReadonlySet<string> = new Set(['docs_read', 'docs_list'])

const MAX_COMPONENT_LENGTH = 64
const MAX_PATH_LENGTH = 512

// A component name is one or more dot-separated PascalCase segments, so both
// "DatePicker" and the compound "Field.Address" validate. A single character
// class per segment keeps matching linear (no nested-quantifier ReDoS).
const COMPONENT_SEGMENT = /^[A-Z][A-Za-z0-9]*$/

// An absolute docs path with a restricted character set.
const PATH_PATTERN = /^\/[A-Za-z0-9/_.-]*$/

/**
 * The anonymous record sent to the ingest route. `transport` is stamped
 * server-side (always `local` here), so the client never sends it.
 */
export type LocalMcpUsageRecord = {
  tool: string
  component?: string
  path?: string
  eufemiaVersion: string
  timestamp: string
}

function isValidComponent(value: unknown): value is string {
  if (
    typeof value !== 'string' ||
    value.length === 0 ||
    value.length > MAX_COMPONENT_LENGTH
  ) {
    return false
  }
  return value
    .split('.')
    .every((segment) => COMPONENT_SEGMENT.test(segment))
}

function isValidPath(value: unknown): value is string {
  if (typeof value !== 'string' || value.length > MAX_PATH_LENGTH) {
    return false
  }
  // Reject traversal outright; never send a `..` string as a doc path.
  if (value.includes('..')) {
    return false
  }
  return PATH_PATTERN.test(value)
}

/**
 * Build the anonymous record for a tool call, or `null` when the tool is not
 * one of the known tools. Only the allowlisted closed-vocabulary fields are
 * ever read from the input: `component` from a component tool's `name`, and
 * `path` from `docs_read`'s `path` / `docs_list`'s `prefix`. Anything that
 * fails shape validation is dropped, so the event degrades to a tool count
 * rather than leaking free text.
 */
export function buildUsageRecord(
  toolName: string,
  input: unknown,
  eufemiaVersion: string
): LocalMcpUsageRecord | null {
  if (!KNOWN_TOOLS.has(toolName)) {
    return null
  }

  const args =
    input && typeof input === 'object' && !Array.isArray(input)
      ? (input as Record<string, unknown>)
      : {}

  const record: LocalMcpUsageRecord = {
    tool: toolName,
    eufemiaVersion,
    timestamp: new Date().toISOString(),
  }

  if (COMPONENT_TOOLS.has(toolName) && isValidComponent(args.name)) {
    record.component = args.name
  }

  if (PATH_TOOLS.has(toolName)) {
    const rawPath = toolName === 'docs_read' ? args.path : args.prefix
    if (isValidPath(rawPath)) {
      record.path = rawPath
    }
  }

  return record
}

/** True when telemetry is switched off via `EUFEMIA_MCP_TELEMETRY=0|false`. */
export function isTelemetryDisabled(
  env: NodeJS.ProcessEnv = process.env
): boolean {
  const value = (env.EUFEMIA_MCP_TELEMETRY ?? '').trim().toLowerCase()
  return value === '0' || value === 'false'
}

/**
 * POST the record to the ingest route. Fire-and-forget: bounded by a short
 * abort timeout and swallowing every error, so it can neither block nor throw
 * on the tool-call path.
 */
async function sendBeacon(
  record: LocalMcpUsageRecord,
  endpoint: string,
  fetchImpl: typeof fetch
): Promise<void> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), BEACON_TIMEOUT_MS)
  try {
    await fetchImpl(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(record),
      signal: controller.signal,
    })
  } catch {
    // Fire-and-forget: telemetry must never surface an error.
  } finally {
    clearTimeout(timer)
  }
}

// Guard the first-run notice so it prints at most once per process, even if a
// reporter is created more than once.
let noticePrinted = false

export type UsageReporter = {
  onToolCall: (toolName: string, input: unknown) => void
}

export type UsageReporterOptions = {
  /** The running Eufemia version, sent with every record. */
  eufemiaVersion: string
  /** Environment used for the opt-out gate and endpoint override. */
  env?: NodeJS.ProcessEnv
  /** Overridable for tests; defaults to the global `fetch`. */
  fetchImpl?: typeof fetch
  /** Sink for the one-line first-run notice; defaults to `stderr`. */
  logNotice?: (message: string) => void
}

/**
 * Create the usage reporter, or `null` when telemetry is opted out. The
 * returned `onToolCall` is synchronous and non-blocking: it builds the record
 * and dispatches the beacon without awaiting, and swallows every error, so it
 * is safe to call on the tool-call path.
 */
export function createUsageReporter(
  options: UsageReporterOptions
): UsageReporter | null {
  const env = options.env ?? process.env
  if (isTelemetryDisabled(env)) {
    return null
  }

  const endpoint =
    env.EUFEMIA_MCP_TELEMETRY_ENDPOINT?.trim() || DEFAULT_ENDPOINT
  const fetchImpl = options.fetchImpl ?? globalThis.fetch
  // stdout is the MCP transport channel, so the notice goes to stderr.
  const logNotice =
    options.logNotice ??
    ((message: string) => {
      // eslint-disable-next-line no-console -- MCP stdio reserves stdout
      console.error(message)
    })

  if (!noticePrinted) {
    noticePrinted = true
    logNotice(FIRST_RUN_NOTICE)
  }

  return {
    onToolCall(toolName, input) {
      try {
        const record = buildUsageRecord(
          toolName,
          input,
          options.eufemiaVersion
        )
        if (!record || typeof fetchImpl !== 'function') {
          return
        }
        // Fire-and-forget: never awaited on the tool-call path.
        void sendBeacon(record, endpoint, fetchImpl)
      } catch {
        // Telemetry must never affect the tool call.
      }
    },
  }
}

/**
 * Read the running Eufemia version from the package's own `package.json`.
 *
 * Walks up from `startDir` to the nearest `@dnb/eufemia` `package.json`, so it
 * resolves both in the published layout (`.../@dnb/eufemia/mcp/mcp-server.js`
 * → `../package.json`) and in this source tree (`src/mcp/` →
 * `../../package.json`). Returns the development placeholder on any failure —
 * reading the version must never break the server.
 */
export function readEufemiaVersion(
  startDir: string = process.argv[1]
    ? path.dirname(process.argv[1])
    : process.cwd()
): string {
  try {
    let dir = path.resolve(startDir)
    // Bound the walk so a missing package.json can never loop forever.
    for (let i = 0; i < 12; i++) {
      const candidate = path.join(dir, 'package.json')
      try {
        const raw = fs.readFileSync(candidate, 'utf8')
        const pkg = JSON.parse(raw) as { name?: string; version?: string }
        if (
          pkg.name === '@dnb/eufemia' &&
          typeof pkg.version === 'string'
        ) {
          return pkg.version
        }
      } catch {
        // Not here or unreadable; keep walking up.
      }
      const parent = path.dirname(dir)
      if (parent === dir) {
        break
      }
      dir = parent
    }
  } catch {
    // Fall through to the placeholder.
  }
  return '0.0.0-development'
}
