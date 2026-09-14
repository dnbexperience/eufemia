import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const { storeMcpUsage } = vi.hoisted(() => ({ storeMcpUsage: vi.fn() }))

vi.mock('../usage-store.js', () => ({ storeMcpUsage }))

import type { SQSEvent, SQSRecord } from 'aws-lambda'
import { handler } from '../usage-consumer.js'
import type { McpUsageRecord } from '../records/mcp-usage.js'

function usageRecord(
  overrides: Partial<McpUsageRecord> = {}
): McpUsageRecord {
  return {
    tool: 'component_props',
    component: 'Button',
    path: '',
    env: 'dev',
    timestamp: '2026-09-10T12:00:00.000Z',
    createdat: '2026-09-10T12:00:00.000Z',
    ...overrides,
  }
}

function sqsRecord(messageId: string, body: string): SQSRecord {
  return { messageId, body } as SQSRecord
}

function event(...records: SQSRecord[]): SQSEvent {
  return { Records: records }
}

describe('usage consumer', () => {
  let errorSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    process.env.DATA_BUCKET = 'my-bucket'
    storeMcpUsage.mockReset()
    storeMcpUsage.mockResolvedValue(undefined)
    errorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined)
  })

  afterEach(() => {
    delete process.env.DATA_BUCKET
    errorSpy.mockRestore()
  })

  it('stores all records from an SQS batch in one S3 object', async () => {
    await handler(
      event(
        sqsRecord('one', JSON.stringify([usageRecord()])),
        sqsRecord(
          'two',
          JSON.stringify([usageRecord({ tool: 'docs_search' })])
        )
      )
    )

    expect(storeMcpUsage).toHaveBeenCalledWith(
      'my-bucket',
      expect.arrayContaining([
        expect.objectContaining({ tool: 'component_props' }),
        expect.objectContaining({ tool: 'docs_search' }),
      ])
    )
  })

  it('drops malformed messages without retrying the batch', async () => {
    await handler(
      event(
        sqsRecord('bad', 'not json'),
        sqsRecord('good', JSON.stringify([usageRecord()]))
      )
    )

    expect(storeMcpUsage).toHaveBeenCalledWith('my-bucket', [
      usageRecord(),
    ])
    expect(errorSpy).toHaveBeenCalled()
  })

  it('retries the batch when S3 storage fails', async () => {
    storeMcpUsage.mockRejectedValue(new Error('s3 down'))

    await expect(
      handler(event(sqsRecord('one', JSON.stringify([usageRecord()]))))
    ).rejects.toThrow('s3 down')
  })

  it('fails when DATA_BUCKET is unset', async () => {
    delete process.env.DATA_BUCKET

    await expect(handler(event())).rejects.toThrow('DATA_BUCKET')
  })
})
