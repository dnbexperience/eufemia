import { glob as nodeGlob } from 'node:fs/promises'
import { globSync as nodeGlobSync, statSync } from 'node:fs'
import path from 'path'

type GlobOptions = {
  cwd?: string
  absolute?: boolean
  onlyDirectories?: boolean
}

/**
 * Convert a glob negation pattern to a RegExp for path matching.
 */
function globPatternToRegex(pattern: string): RegExp {
  let p = pattern.replace(/^\.\//, '')

  if (p.endsWith('/')) {
    p += '**'
  }

  const segments = p.split('**')
  const regexParts = segments.map((seg) =>
    seg
      .replace(/[.+^${}()|[\]\\]/g, '\\$&')
      .replace(/\*/g, '[^/]*')
      .replace(/\?/g, '[^/]')
  )

  return new RegExp('^' + regexParts.join('.*') + '$')
}

function matchesAnyNegation(
  filePath: string,
  negRegexes: RegExp[]
): boolean {
  const normFile = filePath.replace(/^\.\//, '')
  return negRegexes.some((re) => re.test(normFile))
}

export async function globFiles(
  patterns: string | string[],
  options: GlobOptions = {}
): Promise<string[]> {
  const { cwd, absolute = false, onlyDirectories = false } = options

  const patternList = Array.isArray(patterns) ? patterns : [patterns]
  const positive: string[] = []
  const negative: string[] = []

  for (const p of patternList) {
    if (p.startsWith('!')) {
      negative.push(p.slice(1))
    } else {
      positive.push(p)
    }
  }

  const results = new Set<string>()

  for (const pattern of positive) {
    for await (const file of nodeGlob(pattern, { cwd })) {
      results.add(file)
    }
  }

  let files = [...results]

  if (negative.length > 0) {
    const negRegexes = negative.map(globPatternToRegex)
    files = files.filter((f) => !matchesAnyNegation(f, negRegexes))
  }

  if (onlyDirectories) {
    const baseCwd = cwd || process.cwd()
    files = files.filter((f) => {
      try {
        return statSync(path.resolve(baseCwd, f)).isDirectory()
      } catch {
        return false
      }
    })
  }

  if (absolute) {
    const baseCwd = cwd || process.cwd()
    files = files.map((f) =>
      path.isAbsolute(f) ? f : path.resolve(baseCwd, f)
    )
  }

  return files.sort()
}

export function globFilesSync(
  patterns: string | string[],
  options: GlobOptions = {}
): string[] {
  const { cwd, absolute = false, onlyDirectories = false } = options

  const patternList = Array.isArray(patterns) ? patterns : [patterns]
  const positive: string[] = []
  const negative: string[] = []

  for (const p of patternList) {
    if (p.startsWith('!')) {
      negative.push(p.slice(1))
    } else {
      positive.push(p)
    }
  }

  const results = new Set<string>()

  for (const pattern of positive) {
    for (const file of nodeGlobSync(pattern, { cwd })) {
      results.add(file)
    }
  }

  let files = [...results]

  if (negative.length > 0) {
    const negRegexes = negative.map(globPatternToRegex)
    files = files.filter((f) => !matchesAnyNegation(f, negRegexes))
  }

  if (onlyDirectories) {
    const baseCwd = cwd || process.cwd()
    files = files.filter((f) => {
      try {
        return statSync(path.resolve(baseCwd, f)).isDirectory()
      } catch {
        return false
      }
    })
  }

  if (absolute) {
    const baseCwd = cwd || process.cwd()
    files = files.map((f) =>
      path.isAbsolute(f) ? f : path.resolve(baseCwd, f)
    )
  }

  return files.sort()
}
