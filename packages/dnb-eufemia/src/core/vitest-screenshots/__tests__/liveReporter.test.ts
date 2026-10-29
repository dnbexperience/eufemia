// @vitest-environment node

import { afterEach, expect, it, vi } from 'vitest'
import type { TestCase } from 'vitest/node'
import LiveReporter from '../liveReporter'

afterEach(() => {
  vi.restoreAllMocks()
})

it('prints the original errors when a retried test eventually passes', () => {
  const write = vi.spyOn(process.stdout, 'write').mockReturnValue(true)
  const testCase = {
    fullName: 'Tag > active',
    result: () => ({
      state: 'passed',
      errors: [
        { message: 'locator.screenshot: Timeout 30000ms exceeded' },
        { message: 'Test timed out in 60000ms' },
      ],
    }),
    diagnostic: () => ({ retryCount: 2, duration: 90000 }),
  } as unknown as TestCase

  new LiveReporter().onTestCaseResult(testCase)

  const output = write.mock.calls.map(([text]) => String(text)).join('')
  expect(output).toContain('Tag > active')
  expect(output).toContain('retry #2')
  expect(output).toContain('locator.screenshot: Timeout 30000ms exceeded')
  expect(output).toContain('Test timed out in 60000ms')
})

it('keeps successful tests without retries to a single result line', () => {
  const write = vi.spyOn(process.stdout, 'write').mockReturnValue(true)
  const testCase = {
    fullName: 'Tag > active',
    result: () => ({ state: 'passed' }),
    diagnostic: () => ({ retryCount: 0, duration: 100 }),
  } as unknown as TestCase

  new LiveReporter().onTestCaseResult(testCase)

  expect(write).toHaveBeenCalledTimes(1)
  expect(String(write.mock.calls[0][0])).toContain('Tag > active')
})
