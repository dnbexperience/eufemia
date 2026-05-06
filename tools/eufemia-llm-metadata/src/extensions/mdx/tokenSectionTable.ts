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
  type TokenThemeLeaf,
  type TokenThemeName,
  type TokenThemeSource,
} from './tokenTheme.ts'
import {
  escapeMarkdownTableCell,
  parseSimpleJsxStringAttributes,
} from './utils.ts'

type TokenSectionTableId =
  | 'background'
  | 'text'
  | 'icon'
  | 'stroke'
  | 'decorative'
  | 'component'

type TokenSectionEntry = {
  name: string
  path: string[]
  section: TokenSectionTableId
  group: string
  references: Record<TokenThemeName, string>
}

type TokenSectionTableConfig = {
  sectionIds: TokenSectionTableId[]
  decorativeGroupLabels: Record<string, string>
  decorativeGroupOrder: Record<string, number>
}

let cachedTokenSectionTables: Record<
  TokenSectionTableId,
  TokenSectionEntry[]
> | null = null
let cachedTokenSectionConfig: TokenSectionTableConfig | null = null

export function createTokenSectionTableExtension(
  deps: Pick<SpecialMdxRendererDeps, 'findPackageRoot'>
): SpecialMdxComponentRenderer {
  return {
    name: 'TokenSectionTable',
    replace: (content) => replaceTokenSectionTables(content, deps),
  }
}

async function replaceTokenSectionTables(
  content: string,
  deps: Pick<SpecialMdxRendererDeps, 'findPackageRoot'>
) {
  const regex = /<TokenSectionTable\b([^>]*)\/>/g

  if (!regex.test(content)) {
    return content
  }

  regex.lastIndex = 0
  const { sections, config, themeOrder } =
    await loadTokenSectionTables(deps)

  return content.replace(regex, (_match, attrsSource) => {
    const attrs = parseSimpleJsxStringAttributes(String(attrsSource || ''))
    const section = attrs.section as TokenSectionTableId | undefined

    if (!section || !sections[section]) {
      return ''
    }

    return `\n${renderTokenSectionMarkdown(
      section,
      sections[section],
      config,
      themeOrder
    )}\n`
  })
}

async function loadTokenSectionTables(
  deps: Pick<SpecialMdxRendererDeps, 'findPackageRoot'>
) {
  const config = await loadTokenSectionConfig(deps)
  const themeConfig = await loadTokenThemeConfig(deps)

  if (cachedTokenSectionTables) {
    return {
      sections: cachedTokenSectionTables,
      config,
      themeOrder: themeConfig.themeOrder,
    }
  }

  if (themeConfig.themeOrder.length === 0) {
    return {
      sections: {} as Record<TokenSectionTableId, TokenSectionEntry[]>,
      config,
      themeOrder: [],
    }
  }

  const tokenMap = new Map<string, TokenSectionEntry>()
  const supportedSections = new Set<TokenSectionTableId>(config.sectionIds)

  for (const theme of themeConfig.themeOrder) {
    const themeSource = await readTokenThemeSource(
      themeConfig.themePaths[theme]
    )

    if (!themeSource) {
      continue
    }

    for (const entry of collectTokenSectionEntries(
      themeSource,
      theme,
      themeConfig.themeOrder,
      supportedSections
    )) {
      const existing = tokenMap.get(entry.name)

      if (existing) {
        existing.references[theme] = entry.references[theme]
        continue
      }

      tokenMap.set(entry.name, entry)
    }
  }

  cachedTokenSectionTables = Object.fromEntries(
    config.sectionIds.map((section) => {
      const tokens = Array.from(tokenMap.values()).filter((token) => {
        return token.section === section
      })

      return [section, sortTokenSectionEntries(section, tokens, config)]
    })
  ) as Record<TokenSectionTableId, TokenSectionEntry[]>

  return {
    sections: cachedTokenSectionTables,
    config,
    themeOrder: themeConfig.themeOrder,
  }
}

