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
 * degrades to a tool count plus a miss flag and the likely component, if any.
 * Component names and doc paths are stored in the form the docs server resolves
 * them to, so one component or document groups under one key however the
 * caller spelled it.
 */

import {
  COMPONENT_TOOLS,
  KNOWN_TOOLS,
  isPathTool,
  normalizeComponent,
  parseComponentName,
  parseDocsPath,
  type McpUsageRecord,
  type PathTool,
} from 'eufemia-usage-ingest'

/** Mirrors `UsageResolver` in mcp-docs-server; declared here so this module doesn't import the docs server. */
export type UsageResolver = {
  component: (name: string) => Promise<boolean>
  likelyComponent: (guess: string) => Promise<string | null>
  docsFile: (path: string) => Promise<boolean>
  docsDir: (path: string) => Promise<boolean>
}

// The web Lambda records no Eufemia version. The miss fields are absent on
// messages queued before they existed.
export type WebMcpUsageRecord = Omit<
  McpUsageRecord,
  'transport' | 'eufemia_version' | 'component_missed' | 'likely_component'
> &
  Partial<
    Pick<McpUsageRecord, 'component_missed' | 'likely_component'>
  > & {
    transport: 'web'
  }

type JsonRpcMessage = {
  method?: unknown
  params?: { name?: unknown; arguments?: unknown }
}

const PATH_TOOL_ARGUMENTS: Record<
  PathTool,
  { argument: string; check: 'docsFile' | 'docsDir' }
> = {
  docs_read: { argument: 'path', check: 'docsFile' },
  docs_list: { argument: 'prefix', check: 'docsDir' },
}

async function recordFromMessage(
  message: JsonRpcMessage,
  env: string,
  createdAt: string,
  resolver: UsageResolver
): Promise<WebMcpUsageRecord | null> {
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
  const componentMissed = rawComponent !== '' && component === ''
  const likelyComponent = componentMissed
    ? ((await resolver.likelyComponent(rawComponent)) ?? '')
    : ''

  const pathTool = isPathTool(tool) ? PATH_TOOL_ARGUMENTS[tool] : undefined
  const candidatePath = pathTool
    ? parseDocsPath(args[pathTool.argument])
    : ''
  const path =
    pathTool &&
    candidatePath &&
    (await resolver[pathTool.check](candidatePath))
      ? candidatePath
      : ''

  return {
    tool,
    component,
    component_missed: componentMissed,
    likely_component: likelyComponent,
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
): Promise<WebMcpUsageRecord[]> {
  let parsed: unknown
  try {
    parsed = JSON.parse(body)
  } catch {
    return []
  }

  const messages = Array.isArray(parsed) ? parsed : [parsed]
  const createdAt = options.now ?? new Date().toISOString()

  const records: WebMcpUsageRecord[] = []
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
