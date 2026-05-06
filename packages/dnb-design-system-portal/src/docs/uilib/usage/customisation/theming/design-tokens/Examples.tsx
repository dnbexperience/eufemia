import {
  Fragment,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { basicComponents } from '../../../../../../shared/tags'
import Table from '../../../../../../shared/tags/Table'
import Anchor from '../../../../../../shared/tags/Anchor'
import { Td, Th, Tooltip, Tr, Card, P, Lead } from '@dnb/eufemia/src'
import { Theme, useTheme } from '@dnb/eufemia/src/shared'
import useHandleSortState from '@dnb/eufemia/src/components/table/useHandleSortState'
import { Field } from '@dnb/eufemia/src/extensions/forms'
import {
  collator,
  tokenModifierOrder,
  tokenNamingPolicy,
  tokenSections,
  type TokenModifier,
  type TokenRow,
  type TokenSectionId,
} from '../../../../../../uilib/utils/designTokens'

const MDXCode = basicComponents.code
const MDXParagraph = basicComponents.p
type DecorativeVariant = 'non-static' | 'static'
type TokenType = 'color' | 'spacing'
const defaultVisibleTypes: TokenType[] = ['color']
const TokenTypeContext = createContext<TokenType[]>(defaultVisibleTypes)

const renderInlineCodeList = (values: readonly string[]) => {
  return values.map((value, index) => (
    <Fragment key={value}>
      {index > 0 ? ', ' : null}
      <MDXCode>{value}</MDXCode>
    </Fragment>
  ))
}

const modifierLabels: Record<TokenModifier, string> = {
  hover: 'Hover',
  pressed: 'Pressed',
  focus: 'Focus',
  disabled: 'Disabled',
  inverse: 'Inverse',
  ondark: 'On dark',
  onlight: 'On light',
  onsubtle: 'On subtle',
  subtle: 'Subtle',
  bold: 'Bold',
  base: 'Base',
  muted: 'Muted',
  intense: 'Intense',
  alternative: 'Alternative',
  destructive: 'Destructive',
  static: 'Static',
}

const decorativeGroupLabels: Record<string, string> = {
  first: 'First',
  second: 'Second',
  third: 'Third',
}

const decorativeVariantLabels: Record<DecorativeVariant, string> = {
  'non-static': 'Non-static',
  static: 'Static',
}

const decorativeGroupSortOrder: Record<string, number> = {
  first: 0,
  second: 1,
  third: 2,
}

const cellVerticalMiddle: CSSProperties = {
  verticalAlign: 'middle',
}

const swatchWrapperStyle: CSSProperties = {
  alignItems: 'center',
  display: 'inline-flex',
  gap: '0.5rem',
}

const swatchBackdropStyle: CSSProperties = {
  alignItems: 'center',
  backgroundImage:
    'linear-gradient(45deg, #dfe3e6 25%, transparent 25%), linear-gradient(-45deg, #dfe3e6 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #dfe3e6 75%), linear-gradient(-45deg, transparent 75%, #dfe3e6 75%)',
  backgroundPosition: '0 0, 0 0.25rem, 0.25rem -0.25rem, -0.25rem 0',
  backgroundSize: '0.5rem 0.5rem',
  border: '1px solid var(--token-color-stroke-neutral-subtle)',
  borderRadius: '0.25rem',
  display: 'inline-flex',
  height: '1rem',
  justifyContent: 'center',
  overflow: 'hidden',
  width: '1rem',
}

const renderColorValue = (value: string) => {
  if (!value || value === 'n/a') {
    return <MDXCode>{value}</MDXCode>
  }

  return (
    <span style={swatchWrapperStyle}>
      <span aria-hidden style={swatchBackdropStyle}>
        <span
          style={{
            backgroundColor: value,
            display: 'block',
            height: '100%',
            width: '100%',
          }}
        />
      </span>
      <MDXCode>{value}</MDXCode>
    </span>
  )
}

type ColorScheme = 'light' | 'dark'
type SurfaceVariant = 'default' | 'inverse' | 'ondark'

type DarkModeSwatch = {
  label: string
  textToken: string
  iconToken: string
  surface: SurfaceVariant
}

const darkModeSwatchRows: DarkModeSwatch[] = [
  {
    label: 'neutral',
    textToken: '--token-color-text-neutral',
    iconToken: '--token-color-icon-neutral',
    surface: 'default',
  },
  {
    label: 'neutral-inverse',
    textToken: '--token-color-text-neutral-inverse',
    iconToken: '--token-color-icon-neutral-inverse',
    surface: 'inverse',
  },
  {
    label: 'neutral-ondark',
    textToken: '--token-color-text-neutral-ondark',
    iconToken: '--token-color-icon-neutral-ondark',
    surface: 'ondark',
  },
  {
    label: 'action',
    textToken: '--token-color-text-action',
    iconToken: '--token-color-icon-action',
    surface: 'default',
  },
  {
    label: 'action-inverse',
    textToken: '--token-color-text-action-inverse',
    iconToken: '--token-color-icon-action-inverse',
    surface: 'inverse',
  },
  {
    label: 'action-ondark',
    textToken: '--token-color-text-action-ondark',
    iconToken: '--token-color-icon-action-ondark',
    surface: 'ondark',
  },
]

const darkModeGridStyle: CSSProperties = {
  display: 'grid',
  gap: '1rem',
  gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))',
  marginBlock: '1.5rem',
}

