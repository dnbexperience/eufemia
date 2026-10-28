import { afterEach, beforeEach, expect, it, vi } from 'vitest'
const mocks = vi.hoisted(() => ({
  save: vi.fn(),
  check: vi.fn(),
  secret: vi.fn(),
  publish: vi.fn(),
}))
vi.mock('@aws-sdk/client-dynamodb', () => ({
  DynamoDBClient: class {
    send = mocks.save
  },
  GetItemCommand: class {
    constructor(public input: unknown) {}
  },
  PutItemCommand: class {
    constructor(public input: unknown) {}
  },
}))
vi.mock('../../assets/check-cdn.ts', () => ({ checkCdn: mocks.check }))
vi.mock('../../mcp-lambda/src/check-http.ts', () => ({
  checkHttpMcp: mocks.check,
}))
vi.mock('../src/secrets.ts', () => ({ readSecret: mocks.secret }))
vi.mock('../src/publish-observation.ts', () => ({
  publishObservation: mocks.publish,
}))
import { handler } from '../src/handler.ts'
import type { Report } from '../../monitoring/report-incident.ts'

function healthy(): Report {
  return {
    status: 'healthy',
    checkedAt: '2026-10-23T10:00:00Z',
    checks: [],
  }
}

beforeEach(() => {
  vi.resetAllMocks()
  vi.stubEnv('SERVICE', 'CDN')
  vi.stubEnv('STATE_TABLE', 'test')
  vi.stubEnv('AWS_LAMBDA_FUNCTION_NAME', 'test-cdn')
  vi.stubEnv('NOTIFICATIONS_ENABLED', 'true')
  vi.stubEnv('ALERT_TOPIC_ARN', 'test-topic')
  vi.stubEnv('GITHUB_TOKEN_SECRET_ARN', '')
  mocks.check.mockResolvedValue({
    status: 'healthy',
    checkedAt: '2026-10-23T10:00:00Z',
    checks: [],
  })
  mocks.save.mockResolvedValue({})
  mocks.publish.mockResolvedValue(undefined)
  vi.spyOn(process.stdout, 'write').mockReturnValue(true)
})
afterEach(() => {
  vi.unstubAllEnvs()
  vi.restoreAllMocks()
})
it('publishes observations and never reads a Slack credential in the check function', async () => {
  expect(await handler()).toEqual({ service: 'CDN', status: 'healthy' })
  expect(mocks.publish).toHaveBeenCalledWith(
    'test-topic',
    expect.objectContaining({ kind: 'service', service: 'CDN' })
  )
  expect(mocks.secret).not.toHaveBeenCalled()
})
it('does not publish while notifications are disabled', async () => {
  vi.stubEnv('NOTIFICATIONS_ENABLED', 'false')
  await handler()
  expect(mocks.publish).not.toHaveBeenCalled()
})
it('still checks public MCP when its optional GitHub credential is unavailable', async () => {
  vi.stubEnv('SERVICE', 'MCP')
  vi.stubEnv('GITHUB_TOKEN_SECRET_ARN', 'test-secret')
  mocks.secret.mockRejectedValue(new Error('secret value'))
  expect(await handler()).toEqual({ service: 'MCP', status: 'unhealthy' })
  expect(mocks.check).toHaveBeenCalledWith(
    expect.objectContaining({ githubToken: undefined })
  )
})
it('reports SNS failure with a safe stage and no completion metric', async () => {
  mocks.publish.mockRejectedValue(
    Object.assign(new Error('secret token'), {
      name: 'AuthorizationErrorException',
    })
  )
  await expect(handler()).rejects.toThrow(
    'Service monitor could not complete'
  )
  const output = vi
    .mocked(process.stdout.write)
    .mock.calls.map(([line]) => String(line))
    .join('')
  expect(output).toContain('publish observation')
  expect(output).toContain('AuthorizationErrorException')
  expect(output).not.toContain('secret token')
  expect(output).not.toContain('"Completed":1')
})

