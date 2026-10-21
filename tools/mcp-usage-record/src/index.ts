// The MCP usage record and the field rules shared by the analytics ingest
// (tools/analytics) and the web MCP Lambda (tools/mcp-lambda).

/** Which MCP transport produced the event. Stamped server-side, never trusted from the client. */
export type McpUsageTransport = 'local' | 'web'

/** The stored MCP usage record (one row in the mcp_usage Glue table). */
export type McpUsageRecord = {
  tool: string
  component: string
  component_missed: boolean
  likely_component: string
  path: string
  env: string
  transport: McpUsageTransport
  eufemia_version: string
  timestamp: string
  created_at: string
}

// The registered docs-server tools. A record is written only for a call to one
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
// component on any other tool is dropped.
export const COMPONENT_TOOLS: ReadonlySet<string> = new Set([
  'component_find',
  'component_doc',
  'component_api',
  'component_props',
])

// Tools whose event carries a doc path. A path on any other tool is dropped.
const PATH_TOOL_NAMES = ['docs_read', 'docs_list'] as const

export type PathTool = (typeof PATH_TOOL_NAMES)[number]

export const PATH_TOOLS: ReadonlySet<string> = new Set(PATH_TOOL_NAMES)

export function isPathTool(tool: string): tool is PathTool {
  return PATH_TOOLS.has(tool)
}

const MAX_COMPONENT_LENGTH = 64
const MAX_PATH_LENGTH = 512

// A component name is one or more dot-separated segments. Each segment starts
// with a letter and may contain letters, digits, and hyphens, so both the
// PascalCase form ("DatePicker", "Field.Address") and the hyphenated doc-file
// form ("date-picker") validate. A single character class keeps matching linear
// (no nested-quantifier ReDoS).
export const COMPONENT_SEGMENT = /^[A-Za-z][A-Za-z0-9-]*$/

// An absolute docs path with a restricted character set.
export const PATH_PATTERN = /^\/[A-Za-z0-9/_.-]*$/

/**
 * Reduce a docs path to the shape the docs server resolves it to: forward
 * slashes, a single leading slash, and no empty, `.` or trailing segments. This
 * mirrors `normalizeDocsPath` in the docs server, so `/uilib/button.md`,
 * `uilib/button.md`, `/uilib/./button.md` and `\uilib\button.md` all name the
 * same document and are stored under one key. A test in tools/mcp-lambda pins
 * the parity, so this package stays free of dependencies.
 */
function canonicalDocsPath(value: string): string {
  const segments = value
    .replaceAll('\\', '/')
    .split('/')
    .filter((segment) => segment !== '' && segment !== '.')

  return segments.length === 0 ? '' : `/${segments.join('/')}`
}

// Mirror the docs server's normalizeName (trim + lowercase) so the stored value
// is the form a successful lookup resolves against, and casing variants of the
// same component fold into a single aggregate.
export function normalizeComponent(value: string): string {
  return value.trim().toLowerCase()
}

// Keeps the original casing, as the docs server sees it; '' when invalid.
export function parseComponentName(value: unknown): string {
  if (typeof value !== 'string' || value.length > MAX_COMPONENT_LENGTH) {
    return ''
  }

  const trimmed = value.trim()

  return trimmed.length > 0 &&
    trimmed.split('.').every((segment) => COMPONENT_SEGMENT.test(segment))
    ? trimmed
    : ''
}

export function parseDocsPath(value: unknown): string {
  if (typeof value !== 'string') {
    return ''
  }

  // Drop any query string or fragment so no incidental data is stored.
  const raw = value.split(/[?#]/)[0] ?? ''

  // Bound and reject traversal on the raw value, before collapsing segments, so
  // canonicalisation cannot mask a `..` the check would otherwise catch.
  if (raw.length > MAX_PATH_LENGTH || raw.includes('..')) {
    return ''
  }

  const path = canonicalDocsPath(raw)

  return PATH_PATTERN.test(path) ? path : ''
}

export function decodeEventBody(
  body: string,
  isBase64Encoded: boolean
): string {
  return isBase64Encoded
    ? Buffer.from(body, 'base64').toString('utf8')
    : body
}