const darkModeSwatchListStyle: CSSProperties = {
  display: 'grid',
  gap: '0.75rem',
}

const darkModeCardInnerStyle: CSSProperties = {
  alignItems: 'center',
  display: 'flex',
  gap: '0.75rem',
  justifyContent: 'space-between',
}

const darkModeCardLabelStyle: CSSProperties = {
  display: 'grid',
  gap: '0.25rem',
}

const darkModeCardNameStyle: CSSProperties = {
  margin: 0,
  // fontSize: '1rem',
  // fontWeight: 600,
  // lineHeight: 1.2,
}

const darkModeCardSurfaceStyle: CSSProperties = {
  margin: 0,
  // fontSize: '0.75rem',
  opacity: 0.8,
}

const darkModeCardTokensStyle: CSSProperties = {
  display: 'grid',
  gap: '0.125rem',
  marginTop: '0.75rem',
}

const darkModeCardIconStyle: CSSProperties = {
  display: 'inline-flex',
  flexShrink: 0,
}

const getSurfaceLabel = (surface: SurfaceVariant) => {
  if (surface === 'ondark') {
    return 'Dark surface'
  }

  if (surface === 'inverse') {
    return 'Opposite scheme'
  }

  return 'Current scheme'
}

const getCardSurfaceStyle = (
  scheme: ColorScheme,
  surface: SurfaceVariant,
  theme: ReturnType<typeof useTheme>
): CSSProperties => {
  if (surface === 'ondark') {
    return {
      backgroundColor: 'var(--token-color-decorative-first-bold-static)',
      borderColor: 'var(--token-stroke-color-neutral-subtle)',
    }
  }

  if (surface === 'inverse') {
    // In light scheme, inverse surface is dark, and vice versa. This ensures that the swatch surface always has some contrast with the text and icon colors.
    if (scheme === 'light' && theme.colorScheme === 'dark') {
      scheme = 'dark'
    }

    return scheme === 'light'
      ? {
          backgroundColor: '#000',
          borderColor: 'var(--token-stroke-color-neutral-subtle)',
        }
      : {
          backgroundColor: '#fff',
        }
  }

  return {
    backgroundColor: 'var(--token-color-background-neutral)',
  }
}

