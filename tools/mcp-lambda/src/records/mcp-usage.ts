/**
 * Anonymous MCP usage record: "someone called this tool", captured server-side
 * from the JSON-RPC request. Only closed, validated fields are stored — the tool
 * name (from the fixed registered set) plus an optional component or doc path
 * derived from the tool's arguments. The user's free-text query is never stored.
 *
 * Validation is structural first (closed character sets, bounded length, no
 * traversal), so nothing incidental in an argument can reach storage. A
 * component or path that passes is then checked against the docs through the
 * {@link UsageResolver}, so a name that does not exist is dropped and the event
 * degrades to a tool count. Component names and doc paths are stored in the form
 * the docs server resolves them to, so one component or document groups under
 * one key however the caller spelled it.
 */

/** Mirrors `UsageResolver` in mcp-docs-server; declared here to stay dependency-free. */
export type UsageResolver = {
  component: (name: string) => Promise<boolean>
  docsFile: (path: string) => Promise<boolean>
  docsDir: (path: string) => Promise<boolean>
}

/** The stored MCP usage record (one row in the mcp_usage Glue table). */
export type McpUsageRecord = {
  tool: string
  component: string
  path: string
  env: string
  transport: 'web'
  timestamp: string
  created_at: string
}

// The registered docs-server tools. A record is written only for calls to one of
// these, so an unknown or malformed method never reaches storage.
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

// Tools whose `name` argument is a component (a closed, public vocabulary).
const COMPONENT_TOOLS: ReadonlySet<string> = new Set([
  'component_find',
  'component_doc',
  'component_api',
  'component_props',
])

const MAX_COMPONENT_LENGTH = 64
const MAX_PATH_LENGTH = 512

// A component name is one or more dot-separated segments. Each segment starts
// with a letter and may contain letters, digits, and hyphens, so both the
// PascalCase form ("DatePicker", "Field.Address") and the hyphenated doc-file
// form ("date-picker") validate. A single character class keeps matching linear
// (no nested-quantifier ReDoS).
const COMPONENT_SEGMENT = /^[A-Za-z][A-Za-z0-9-]*$/

// An absolute docs path with a restricted character set.
const PATH_PATTERN = /^\/[A-Za-z0-9/_.-]*$/

/**
 * Reduce a docs path to the shape the docs server resolves it to: forward
 * slashes, a single leading slash, and no empty, `.` or trailing segments. This
 * mirrors `normalizeDocsPath` in docs-source.ts, which converts back-slashes,
 * accepts a path with or without a leading slash, and collapses those segments
 * before reading the file — so `/uilib/button.md`, `uilib/button.md`,
 * `/uilib/./button.md` and `\uilib\button.md` all name the same document and
 * must be stored under one key. Parity with the real normaliser is pinned by
 * test rather than by importing it, so this module stays free of dependencies.
 */
function canonicalDocsPath(value: string): string {
  const segments = value
    .replaceAll('\\', '/')
    .split('/')
    .filter((segment) => segment !== '' && segment !== '.')

  return segments.length === 0 ? '' : `/${segments.join('/')}`
}

// Mirror the docs server's normalizeName (trim + lowercase) so the stored value
// is the form a successful lookup resolves against. Without this, a resolving
// call for a hyphenated component ("date-picker") would be dropped while a
// non-resolving PascalCase name ("DatePicker") would be the one stored; it also
// folds casing variants of the same component into a single aggregate.
function normalizeComponent(value: string): string {
  return value.trim().toLowerCase()
}

// Original casing, as the docs tool sees it; lowercased only when stored.
function parseComponentName(value: unknown): string {
  if (typeof value !== 'string' || value.length > MAX_COMPONENT_LENGTH) {
    return ''
  }

  const trimmed = value.trim()

  return trimmed.length > 0 &&
    trimmed.split('.').every((segment) => COMPONENT_SEGMENT.test(segment))
    ? trimmed
    : ''
}

function parseDocsPath(value: unknown): string {
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

type JsonRpcMessage = {
  method?: unknown
  params?: { name?: unknown; arguments?: unknown }
}

async function recordFromMessage(
  message: JsonRpcMessage,
  env: string,
  createdAt: string,
  resolver: UsageResolver
): Promise<McpUsageRecord | null> {
  if (message.method !== 'tools/call') {
    return null
  }

  const tool = message.params?.name
  if (typeof tool !== 'string' || !KNOWN_TOOLS.has(tool)) {
    return null
  }

  const args = (message.params?.arguments ?? {}) as Record<string, unknown>

  const rawComponent = COMPONENT_TOOLS.has(tool)
    ? parseComponentName(args.name)
    : ''
  const component =
    rawComponent && (await resolver.component(rawComponent))
      ? normalizeComponent(rawComponent)
      : ''

  const candidatePath =
    tool === 'docs_read'
      ? parseDocsPath(args.path)
      : tool === 'docs_list'
        ? parseDocsPath(args.prefix)
        : ''
  const exists =
    tool === 'docs_read' ? resolver.docsFile : resolver.docsDir
  const path =
    candidatePath && (await exists(candidatePath)) ? candidatePath : ''

  return {
    tool,
    component,
    path,
    env,
    // The web Lambda writes this producer's rows only; the local (stdio)
    // server stamps 'local' via the ingest route in tools/analytics.
    transport: 'web',
    timestamp: createdAt,
    created_at: createdAt,
  }
}

/**
 * Extract anonymous usage records from a raw JSON-RPC request body. Accepts a
 * single message or a batch array; anything that is not a `tools/call` for a
 * known tool is ignored. Malformed JSON yields no records, so usage capture
 * never affects the request.
 */
export async function usageRecordsFromRequestBody(
  body: string,
  options: { env: string; now?: string; resolver: UsageResolver }
): Promise<McpUsageRecord[]> {
  let parsed: unknown
  try {
    parsed = JSON.parse(body)
  } catch {
    return []
  }

  const messages = Array.isArray(parsed) ? parsed : [parsed]
  const createdAt = options.now ?? new Date().toISOString()

  const records: McpUsageRecord[] = []
  for (const message of messages) {
    if (typeof message === 'object' && message !== null) {
      const record = await recordFromMessage(
        message as JsonRpcMessage,
        options.env,
        createdAt,
        options.resolver
      )
      if (record) {
        records.push(record)
      }
    }
  }

  return records
}
