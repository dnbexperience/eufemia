import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda'
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js'
import server from '../server.js'

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

  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  })

  // The MCP SDK McpServer supports sequential connect/close cycles on
  // the same instance. Each Lambda invocation creates a fresh transport,
  // connects, handles one request, and closes in `finally`. On warm
  // starts the same `server` singleton is reused — this is safe because
  // `close()` resets the transport binding before the next invocation.
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
