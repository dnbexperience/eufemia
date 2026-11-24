/**
 * Anonymous MCP usage record: "someone called this tool", captured server-side
 * for each tool that ran. Only closed, validated fields are stored — the tool
 * name (from the fixed registered set) plus an optional component or doc path
 * derived from the tool's arguments. The user's free-text query is never stored.
 *
 * Validation is structural first (closed character sets, bounded length, no
 * traversal), so nothing incidental in an argument can reach storage. A
 * component or path that passes is then checked against the docs through the
 * {@link UsageResolver}, so a name that does not exist is dropped and the event
 * degrades to a tool count plus a miss flag.
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
import type { ToolCall } from '../tool-calls.js'

/** Mirrors `UsageResolver` in mcp-docs-server; declared here so this module doesn't import the docs server. */
export type UsageResolver = {
  component: (name: string) => Promise<boolean>
  componentDocName: (name: string) => Promise<string | null>
  docsFile: (path: string) => Promise<boolean>
  docsDir: (path: string) => Promise<boolean>
}

export type WebMcpUsageRecord = McpUsageRecord & { transport: 'web' }

// captureUsage stamps the served docs version before enqueueing.
export type WebMcpUsageRecordWithoutVersion = Omit<
  WebMcpUsageRecord,
  'eufemia_version'
>

const PATH_TOOL_ARGUMENTS: Record<
  PathTool,
  { argument: string; check: 'docsFile' | 'docsDir' }
> = {
  docs_read: { argument: 'path', check: 'docsFile' },
  docs_list: { argument: 'prefix', check: 'docsDir' },
}

async function recordFromToolCall(
  { name: tool, input }: ToolCall,
  env: string,
  createdAt: string,
  resolver: UsageResolver
): Promise<WebMcpUsageRecordWithoutVersion | null> {
  if (!KNOWN_TOOLS.has(tool)) {
    return null
  }

  const args = (input ?? {}) as Record<string, unknown>

  const rawComponent = COMPONENT_TOOLS.has(tool)
    ? parseComponentName(args.name)
    : ''
  // "DatePicker" and "date-picker" count as one component
  const component =
    rawComponent && (await resolver.component(rawComponent))
      ? normalizeComponent(
          (await resolver.componentDocName(rawComponent)) ?? rawComponent
        )
      : ''
  const componentMissed = rawComponent !== '' && component === ''

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
    skill: '',
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
 * Build anonymous usage records from the tools that ran during one request.
 * A call to a tool outside the known set is ignored.
 */
export async function usageRecordsFromToolCalls(
  toolCalls: ToolCall[],
  options: { env: string; now?: string; resolver: UsageResolver }
): Promise<WebMcpUsageRecordWithoutVersion[]> {
  const createdAt = options.now ?? new Date().toISOString()

  const records = await Promise.all(
    toolCalls.map((toolCall) =>
      recordFromToolCall(
        toolCall,
        options.env,
        createdAt,
        options.resolver
      )
    )
  )

  return records.filter((record) => record !== null)
}
