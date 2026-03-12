import carnegieTokens from '@dnb/eufemia/src/style/themes/figma/dnbcarnegie-light.tokens.json'
import sbankenTokens from '@dnb/eufemia/src/style/themes/figma/sbanken-light.tokens.json'
import uiTokens from '@dnb/eufemia/src/style/themes/figma/dnb-light.tokens.json'

export const tokenNamingPolicy = {
  prefix: '--token-',
  categories: ['color'],
  colorSections: ['background', 'text', 'icon', 'stroke', 'decorative'],
  componentSections: ['component-*'],
  givenLabels: [
    'action',
    'neutral',
    'destructive',
    'marketing',
    'selected',
    'info',
    'positive',
    'warning',
    'error',
    'page',
  ],
  disallowedSuffixes: ['-wip'],
} as const

export const tokenSectionOrder = [
  'background',
  'text',
  'icon',
  'stroke',
  'decorative',
  'component',
] as const

export type TokenSectionId = (typeof tokenSectionOrder)[number]
export type ThemeName = 'ui' | 'sbanken' | 'carnegie'
export type TokenAudience = 'base' | 'state' | 'advanced'

type FigmaValue = {
  alpha?: number
  hex?: string
  components?: number[]
}

type FigmaAliasData = {
  targetVariableName?: string
}

type FigmaExtensions = {
  'com.figma.aliasData'?: FigmaAliasData
}

type FigmaTokenLeaf = {
  $type: string
  $value?: FigmaValue
  $extensions?: FigmaExtensions
}

type FigmaTokenNode = FigmaTokenLeaf | FigmaTokenGroup

type FigmaTokenGroup = {
  [key: string]: FigmaTokenNode
}

export type TokenRow = {
  name: string
  path: string[]
  section: TokenSectionId
  group: string
  audience: TokenAudience
  references: Record<ThemeName, string>
  foundationReferences: Record<ThemeName, string | null>
}

export type TokenSectionGroup = {
  id: string
  title: string
  tokens: TokenRow[]
}

export type TokenSection = {
  id: TokenSectionId
  title: string
  tokens: TokenRow[]
  groups: TokenSectionGroup[]
}

type TokenEntry = {
  name: string
  path: string[]
  section: TokenSectionId
  group: string
  audience: TokenAudience
  reference: string
  foundationReference: string | null
}

const themeSources: Record<ThemeName, FigmaTokenGroup> = {
  ui: uiTokens as unknown as FigmaTokenGroup,
  sbanken: sbankenTokens as unknown as FigmaTokenGroup,
  carnegie: carnegieTokens as unknown as FigmaTokenGroup,
}

const collator = new Intl.Collator('en', {
  numeric: true,
  sensitivity: 'base',
})

const isTokenLeaf = (node: FigmaTokenNode): node is FigmaTokenLeaf => {
  return typeof node === 'object' && node !== null && '$type' in node
}

const formatAlpha = (alpha: number) => {
  return `${parseFloat((alpha * 100).toFixed(2))}%`
}

const formatRgbChannel = (channel: number) => {
  return Math.round(channel * 255)
}

const readTokenReference = (node: FigmaTokenLeaf) => {
  const hex = node.$value?.hex
  const alpha = node.$value?.alpha
  const components = node.$value?.components

  if (
    Array.isArray(components) &&
    components.length === 3 &&
    typeof alpha === 'number' &&
    alpha !== 1
  ) {
    const [red, green, blue] = components.map(formatRgbChannel)
    return `rgba(${red} ${green} ${blue} / ${formatAlpha(alpha)})`
  }

  return hex || 'n/a'
}

const readFoundationReference = (node: FigmaTokenLeaf) => {
  return (
    node.$extensions?.['com.figma.aliasData']?.targetVariableName || null
  )
}

