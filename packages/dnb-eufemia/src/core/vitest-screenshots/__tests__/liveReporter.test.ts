// @vitest-environment node

import { afterEach, expect, it, vi } from 'vitest'
import type { TestCase } from 'vitest/node'
import fs from 'node:fs'
import os from 'node:os'
import LiveReporter from '../liveReporter'

vi.mock('playwright/package.json', () => ({ version: '1.2.3' }))

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllEnvs()
})

it.each(['true', '1', 'false', undefined])(
  'prints the visual test environment once at startup with CI=%s',
  (ci) => {
    vi.stubEnv('CI', ci)
    vi.spyOn(os, 'platform').mockReturnValue('linux')
    vi.spyOn(os, 'release').mockReturnValue('6.8.0')
    vi.spyOn(os, 'arch').mockReturnValue('x64')
    const readFile = vi.spyOn(fs, 'readFileSync').mockReturnValue(
      JSON.stringify({
        browsers: [
          { name: 'chromium', browserVersion: '123.0', revision: '111' },
          { name: 'firefox', browserVersion: '124.0', revision: '222' },
        ],
      })
    )
    const write = vi.spyOn(process.stdout, 'write').mockReturnValue(true)
    const reporter = new LiveReporter()

    reporter.onInit()
    reporter.onTestRunStart([])
    reporter.onTestRunStart([])

    const output = write.mock.calls.map(([text]) => String(text)).join('')
    expect(readFile).toHaveBeenCalledWith(
      expect.stringContaining('playwright-core/browsers.json'),
      'utf-8'
    )
    expect(output).toContain(
      'Visual tests: Playwright 1.2.3 | bundled Firefox 124.0 (build 222)'
    )
    expect(output).toContain(
      `Environment: Node ${process.version} | linux 6.8.0 (x64) | ${
        ci === 'true' || ci === '1' ? 'CI' : 'local'
      }`
    )
    expect(output.match(/Visual tests:/g)).toHaveLength(1)
  }
)

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
