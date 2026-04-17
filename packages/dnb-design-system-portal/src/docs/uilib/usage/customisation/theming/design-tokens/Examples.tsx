import React from 'react'
import { basicComponents } from '../../../../../../shared/tags'
import Table from '../../../../../../shared/tags/Table'
import Anchor from '../../../../../../shared/tags/Anchor'
import { Td, Th, Tooltip, Tr } from '@dnb/eufemia/src'
import useHandleSortState from '@dnb/eufemia/src/components/table/useHandleSortState'
import { Field } from '@dnb/eufemia/src/extensions/forms'
import {
  tokenModifierOrder,
  tokenNamingPolicy,
  tokenSections,
  type TokenModifier,
  type TokenRow,
  type TokenSectionId,
} from '../../../../../../uilib/utils/designTokens'

const isDev =
  process.env.NODE_ENV === 'development' ||
  process.env.GATSBY_IS_PREVIEW === 'true'

const MDXCode = basicComponents.code
const MDXParagraph = basicComponents.p
type TokenType = 'color' | 'spacing'
type DecorativeVariant = 'non-static' | 'static'
const defaultVisibleTypes: TokenType[] = ['color']
const TokenTypeContext = React.createContext<TokenType[]>(
  defaultVisibleTypes
)

const renderInlineCodeList = (values: readonly string[]) => {
  return values.map((value, index) => (
    <React.Fragment key={value}>
      {index > 0 ? ', ' : null}
      <MDXCode>{value}</MDXCode>
    </React.Fragment>
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

const collator = new Intl.Collator('en', {
  numeric: true,
  sensitivity: 'base',
})

const swatchWrapperStyle: React.CSSProperties = {
  alignItems: 'center',
  display: 'inline-flex',
  gap: '0.5rem',
}

const swatchBackdropStyle: React.CSSProperties = {
  alignItems: 'center',
  backgroundImage:
    'linear-gradient(45deg, #dfe3e6 25%, transparent 25%), linear-gradient(-45deg, #dfe3e6 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #dfe3e6 75%), linear-gradient(-45deg, transparent 75%, #dfe3e6 75%)',
  backgroundPosition: '0 0, 0 0.25rem, 0.25rem -0.25rem, -0.25rem 0',
  backgroundSize: '0.5rem 0.5rem',
  border: '1px solid var(--color-black-8)',
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

export function TokenTypeFilter({
  children,
}: {
  children: React.ReactNode
}) {
  const [visibleTypes, setVisibleTypes] = React.useState<TokenType[]>(
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
  const visibleTypes = React.useContext(TokenTypeContext)

  if (!visibleTypes.includes('color')) {
    return null
  }

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
        {tokenSections.map((section) => {
          return (
            <Tr key={section.id}>
              <Td>
                <Anchor
                  href={`/uilib/usage/customisation/theming/design-tokens/tokens/#${section.id}`}
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
  const visibleTypes = React.useContext(TokenTypeContext)
  const sectionData = tokenSections.find((item) => item.id === section)
  const sectionGroups = sectionData?.groups || []
  const sectionTokens = sectionData?.tokens || []
  const sectionTitle = sectionData?.title || section

  const availableModifiers = React.useMemo(
    () => getAvailableModifiers(sectionTokens),
    [sectionTokens]
  )
  const [activeModifiers, setActiveModifiers] = React.useState<
    TokenModifier[]
  >([])
  const decorativeGroups = React.useMemo(() => {
    if (section !== 'decorative') {
      return []
    }

    return sectionGroups.map(({ id }) => id)
  }, [section, sectionGroups])
  const [visibleDecorativeGroups, setVisibleDecorativeGroups] =
    React.useState<string[]>(decorativeGroups)
  const [visibleDecorativeVariants, setVisibleDecorativeVariants] =
    React.useState<DecorativeVariant[]>(['non-static', 'static'])
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

  const visibleTokens = React.useMemo(() => {
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

  if (!sectionData || !visibleTypes.includes('color')) {
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
              {isDev && <Th noWrap>DNB Dark</Th>}
              <Th noWrap>Sbanken Light</Th>
              {isDev && <Th noWrap>Sbanken Dark</Th>}
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
                {isDev && (
                  <Td>
                    {renderColorValueWithTooltip(
                      token.references.uiDark,
                      token.foundationReferences.uiDark
                    )}
                  </Td>
                )}
                <Td>
                  {renderColorValueWithTooltip(
                    token.references.sbankenLight,
                    token.foundationReferences.sbankenLight
                  )}
                </Td>
                {isDev && (
                  <Td>
                    {renderColorValueWithTooltip(
                      token.references.sbankenDark,
                      token.foundationReferences.sbankenDark
                    )}
                  </Td>
                )}
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
