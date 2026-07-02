/**
 * Ratchet for incrementally adopting TypeScript's `noImplicitAny`.
 *
 * The project does not yet compile cleanly with `noImplicitAny: true`. To adopt
 * it without regressions, source files are migrated one at a time and added to
 * the allowlist below. CI runs `tsc --noEmit --noImplicitAny` and fails only if
 * a file on the allowlist regresses (gains an implicit-any error again).
 *
 * When every source file is listed here, flip `noImplicitAny: true` in
 * `tsconfig.json` and delete this ratchet.
 */

/**
 * Files that are verified free of implicit `any` and must stay that way.
 * Add a file here (workspace-relative path) once it compiles cleanly under
 * `--noImplicitAny`.
 */
export const noImplicitAnyAllowlist: Array<string> = [
  'src/shared/helpers/debounce.ts',
  'src/shared/helpers/runCssVersionMismatchWarning.ts',
]

/**
 * Given raw `tsc` output, return the allowlisted files that still contain
 * implicit-any (or any other) errors – i.e. regressions that must fail the
 * ratchet.
 */
export function findImplicitAnyRegressions(
  tscOutput: string,
  allowlist: Array<string> = noImplicitAnyAllowlist
): Array<string> {
  const erroredFiles = new Set<string>()

  for (const line of tscOutput.split('\n')) {
    // Matches lines like: `src/path/file.ts(12,3): error TS7006: ...`
    const match = line.match(/^(.+?)\(\d+,\d+\): error TS/)
    if (match) {
      erroredFiles.add(match[1].trim())
    }
  }

  return allowlist.filter((file) => erroredFiles.has(file))
}
