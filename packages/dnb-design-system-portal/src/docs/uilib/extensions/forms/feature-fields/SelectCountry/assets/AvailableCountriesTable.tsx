import React from 'react'
import { Table, Th, Tr, Td } from '@dnb/eufemia/src'
import useCountries from '@dnb/eufemia/src/extensions/forms/Field/SelectCountry/useCountries'
import { FormattedCode } from '../../../../../../../shared/parts/PropertiesTable'

export function AvailableCountriesTable() {
  const { countries } = useCountries()
  return (
    <Table.ScrollView>
      <Table>
        <thead>
          <Tr>
            <Th>ISO 3166-1 alpha-2 code</Th>
            {Object.entries(countries[0].i18n).map(([key]) => {
              return <Th key={key}>{key}</Th>
            })}
          </Tr>
        </thead>
        <tbody>
          {Object.entries(countries).map(([key, values]) => {
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
