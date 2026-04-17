import carnegieTokens from '@dnb/eufemia/src/style/themes/figma/dnbcarnegie-light.tokens.json'
import uiDarkTokens from '@dnb/eufemia/src/style/themes/figma/dnb-dark.tokens.json'
import sbankenLightTokens from '@dnb/eufemia/src/style/themes/figma/sbanken-light.tokens.json'
import sbankenDarkTokens from '@dnb/eufemia/src/style/themes/figma/sbanken-dark.tokens.json'
import uiLightTokens from '@dnb/eufemia/src/style/themes/figma/dnb-light.tokens.json'

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
export type ThemeName =
  | 'uiLight'
  | 'uiDark'
  | 'sbankenLight'
  | 'sbankenDark'
  | 'carnegie'
export type TokenModifier =
  | 'hover'
  | 'pressed'
  | 'focus'
  | 'disabled'
  | 'inverse'
  | 'ondark'
  | 'onlight'
  | 'onsubtle'
  | 'subtle'
  | 'bold'
  | 'base'
  | 'muted'
  | 'intense'
  | 'alternative'
  | 'destructive'
  | 'static'

export const tokenModifierOrder: readonly TokenModifier[] = [
  'hover',
  'pressed',
  'focus',
  'disabled',
  'inverse',
  'ondark',
  'onlight',
  'onsubtle',
  'subtle',
  'bold',
  'base',
  'muted',
  'intense',
  'alternative',
  'destructive',
  'static',
]

const tokenModifierSet = new Set<string>(tokenModifierOrder)

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
  modifiers: TokenModifier[]
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
  modifiers: TokenModifier[]
  reference: string
  foundationReference: string | null
}

const themeSources: Record<ThemeName, FigmaTokenGroup> = {
  uiLight: uiLightTokens as unknown as FigmaTokenGroup,
  uiDark: uiDarkTokens as unknown as FigmaTokenGroup,
  sbankenLight: sbankenLightTokens as unknown as FigmaTokenGroup,
  sbankenDark: sbankenDarkTokens as unknown as FigmaTokenGroup,
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

export const extractTokenModifiers = (
  path: readonly string[]
): TokenModifier[] => {
  const seen = new Set<TokenModifier>()
  const ordered: TokenModifier[] = []

  path.forEach((segment) => {
    segment
      .split('-')
      .filter(Boolean)
      .forEach((part) => {
        if (!tokenModifierSet.has(part)) {
          return
        }

        const modifier = part as TokenModifier

        if (!seen.has(modifier)) {
          seen.add(modifier)
          ordered.push(modifier)
        }
      })
  })

  return ordered
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
          modifiers: extractTokenModifiers(nextPath),
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

  ;(
    [
      'uiLight',
      'uiDark',
      'sbankenLight',
      'sbankenDark',
      'carnegie',
    ] as ThemeName[]
  ).forEach((theme) => {
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
        modifiers: entry.modifiers,
        references: {
          uiLight: theme === 'uiLight' ? entry.reference : 'n/a',
          uiDark: theme === 'uiDark' ? entry.reference : 'n/a',
          sbankenLight: theme === 'sbankenLight' ? entry.reference : 'n/a',
          sbankenDark: theme === 'sbankenDark' ? entry.reference : 'n/a',
          carnegie: theme === 'carnegie' ? entry.reference : 'n/a',
        },
        foundationReferences: {
          uiLight: theme === 'uiLight' ? entry.foundationReference : null,
          uiDark: theme === 'uiDark' ? entry.foundationReference : null,
          sbankenLight:
            theme === 'sbankenLight' ? entry.foundationReference : null,
          sbankenDark:
            theme === 'sbankenDark' ? entry.foundationReference : null,
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
