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
      name: 'AccessDeniedException',
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
  expect(output).toContain('AccessDeniedException')
  expect(output).not.toContain('secret token')
  expect(output).not.toContain('"Completed":1')
})
