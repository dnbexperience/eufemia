import { describe, it, expect } from 'vitest'

import { findImplicitAnyRegressions } from '../noImplicitAnyRatchet/ratchetLib.ts'

describe('findImplicitAnyRegressions', () => {
  const allowlist = ['src/shared/helpers/debounce.ts']

  it('returns an allowlisted file when it has an implicit-any error', () => {
    const output =
      "src/shared/helpers/debounce.ts(49,7): error TS7034: Variable 'timeout' implicitly has type 'any'."
    expect(findImplicitAnyRegressions(output, allowlist)).toEqual([
      'src/shared/helpers/debounce.ts',
    ])
  })

  it('ignores errors in files that are not on the allowlist', () => {
    const output =
      "src/shared/other.ts(1,1): error TS7006: Parameter 'x' implicitly has an 'any' type."
    expect(findImplicitAnyRegressions(output, allowlist)).toEqual([])
  })

  it('returns an empty array when there are no errors', () => {
    expect(findImplicitAnyRegressions('', allowlist)).toEqual([])
  })

  it('deduplicates multiple errors within the same allowlisted file', () => {
    const output = [
      "src/shared/helpers/debounce.ts(49,7): error TS7034: Variable 'timeout' implicitly has type 'any'.",
      "src/shared/helpers/debounce.ts(50,7): error TS7034: Variable 'recall' implicitly has type 'any'.",
    ].join('\n')
    expect(findImplicitAnyRegressions(output, allowlist)).toEqual([
      'src/shared/helpers/debounce.ts',
    ])
  })
})
