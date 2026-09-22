/**
 * Anonymous MCP usage record: the "someone called this tool" event, sent to the
 * edge-locked ingest route by an MCP server that cannot write S3 directly.
 *
 * The local (stdio) Eufemia MCP server runs on public, open-source machines, so
 * it can hold neither a secret nor an IAM role. It therefore uses the browser
 * model — an edge-locked HTTP route (Akamai injects `X-Edge-Auth`) — instead of
 * the direct-S3 path the web Lambda uses. This module is the single source of
 * truth for the MCP-usage shape on the ingest side: the HTTP handler validates
 * an untrusted request body with {@link validateMcpUsage} and builds the stored
 * object with {@link buildMcpUsageRecord}.
 *
 * Only closed, validated fields are stored — the tool name (from the fixed
 * registered set), an optional component or doc path, a coarse environment
 * label and the Eufemia version (validated to a semver shape). No identifiers,
 * IP or free text are accepted, so nothing incidental in the request can reach
 * storage.
 *
 * This intentionally duplicates the server-side validator in
 * tools/mcp-lambda/src/records/mcp-usage.ts (`analytics` keeps its own
 * `src/records/`). The two copies must be kept in sync.
 */

/** Which MCP transport produced the event. Stamped server-side, never trusted from the client. */
export type McpUsageTransport = 'local' | 'web'

// The registered docs-server tools. A record is accepted only for a call to one
// of these, so an unknown or malformed method never reaches storage.
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
// component on any other tool is dropped when the record is built.
const COMPONENT_TOOLS: ReadonlySet<string> = new Set([
  'component_find',
  'component_doc',
  'component_api',
  'component_props',
])

// Tools whose event carries a doc path. A path on any other tool is dropped.
const PATH_TOOLS: ReadonlySet<string> = new Set(['docs_read', 'docs_list'])

const MAX_BATCH = 50
const MAX_COMPONENT_LENGTH = 64
const MAX_PATH_LENGTH = 512
const MAX_VERSION_LENGTH = 64

/** A short lowercase environment token, e.g. `prod`, `dev`. */
const ENV_PATTERN = /^[a-z][a-z0-9-]{0,31}$/

// A component name is one or more dot-separated PascalCase segments, so both
// "DatePicker" and the compound "Field.Address" validate. A single character
// class per segment keeps matching linear (no nested-quantifier ReDoS).
const COMPONENT_SEGMENT = /^[A-Z][A-Za-z0-9]*$/

// An absolute docs path with a restricted character set.
const PATH_PATTERN = /^\/[A-Za-z0-9/_.-]*$/

// A semver shape (major.minor.patch with optional pre-release/build metadata).
// This validates the shape, not membership of a real release, so an arbitrary
// free-text string cannot be stored in the version field.
const SEMVER_CORE = /^\d+\.\d+\.\d+$/
const SEMVER_IDENTIFIER = /^[0-9A-Za-z-]+$/

/**
 * True only for a semver-shaped string: `major.minor.patch`, each a plain
 * number, with optional dot-separated pre-release (after `-`) and build
 * (after `+`) identifiers. Split on the separators first and validate each
 * identifier with a single, non-quantified character class, rather than one
 * regex with multiple optional quantified groups (avoids a ReDoS-shaped
 * pattern for a negligible-benefit optimisation).
 */
function isSemver(value: string): boolean {
  const buildSplit = value.split('+')
  if (buildSplit.length > 2) {
    return false
  }
  const [withoutBuild, build] = buildSplit
  if (
    build !== undefined &&
    !build.split('.').every((id) => SEMVER_IDENTIFIER.test(id))
  ) {
    return false
  }

  const preSplit = (withoutBuild ?? '').split('-')
  const core = preSplit[0] ?? ''
  const pre = preSplit.slice(1).join('-')

  if (!SEMVER_CORE.test(core)) {
    return false
  }

  return (
    pre === '' || pre.split('.').every((id) => SEMVER_IDENTIFIER.test(id))
  )
}

/** A single anonymous MCP usage event sent by an MCP server. */
export type McpUsageInput = {
  tool: string
  component?: string
  path?: string
  env?: string
  eufemiaVersion?: string
  timestamp?: string
}

/** The stored MCP usage record (one row in the mcp_usage Glue table). */
export type McpUsageRecord = {
  tool: string
  component: string
  path: string
  env: string
  transport: McpUsageTransport
  eufemiaVersion: string
  timestamp: string
  createdat: string
}

type ValidationFailure = { ok: false; errors: string[] }

