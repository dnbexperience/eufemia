import fs from 'fs-extra'
import path from 'path'
import type { SpecialMdxRendererDeps } from './types.ts'

export type TokenThemeName =
  | 'uiLight'
  | 'uiDark'
  | 'sbankenLight'
  | 'sbankenDark'
  | 'carnegie'

export type TokenThemeSource = {
  [key: string]: TokenThemeSource | TokenThemeLeaf
}

export type TokenThemeLeaf = {
  $type: string
  $value?: {
    alpha?: number
    hex?: string
    components?: number[]
  }
}

type TokenThemeConfig = {
  themeOrder: TokenThemeName[]
  themePaths: Partial<Record<TokenThemeName, string>>
}

let cachedTokenThemeConfig: TokenThemeConfig | null = null

export const tokenValueCollator = new Intl.Collator('en', {
  numeric: true,
  sensitivity: 'base',
})

export async function loadTokenThemeConfig(
  deps: Pick<SpecialMdxRendererDeps, 'findPackageRoot'>
) {
  if (cachedTokenThemeConfig) {
    return cachedTokenThemeConfig
  }

  const portalRoot = deps.findPackageRoot('dnb-design-system-portal')
  const eufemiaRoot = deps.findPackageRoot('@dnb/eufemia')

  if (!portalRoot || !eufemiaRoot) {
    cachedTokenThemeConfig = {
      themeOrder: [],
      themePaths: {},
    }

    return cachedTokenThemeConfig
  }

  const designTokensPath = path.join(
    portalRoot,
    'src/uilib/utils/designTokens.ts'
  )
  const source = await fs.readFile(designTokensPath, 'utf-8')
  const importSources = parseEufemiaImports(source)
  const themeSources = parseThemeSources(
    readObjectLiteralSource(source, 'const themeSources')
  )

  cachedTokenThemeConfig = {
    themeOrder: themeSources.map(({ theme }) => theme),
    themePaths: Object.fromEntries(
      themeSources.flatMap(({ theme, identifier }) => {
        const importSource = importSources[identifier]

        if (!importSource) {
          return []
        }

        return [
          [theme, resolveEufemiaImportPath(eufemiaRoot, importSource)],
        ]
      })
    ) as Partial<Record<TokenThemeName, string>>,
  }

  return cachedTokenThemeConfig
}

export function createEmptyTokenThemeReferences(
  themeOrder: TokenThemeName[]
) {
  return Object.fromEntries(
    themeOrder.map((theme) => [theme, 'n/a'])
  ) as Record<TokenThemeName, string>
}

export async function readTokenThemeSource(filePath?: string) {
  if (!filePath) {
    return null
  }

  try {
    return JSON.parse(
      await fs.readFile(filePath, 'utf-8')
    ) as TokenThemeSource
  } catch {
    return null
  }
}

export function isTokenThemeLeaf(
  value: TokenThemeSource | TokenThemeLeaf
): value is TokenThemeLeaf {
  return '$type' in value
}

function parseEufemiaImports(source: string) {
  const imports: Record<string, string> = {}
  const regex =
    /^import\s+([A-Za-z0-9_]+)\s+from\s+['"](@dnb\/eufemia\/[^'"]+)['"]/gm
  let match: RegExpExecArray | null

  while ((match = regex.exec(source))) {
    const [, identifier, importSource] = match

    if (identifier && importSource) {
      imports[identifier] = importSource
    }
  }

  return imports
}

function parseThemeSources(source: string) {
  return source
    .split('\n')
    .map(parseThemeSourceEntry)
    .filter(
      (entry): entry is { theme: TokenThemeName; identifier: string } => {
        return Boolean(entry)
      }
    )
}

function parseThemeSourceEntry(line: string) {
  const trimmed = line.trim().replace(/,$/, '')

  if (!trimmed) {
    return null
  }

  const separatorIndex = trimmed.indexOf(':')

  if (separatorIndex === -1) {
    return null
  }

  const rawTheme = trimmed.slice(0, separatorIndex).trim()
  const theme = rawTheme.replace(/^['"]|['"]$/g, '')

  if (!isTokenThemeName(theme)) {
    return null
  }

  const rawValue = trimmed.slice(separatorIndex + 1).trim()
  const identifierMatch = rawValue.match(/^([A-Za-z0-9_]+)/)
  const identifier = identifierMatch?.[1]

  if (!identifier) {
    return null
  }

  return { theme, identifier }
}

function isTokenThemeName(value: string): value is TokenThemeName {
  return (
    value === 'uiLight' ||
    value === 'uiDark' ||
    value === 'sbankenLight' ||
    value === 'sbankenDark' ||
    value === 'carnegie'
  )
}

function readObjectLiteralSource(source: string, marker: string) {
  const markerIndex = source.indexOf(marker)

  if (markerIndex === -1) {
    return ''
  }

  const openIndex = source.indexOf('{', markerIndex)

  if (openIndex === -1) {
    return ''
  }

  let depth = 0

  for (let index = openIndex; index < source.length; index += 1) {
    const char = source[index]

    if (char === '{') {
      depth += 1
      continue
    }

    if (char === '}') {
      depth -= 1

      if (depth === 0) {
        return source.slice(openIndex + 1, index)
      }
    }
  }

  return ''
}

function resolveEufemiaImportPath(
  eufemiaRoot: string,
  importSource: string
) {
  const relativePath = importSource.replace(/^@dnb\/eufemia\//, '')

  return path.join(eufemiaRoot, relativePath)
}
