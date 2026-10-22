/**
 * Anonymous MCP usage record: the "someone called this tool" event, sent to the
 * edge-locked ingest route by an MCP server that cannot write S3 directly.
 *
 * The local (stdio) Eufemia MCP server runs on public, open-source machines, so
 * it can hold neither a secret nor an IAM role. It therefore uses the browser
 * model — an edge-locked HTTP route (Akamai injects `X-Edge-Auth`) — instead of
 * the direct-S3 path the web Lambda uses. The HTTP handler validates an
 * untrusted request body with {@link validateMcpUsage} and builds the stored
 * object with {@link buildMcpUsageRecord}.
 *
 * Only closed, validated fields are stored — the tool name (from the fixed
 * registered set), an optional component or doc path, a miss flag with the
 * real component a missed name matches, a coarse environment label and the
 * Eufemia version (validated to a semver shape). No identifiers, IP or free
 * text are accepted, so nothing incidental in the request can reach storage.
 *
 * Validation here is structural only: this side has no docs, so the producers
 * (web Lambda and local server) check that a component or path exists before
 * sending it.
 */

import {
  COMPONENT_TOOLS,
  KNOWN_TOOLS,
  PATH_TOOLS,
  normalizeComponent,
  parseComponentName,
  parseDocsPath,
  type McpUsageRecord,
  type McpUsageTransport,
} from 'eufemia-usage-ingest'
import {
  isIsoTimestamp,
  isValidEnv,
  parseIngestBatch,
  type ValidationResult,
} from './shared.js'

const MAX_VERSION_LENGTH = 64

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
  componentMissed?: true
  likelyComponent?: string
  path?: string
  env?: string
  eufemiaVersion?: string
  timestamp?: string
}

/**
 * Validate an untrusted ingest payload (one event or an array) into a batch of
 * MCP usage events. `transport` is stamped server-side by
 * {@link buildMcpUsageRecord}, never taken from the client.
 */
export function validateMcpUsage(
  input: unknown
): ValidationResult<McpUsageInput> {
  const batch = parseIngestBatch(input)
  if (!batch.ok) {
    return batch
  }

  const errors: string[] = []
  const value: McpUsageInput[] = []

  batch.value.forEach((event, index) => {
    if (
      typeof event !== 'object' ||
      event === null ||
      Array.isArray(event)
    ) {
      errors.push(`Event ${index} must be a JSON object`)
      return
    }

    const {
      tool,
      component,
      componentMissed,
      likelyComponent,
      path,
      env,
      eufemiaVersion,
      timestamp,
    } = event as Record<string, unknown>
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
      // An unrecognised optional dimension is dropped (the built record
      // defaults it), so a stale or malformed value costs one dimension.
      const normalizedComponent = normalizeComponent(
        parseComponentName(component)
      )
      const normalizedLikelyComponent = normalizeComponent(
        parseComponentName(likelyComponent)
      )
      const normalizedPath = parseDocsPath(path)

      value.push({
        tool: tool as string,
        ...(normalizedComponent ? { component: normalizedComponent } : {}),
        ...(componentMissed === true
          ? { componentMissed: true as const }
          : {}),
        ...(normalizedLikelyComponent
          ? { likelyComponent: normalizedLikelyComponent }
          : {}),
        ...(normalizedPath ? { path: normalizedPath } : {}),
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
 * dimension can never be attributed to a tool it does not belong to; a miss is
 * kept only for a component tool call that resolved no component. Every
 * absent field defaults so the row shape is stable.
 */
export function buildMcpUsageRecord(
  input: McpUsageInput,
  createdAt: string,
  transport: McpUsageTransport
): McpUsageRecord {
  const isComponentTool = COMPONENT_TOOLS.has(input.tool)
  const component = isComponentTool ? (input.component ?? '') : ''
  const componentMissed =
    isComponentTool && component === '' && input.componentMissed === true

  return {
    tool: input.tool,
    component,
    component_missed: componentMissed,
    likely_component: componentMissed ? (input.likelyComponent ?? '') : '',
    path: PATH_TOOLS.has(input.tool) ? (input.path ?? '') : '',
    env: input.env ?? 'unknown',
    transport,
    eufemia_version: input.eufemiaVersion ?? 'unknown',
    timestamp: input.timestamp ?? createdAt,
    created_at: createdAt,
  }
}
