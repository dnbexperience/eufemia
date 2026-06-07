import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js'
import server from '../server.js'

function toWebRequest(event: APIGatewayProxyEvent): Request {
  const headers = new Headers()
  for (const [key, value] of Object.entries(event.headers)) {
    if (value) {
      headers.set(key, value)
    }
  }

  const url = `https://${event.headers['Host'] || 'localhost'}${event.path}`
  const method = event.httpMethod

  return new Request(url, {
    method,
    headers,
    body: method !== 'GET' && method !== 'HEAD' ? event.body : undefined,
  })
}

async function toApiGatewayResult(
  response: Response
): Promise<APIGatewayProxyResult> {
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
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  })

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
