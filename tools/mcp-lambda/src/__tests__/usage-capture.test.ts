import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const { send } = vi.hoisted(() => ({ send: vi.fn() }))

vi.mock('@aws-sdk/client-s3', () => ({
  S3Client: class {
    send = send
  },
  PutObjectCommand: class {
    input: unknown
    constructor(input: unknown) {
      this.input = input
    }
  },
}))

import type { APIGatewayProxyEventV2 } from 'aws-lambda'
import { captureUsage } from '../usage-capture.js'

const TOOL_CALL = JSON.stringify({
  jsonrpc: '2.0',
  id: 1,
  method: 'tools/call',
  params: { name: 'component_props', arguments: { name: 'Button' } },
})

function event(
  overrides: Partial<APIGatewayProxyEventV2> = {}
): APIGatewayProxyEventV2 {
  return {
    body: TOOL_CALL,
    isBase64Encoded: false,
    ...overrides,
  } as APIGatewayProxyEventV2
}

describe('captureUsage', () => {
  let errorSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    send.mockReset()
    send.mockResolvedValue({})
    process.env.DATA_BUCKET = 'my-bucket'
    process.env.USAGE_ENV = 'dev'
    errorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined)
  })

  afterEach(() => {
    delete process.env.DATA_BUCKET
    delete process.env.USAGE_ENV
    errorSpy.mockRestore()
  })

  it('writes a usage record for a tools/call request', async () => {
    await captureUsage(event())

    expect(send).toHaveBeenCalledTimes(1)

    const cmd = send.mock.calls[0]?.[0] as
      | { input: { Key: string; Body: string } }
      | undefined
    if (!cmd) {
      throw new Error('expected a PutObjectCommand')
    }
    const input = cmd.input
    expect(input.Key).toMatch(/^mcp-usage\/dt=\d{4}-\d{2}-\d{2}\//)
    expect(JSON.parse(input.Body).component).toBe('Button')
  })

  it('decodes a base64-encoded body', async () => {
    await captureUsage(
      event({
        body: Buffer.from(TOOL_CALL).toString('base64'),
        isBase64Encoded: true,
      })
    )

    expect(send).toHaveBeenCalledTimes(1)
  })

  it('does nothing when DATA_BUCKET is unset', async () => {
    delete process.env.DATA_BUCKET

    await expect(captureUsage(event())).resolves.toBeUndefined()
    expect(send).not.toHaveBeenCalled()
  })

  it('writes nothing when the body carries no known tool call', async () => {
    await captureUsage(
      event({
        body: JSON.stringify({ jsonrpc: '2.0', method: 'initialize' }),
      })
    )

    expect(send).not.toHaveBeenCalled()
  })

  it('swallows a storage failure so the MCP response is unaffected', async () => {
    send.mockRejectedValue(new Error('s3 down'))

    await expect(captureUsage(event())).resolves.toBeUndefined()
    expect(errorSpy).toHaveBeenCalled()
  })
})
