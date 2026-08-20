import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda'
import { timingSafeEqual } from 'node:crypto'
import {
  createMcpHandler,
  isLegacyRequest,
  WebStandardStreamableHTTPServerTransport,
} from '@modelcontextprotocol/server'
import { createServer } from '../server.js'

const modernMcpHandler = createMcpHandler(createServer, {
  legacy: 'reject',
})

async function handleLegacyRequest(request: Request): Promise<Response> {
  const server = await createServer()
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  })

  try {
    await server.connect(transport)
    return await transport.handleRequest(request)
  } finally {
    await transport.close()
  }
}

async function handleMcpRequest(request: Request): Promise<Response> {
  if (await isLegacyRequest(request)) {
    return handleLegacyRequest(request)
  }

  return modernMcpHandler.fetch(request)
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

  const hasBody = method !== 'GET' && method !== 'HEAD'
  const body =
    hasBody && event.body != null
      ? event.isBase64Encoded
        ? Buffer.from(event.body, 'base64').toString('utf8')
        : event.body
      : undefined

  return new Request(url, {
    method,
    headers,
    body,
  })
}

// Verifies the X-Edge-Auth header against the configured secret.
function isEdgeAuthorized(event: APIGatewayProxyEventV2): boolean {
  const expected = process.env.EDGE_AUTH_SECRET
  if (!expected) {
    // Fail closed: reject all requests when the secret is not configured.
    console.error(
      '[eufemia] EDGE_AUTH_SECRET is not set — rejecting request'
    )
    return false
  }

  const provided = event.headers['x-edge-auth']
  if (!provided) {
    return false
  }

  const expectedBuf = Buffer.from(expected)
  const providedBuf = Buffer.from(provided)
  if (expectedBuf.length !== providedBuf.length) {
    return false
  }

  return timingSafeEqual(expectedBuf, providedBuf)
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
  if (!isEdgeAuthorized(event)) {
    return {
      statusCode: 403,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        error: { code: -32001, message: 'Forbidden' },
        id: null,
      }),
    }
  }

  // Cheap health check for uptime monitoring: answer without spinning up the
  // MCP transport or touching the docs source.
  if (
    event.requestContext.http.method === 'GET' &&
    event.rawPath === '/healthz'
  ) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'ok' }),
    }
  }

  try {
    const request = toWebRequest(event)
    const response = await handleMcpRequest(request)

    // API Gateway requires a buffered response body.
    return await toApiGatewayResult(response)
  } catch (error) {
    // Lambda surfaces logs to CloudWatch through the console; this is the
    // intended sink for unexpected handler failures.
    // eslint-disable-next-line no-console -- server-side logging to CloudWatch
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
  }
}
