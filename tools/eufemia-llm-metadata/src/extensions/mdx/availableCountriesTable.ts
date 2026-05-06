import type {
  SpecialMdxComponentRenderer,
  SpecialMdxRendererDeps,
} from './types.ts'
import { escapeMarkdownTableCell } from './utils.ts'

type AvailableCountryEntry = {
  iso: string
  i18n: Record<string, string>
}

let cachedAvailableCountries: AvailableCountryEntry[] | null = null

export function createAvailableCountriesTableExtension(
  deps: SpecialMdxRendererDeps
): SpecialMdxComponentRenderer {
  return {
    name: 'AvailableCountriesTable',
    replace: (content) => replaceAvailableCountriesTables(content, deps),
  }
}

async function replaceAvailableCountriesTables(
  content: string,
  deps: SpecialMdxRendererDeps
) {
  const regex = /<AvailableCountriesTable\b[^>]*\/>/g

  if (!regex.test(content)) {
    return content
  }

  regex.lastIndex = 0
  const countries = await loadAvailableCountries(deps)

  if (countries.length === 0) {
    return content
  }

  return content.replace(regex, () => {
    return `\n${renderAvailableCountriesMarkdown(countries)}\n`
  })
}

async function loadAvailableCountries(deps: SpecialMdxRendererDeps) {
  if (cachedAvailableCountries) {
    return cachedAvailableCountries
  }

  const countries = await deps.loadModuleDefault(
    '@dnb/eufemia/src/extensions/forms/constants/countries'
  )

  if (!Array.isArray(countries)) {
    return []
  }

  cachedAvailableCountries = countries
    .filter((country): country is AvailableCountryEntry => {
      return Boolean(
        country &&
        typeof country === 'object' &&
        typeof country.iso === 'string' &&
        country.i18n &&
        typeof country.i18n === 'object'
      )
    })
    .map((country) => {
      return {
        iso: country.iso,
        i18n: Object.fromEntries(
          Object.entries(country.i18n).filter(([, value]) => {
            return typeof value === 'string'
          })
        ),
      }
    })

  return cachedAvailableCountries
}

function renderAvailableCountriesMarkdown(
  countries: AvailableCountryEntry[]
) {
  if (countries.length === 0) {
    return 'No countries are available.'
  }

  const locales = Object.keys(countries[0].i18n)
  const header = ['ISO 3166-1 alpha-2 code', ...locales].map(
    escapeMarkdownTableCell
  )
  const lines = [
    `| ${header.join(' | ')} |`,
    `| ${header.map(() => '---').join(' | ')} |`,
  ]

  for (const country of countries) {
    const row = [
      `\`${country.iso}\``,
      ...locales.map((locale) => {
        return escapeMarkdownTableCell(country.i18n[locale] || '')
      }),
    ]

    lines.push(`| ${row.join(' | ')} |`)
  }

  return lines.join('\n')
}