it.each(['CDN', 'MCP'])(
  'runs %s with its own state and emits complete EMF lines',
  async (service) => {
    vi.stubEnv('SERVICE', service)
    const output = vi.spyOn(process.stdout, 'write').mockReturnValue(true)
    expect(await handler()).toEqual({ service, status: 'healthy' })
    expect(mocks.save.mock.calls[0]?.[0].input).toEqual({
      TableName: 'test',
      Key: { service: { S: service } },
      ConsistentRead: true,
    })
    const lines = output.mock.calls.map(([line]) => String(line))
    expect(lines.every((line) => line.endsWith('\n'))).toBe(true)
    const events = lines.map((line) => JSON.parse(line))
    expect(events.find((event) => event.Completed === 1)).toMatchObject({
      FunctionName: 'test-cdn',
      _aws: { CloudWatchMetrics: [{ Dimensions: [['FunctionName']] }] },
    })
    expect(mocks.secret).not.toHaveBeenCalled()
  }
)

it('bounds outgoing checks and lets their timeout report reach persistence', async () => {
  vi.stubEnv('NOTIFICATIONS_ENABLED', 'false')
  const deadline = new AbortController()
  vi.spyOn(AbortSignal, 'timeout').mockReturnValue(deadline.signal)
  vi.spyOn(process.stdout, 'write').mockReturnValue(true)
  const request = vi.fn(async (_input: unknown, init?: RequestInit) => {
    expect(init?.signal?.aborted).toBe(true)
    throw new Error('Request timed out')
  })
  vi.stubGlobal('fetch', request)
  mocks.check.mockImplementation(async (options) => {
    deadline.abort()
    await expect(
      options.fetch('https://assets.eufemia.dnb.no')
    ).rejects.toThrow('Request timed out')
    await options.sleep(2000)
    return {
      ...healthy(),
      status: 'unhealthy',
      checks: [
        { name: 'CDN asset', ok: false, detail: 'Request timed out' },
      ],
    }
  })
  try {
    expect(await handler()).toEqual({
      service: 'CDN',
      status: 'unhealthy',
    })
    expect(request).toHaveBeenCalledOnce()
    expect(AbortSignal.timeout).toHaveBeenCalledWith(330_000)
    expect(mocks.save).toHaveBeenCalledTimes(2)
  } finally {
    vi.unstubAllGlobals()
  }
})

it('emits no completion heartbeat after a storage failure and sanitizes SDK errors', async () => {
  const output = vi.spyOn(process.stdout, 'write').mockReturnValue(true)
  mocks.save.mockRejectedValue(new Error('secret credentials'))
  await expect(handler()).rejects.toThrow(
    /^Service monitor could not complete/
  )
  const events = output.mock.calls.map(([line]) =>
    JSON.parse(String(line))
  )
  expect(events.find((event) => event.Completed)).toBeUndefined()
  expect(events.find((event) => event.MonitorError === 1)).toBeDefined()
  expect(JSON.stringify(events)).not.toContain('secret credentials')
})

it.each([
  ['load', 'AccessDeniedException'],
  ['save', 'ProvisionedThroughputExceededException'],
])(
  'logs the %s failure without exposing the message',
  async (stage, name) => {
    const output = vi.spyOn(process.stdout, 'write').mockReturnValue(true)
    const error = Object.assign(new Error('secret URL and credentials'), {
      name,
    })
    if (stage === 'load') {
      mocks.save.mockRejectedValueOnce(error)
    } else if (stage === 'save') {
      mocks.save.mockResolvedValueOnce({}).mockRejectedValueOnce(error)
    }
    await expect(handler()).rejects.toThrow(
      /^Service monitor could not complete/
    )
    const events = output.mock.calls.map(([line]) =>
      JSON.parse(String(line))
    )
    expect(events).toContainEqual(
      expect.objectContaining({ stage, error: name })
    )
    expect(JSON.stringify(events)).not.toContain(
      'secret URL and credentials'
    )
  }
)
