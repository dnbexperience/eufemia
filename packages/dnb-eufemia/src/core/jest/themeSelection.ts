import { isCICheck } from 'repo-utils'

type ThemeName = string
type MainOnlyCallback = () => void

type ThemeRule = {
  themeName: ThemeName
  run: (branchName: string | null) => boolean
}

export type ThemeEntry = ThemeName | ThemeRule

export function runOnMain<T extends ThemeName | MainOnlyCallback>(
  themeNameOrCallback: T
): T extends MainOnlyCallback ? void : ThemeRule {
  if (typeof themeNameOrCallback === 'function') {
    if (isMainOrVersionBranch(resolveBranchName())) {
      themeNameOrCallback()
    }

    return undefined as T extends MainOnlyCallback ? void : ThemeRule
  }

  return {
    themeName: themeNameOrCallback,
    run: (branchName) => isMainOrVersionBranch(branchName),
  } as T extends MainOnlyCallback ? void : ThemeRule
}

export function selectBrands(entries: ThemeEntry[]): ThemeName[] {
  const branchName = resolveBranchName()

  return entries
    .map((entry) => toThemeRule(entry))
    .filter((entry) => entry.run(branchName))
    .map((entry) => entry.themeName)
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

function toThemeRule(entry: ThemeEntry): ThemeRule {
  if (typeof entry === 'string') {
    return {
      themeName: entry,
      run: () => true,
    }
  }

  return entry
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
