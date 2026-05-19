/**
 * In-iframe (browser-mode) theme selection helpers.
 *
 * `repo-utils` is CJS and cannot be served to the browser by Vite, so
 * this module reimplements the logic client-side. Inside CI we only
 * return `onMain` themes when on a release branch; outside CI we
 * always return them.
 */

type ThemeName = string
type MainOnlyCallback = () => void
type BranchScopedThemeGroups = {
  always?: ThemeName[]
  onMain?: ThemeName[]
}

const isCI =
  // @ts-expect-error
  String(import.meta.env?.CI) === 'true' ||
  // @ts-expect-error
  String(import.meta.env?.CI) === '1'

const VERSION_BRANCH_PATTERN = /^v\d+/

const branchName: string | null = (() => {
  const ref =
    // @ts-expect-error
    (import.meta.env?.GITHUB_REF_NAME as string | undefined) ?? null
  if (ref) {
    return ref
  }

  // @ts-expect-error
  const fullRef = (import.meta.env?.GITHUB_REF as string | undefined) ?? ''
  const prefix = 'refs/heads/'
  if (fullRef.startsWith(prefix)) {
    return fullRef.slice(prefix.length)
  }

  return null
})()

const isMainOrVersionBranch = () => {
  if (!isCI) {
    return true
  }
  if (!branchName) {
    return false
  }
  return branchName === 'main' || VERSION_BRANCH_PATTERN.test(branchName)
}

export function onMain(callback: MainOnlyCallback): void
export function onMain(themeName: ThemeName): ThemeName
export function onMain(
  arg: ThemeName | MainOnlyCallback
): ThemeName | void {
  if (typeof arg === 'function') {
    if (isMainOrVersionBranch()) {
      arg()
    }
    return
  }
  return arg
}

export const runOnMain = onMain

export function selectThemes({
  always = [],
  onMain = [],
}: BranchScopedThemeGroups): ThemeName[] {
  if (isMainOrVersionBranch()) {
    return [...always, ...onMain]
  }
  return always
}
