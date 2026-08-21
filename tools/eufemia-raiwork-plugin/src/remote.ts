import path from 'node:path'
import { readCanonicalManifest, readPluginConfig } from './config.ts'
import type { BuildPaths, RemoteVerificationReport } from './types.ts'

type FetchFunction = typeof fetch

const parseMcpResponse = (text: string, contentType: string | null) => {
  if (contentType?.includes('text/event-stream')) {
    const data = text
      .split(/\r?\n/)
      .find((line) => line.startsWith('data:'))
      ?.slice(5)
      .trim()
    if (!data) {
      throw new Error('Hosted MCP returned an empty event stream')
    }
    return JSON.parse(data) as unknown
  }
  return JSON.parse(text) as unknown
}

export async function verifyHostedMcp(
  paths: BuildPaths,
  fetchFunction: FetchFunction = fetch
): Promise<RemoteVerificationReport> {
  const canonicalManifest = await readCanonicalManifest(
    path.join(paths.canonicalSkillsRoot, 'manifest.json')
  )
  const config = await readPluginConfig(
    paths.configPath,
    canonicalManifest
  )
  const response = await fetchFunction(config.plugin.mcp.endpointUrl, {
    method: 'POST',
    headers: {
      accept: 'application/json, text/event-stream',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/list',
      params: {},
    }),
    signal: AbortSignal.timeout(10_000),
  })
  if (!response.ok) {
    throw new Error(
      `Hosted Eufemia MCP returned HTTP ${response.status}: ${response.statusText}`
    )
  }

  const payload = parseMcpResponse(
    await response.text(),
    response.headers.get('content-type')
  ) as {
    error?: { message?: string }
    result?: { tools?: Array<{ name?: string }> }
  }
  if (payload.error) {
    throw new Error(
      `Hosted Eufemia MCP error: ${payload.error.message ?? 'Unknown error'}`
    )
  }

  const availableTools = (payload.result?.tools ?? [])
    .map(({ name }) => name)
    .filter((name): name is string => Boolean(name))
    .sort()
  const available = new Set(availableTools)
  const requiredTools = Array.from(
    new Set(
      canonicalManifest.skills.flatMap(
        ({ requiredTools }) => requiredTools
      )
    )
  ).sort()
  const missingRequired = requiredTools.filter(
    (tool) => !available.has(tool)
  )
  if (missingRequired.length > 0) {
    throw new Error(
      `Hosted Eufemia MCP is missing required tools: ${missingRequired.join(', ')}`
    )
  }

  return {
    endpointUrl: config.plugin.mcp.endpointUrl,
    availableTools,
    requiredTools,
    missingOptionalTools: canonicalManifest.optionalTools.filter(
      (tool) => !available.has(tool)
    ),
  }
}
