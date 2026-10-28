import { expect, it, vi } from 'vitest'
import { runMonitor } from '../src/monitor.ts'
import type { State } from '../src/monitor.ts'
import type { Report } from '../../monitoring/report-incident.ts'

function setup() {
  let stored: State = {}
  const report: Report = {
    status: 'healthy',
    checkedAt: '2026-10-23T10:00:00Z',
    checks: [],
  }
  return {
    report,
    dependencies: {
      load: async () => structuredClone(stored),
      check: vi.fn(async () => report),
      save: vi.fn(async (state: State) => {
        stored = structuredClone(state)
      }),
      publish: vi.fn(async (_report: Report) => {}),
      completed: vi.fn(),
    },
  }
}
it('publishes healthy observations for the shared summary after saving the check', async () => {
  const { report, dependencies } = setup()
  await runMonitor(true, dependencies)
  expect(dependencies.publish).toHaveBeenCalledWith(report)
  expect(dependencies.save.mock.invocationCallOrder[0]).toBeLessThan(
    dependencies.publish.mock.invocationCallOrder[0]
  )
  expect(dependencies.completed).toHaveBeenCalledWith(report)
})
it('saves shadow checks without publishing notifications', async () => {
  const { dependencies } = setup()
  await runMonitor(false, dependencies)
  expect(dependencies.save).toHaveBeenCalledOnce()
  expect(dependencies.publish).not.toHaveBeenCalled()
})
it('does not emit a completion heartbeat if publication fails', async () => {
  const { dependencies } = setup()
  dependencies.publish.mockRejectedValue(new Error('SNS unavailable'))
  await expect(runMonitor(true, dependencies)).rejects.toThrow()
  expect(dependencies.completed).not.toHaveBeenCalled()
})
it('does not publish if report persistence fails', async () => {
  const { dependencies } = setup()
  dependencies.save.mockRejectedValue(new Error('DynamoDB unavailable'))
  await expect(runMonitor(true, dependencies)).rejects.toThrow()
  expect(dependencies.publish).not.toHaveBeenCalled()
})
it('publishes a saved outage before checking again after an SNS failure', async () => {
  const { report, dependencies } = setup()
  const outage: Report = { ...report, status: 'unhealthy' }
  dependencies.check.mockResolvedValueOnce(outage)
  dependencies.publish.mockRejectedValueOnce(new Error('SNS unavailable'))
  await expect(runMonitor(true, dependencies)).rejects.toThrow()
  const order: string[] = []
  dependencies.publish.mockImplementation(async (observed) => {
    order.push(observed.status)
  })
  dependencies.check.mockImplementation(async () => {
    order.push('check')
    return report
  })
  await runMonitor(true, dependencies)
  expect(order).toEqual(['unhealthy', 'check', 'healthy'])
})
