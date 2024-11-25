/**
 * Sources:
 * - https://en.wikipedia.org/wiki/List_of_country_calling_codes
 * - https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
 * - https://www.itu.int/rec/T-REC-E.164/en#:~:text=The%20international%20public%20telecommunication%20numbering%20plan
 *
 * cdc: Country Dialing Code
 */

export type CountryType = {
  cdc: string
  iso: string
  i18n: {
    en: string
    nb: string
  }
  continent:
    | 'Asia'
    | 'Europe'
    | 'Africa'
    | 'Oceania'
    | 'Antarctica'
    | 'North America'
    | 'South America'
    | 'None'
  regions?: Array<'Scandinavia' | 'Nordic'>
  name?: string
}

export type CountryLang = keyof CountryType['i18n']

export const prioritizedCountries = [
  'Norway',
  'Sweden',
  'Denmark',
  'Finland',
]

const countries: Array<CountryType> = [
  {
    i18n: {
      en: 'Afghanistan',
      nb: 'Afghanistan',
    },
    cdc: '93',
    iso: 'AF',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Albania',
      nb: 'Albania',
    },
    cdc: '355',
    iso: 'AL',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Algeria',
      nb: 'Algerie',
    },
    cdc: '213',
    iso: 'DZ',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'American Samoa',
      nb: 'Amerikansk Samoa',
    },
    cdc: '1-684',
    iso: 'AS',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: 'Andorra',
      nb: 'Andorra',
    },
    cdc: '376',
    iso: 'AD',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Angola',
      nb: 'Angola',
    },
    cdc: '244',
    iso: 'AO',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Anguilla',
      nb: 'Anguilla',
    },
    cdc: '1-264',
    iso: 'AI',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Antarctica',
      nb: 'Antarktis',
    },
    cdc: '672',
    iso: 'AQ',
    continent: 'Antarctica',
  },
  {
    i18n: {
      en: 'Antigua and Barbuda',
      nb: 'Antigua og Barbuda',
    },
    cdc: '1-268',
    iso: 'AG',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Argentina',
      nb: 'Argentina',
    },
    cdc: '54',
    iso: 'AR',
    continent: 'South America',
  },
  {
    i18n: {
      en: 'Armenia',
      nb: 'Armenia',
    },
    cdc: '374',
    iso: 'AM',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Aruba',
      nb: 'Aruba',
    },
    cdc: '297',
    iso: 'AW',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Australia',
      nb: 'Australia',
    },
    cdc: '61',
    iso: 'AU',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: 'Austria',
      nb: 'Østerrike',
    },
    cdc: '43',
    iso: 'AT',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Azerbaijan',
      nb: 'Aserbajdsjan',
    },
    cdc: '994',
    iso: 'AZ',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Bahamas',
      nb: 'Bahamas',
    },
    cdc: '1-242',
    iso: 'BS',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Bahrain',
      nb: 'Bahrain',
    },
    cdc: '973',
    iso: 'BH',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Bangladesh',
      nb: 'Bangladesh',
    },
    cdc: '880',
    iso: 'BD',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Barbados',
      nb: 'Barbados',
    },
    cdc: '1-246',
    iso: 'BB',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Belarus',
      nb: 'Belarus',
    },
    cdc: '375',
    iso: 'BY',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Belgium',
      nb: 'Belgia',
    },
    cdc: '32',
    iso: 'BE',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Belize',
      nb: 'Belize',
    },
    cdc: '501',
    iso: 'BZ',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Benin',
      nb: 'Benin',
    },
    cdc: '229',
    iso: 'BJ',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Bermuda',
      nb: 'Bermuda',
    },
    cdc: '1-441',
    iso: 'BM',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Bhutan',
      nb: 'Bhutan',
    },
    cdc: '975',
    iso: 'BT',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Bolivia',
      nb: 'Bolivia',
    },
    cdc: '591',
    iso: 'BO',
    continent: 'South America',
  },
  {
    i18n: {
      en: 'Bosnia and Herzegovina',
      nb: 'Bosnia-Hercegovina',
    },
    cdc: '387',
    iso: 'BA',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Botswana',
      nb: 'Botswana',
    },
    cdc: '267',
    iso: 'BW',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Bouvet Island',
      nb: 'Bouvetøya',
    },
    cdc: '47', // Uncertain, low to no population on these islands
    iso: 'BV',
    continent: 'Antarctica',
  },
  {
    i18n: {
      en: 'Brazil',
      nb: 'Brasil',
    },
    cdc: '55',
    iso: 'BR',
    continent: 'South America',
  },
  {
    i18n: {
      en: 'British Indian Ocean Territory',
      nb: 'Det britiske territoriet i Indiahavet',
    },
    cdc: '246',
    iso: 'IO',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'British Virgin Islands',
      nb: 'De britiske Jomfruøyer',
    },
    cdc: '1-284',
    iso: 'VG',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Brunei',
      nb: 'Brunei',
    },
    cdc: '673',
    iso: 'BN',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Bulgaria',
      nb: 'Bulgaria',
    },
    cdc: '359',
    iso: 'BG',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Burkina Faso',
      nb: 'Burkina Faso',
    },
    cdc: '226',
    iso: 'BF',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Burundi',
      nb: 'Burundi',
    },
    cdc: '257',
    iso: 'BI',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Cambodia',
      nb: 'Kambodsja',
    },
    cdc: '855',
    iso: 'KH',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Cameroon',
      nb: 'Kamerun',
    },
    cdc: '237',
    iso: 'CM',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Canada',
      nb: 'Canada',
    },
    cdc: '1',
    iso: 'CA',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Cape Verde',
      nb: 'Kapp Verde',
    },
    cdc: '238',
    iso: 'CV',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Bonaire, Sint Eustatius and Saba',
      nb: 'Bonaire, Sint Eustatius og Saba',
    },
    cdc: '599',
    iso: 'BQ',
    continent: 'South America',
  },
  {
    i18n: {
      en: 'Cayman Islands',
      nb: 'Caymanøyene',
    },
    cdc: '1-345',
    iso: 'KY',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Central African Republic',
      nb: 'Den sentralafrikanske republikk',
    },
    cdc: '236',
    iso: 'CF',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Chad',
      nb: 'Tsjad',
    },
    cdc: '235',
    iso: 'TD',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Chile',
      nb: 'Chile',
    },
    cdc: '56',
    iso: 'CL',
    continent: 'South America',
  },
  {
    i18n: {
      en: 'China',
      nb: 'Kina',
    },
    cdc: '86',
    iso: 'CN',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Christmas Island',
      nb: 'Christmasøya',
    },
    cdc: '61',
    iso: 'CX',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Cocos Islands',
      nb: 'Kokosøyene',
    },
    cdc: '61',
    iso: 'CC',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Colombia',
      nb: 'Colombia',
    },
    cdc: '57',
    iso: 'CO',
    continent: 'South America',
  },
  {
    i18n: {
      en: 'Comoros',
      nb: 'Komorene',
    },
    cdc: '269',
    iso: 'KM',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Cook Islands',
      nb: 'Cookøyene',
    },
    cdc: '682',
    iso: 'CK',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: 'Costa Rica',
      nb: 'Costa Rica',
    },
    cdc: '506',
    iso: 'CR',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Croatia',
      nb: 'Kroatia',
    },
    cdc: '385',
    iso: 'HR',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Cuba',
      nb: 'Cuba',
    },
    cdc: '53',
    iso: 'CU',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Curaçao',
      nb: 'Curaçao',
    },
    cdc: '599',
    iso: 'CW',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Cyprus',
      nb: 'Kypros',
    },
    cdc: '357',
    iso: 'CY',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Czech Republic',
      nb: 'Tsjekkia',
    },
    cdc: '420',
    iso: 'CZ',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Congo, the Democratic Republic',
      nb: 'Kongo, den demokratiske republikken',
    },
    cdc: '243',
    iso: 'CD',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Denmark',
      nb: 'Danmark',
    },
    cdc: '45',
    iso: 'DK',
    continent: 'Europe',
    regions: ['Scandinavia', 'Nordic'],
  },
  {
    i18n: {
      en: 'Djibouti',
      nb: 'Djibouti',
    },
    cdc: '253',
    iso: 'DJ',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Dominica',
      nb: 'Dominica',
    },
    cdc: '1-767',
    iso: 'DM',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Dominican Republic',
      nb: 'Den dominikanske republikk',
    },
    cdc: '1-809',
    iso: 'DO',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'East Timor',
      nb: 'Øst-Timor',
    },
    cdc: '670',
    iso: 'TL',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Ecuador',
      nb: 'Ecuador',
    },
    cdc: '593',
    iso: 'EC',
    continent: 'South America',
  },
  {
    i18n: {
      en: 'Egypt',
      nb: 'Egypt',
    },
    cdc: '20',
    iso: 'EG',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'El Salvador',
      nb: 'El Salvador',
    },
    cdc: '503',
    iso: 'SV',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Equatorial Guinea',
      nb: 'Ekvatorial-Guinea',
    },
    cdc: '240',
    iso: 'GQ',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Eritrea',
      nb: 'Eritrea',
    },
    cdc: '291',
    iso: 'ER',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Estonia',
      nb: 'Estland',
    },
    cdc: '372',
    iso: 'EE',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Eswatini',
      nb: 'Eswatini',
    },
    cdc: '268',
    iso: 'SZ',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Ethiopia',
      nb: 'Etiopia',
    },
    cdc: '251',
    iso: 'ET',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Falkland Islands',
      nb: 'Falklandsøyene',
    },
    cdc: '500',
    iso: 'FK',
    continent: 'South America',
  },
  {
    i18n: {
      en: 'Faroe Islands',
      nb: 'Færøyene',
    },
    cdc: '298',
    iso: 'FO',
    continent: 'Europe',
    regions: ['Nordic'],
  },
  {
    i18n: {
      en: 'Fiji',
      nb: 'Fiji',
    },
    cdc: '679',
    iso: 'FJ',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: 'Finland',
      nb: 'Finland',
    },
    cdc: '358',
    iso: 'FI',
    continent: 'Europe',
    regions: ['Nordic'],
  },
  {
    i18n: {
      en: 'France',
      nb: 'Frankrike',
    },
    cdc: '33',
    iso: 'FR',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'French Guiana',
      nb: 'Fransk Guyana',
    },
    cdc: '594',
    iso: 'GF',
    continent: 'South America',
  },
  {
    i18n: {
      en: 'French Polynesia',
      nb: 'Fransk Polynesia',
    },
    cdc: '689',
    iso: 'PF',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: 'French Southern and Antarctic Lands',
      nb: 'De franske sørterritorier',
    },
    cdc: '262', // Uncertain, low to no population on these islands
    iso: 'TF',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Gabon',
      nb: 'Gabon',
    },
    cdc: '241',
    iso: 'GA',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Gambia',
      nb: 'Gambia',
    },
    cdc: '220',
    iso: 'GM',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Georgia',
      nb: 'Georgia',
    },
    cdc: '995',
    iso: 'GE',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Germany',
      nb: 'Tyskland',
    },
    cdc: '49',
    iso: 'DE',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Ghana',
      nb: 'Ghana',
    },
    cdc: '233',
    iso: 'GH',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Gibraltar',
      nb: 'Gibraltar',
    },
    cdc: '350',
    iso: 'GI',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Greece',
      nb: 'Hellas',
    },
    cdc: '30',
    iso: 'GR',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Greenland',
      nb: 'Grønland',
    },
    cdc: '299',
    iso: 'GL',
    continent: 'North America',
    regions: ['Nordic'],
  },
  {
    i18n: {
      en: 'Grenada',
      nb: 'Grenada',
    },
    cdc: '1-473',
    iso: 'GD',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Guadeloupe',
      nb: 'Guadeloupe',
    },
    cdc: '590',
    iso: 'GP',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Guam',
      nb: 'Guam',
    },
    cdc: '1-671',
    iso: 'GU',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: 'Guatemala',
      nb: 'Guatemala',
    },
    cdc: '502',
    iso: 'GT',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Guernsey',
      nb: 'Guernsey',
    },
    cdc: '44-1481',
    iso: 'GG',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Guinea',
      nb: 'Guinea',
    },
    cdc: '224',
    iso: 'GN',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Guinea-Bissau',
      nb: 'Guinea-Bissau',
    },
    cdc: '245',
    iso: 'GW',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Guyana',
      nb: 'Guyana',
    },
    cdc: '592',
    iso: 'GY',
    continent: 'South America',
  },
  {
    i18n: {
      en: 'Haiti',
      nb: 'Haiti',
    },
    cdc: '509',
    iso: 'HT',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Heard Island and McDonald Islands',
      nb: 'Heard- og McDonaldøyene',
    },
    cdc: '672',
    iso: 'HM',
    continent: 'Antarctica',
  },
  {
    i18n: {
      en: 'Honduras',
      nb: 'Honduras',
    },
    cdc: '504',
    iso: 'HN',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Hong Kong',
      nb: 'Hongkong',
    },
    cdc: '852',
    iso: 'HK',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Hungary',
      nb: 'Ungarn',
    },
    cdc: '36',
    iso: 'HU',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Iceland',
      nb: 'Island',
    },
    cdc: '354',
    iso: 'IS',
    continent: 'Europe',
    regions: ['Nordic'],
  },
  {
    i18n: {
      en: 'India',
      nb: 'India',
    },
    cdc: '91',
    iso: 'IN',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Indonesia',
      nb: 'Indonesia',
    },
    cdc: '62',
    iso: 'ID',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Iran',
      nb: 'Iran',
    },
    cdc: '98',
    iso: 'IR',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Iraq',
      nb: 'Irak',
    },
    cdc: '964',
    iso: 'IQ',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Ireland',
      nb: 'Irland',
    },
    cdc: '353',
    iso: 'IE',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Isle of Man',
      nb: 'Man',
    },
    cdc: '44-1624',
    iso: 'IM',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Israel',
      nb: 'Israel',
    },
    cdc: '972',
    iso: 'IL',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Italy',
      nb: 'Italia',
    },
    cdc: '39',
    iso: 'IT',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Ivory Coast',
      nb: 'Elfenbenskysten',
    },
    cdc: '225',
    iso: 'CI',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Jamaica',
      nb: 'Jamaica',
    },
    cdc: '1-876',
    iso: 'JM',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Japan',
      nb: 'Japan',
    },
    cdc: '81',
    iso: 'JP',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Jersey',
      nb: 'Jersey',
    },
    cdc: '44-1534',
    iso: 'JE',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Jordan',
      nb: 'Jordan',
    },
    cdc: '962',
    iso: 'JO',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Kazakhstan',
      nb: 'Kasakhstan',
    },
    cdc: '7',
    iso: 'KZ',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Kenya',
      nb: 'Kenya',
    },
    cdc: '254',
    iso: 'KE',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Kiribati',
      nb: 'Kiribati',
    },
    cdc: '686',
    iso: 'KI',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: 'Kosovo',
      nb: 'Kosovo',
    },
    cdc: '383',
    iso: 'XK',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Kuwait',
      nb: 'Kuwait',
    },
    cdc: '965',
    iso: 'KW',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Kyrgyzstan',
      nb: 'Kirgisistan',
    },
    cdc: '996',
    iso: 'KG',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Laos',
      nb: 'Laos',
    },
    cdc: '856',
    iso: 'LA',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Latvia',
      nb: 'Latvia',
    },
    cdc: '371',
    iso: 'LV',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Lebanon',
      nb: 'Libanon',
    },
    cdc: '961',
    iso: 'LB',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Lesotho',
      nb: 'Lesotho',
    },
    cdc: '266',
    iso: 'LS',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Liberia',
      nb: 'Liberia',
    },
    cdc: '231',
    iso: 'LR',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Libya',
      nb: 'Libya',
    },
    cdc: '218',
    iso: 'LY',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Liechtenstein',
      nb: 'Liechtenstein',
    },
    cdc: '423',
    iso: 'LI',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Lithuania',
      nb: 'Litauen',
    },
    cdc: '370',
    iso: 'LT',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Luxembourg',
      nb: 'Luxembourg',
    },
    cdc: '352',
    iso: 'LU',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Macao',
      nb: 'Macao',
    },
    cdc: '853',
    iso: 'MO',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Madagascar',
      nb: 'Madagaskar',
    },
    cdc: '261',
    iso: 'MG',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Malawi',
      nb: 'Malawi',
    },
    cdc: '265',
    iso: 'MW',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Malaysia',
      nb: 'Malaysia',
    },
    cdc: '60',
    iso: 'MY',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Maldives',
      nb: 'Maldivene',
    },
    cdc: '960',
    iso: 'MV',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Mali',
      nb: 'Mali',
    },
    cdc: '223',
    iso: 'ML',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Malta',
      nb: 'Malta',
    },
    cdc: '356',
    iso: 'MT',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Marshall Islands',
      nb: 'Marshalløyene',
    },
    cdc: '692',
    iso: 'MH',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: 'Martinique',
      nb: 'Martinique',
    },
    cdc: '596',
    iso: 'MQ',
    continent: 'South America',
  },
  {
    i18n: {
      en: 'Mauritania',
      nb: 'Mauritania',
    },
    cdc: '222',
    iso: 'MR',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Mauritius',
      nb: 'Mauritius',
    },
    cdc: '230',
    iso: 'MU',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Mayotte',
      nb: 'Mayotte',
    },
    cdc: '262',
    iso: 'YT',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Mexico',
      nb: 'Mexico',
    },
    cdc: '52',
    iso: 'MX',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Micronesia',
      nb: 'Mikronesia',
    },
    cdc: '691',
    iso: 'FM',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: 'Moldova',
      nb: 'Moldova',
    },
    cdc: '373',
    iso: 'MD',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Monaco',
      nb: 'Monaco',
    },
    cdc: '377',
    iso: 'MC',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Mongolia',
      nb: 'Mongolia',
    },
    cdc: '976',
    iso: 'MN',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Montenegro',
      nb: 'Montenegro',
    },
    cdc: '382',
    iso: 'ME',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Montserrat',
      nb: 'Montserrat',
    },
    cdc: '1-664',
    iso: 'MS',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Morocco',
      nb: 'Marokko',
    },
    cdc: '212',
    iso: 'MA',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Mozambique',
      nb: 'Mosambik',
    },
    cdc: '258',
    iso: 'MZ',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Myanmar',
      nb: 'Myanmar',
    },
    cdc: '95',
    iso: 'MM',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Namibia',
      nb: 'Namibia',
    },
    cdc: '264',
    iso: 'NA',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Nauru',
      nb: 'Nauru',
    },
    cdc: '674',
    iso: 'NR',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: 'Nepal',
      nb: 'Nepal',
    },
    cdc: '977',
    iso: 'NP',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Netherlands',
      nb: 'Nederland',
    },
    cdc: '31',
    iso: 'NL',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'New Caledonia',
      nb: 'Ny-Caledonia',
    },
    cdc: '687',
    iso: 'NC',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: 'New Zealand',
      nb: 'New Zealand',
    },
    cdc: '64',
    iso: 'NZ',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: 'Nicaragua',
      nb: 'Nicaragua',
    },
    cdc: '505',
    iso: 'NI',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Niger',
      nb: 'Niger',
    },
    cdc: '227',
    iso: 'NE',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Nigeria',
      nb: 'Nigeria',
    },
    cdc: '234',
    iso: 'NG',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Niue',
      nb: 'Niue',
    },
    cdc: '683',
    iso: 'NU',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: 'Norfolk Island',
      nb: 'Norfolkøya',
    },
    cdc: '672',
    iso: 'NF',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: 'North Korea',
      nb: 'Nord-Korea',
    },
    cdc: '850',
    iso: 'KP',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'North Macedonia',
      nb: 'Nord-Makedonia',
    },
    cdc: '389',
    iso: 'MK',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Northern Mariana Islands',
      nb: 'Nord-Marianene',
    },
    cdc: '1-670',
    iso: 'MP',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: 'Norway',
      nb: 'Norge',
    },
    cdc: '47',
    iso: 'NO',
    continent: 'Europe',
    regions: ['Scandinavia', 'Nordic'],
  },
  {
    i18n: {
      en: 'Oman',
      nb: 'Oman',
    },
    cdc: '968',
    iso: 'OM',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Pakistan',
      nb: 'Pakistan',
    },
    cdc: '92',
    iso: 'PK',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Palau',
      nb: 'Palau',
    },
    cdc: '680',
    iso: 'PW',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: 'Palestine',
      nb: 'Palestina',
    },
    cdc: '970',
    iso: 'PS',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Panama',
      nb: 'Panama',
    },
    cdc: '507',
    iso: 'PA',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Papua New Guinea',
      nb: 'Papua Ny-Guinea',
    },
    cdc: '675',
    iso: 'PG',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: 'Paraguay',
      nb: 'Paraguay',
    },
    cdc: '595',
    iso: 'PY',
    continent: 'South America',
  },
  {
    i18n: {
      en: 'Peru',
      nb: 'Peru',
    },
    cdc: '51',
    iso: 'PE',
    continent: 'South America',
  },
  {
    i18n: {
      en: 'Philippines',
      nb: 'Filippinene',
    },
    cdc: '63',
    iso: 'PH',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Pitcairn',
      nb: 'Pitcairnøyene',
    },
    cdc: '64',
    iso: 'PN',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: 'Poland',
      nb: 'Polen',
    },
    cdc: '48',
    iso: 'PL',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Portugal',
      nb: 'Portugal',
    },
    cdc: '351',
    iso: 'PT',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Puerto Rico',
      nb: 'Puerto Rico',
    },
    cdc: '1-787',
    iso: 'PR',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Qatar',
      nb: 'Qatar',
    },
    cdc: '974',
    iso: 'QA',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Congo, the Republic',
      nb: 'Kongo, republikken',
    },
    cdc: '242',
    iso: 'CG',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Réunion',
      nb: 'Réunion',
    },
    cdc: '262',
    iso: 'RE',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Romania',
      nb: 'Romania',
    },
    cdc: '40',
    iso: 'RO',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Russia',
      nb: 'Russland',
    },
    cdc: '7',
    iso: 'RU',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Rwanda',
      nb: 'Rwanda',
    },
    cdc: '250',
    iso: 'RW',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Saint-Barthélemy',
      nb: 'Saint-Barthélemy',
    },
    cdc: '590',
    iso: 'BL',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Saint Helena, Ascension and Tristan da Cunha',
      nb: 'Saint Helena, Ascension og Tristan da Cunha',
    },
    cdc: '290',
    iso: 'SH',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Saint Kitts and Nevis',
      nb: 'Saint Kitts og Nevis',
    },
    cdc: '1-869',
    iso: 'KN',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Saint Lucia',
      nb: 'Saint Lucia',
    },
    cdc: '1-758',
    iso: 'LC',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Saint-Martin (FR)',
      nb: 'Saint-Martin (FR)',
    },
    cdc: '590',
    iso: 'MF',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Saint Pierre and Miquelon',
      nb: 'Saint Pierre og Miquelon',
    },
    cdc: '508',
    iso: 'PM',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Saint Vincent and the Grenadines',
      nb: 'Saint Vincent og Grenadinene',
    },
    cdc: '1-784',
    iso: 'VC',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Samoa',
      nb: 'Samoa',
    },
    cdc: '685',
    iso: 'WS',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: 'San Marino',
      nb: 'San Marino',
    },
    cdc: '378',
    iso: 'SM',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Sao Tome and Principe',
      nb: 'São Tomé og Príncipe',
    },
    cdc: '239',
    iso: 'ST',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Saudi Arabia',
      nb: 'Saudi-Arabia',
    },
    cdc: '966',
    iso: 'SA',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Senegal',
      nb: 'Senegal',
    },
    cdc: '221',
    iso: 'SN',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Serbia',
      nb: 'Serbia',
    },
    cdc: '381',
    iso: 'RS',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Seychelles',
      nb: 'Seychellene',
    },
    cdc: '248',
    iso: 'SC',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Sierra Leone',
      nb: 'Sierra Leone',
    },
    cdc: '232',
    iso: 'SL',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Singapore',
      nb: 'Singapore',
    },
    cdc: '65',
    iso: 'SG',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Sint Maarten (NL)',
      nb: 'Sint Maarten (NL)',
    },
    cdc: '1-721',
    iso: 'SX',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Slovakia',
      nb: 'Slovakia',
    },
    cdc: '421',
    iso: 'SK',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Slovenia',
      nb: 'Slovenia',
    },
    cdc: '386',
    iso: 'SI',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Solomon Islands',
      nb: 'Salomonøyene',
    },
    cdc: '677',
    iso: 'SB',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: 'Somalia',
      nb: 'Somalia',
    },
    cdc: '252',
    iso: 'SO',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'South Africa',
      nb: 'Sør-Afrika',
    },
    cdc: '27',
    iso: 'ZA',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'South Georgia and the South Sandwich Islands',
      nb: 'Sør-Georgia og Sør-Sandwichøyene',
    },
    cdc: '500',
    iso: 'GS',
    continent: 'None',
  },
  {
    i18n: {
      en: 'South Korea',
      nb: 'Sør-Korea',
    },
    cdc: '82',
    iso: 'KR',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'South Sudan',
      nb: 'Sør-Sudan',
    },
    cdc: '211',
    iso: 'SS',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Spain',
      nb: 'Spania',
    },
    cdc: '34',
    iso: 'ES',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Sri Lanka',
      nb: 'Sri Lanka',
    },
    cdc: '94',
    iso: 'LK',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Sudan',
      nb: 'Sudan',
    },
    cdc: '249',
    iso: 'SD',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Suriname',
      nb: 'Surinam',
    },
    cdc: '597',
    iso: 'SR',
    continent: 'South America',
  },
  {
    i18n: {
      en: 'Svalbard and Jan Mayen',
      nb: 'Svalbard og Jan Mayen',
    },
    cdc: '47',
    iso: 'SJ',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Sweden',
      nb: 'Sverige',
    },
    cdc: '46',
    iso: 'SE',
    continent: 'Europe',
    regions: ['Scandinavia', 'Nordic'],
  },
  {
    i18n: {
      en: 'Switzerland',
      nb: 'Sveits',
    },
    cdc: '41',
    iso: 'CH',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Syria',
      nb: 'Syria',
    },
    cdc: '963',
    iso: 'SY',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Taiwan',
      nb: 'Taiwan',
    },
    cdc: '886',
    iso: 'TW',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Tajikistan',
      nb: 'Tadsjikistan',
    },
    cdc: '992',
    iso: 'TJ',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Tanzania',
      nb: 'Tanzania',
    },
    cdc: '255',
    iso: 'TZ',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Thailand',
      nb: 'Thailand',
    },
    cdc: '66',
    iso: 'TH',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Togo',
      nb: 'Togo',
    },
    cdc: '228',
    iso: 'TG',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Tokelau',
      nb: 'Tokelau',
    },
    cdc: '690',
    iso: 'TK',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: 'Tonga',
      nb: 'Tonga',
    },
    cdc: '676',
    iso: 'TO',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: 'Trinidad and Tobago',
      nb: 'Trinidad og Tobago',
    },
    cdc: '1-868',
    iso: 'TT',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Tunisia',
      nb: 'Tunisia',
    },
    cdc: '216',
    iso: 'TN',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Turkey',
      nb: 'Tyrkia',
    },
    cdc: '90',
    iso: 'TR',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Turkmenistan',
      nb: 'Turkmenistan',
    },
    cdc: '993',
    iso: 'TM',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Turks and Caicos Islands',
      nb: 'Turks- og Caicosøyene',
    },
    cdc: '1-649',
    iso: 'TC',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Tuvalu',
      nb: 'Tuvalu',
    },
    cdc: '688',
    iso: 'TV',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: 'Virgin Islands (U.S)',
      nb: 'De amerikanske Jomfruøyer',
    },
    cdc: '1-340',
    iso: 'VI',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'Uganda',
      nb: 'Uganda',
    },
    cdc: '256',
    iso: 'UG',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Ukraine',
      nb: 'Ukraina',
    },
    cdc: '380',
    iso: 'UA',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'United Arab Emirates',
      nb: 'De forente arabiske emirater',
    },
    cdc: '971',
    iso: 'AE',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'United Kingdom',
      nb: 'Storbritannia',
    },
    cdc: '44',
    iso: 'GB',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'United States',
      nb: 'USA',
    },
    cdc: '1',
    iso: 'US',
    continent: 'North America',
  },
  {
    i18n: {
      en: 'United States Minor Outlying Islands',
      nb: 'USAs ytre småøyer',
    },
    cdc: '1', // Uncertain, low to no population on these islands
    iso: 'UM',
    continent: 'None',
  },
  {
    i18n: {
      en: 'Uruguay',
      nb: 'Uruguay',
    },
    cdc: '598',
    iso: 'UY',
    continent: 'South America',
  },
  {
    i18n: {
      en: 'Uzbekistan',
      nb: 'Usbekistan',
    },
    cdc: '998',
    iso: 'UZ',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Vanuatu',
      nb: 'Vanuatu',
    },
    cdc: '678',
    iso: 'VU',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: 'Vatican',
      nb: 'Vatikanstaten',
    },
    cdc: '379',
    iso: 'VA',
    continent: 'Europe',
  },
  {
    i18n: {
      en: 'Venezuela',
      nb: 'Venezuela',
    },
    cdc: '58',
    iso: 'VE',
    continent: 'South America',
  },
  {
    i18n: {
      en: 'Vietnam',
      nb: 'Vietnam',
    },
    cdc: '84',
    iso: 'VN',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Wallis and Futuna',
      nb: 'Wallis og Futuna',
    },
    cdc: '681',
    iso: 'WF',
    continent: 'Oceania',
  },
  {
    i18n: {
      en: 'Western Sahara',
      nb: 'Vest-Sahara',
    },
    cdc: '212',
    iso: 'EH',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Yemen',
      nb: 'Jemen',
    },
    cdc: '967',
    iso: 'YE',
    continent: 'Asia',
  },
  {
    i18n: {
      en: 'Zambia',
      nb: 'Zambia',
    },
    cdc: '260',
    iso: 'ZM',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Zimbabwe',
      nb: 'Zimbabwe',
    },
    cdc: '263',
    iso: 'ZW',
    continent: 'Africa',
  },
  {
    i18n: {
      en: 'Åland Islands',
      nb: 'Åland',
    },
    cdc: '358',
    iso: 'AX',
    continent: 'Europe',
  },
]

export default countries