export type McpUsageValidationResult =
  | { ok: true; value: McpUsageInput[] }
  | ValidationFailure

// An unrecognised value for these optional dimensions is dropped here (so the
// built record defaults it), rather than rejecting the whole event — a stale or
// malformed value costs one dimension, never lets free text through.
function isValidEnv(value: unknown): value is string {
  return typeof value === 'string' && ENV_PATTERN.test(value)
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

  // Reject traversal outright; never store a `..` string as a doc path.
  if (value.includes('..')) {
    return false
  }

  return PATH_PATTERN.test(value)
}

/**
 * True only for a canonical ISO 8601 UTC timestamp (the form produced by
 * `Date.prototype.toISOString`), rejecting the looser inputs `Date.parse`
 * would otherwise accept, such as `"2026"` or `"March 5"`.
 */
function isIsoTimestamp(value: string): boolean {
  const date = new Date(value)
  return !Number.isNaN(date.getTime()) && date.toISOString() === value
}

/**
 * Validate an untrusted ingest payload into a batch of MCP usage events.
 *
 * Accepts either a single event object or an array of them. `tool` is required
 * and must be one of the registered MCP tools, so an unknown method is rejected
 * rather than stored. An `eufemiaVersion` or `timestamp` with a bad shape also
 * rejects the event. An unrecognised `env`, `component` or `path` is dropped so
 * the built record defaults it, rather than failing the whole event — a stale
 * or malformed value never lets free text reach storage. `transport` is stamped
 * server-side (see {@link buildMcpUsageRecord}) and is ignored if the client
 * sends it.
 */
export function validateMcpUsage(
  input: unknown
): McpUsageValidationResult {
  const events = Array.isArray(input) ? input : [input]

  if (events.length === 0) {
    return { ok: false, errors: ['Body must contain at least one event'] }
  }

  if (events.length > MAX_BATCH) {
    return {
      ok: false,
      errors: [`A batch may contain at most ${MAX_BATCH} events`],
    }
  }

  const errors: string[] = []
  const value: McpUsageInput[] = []

  events.forEach((event, index) => {
    if (
      typeof event !== 'object' ||
      event === null ||
      Array.isArray(event)
    ) {
      errors.push(`Event ${index} must be a JSON object`)
      return
    }

    const { tool, component, path, env, eufemiaVersion, timestamp } =
      event as Record<string, unknown>
    let valid = true

    if (typeof tool !== 'string' || !KNOWN_TOOLS.has(tool)) {
      errors.push(
        `Event ${index}: "tool" must be one of the known MCP tools`
      )
      valid = false
    }

    if (eufemiaVersion !== undefined) {
      if (
        typeof eufemiaVersion !== 'string' ||
        eufemiaVersion.length > MAX_VERSION_LENGTH ||
        !isSemver(eufemiaVersion)
      ) {
        errors.push(
          `Event ${index}: "eufemiaVersion" must be a semver string`
        )
        valid = false
      }
    }

    if (timestamp !== undefined) {
      if (typeof timestamp !== 'string' || !isIsoTimestamp(timestamp)) {
        errors.push(
          `Event ${index}: "timestamp" must be an ISO date string`
        )
        valid = false
      }
    }

    if (valid) {
      value.push({
        tool: tool as string,
        ...(isValidComponent(component) ? { component } : {}),
        ...(isValidPath(path) ? { path } : {}),
        ...(isValidEnv(env) ? { env } : {}),
        ...(typeof eufemiaVersion === 'string' ? { eufemiaVersion } : {}),
        ...(typeof timestamp === 'string' ? { timestamp } : {}),
      })
    }
  })

  if (errors.length > 0) {
    return { ok: false, errors }
  }

  return { ok: true, value }
}

/**
 * Build the stored record from a validated input. `transport` is supplied by
 * the caller (stamped server-side, never trusted from the client). A component
 * is kept only for a component tool and a path only for a path tool, so a
 * dimension can never be attributed to a tool it does not belong to; every
 * absent field defaults so the row shape is stable.
 */
export function buildMcpUsageRecord(
  input: McpUsageInput,
  createdAt: string,
  transport: McpUsageTransport
): McpUsageRecord {
  return {
    tool: input.tool,
    component: COMPONENT_TOOLS.has(input.tool)
      ? (input.component ?? '')
      : '',
    path: PATH_TOOLS.has(input.tool) ? (input.path ?? '') : '',
    env: input.env ?? 'unknown',
    transport,
    eufemiaVersion: input.eufemiaVersion ?? 'unknown',
    timestamp: input.timestamp ?? createdAt,
    createdat: createdAt,
  }
}
