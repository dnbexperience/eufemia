import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { Report } from '../../monitoring/report-incident.ts'

const mocks = vi.hoisted(() => ({
  dynamodb: vi.fn(),
  secret: vi.fn(),
  cdn: vi.fn(),
  mcp: vi.fn(),
}))
vi.mock('@aws-sdk/client-dynamodb', () => ({
  DynamoDBClient: class {
    send = mocks.dynamodb
  },
  GetItemCommand: class {
    constructor(public input: unknown) {}
  },
  PutItemCommand: class {
    constructor(public input: unknown) {}
  },
}))
vi.mock('@aws-sdk/client-secrets-manager', () => ({
  SecretsManagerClient: class {
    send = mocks.secret
  },
  GetSecretValueCommand: class {
    constructor(public input: unknown) {}
  },
}))
vi.mock('../../assets/check-cdn.ts', () => ({ checkCdn: mocks.cdn }))
vi.mock('../../mcp-lambda/src/check-http.ts', () => ({
  checkHttpMcp: mocks.mcp,
}))

import { handler } from '../src/handler.ts'

function healthy(): Report {
  return {
    status: 'healthy',
    checkedAt: '2026-10-21T09:00:00Z',
    checks: [],
  }
}

beforeEach(() => {
  vi.resetAllMocks()
  vi.stubEnv('SERVICE', 'CDN')
  vi.stubEnv('STATE_TABLE', 'test-monitoring')
  vi.stubEnv('NOTIFICATIONS_ENABLED', 'false')
  vi.stubEnv('AWS_LAMBDA_FUNCTION_NAME', 'test-cdn-monitor')
  vi.stubEnv('GITHUB_TOKEN_SECRET_ARN', '')
  mocks.dynamodb.mockResolvedValue({})
  mocks.cdn.mockResolvedValue(healthy())
  mocks.mcp.mockResolvedValue(healthy())
})
afterEach(() => {
  vi.unstubAllEnvs()
  vi.restoreAllMocks()
})

describe('Lambda integration', () => {
  it.each(['CDN', 'MCP'])(
    'runs %s with its own state and emits complete EMF lines',
    async (service) => {
      vi.stubEnv('SERVICE', service)
      const output = vi
        .spyOn(process.stdout, 'write')
        .mockReturnValue(true)
      expect(await handler()).toEqual({ service, status: 'healthy' })
      expect(mocks.dynamodb.mock.calls[0]?.[0].input).toEqual({
        TableName: 'test-monitoring',
        Key: { service: { S: service } },
        ConsistentRead: true,
      })
      const lines = output.mock.calls.map(([line]) => String(line))
      expect(lines.every((line) => line.endsWith('\n'))).toBe(true)
      const events = lines.map((line) => JSON.parse(line))
      expect(events.find((event) => event.Completed === 1)).toMatchObject({
        FunctionName: 'test-cdn-monitor',
        _aws: { CloudWatchMetrics: [{ Dimensions: [['FunctionName']] }] },
      })
      expect(mocks.secret).not.toHaveBeenCalled()
    }
  )

  it('still checks public MCP when the optional GitHub credential cannot be read', async () => {
    vi.stubEnv('SERVICE', 'MCP')
    vi.stubEnv('GITHUB_TOKEN_SECRET_ARN', 'test-secret')
    vi.spyOn(process.stdout, 'write').mockReturnValue(true)
    mocks.secret.mockRejectedValue(new Error('secret credentials'))
    expect(await handler()).toEqual({
      service: 'MCP',
      status: 'unhealthy',
    })
    expect(mocks.mcp).toHaveBeenCalledWith(
      expect.objectContaining({ githubToken: undefined })
    )
  })

  it('bounds outgoing checks and lets their timeout report reach persistence', async () => {
    const deadline = new AbortController()
    vi.spyOn(AbortSignal, 'timeout').mockReturnValue(deadline.signal)
    vi.spyOn(process.stdout, 'write').mockReturnValue(true)
    const request = vi.fn(async (_input: unknown, init?: RequestInit) => {
      expect(init?.signal?.aborted).toBe(true)
      throw new Error('Request timed out')
    })
    vi.stubGlobal('fetch', request)
    mocks.cdn.mockImplementation(async (options) => {
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
      expect(mocks.dynamodb).toHaveBeenCalledTimes(2)
    } finally {
      vi.unstubAllGlobals()
    }
  })

  it('emits no completion heartbeat after a storage failure and sanitizes SDK errors', async () => {
    const output = vi.spyOn(process.stdout, 'write').mockReturnValue(true)
    mocks.dynamodb.mockRejectedValue(new Error('secret credentials'))
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
    ['webhook secret', 'ResourceNotFoundException'],
  ])(
    'logs the %s failure without exposing the message',
    async (stage, name) => {
      const output = vi
        .spyOn(process.stdout, 'write')
        .mockReturnValue(true)
      const error = Object.assign(
        new Error('secret URL and credentials'),
        { name }
      )
      if (stage === 'load') {
        mocks.dynamodb.mockRejectedValueOnce(error)
      } else if (stage === 'save') {
        mocks.dynamodb
          .mockResolvedValueOnce({})
          .mockRejectedValueOnce(error)
      } else {
        vi.stubEnv('NOTIFICATIONS_ENABLED', 'true')
        vi.stubEnv('SLACK_WEBHOOK_SECRET_ARN', 'test-webhook')
        mocks.cdn.mockResolvedValue({
          ...healthy(),
          status: 'unhealthy',
          checks: [],
        })
        mocks.secret.mockRejectedValueOnce(error)
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

  it('does not acknowledge an alert or emit completion after Slack rejects it', async () => {
    vi.stubEnv('NOTIFICATIONS_ENABLED', 'true')
    vi.stubEnv('SLACK_WEBHOOK_SECRET_ARN', 'test-webhook')
    const output = vi.spyOn(process.stdout, 'write').mockReturnValue(true)
    mocks.cdn.mockResolvedValue({
      ...healthy(),
      status: 'unhealthy',
      checks: [{ name: 'npm latest', ok: false, detail: 'HTTP 503' }],
    })
    mocks.secret.mockResolvedValue({
      SecretString: 'https://hooks.slack.com/services/TEST/ONLY/EXAMPLE',
    })
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response('not accepted', { status: 429 }))
    )
    await expect(handler()).rejects.toThrow(
      /^Service monitor could not complete/
    )
    const saved = mocks.dynamodb.mock.calls.find(
      ([command]) => command.input.Item
    )?.[0].input.Item
    expect(JSON.parse(saved.state.S).pending.text).toContain('npm latest')
    expect(mocks.dynamodb).toHaveBeenCalledTimes(2)
    const events = output.mock.calls.map(([line]) =>
      JSON.parse(String(line))
    )
    expect(events).toContainEqual(
      expect.objectContaining({
        stage: 'Slack delivery',
        error: 'SlackNotificationError',
        httpStatus: 429,
      })
    )
    vi.unstubAllGlobals()
  })
})