async function loadTokenSectionConfig(
  deps: Pick<SpecialMdxRendererDeps, 'findPackageRoot'>
) {
  if (cachedTokenSectionConfig) {
    return cachedTokenSectionConfig
  }

  const portalRoot = deps.findPackageRoot('dnb-design-system-portal')

  if (!portalRoot) {
    cachedTokenSectionConfig = {
      sectionIds: [],
      decorativeGroupLabels: {},
      decorativeGroupOrder: {},
    }

    return cachedTokenSectionConfig
  }

  const designTokensPath = path.join(
    portalRoot,
    'src/uilib/utils/designTokens.ts'
  )
  const examplesPath = path.join(
    portalRoot,
    'src/docs/uilib/usage/customisation/theming/design-tokens/Examples.tsx'
  )

  const designTokensSource = await fs.readFile(designTokensPath, 'utf-8')
  const examplesSource = await fs.readFile(examplesPath, 'utf-8')

  cachedTokenSectionConfig = {
    sectionIds: parseTokenSectionIds(
      readArrayLiteralSource(
        designTokensSource,
        'export const tokenSectionOrder'
      )
    ),
    decorativeGroupLabels: parseStringRecord(
      readObjectLiteralSource(
        examplesSource,
        'const decorativeGroupLabels'
      )
    ),
    decorativeGroupOrder: parseNumberRecord(
      readObjectLiteralSource(
        examplesSource,
        'const decorativeGroupSortOrder'
      )
    ),
  }

  return cachedTokenSectionConfig
}

function collectTokenSectionEntries(
  source: TokenThemeSource,
  theme: TokenThemeName,
  themeOrder: TokenThemeName[],
  supportedSections: ReadonlySet<TokenSectionTableId>,
  currentPath: string[] = []
) {
  const entries: TokenSectionEntry[] = []

  for (const [key, value] of Object.entries(source)) {
    if (key.startsWith('$') || !value || typeof value !== 'object') {
      continue
    }

    const nextPath = [...currentPath, key]

    if (isTokenThemeLeaf(value)) {
      const category = nextPath[0]
      const section = nextPath[1] as TokenSectionTableId | undefined

      if (
        category !== 'color' ||
        !section ||
        !supportedSections.has(section)
      ) {
        continue
      }

      const group = nextPath[2] || 'general'
      const name = `--token-${nextPath.join('-')}`

      entries.push({
        name,
        path: nextPath,
        section,
        group,
        references: createEmptyTokenThemeReferences(themeOrder),
      })

      entries[entries.length - 1].references[theme] =
        readTokenSectionReference(value)
      continue
    }

    entries.push(
      ...collectTokenSectionEntries(
        value,
        theme,
        themeOrder,
        supportedSections,
        nextPath
      )
    )
  }

  return entries
}

function readTokenSectionReference(node: TokenThemeLeaf) {
  const value = node.$value
  const hex = value?.hex
  const alpha = value?.alpha
  const components = value?.components

  if (
    Array.isArray(components) &&
    components.length === 3 &&
    typeof alpha === 'number' &&
    alpha !== 1
  ) {
    const [red, green, blue] = components.map((channel) => {
      return Math.round(channel * 255)
    })

    return `rgba(${red} ${green} ${blue} / ${formatTokenAlpha(alpha)})`
  }

  return hex || 'n/a'
}

function formatTokenAlpha(alpha: number) {
  return `${parseFloat((alpha * 100).toFixed(2))}%`
}

function sortTokenSectionEntries(
  section: TokenSectionTableId,
  tokens: TokenSectionEntry[],
  config: TokenSectionTableConfig
) {
  return [...tokens].sort((a, b) => {
    if (section === 'decorative') {
      const groupOrderA =
        config.decorativeGroupOrder[a.group] ?? Number.MAX_SAFE_INTEGER
      const groupOrderB =
        config.decorativeGroupOrder[b.group] ?? Number.MAX_SAFE_INTEGER

      if (groupOrderA !== groupOrderB) {
        return groupOrderA - groupOrderB
      }
    }

    const groupCompare = tokenValueCollator.compare(
      getTokenSectionGroupLabel(a, config),
      getTokenSectionGroupLabel(b, config)
    )

    if (groupCompare !== 0) {
      return groupCompare
    }

    return tokenValueCollator.compare(a.name, b.name)
  })
}

