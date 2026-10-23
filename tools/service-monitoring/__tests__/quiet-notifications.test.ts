import { describe, expect, it, vi } from 'vitest'
import { processNotification } from '../src/notifications.ts'
import type {
  NotificationState,
  Observation,
} from '../src/notifications.ts'
import { SlackNotificationError } from '../src/slack.ts'

function setup() {
  let stored: NotificationState = { sources: {} }
  let id = 0
  const dependencies = {
    load: async () => structuredClone(stored),
    save: async (state: NotificationState) => {
      stored = structuredClone(state)
    },
    post: vi.fn(
      async (_text: string, _id: string, _thread?: string) =>
        String(++id) + '.001'
    ),
    update: vi.fn(async (_ts: string, _text: string) => {}),
  }
  return {
    dependencies,
    state: () => stored,
    run: (event: Observation) => processNotification(event, dependencies),
  }
}
function check(
  status: 'healthy' | 'unhealthy' | 'pending',
  minute: number,
  failures = ['HTTP health']
): Observation {
  return {
    kind: 'service',
    service: 'MCP',
    report: {
      status,
      checkedAt: new Date(Date.UTC(2026, 9, 23, 10, minute)).toISOString(),
      checks: failures.map((name) => ({
        name,
        ok: status === 'healthy',
        pending: status === 'pending',
        detail: 'test',
      })),
    },
  }
}

describe('quiet notifications', () => {
  it('creates one summary and updates it without new healthy posts', async () => {
    const test = setup()
    await test.run(check('healthy', 0))
    await test.run(check('healthy', 1))
    expect(test.dependencies.post).toHaveBeenCalledTimes(1)
    expect(test.dependencies.update).toHaveBeenCalledTimes(1)
    expect(test.state().sources.MCP?.checks).toBe(2)
  })
  it('sends one outage post, no changed-failure post and one recovery reply', async () => {
    const test = setup()
    await test.run(check('healthy', 0))
    await test.run(check('unhealthy', 1))
    const thread = test.state().sources.MCP?.outage?.thread
    await test.run(check('unhealthy', 2, ['metadata']))
    await test.run(check('pending', 3))
    expect(test.dependencies.post).toHaveBeenCalledTimes(2)
    await test.run(check('healthy', 4))
    expect(test.dependencies.post).toHaveBeenCalledTimes(3)
    expect(test.dependencies.post).toHaveBeenLastCalledWith(
      expect.stringContaining('recovered'),
      expect.any(String),
      thread
    )
    expect(test.state().sources.MCP?.downtimeMs).toBe(180000)
    expect(test.state().sources.MCP?.incidents).toBe(1)
  })
  it('ignores duplicate and stale observations including recovered alarm retries', async () => {
    const test = setup()
    await test.run(check('unhealthy', 1))
    await test.run(check('healthy', 3))
    const count = test.dependencies.post.mock.calls.length
    await test.run(check('unhealthy', 1))
    await test.run(check('healthy', 3))
    expect(test.dependencies.post).toHaveBeenCalledTimes(count)
    expect(test.state().sources.MCP?.checks).toBe(2)
  })
  it('groups simultaneous monitor alarms into one incident and waits for all to recover', async () => {
    const test = setup()
    const alarm = (
      name: string,
      status: 'ALARM' | 'OK',
      minute: number
    ): Observation => ({
      kind: 'alarm',
      name,
      status,
      at: new Date(Date.UTC(2026, 9, 23, 10, minute)).toISOString(),
    })
    await test.run(alarm('missing-cdn', 'ALARM', 1))
    await test.run(alarm('missing-mcp', 'ALARM', 2))
    await test.run(alarm('missing-cdn', 'OK', 3))
    expect(test.dependencies.post).toHaveBeenCalledTimes(2)
    await test.run(alarm('missing-mcp', 'OK', 4))
    expect(test.dependencies.post).toHaveBeenCalledTimes(3)
    await test.run(alarm('missing-cdn', 'ALARM', 1))
    expect(test.dependencies.post).toHaveBeenCalledTimes(3)
  })
  it('persists notification intent, retries failure then posts recovery in the returned thread', async () => {
    const test = setup()
    await test.run(check('healthy', 0))
    test.dependencies.post.mockRejectedValueOnce(
      new Error('Slack unavailable')
    )
    await expect(test.run(check('unhealthy', 1))).rejects.toThrow()
    expect(test.state().pending?.type).toBe('outage')
    await test.run(check('healthy', 3))
    expect(test.dependencies.post.mock.calls.at(-1)?.[2]).toBeDefined()
    expect(test.state().pending).toBeUndefined()
  })
  it('does not double-count recovered incident time on retries', async () => {
    const test = setup()
    await test.run(check('unhealthy', 1))
    test.dependencies.post.mockRejectedValueOnce(
      new Error('Slack unavailable')
    )
    await expect(test.run(check('healthy', 3))).rejects.toThrow()
    await test.run(check('healthy', 3))
    expect(test.state().sources.MCP?.downtimeMs).toBe(120000)
    expect(test.state().history).toHaveLength(1)
    expect(test.state().history?.[0]?.recovered).toBe(
      '2026-10-23T10:03:00.000Z'
    )
  })

  it('reuses the same message ID if Slack accepted an outage but acknowledgement persistence fails', async () => {
    const test = setup()
    await test.run(check('healthy', 0))
    const originalSave = test.dependencies.save
    let saves = 0
    test.dependencies.save = async (state) => {
      saves++
      if (saves === 2) {
        throw new Error('DynamoDB unavailable after Slack accepted')
      }
      await originalSave(state)
    }
    await expect(test.run(check('unhealthy', 1))).rejects.toThrow()
    const sentId = test.dependencies.post.mock.calls.at(-1)?.[1]
    await test.run(check('unhealthy', 1))
    expect(test.dependencies.post.mock.calls.at(-1)?.[1]).toBe(sentId)
    expect(test.state().sources.MCP?.incidents).toBe(1)
  })

  it('keeps incident delivery working when the summary was deleted', async () => {
    const test = setup()
    await test.run(check('healthy', 0))
    const summary = test.state().summary
    test.dependencies.update.mockRejectedValue(
      new SlackNotificationError(undefined, 'message_not_found')
    )
    const output = vi.spyOn(process.stdout, 'write').mockReturnValue(true)
    try {
      await test.run(check('unhealthy', 1))
      const thread = test.state().sources.MCP?.outage?.thread
      await test.run(check('unhealthy', 2))
      await test.run(check('healthy', 3))
      expect(test.dependencies.post).toHaveBeenCalledTimes(3)
      expect(test.dependencies.post).toHaveBeenLastCalledWith(
        expect.stringContaining('recovered'),
        expect.any(String),
        thread
      )
      expect(test.state().summary).toBe(summary)
      expect(test.state().pending).toBeUndefined()
      expect(
        output.mock.calls.map(([line]) => String(line)).join('')
      ).toContain('summary update')
    } finally {
      output.mockRestore()
    }
  })
  it('delivers an incident before attempting to create the summary', async () => {
    const test = setup()
    test.dependencies.post
      .mockResolvedValueOnce('123.001')
      .mockRejectedValueOnce(new Error('Summary failed'))
    const output = vi.spyOn(process.stdout, 'write').mockReturnValue(true)
    try {
      await test.run(check('unhealthy', 1))
      expect(test.dependencies.post.mock.calls[0]?.[0]).toContain(
        'incident detected'
      )
      expect(test.state().sources.MCP?.outage?.thread).toBe('123.001')
      expect(test.state().pending).toBeUndefined()
    } finally {
      output.mockRestore()
    }
  })
})
