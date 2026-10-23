import { expect, it, vi } from 'vitest'
import { logFailure } from '../src/diagnostics.ts'
import { SlackNotificationError } from '../src/slack.ts'

it('logs only allowlisted Slack failure details', () => {
  const output = vi.spyOn(process.stdout, 'write').mockReturnValue(true)
  try {
    logFailure(
      'notifications',
      'delivery',
      new SlackNotificationError(200, 'not_in_channel')
    )
    expect(output).toHaveBeenLastCalledWith(
      JSON.stringify({
        service: 'notifications',
        stage: 'delivery',
        error: 'SlackNotificationError',
        httpStatus: 200,
        code: 'not_in_channel',
      }) + '\n'
    )
    logFailure(
      'notifications',
      'delivery',
      new SlackNotificationError(200, 'secret value')
    )
    expect(output.mock.calls.at(-1)?.[0]).not.toContain('secret value')
  } finally {
    output.mockRestore()
  }
})

it('does not log an arbitrary error name, message or credential fields', () => {
  const output = vi.spyOn(process.stdout, 'write').mockReturnValue(true)
  try {
    logFailure(
      'MCP',
      'check',
      Object.assign(new Error('secret message'), {
        name: 'secret error name',
        token: 'secret token',
      })
    )
    expect(output).toHaveBeenCalledWith(
      JSON.stringify({ service: 'MCP', stage: 'check', error: 'Error' }) +
        '\n'
    )
  } finally {
    output.mockRestore()
  }
})
