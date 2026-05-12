/**
 * Custom Vitest reporter for the screenshot suite.
 *
 * Streams test results live as each test finishes, prints the portal
 * URL each time the engine performs a fresh navigation, and runs an
 * explicit `global.gc()` between test files to keep the long-running
 * Node worker process from accumulating PNG buffers / decoded pixel
 * data across the suite.
 *
 * Pairs with `ScreenshotReporter` (which writes the HTML diff at the
 * end). Vitest's own banner and the final
 * `Test Files / Tests / Duration` block come from the runner, so we
 * can omit `'default'` and keep the output clean.
 */

import type {
  Reporter,
  TestCase,
  TestModule,
  TestSpecification,
} from 'vitest/node'
import { drainNavigations } from './failures'

const COLORS = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
} as const

const isTTY = Boolean(process.stdout.isTTY)
const color = (code: keyof typeof COLORS, text: string) =>
  isTTY ? `${COLORS[code]}${text}${COLORS.reset}` : text

const write = (line: string) => {
  try {
    process.stdout.write(`${line}\n`)
  } catch {
    // stop here
  }
}

const flushNavigations = () => {
  const urls = drainNavigations()
  for (const url of urls) {
    write(color('dim', url))
  }
}

export default class LiveReporter implements Reporter {
  private finished = 0

  onTestRunStart(specifications: ReadonlyArray<TestSpecification>) {
    this.finished = 0
    void specifications
  }

  onTestCaseResult(testCase: TestCase) {
    flushNavigations()

    this.finished += 1
    const result = testCase.result()
    const duration = testCase.diagnostic()?.duration
    const counter = `[${this.finished}]`

    if (result.state === 'passed') {
      write(
        `${color('green', '✓')} ${counter} ${testCase.fullName}` +
          (duration !== undefined
            ? ` ${color('dim', `(${Math.round(duration)}ms)`)}`
            : '')
      )
    } else if (result.state === 'failed') {
      const messages = result.errors
        .map((e) => e.message ?? '')
        .filter(Boolean)
      write(`${color('red', '✗')} ${counter} ${testCase.fullName}`)
      messages.forEach((m) => write(color('red', `  ${m}`)))
    } else if (result.state === 'skipped') {
      write(
        `${color('yellow', '○')} ${counter} ${testCase.fullName} ${color('dim', '(skipped)')}`
      )
    }
  }

  onTestModuleEnd(testModule: TestModule) {
    void testModule

    // Force a major GC between test files so the V8 old-space
    // does not climb as PNG buffers linger across files.
    const gc = (globalThis as { gc?: () => void }).gc
    if (typeof gc === 'function') {
      try {
        gc()
      } catch {
        // stop here
      }
    }
  }
}
