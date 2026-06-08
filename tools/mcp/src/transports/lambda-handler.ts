import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda'
import { timingSafeEqual } from 'node:crypto'
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js'
import server from '../server.js'

let cachedApiKey: string | null = null

async function getApiKey(): Promise<string | null> {
  if (cachedApiKey) {
    return cachedApiKey
  }

  const ssmName = process.env.MCP_API_KEY_SSM
  if (!ssmName) {
    return null
  }

  // @aws-sdk/client-ssm is provided by the Lambda runtime
  const { SSMClient, GetParameterCommand } = await (import(
    '@aws-sdk/client-ssm'
  ) as Promise<typeof import('@aws-sdk/client-ssm')>)
  const ssm = new SSMClient({})
  const result = await ssm.send(
    new GetParameterCommand({ Name: ssmName, WithDecryption: true })
  )

  cachedApiKey = result.Parameter?.Value ?? null
  return cachedApiKey
}

function isValidApiKey(provided: string, expected: string): boolean {
  const a = Buffer.from(provided)
  const b = Buffer.from(expected)
  if (a.length !== b.length) {
    return false
  }

  return timingSafeEqual(a, b)
}

function toWebRequest(event: APIGatewayProxyEventV2): Request {
  const headers = new Headers()
  for (const [key, value] of Object.entries(event.headers)) {
    if (value) {
      headers.set(key, value)
    }
  }

  const url = `https://${event.requestContext.domainName}${event.rawPath}`
  const method = event.requestContext.http.method

  return new Request(url, {
    method,
    headers,
    body: method !== 'GET' && method !== 'HEAD' ? event.body : undefined,
  })
}

async function toApiGatewayResult(
  response: Response
): Promise<APIGatewayProxyResultV2> {
  const headers: Record<string, string> = {}
  response.headers.forEach((value, key) => {
    headers[key] = value
  })

  return {
    statusCode: response.status,
    headers,
    body: await response.text(),
  }
}

export async function handler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  const apiKey = await getApiKey()
  if (!apiKey) {
    return {
      statusCode: 503,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        error: { code: -32603, message: 'Server misconfigured' },
        id: null,
      }),
    }
  }

  const providedKey = event.headers['x-api-key']
  if (!providedKey || !isValidApiKey(providedKey, apiKey)) {
    return {
      statusCode: 401,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        error: { code: -32600, message: 'Unauthorized' },
        id: null,
      }),
    }
  }

  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  })

  // The server singleton supports sequential connect/close cycles.
  // Each invocation creates a fresh transport and closes it in finally.
  await server.connect(transport)

  try {
    const request = toWebRequest(event)
    const response = await transport.handleRequest(request)

    return toApiGatewayResult(response)
  } catch (error) {
    console.error('MCP handler error:', error)

    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        error: { code: -32603, message: 'Internal server error' },
        id: null,
      }),
    }
  } finally {
    await transport.close()
  }
}
