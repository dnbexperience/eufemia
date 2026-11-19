import { expect, it, vi } from 'vitest'
import { processNotification } from '../src/notifications.ts'
import type { NotificationState } from '../src/notifications.ts'

function setup() {
  let stored: NotificationState = { sources: {} }
  const dependencies = {
    load: async () => structuredClone(stored),
    save: async (state: NotificationState) => {
      stored = structuredClone(state)
    },
    post: vi.fn(
      async (_text: string, _id: string, _thread?: string) => '123.001'
    ),
    update: vi.fn(async (_timestamp: string, _text: string) => {}),
  }
  return {
    state: () => stored,
    dependencies,
    run: (event: Parameters<typeof processNotification>[0]) =>
      processNotification(event, dependencies),
    observe: (
      at: string,
      status: 'healthy' | 'unhealthy' | 'pending' = 'healthy'
    ) =>
      processNotification(
        {
          kind: 'service',
          service: 'MCP',
          report: { status, checkedAt: at, checks: [] },
        },
        dependencies
      ),
  }
}
const weekly = (at = '2026-11-23T08:00:00Z') => ({
  kind: 'weekly' as const,
  at,
})

it('posts actual weekly results and missing hourly windows for every service, once', async () => {
  const test = setup()
  await test.observe('2026-11-16T08:11:00Z')
  await test.observe('2026-11-16T09:11:00Z', 'unhealthy')
  await test.observe('2026-11-16T09:12:00Z', 'unhealthy')
  await test.observe('2026-11-16T10:11:00Z', 'pending')
  await test.observe('2026-11-23T07:11:00Z')
  await test.run(weekly())
  const text = test.dependencies.post.mock.calls.at(-1)?.[0]
  expect(text).toContain('*Eufemia monitoring weekly report*')
  expect(text).toContain(
    'Period (UTC): 2026-11-16T08:11:00.000Z to 2026-11-23T08:00:00.000Z'
  )
  expect(text).toContain('MCP (HTTP server): healthy')
  expect(text).toContain(
    'Observations: 5 (2 healthy, 2 failed, 1 pending); new incidents: 1'
  )
  expect(text).toContain('*Eufemia monitoring weekly report*\n\n')
  expect(text).toContain('3/167 full hourly windows observed; 164 missing')
  expect(text).toContain('CDN (public assets): no observations')
  expect(text).toContain('Analytics (API and dashboard): no observations')
  expect(text).toContain('Tokens (expiry workflow): no observations')
  expect(text).toContain('Partial week')
  expect(test.state().sources.MCP?.checks).toBe(5)
  const posts = test.dependencies.post.mock.calls.length
  await test.run(weekly())
  await test.run(weekly('2026-11-16T08:00:00Z'))
  expect(test.dependencies.post).toHaveBeenCalledTimes(posts)
  await test.observe('2026-11-23T08:11:00Z')
  expect(test.dependencies.post).toHaveBeenCalledTimes(posts)
})

it.each(['healthy', 'unhealthy'] as const)(
  'preserves the last %s status when stale and reports active alarms',
  async (status) => {
    const test = setup()
    await test.observe('2026-11-16T08:11:00Z', status)
    await test.run({
      kind: 'alarm',
      name: 'missing-mcp',
      status: 'ALARM',
      at: '2026-11-23T07:00:00Z',
    })
    await test.run(weekly())
    const text = test.dependencies.post.mock.calls.at(-1)?.[0]
    expect(text).toContain(
      'MCP (HTTP server): stale (last: ' + status + ')'
    )
    expect(text).toContain('Active monitor alarms: 1')
  }
)

it('retries a frozen weekly report with the same ID after Slack fails', async () => {
  const test = setup()
  await test.observe('2026-11-23T07:11:00Z')
  test.dependencies.post.mockRejectedValueOnce(
    new Error('Slack unavailable')
  )
  await expect(test.run(weekly())).rejects.toThrow('Slack unavailable')
  const pending = test.dependencies.post.mock.calls.at(-1)
  await test.observe('2026-11-23T08:11:00Z')
  await test.run(weekly())
  expect(test.dependencies.post.mock.calls.at(-1)).toEqual(pending)
  const posts = test.dependencies.post.mock.calls.length
  await test.run(weekly())
  expect(test.dependencies.post).toHaveBeenCalledTimes(posts)
})

