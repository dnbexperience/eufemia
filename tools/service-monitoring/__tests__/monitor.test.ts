import { describe, expect, it, vi } from 'vitest'
import { runMonitor } from '../src/monitor.ts'
import type { State } from '../src/monitor.ts'
import type { Report } from '../../monitoring/report-incident.ts'

function report(
  status: Report['status'],
  failures = ['HTTP health']
): Report {
  return {
    status,
    checkedAt: '2026-10-21T09:07:00.000Z',
    checks: failures.map((name) => ({
      name,
      ok: status === 'healthy',
      pending: status === 'pending',
      detail: 'test result',
    })),
  }
}

function setup() {
  let stored: State = {}
  const dependencies = {
    load: async () => structuredClone(stored),
    save: vi.fn(async (state: State) => {
      stored = structuredClone(state)
    }),
    check: vi.fn(async () => report('healthy')),
    notify: vi.fn(async (_text: string) => {}),
    completed: vi.fn(),
  }
  return {
    dependencies,
    state: () => stored,
    run: (notifications = true, service: 'CDN' | 'MCP' = 'CDN') =>
      runMonitor(service, notifications, dependencies),
  }
}

describe('AWS incident lifecycle', () => {
  it('stays quiet on initial healthy checks', async () => {
    const test = setup()
    await test.run()
    expect(test.dependencies.notify).not.toHaveBeenCalled()
    expect(test.dependencies.completed).toHaveBeenCalledWith(
      report('healthy')
    )
    expect(test.state().report?.status).toBe('healthy')
  })

  it('alerts once, suppresses unchanged failures, alerts on change and recovery', async () => {
    const test = setup()
    test.dependencies.check.mockResolvedValue(report('unhealthy'))
    await test.run()
    await test.run()
    expect(test.dependencies.notify).toHaveBeenCalledTimes(1)
    test.dependencies.check.mockResolvedValue(
      report('unhealthy', ['npm latest'])
    )
    await test.run()
    expect(test.dependencies.notify).toHaveBeenLastCalledWith(
      expect.stringContaining('npm latest')
    )
    test.dependencies.check.mockResolvedValue(report('healthy'))
    await test.run()
    await test.run()
    expect(test.dependencies.notify).toHaveBeenCalledTimes(3)
    expect(test.dependencies.notify).toHaveBeenLastCalledWith(
      expect.stringContaining('CDN recovered')
    )
  })

  it('does not treat a rollout as recovery', async () => {
    const test = setup()
    test.dependencies.check.mockResolvedValue(report('unhealthy'))
    await test.run()
    test.dependencies.check.mockResolvedValue(report('pending'))
    await test.run()
    expect(test.dependencies.notify).toHaveBeenCalledTimes(1)
    expect(test.state().notified).not.toBe('healthy')
  })

  it('retains failed notifications until delivered, even if service recovers', async () => {
    const test = setup()
    test.dependencies.check.mockResolvedValue(report('unhealthy'))
    test.dependencies.notify.mockRejectedValueOnce(
      new Error('Slack unavailable')
    )
    await expect(test.run()).rejects.toThrow('Slack unavailable')
    expect(test.state().pending?.text).toContain('checks failed')
    expect(test.state().notified).toBeUndefined()
    expect(test.dependencies.completed).not.toHaveBeenCalled()
    test.dependencies.check.mockResolvedValue(report('healthy'))
    await test.run()
    expect(test.dependencies.notify).toHaveBeenCalledTimes(3)
    expect(test.dependencies.notify.mock.calls[1]?.[0]).toContain(
      'checks failed'
    )
    expect(test.dependencies.notify.mock.calls[2]?.[0]).toContain(
      'recovered'
    )
    expect(test.state().pending).toBeUndefined()
    expect(test.state().notified).toBe('healthy')
  })

  it('does not send or acknowledge alerts during shadow runs', async () => {
    const test = setup()
    test.dependencies.check.mockResolvedValue(report('unhealthy'))
    await test.run(false)
    expect(test.dependencies.notify).not.toHaveBeenCalled()
    expect(test.state().notified).toBeUndefined()
    await test.run(true, 'MCP')
    expect(test.dependencies.notify).toHaveBeenLastCalledWith(
      expect.stringContaining('MCP checks failed')
    )
  })

  it('persists notification intent before sending, and retains recovery on failure', async () => {
    const test = setup()
    test.dependencies.check.mockResolvedValue(report('unhealthy'))
    test.dependencies.notify.mockImplementation(async () => {
      expect(test.state().pending).toBeDefined()
    })
    await test.run()
    test.dependencies.check.mockResolvedValue(report('healthy'))
    test.dependencies.notify.mockRejectedValueOnce(
      new Error('Slack unavailable')
    )
    await expect(test.run()).rejects.toThrow()
    expect(test.state().pending?.fingerprint).toBe('healthy')
    await test.run()
    expect(test.state().pending).toBeUndefined()
  })

  it('does not send if saving the notification intent fails', async () => {
    const test = setup()
    test.dependencies.check.mockResolvedValue(report('unhealthy'))
    test.dependencies.save.mockRejectedValueOnce(
      new Error('DynamoDB unavailable')
    )
    await expect(test.run()).rejects.toThrow()
    expect(test.dependencies.notify).not.toHaveBeenCalled()
    expect(test.dependencies.completed).not.toHaveBeenCalled()
  })
})
