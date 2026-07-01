import type { CurrencyType } from './currencies'
import {
  selectedNationalCurrencies,
  otherCurrencies,
  selectedCurrencies,
} from './selectedCurrencies'

const fundsCurrencies = [
  {
    continent: 'South America',
    iso: 'BOV',
    decimals: 2,
    i18n: {
      en: 'Bolivian Mvdol (funds code)',
      nb: 'Boliviansk mvdol (fondkode)',
    },
  },
  {
    continent: 'South America',
    iso: 'CLF',
    decimals: 0,
    i18n: {
      en: 'Unidad de Fomento (funds code)',
      nb: 'Unidad de Fomento (fondkode)',
    },
  },
  {
    continent: 'North America',
    iso: 'MXV',
    decimals: 2,
    i18n: {
      en: 'Mexican Unidad de Inversion (UDI) (funds code)',
      nb: 'Meksikansk Unidad de Inversion (fondkode)',
    },
  },
  {
    continent: 'North America',
    iso: 'USN',
    decimals: 2,
    i18n: {
      en: 'United States dollar (next day) (funds code)',
      nb: 'Amerikansk dollar (neste dag) (fondkode)',
    },
  },
  {
    continent: 'North America',
    iso: 'USS',
    decimals: 2,
    i18n: {
      en: 'United States dollar (same day) (funds code)',
      nb: 'Amerikansk dollar (samme dag) (fondkode)',
    },
  },
  {
    continent: 'South America',
    iso: 'UYI',
    decimals: 0,
    i18n: {
      en: 'Uruguay Peso en Unidades Indexadas (URUIURUI) (funds code)',
      nb: 'Uruguay Peso en Unidades Indexadas (URUIURUI) (fondkode)',
    },
  },
] as const

