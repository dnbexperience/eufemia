import React from 'react'
import { Table, Th, Tr, Td } from '@dnb/eufemia/src'
import currencies from '@dnb/eufemia/src/extensions/forms/constants/currencies'
import { FormattedCode } from 'dnb-design-system-portal/src/shared/parts/PropertiesTable'

export function AvailableCurrenciesTable() {
  return (
    <Table.ScrollView>
      <Table>
        <thead>
          <Tr>
            <Th>ISO 4217 code</Th>
            {Object.entries(currencies[0].i18n).map(([key]) => {
              return <Th key={key}>{key}</Th>
            })}
          </Tr>
        </thead>
        <tbody>
          {Object.entries(currencies).map(([key, values]) => {
            return (
              <Tr key={key}>
                <Td>
                  <FormattedCode variant="prop">
                    {values.iso}
                  </FormattedCode>
                </Td>
                {Object.entries(values.i18n).map(([locale, value], i) => {
                  return <Td key={i + locale}>{value}</Td>
                })}
              </Tr>
            )
          })}
        </tbody>
      </Table>
    </Table.ScrollView>
  )
}
