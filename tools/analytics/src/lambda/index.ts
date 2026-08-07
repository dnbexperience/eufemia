import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda'
import { isAuthorized, json } from './http.js'
import { storeRecord } from './store.js'
import { InvalidQueryError, retrieveRecords } from './retrieve.js'
import { validateRecordInput } from '../types.js'

function parseBody(event: APIGatewayProxyEventV2): unknown {
  if (!event.body) {
    return undefined
  }

  const raw = event.isBase64Encoded
    ? Buffer.from(event.body, 'base64').toString('utf8')
    : event.body

  return JSON.parse(raw)
}

async function handleStore(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  let payload: unknown
  try {
    payload = parseBody(event)
  } catch {
    return json(400, { error: 'Body must be valid JSON' })
  }

  const validation = validateRecordInput(payload)
  if (!validation.ok) {
    return json(400, {
      error: 'Validation failed',
      details: validation.errors,
    })
  }

  const record = await storeRecord(validation.value)

  return json(201, record)
}

async function handleRetrieve(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  const params = event.queryStringParameters ?? {}

  let limit: number | undefined
  if (params.limit !== undefined) {
    limit = Number(params.limit)
    if (!Number.isFinite(limit)) {
      return json(400, { error: '"limit" must be a number' })
    }
  }

  try {
    const records = await retrieveRecords({ id: params.id, limit })

    return json(200, { records })
  } catch (error) {
    if (error instanceof InvalidQueryError) {
      return json(400, { error: error.message })
    }

    throw error
  }
}

/**
 * HTTP API entry point.
 *
 * Routes:
 * - `GET  /healthz`  liveness probe (open, no auth)
 * - `POST /records`  store a record in S3
 * - `GET  /records`  retrieve records via Athena (optional `id`, `limit`)
 */
export async function handler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  const method = event.requestContext.http.method
  const path = event.rawPath

  if (method === 'GET' && path === '/healthz') {
    return json(200, { status: 'ok' })
  }

  if (!isAuthorized(event.headers)) {
    return json(401, { error: 'Unauthorized' })
  }

  if (method === 'POST' && path === '/records') {
    return handleStore(event)
  }

  if (method === 'GET' && path === '/records') {
    return handleRetrieve(event)
  }

  return json(404, { error: 'Not found' })
}
