import ReactMarkdown from 'react-markdown'
import styled from '@emotion/styled'
import { Code, Table, Td, Th, Tr } from '@dnb/eufemia/src'
import { PropertiesTableProps } from '@dnb/eufemia/src/shared/types'
import { toCamelCase } from '@dnb/eufemia/src/shared/component-helper'
import { basicComponents } from '../tags'
import Copy from '../tags/Copy'

const components = {
  ...basicComponents,
  p: (props) => <span {...props} />,
}

const StyledTable = styled(Table)`
  td {
    white-space: nowrap;
  }
`

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
  const keys = Object.keys(props)
  const tableRows = Object.entries(props).map(
    ([key, { type, defaultValue, doc, status }]) => {
      if (omit && omit.includes(key)) {
        return null
      }
      if (!Array.isArray(type)) {
        type = [type]
      }
      const name = formatName(camelCase ? toCamelCase(key) : key)
      return (
        <Tr key={key}>
          <Td>
            <Copy>
              <Code>{status === 'deprecated' ? <s>{name}</s> : name}</Code>
            </Copy>
          </Td>
          <Td>
            {type
              .map((t) => {
                if (typeof t === 'string') {
                  if (String(t).includes('{valueType}')) {
                    t = valueType as string
                  }
                  return (
                    <Copy key={t}>
                      <Code>{t}</Code>
                    </Copy>
                  )
                }
              })
              .reduce((prev, curr) => (
                <>
                  {prev} or {curr}
                </>
              ))}
          </Td>
          {showDefaultValue && (
            <Td>
              {defaultValue === 'undefined' ? (
                defaultValue
              ) : (
                <Copy>
                  <Code>{defaultValue}</Code>
                </Copy>
              )}
            </Td>
          )}
          <Td>
            <em>({status})</em>{' '}
            <ReactMarkdown components={components}>
              {camelCase ? convertToCamelCase(doc, keys) : doc}
            </ReactMarkdown>
          </Td>
        </Tr>
      )
    },
  )

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

function formatName(name: string): React.ReactNode | string {
  if (name.includes('/')) {
    return <ReactMarkdown components={components}>{name}</ReactMarkdown>
  }

  return name
}
