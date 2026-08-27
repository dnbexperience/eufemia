/**
 * Side-effect-free constants and the protected-branch check for the conditional
 * unit-test runner, so they can be unit tested. The CLI that runs Vitest lives
 * in `runConditionalUnitTests.ts`.
 */

// Branches that publish or are broadly consumed run the full suite: a selective
// diff against origin/main is empty on these, and `v10`, `v11`, … publish too.
export const PROTECTED_BRANCHES = [
  'main',
  'beta',
  'alpha',
  'release',
  'next',
]

// Ref that changes are diffed against; overridable via UNIT_TEST_BASE_REF.
export const DEFAULT_BASE_REF = 'origin/main'

// Guard tests that assert on files outside their own import graph — they scan a
// source tree/directory (globby/fs) or read a sibling file they cannot import —
// so Vitest's `--changed` graph never links them to such a change. They run on
// every selective run to keep a green PR from turning main red after merge. The
// test file asserts each path exists. Paths are relative to the package root.
export const ALWAYS_RUN_TEST_PATHS = [
  'src/components/flex/__tests__/supportsSpacingProps.test.ts',
  'src/__tests__/style-imports.test.ts',
  'src/cli/__tests__/agentSkills.test.ts',
  'src/cli/__tests__/agentSkillEvals.test.ts',
  'src/style/themes/__tests__/capabilities.test.ts',
]

export function isProtectedBranch(
  branchName: string | undefined
): boolean {
  if (!branchName) {
    return false
  }
  return (
    PROTECTED_BRANCHES.includes(branchName) || /^v\d+/.test(branchName)
  )
}