const nationalCurrencies = [
  {
    continent: 'Asia',
    iso: 'AFN',
    decimals: 2,
    i18n: {
      en: 'Afghan afghani',
      nb: 'Afghansk afghani',
    },
  },
  {
    continent: 'Europe',
    iso: 'ALL',
    decimals: 2,
    i18n: {
      en: 'Albanian lek',
      nb: 'Albansk lek',
    },
  },
  {
    continent: 'Asia',
    iso: 'AMD',
    decimals: 2,
    i18n: {
      en: 'Armenian dram',
      nb: 'Armensk dram',
    },
  },
  {
    continent: 'North America',
    iso: 'ANG',
    decimals: 2,
    i18n: {
      en: 'Netherlands Antillean guilder',
      nb: 'Antillansk gylden',
    },
  },
  {
    continent: 'Africa',
    iso: 'AOA',
    decimals: 2,
    i18n: {
      en: 'Angolan kwanza',
      nb: 'Angolansk kwanza',
    },
  },
  {
    continent: 'South America',
    iso: 'ARS',
    decimals: 2,
    i18n: {
      en: 'Argentine peso',
      nb: 'Argentinsk peso',
    },
  },
  {
    continent: 'North America',
    iso: 'AWG',
    decimals: 2,
    i18n: {
      en: 'Aruban florin',
      nb: 'Arubansk florin',
    },
  },
  {
    continent: 'Asia',
    iso: 'AZN',
    decimals: 2,
    i18n: {
      en: 'Azerbaijani manat',
      nb: 'Aserbajdsjansk manat',
    },
  },
  {
    continent: 'Europe',
    iso: 'BAM',
    decimals: 2,
    i18n: {
      en: 'Bosnia and Herzegovina convertible mark',
      nb: 'Konvertibilna mark',
    },
  },
  {
    continent: 'North America',
    iso: 'BBD',
    decimals: 2,
    i18n: {
      en: 'Barbados dollar',
      nb: 'Barbadisk dollar',
    },
  },
  {
    continent: 'Asia',
    iso: 'BDT',
    decimals: 2,
    i18n: {
      en: 'Bangladeshi taka',
      nb: 'Bangladeshisk taka',
    },
  },
  {
    continent: 'Africa',
    iso: 'BIF',
    decimals: 0,
    i18n: {
      en: 'Burundian franc',
      nb: 'Burundisk franc',
    },
  },
  {
    continent: 'North America',
    iso: 'BMD',
    decimals: 2,
    i18n: {
      en: 'Bermudian dollar (customarily known as Bermuda dollar)',
      nb: 'Bermudisk dollar',
    },
  },
  {
    continent: 'Asia',
    iso: 'BND',
    decimals: 2,
    i18n: {
      en: 'Brunei dollar',
      nb: 'Bruneisk dollar',
    },
  },
  {
    continent: 'South America',
    iso: 'BOB',
    decimals: 2,
    i18n: {
      en: 'Boliviano',
      nb: 'Boliviansk boliviano',
    },
  },
  {
    continent: 'South America',
    iso: 'BRL',
    decimals: 2,
    i18n: {
      en: 'Brazilian real',
      nb: 'Brasiliansk real',
    },
  },
  {
    continent: 'North America',
    iso: 'BSD',
    decimals: 2,
    i18n: {
      en: 'Bahamian dollar',
      nb: 'Bahamansk dollar',
    },
  },
  {
    continent: 'Asia',
    iso: 'BTN',
    decimals: 2,
    i18n: {
      en: 'Bhutanese ngultrum',
      nb: 'Bhutansk ngultrum',
    },
  },
  {
    continent: 'Europe',
    iso: 'BYR',
    decimals: 0,
    i18n: {
      en: 'Belarusian ruble',
      nb: 'Belarusisk rubel',
    },
  },
  {
    continent: 'North America',
    iso: 'BZD',
    decimals: 2,
    i18n: {
      en: 'Belize dollar',
      nb: 'Belizisk dollar',
    },
  },
  {
    continent: 'Africa',
    iso: 'CDF',
    decimals: 2,
    i18n: {
      en: 'Congolese franc',
      nb: 'Kongolesisk franc',
    },
  },
  {
    continent: 'Europe',
    iso: 'CHE',
    decimals: 2,
    i18n: {
      en: 'WIR Euro (complementary currency)',
      nb: 'WIR-euro (komplementærvaluta)',
    },
  },
  {
    continent: 'Europe',
    iso: 'CHW',
    decimals: 2,
    i18n: {
      en: 'WIR Franc (complementary currency)',
      nb: 'WIR-franc (komplementærvaluta)',
    },
  },
  {
    continent: 'South America',
    iso: 'CLP',
    decimals: 0,
    i18n: {
      en: 'Chilean peso',
      nb: 'Chilensk peso',
    },
  },
  {
    continent: 'South America',
    iso: 'COP',
    decimals: 2,
    i18n: {
      en: 'Colombian peso',
      nb: 'Kolombiansk peso',
    },
  },
  {
    continent: 'South America',
    iso: 'COU',
    decimals: 2,
    i18n: {
      en: 'Unidad de Valor Real',
      nb: 'Unidad de Valor Real',
    },
  },
  {
    continent: 'North America',
    iso: 'CRC',
    decimals: 2,
    i18n: {
      en: 'Costa Rican colon',
      nb: 'Kostarikansk colón',
    },
  },
  {
    continent: 'North America',
    iso: 'CUP',
    decimals: 2,
    i18n: {
      en: 'Cuban peso',
      nb: 'Kubansk peso',
    },
  },
  {
    continent: 'Africa',
    iso: 'CVE',
    decimals: 0,
    i18n: {
      en: 'Cape Verde escudo',
      nb: 'Kappverdisk escudo',
    },
  },
  {
    continent: 'Africa',
    iso: 'DJF',
    decimals: 0,
    i18n: {
      en: 'Djiboutian franc',
      nb: 'Djiboutisk franc',
    },
  },
  {
    continent: 'North America',
    iso: 'DOP',
    decimals: 2,
    i18n: {
      en: 'Dominican peso',
      nb: 'Dominikansk peso',
    },
  },
  {
    continent: 'Africa',
    iso: 'DZD',
    decimals: 2,
    i18n: {
      en: 'Algerian dinar',
      nb: 'Algerisk dinar',
    },
  },
  {
    continent: 'Africa',
    iso: 'EGP',
    decimals: 2,
    i18n: {
      en: 'Egyptian pound',
      nb: 'Egyptisk pund',
    },
  },
  {
    continent: 'Africa',
    iso: 'ERN',
    decimals: 2,
    i18n: {
      en: 'Eritrean nakfa',
      nb: 'Eritreisk nakfa',
    },
  },
  {
    continent: 'Africa',
    iso: 'ETB',
    decimals: 2,
    i18n: {
      en: 'Ethiopian birr',
      nb: 'Etiopisk birr',
    },
  },
  {
    continent: 'Oceania',
    iso: 'FJD',
    decimals: 2,
    i18n: {
      en: 'Fiji dollar',
      nb: 'Fijiansk dollar',
    },
  },
  {
    continent: 'South America',
    iso: 'FKP',
    decimals: 2,
    i18n: {
      en: 'Falkland Islands pound',
      nb: 'Falklandspund',
    },
  },
  {
    continent: 'Asia',
    iso: 'GEL',
    decimals: 2,
    i18n: {
      en: 'Georgian lari',
      nb: 'Georgisk lari',
    },
  },
  {
    continent: 'Africa',
    iso: 'GHS',
    decimals: 2,
    i18n: {
      en: 'Ghanaian cedi',
      nb: 'Ghanesisk cedi',
    },
  },
  {
    continent: 'Europe',
    iso: 'GIP',
    decimals: 2,
    i18n: {
      en: 'Gibraltar pound',
      nb: 'Gibraltarsk pund',
    },
  },
  {
    continent: 'Africa',
    iso: 'GMD',
    decimals: 2,
    i18n: {
      en: 'Gambian dalasi',
      nb: 'Gambisk dalasi',
    },
  },
  {
    continent: 'Africa',
    iso: 'GNF',
    decimals: 0,
    i18n: {
      en: 'Guinean franc',
      nb: 'Guineansk franc',
    },
  },
  {
    continent: 'North America',
    iso: 'GTQ',
    decimals: 2,
    i18n: {
      en: 'Guatemalan quetzal',
      nb: 'Guatemalansk quetzal',
    },
  },
  {
    continent: 'South America',
    iso: 'GYD',
    decimals: 2,
    i18n: {
      en: 'Guyanese dollar',
      nb: 'Guyansk dollar',
    },
  },
  {
    continent: 'North America',
    iso: 'HNL',
    decimals: 2,
    i18n: {
      en: 'Honduran lempira',
      nb: 'Honduransk lempira',
    },
  },
  {
    continent: 'Europe',
    iso: 'HRK',
    decimals: 2,
    i18n: {
      en: 'Croatian kuna',
      nb: 'Kroatisk kuna',
    },
  },
  {
    continent: 'North America',
    iso: 'HTG',
    decimals: 2,
    i18n: {
      en: 'Haitian gourde',
      nb: 'Haitisk gourde',
    },
  },
  {
    continent: 'Asia',
    iso: 'IQD',
    decimals: 3,
    i18n: {
      en: 'Iraqi dinar',
      nb: 'Irakisk dinar',
    },
  },
  {
    continent: 'Asia',
    iso: 'IRR',
    decimals: 0,
    i18n: {
      en: 'Iranian rial',
      nb: 'Iransk rial',
    },
  },
  {
    continent: 'North America',
    iso: 'JMD',
    decimals: 2,
    i18n: {
      en: 'Jamaican dollar',
      nb: 'Jamaikansk dollar',
    },
  },
  {
    continent: 'Asia',
    iso: 'JOD',
    decimals: 3,
    i18n: {
      en: 'Jordanian dinar',
      nb: 'Jordansk dinar',
    },
  },
  {
    continent: 'Asia',
    iso: 'KGS',
    decimals: 2,
    i18n: {
      en: 'Kyrgyzstani som',
      nb: 'Kirgisisk som',
    },
  },
  {
    continent: 'Asia',
    iso: 'KHR',
    decimals: 2,
    i18n: {
      en: 'Cambodian riel',
      nb: 'Kambodsjansk riel',
    },
  },
  {
    continent: 'Africa',
    iso: 'KMF',
    decimals: 0,
    i18n: {
      en: 'Comoro franc',
      nb: 'Komorisk franc',
    },
  },
  {
    continent: 'Asia',
    iso: 'KPW',
    decimals: 0,
    i18n: {
      en: 'North Korean won',
      nb: 'Nordkoreansk won',
    },
  },
  {
    continent: 'North America',
    iso: 'KYD',
    decimals: 2,
    i18n: {
      en: 'Cayman Islands dollar',
      nb: 'Caymansk dollar',
    },
  },
  {
    continent: 'Asia',
    iso: 'KZT',
    decimals: 2,
    i18n: {
      en: 'Kazakhstani tenge',
      nb: 'Kasakhstansk tenge',
    },
  },
  {
    continent: 'Asia',
    iso: 'LAK',
    decimals: 0,
    i18n: {
      en: 'Lao kip',
      nb: 'Laotisk kip',
    },
  },
  {
    continent: 'Asia',
    iso: 'LBP',
    decimals: 0,
    i18n: {
      en: 'Lebanese pound',
      nb: 'Libanesisk pund',
    },
  },
  {
    continent: 'Africa',
    iso: 'LRD',
    decimals: 2,
    i18n: {
      en: 'Liberian dollar',
      nb: 'Liberisk dollar',
    },
  },
  {
    continent: 'Africa',
    iso: 'LSL',
    decimals: 2,
    i18n: {
      en: 'Lesotho loti',
      nb: 'Lesothisk loti',
    },
  },
  {
    continent: 'Europe',
    iso: 'LTL',
    decimals: 2,
    i18n: {
      en: 'Lithuanian litas',
      nb: 'Litauisk litas',
    },
  },
  {
    continent: 'Europe',
    iso: 'LVL',
    decimals: 2,
    i18n: {
      en: 'Latvian lats',
      nb: 'Latvisk lat',
    },
  },
  {
    continent: 'Africa',
    iso: 'LYD',
    decimals: 3,
    i18n: {
      en: 'Libyan dinar',
      nb: 'Libysk dinar',
    },
  },
  {
    continent: 'Europe',
    iso: 'MDL',
    decimals: 2,
    i18n: {
      en: 'Moldovan leu',
      nb: 'Moldovsk leu',
    },
  },
  {
    continent: 'Africa',
    iso: 'MGA',
    decimals: 0,
    i18n: {
      en: 'Malagasy ariary',
      nb: 'Madagassisk ariary',
    },
  },
  {
    continent: 'Europe',
    iso: 'MKD',
    decimals: 0,
    i18n: {
      en: 'Macedonian denar',
      nb: 'Makedonsk denar',
    },
  },
  {
    continent: 'Asia',
    iso: 'MMK',
    decimals: 0,
    i18n: {
      en: 'Myanma kyat',
      nb: 'Burmesisk kyat',
    },
  },
  {
    continent: 'Asia',
    iso: 'MNT',
    decimals: 2,
    i18n: {
      en: 'Mongolian tugrik',
      nb: 'Mongolsk togrog',
    },
  },
  {
    continent: 'Asia',
    iso: 'MOP',
    decimals: 2,
    i18n: {
      en: 'Macanese pataca',
      nb: 'Macaoisk pataca',
    },
  },
  {
    continent: 'Africa',
    iso: 'MRO',
    decimals: 0,
    i18n: {
      en: 'Mauritanian ouguiya',
      nb: 'Mauritansk ouguiya',
    },
  },
  {
    continent: 'Africa',
    iso: 'MUR',
    decimals: 2,
    i18n: {
      en: 'Mauritian rupee',
      nb: 'Mauritisk rupi',
    },
  },
  {
    continent: 'Asia',
    iso: 'MVR',
    decimals: 2,
    i18n: {
      en: 'Maldivian rufiyaa',
      nb: 'Maldivisk rufiyah',
    },
  },
  {
    continent: 'Africa',
    iso: 'MWK',
    decimals: 2,
    i18n: {
      en: 'Malawian kwacha',
      nb: 'Malawisk kwacha',
    },
  },
  {
    continent: 'Asia',
    iso: 'MYR',
    decimals: 2,
    i18n: {
      en: 'Malaysian ringgit',
      nb: 'Malaysisk ringgit',
    },
  },
  {
    continent: 'Africa',
    iso: 'MZN',
    decimals: 2,
    i18n: {
      en: 'Mozambican metical',
      nb: 'Mosambikisk metical',
    },
  },
  {
    continent: 'Africa',
    iso: 'NAD',
    decimals: 2,
    i18n: {
      en: 'Namibian dollar',
      nb: 'Namibisk dollar',
    },
  },
  {
    continent: 'Africa',
    iso: 'NGN',
    decimals: 2,
    i18n: {
      en: 'Nigerian naira',
      nb: 'Nigeriansk naira',
    },
  },
  {
    continent: 'North America',
    iso: 'NIO',
    decimals: 2,
    i18n: {
      en: 'Nicaraguan córdoba',
      nb: 'Nicaraguansk córdoba',
    },
  },
  {
    continent: 'Asia',
    iso: 'NPR',
    decimals: 2,
    i18n: {
      en: 'Nepalese rupee',
      nb: 'Nepalsk rupi',
    },
  },
  {
    continent: 'North America',
    iso: 'PAB',
    decimals: 2,
    i18n: {
      en: 'Panamanian balboa',
      nb: 'Panamansk balboa',
    },
  },
  {
    continent: 'South America',
    iso: 'PEN',
    decimals: 2,
    i18n: {
      en: 'Peruvian nuevo sol',
      nb: 'Peruansk nuevo sol',
    },
  },
  {
    continent: 'Oceania',
    iso: 'PGK',
    decimals: 2,
    i18n: {
      en: 'Papua New Guinean kina',
      nb: 'Papuansk kina',
    },
  },
  {
    continent: 'North America',
    iso: 'PYG',
    decimals: 0,
    i18n: {
      en: 'Paraguayan guaraní',
      nb: 'Paraguayansk guaraní',
    },
  },
  {
    continent: 'Europe',
    iso: 'RSD',
    decimals: 2,
    i18n: {
      en: 'Serbian dinar',
      nb: 'Serbisk dinar',
    },
  },
  {
    continent: 'Europe',
    iso: 'RUB',
    decimals: 2,
    i18n: {
      en: 'Russian rouble',
      nb: 'Russisk rubel',
    },
  },
  {
    continent: 'Africa',
    iso: 'RWF',
    decimals: 0,
    i18n: {
      en: 'Rwandan franc',
      nb: 'Rwandisk franc',
    },
  },
  {
    continent: 'Oceania',
    iso: 'SBD',
    decimals: 2,
    i18n: {
      en: 'Solomon Islands dollar',
      nb: 'Salomonsk dollar',
    },
  },
  {
    continent: 'Africa',
    iso: 'SCR',
    decimals: 2,
    i18n: {
      en: 'Seychelles rupee',
      nb: 'Seychelliansk rupi',
    },
  },
  {
    continent: 'Africa',
    iso: 'SDG',
    decimals: 2,
    i18n: {
      en: 'Sudanese pound',
      nb: 'Sudansk pund',
    },
  },
  {
    continent: 'Africa',
    iso: 'SHP',
    decimals: 2,
    i18n: {
      en: 'Saint Helena pound',
      nb: 'Sankthelensk pund',
    },
  },
  {
    continent: 'Africa',
    iso: 'SLL',
    decimals: 0,
    i18n: {
      en: 'Sierra Leonean leone',
      nb: 'Sierraleonsk leone',
    },
  },
  {
    continent: 'Africa',
    iso: 'SOS',
    decimals: 2,
    i18n: {
      en: 'Somali shilling',
      nb: 'Somalisk shilling',
    },
  },
  {
    continent: 'South America',
    iso: 'SRD',
    decimals: 2,
    i18n: {
      en: 'Surinamese dollar',
      nb: 'Surinamsk dollar',
    },
  },
  {
    continent: 'Africa',
    iso: 'SSP',
    decimals: 2,
    i18n: {
      en: 'South Sudanese pound',
      nb: 'Sørsudansk pund',
    },
  },
  {
    continent: 'Africa',
    iso: 'STD',
    decimals: 0,
    i18n: {
      en: 'São Tomé and Príncipe dobra',
      nb: 'Saotomesisk dobra',
    },
  },
  {
    continent: 'Asia',
    iso: 'SYP',
    decimals: 2,
    i18n: {
      en: 'Syrian pound',
      nb: 'Syrisk pund',
    },
  },
  {
    continent: 'Africa',
    iso: 'SZL',
    decimals: 2,
    i18n: {
      en: 'Swazi lilangeni',
      nb: 'Eswatinisk lilangeni',
    },
  },
  {
    continent: 'Asia',
    iso: 'TJS',
    decimals: 2,
    i18n: {
      en: 'Tajikistani somoni',
      nb: 'Tadsjikisk somoni',
    },
  },
  {
    continent: 'Asia',
    iso: 'TMT',
    decimals: 2,
    i18n: {
      en: 'Turkmenistani manat',
      nb: 'Turkmensk manat',
    },
  },
  {
    continent: 'Oceania',
    iso: 'TOP',
    decimals: 2,
    i18n: {
      en: 'Tongan paʻanga',
      nb: 'Tongansk paanga',
    },
  },
  {
    continent: 'North America',
    iso: 'TTD',
    decimals: 2,
    i18n: {
      en: 'Trinidad and Tobago dollar',
      nb: 'Trinidadisk dollar',
    },
  },
  {
    continent: 'Asia',
    iso: 'TWD',
    decimals: 2,
    i18n: {
      en: 'New Taiwan dollar',
      nb: 'Taiwansk dollar',
    },
  },
  {
    continent: 'Europe',
    iso: 'UAH',
    decimals: 2,
    i18n: {
      en: 'Ukrainian hryvnia',
      nb: 'Ukrainsk hryvnia',
    },
  },
  {
    continent: 'Africa',
    iso: 'UGX',
    decimals: 2,
    i18n: {
      en: 'Ugandan shilling',
      nb: 'Ugandisk shilling',
    },
  },
  {
    continent: 'South America',
    iso: 'UYU',
    decimals: 2,
    i18n: {
      en: 'Uruguayan peso',
      nb: 'Uruguayansk peso',
    },
  },
  {
    continent: 'Asia',
    iso: 'UZS',
    decimals: 2,
    i18n: {
      en: 'Uzbekistan som',
      nb: 'Usbekisk som',
    },
  },
  {
    continent: 'South America',
    iso: 'VEF',
    decimals: 2,
    i18n: {
      en: 'Venezuelan bolívar fuerte',
      nb: 'Venezuelansk bolívar',
    },
  },
  {
    continent: 'Asia',
    iso: 'VND',
    decimals: 0,
    i18n: {
      en: 'Vietnamese dong',
      nb: 'Vietnamesisk dong',
    },
  },
  {
    continent: 'Oceania',
    iso: 'VUV',
    decimals: 0,
    i18n: {
      en: 'Vanuatu vatu',
      nb: 'Vanuatisk vatu',
    },
  },
  {
    continent: 'Oceania',
    iso: 'WST',
    decimals: 2,
    i18n: {
      en: 'Samoan tala',
      nb: 'Samoansk tala',
    },
  },
  {
    continent: 'Asia',
    iso: 'YER',
    decimals: 2,
    i18n: {
      en: 'Yemeni rial',
      nb: 'Jemenittisk rial',
    },
  },
  {
    continent: 'Africa',
    iso: 'ZMW',
    decimals: 2,
    i18n: {
      en: 'Zambian kwacha',
      nb: 'Zambisk kwacha',
    },
  },
] as const

