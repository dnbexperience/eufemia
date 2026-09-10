/**
 * Anonymous MCP usage record: "someone called this tool", captured server-side
 * from the JSON-RPC request. Only closed, validated fields are stored — the tool
 * name (from the fixed registered set) plus an optional component or doc path
 * derived from the tool's arguments. The user's free-text query is never stored.
 *
 * Validation is structural (closed character sets, bounded length, no traversal),
 * so nothing incidental in an argument can reach storage. It is not an
 * existence check: an unknown-but-well-formed component name is still recorded.
 */

/** The stored MCP usage record (one row in the mcp_usage Glue table). */
export type McpUsageRecord = {
  tool: string
  component: string
  path: string
  env: string
  timestamp: string
  createdat: string
}

// The registered docs-server tools. A record is written only for calls to one of
// these, so an unknown or malformed method never reaches storage.
export const KNOWN_TOOLS: ReadonlySet<string> = new Set([
  'docs_entry',
  'docs_meta',
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

// A single PascalCase segment; a component name is one or more of these joined
// by dots (Button, Field.Address). Validating per segment keeps matching linear
// and avoids a nested-quantifier regex.
const COMPONENT_SEGMENT = /^[A-Z][A-Za-z0-9]*$/

// An absolute docs path with a restricted character set.
const PATH_PATTERN = /^\/[A-Za-z0-9/_.-]*$/

function validComponent(value: unknown): string {
  if (typeof value !== 'string' || value.length > MAX_COMPONENT_LENGTH) {
    return ''
  }

  return value
    .split('.')
    .every((segment) => COMPONENT_SEGMENT.test(segment))
    ? value
    : ''
}

function validPath(value: unknown): string {
  if (typeof value !== 'string') {
    return ''
  }

  // Drop any query string or fragment so no incidental data is stored.
  const path = value.split(/[?#]/)[0] ?? ''

  return path.length <= MAX_PATH_LENGTH &&
    PATH_PATTERN.test(path) &&
    !path.includes('..')
    ? path
    : ''
}

type JsonRpcMessage = {
  method?: unknown
  params?: { name?: unknown; arguments?: unknown }
}

function recordFromMessage(
  message: JsonRpcMessage,
  env: string,
  createdAt: string
): McpUsageRecord | null {
  if (message.method !== 'tools/call') {
    return null
  }

  const tool = message.params?.name
  if (typeof tool !== 'string' || !KNOWN_TOOLS.has(tool)) {
    return null
  }

  const args = (message.params?.arguments ?? {}) as Record<string, unknown>

  const component = COMPONENT_TOOLS.has(tool)
    ? validComponent(args.name)
    : ''
  const path =
    tool === 'docs_read'
      ? validPath(args.path)
      : tool === 'docs_list'
        ? validPath(args.prefix)
        : ''

  return {
    tool,
    component,
    path,
    env,
    timestamp: createdAt,
    createdat: createdAt,
  }
}

/**
 * Extract anonymous usage records from a raw JSON-RPC request body. Accepts a
 * single message or a batch array; anything that is not a `tools/call` for a
 * known tool is ignored. Malformed JSON yields no records, so usage capture
 * never affects the request.
 */
export function usageRecordsFromRequestBody(
  body: string,
  options: { env: string; now?: string }
): McpUsageRecord[] {
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
      const record = recordFromMessage(
        message as JsonRpcMessage,
        options.env,
        createdAt
      )
      if (record) {
        records.push(record)
      }
    }
  }

  return records
}
