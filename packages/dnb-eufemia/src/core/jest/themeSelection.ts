import { isCICheck } from 'repo-utils'

type ThemeName = string
type MainOnlyCallback = () => void
type BranchScopedThemeGroups = {
  always?: ThemeName[]
  onMain?: ThemeName[]
}

export function onMain(callback: MainOnlyCallback): void
export function onMain(themeName: ThemeName): ThemeName
export function onMain(
  themeNameOrCallback: ThemeName | MainOnlyCallback
): ThemeName | void {
  if (typeof themeNameOrCallback === 'function') {
    if (isMainOrVersionBranch(resolveBranchName())) {
      themeNameOrCallback()
    }

    return
  }

  return themeNameOrCallback
}

export const runOnMain = onMain

export function selectThemes({
  always = [],
  onMain = [],
}: BranchScopedThemeGroups): ThemeName[] {
  if (isMainOrVersionBranch(resolveBranchName())) {
    return [...always, ...onMain]
  }

  return always
}

const VERSION_BRANCH_PATTERN = /^v\d+/

function resolveBranchName(): string | null {
  if (process.env.GITHUB_REF_NAME) {
    return process.env.GITHUB_REF_NAME
  }

  const ref = process.env.GITHUB_REF
  const branchPrefix = 'refs/heads/'

  if (ref && ref.startsWith(branchPrefix)) {
    return ref.slice(branchPrefix.length)
  }

  return null
}

function isMainOrVersionBranch(branchName: string | null): boolean {
  if (!isCICheck()) {
    return true
  }

  if (!branchName) {
    return false
  }

  return branchName === 'main' || VERSION_BRANCH_PATTERN.test(branchName)
}
