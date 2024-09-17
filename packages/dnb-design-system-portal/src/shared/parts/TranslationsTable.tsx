import styled from '@emotion/styled'
import { Anchor, P, Table, Td, Th, Tr } from '@dnb/eufemia/src'
import { extendDeep, warn } from '@dnb/eufemia/src/shared/component-helper'
import globalTranslations from '@dnb/eufemia/src/shared/locales'
import formsTranslations from '@dnb/eufemia/src/extensions/forms/constants/locales'
import { FormattedCode } from './PropertiesTable'
import { Translation } from '@dnb/eufemia/src/shared/Context'

const StyledTable = styled(Table)`
  td {
    white-space: nowrap;
  }
`

export default function TranslationsTable({
  localeKey,
  source = null,
}: {
  localeKey?: string | Array<string>
  source?: Record<string, Translation>
}) {
  if (!source) {
    source = extendDeep({}, globalTranslations, formsTranslations)
  }

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

  const addToEntries = (key, translation, locale, localeKey) => {
    key = `${localeKey}.${key}`
    if (allowList[localeKey] && !allowList[localeKey].includes(key)) {
      return
    }
    entries[key] = Object.assign(entries[key] || {}, {
      [locale]: translation,
    })
  }

  Object.entries(source).forEach(([locale, translations]) => {
    localeKeys.forEach((localeKey) => {
      const translationsObj = translations[localeKey]
      if (!translationsObj) {
        warn(
          `TranslationsTable: Could not find any translations for key: "${localeKey}", perhaps you misspelled the key's name?`,
        )
        return
      }
      Object.entries(translationsObj).forEach(([key, translation]) => {
        if (typeof translation === 'object') {
          const nestedKey = `${localeKey}.${key}`
          Object.entries(translation).forEach(([key, translation]) => {
            addToEntries(key, translation, locale, nestedKey)
          })
        } else {
          addToEntries(key, translation, locale, localeKey)
        }
      })
    })
  })

  const locales = Object.keys(source)
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

  if (tableRows.length == 0) {
    warn(
      `TranslationsTable: Not able to find any translations for input : "${localeKey}", hence not rendering the translations table.`,
    )
    return
  }

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
