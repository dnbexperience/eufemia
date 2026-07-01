import nbLocale from './locales/countries/nb-NO'
import enLocale from './locales/countries/en-GB'
import type { CountryType, RegionType } from './countries'

const en = enLocale['en-GB']
const nb = nbLocale['nb-NO']

/**
 * English names of the prioritized countries, used to sort the country
 * lists so these appear first.
 *
 * Kept in this standalone module (separate from the full `countries.ts`
 * dataset) so it can be imported synchronously without pulling the large
 * country list into the bundle.
 */
export const prioritizedCountries = [
  'Norway',
  'Sweden',
  'Denmark',
  'Finland',
]

/**
 * A small, synchronously available subset of the full country list
 * (`countries.ts`).
 *
 * Used as the initial data for the country selectors while the full list is
 * lazy-loaded on demand (see `Field/SelectCountry/useCountries`), so the most
 * common (Nordic) options — including Norway (+47), used as the default
 * country code in the PhoneNumber field — render immediately without shipping
 * the entire dataset eagerly.
 *
 * These entries mirror their counterparts in `countries.ts`; a test guards
 * against drift.
 */
const prioritizedCountriesData = [
  {
    i18n: {
      en: en.countries.NO,
      nb: nb.countries.NO,
    },
    cdc: '47',
    iso: 'NO',
    continent: 'Europe',
    regions: ['Scandinavia', 'Nordic'] as RegionType,
  },
  {
    i18n: {
      en: en.countries.SE,
      nb: nb.countries.SE,
    },
    cdc: '46',
    iso: 'SE',
    continent: 'Europe',
    regions: ['Scandinavia', 'Nordic'] as RegionType,
  },
  {
    i18n: {
      en: en.countries.DK,
      nb: nb.countries.DK,
    },
    cdc: '45',
    iso: 'DK',
    continent: 'Europe',
    regions: ['Scandinavia', 'Nordic'] as RegionType,
  },
  {
    i18n: {
      en: en.countries.FI,
      nb: nb.countries.FI,
    },
    cdc: '358',
    iso: 'FI',
    continent: 'Europe',
    regions: ['Nordic'] as RegionType,
  },
]

export default prioritizedCountriesData satisfies Readonly<
  Array<CountryType>
>
