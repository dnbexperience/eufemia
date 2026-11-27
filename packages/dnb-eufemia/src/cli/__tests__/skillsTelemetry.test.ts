// @vitest-environment node

import { reportSkillInstalls } from '../skillsTelemetry'

const events = [
  {
    action: 'install' as const,
    target: '.claude/skills',
    eufemiaVersion: '11.19.0',
  },
]

describe('reportSkillInstalls', () => {
  it('posts the events and prints the opt-out notice', async () => {
    const fetchImpl = vi.fn(
      async () => new Response(null, { status: 202 })
    )
    const notice = vi.fn()

    await reportSkillInstalls(events, { env: {}, fetchImpl, notice })

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://server.eufemia.dnb.no/analytics/collect-skill-installs',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(events),
      })
    )
    expect(notice).toHaveBeenCalledWith(
      expect.stringContaining('EUFEMIA_SKILLS_TELEMETRY=0')
    )
  })

  it.each([
    { EUFEMIA_SKILLS_TELEMETRY: '0' },
    { EUFEMIA_SKILLS_TELEMETRY: 'false' },
    { DO_NOT_TRACK: '1' },
    { CI: 'true' },
  ])('sends nothing when %j', async (env) => {
    const fetchImpl = vi.fn()

    await reportSkillInstalls(events, { env, fetchImpl, notice: vi.fn() })

    expect(fetchImpl).not.toHaveBeenCalled()
  })

  it('never fails the command when the request fails', async () => {
    const fetchImpl = vi.fn(async () => {
      throw new Error('offline')
    })

    await expect(
      reportSkillInstalls(events, { env: {}, fetchImpl, notice: vi.fn() })
    ).resolves.toBeUndefined()
  })
})