/**
 * List of all ISO 4217 Active codes
 * Sources:
 * - https://en.wikipedia.org/wiki/List_of_circulating_currencies
 * - https://en.wikipedia.org/wiki/ISO_4217
 * - https://no.wikipedia.org/wiki/ISO_4217
 */

const allNationalCurrencies = [
  ...nationalCurrencies,
  ...selectedNationalCurrencies,
] satisfies Readonly<Array<CurrencyType>>

const preciousMetals = [
  {
    continent: 'None',
    iso: 'XPD',
    decimals: null,
    i18n: {
      en: 'Palladium (one troy ounce)',
      nb: 'Palladium (31,1034768 gram)',
    },
  },
  {
    continent: 'None',
    iso: 'XPT',
    decimals: null,
    i18n: {
      en: 'Platinum (one troy ounce)',
      nb: 'Platinum (31,1034768 gram)',
    },
  },
  {
    continent: 'None',
    iso: 'XAG',
    decimals: null,
    i18n: {
      en: 'Silver (one troy ounce)',
      nb: 'Sølv (31,1034768 gram)',
    },
  },
  {
    continent: 'None',
    iso: 'XAU',
    decimals: null,
    i18n: {
      en: 'Gold (one troy ounce)',
      nb: 'Gull (31,1034768 gram)',
    },
  },
] as const

