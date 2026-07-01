import nbLocale from './locales/countries/nb-NO'
import enLocale from './locales/countries/en-GB'

import type { RegionType } from './countries'

const en = enLocale['en-GB']
const nb = nbLocale['nb-NO']

const selectedNationalCurrencies = [
  {
    continent: 'Europe',
    iso: 'NOK',
    decimals: 2,
    i18n: {
      en: 'Norwegian krone',
      nb: 'Norsk krone',
    },
    regions: ['Scandinavia', 'Nordic'] as RegionType,
    search: {
      en: [en.countries.NO],
      nb: [nb.countries.NO],
    },
  },
  {
    continent: 'North America',
    iso: 'USD',
    decimals: 2,
    i18n: {
      en: 'United States dollar',
      nb: 'Amerikansk dollar',
    },
    search: {
      en: [en.countries.US],
      nb: [nb.countries.US],
    },
  },
  {
    continent: 'Europe',
    iso: 'EUR',
    decimals: 2,
    i18n: {
      en: 'Euro',
      nb: 'Euro',
    },
    regions: ['Scandinavia', 'Nordic'] as RegionType,
    search: {
      // All countries that use the Euro
      en: [
        en.countries.AT,
        en.countries.BE,
        en.countries.HR,
        en.countries.CY,
        en.countries.EE,
        en.countries.FI,
        en.countries.FR,
        en.countries.DE,
        en.countries.GR,
        en.countries.IE,
        en.countries.IT,
        en.countries.LV,
        en.countries.LT,
        en.countries.LU,
        en.countries.MT,
        en.countries.NL,
        en.countries.PT,
        en.countries.SK,
        en.countries.SI,
        en.countries.ES,
      ],
      nb: [
        nb.countries.AT,
        nb.countries.BE,
        nb.countries.HR,
        nb.countries.CY,
        nb.countries.EE,
        nb.countries.FI,
        nb.countries.FR,
        nb.countries.DE,
        nb.countries.GR,
        nb.countries.IE,
        nb.countries.IT,
        nb.countries.LV,
        nb.countries.LT,
        nb.countries.LU,
        nb.countries.MT,
        nb.countries.NL,
        nb.countries.PT,
        nb.countries.SK,
        nb.countries.SI,
        nb.countries.ES,
      ],
    },
  },
  {
    continent: 'Europe',
    iso: 'SEK',
    decimals: 2,
    i18n: {
      en: 'Swedish krona',
      nb: 'Svensk krone',
    },
    regions: ['Scandinavia', 'Nordic'] as RegionType,
    search: {
      en: [en.countries.SE],
      nb: [nb.countries.SE],
    },
  },
  {
    continent: 'Europe',
    iso: 'DKK',
    decimals: 2,
    i18n: {
      en: 'Danish krone',
      nb: 'Dansk krone',
    },
    regions: ['Scandinavia', 'Nordic'] as RegionType,
    search: {
      en: [en.countries.DK],
      nb: [nb.countries.DK],
    },
  },
  {
    continent: 'Europe',
    iso: 'GBP',
    decimals: 2,
    i18n: {
      en: 'Pound sterling',
      nb: 'Britisk pund',
    },
    search: {
      en: [en.countries.GB],
      nb: [nb.countries.GB],
    },
  },
  {
    continent: 'Europe',
    iso: 'CHF',
    decimals: 2,
    i18n: {
      en: 'Swiss franc',
      nb: 'Sveitsisk franc',
    },
    search: {
      en: [en.countries.CH],
      nb: [nb.countries.CH],
    },
  },
  {
    continent: 'Asia',
    iso: 'JPY',
    decimals: 0,
    i18n: {
      en: 'Japanese yen',
      nb: 'Japansk yen',
    },
    search: {
      en: [en.countries.JP],
      nb: [nb.countries.JP],
    },
  },
  {
    continent: 'Asia',
    iso: 'AED',
    decimals: 2,
    i18n: {
      en: 'United Arab Emirates dirham',
      nb: 'Emiratarabisk dirham',
    },
    search: {
      en: [en.countries.AE],
      nb: [nb.countries.AE],
    },
  },
  {
    continent: 'Oceania',
    iso: 'AUD',
    decimals: 2,
    i18n: {
      en: 'Australian dollar',
      nb: 'Australsk dollar',
    },
    search: {
      en: [en.countries.AU],
      nb: [nb.countries.AU],
    },
  },
  {
    continent: 'Asia',
    iso: 'BHD',
    decimals: 3,
    i18n: {
      en: 'Bahraini dinar',
      nb: 'Bahrainsk dinar',
    },
    search: {
      en: [en.countries.BH],
      nb: [nb.countries.BH],
    },
  },
  {
    continent: 'Africa',
    iso: 'BWP',
    decimals: 2,
    i18n: {
      en: 'Botswana pula',
      nb: 'Botswansk pula',
    },
    search: {
      en: [en.countries.BW],
      nb: [nb.countries.BW],
    },
  },
  {
    continent: 'Europe',
    iso: 'BGN',
    decimals: 2,
    i18n: {
      en: 'Bulgarian lev',
      nb: 'Bulgarsk lev',
    },
    search: {
      en: [en.countries.BG],
      nb: [nb.countries.BG],
    },
  },
  {
    continent: 'North America',
    iso: 'CAD',
    decimals: 2,
    i18n: {
      en: 'Canadian dollar',
      nb: 'Kanadisk dollar',
    },
    search: {
      en: [en.countries.CA],
      nb: [nb.countries.CA],
    },
  },
  {
    continent: 'Asia',
    iso: 'PHP',
    decimals: 2,
    i18n: {
      en: 'Philippine peso',
      nb: 'Filippinsk peso',
    },
    search: {
      en: [en.countries.PH],
      nb: [nb.countries.PH],
    },
  },
  {
    continent: 'Asia',
    iso: 'HKD',
    decimals: 2,
    i18n: {
      en: 'Hong Kong dollar',
      nb: 'Hongkongdollar',
    },
    search: {
      en: [en.countries.HK],
      nb: [nb.countries.HK],
    },
  },
  {
    continent: 'Asia',
    iso: 'INR',
    decimals: 2,
    i18n: {
      en: 'Indian rupee',
      nb: 'Indisk rupi',
    },
    search: {
      en: [en.countries.IN],
      nb: [nb.countries.IN],
    },
  },
  {
    continent: 'Asia',
    iso: 'IDR',
    decimals: 2,
    i18n: {
      en: 'Indonesian rupiah',
      nb: 'Indonesisk rupiah',
    },
    search: {
      en: [en.countries.ID],
      nb: [nb.countries.ID],
    },
  },
  {
    continent: 'Europe',
    iso: 'ISK',
    decimals: 0,
    i18n: {
      en: 'Icelandic króna',
      nb: 'Islandsk krone',
    },
    regions: ['Nordic'] as RegionType,
    search: {
      en: [en.countries.IS],
      nb: [nb.countries.IS],
    },
  },
  {
    continent: 'Asia',
    iso: 'ILS',
    decimals: 2,
    i18n: {
      en: 'Israeli new shekel',
      nb: 'Ny israelsk shekel',
    },
    search: {
      en: [en.countries.IL],
      nb: [nb.countries.IL],
    },
  },
  {
    continent: 'Africa',
    iso: 'KES',
    decimals: 2,
    i18n: {
      en: 'Kenyan shilling',
      nb: 'Kenyansk shilling',
    },
    search: {
      en: [en.countries.KE],
      nb: [nb.countries.KE],
    },
  },
  {
    continent: 'Asia',
    iso: 'CNY',
    decimals: 2,
    i18n: {
      en: 'Chinese yuan',
      nb: 'Kinesisk renminbi',
    },
    search: {
      en: [en.countries.CN],
      nb: [nb.countries.CN],
    },
  },
  {
    continent: 'Asia',
    iso: 'KWD',
    decimals: 3,
    i18n: {
      en: 'Kuwaiti dinar',
      nb: 'Kuwaitisk dinar',
    },
    search: {
      en: [en.countries.KW],
      nb: [nb.countries.KW],
    },
  },
  {
    continent: 'Africa',
    iso: 'MAD',
    decimals: 2,
    i18n: {
      en: 'Moroccan dirham',
      nb: 'Marokkansk dirham',
    },
    search: {
      en: [en.countries.MA],
      nb: [nb.countries.MA],
    },
  },
  {
    continent: 'North America',
    iso: 'MXN',
    decimals: 2,
    i18n: {
      en: 'Mexican peso',
      nb: 'Meksikansk peso',
    },
    search: {
      en: [en.countries.MX],
      nb: [nb.countries.MX],
    },
  },
  {
    continent: 'Oceania',
    iso: 'NZD',
    decimals: 2,
    i18n: {
      en: 'New Zealand dollar',
      nb: 'Nyzealandsk dollar',
    },
    search: {
      en: [en.countries.NZ],
      nb: [nb.countries.NZ],
    },
  },
  {
    continent: 'Asia',
    iso: 'OMR',
    decimals: 3,
    i18n: {
      en: 'Omani rial',
      nb: 'Omansk rial',
    },
    search: {
      en: [en.countries.OM],
      nb: [nb.countries.OM],
    },
  },
  {
    continent: 'Asia',
    iso: 'PKR',
    decimals: 2,
    i18n: {
      en: 'Pakistani rupee',
      nb: 'Pakistansk rupi',
    },
    search: {
      en: [en.countries.PK],
      nb: [nb.countries.PK],
    },
  },
  {
    continent: 'Europe',
    iso: 'PLN',
    decimals: 2,
    i18n: {
      en: 'Polish złoty',
      nb: 'Polsk złoty',
    },
    search: {
      en: [en.countries.PL],
      nb: [nb.countries.PL],
    },
  },
  {
    continent: 'Asia',
    iso: 'QAR',
    decimals: 2,
    i18n: {
      en: 'Qatari riyal',
      nb: 'Qatarsk rijal',
    },
    search: {
      en: [en.countries.QA],
      nb: [nb.countries.QA],
    },
  },
  {
    continent: 'Europe',
    iso: 'RON',
    decimals: 2,
    i18n: {
      en: 'Romanian new leu',
      nb: 'Rumensk leu',
    },
    search: {
      en: [en.countries.RO],
      nb: [nb.countries.RO],
    },
  },
  {
    continent: 'Asia',
    iso: 'SAR',
    decimals: 2,
    i18n: {
      en: 'Saudi riyal',
      nb: 'Saudiarabisk rijal',
    },
    search: {
      en: [en.countries.SA],
      nb: [nb.countries.SA],
    },
  },
  {
    continent: 'Asia',
    iso: 'SGD',
    decimals: 2,
    i18n: {
      en: 'Singapore dollar',
      nb: 'Singaporsk dollar',
    },
    search: {
      en: [en.countries.SG],
      nb: [nb.countries.SG],
    },
  },
  {
    continent: 'Asia',
    iso: 'LKR',
    decimals: 2,
    i18n: {
      en: 'Sri Lankan rupee',
      nb: 'Srilankisk rupi',
    },
    search: {
      en: [en.countries.LK],
      nb: [nb.countries.LK],
    },
  },
  {
    continent: 'Africa',
    iso: 'ZAR',
    decimals: 2,
    i18n: {
      en: 'South African rand',
      nb: 'Sørafrikansk rand',
    },
    search: {
      en: [en.countries.ZA],
      nb: [nb.countries.ZA],
    },
  },
  {
    continent: 'Asia',
    iso: 'KRW',
    decimals: 0,
    i18n: {
      en: 'South Korean won',
      nb: 'Sørkoreansk won',
    },
    search: {
      en: [en.countries.KR],
      nb: [nb.countries.KR],
    },
  },
  {
    continent: 'Africa',
    iso: 'TZS',
    decimals: 2,
    i18n: {
      en: 'Tanzanian shilling',
      nb: 'Tanzaniansk shilling',
    },
    search: {
      en: [en.countries.TZ],
      nb: [nb.countries.TZ],
    },
  },
  {
    continent: 'Asia',
    iso: 'THB',
    decimals: 2,
    i18n: {
      en: 'Thai baht',
      nb: 'Thailandsk baht',
    },
    search: {
      en: [en.countries.TH],
      nb: [nb.countries.TH],
    },
  },
  {
    continent: 'Europe',
    iso: 'CZK',
    decimals: 2,
    i18n: {
      en: 'Czech koruna',
      nb: 'Tsjekkisk koruna',
    },
    search: {
      en: [en.countries.CZ],
      nb: [nb.countries.CZ],
    },
  },
  {
    continent: 'Africa',
    iso: 'TND',
    decimals: 3,
    i18n: {
      en: 'Tunisian dinar',
      nb: 'Tunisisk dinar',
    },
    search: {
      en: [en.countries.TN],
      nb: [nb.countries.TN],
    },
  },
  {
    continent: 'Asia',
    iso: 'TRY',
    decimals: 2,
    i18n: {
      en: 'Turkish lira',
      nb: 'Tyrkisk lira',
    },
    search: {
      en: [en.countries.TR],
      nb: [nb.countries.TR],
    },
  },
  {
    continent: 'Europe',
    iso: 'HUF',
    decimals: 2,
    i18n: {
      en: 'Hungarian forint',
      nb: 'Ungarsk forint',
    },
    search: {
      en: [en.countries.HU],
      nb: [nb.countries.HU],
    },
  },
] as const

const otherCurrencies = [
  {
    continent: 'Asia',
    iso: 'CNH',
    decimals: 2,
    i18n: {
      en: 'Chinese Offshore yuan',
      nb: 'Kinesisk Offshore renminbi',
    },
  },
] as const

/**
 * List of a DNB-specific currencies, subset of ISO 4217 Active codes
 * Source: https://www.dnb.no/bedrift/markets/valuta-renter/kursliste/overforsel/daglig
 */

export const selectedCurrencies = [
  ...selectedNationalCurrencies,
  ...otherCurrencies,
]

export { selectedNationalCurrencies, otherCurrencies }
