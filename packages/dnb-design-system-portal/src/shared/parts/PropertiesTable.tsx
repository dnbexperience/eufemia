import ReactMarkdown from 'react-markdown'
import styled from '@emotion/styled'
import { Table, Td, Th, Tr } from '@dnb/eufemia/src'
import { PropertiesTableProps } from '@dnb/eufemia/src/shared/types'
import { toCamelCase } from '@dnb/eufemia/src/shared/component-helper'
import { basicComponents } from '../tags'

const components = {
  ...basicComponents,
  p: (props) => <span {...props} />,
}

const StyledTable = styled(Table)`
  td {
    white-space: nowrap;
  }
`

const colorValue = 'var(--color-success-green)'
const colorString = 'var(--color-fire-red)'
const colorType = 'var(--color-violet)'
const colorUndefined = 'var(--color-black-55)'

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
        style.color = children.startsWith(`'`) ? colorString : colorType
        // falls through
      }
      case 'value': {
        style.color = children.startsWith(`'`)
          ? colorString
          : children === 'undefined' || children === 'null'
          ? colorUndefined
          : colorValue
        // falls through
      }
      default: {
        style.background = 'none'
        style.boxShadow = 'none'
      }
    }
  }
  return components.code({ children, style, ...rest })
}

export default function PropertiesTable({
  props,
  valueType = 'string',
  camelCase,
  omit,
  showDefaultValue = false,
}: {
  props: PropertiesTableProps
  valueType?: unknown
  camelCase?: boolean
  omit?: string[]
  showDefaultValue: boolean
}) {
  const keys = Object.keys(props || {})
  const tableRows = Object.entries(props || {}).map(([key, props]) => {
    if (!props) {
      return null
    }
    const { type, defaultValue, doc, status } = props
    if (omit && omit.includes(key)) {
      return null
    }

    return (
      <Tr key={key}>
        <Td>
          <FormattedCode
            variant="prop"
            strikethrough={status === 'deprecated'}
          >
            {formatName(camelCase ? toCamelCase(key) : key)}
          </FormattedCode>
        </Td>
        <Td>
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
        <Td>
          {(!showDefaultValue || status === 'deprecated') && (
            <em>({status}) </em>
          )}
          <ReactMarkdown components={components}>
            {camelCase ? convertToCamelCase(doc, keys) : doc}
          </ReactMarkdown>
        </Td>
      </Tr>
    )
  })

  return (
    <Table.ScrollView>
      <StyledTable>
        <thead>
          <Tr>
            <Th>Property</Th>
            <Th>Type</Th>
            {showDefaultValue && <Th>Default value</Th>}
            <Th>Description</Th>
          </Tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </StyledTable>
    </Table.ScrollView>
  )
}

// Replace existing properties inside a string. Use the keys from the props object to find and replace the values
function convertToCamelCase(doc: string, keys: string[]) {
  keys.forEach((key) => {
    doc = doc.replace(new RegExp(key, 'g'), toCamelCase(key))
  })
  return doc
}

export function formatName(name: string): React.ReactNode | string {
  if (name.includes('[')) {
    return <ReactMarkdown components={components}>{name}</ReactMarkdown>
  }

  return name
}
