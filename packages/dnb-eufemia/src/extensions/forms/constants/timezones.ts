/**
 * Sources:
 * - https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 * - IANA Time Zone Database
 *
 * timezone: IANA timezone identifier (e.g., "Europe/Oslo")
 */

import nbLocale from './locales/timezones/nb-NO'
import enLocale from './locales/timezones/en-GB'

export type TimeZoneIdentifier = (typeof timezones)[number]['timezone']
export type TimeZoneLang = keyof TimeZoneType['i18n']

export type TimeZoneType = {
  timezone: string
  i18n: {
    en: string
    nb: string
  }
  name?: string
}

export const prioritizedTimeZones = [
  'Europe/Oslo',
  'Europe/Stockholm',
  'Europe/Copenhagen',
  'Europe/Helsinki',
]

const en = enLocale['en-GB']
const nb = nbLocale['nb-NO']

const timezones = [
  {
    timezone: 'Africa/Abidjan',
    i18n: {
      en: en.timezones['Africa/Abidjan'],
      nb: nb.timezones['Africa/Abidjan'],
    },
  },
  {
    timezone: 'Africa/Accra',
    i18n: {
      en: en.timezones['Africa/Accra'],
      nb: nb.timezones['Africa/Accra'],
    },
  },
  {
    timezone: 'Africa/Addis_Ababa',
    i18n: {
      en: en.timezones['Africa/Addis_Ababa'],
      nb: nb.timezones['Africa/Addis_Ababa'],
    },
  },
  {
    timezone: 'Africa/Algiers',
    i18n: {
      en: en.timezones['Africa/Algiers'],
      nb: nb.timezones['Africa/Algiers'],
    },
  },
  {
    timezone: 'Africa/Cairo',
    i18n: {
      en: en.timezones['Africa/Cairo'],
      nb: nb.timezones['Africa/Cairo'],
    },
  },
  {
    timezone: 'Africa/Casablanca',
    i18n: {
      en: en.timezones['Africa/Casablanca'],
      nb: nb.timezones['Africa/Casablanca'],
    },
  },
  {
    timezone: 'Africa/Johannesburg',
    i18n: {
      en: en.timezones['Africa/Johannesburg'],
      nb: nb.timezones['Africa/Johannesburg'],
    },
  },
  {
    timezone: 'Africa/Lagos',
    i18n: {
      en: en.timezones['Africa/Lagos'],
      nb: nb.timezones['Africa/Lagos'],
    },
  },
  {
    timezone: 'Africa/Nairobi',
    i18n: {
      en: en.timezones['Africa/Nairobi'],
      nb: nb.timezones['Africa/Nairobi'],
    },
  },
  {
    timezone: 'America/Adak',
    i18n: {
      en: en.timezones['America/Adak'],
      nb: nb.timezones['America/Adak'],
    },
  },
  {
    timezone: 'America/Anchorage',
    i18n: {
      en: en.timezones['America/Anchorage'],
      nb: nb.timezones['America/Anchorage'],
    },
  },
  {
    timezone: 'America/Argentina/Buenos_Aires',
    i18n: {
      en: en.timezones['America/Argentina/Buenos_Aires'],
      nb: nb.timezones['America/Argentina/Buenos_Aires'],
    },
  },
  {
    timezone: 'America/Chicago',
    i18n: {
      en: en.timezones['America/Chicago'],
      nb: nb.timezones['America/Chicago'],
    },
  },
  {
    timezone: 'America/Denver',
    i18n: {
      en: en.timezones['America/Denver'],
      nb: nb.timezones['America/Denver'],
    },
  },
  {
    timezone: 'America/Halifax',
    i18n: {
      en: en.timezones['America/Halifax'],
      nb: nb.timezones['America/Halifax'],
    },
  },
  {
    timezone: 'America/Los_Angeles',
    i18n: {
      en: en.timezones['America/Los_Angeles'],
      nb: nb.timezones['America/Los_Angeles'],
    },
  },
  {
    timezone: 'America/Mexico_City',
    i18n: {
      en: en.timezones['America/Mexico_City'],
      nb: nb.timezones['America/Mexico_City'],
    },
  },
  {
    timezone: 'America/New_York',
    i18n: {
      en: en.timezones['America/New_York'],
      nb: nb.timezones['America/New_York'],
    },
  },
  {
    timezone: 'America/Phoenix',
    i18n: {
      en: en.timezones['America/Phoenix'],
      nb: nb.timezones['America/Phoenix'],
    },
  },
  {
    timezone: 'America/Sao_Paulo',
    i18n: {
      en: en.timezones['America/Sao_Paulo'],
      nb: nb.timezones['America/Sao_Paulo'],
    },
  },
  {
    timezone: 'America/Toronto',
    i18n: {
      en: en.timezones['America/Toronto'],
      nb: nb.timezones['America/Toronto'],
    },
  },
  {
    timezone: 'America/Vancouver',
    i18n: {
      en: en.timezones['America/Vancouver'],
      nb: nb.timezones['America/Vancouver'],
    },
  },
  {
    timezone: 'Asia/Bangkok',
    i18n: {
      en: en.timezones['Asia/Bangkok'],
      nb: nb.timezones['Asia/Bangkok'],
    },
  },
  {
    timezone: 'Asia/Dubai',
    i18n: {
      en: en.timezones['Asia/Dubai'],
      nb: nb.timezones['Asia/Dubai'],
    },
  },
  {
    timezone: 'Asia/Hong_Kong',
    i18n: {
      en: en.timezones['Asia/Hong_Kong'],
      nb: nb.timezones['Asia/Hong_Kong'],
    },
  },
  {
    timezone: 'Asia/Jakarta',
    i18n: {
      en: en.timezones['Asia/Jakarta'],
      nb: nb.timezones['Asia/Jakarta'],
    },
  },
  {
    timezone: 'Asia/Kolkata',
    i18n: {
      en: en.timezones['Asia/Kolkata'],
      nb: nb.timezones['Asia/Kolkata'],
    },
  },
  {
    timezone: 'Asia/Manila',
    i18n: {
      en: en.timezones['Asia/Manila'],
      nb: nb.timezones['Asia/Manila'],
    },
  },
  {
    timezone: 'Asia/Seoul',
    i18n: {
      en: en.timezones['Asia/Seoul'],
      nb: nb.timezones['Asia/Seoul'],
    },
  },
  {
    timezone: 'Asia/Shanghai',
    i18n: {
      en: en.timezones['Asia/Shanghai'],
      nb: nb.timezones['Asia/Shanghai'],
    },
  },
  {
    timezone: 'Asia/Singapore',
    i18n: {
      en: en.timezones['Asia/Singapore'],
      nb: nb.timezones['Asia/Singapore'],
    },
  },
  {
    timezone: 'Asia/Tokyo',
    i18n: {
      en: en.timezones['Asia/Tokyo'],
      nb: nb.timezones['Asia/Tokyo'],
    },
  },
  {
    timezone: 'Atlantic/Azores',
    i18n: {
      en: en.timezones['Atlantic/Azores'],
      nb: nb.timezones['Atlantic/Azores'],
    },
  },
  {
    timezone: 'Atlantic/Reykjavik',
    i18n: {
      en: en.timezones['Atlantic/Reykjavik'],
      nb: nb.timezones['Atlantic/Reykjavik'],
    },
  },
  {
    timezone: 'Australia/Adelaide',
    i18n: {
      en: en.timezones['Australia/Adelaide'],
      nb: nb.timezones['Australia/Adelaide'],
    },
  },
  {
    timezone: 'Australia/Brisbane',
    i18n: {
      en: en.timezones['Australia/Brisbane'],
      nb: nb.timezones['Australia/Brisbane'],
    },
  },
  {
    timezone: 'Australia/Melbourne',
    i18n: {
      en: en.timezones['Australia/Melbourne'],
      nb: nb.timezones['Australia/Melbourne'],
    },
  },
  {
    timezone: 'Australia/Perth',
    i18n: {
      en: en.timezones['Australia/Perth'],
      nb: nb.timezones['Australia/Perth'],
    },
  },
  {
    timezone: 'Australia/Sydney',
    i18n: {
      en: en.timezones['Australia/Sydney'],
      nb: nb.timezones['Australia/Sydney'],
    },
  },
  {
    timezone: 'Europe/Amsterdam',
    i18n: {
      en: en.timezones['Europe/Amsterdam'],
      nb: nb.timezones['Europe/Amsterdam'],
    },
  },
  {
    timezone: 'Europe/Athens',
    i18n: {
      en: en.timezones['Europe/Athens'],
      nb: nb.timezones['Europe/Athens'],
    },
  },
  {
    timezone: 'Europe/Berlin',
    i18n: {
      en: en.timezones['Europe/Berlin'],
      nb: nb.timezones['Europe/Berlin'],
    },
  },
  {
    timezone: 'Europe/Brussels',
    i18n: {
      en: en.timezones['Europe/Brussels'],
      nb: nb.timezones['Europe/Brussels'],
    },
  },
  {
    timezone: 'Europe/Copenhagen',
    i18n: {
      en: en.timezones['Europe/Copenhagen'],
      nb: nb.timezones['Europe/Copenhagen'],
    },
  },
  {
    timezone: 'Europe/Dublin',
    i18n: {
      en: en.timezones['Europe/Dublin'],
      nb: nb.timezones['Europe/Dublin'],
    },
  },
  {
    timezone: 'Europe/Helsinki',
    i18n: {
      en: en.timezones['Europe/Helsinki'],
      nb: nb.timezones['Europe/Helsinki'],
    },
  },
  {
    timezone: 'Europe/Istanbul',
    i18n: {
      en: en.timezones['Europe/Istanbul'],
      nb: nb.timezones['Europe/Istanbul'],
    },
  },
  {
    timezone: 'Europe/Lisbon',
    i18n: {
      en: en.timezones['Europe/Lisbon'],
      nb: nb.timezones['Europe/Lisbon'],
    },
  },
  {
    timezone: 'Europe/London',
    i18n: {
      en: en.timezones['Europe/London'],
      nb: nb.timezones['Europe/London'],
    },
  },
  {
    timezone: 'Europe/Madrid',
    i18n: {
      en: en.timezones['Europe/Madrid'],
      nb: nb.timezones['Europe/Madrid'],
    },
  },
  {
    timezone: 'Europe/Moscow',
    i18n: {
      en: en.timezones['Europe/Moscow'],
      nb: nb.timezones['Europe/Moscow'],
    },
  },
  {
    timezone: 'Europe/Oslo',
    i18n: {
      en: en.timezones['Europe/Oslo'],
      nb: nb.timezones['Europe/Oslo'],
    },
  },
  {
    timezone: 'Europe/Paris',
    i18n: {
      en: en.timezones['Europe/Paris'],
      nb: nb.timezones['Europe/Paris'],
    },
  },
  {
    timezone: 'Europe/Prague',
    i18n: {
      en: en.timezones['Europe/Prague'],
      nb: nb.timezones['Europe/Prague'],
    },
  },
  {
    timezone: 'Europe/Rome',
    i18n: {
      en: en.timezones['Europe/Rome'],
      nb: nb.timezones['Europe/Rome'],
    },
  },
  {
    timezone: 'Europe/Stockholm',
    i18n: {
      en: en.timezones['Europe/Stockholm'],
      nb: nb.timezones['Europe/Stockholm'],
    },
  },
  {
    timezone: 'Europe/Vienna',
    i18n: {
      en: en.timezones['Europe/Vienna'],
      nb: nb.timezones['Europe/Vienna'],
    },
  },
  {
    timezone: 'Europe/Warsaw',
    i18n: {
      en: en.timezones['Europe/Warsaw'],
      nb: nb.timezones['Europe/Warsaw'],
    },
  },
  {
    timezone: 'Europe/Zurich',
    i18n: {
      en: en.timezones['Europe/Zurich'],
      nb: nb.timezones['Europe/Zurich'],
    },
  },
  {
    timezone: 'Pacific/Auckland',
    i18n: {
      en: en.timezones['Pacific/Auckland'],
      nb: nb.timezones['Pacific/Auckland'],
    },
  },
  {
    timezone: 'Pacific/Honolulu',
    i18n: {
      en: en.timezones['Pacific/Honolulu'],
      nb: nb.timezones['Pacific/Honolulu'],
    },
  },
  {
    timezone: 'UTC',
    i18n: {
      en: en.timezones['UTC'],
      nb: nb.timezones['UTC'],
    },
  },
] as const

export default timezones satisfies Readonly<Array<TimeZoneType>>