function getTokenSectionGroupLabel(
  token: TokenSectionEntry,
  config: TokenSectionTableConfig
) {
  if (token.section === 'decorative') {
    return config.decorativeGroupLabels[token.group] || token.group
  }

  return token.group
}

function getTokenSectionNameLabel(token: TokenSectionEntry) {
  return token.path[token.path.length - 1] || token.name
}

function renderTokenSectionMarkdown(
  section: TokenSectionTableId,
  tokens: TokenSectionEntry[],
  config: TokenSectionTableConfig,
  themeOrder: TokenThemeName[]
) {
  if (tokens.length === 0) {
    return `No ${section} tokens are available.`
  }

  const isDecorative = section === 'decorative'
  const lines = isDecorative
    ? [
        '| Group | Name | Token | DNB Light | DNB Dark | Sbanken Light | Sbanken Dark | Carnegie |',
        '| --- | --- | --- | --- | --- | --- | --- | --- |',
      ]
    : [
        '| Group | Token | DNB Light | DNB Dark | Sbanken Light | Sbanken Dark | Carnegie |',
        '| --- | --- | --- | --- | --- | --- | --- |',
      ]

  for (const token of tokens) {
    const cells = [
      escapeMarkdownTableCell(getTokenSectionGroupLabel(token, config)),
    ]

    if (isDecorative) {
      cells.push(escapeMarkdownTableCell(getTokenSectionNameLabel(token)))
    }

    cells.push(`\`${token.name}\``)
    cells.push(
      ...themeOrder.map((theme) => {
        return `\`${token.references[theme]}\``
      })
    )

    lines.push(`| ${cells.join(' | ')} |`)
  }

  return lines.join('\n')
}

function readArrayLiteralSource(source: string, marker: string) {
  const markerIndex = source.indexOf(marker)

  if (markerIndex === -1) {
    return ''
  }

  const openIndex = source.indexOf('[', markerIndex)

  if (openIndex === -1) {
    return ''
  }

  return readDelimitedBlock(source, openIndex, '[', ']')
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

  return readDelimitedBlock(source, openIndex, '{', '}')
}

function readDelimitedBlock(
  source: string,
  openIndex: number,
  openChar: string,
  closeChar: string
) {
  let depth = 0

  for (let index = openIndex; index < source.length; index += 1) {
    const char = source[index]

    if (char === openChar) {
      depth += 1
      continue
    }

    if (char === closeChar) {
      depth -= 1

      if (depth === 0) {
        return source.slice(openIndex + 1, index)
      }
    }
  }

  return ''
}

function parseTokenSectionIds(source: string) {
  return source
    .split('\n')
    .map((line) => line.trim().replace(/,$/, ''))
    .map((value) => value.replace(/^['"]|['"]$/g, ''))
    .filter((value): value is TokenSectionTableId => {
      return (
        value === 'background' ||
        value === 'text' ||
        value === 'icon' ||
        value === 'stroke' ||
        value === 'decorative' ||
        value === 'component'
      )
    })
}

function parseStringRecord(source: string) {
  const record: Record<string, string> = {}

  for (const line of source.split('\n')) {
    const parsed = parseRecordEntry(line)

    if (!parsed) {
      continue
    }

    record[parsed.key] = parsed.value
  }

  return record
}

function parseNumberRecord(source: string) {
  const record: Record<string, number> = {}

  for (const line of source.split('\n')) {
    const parsed = parseRecordEntry(line)

    if (!parsed) {
      continue
    }

    const value = Number(parsed.value)

    if (!Number.isFinite(value)) {
      continue
    }

    record[parsed.key] = value
  }

  return record
}

function parseRecordEntry(line: string) {
  const trimmed = line.trim().replace(/,$/, '')

  if (!trimmed) {
    return null
  }

  const separatorIndex = trimmed.indexOf(':')

  if (separatorIndex === -1) {
    return null
  }

  const key = trimmed
    .slice(0, separatorIndex)
    .trim()
    .replace(/^['"]|['"]$/g, '')
  const value = trimmed
    .slice(separatorIndex + 1)
    .trim()
    .replace(/^['"]|['"]$/g, '')

  if (!key) {
    return null
  }

  return { key, value }
}
