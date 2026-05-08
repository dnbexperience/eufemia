import { describe, it, expect } from 'vitest'

const { DEFAULT_TIMEOUT, runCommand } = require('../cliTools')

describe('runCommand', () => {
  it('should export a default timeout of 10 000 ms', () => {
    expect(DEFAULT_TIMEOUT).toBe(10000)
  })

  it('should resolve with stdout', async () => {
    const result = await runCommand('echo hello')
    expect(result.trim()).toBe('hello')
  })

  it('should reject unsafe commands', async () => {
    await expect(runCommand('echo foo; echo bar')).rejects.toThrow(
      'Unsafe shell command rejected'
    )
  })

  it(
    'should use the default timeout when none is provided',
    async () => {
      const start = Date.now()

      await expect(runCommand('sleep 60')).rejects.toThrow()

      const elapsed = Date.now() - start

      expect(elapsed).toBeGreaterThanOrEqual(DEFAULT_TIMEOUT - 500)
      expect(elapsed).toBeLessThan(DEFAULT_TIMEOUT + 5000)
    },
    DEFAULT_TIMEOUT + 10000
  )

  it('should accept a custom timeout', async () => {
    const start = Date.now()

    await expect(
      runCommand('sleep 60', { timeout: 200 })
    ).rejects.toThrow()

    const elapsed = Date.now() - start

    expect(elapsed).toBeLessThan(2000)
  })
})
