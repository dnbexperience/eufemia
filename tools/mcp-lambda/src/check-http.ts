import { buildReport } from '../../monitoring/report.ts'
import type {
  Check,
  CheckOptions,
  Report,
} from '../../monitoring/report.ts'
import { createProbe } from '../../monitoring/probe.ts'
import { runDiagnosticCli } from '../../monitoring/diagnostic-cli.ts'

const endpoint = 'https://server.eufemia.dnb.no/mcp/web'
const deployments =
  'https://api.github.com/repos/dnbexperience/eufemia/actions/workflows/mcp-lambda.yml/runs?per_page=20'
const graceMs = 60 * 60_000
const protocols = ['2025-11-25', '2026-07-28'] as const
const clientInfo = { name: 'eufemia-health-monitor', version: '1.0.0' }
const requiredTools = [
  'docs_meta',
  'docs_search',
  'docs_read',
  'component_find',
  'component_props',
  'component_doc',
  'review_rules',
]

type Options = CheckOptions & { githubToken?: string }

export async function checkHttpMcp(
  options: Options = {}
): Promise<Report> {
  const request = options.fetch ?? fetch
  const now = options.now ?? Date.now()
  const checks: Check[] = []
  const probe = createProbe(checks, options.sleep)

  async function json(url: string, init?: RequestInit) {
    const response = await request(url, {
      ...init,
      ...(url === deployments
        ? {
            headers: {
              Accept: 'application/vnd.github+json',
              ...(options.githubToken
                ? { Authorization: `Bearer ${options.githubToken}` }
                : {}),
            },
          }
        : {}),
      redirect: 'error',
      signal: AbortSignal.timeout(20_000),
    })
    if (response.status !== 200) {
      await response.body?.cancel()
      throw new Error(`HTTP ${response.status} at ${url}`)
    }
    const type = response.headers.get('content-type')?.split(';')[0]
    if (type !== 'application/json' && type !== 'text/event-stream') {
      await response.body?.cancel()
      throw new Error('Expected JSON or an MCP event stream')
    }
    const reader = response.body?.getReader()
    if (!reader) {
      throw new Error('Empty response')
    }
    const chunks: Uint8Array[] = []
    let eventBuffer = ''
    const decoder = new TextDecoder()
    let size = 0
    try {
      while (true) {
        const { value, done } = await reader.read()
        if (done) {
          break
        }
        size += value.length
        if (size > 1024 * 1024) {
          throw new Error('Response exceeds 1 MiB')
        }
        chunks.push(value)
        if (type === 'text/event-stream') {
          eventBuffer += decoder.decode(value, { stream: true })
          const events = eventBuffer.split(/\r?\n\r?\n/)
          eventBuffer = events.pop() ?? ''
          for (const event of events) {
            const data = event
              .split(/\r?\n/)
              .filter((line) => line.startsWith('data:'))
              .map((line) => line.slice(5).trimStart())
              .join('\n')
            if (data) {
              const message = JSON.parse(data)
              if (message.id === 1) {
                return message
              }
            }
          }
        }
      }
    } finally {
      await reader.cancel()
    }
    const text = Buffer.concat(chunks).toString()
    if (type === 'text/event-stream') {
      throw new Error('Missing MCP response in event stream')
    }
    return JSON.parse(text)
  }

  async function rpc(
    protocol: (typeof protocols)[number],
    method: string,
    params: Record<string, unknown> = {}
  ) {
    const modern = protocol === '2026-07-28'
    const payload = await json(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/event-stream',
        'MCP-Protocol-Version': protocol,
        ...(modern
          ? {
              'MCP-Method': method,
              ...(typeof params.name === 'string'
                ? { 'MCP-Name': params.name }
                : {}),
            }
          : {}),
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method,
        params: modern
          ? {
              ...params,
              _meta: {
                'io.modelcontextprotocol/protocolVersion': protocol,
                'io.modelcontextprotocol/clientInfo': clientInfo,
                'io.modelcontextprotocol/clientCapabilities': {},
              },
            }
          : params,
      }),
    })
    if (
      payload.jsonrpc !== '2.0' ||
      payload.id !== 1 ||
      payload.error ||
      !payload.result ||
      payload.result.isError ||
      (modern && payload.result.resultType !== 'complete')
    ) {
      throw new Error(`Invalid or unsuccessful MCP ${method} response`)
    }
    return payload.result
  }

  const deployment = probe('deployment source', async () => {
    const data = await json(deployments)
    const run = data.workflow_runs?.find(
      (run: { event: string; head_repository?: { full_name?: string } }) =>
        ['push', 'workflow_dispatch'].includes(run.event) &&
        run.head_repository?.full_name === 'dnbexperience/eufemia'
    )
    if (
      !run ||
      !/^[a-f0-9]{40}$/.test(run.head_sha) ||
      !Number.isFinite(Date.parse(run.created_at)) ||
      Date.parse(run.created_at) > now + 5 * 60_000
    ) {
      throw new Error('No valid MCP deployment run found')
    }
    if (run.status === 'completed' && run.conclusion !== 'success') {
      throw new Error(
        `Latest MCP deployment workflow concluded ${run.conclusion}`
      )
    }
    const inProgress = run.status !== 'completed'
    if (inProgress && now - Date.parse(run.created_at) >= graceMs) {
      throw new Error(
        'Latest MCP deployment workflow has not completed within one hour'
      )
    }
    const completed = Date.parse(run.updated_at)
    return {
      sha: run.head_sha as string,
      started:
        !inProgress && Number.isFinite(completed)
          ? completed
          : Date.parse(run.created_at),
      inProgress,
    }
  })
  const health = probe('HTTP health', async () => {
    const data = await json('https://server.eufemia.dnb.no/healthz')
    if (data.status !== 'ok') {
      throw new Error('Health endpoint did not report ok')
    }
  })

  const metadata = await Promise.all(
    protocols.map(async (protocol) => {
      await probe(`${protocol} negotiation`, async () => {
        const result = await rpc(
          protocol,
          protocol === '2026-07-28' ? 'server/discover' : 'initialize',
          protocol === '2026-07-28'
            ? {}
            : { protocolVersion: protocol, capabilities: {}, clientInfo }
        )
        const info =
          result.serverInfo ??
          result._meta?.['io.modelcontextprotocol/serverInfo']
        if (
          info?.name !== 'eufemia' ||
          !(
            result.supportedVersions?.includes(protocol) ||
            result.protocolVersion === protocol
          ) ||
          !result.capabilities?.tools
        ) {
          throw new Error(
            'Expected Eufemia MCP protocol and tools capability'
          )
        }
      })
      await probe(`${protocol} tools`, async () => {
        const result = await rpc(protocol, 'tools/list')
        const tools = result.tools?.map(
          (tool: { name: string }) => tool.name
        )
        if (
          !Array.isArray(tools) ||
          requiredTools.some((tool) => !tools.includes(tool))
        ) {
          throw new Error('Required documentation tools are missing')
        }
      })
      await probe(`${protocol} documentation`, async () => {
        const result = await rpc(protocol, 'tools/call', {
          name: 'component_doc',
          arguments: { name: 'Button' },
        })
        const text = toolText(result)
        if (
          !text.includes('# Button') ||
          !text.includes('@dnb/eufemia') ||
          text.length < 200
        ) {
          throw new Error('Button documentation is missing or invalid')
        }
      })
      return probe(`${protocol} metadata`, async () => {
        const result = await rpc(protocol, 'tools/call', {
          name: 'docs_meta',
          arguments: {},
        })
        const meta = JSON.parse(toolText(result))
        const generated = Date.parse(meta.generatedAt)
        if (
          !/^[a-f0-9]{7,40}$/.test(meta.commit) ||
          !Number.isFinite(generated) ||
          generated > now + 5 * 60_000 ||
          typeof meta.eufemiaVersion !== 'string'
        ) {
          throw new Error(
            'Documentation source metadata is missing or invalid'
          )
        }
        return meta.commit as string
      })
    })
  )
  const source = await deployment
  await health
  if (source) {
    if (source.inProgress) {
      checks.push({
        name: 'deployment rollout',
        ok: false,
        pending: true,
        detail: 'Public MCP deployment workflow is still running',
      })
    }
    metadata.forEach((commit, index) => {
      if (commit) {
        const matches = source.sha.startsWith(commit)
        checks.push({
          name: `${protocols[index]} deployed source`,
          ok: matches,
          pending: !matches && now - source.started < graceMs,
          detail: `Serving ${commit}; expected ${source.sha}`,
        })
      }
    })
  }
  return buildReport(checks, now, source?.sha)
}

function toolText(result: {
  content?: { type: string; text?: string }[]
}) {
  return (
    result.content
      ?.filter((item) => item.type === 'text')
      .map((item) => item.text ?? '')
      .join('\n') ?? ''
  )
}

await runDiagnosticCli(import.meta.url, 'MCP', () =>
  checkHttpMcp({ githubToken: process.env.GH_TOKEN })
)