const DarkModeCard = ({
  scheme,
  row,
}: {
  scheme: ColorScheme
  row: DarkModeSwatch
}) => {
  const theme = useTheme()
  const surfaceStyle = getCardSurfaceStyle(scheme, row.surface, theme)

  return (
    <Card style={surfaceStyle} stack>
      <div style={darkModeCardInnerStyle}>
        <div style={darkModeCardLabelStyle}>
          <Lead
            style={{
              ...darkModeCardNameStyle,
              color: `var(${row.textToken})`,
            }}
          >
            {row.label}
          </Lead>
          <P
            className="dnb-t__size--x-small"
            style={{
              ...darkModeCardSurfaceStyle,
              color: `var(${row.textToken})`,
            }}
          >
            {getSurfaceLabel(row.surface)}
          </P>
        </div>
        <span
          aria-hidden
          style={{
            ...darkModeCardIconStyle,
            color: `var(${row.iconToken})`,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4" fill="currentColor" />
            <path
              d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.72 5.28l-2.12 2.12M7.4 16.6l-2.12 2.12M18.72 18.72l-2.12-2.12M7.4 7.4 5.28 5.28"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
            />
          </svg>
        </span>
      </div>
      <div style={darkModeCardTokensStyle}>
        <MDXCode>{row.textToken}</MDXCode>
      </div>
    </Card>
  )
}

export function DarkModeTokenSwatches() {
  const theme = useTheme()
  const schemes: ColorScheme[] =
    theme?.colorScheme === 'dark' ? ['dark', 'light'] : ['light', 'dark']

  return (
    <div style={darkModeGridStyle}>
      {schemes.map((scheme) => (
        <Card
          key={scheme}
          title={
            scheme === 'dark' ? 'Dark color scheme' : 'Light color scheme'
          }
        >
          <Theme colorScheme={scheme}>
            <div style={darkModeSwatchListStyle}>
              {darkModeSwatchRows.map((row) => (
                <DarkModeCard
                  key={`${scheme}-${row.label}`}
                  scheme={scheme}
                  row={row}
                />
              ))}
            </div>
          </Theme>
        </Card>
      ))}
    </div>
  )
}

const renderColorValueWithTooltip = (
  value: string,
  foundationReference: string | null
) => {
  const content = renderColorValue(value)

  if (!foundationReference || !value || value === 'n/a') {
    return content
  }

  return (
    <Tooltip showDelay={150} targetElement={<span>{content}</span>}>
      {foundationReference}
    </Tooltip>
  )
}

const getGroupLabel = (token: TokenRow) => {
  if (token.section === 'decorative') {
    return decorativeGroupLabels[token.group] || token.group
  }

  return token.group
}

const getTokenLabel = (token: TokenRow) => {
  return token.path[token.path.length - 1] || token.name
}

const isStaticToken = (token: TokenRow) => {
  const lastPathSegment = token.path[token.path.length - 1] || ''
  return lastPathSegment.endsWith('-static')
}

const sortTokensByDefault = (
  tokens: TokenRow[],
  section: TokenSectionId
) => {
  return [...tokens].sort((a, b) => {
    if (section === 'decorative') {
      const groupOrderA =
        decorativeGroupSortOrder[a.group] ?? Number.MAX_SAFE_INTEGER
      const groupOrderB =
        decorativeGroupSortOrder[b.group] ?? Number.MAX_SAFE_INTEGER

      if (groupOrderA !== groupOrderB) {
        return groupOrderA - groupOrderB
      }
    }

    const groupCompare = collator.compare(
      getGroupLabel(a),
      getGroupLabel(b)
    )

    if (groupCompare !== 0) {
      return groupCompare
    }

    return collator.compare(a.name, b.name)
  })
}

const sortTokensByGroup = (
  tokens: TokenRow[],
  section: TokenSectionId,
  direction: 'asc' | 'desc'
) => {
  return [...tokens].sort((a, b) => {
    let result = 0

    if (section === 'decorative') {
      const groupOrderA =
        decorativeGroupSortOrder[a.group] ?? Number.MAX_SAFE_INTEGER
      const groupOrderB =
        decorativeGroupSortOrder[b.group] ?? Number.MAX_SAFE_INTEGER

      result = groupOrderA - groupOrderB
    }

    if (result === 0) {
      result = collator.compare(getGroupLabel(a), getGroupLabel(b))
    }

    if (result === 0) {
      result = collator.compare(a.name, b.name)
    }

    return direction === 'desc' ? result * -1 : result
  })
}

const sortTokensByName = (
  tokens: TokenRow[],
  direction: 'asc' | 'desc'
) => {
  return [...tokens].sort((a, b) => {
    let result = collator.compare(getTokenLabel(a), getTokenLabel(b))

    if (result === 0) {
      result = collator.compare(getGroupLabel(a), getGroupLabel(b))
    }

    if (result === 0) {
      result = collator.compare(a.name, b.name)
    }

    return direction === 'desc' ? result * -1 : result
  })
}

const getAvailableModifiers = (tokens: TokenRow[]): TokenModifier[] => {
  const available = new Set<TokenModifier>()

  tokens.forEach((token) => {
    token.modifiers.forEach((modifier) => {
      available.add(modifier)
    })
  })

  return tokenModifierOrder.filter((modifier) => available.has(modifier))
}

export function TokenTypeFilter({ children }: { children: ReactNode }) {
  const [visibleTypes, setVisibleTypes] = useState<TokenType[]>(
    defaultVisibleTypes
  )

  return (
    <TokenTypeContext.Provider value={visibleTypes}>
      <Field.ArraySelection
        label="Show token families"
        value={visibleTypes}
        onChange={(value) => {
          setVisibleTypes((value as TokenType[]) || [])
        }}
        optionsLayout="horizontal"
        variant="button"
        size="medium"
        emptyValue={[]}
        bottom="medium"
      >
        <Field.Option value="color" title="Color" />
        <Field.Option value="spacing" title="Spacing" disabled />
      </Field.ArraySelection>

      {visibleTypes.includes('color') ? (
        children
      ) : (
        <MDXParagraph>
          No token families are visible. `Spacing` will be enabled once
          spacing tokens are part of the current token source.
        </MDXParagraph>
      )}
    </TokenTypeContext.Provider>
  )
}

export function TokenSectionOverview() {
  const visibleTypes = useContext(TokenTypeContext)

  if (!visibleTypes.includes('color')) {
    return null
  }

  const colorSections = tokenSections.filter(
    (section) => section.id !== 'radius'
  )

  return (
    <Table>
      <thead>
        <Tr>
          <Th>Section</Th>
          <Th>Tokens</Th>
          <Th>Usage</Th>
        </Tr>
      </thead>
      <tbody>
        {colorSections.map((section) => {
          return (
            <Tr key={section.id}>
              <Td>
                <Anchor
                  href={`/uilib/usage/customisation/theming/design-tokens/colors/#${section.id}`}
                >
                  {section.title}
                </Anchor>
              </Td>
              <Td>{section.tokens.length}</Td>
              <Td>
                {section.id === 'component'
                  ? 'For internal use only.'
                  : section.id === 'decorative'
                    ? 'For advanced custom decorative needs.'
                    : 'For external use. Use the filters in each section to narrow tokens to the variants you need.'}
              </Td>
            </Tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export function TokenNamingRules() {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Rule</Th>
          <Th>Current contract</Th>
        </Tr>
      </thead>
      <tbody>
        <Tr>
          <Td>Prefix</Td>
          <Td>
            <MDXCode>{tokenNamingPolicy.prefix}</MDXCode>
          </Td>
        </Tr>
        <Tr>
          <Td>Top-level categories</Td>
          <Td>{renderInlineCodeList(tokenNamingPolicy.categories)}</Td>
        </Tr>
        <Tr>
          <Td>Component sections (optional)</Td>
          <Td>
            {renderInlineCodeList(tokenNamingPolicy.componentSections)}
          </Td>
        </Tr>
        <Tr>
          <Td>Semantic Color sections</Td>
          <Td>{renderInlineCodeList(tokenNamingPolicy.colorSections)}</Td>
        </Tr>
        <Tr>
          <Td>Typical Color labels</Td>
          <Td>{renderInlineCodeList(tokenNamingPolicy.givenLabels)}</Td>
        </Tr>
        <Tr>
          <Td>Brand parity</Td>
          <Td>
            Every brand tokens file is expected to declare the same token
            names.
          </Td>
        </Tr>
      </tbody>
    </Table>
  )
}

export function TokenSectionTable({
  section,
}: {
  section: TokenSectionId
}) {
  const _visibleTypes = useContext(TokenTypeContext)
  const sectionData = tokenSections.find((item) => item.id === section)
  const sectionGroups = sectionData?.groups || []
  const sectionTokens = sectionData?.tokens || []
  const sectionTitle = sectionData?.title || section

  const availableModifiers = useMemo(
    () => getAvailableModifiers(sectionTokens),
    [sectionTokens]
  )
  const [activeModifiers, setActiveModifiers] = useState<TokenModifier[]>(
    []
  )
  const decorativeGroups = useMemo(() => {
    if (section !== 'decorative') {
      return []
    }

    return sectionGroups.map(({ id }) => id)
  }, [section, sectionGroups])
  const [visibleDecorativeGroups, setVisibleDecorativeGroups] =
    useState<string[]>(decorativeGroups)
  const [visibleDecorativeVariants, setVisibleDecorativeVariants] =
    useState<DecorativeVariant[]>(['non-static', 'static'])
  const { sortState, sortHandler, activeSortName } = useHandleSortState(
    {
      group: {
        active: true,
        direction: 'asc',
      },
      name: {
        direction: 'off',
      },
    },
    {
      direction: 'off',
      modes: ['asc', 'desc'],
    }
  )

  const visibleTokens = useMemo(() => {
    const filteredTokens = sectionTokens.filter((token) => {
      if (section === 'decorative') {
        const tokenVariant: DecorativeVariant = isStaticToken(token)
          ? 'static'
          : 'non-static'

        return (
          visibleDecorativeGroups.includes(token.group) &&
          visibleDecorativeVariants.includes(tokenVariant)
        )
      }

      if (activeModifiers.length === 0) {
        return true
      }

      return activeModifiers.every((modifier) =>
        token.modifiers.includes(modifier)
      )
    })

    if (activeSortName === 'group') {
      return sortTokensByGroup(
        filteredTokens,
        section,
        sortState.group.reversed ? 'desc' : 'asc'
      )
    }

    if (activeSortName === 'name') {
      return sortTokensByName(
        filteredTokens,
        sortState.name.reversed ? 'desc' : 'asc'
      )
    }

    return sortTokensByDefault(filteredTokens, section)
  }, [
    activeSortName,
    section,
    sectionTokens,
    sortState.group.reversed,
    sortState.name.reversed,
    activeModifiers,
    visibleDecorativeGroups,
    visibleDecorativeVariants,
  ])

  if (!sectionData) {
    return null
  }

  return (
    <>
      {section === 'decorative' ? (
        <>
          <Field.ArraySelection
            label="Show decorative token groups"
            value={visibleDecorativeGroups}
            onChange={(value) => {
              setVisibleDecorativeGroups((value as string[]) || [])
            }}
            optionsLayout="horizontal"
            variant="button"
            size="medium"
            emptyValue={[]}
            bottom="medium"
          >
            {decorativeGroups.map((group) => (
              <Field.Option
                key={group}
                value={group}
                title={decorativeGroupLabels[group] || group}
              />
            ))}
          </Field.ArraySelection>

          <Field.ArraySelection
            label="Show decorative token variants"
            value={visibleDecorativeVariants}
            onChange={(value) => {
              setVisibleDecorativeVariants(
                (value as DecorativeVariant[]) || []
              )
            }}
            optionsLayout="horizontal"
            variant="button"
            size="medium"
            emptyValue={[]}
            bottom="medium"
          >
            <Field.Option
              value="non-static"
              title={decorativeVariantLabels['non-static']}
            />
            <Field.Option
              value="static"
              title={decorativeVariantLabels.static}
            />
          </Field.ArraySelection>
        </>
      ) : availableModifiers.length > 0 ? (
        <Field.ArraySelection
          label={`Filter ${sectionTitle.toLowerCase()} tokens`}
          help={{
            title: 'Filters',
            content:
              'Select one or more modifiers to narrow the list. Tokens must include all selected modifiers to appear.',
          }}
          value={activeModifiers}
          onChange={(value) => {
            setActiveModifiers((value as TokenModifier[]) || [])
          }}
          optionsLayout="horizontal"
          variant="button"
          size="medium"
          emptyValue={[]}
          bottom="medium"
        >
          {availableModifiers.map((modifier) => (
            <Field.Option
              key={modifier}
              value={modifier}
              title={modifierLabels[modifier]}
            />
          ))}
        </Field.ArraySelection>
      ) : null}

      {visibleTokens.length === 0 ? (
        <MDXParagraph>
          No {sectionTitle.toLowerCase()} tokens match the current filter.
        </MDXParagraph>
      ) : (
        <Table>
          <thead>
            <Tr>
              {section === 'decorative' ? (
                <>
                  <Th
                    noWrap
                    sortable
                    active={sortState.group.active}
                    reversed={sortState.group.reversed}
                  >
                    <Th.SortButton
                      text="Group"
                      title="Sort by group"
                      onClick={sortHandler.group}
                    />
                  </Th>
                  <Th
                    noWrap
                    sortable
                    active={sortState.name.active}
                    reversed={sortState.name.reversed}
                  >
                    <Th.SortButton
                      text="Name"
                      title="Sort by name"
                      onClick={sortHandler.name}
                    />
                  </Th>
                </>
              ) : (
                <>
                  <Th
                    noWrap
                    sortable
                    active={sortState.group.active}
                    reversed={sortState.group.reversed}
                  >
                    <Th.SortButton
                      text="Group"
                      title="Sort by group"
                      onClick={sortHandler.group}
                    />
                  </Th>
                </>
              )}
              <Th noWrap>Token</Th>
              <Th noWrap>DNB Light</Th>
              <Th noWrap>DNB Dark</Th>
              <Th noWrap>Sbanken Light</Th>
              <Th noWrap>Sbanken Dark</Th>
              <Th noWrap>Carnegie</Th>
            </Tr>
          </thead>
          <tbody>
            {visibleTokens.map((token) => (
              <Tr key={token.name}>
                {section === 'decorative' ? (
                  <>
                    <Td>{getGroupLabel(token)}</Td>
                    <Td>{getTokenLabel(token)}</Td>
                  </>
                ) : (
                  <>
                    <Td>{getGroupLabel(token)}</Td>
                  </>
                )}
                <Td>
                  <MDXCode>{token.name}</MDXCode>
                </Td>
                <Td>
                  {renderColorValueWithTooltip(
                    token.references.uiLight,
                    token.foundationReferences.uiLight
                  )}
                </Td>
                <Td>
                  {renderColorValueWithTooltip(
                    token.references.uiDark,
                    token.foundationReferences.uiDark
                  )}
                </Td>
                <Td>
                  {renderColorValueWithTooltip(
                    token.references.sbankenLight,
                    token.foundationReferences.sbankenLight
                  )}
                </Td>
                <Td>
                  {renderColorValueWithTooltip(
                    token.references.sbankenDark,
                    token.foundationReferences.sbankenDark
                  )}
                </Td>
                <Td>
                  {renderColorValueWithTooltip(
                    token.references.carnegie,
                    token.foundationReferences.carnegie
                  )}
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export function TokenExample({ name }: { name: string }) {
  return <MDXCode>{name}</MDXCode>
}

const radiusPreviewStyle: CSSProperties = {
  backgroundColor: 'var(--token-color-background-neutral-subtle)',
  border: '1px solid var(--token-color-stroke-neutral-subtle)',
  display: 'inline-block',
  height: '4rem',
  width: '4rem',
}

const renderRadiusValue = (value: string) => {
  return (
    <span style={swatchWrapperStyle}>
      <span
        aria-hidden
        style={{ ...radiusPreviewStyle, borderRadius: value }}
      />
      <MDXCode>{value}</MDXCode>
    </span>
  )
}

export function RadiusTokenTable() {
  const sectionData = tokenSections.find((item) => item.id === 'radius')
  const tokens = sectionData?.tokens || []

  if (tokens.length === 0) {
    return (
      <MDXParagraph>
        No radius tokens found in the token source.
      </MDXParagraph>
    )
  }

  return (
    <Table>
      <thead>
        <Tr>
          <Th noWrap>Token</Th>
          <Th noWrap>DNB Light</Th>
          <Th noWrap>DNB Dark</Th>
          <Th noWrap>Sbanken Light</Th>
          <Th noWrap>Sbanken Dark</Th>
          <Th noWrap>Carnegie</Th>
        </Tr>
      </thead>
      <tbody>
        {tokens.map((token) => (
          <Tr key={token.name}>
            <Td style={cellVerticalMiddle}>
              <MDXCode>{token.name}</MDXCode>
            </Td>
            <Td>{renderRadiusValue(token.references.uiLight)}</Td>
            <Td>{renderRadiusValue(token.references.uiDark)}</Td>
            <Td>{renderRadiusValue(token.references.sbankenLight)}</Td>
            <Td>{renderRadiusValue(token.references.sbankenDark)}</Td>
            <Td>{renderRadiusValue(token.references.carnegie)}</Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  )
}
