import { expect, it, vi } from 'vitest'
import { logFailure } from '../src/diagnostics.ts'

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
