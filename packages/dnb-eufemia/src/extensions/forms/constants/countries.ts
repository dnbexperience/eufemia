/**
 * Sources:
 * - https://en.wikipedia.org/wiki/List_of_country_calling_codes
 * - https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
 * - https://www.itu.int/rec/T-REC-E.164/en#:~:text=The%20international%20public%20telecommunication%20numbering%20plan
 *
 * cdc: Country Dialing Code
 */

import nbLocale from './locales/countries/nb-NO'
import enLocale from './locales/countries/en-GB'

export type CountryISO = (typeof countries)[number]['iso']
export type CountryCdc = (typeof countries)[number]['cdc']

export type CountryType = {
  cdc: string
  iso: string
  i18n: {
    en: string
    nb: string
  }
  continent: ContinentType
  regions?: RegionType
  name?: string
}

export type RegionType = Array<'Scandinavia' | 'Nordic'>

export type ContinentType =
  | 'Asia'
  | 'Europe'
  | 'Africa'
  | 'Oceania'
  | 'Antarctica'
  | 'North America'
  | 'South America'
  | 'None'

export type CountryLang = keyof CountryType['i18n']

export const prioritizedCountries = [
  'Norway',
  'Sweden',
  'Denmark',
  'Finland',
]

const en = enLocale['en-GB']
const nb = nbLocale['nb-NO']

