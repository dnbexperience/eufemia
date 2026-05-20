import { describe, expect, it } from 'vitest'

import { collectRenewScreenshotMatches } from '../renewScreenshotsLib'

describe('collectRenewScreenshotMatches', () => {
  it('resolves test files when given a direct screenshot test path', () => {
    const testPath =
      'src/components/pagination/__tests__/Pagination.screenshot.test.ts'

    const [result] = collectRenewScreenshotMatches([testPath])

    expect(result.filter).toBe(testPath)
    expect(result.testFiles).toEqual([testPath])
  })

  it('resolves test files for multiple direct screenshot test paths', () => {
    const paths = [
      'src/components/pagination/__tests__/Pagination.screenshot.test.ts',
      'src/components/step-indicator/__tests__/StepIndicator.screenshot.test.ts',
    ]

    const results = collectRenewScreenshotMatches(paths)

    expect(results).toHaveLength(2)
    expect(results[0].testFiles).toEqual([paths[0]])
    expect(results[1].testFiles).toEqual([paths[1]])
  })

  it('returns empty test files for a non-existent direct path', () => {
    const testPath =
      'src/components/nonexistent/__tests__/Nonexistent.screenshot.test.ts'

    const [result] = collectRenewScreenshotMatches([testPath])

    expect(result.filter).toBe(testPath)
    expect(result.testFiles).toEqual([])
  })

  it('resolves test files when given a component name filter', () => {
    const [result] = collectRenewScreenshotMatches(['pagination'])

    expect(result.filter).toBe('pagination')
    expect(result.testFiles).toEqual([
      'src/components/pagination/__tests__/Pagination.screenshot.test.ts',
    ])
  })
})
