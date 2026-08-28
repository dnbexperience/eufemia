import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

import {
  ALWAYS_RUN_TEST_PATHS,
  isProtectedBranch,
} from '../runConditionalUnitTestsLib'

const packageRoot = path.resolve(__dirname, '../../../..')

describe('runConditionalUnitTestsLib', () => {
  describe('isProtectedBranch', () => {
    it('matches always-run and version branches', () => {
      expect(isProtectedBranch('main')).toBe(true)
      expect(isProtectedBranch('release')).toBe(true)
      expect(isProtectedBranch('v11')).toBe(true)
    })

    it('does not match feature branches or an unset branch', () => {
      expect(isProtectedBranch('feat/thing')).toBe(false)
      expect(isProtectedBranch(undefined)).toBe(false)
    })
  })

  it('lists guard files that actually exist', () => {
    for (const guardPath of ALWAYS_RUN_TEST_PATHS) {
      expect(
        fs.existsSync(path.join(packageRoot, guardPath)),
        `${guardPath} is missing; update ALWAYS_RUN_TEST_PATHS`
      ).toBe(true)
    }
  })
})
