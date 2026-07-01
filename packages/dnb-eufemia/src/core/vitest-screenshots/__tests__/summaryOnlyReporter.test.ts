// @vitest-environment node

import { describe, expect, it, vi } from 'vitest'
import type { TestModule } from 'vitest/node'

import SummaryOnlyReporter from '../summaryOnlyReporter'

describe('SummaryOnlyReporter', () => {
  it('does not call logFailedTask for any module', () => {
    const reporter = new SummaryOnlyReporter()
    const logFailedTaskSpy = vi.spyOn(reporter as any, 'logFailedTask')

    const passed = {
      state: () => 'passed',
    } as unknown as TestModule
    reporter.onTestModuleEnd(passed)

    const failed = {
      state: () => 'failed',
      task: {},
    } as unknown as TestModule
    reporter.onTestModuleEnd(failed)

    expect(logFailedTaskSpy).not.toHaveBeenCalled()
  })

  it('skips printErrorsSummary in reportSummary', () => {
    const reporter = new SummaryOnlyReporter()
    const errorsSpy = vi
      .spyOn(reporter as any, 'printErrorsSummary')
      .mockImplementation(() => {})
    const summarySpy = vi
      .spyOn(reporter as any, 'reportTestSummary')
      .mockImplementation(() => {})

    reporter.reportSummary([], [])

    expect(errorsSpy).not.toHaveBeenCalled()
    expect(summarySpy).toHaveBeenCalledWith([], [], 0)
  })
})