const countries = [
  {
    i18n: {
      en: en.countries.AF,
      nb: nb.countries.AF,
    },
    cdc: '93',
    iso: 'AF',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.AL,
      nb: nb.countries.AL,
    },
    cdc: '355',
    iso: 'AL',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.DZ,
      nb: nb.countries.DZ,
    },
    cdc: '213',
    iso: 'DZ',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.AS,
      nb: nb.countries.AS,
    },
    cdc: '1-684',
    iso: 'AS',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: en.countries.AD,
      nb: nb.countries.AD,
    },
    cdc: '376',
    iso: 'AD',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.AO,
      nb: nb.countries.AO,
    },
    cdc: '244',
    iso: 'AO',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.AI,
      nb: nb.countries.AI,
    },
    cdc: '1-264',
    iso: 'AI',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.AQ,
      nb: nb.countries.AQ,
    },
    cdc: '672',
    iso: 'AQ',
    continent: 'Antarctica',
  },
  {
    i18n: {
      en: en.countries.AG,
      nb: nb.countries.AG,
    },
    cdc: '1-268',
    iso: 'AG',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.AR,
      nb: nb.countries.AR,
    },
    cdc: '54',
    iso: 'AR',
    continent: 'South America',
  },
  {
    i18n: {
      en: en.countries.AM,
      nb: nb.countries.AM,
    },
    cdc: '374',
    iso: 'AM',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.AW,
      nb: nb.countries.AW,
    },
    cdc: '297',
    iso: 'AW',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.AU,
      nb: nb.countries.AU,
    },
    cdc: '61',
    iso: 'AU',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: en.countries.AT,
      nb: nb.countries.AT,
    },
    cdc: '43',
    iso: 'AT',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.AZ,
      nb: nb.countries.AZ,
    },
    cdc: '994',
    iso: 'AZ',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.BS,
      nb: nb.countries.BS,
    },
    cdc: '1-242',
    iso: 'BS',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.BH,
      nb: nb.countries.BH,
    },
    cdc: '973',
    iso: 'BH',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.BD,
      nb: nb.countries.BD,
    },
    cdc: '880',
    iso: 'BD',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.BB,
      nb: nb.countries.BB,
    },
    cdc: '1-246',
    iso: 'BB',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.BY,
      nb: nb.countries.BY,
    },
    cdc: '375',
    iso: 'BY',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.BE,
      nb: nb.countries.BE,
    },
    cdc: '32',
    iso: 'BE',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.BZ,
      nb: nb.countries.BZ,
    },
    cdc: '501',
    iso: 'BZ',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.BJ,
      nb: nb.countries.BJ,
    },
    cdc: '229',
    iso: 'BJ',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.BM,
      nb: nb.countries.BM,
    },
    cdc: '1-441',
    iso: 'BM',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.BT,
      nb: nb.countries.BT,
    },
    cdc: '975',
    iso: 'BT',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.BO,
      nb: nb.countries.BO,
    },
    cdc: '591',
    iso: 'BO',
    continent: 'South America',
  },
  {
    i18n: {
      en: en.countries.BA,
      nb: nb.countries.BA,
    },
    cdc: '387',
    iso: 'BA',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.BW,
      nb: nb.countries.BW,
    },
    cdc: '267',
    iso: 'BW',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.BV,
      nb: nb.countries.BV,
    },
    cdc: '47', // Uncertain, low to no population on these islands
    iso: 'BV',
    continent: 'Antarctica',
  },
  {
    i18n: {
      en: en.countries.BR,
      nb: nb.countries.BR,
    },
    cdc: '55',
    iso: 'BR',
    continent: 'South America',
  },
  {
    i18n: {
      en: en.countries.IO,
      nb: nb.countries.IO,
    },
    cdc: '246',
    iso: 'IO',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.VG,
      nb: nb.countries.VG,
    },
    cdc: '1-284',
    iso: 'VG',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.BN,
      nb: nb.countries.BN,
    },
    cdc: '673',
    iso: 'BN',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.BG,
      nb: nb.countries.BG,
    },
    cdc: '359',
    iso: 'BG',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.BF,
      nb: nb.countries.BF,
    },
    cdc: '226',
    iso: 'BF',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.BI,
      nb: nb.countries.BI,
    },
    cdc: '257',
    iso: 'BI',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.KH,
      nb: nb.countries.KH,
    },
    cdc: '855',
    iso: 'KH',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.CM,
      nb: nb.countries.CM,
    },
    cdc: '237',
    iso: 'CM',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.CA,
      nb: nb.countries.CA,
    },
    cdc: '1',
    iso: 'CA',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.CV,
      nb: nb.countries.CV,
    },
    cdc: '238',
    iso: 'CV',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.BQ,
      nb: nb.countries.BQ,
    },
    cdc: '599',
    iso: 'BQ',
    continent: 'South America',
  },
  {
    i18n: {
      en: en.countries.KY,
      nb: nb.countries.KY,
    },
    cdc: '1-345',
    iso: 'KY',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.CF,
      nb: nb.countries.CF,
    },
    cdc: '236',
    iso: 'CF',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.TD,
      nb: nb.countries.TD,
    },
    cdc: '235',
    iso: 'TD',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.CL,
      nb: nb.countries.CL,
    },
    cdc: '56',
    iso: 'CL',
    continent: 'South America',
  },
  {
    i18n: {
      en: en.countries.CN,
      nb: nb.countries.CN,
    },
    cdc: '86',
    iso: 'CN',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.CX,
      nb: nb.countries.CX,
    },
    cdc: '61',
    iso: 'CX',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.CC,
      nb: nb.countries.CC,
    },
    cdc: '61',
    iso: 'CC',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.CO,
      nb: nb.countries.CO,
    },
    cdc: '57',
    iso: 'CO',
    continent: 'South America',
  },
  {
    i18n: {
      en: en.countries.KM,
      nb: nb.countries.KM,
    },
    cdc: '269',
    iso: 'KM',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.CK,
      nb: nb.countries.CK,
    },
    cdc: '682',
    iso: 'CK',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: en.countries.CR,
      nb: nb.countries.CR,
    },
    cdc: '506',
    iso: 'CR',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.HR,
      nb: nb.countries.HR,
    },
    cdc: '385',
    iso: 'HR',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.CU,
      nb: nb.countries.CU,
    },
    cdc: '53',
    iso: 'CU',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.CW,
      nb: nb.countries.CW,
    },
    cdc: '599',
    iso: 'CW',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.CY,
      nb: nb.countries.CY,
    },
    cdc: '357',
    iso: 'CY',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.CZ,
      nb: nb.countries.CZ,
    },
    cdc: '420',
    iso: 'CZ',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.CD,
      nb: nb.countries.CD,
    },
    cdc: '243',
    iso: 'CD',
    continent: 'Africa',
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
      en: en.countries.DJ,
      nb: nb.countries.DJ,
    },
    cdc: '253',
    iso: 'DJ',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.DM,
      nb: nb.countries.DM,
    },
    cdc: '1-767',
    iso: 'DM',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.DO,
      nb: nb.countries.DO,
    },
    cdc: '1-809',
    iso: 'DO',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.TL,
      nb: nb.countries.TL,
    },
    cdc: '670',
    iso: 'TL',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.EC,
      nb: nb.countries.EC,
    },
    cdc: '593',
    iso: 'EC',
    continent: 'South America',
  },
  {
    i18n: {
      en: en.countries.EG,
      nb: nb.countries.EG,
    },
    cdc: '20',
    iso: 'EG',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.SV,
      nb: nb.countries.SV,
    },
    cdc: '503',
    iso: 'SV',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.GQ,
      nb: nb.countries.GQ,
    },
    cdc: '240',
    iso: 'GQ',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.ER,
      nb: nb.countries.ER,
    },
    cdc: '291',
    iso: 'ER',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.EE,
      nb: nb.countries.EE,
    },
    cdc: '372',
    iso: 'EE',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.SZ,
      nb: nb.countries.SZ,
    },
    cdc: '268',
    iso: 'SZ',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.ET,
      nb: nb.countries.ET,
    },
    cdc: '251',
    iso: 'ET',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.FK,
      nb: nb.countries.FK,
    },
    cdc: '500',
    iso: 'FK',
    continent: 'South America',
  },
  {
    i18n: {
      en: en.countries.FO,
      nb: nb.countries.FO,
    },
    cdc: '298',
    iso: 'FO',
    continent: 'Europe',
    regions: ['Nordic'] as RegionType,
  },
  {
    i18n: {
      en: en.countries.FJ,
      nb: nb.countries.FJ,
    },
    cdc: '679',
    iso: 'FJ',
    continent: 'Oceania',
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
  {
    i18n: {
      en: en.countries.FR,
      nb: nb.countries.FR,
    },
    cdc: '33',
    iso: 'FR',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.GF,
      nb: nb.countries.GF,
    },
    cdc: '594',
    iso: 'GF',
    continent: 'South America',
  },
  {
    i18n: {
      en: en.countries.PF,
      nb: nb.countries.PF,
    },
    cdc: '689',
    iso: 'PF',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: en.countries.TF,
      nb: nb.countries.TF,
    },
    cdc: '262', // Uncertain, low to no population on these islands
    iso: 'TF',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.GA,
      nb: nb.countries.GA,
    },
    cdc: '241',
    iso: 'GA',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.GM,
      nb: nb.countries.GM,
    },
    cdc: '220',
    iso: 'GM',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.GE,
      nb: nb.countries.GE,
    },
    cdc: '995',
    iso: 'GE',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.DE,
      nb: nb.countries.DE,
    },
    cdc: '49',
    iso: 'DE',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.GH,
      nb: nb.countries.GH,
    },
    cdc: '233',
    iso: 'GH',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.GI,
      nb: nb.countries.GI,
    },
    cdc: '350',
    iso: 'GI',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.GR,
      nb: nb.countries.GR,
    },
    cdc: '30',
    iso: 'GR',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.GL,
      nb: nb.countries.GL,
    },
    cdc: '299',
    iso: 'GL',
    continent: 'North America',
    regions: ['Nordic'] as RegionType,
  },
  {
    i18n: {
      en: en.countries.GD,
      nb: nb.countries.GD,
    },
    cdc: '1-473',
    iso: 'GD',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.GP,
      nb: nb.countries.GP,
    },
    cdc: '590',
    iso: 'GP',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.GU,
      nb: nb.countries.GU,
    },
    cdc: '1-671',
    iso: 'GU',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: en.countries.GT,
      nb: nb.countries.GT,
    },
    cdc: '502',
    iso: 'GT',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.GG,
      nb: nb.countries.GG,
    },
    cdc: '44-1481',
    iso: 'GG',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.GN,
      nb: nb.countries.GN,
    },
    cdc: '224',
    iso: 'GN',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.GW,
      nb: nb.countries.GW,
    },
    cdc: '245',
    iso: 'GW',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.GY,
      nb: nb.countries.GY,
    },
    cdc: '592',
    iso: 'GY',
    continent: 'South America',
  },
  {
    i18n: {
      en: en.countries.HT,
      nb: nb.countries.HT,
    },
    cdc: '509',
    iso: 'HT',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.HM,
      nb: nb.countries.HM,
    },
    cdc: '672',
    iso: 'HM',
    continent: 'Antarctica',
  },
  {
    i18n: {
      en: en.countries.HN,
      nb: nb.countries.HN,
    },
    cdc: '504',
    iso: 'HN',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.HK,
      nb: nb.countries.HK,
    },
    cdc: '852',
    iso: 'HK',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.HU,
      nb: nb.countries.HU,
    },
    cdc: '36',
    iso: 'HU',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.IS,
      nb: nb.countries.IS,
    },
    cdc: '354',
    iso: 'IS',
    continent: 'Europe',
    regions: ['Nordic'] as RegionType,
  },
  {
    i18n: {
      en: en.countries.IN,
      nb: nb.countries.IN,
    },
    cdc: '91',
    iso: 'IN',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.ID,
      nb: nb.countries.ID,
    },
    cdc: '62',
    iso: 'ID',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.IR,
      nb: nb.countries.IR,
    },
    cdc: '98',
    iso: 'IR',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.IQ,
      nb: nb.countries.IQ,
    },
    cdc: '964',
    iso: 'IQ',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.IE,
      nb: nb.countries.IE,
    },
    cdc: '353',
    iso: 'IE',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.IM,
      nb: nb.countries.IM,
    },
    cdc: '44-1624',
    iso: 'IM',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.IL,
      nb: nb.countries.IL,
    },
    cdc: '972',
    iso: 'IL',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.IT,
      nb: nb.countries.IT,
    },
    cdc: '39',
    iso: 'IT',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.CI,
      nb: nb.countries.CI,
    },
    cdc: '225',
    iso: 'CI',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.JM,
      nb: nb.countries.JM,
    },
    cdc: '1-876',
    iso: 'JM',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.JP,
      nb: nb.countries.JP,
    },
    cdc: '81',
    iso: 'JP',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.JE,
      nb: nb.countries.JE,
    },
    cdc: '44-1534',
    iso: 'JE',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.JO,
      nb: nb.countries.JO,
    },
    cdc: '962',
    iso: 'JO',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.KZ,
      nb: nb.countries.KZ,
    },
    cdc: '7',
    iso: 'KZ',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.KE,
      nb: nb.countries.KE,
    },
    cdc: '254',
    iso: 'KE',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.KI,
      nb: nb.countries.KI,
    },
    cdc: '686',
    iso: 'KI',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: en.countries.XK,
      nb: nb.countries.XK,
    },
    cdc: '383',
    iso: 'XK',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.KW,
      nb: nb.countries.KW,
    },
    cdc: '965',
    iso: 'KW',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.KG,
      nb: nb.countries.KG,
    },
    cdc: '996',
    iso: 'KG',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.LA,
      nb: nb.countries.LA,
    },
    cdc: '856',
    iso: 'LA',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.LV,
      nb: nb.countries.LV,
    },
    cdc: '371',
    iso: 'LV',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.LB,
      nb: nb.countries.LB,
    },
    cdc: '961',
    iso: 'LB',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.LS,
      nb: nb.countries.LS,
    },
    cdc: '266',
    iso: 'LS',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.LR,
      nb: nb.countries.LR,
    },
    cdc: '231',
    iso: 'LR',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.LY,
      nb: nb.countries.LY,
    },
    cdc: '218',
    iso: 'LY',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.LI,
      nb: nb.countries.LI,
    },
    cdc: '423',
    iso: 'LI',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.LT,
      nb: nb.countries.LT,
    },
    cdc: '370',
    iso: 'LT',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.LU,
      nb: nb.countries.LU,
    },
    cdc: '352',
    iso: 'LU',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.MO,
      nb: nb.countries.MO,
    },
    cdc: '853',
    iso: 'MO',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.MG,
      nb: nb.countries.MG,
    },
    cdc: '261',
    iso: 'MG',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.MW,
      nb: nb.countries.MW,
    },
    cdc: '265',
    iso: 'MW',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.MY,
      nb: nb.countries.MY,
    },
    cdc: '60',
    iso: 'MY',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.MV,
      nb: nb.countries.MV,
    },
    cdc: '960',
    iso: 'MV',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.ML,
      nb: nb.countries.ML,
    },
    cdc: '223',
    iso: 'ML',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.MT,
      nb: nb.countries.MT,
    },
    cdc: '356',
    iso: 'MT',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.MH,
      nb: nb.countries.MH,
    },
    cdc: '692',
    iso: 'MH',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: en.countries.MQ,
      nb: nb.countries.MQ,
    },
    cdc: '596',
    iso: 'MQ',
    continent: 'South America',
  },
  {
    i18n: {
      en: en.countries.MR,
      nb: nb.countries.MR,
    },
    cdc: '222',
    iso: 'MR',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.MU,
      nb: nb.countries.MU,
    },
    cdc: '230',
    iso: 'MU',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.YT,
      nb: nb.countries.YT,
    },
    cdc: '262',
    iso: 'YT',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.MX,
      nb: nb.countries.MX,
    },
    cdc: '52',
    iso: 'MX',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.FM,
      nb: nb.countries.FM,
    },
    cdc: '691',
    iso: 'FM',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: en.countries.MD,
      nb: nb.countries.MD,
    },
    cdc: '373',
    iso: 'MD',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.MC,
      nb: nb.countries.MC,
    },
    cdc: '377',
    iso: 'MC',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.MN,
      nb: nb.countries.MN,
    },
    cdc: '976',
    iso: 'MN',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.ME,
      nb: nb.countries.ME,
    },
    cdc: '382',
    iso: 'ME',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.MS,
      nb: nb.countries.MS,
    },
    cdc: '1-664',
    iso: 'MS',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.MA,
      nb: nb.countries.MA,
    },
    cdc: '212',
    iso: 'MA',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.MZ,
      nb: nb.countries.MZ,
    },
    cdc: '258',
    iso: 'MZ',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.MM,
      nb: nb.countries.MM,
    },
    cdc: '95',
    iso: 'MM',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.NA,
      nb: nb.countries.NA,
    },
    cdc: '264',
    iso: 'NA',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.NR,
      nb: nb.countries.NR,
    },
    cdc: '674',
    iso: 'NR',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: en.countries.NP,
      nb: nb.countries.NP,
    },
    cdc: '977',
    iso: 'NP',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.NL,
      nb: nb.countries.NL,
    },
    cdc: '31',
    iso: 'NL',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.NC,
      nb: nb.countries.NC,
    },
    cdc: '687',
    iso: 'NC',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: en.countries.NZ,
      nb: nb.countries.NZ,
    },
    cdc: '64',
    iso: 'NZ',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: en.countries.NI,
      nb: nb.countries.NI,
    },
    cdc: '505',
    iso: 'NI',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.NE,
      nb: nb.countries.NE,
    },
    cdc: '227',
    iso: 'NE',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.NG,
      nb: nb.countries.NG,
    },
    cdc: '234',
    iso: 'NG',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.NU,
      nb: nb.countries.NU,
    },
    cdc: '683',
    iso: 'NU',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: en.countries.NF,
      nb: nb.countries.NF,
    },
    cdc: '672',
    iso: 'NF',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: en.countries.KP,
      nb: nb.countries.KP,
    },
    cdc: '850',
    iso: 'KP',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.MK,
      nb: nb.countries.MK,
    },
    cdc: '389',
    iso: 'MK',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.MP,
      nb: nb.countries.MP,
    },
    cdc: '1-670',
    iso: 'MP',
    continent: 'Oceania',
  },
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
      en: en.countries.OM,
      nb: nb.countries.OM,
    },
    cdc: '968',
    iso: 'OM',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.PK,
      nb: nb.countries.PK,
    },
    cdc: '92',
    iso: 'PK',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.PW,
      nb: nb.countries.PW,
    },
    cdc: '680',
    iso: 'PW',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: en.countries.PS,
      nb: nb.countries.PS,
    },
    cdc: '970',
    iso: 'PS',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.PA,
      nb: nb.countries.PA,
    },
    cdc: '507',
    iso: 'PA',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.PG,
      nb: nb.countries.PG,
    },
    cdc: '675',
    iso: 'PG',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: en.countries.PY,
      nb: nb.countries.PY,
    },
    cdc: '595',
    iso: 'PY',
    continent: 'South America',
  },
  {
    i18n: {
      en: en.countries.PE,
      nb: nb.countries.PE,
    },
    cdc: '51',
    iso: 'PE',
    continent: 'South America',
  },
  {
    i18n: {
      en: en.countries.PH,
      nb: nb.countries.PH,
    },
    cdc: '63',
    iso: 'PH',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.PN,
      nb: nb.countries.PN,
    },
    cdc: '64',
    iso: 'PN',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: en.countries.PL,
      nb: nb.countries.PL,
    },
    cdc: '48',
    iso: 'PL',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.PT,
      nb: nb.countries.PT,
    },
    cdc: '351',
    iso: 'PT',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.PR,
      nb: nb.countries.PR,
    },
    cdc: '1-787',
    iso: 'PR',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.QA,
      nb: nb.countries.QA,
    },
    cdc: '974',
    iso: 'QA',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.CG,
      nb: nb.countries.CG,
    },
    cdc: '242',
    iso: 'CG',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.RE,
      nb: nb.countries.RE,
    },
    cdc: '262',
    iso: 'RE',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.RO,
      nb: nb.countries.RO,
    },
    cdc: '40',
    iso: 'RO',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.RU,
      nb: nb.countries.RU,
    },
    cdc: '7',
    iso: 'RU',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.RW,
      nb: nb.countries.RW,
    },
    cdc: '250',
    iso: 'RW',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.BL,
      nb: nb.countries.BL,
    },
    cdc: '590',
    iso: 'BL',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.SH,
      nb: nb.countries.SH,
    },
    cdc: '290',
    iso: 'SH',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.KN,
      nb: nb.countries.KN,
    },
    cdc: '1-869',
    iso: 'KN',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.LC,
      nb: nb.countries.LC,
    },
    cdc: '1-758',
    iso: 'LC',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.MF,
      nb: nb.countries.MF,
    },
    cdc: '590',
    iso: 'MF',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.PM,
      nb: nb.countries.PM,
    },
    cdc: '508',
    iso: 'PM',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.VC,
      nb: nb.countries.VC,
    },
    cdc: '1-784',
    iso: 'VC',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.WS,
      nb: nb.countries.WS,
    },
    cdc: '685',
    iso: 'WS',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: en.countries.SM,
      nb: nb.countries.SM,
    },
    cdc: '378',
    iso: 'SM',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.ST,
      nb: nb.countries.ST,
    },
    cdc: '239',
    iso: 'ST',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.SA,
      nb: nb.countries.SA,
    },
    cdc: '966',
    iso: 'SA',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.SN,
      nb: nb.countries.SN,
    },
    cdc: '221',
    iso: 'SN',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.RS,
      nb: nb.countries.RS,
    },
    cdc: '381',
    iso: 'RS',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.SC,
      nb: nb.countries.SC,
    },
    cdc: '248',
    iso: 'SC',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.SL,
      nb: nb.countries.SL,
    },
    cdc: '232',
    iso: 'SL',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.SG,
      nb: nb.countries.SG,
    },
    cdc: '65',
    iso: 'SG',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.SX,
      nb: nb.countries.SX,
    },
    cdc: '1-721',
    iso: 'SX',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.SK,
      nb: nb.countries.SK,
    },
    cdc: '421',
    iso: 'SK',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.SI,
      nb: nb.countries.SI,
    },
    cdc: '386',
    iso: 'SI',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.SB,
      nb: nb.countries.SB,
    },
    cdc: '677',
    iso: 'SB',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: en.countries.SO,
      nb: nb.countries.SO,
    },
    cdc: '252',
    iso: 'SO',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.ZA,
      nb: nb.countries.ZA,
    },
    cdc: '27',
    iso: 'ZA',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.GS,
      nb: nb.countries.GS,
    },
    cdc: '500',
    iso: 'GS',
    continent: 'None',
  },
  {
    i18n: {
      en: en.countries.KR,
      nb: nb.countries.KR,
    },
    cdc: '82',
    iso: 'KR',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.SS,
      nb: nb.countries.SS,
    },
    cdc: '211',
    iso: 'SS',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.ES,
      nb: nb.countries.ES,
    },
    cdc: '34',
    iso: 'ES',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.LK,
      nb: nb.countries.LK,
    },
    cdc: '94',
    iso: 'LK',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.SD,
      nb: nb.countries.SD,
    },
    cdc: '249',
    iso: 'SD',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.SR,
      nb: nb.countries.SR,
    },
    cdc: '597',
    iso: 'SR',
    continent: 'South America',
  },
  {
    i18n: {
      en: en.countries.SJ,
      nb: nb.countries.SJ,
    },
    cdc: '47',
    iso: 'SJ',
    continent: 'Europe',
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
      en: en.countries.CH,
      nb: nb.countries.CH,
    },
    cdc: '41',
    iso: 'CH',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.SY,
      nb: nb.countries.SY,
    },
    cdc: '963',
    iso: 'SY',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.TW,
      nb: nb.countries.TW,
    },
    cdc: '886',
    iso: 'TW',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.TJ,
      nb: nb.countries.TJ,
    },
    cdc: '992',
    iso: 'TJ',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.TZ,
      nb: nb.countries.TZ,
    },
    cdc: '255',
    iso: 'TZ',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.TH,
      nb: nb.countries.TH,
    },
    cdc: '66',
    iso: 'TH',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.TG,
      nb: nb.countries.TG,
    },
    cdc: '228',
    iso: 'TG',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.TK,
      nb: nb.countries.TK,
    },
    cdc: '690',
    iso: 'TK',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: en.countries.TO,
      nb: nb.countries.TO,
    },
    cdc: '676',
    iso: 'TO',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: en.countries.TT,
      nb: nb.countries.TT,
    },
    cdc: '1-868',
    iso: 'TT',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.TN,
      nb: nb.countries.TN,
    },
    cdc: '216',
    iso: 'TN',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.TR,
      nb: nb.countries.TR,
    },
    cdc: '90',
    iso: 'TR',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.TM,
      nb: nb.countries.TM,
    },
    cdc: '993',
    iso: 'TM',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.TC,
      nb: nb.countries.TC,
    },
    cdc: '1-649',
    iso: 'TC',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.TV,
      nb: nb.countries.TV,
    },
    cdc: '688',
    iso: 'TV',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: en.countries.VI,
      nb: nb.countries.VI,
    },
    cdc: '1-340',
    iso: 'VI',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.UG,
      nb: nb.countries.UG,
    },
    cdc: '256',
    iso: 'UG',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.UA,
      nb: nb.countries.UA,
    },
    cdc: '380',
    iso: 'UA',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.AE,
      nb: nb.countries.AE,
    },
    cdc: '971',
    iso: 'AE',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.GB,
      nb: nb.countries.GB,
    },
    cdc: '44',
    iso: 'GB',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.US,
      nb: nb.countries.US,
    },
    cdc: '1',
    iso: 'US',
    continent: 'North America',
  },
  {
    i18n: {
      en: en.countries.UM,
      nb: nb.countries.UM,
    },
    cdc: '1', // Uncertain, low to no population on these islands
    iso: 'UM',
    continent: 'None',
  },
  {
    i18n: {
      en: en.countries.UY,
      nb: nb.countries.UY,
    },
    cdc: '598',
    iso: 'UY',
    continent: 'South America',
  },
  {
    i18n: {
      en: en.countries.UZ,
      nb: nb.countries.UZ,
    },
    cdc: '998',
    iso: 'UZ',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.VU,
      nb: nb.countries.VU,
    },
    cdc: '678',
    iso: 'VU',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: en.countries.VA,
      nb: nb.countries.VA,
    },
    cdc: '379',
    iso: 'VA',
    continent: 'Europe',
  },
  {
    i18n: {
      en: en.countries.VE,
      nb: nb.countries.VE,
    },
    cdc: '58',
    iso: 'VE',
    continent: 'South America',
  },
  {
    i18n: {
      en: en.countries.VN,
      nb: nb.countries.VN,
    },
    cdc: '84',
    iso: 'VN',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.WF,
      nb: nb.countries.WF,
    },
    cdc: '681',
    iso: 'WF',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: en.countries.EH,
      nb: nb.countries.EH,
    },
    cdc: '212',
    iso: 'EH',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.YE,
      nb: nb.countries.YE,
    },
    cdc: '967',
    iso: 'YE',
    continent: 'Asia',
  },
  {
    i18n: {
      en: en.countries.ZM,
      nb: nb.countries.ZM,
    },
    cdc: '260',
    iso: 'ZM',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.ZW,
      nb: nb.countries.ZW,
    },
    cdc: '263',
    iso: 'ZW',
    continent: 'Africa',
  },
  {
    i18n: {
      en: en.countries.AX,
      nb: nb.countries.AX,
    },
    cdc: '358',
    iso: 'AX',
    continent: 'Europe',
  },
] as const

export default countries satisfies Readonly<Array<CountryType>>