// https://en.wikipedia.org/wiki/ISO_4217#X_currencies_(funds,_precious_metals,_supranationals,_other)

const xCurrencies = [
  {
    continent: 'Africa',
    iso: 'XAF',
    decimals: 0,
    i18n: {
      en: 'CFA franc BEAC',
      nb: 'Sentralafrikansk CFA-franc',
    },
  },
  {
    continent: 'Europe',
    iso: 'XBA',
    decimals: null,
    i18n: {
      en: 'European Composite Unit (EURCO) (bond market unit)',
      nb: 'Europeisk regnskapsenhet (EURCO) (kredittmarkedsenhet)',
    },
  },
  {
    continent: 'Europe',
    iso: 'XBB',
    decimals: null,
    i18n: {
      en: 'European Monetary Unit (E.M.U.-6) (bond market unit)',
      nb: 'Europeisk regnskapsenhet (E.M.U.-6) (kredittmarkedsenhet)',
    },
  },
  {
    continent: 'Europe',
    iso: 'XBC',
    decimals: null,
    i18n: {
      en: 'European Unit of Account 9 (E.U.A.-9) (bond market unit)',
      nb: 'Europeisk regnskapsenhet (E.U.A.-9) (kredittmarkedsenhet)',
    },
  },
  {
    continent: 'Europe',
    iso: 'XBD',
    decimals: null,
    i18n: {
      en: 'European Unit of Account 17 (E.U.A.-17) (bond market unit)',
      nb: 'Europeisk regnskapsenhet (E.U.A.-17) (kredittmarkedsenhet)',
    },
  },
  {
    continent: 'North America',
    iso: 'XCD',
    decimals: 2,
    i18n: {
      en: 'East Caribbean dollar',
      nb: 'Østkaribisk dollar',
    },
  },
  {
    continent: 'None',
    iso: 'XDR',
    decimals: null,
    i18n: {
      en: 'Special drawing rights',
      nb: 'Spesielle trekkrettigheter',
    },
  },
  {
    continent: 'None',
    iso: 'XFU',
    decimals: null,
    i18n: {
      en: 'UIC franc (special settlement currency)',
      nb: 'UIC-franc',
    },
  },
  {
    continent: 'Africa',
    iso: 'XOF',
    decimals: 0,
    i18n: {
      en: 'CFA franc BCEAO',
      nb: 'Vestafrikansk CFA-franc',
    },
  },
  {
    continent: 'Oceania',
    iso: 'XPF',
    decimals: 0,
    i18n: {
      en: 'CFP franc',
      nb: 'CFP-franc',
    },
  },
  {
    continent: 'None',
    iso: 'XTS',
    decimals: null,
    i18n: {
      en: 'Code reserved for testing purposes',
      nb: 'Kode reservert for testing',
    },
  },
  {
    continent: 'None',
    iso: 'XXX',
    decimals: null,
    i18n: {
      en: 'No currency',
      nb: 'Ingen valuta',
    },
  },
  ...preciousMetals,
] as const

const allCurrencies = [
  ...allNationalCurrencies,
  ...fundsCurrencies,
  ...xCurrencies,
  ...otherCurrencies,
]

export { selectedCurrencies }

export default allCurrencies satisfies Readonly<Array<CurrencyType>>
