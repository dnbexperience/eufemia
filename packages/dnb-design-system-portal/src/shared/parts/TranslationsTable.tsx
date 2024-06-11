import styled from '@emotion/styled'
import { Anchor, P, Table, Td, Th, Tr } from '@dnb/eufemia/src'
import { extendDeep } from '@dnb/eufemia/src/shared/component-helper'
import globalTranslations from '@dnb/eufemia/src/shared/locales'
import formsTranslations from '@dnb/eufemia/src/extensions/forms/constants/locales'
import { FormattedCode } from './PropertiesTable'

const StyledTable = styled(Table)`
  td {
    white-space: nowrap;
  }
`

const allTranslations = extendDeep(
  {},
  globalTranslations,
  formsTranslations,
)

export default function TranslationsTable({
  localeKey,
}: {
  localeKey?: string | Array<string>
}) {
  const entries = {}
  const allowList = {}
  const localeKeys = (
    Array.isArray(localeKey) ? localeKey : [localeKey]
  ).map((key) => {
    if (key.includes('.')) {
      const first = key.split('.')[0]
      allowList[first] = allowList[first] || []
      allowList[first].push(key)
      return first
    }

    return key
  })

  Object.entries(allTranslations).forEach(([locale, translations]) => {
    localeKeys.forEach((localeKey) => {
      Object.entries(translations[localeKey]).forEach(
        ([key, translation]) => {
          key = `${localeKey}.${key}`
          if (
            allowList[localeKey] &&
            !allowList[localeKey].includes(key)
          ) {
            return
          }
          entries[key] = Object.assign(entries[key] || {}, {
            [locale]: translation,
          })
        },
      )
    })
  })

  const locales = Object.keys(allTranslations)
  const tableRows = Object.entries(entries).map(([key, values]) => {
    return (
      <Tr key={key}>
        <Td>
          <FormattedCode variant="prop">{key}</FormattedCode>
        </Td>
        {Object.entries(values).map(([locale, value], i) => {
          return (
            <Td key={i + locale}>
              {typeof value === 'string' ? (
                value
              ) : (
                <pre>{JSON.stringify(value, null, 2)}</pre>
              )}
            </Td>
          )
        })}
      </Tr>
    )
  })

  return (
    <>
      <P>
        More info about translations can be found in the{' '}
        <Anchor href="/uilib/usage/customisation/localization/">
          general localization
        </Anchor>{' '}
        and{' '}
        <Anchor href="/uilib/extensions/forms/getting-started/#localization-and-translation">
          Eufemia Forms localization
        </Anchor>{' '}
        docs.
      </P>
      <Table.ScrollView>
        <StyledTable>
          <thead>
            <Tr>
              <Th>Key</Th>
              {locales.map((locale) => (
                <Th key={locale}>{locale}</Th>
              ))}
            </Tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </StyledTable>
      </Table.ScrollView>
    </>
  )
}
