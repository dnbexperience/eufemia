import type { RunnerTestFile, TestModule } from 'vitest/node'
import { DefaultReporter } from 'vitest/node'

export default class SummaryOnlyReporter extends DefaultReporter {
  constructor() {
    super({ summary: false })
  }

  override onTestModuleEnd(_testModule: TestModule) {
    // Intentionally empty – the LiveReporter already handles per-test output.
  }

  override reportSummary(files: RunnerTestFile[], errors: Error[]) {
    // Skip printErrorsSummary – the LiveReporter already shows failures.
    // Only print the final "Test Files / Tests / Duration" block.
    this.reportTestSummary(files, errors, 0)
  }
}
