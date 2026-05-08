import fs from 'fs-extra'
import path from 'path'
import type {
  SpecialMdxComponentRenderer,
  SpecialMdxRendererDeps,
} from './types.ts'
import {
  createEmptyTokenThemeReferences,
  isTokenThemeLeaf,
  loadTokenThemeConfig,
  readTokenThemeSource,
  tokenValueCollator,
  type TokenThemeName,
  type TokenThemeSource,
} from './tokenTheme.ts'

type RadiusTokenEntry = {
  name: string
  references: Record<TokenThemeName, string>
}

type RadiusTokenOrder = Record<string, number>

let cachedRadiusTokenTable: RadiusTokenEntry[] | null = null
let cachedRadiusTokenOrder: RadiusTokenOrder | null = null

export function createRadiusTokenTableExtension(
  deps: Pick<SpecialMdxRendererDeps, 'findPackageRoot'>
): SpecialMdxComponentRenderer {
  return {
    name: 'RadiusTokenTable',
    replace: (content) => replaceRadiusTokenTables(content, deps),
  }
}

async function replaceRadiusTokenTables(
  content: string,
  deps: Pick<SpecialMdxRendererDeps, 'findPackageRoot'>
) {
  const regex = /<RadiusTokenTable\b[^>]*\/>/g

  if (!regex.test(content)) {
    return content
  }

  regex.lastIndex = 0
  const tokens = await loadRadiusTokenTable(deps)

  return content.replace(regex, () => {
    return `\n${renderRadiusTokenMarkdown(tokens)}\n`
  })
}

async function loadRadiusTokenTable(
  deps: Pick<SpecialMdxRendererDeps, 'findPackageRoot'>
) {
  if (cachedRadiusTokenTable) {
    return cachedRadiusTokenTable
  }

  const themeConfig = await loadTokenThemeConfig(deps)

  if (themeConfig.themeOrder.length === 0) {
    return []
  }

  const portalRoot = deps.findPackageRoot('dnb-design-system-portal')
  const radiusTokenOrder = portalRoot
    ? await loadRadiusTokenOrder(portalRoot)
    : {}

  const tokenMap = new Map<string, RadiusTokenEntry>()

  for (const theme of themeConfig.themeOrder) {
    const themeSource = await readTokenThemeSource(
      themeConfig.themePaths[theme]
    )

    if (!themeSource) {
      continue
    }

    for (const entry of collectRadiusTokenEntries(
      themeSource,
      theme,
      themeConfig.themeOrder
    )) {
      const existing = tokenMap.get(entry.name)

      if (existing) {
        existing.references[theme] = entry.references[theme]
        continue
      }

      tokenMap.set(entry.name, entry)
    }
  }

  cachedRadiusTokenTable = Array.from(tokenMap.values()).sort((a, b) => {
    const suffixA = a.name.replace('--token-radius-', '')
    const suffixB = b.name.replace('--token-radius-', '')
    const orderA = radiusTokenOrder[suffixA] ?? Number.MAX_SAFE_INTEGER
    const orderB = radiusTokenOrder[suffixB] ?? Number.MAX_SAFE_INTEGER

    if (orderA !== orderB) {
      return orderA - orderB
    }

    return tokenValueCollator.compare(a.name, b.name)
  })

  return cachedRadiusTokenTable
}

async function loadRadiusTokenOrder(portalRoot: string) {
  if (cachedRadiusTokenOrder) {
    return cachedRadiusTokenOrder
  }

  const designTokensPath = path.join(
    portalRoot,
    'src/uilib/utils/designTokens.ts'
  )
  const source = await fs.readFile(designTokensPath, 'utf-8')
  const radiusOrderSource = readObjectLiteralSource(
    source,
    'const radiusSizeOrder'
  )

  cachedRadiusTokenOrder = parseRadiusTokenOrder(radiusOrderSource)

  return cachedRadiusTokenOrder
}

function readObjectLiteralSource(source: string, marker: string) {
  const markerIndex = source.indexOf(marker)

  if (markerIndex === -1) {
    return ''
  }

  const openBraceIndex = source.indexOf('{', markerIndex)

  if (openBraceIndex === -1) {
    return ''
  }

  let depth = 0

  for (let index = openBraceIndex; index < source.length; index += 1) {
    const char = source[index]

    if (char === '{') {
      depth += 1
      continue
    }

    if (char === '}') {
      depth -= 1

      if (depth === 0) {
        return source.slice(openBraceIndex + 1, index)
      }
    }
  }

  return ''
}

function parseRadiusTokenOrder(source: string) {
  const order: RadiusTokenOrder = {}

  for (const line of source.split('\n')) {
    const trimmed = line.trim().replace(/,$/, '')

    if (!trimmed) {
      continue
    }

    const separatorIndex = trimmed.indexOf(':')

    if (separatorIndex === -1) {
      continue
    }

    const rawKey = trimmed.slice(0, separatorIndex).trim()
    const rawValue = trimmed.slice(separatorIndex + 1).trim()
    const key = rawKey.replace(/^['"]|['"]$/g, '')
    const value = Number(rawValue)

    if (!key || !Number.isFinite(value)) {
      continue
    }

    order[key] = value
  }

  return order
}

function collectRadiusTokenEntries(
  source: TokenThemeSource,
  theme: TokenThemeName,
  themeOrder: TokenThemeName[],
  currentPath: string[] = []
) {
  const entries: RadiusTokenEntry[] = []

  for (const [key, value] of Object.entries(source)) {
    if (key.startsWith('$') || !value || typeof value !== 'object') {
      continue
    }

    const nextPath = [...currentPath, key]

    if (isTokenThemeLeaf(value)) {
      if (nextPath[0] !== 'radius') {
        continue
      }

      const name = `--token-${nextPath.join('-')}`

      entries.push({
        name,
        references: createEmptyTokenThemeReferences(themeOrder),
      })

      entries[entries.length - 1].references[theme] =
        readRadiusTokenReference(value)
      continue
    }

    entries.push(
      ...collectRadiusTokenEntries(value, theme, themeOrder, nextPath)
    )
  }

  return entries
}

function readRadiusTokenReference(value: {
  $type: string
  $value?: unknown
}) {
  if (value.$type !== 'number' || typeof value.$value !== 'number') {
    return 'n/a'
  }

  return formatRadiusNumberValue(value.$value)
}

function formatRadiusNumberValue(value: number) {
  if (value === 0) {
    return '0'
  }

  if (value >= 9999) {
    return '9999px'
  }

  const rem = value / 16
  return `${parseFloat(rem.toFixed(4))}rem`
}

function renderRadiusTokenMarkdown(tokens: RadiusTokenEntry[]) {
  if (tokens.length === 0) {
    return 'No radius tokens are available.'
  }

  const lines = [
    '| Token | DNB Light | DNB Dark | Sbanken Light | Sbanken Dark | Carnegie |',
    '| --- | --- | --- | --- | --- | --- |',
  ]

  for (const token of tokens) {
    lines.push(
      [
        `| \`${token.name}\``,
        `\`${token.references.uiLight}\``,
        `\`${token.references.uiDark}\``,
        `\`${token.references.sbankenLight}\``,
        `\`${token.references.sbankenDark}\``,
        `\`${token.references.carnegie}\` |`,
      ].join(' | ')
    )
  }

  return lines.join('\n')
}
