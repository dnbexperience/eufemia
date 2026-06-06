import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import server from '../server.js'

export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  const body = JSON.parse(event.body || '{}')

  // Route JSON-RPC methods: initialize, tools/list, tools/call
  // Parse the method, call server accordingly, return JSON-RPC response

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(result),
  }
}