export const humanizeTokenSegment = (value: string) => {
  return value
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

const stateSegments = new Set(['hover', 'pressed', 'focus', 'disabled'])

const advancedSegments = new Set([
  'ondark',
  'onlight',
  'onsubtle',
  'subtle',
  'static',
])

export const classifyTokenAudience = (
  tokenName: string,
  section: TokenSectionId
): TokenAudience => {
  if (section === 'decorative') {
    return 'advanced'
  }

  const segments = tokenName.split('-').filter(Boolean)

  if (segments.some((segment) => stateSegments.has(segment))) {
    return 'state'
  }

  if (segments.some((segment) => advancedSegments.has(segment))) {
    return 'advanced'
  }

  return 'base'
}

export const buildThemeTokenEntries = (
  source: FigmaTokenGroup,
  path: string[] = []
): TokenEntry[] => {
  return Object.entries(source).flatMap(([key, value]) => {
    if (key.startsWith('$')) {
      return []
    }

    const nextPath = [...path, key]

    if (isTokenLeaf(value)) {
      const section = nextPath[1] as TokenSectionId
      const name = `${tokenNamingPolicy.prefix}${nextPath.join('-')}`

      return [
        {
          name,
          path: nextPath,
          section,
          group: nextPath[2] || 'general',
          audience: classifyTokenAudience(name, section),
          reference: readTokenReference(value),
          foundationReference: readFoundationReference(value),
        },
      ]
    }

    return buildThemeTokenEntries(value as FigmaTokenGroup, nextPath)
  })
}

export const buildTokenSections = (
  themes: Record<ThemeName, FigmaTokenGroup> = themeSources
): TokenSection[] => {
  const entriesByTheme = Object.fromEntries(
    Object.entries(themes).map(([theme, source]) => {
      return [theme, buildThemeTokenEntries(source)]
    })
  ) as Record<ThemeName, TokenEntry[]>

  const tokenMap = new Map<string, TokenRow>()

  ;(['ui', 'sbanken', 'carnegie'] as ThemeName[]).forEach((theme) => {
    entriesByTheme[theme].forEach((entry) => {
      const existing = tokenMap.get(entry.name)

      if (existing) {
        existing.references[theme] = entry.reference
        existing.foundationReferences[theme] = entry.foundationReference
        return
      }

      tokenMap.set(entry.name, {
        name: entry.name,
        path: entry.path,
        section: entry.section,
        group: entry.group,
        audience: entry.audience,
        references: {
          ui: theme === 'ui' ? entry.reference : 'n/a',
          sbanken: theme === 'sbanken' ? entry.reference : 'n/a',
          carnegie: theme === 'carnegie' ? entry.reference : 'n/a',
        },
        foundationReferences: {
          ui: theme === 'ui' ? entry.foundationReference : null,
          sbanken: theme === 'sbanken' ? entry.foundationReference : null,
          carnegie:
            theme === 'carnegie' ? entry.foundationReference : null,
        },
      })
    })
  })

  return tokenSectionOrder.map((sectionId) => {
    const tokens = Array.from(tokenMap.values())
      .filter((token) => token.section === sectionId)
      .sort((a, b) => collator.compare(a.name, b.name))

    const groupMap = new Map<string, TokenRow[]>()

    tokens.forEach((token) => {
      const key = token.group
      const groupTokens = groupMap.get(key) || []
      groupTokens.push(token)
      groupMap.set(key, groupTokens)
    })

    return {
      id: sectionId,
      title: humanizeTokenSegment(sectionId),
      tokens,
      groups: Array.from(groupMap.entries())
        .sort(([a], [b]) => collator.compare(a, b))
        .map(([groupId, groupTokens]) => ({
          id: groupId,
          title: humanizeTokenSegment(groupId),
          tokens: groupTokens.sort((a, b) =>
            collator.compare(a.name, b.name)
          ),
        })),
    }
  })
}

export const tokenSections = buildTokenSections()

export const countTokensByAudience = (
  tokens: TokenRow[]
): Record<TokenAudience, number> => {
  return tokens.reduce(
    (acc, token) => {
      acc[token.audience] += 1
      return acc
    },
    {
      base: 0,
      state: 0,
      advanced: 0,
    } as Record<TokenAudience, number>
  )
}
