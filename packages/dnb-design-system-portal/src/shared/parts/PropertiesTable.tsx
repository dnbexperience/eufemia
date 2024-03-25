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
}: {
  props: PropertiesTableProps
  valueType?: unknown
  camelCase?: boolean
  omit?: string[]
}) {
  const keys = Object.keys(props)
  const tableRows = Object.entries(props).map(
    ([key, { type, doc, state }]) => {
      if (omit && omit.includes(key)) {
        return null
      }

      if (
        typeof type === 'string' &&
        String(type).includes('{valueType}')
      ) {
        type = valueType as string
      }

      return (
        <Tr key={key}>
          <Td>
            <Copy>
              <Code>{formatName(camelCase ? toCamelCase(key) : key)}</Code>
            </Copy>
          </Td>
          <Td>
            {Array.isArray(type) ? (
              type
                .map((t) => (
                  <Copy key={t}>
                    <Code>{t}</Code>
                  </Copy>
                ))
                .reduce((prev, curr) => (
                  <>
                    {prev} or {curr}
                  </>
                ))
            ) : (
              <Copy>
                <Code>{type}</Code>
              </Copy>
            )}
          </Td>
          <Td>
            <em>({state})</em>{' '}
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
