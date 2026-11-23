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

import type { ToolCall } from '../tool-calls.js'
import { captureUsage as capture } from '../usage-capture.js'

const resolver = {
  component: async (name: string) => name.toLowerCase() === 'button',
  componentDocName: async () => null,
  docsFile: async () => true,
  docsDir: async () => true,
}

const captureUsage = (toolCalls: ToolCall[]) =>
  capture(toolCalls, { resolver, eufemiaVersion: '11.16.0' })

const TOOL_CALLS: ToolCall[] = [
  { name: 'component_props', input: { name: 'Button' } },
]

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

  it('queues a usage record for a tool that ran', async () => {
    await captureUsage(TOOL_CALLS)

    expect(send).toHaveBeenCalledTimes(1)

    const command = send.mock.calls[0]?.[0] as
      | { input: { QueueUrl: string; MessageBody: string } }
      | undefined
    expect(command?.input.QueueUrl).toBe('https://sqs.example/usage')
    expect(
      JSON.parse(command?.input.MessageBody ?? '[]')[0]
    ).toMatchObject({
      component: 'button',
      eufemia_version: '11.16.0',
    })
    expect(send.mock.calls[0]?.[1]?.abortSignal).toBeInstanceOf(
      AbortSignal
    )
  })

  it('does nothing when USAGE_QUEUE_URL is unset', async () => {
    delete process.env.USAGE_QUEUE_URL

    await expect(captureUsage(TOOL_CALLS)).resolves.toBeUndefined()
    expect(send).not.toHaveBeenCalled()
  })

  it('queues nothing when no known tool ran', async () => {
    await captureUsage([])
    await captureUsage([{ name: 'drop_database', input: {} }])

    expect(send).not.toHaveBeenCalled()
  })

  it('swallows a queue failure so the MCP response is unaffected', async () => {
    send.mockRejectedValue(new Error('sqs down'))

    await expect(captureUsage(TOOL_CALLS)).resolves.toBeUndefined()
    expect(errorSpy).toHaveBeenCalled()
  })
})
