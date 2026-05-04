import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm-react-markdown'
import styled from '@emotion/styled'
import { Table, Td, Th, Tr } from '@dnb/eufemia/src'
import { useHandleSortState } from '@dnb/eufemia/src/components/table/useHandleSortState'
import type { PropertiesTableProps } from '@dnb/eufemia/src/shared/types'
import { basicComponents } from '../tags'

const components = {
  ...basicComponents,
  p: (props) => <span {...props} />,
}

const StyledTable = styled(Table)`
  td:not(.description):not(.type) {
    white-space: nowrap;
  }
`

const colors = {
  type: {
    default: 'var(--token-color-text-positive)',
    primitive: 'var(--token-color-text-positive)',
    string: 'var(--token-color-text-error)',
  },
  value: {
    default: 'var(--token-color-text-positive)',
    undefined: 'var(--token-color-text-neutral-alternative)',
    string: 'var(--token-color-text-error)',
  },
}

export const FormattedCode = ({
  variant,
  strikethrough,
  children,
  style = {},
  ...rest
}: {
  variant?: 'prop' | 'type' | 'value'
  strikethrough?: boolean
  style?: React.CSSProperties
  children?: React.ReactNode
}) => {
  if (strikethrough) {
    style.textDecoration = 'line-through'
  }
  if (typeof children === 'string') {
    switch (variant) {
      case 'prop': {
        break // add prop name styling at a future date with color 'var(--color-indigo)'
      }
      case 'type': {
        style.color = isString(children)
          ? colors.type.string
          : isPrimitive(children)
            ? colors.type.primitive
            : colors.type.default
        style.background = 'none'
        style.boxShadow = 'none'
        break
      }
      case 'value': {
        style.color = isString(children)
          ? colors.value.string
          : children === 'undefined' || children === 'null'
            ? colors.value.undefined
            : colors.value.default
        style.background = 'none'
        style.boxShadow = 'none'
        break
      }
    }
    return components.code({
      children: formatIfMarkdown(children),
      style,
      ...rest,
    })
  }
  return components.code({ children, style, ...rest })
}

export default function PropertiesTable({
  props,
  valueType = 'string',
  omit,
  pick,
  showDefaultValue = false,
}: {
  props: PropertiesTableProps
  valueType?: unknown
  omit?: string[]
  pick?: string[]
  showDefaultValue: boolean
}) {
  const { sortState, sortHandler, activeSortName } = useHandleSortState(
    {
      property: {
        direction: 'off',
      },
    },
    {
      direction: 'off',
      modes: ['asc', 'desc', 'off'],
    }
  )

  const entries = Object.entries(props || {}).filter(([key, props]) => {
    if (!props) {
      return false
    }
    if (pick && !pick.includes(key)) {
      return false
    }
    if (omit && omit.includes(key)) {
      return false
    }
    return true
  })

  if (activeSortName === 'property') {
    const direction = sortState.property.reversed ? -1 : 1
    entries.sort(([a], [b]) => direction * a.localeCompare(b))
  }

  const tableRows = entries.map(([key, props]) => {
    const { type, defaultValue, doc, status } = props

    return (
      <Tr key={key}>
        <Td>
          <FormattedCode
            variant="prop"
            strikethrough={status === 'deprecated'}
          >
            {key}
          </FormattedCode>
        </Td>
        <Td className="type">
          {(Array.isArray(type) ? type : [type])
            .map((t) => {
              if (typeof t === 'string') {
                if (String(t).includes('{valueType}')) {
                  if (Array.isArray(valueType)) {
                    return valueType
                      .map((t, i) => {
                        return (
                          <FormattedCode key={t + i} variant="type">
                            {t}
                          </FormattedCode>
                        )
                      })
                      .reduce((prev, curr) => (
                        <>
                          {prev} <br /> {curr}
                        </>
                      ))
                  }

                  t = valueType as string
                }

                return (
                  <FormattedCode key={t} variant="type">
                    {t}
                  </FormattedCode>
                )
              }
            })
            .reduce((prev, curr) => (
              <>
                {prev} <br /> {curr}
              </>
            ))}
        </Td>
        {showDefaultValue && (
          <Td>
            {defaultValue ? (
              <FormattedCode variant="value">{defaultValue}</FormattedCode>
            ) : (
              status === 'required' && 'REQUIRED'
            )}
          </Td>
        )}
        <Td className="description">
          {(!showDefaultValue || status === 'deprecated') && (
            <em>({status}) </em>
          )}
          <ReactMarkdown
            // @ts-expect-error -- strictFunctionTypes
            components={components}
            remarkPlugins={[remarkGfm]}
          >
            {doc}
          </ReactMarkdown>
        </Td>
      </Tr>
    )
  })

  return (
    <Table.ScrollView>
      <StyledTable outline border>
        <thead>
          <Tr>
            <Th
              noWrap
              sortable
              active={sortState.property.active}
              reversed={sortState.property.reversed}
            >
              <Th.SortButton
                text="Property"
                title="Sort by property name"
                onClick={sortHandler.property}
              />
            </Th>
            <Th>Type</Th>
            {showDefaultValue && <Th>Default value</Th>}
            <Th className="description">Description</Th>
          </Tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </StyledTable>
    </Table.ScrollView>
  )
}

function isString(str: string) {
  return ["'", '"', '`'].includes(str.substring(0, 1))
}

function isPrimitive(type: string) {
  return [
    'boolean',
    'true',
    'false',
    'number',
    'bigint',
    'string',
    'symbol',
  ].includes(typeWithoutArray(type))
}

function typeWithoutArray(type: string) {
  if (type.endsWith('[]')) {
    return type.slice(0, -2)
  } else if (type.startsWith('Array<') && type.endsWith('>')) {
    return type.slice(6, -1)
  }
  return type
}

export function formatIfMarkdown(name: string): React.ReactNode | string {
  if (name.includes('](')) {
    return (
      // @ts-expect-error -- strictFunctionTypes
      <ReactMarkdown components={components}>{name}</ReactMarkdown>
    )
  }

  return name
}