it('starts fresh weekly counts without resetting lifetime counts', async () => {
  const test = setup()
  await test.observe('2026-11-23T07:11:00Z')
  await test.run(weekly())
  await test.observe('2026-11-23T08:11:00Z')
  await test.run(weekly('2026-11-30T08:00:00Z'))
  expect(test.dependencies.post.mock.calls.at(-1)?.[0]).toContain(
    'Observations: 1 (1 healthy, 0 failed, 0 pending)'
  )
  expect(test.dependencies.post.mock.calls.at(-1)?.[0]).toContain(
    '1/168 full hourly windows observed; 167 missing'
  )
  expect(test.state().sources.MCP?.checks).toBe(2)
})

it('reuses the frozen report if Slack accepts it but saving the acknowledgement fails', async () => {
  const test = setup()
  await test.observe('2026-11-23T07:11:00Z')
  const originalSave = test.dependencies.save
  let saves = 0
  test.dependencies.save = async (state) => {
    if (++saves === 2) {
      throw new Error('DynamoDB unavailable')
    }
    await originalSave(state)
  }
  await expect(test.run(weekly())).rejects.toThrow('DynamoDB unavailable')
  const pending = test.dependencies.post.mock.calls.at(-1)
  await test.run(weekly())
  expect(test.dependencies.post.mock.calls.at(-1)).toEqual(pending)
  expect(test.state().weekly?.pending).toBeUndefined()
})

it('does not count duplicate or stale observations and extra checks cannot hide hourly gaps', async () => {
  const test = setup()
  await test.observe('2026-11-23T06:00:00Z')
  await test.observe('2026-11-23T06:01:00Z')
  await test.observe('2026-11-23T06:01:00Z')
  await test.observe('2026-11-23T06:00:00Z', 'unhealthy')
  await test.run(weekly())
  const text = test.dependencies.post.mock.calls.at(-1)?.[0]
  expect(text).toContain(
    'Observations: 2 (2 healthy, 0 failed, 0 pending); new incidents: 0'
  )
  expect(text).toContain('1/2 full hourly windows observed; 1 missing')
})

it.each([
  ['2027-03-29T07:00:00Z', '2027-03-22T08:00:00.000Z', 167],
  ['2026-10-26T08:00:00Z', '2026-10-19T07:00:00.000Z', 169],
])(
  'uses Monday 09:00 Oslo boundaries across daylight saving: %s',
  async (at, start, hours) => {
    const test = setup()
    await test.observe(new Date(Date.parse(start) - 3600000).toISOString())
    await test.run(weekly(at))
    const text = test.dependencies.post.mock.calls.at(-1)?.[0]
    expect(text).toContain(start)
    expect(text).toContain(
      `0/${hours} full hourly windows observed; ${hours} missing`
    )
  }
)

it('bounds retained hourly history and skips an undelivered old report next week', async () => {
  const test = setup()
  for (let hour = 0; hour < 24 * 20; hour++) {
    await test.observe(
      new Date(Date.UTC(2026, 10, 1) + hour * 3600000).toISOString()
    )
  }
  expect(Object.keys(test.state().weekly?.hours || {})).toHaveLength(
    24 * 15
  )
  test.dependencies.post.mockRejectedValueOnce(
    new Error('Slack unavailable')
  )
  await expect(test.run(weekly())).rejects.toThrow()
  await test.run(weekly('2026-11-30T08:00:00Z'))
  expect(test.dependencies.post.mock.calls.at(-1)?.[0]).toContain(
    '2026-11-30T08:00:00.000Z'
  )
})

it('reports an empty first period honestly and rejects other delivery times', async () => {
  const test = setup()
  await expect(test.run(weekly('2026-11-24T08:00:00Z'))).rejects.toThrow()
  await test.run(weekly())
  const text = test.dependencies.post.mock.calls.at(-1)?.[0]
  expect(text).toContain('no observations')
  expect(text).toContain('Partial week')
})
