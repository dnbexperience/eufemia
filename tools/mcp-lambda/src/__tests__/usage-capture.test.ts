import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const { send } = vi.hoisted(() => ({ send: vi.fn() }))

vi.mock('@aws-sdk/client-sqs', () => ({
  SQSClient: class {
    send = send
  },
  SendMessageCommand: class {
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
    send.mockResolvedValue({ Failed: [] })
    process.env.USAGE_QUEUE_URL = 'https://sqs.example/usage'
    process.env.USAGE_ENV = 'dev'
    errorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined)
  })

  afterEach(() => {
    delete process.env.USAGE_QUEUE_URL
    delete process.env.USAGE_ENV
    errorSpy.mockRestore()
  })

  it('queues a usage record for a tools/call request', async () => {
    await captureUsage(event())

    expect(send).toHaveBeenCalledTimes(1)

    const command = send.mock.calls[0]?.[0] as
      | { input: { QueueUrl: string; MessageBody: string } }
      | undefined
    expect(command?.input.QueueUrl).toBe('https://sqs.example/usage')
    expect(
      JSON.parse(command?.input.MessageBody ?? '[]')[0].component
    ).toBe('Button')
    expect(send.mock.calls[0]?.[1]?.abortSignal).toBeInstanceOf(
      AbortSignal
    )
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

  it('does nothing when USAGE_QUEUE_URL is unset', async () => {
    delete process.env.USAGE_QUEUE_URL

    await expect(captureUsage(event())).resolves.toBeUndefined()
    expect(send).not.toHaveBeenCalled()
  })

  it('queues nothing when the body carries no known tool call', async () => {
    await captureUsage(
      event({
        body: JSON.stringify({ jsonrpc: '2.0', method: 'initialize' }),
      })
    )

    expect(send).not.toHaveBeenCalled()
  })

  it('swallows a queue failure so the MCP response is unaffected', async () => {
    send.mockRejectedValue(new Error('sqs down'))

    await expect(captureUsage(event())).resolves.toBeUndefined()
    expect(errorSpy).toHaveBeenCalled()
  })
})
