import type { RegionType } from './countries';
/**
 * List of a DNB-specific currencies, subset of ISO 4217 Active codes
 * Source: https://www.dnb.no/bedrift/markets/valuta-renter/kursliste/overforsel/daglig
 */
export declare const selectedCurrencies: ({
    readonly continent: "Europe";
    readonly iso: "NOK";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Norwegian krone";
        readonly nb: "Norsk krone";
    };
    readonly regions: RegionType;
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "North America";
    readonly iso: "USD";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "United States dollar";
        readonly nb: "Amerikansk dollar";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Europe";
    readonly iso: "EUR";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Euro";
        readonly nb: "Euro";
    };
    readonly regions: RegionType;
    readonly search: {
        readonly en: readonly [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string];
        readonly nb: readonly [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string];
    };
} | {
    readonly continent: "Europe";
    readonly iso: "SEK";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Swedish krona";
        readonly nb: "Svensk krone";
    };
    readonly regions: RegionType;
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Europe";
    readonly iso: "DKK";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Danish krone";
        readonly nb: "Dansk krone";
    };
    readonly regions: RegionType;
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Europe";
    readonly iso: "GBP";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Pound sterling";
        readonly nb: "Britisk pund";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Europe";
    readonly iso: "CHF";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Swiss franc";
        readonly nb: "Sveitsisk franc";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "JPY";
    readonly decimals: 0;
    readonly i18n: {
        readonly en: "Japanese yen";
        readonly nb: "Japansk yen";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "AED";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "United Arab Emirates dirham";
        readonly nb: "Emiratarabisk dirham";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Oceania";
    readonly iso: "AUD";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Australian dollar";
        readonly nb: "Australsk dollar";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "BHD";
    readonly decimals: 3;
    readonly i18n: {
        readonly en: "Bahraini dinar";
        readonly nb: "Bahrainsk dinar";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Africa";
    readonly iso: "BWP";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Botswana pula";
        readonly nb: "Botswansk pula";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Europe";
    readonly iso: "BGN";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Bulgarian lev";
        readonly nb: "Bulgarsk lev";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "North America";
    readonly iso: "CAD";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Canadian dollar";
        readonly nb: "Kanadisk dollar";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "PHP";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Philippine peso";
        readonly nb: "Filippinsk peso";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "HKD";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Hong Kong dollar";
        readonly nb: "Hongkongdollar";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "INR";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Indian rupee";
        readonly nb: "Indisk rupi";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "IDR";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Indonesian rupiah";
        readonly nb: "Indonesisk rupiah";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Europe";
    readonly iso: "ISK";
    readonly decimals: 0;
    readonly i18n: {
        readonly en: "Icelandic króna";
        readonly nb: "Islandsk krone";
    };
    readonly regions: RegionType;
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "ILS";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Israeli new shekel";
        readonly nb: "Ny israelsk shekel";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Africa";
    readonly iso: "KES";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Kenyan shilling";
        readonly nb: "Kenyansk shilling";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "CNY";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Chinese yuan";
        readonly nb: "Kinesisk renminbi";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "KWD";
    readonly decimals: 3;
    readonly i18n: {
        readonly en: "Kuwaiti dinar";
        readonly nb: "Kuwaitisk dinar";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Africa";
    readonly iso: "MAD";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Moroccan dirham";
        readonly nb: "Marokkansk dirham";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "North America";
    readonly iso: "MXN";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Mexican peso";
        readonly nb: "Meksikansk peso";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Oceania";
    readonly iso: "NZD";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "New Zealand dollar";
        readonly nb: "Nyzealandsk dollar";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "OMR";
    readonly decimals: 3;
    readonly i18n: {
        readonly en: "Omani rial";
        readonly nb: "Omansk rial";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "PKR";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Pakistani rupee";
        readonly nb: "Pakistansk rupi";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Europe";
    readonly iso: "PLN";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Polish złoty";
        readonly nb: "Polsk złoty";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "QAR";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Qatari riyal";
        readonly nb: "Qatarsk rijal";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Europe";
    readonly iso: "RON";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Romanian new leu";
        readonly nb: "Rumensk leu";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "SAR";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Saudi riyal";
        readonly nb: "Saudiarabisk rijal";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "SGD";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Singapore dollar";
        readonly nb: "Singaporsk dollar";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "LKR";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Sri Lankan rupee";
        readonly nb: "Srilankisk rupi";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Africa";
    readonly iso: "ZAR";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "South African rand";
        readonly nb: "Sørafrikansk rand";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "KRW";
    readonly decimals: 0;
    readonly i18n: {
        readonly en: "South Korean won";
        readonly nb: "Sørkoreansk won";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Africa";
    readonly iso: "TZS";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Tanzanian shilling";
        readonly nb: "Tanzaniansk shilling";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "THB";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Thai baht";
        readonly nb: "Thailandsk baht";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Europe";
    readonly iso: "CZK";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Czech koruna";
        readonly nb: "Tsjekkisk koruna";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Africa";
    readonly iso: "TND";
    readonly decimals: 3;
    readonly i18n: {
        readonly en: "Tunisian dinar";
        readonly nb: "Tunisisk dinar";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "TRY";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Turkish lira";
        readonly nb: "Tyrkisk lira";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Europe";
    readonly iso: "HUF";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Hungarian forint";
        readonly nb: "Ungarsk forint";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "CNH";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Chinese Offshore yuan";
        readonly nb: "Kinesisk Offshore renminbi";
    };
})[];
declare const _default: ({
    readonly continent: "Europe";
    readonly iso: "NOK";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Norwegian krone";
        readonly nb: "Norsk krone";
    };
    readonly regions: RegionType;
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "North America";
    readonly iso: "USD";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "United States dollar";
        readonly nb: "Amerikansk dollar";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Europe";
    readonly iso: "EUR";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Euro";
        readonly nb: "Euro";
    };
    readonly regions: RegionType;
    readonly search: {
        readonly en: readonly [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string];
        readonly nb: readonly [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string];
    };
} | {
    readonly continent: "Europe";
    readonly iso: "SEK";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Swedish krona";
        readonly nb: "Svensk krone";
    };
    readonly regions: RegionType;
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Europe";
    readonly iso: "DKK";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Danish krone";
        readonly nb: "Dansk krone";
    };
    readonly regions: RegionType;
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Europe";
    readonly iso: "GBP";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Pound sterling";
        readonly nb: "Britisk pund";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Europe";
    readonly iso: "CHF";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Swiss franc";
        readonly nb: "Sveitsisk franc";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "JPY";
    readonly decimals: 0;
    readonly i18n: {
        readonly en: "Japanese yen";
        readonly nb: "Japansk yen";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "AED";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "United Arab Emirates dirham";
        readonly nb: "Emiratarabisk dirham";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Oceania";
    readonly iso: "AUD";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Australian dollar";
        readonly nb: "Australsk dollar";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "BHD";
    readonly decimals: 3;
    readonly i18n: {
        readonly en: "Bahraini dinar";
        readonly nb: "Bahrainsk dinar";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Africa";
    readonly iso: "BWP";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Botswana pula";
        readonly nb: "Botswansk pula";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Europe";
    readonly iso: "BGN";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Bulgarian lev";
        readonly nb: "Bulgarsk lev";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "North America";
    readonly iso: "CAD";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Canadian dollar";
        readonly nb: "Kanadisk dollar";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "PHP";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Philippine peso";
        readonly nb: "Filippinsk peso";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "HKD";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Hong Kong dollar";
        readonly nb: "Hongkongdollar";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "INR";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Indian rupee";
        readonly nb: "Indisk rupi";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "IDR";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Indonesian rupiah";
        readonly nb: "Indonesisk rupiah";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Europe";
    readonly iso: "ISK";
    readonly decimals: 0;
    readonly i18n: {
        readonly en: "Icelandic króna";
        readonly nb: "Islandsk krone";
    };
    readonly regions: RegionType;
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "ILS";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Israeli new shekel";
        readonly nb: "Ny israelsk shekel";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Africa";
    readonly iso: "KES";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Kenyan shilling";
        readonly nb: "Kenyansk shilling";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "CNY";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Chinese yuan";
        readonly nb: "Kinesisk renminbi";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "KWD";
    readonly decimals: 3;
    readonly i18n: {
        readonly en: "Kuwaiti dinar";
        readonly nb: "Kuwaitisk dinar";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Africa";
    readonly iso: "MAD";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Moroccan dirham";
        readonly nb: "Marokkansk dirham";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "North America";
    readonly iso: "MXN";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Mexican peso";
        readonly nb: "Meksikansk peso";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Oceania";
    readonly iso: "NZD";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "New Zealand dollar";
        readonly nb: "Nyzealandsk dollar";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "OMR";
    readonly decimals: 3;
    readonly i18n: {
        readonly en: "Omani rial";
        readonly nb: "Omansk rial";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "PKR";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Pakistani rupee";
        readonly nb: "Pakistansk rupi";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Europe";
    readonly iso: "PLN";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Polish złoty";
        readonly nb: "Polsk złoty";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "QAR";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Qatari riyal";
        readonly nb: "Qatarsk rijal";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Europe";
    readonly iso: "RON";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Romanian new leu";
        readonly nb: "Rumensk leu";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "SAR";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Saudi riyal";
        readonly nb: "Saudiarabisk rijal";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "SGD";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Singapore dollar";
        readonly nb: "Singaporsk dollar";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "LKR";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Sri Lankan rupee";
        readonly nb: "Srilankisk rupi";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Africa";
    readonly iso: "ZAR";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "South African rand";
        readonly nb: "Sørafrikansk rand";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "KRW";
    readonly decimals: 0;
    readonly i18n: {
        readonly en: "South Korean won";
        readonly nb: "Sørkoreansk won";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Africa";
    readonly iso: "TZS";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Tanzanian shilling";
        readonly nb: "Tanzaniansk shilling";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "THB";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Thai baht";
        readonly nb: "Thailandsk baht";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Europe";
    readonly iso: "CZK";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Czech koruna";
        readonly nb: "Tsjekkisk koruna";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Africa";
    readonly iso: "TND";
    readonly decimals: 3;
    readonly i18n: {
        readonly en: "Tunisian dinar";
        readonly nb: "Tunisisk dinar";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Asia";
    readonly iso: "TRY";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Turkish lira";
        readonly nb: "Tyrkisk lira";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "Europe";
    readonly iso: "HUF";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Hungarian forint";
        readonly nb: "Ungarsk forint";
    };
    readonly search: {
        readonly en: readonly [string];
        readonly nb: readonly [string];
    };
} | {
    readonly continent: "South America";
    readonly iso: "BOV";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Bolivian Mvdol (funds code)";
        readonly nb: "Boliviansk mvdol (fondkode)";
    };
} | {
    readonly continent: "South America";
    readonly iso: "CLF";
    readonly decimals: 0;
    readonly i18n: {
        readonly en: "Unidad de Fomento (funds code)";
        readonly nb: "Unidad de Fomento (fondkode)";
    };
} | {
    readonly continent: "North America";
    readonly iso: "MXV";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Mexican Unidad de Inversion (UDI) (funds code)";
        readonly nb: "Meksikansk Unidad de Inversion (fondkode)";
    };
} | {
    readonly continent: "North America";
    readonly iso: "USN";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "United States dollar (next day) (funds code)";
        readonly nb: "Amerikansk dollar (neste dag) (fondkode)";
    };
} | {
    readonly continent: "North America";
    readonly iso: "USS";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "United States dollar (same day) (funds code)";
        readonly nb: "Amerikansk dollar (samme dag) (fondkode)";
    };
} | {
    readonly continent: "South America";
    readonly iso: "UYI";
    readonly decimals: 0;
    readonly i18n: {
        readonly en: "Uruguay Peso en Unidades Indexadas (URUIURUI) (funds code)";
        readonly nb: "Uruguay Peso en Unidades Indexadas (URUIURUI) (fondkode)";
    };
} | {
    readonly continent: "Asia";
    readonly iso: "AFN";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Afghan afghani";
        readonly nb: "Afghansk afghani";
    };
} | {
    readonly continent: "Europe";
    readonly iso: "ALL";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Albanian lek";
        readonly nb: "Albansk lek";
    };
} | {
    readonly continent: "Asia";
    readonly iso: "AMD";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Armenian dram";
        readonly nb: "Armensk dram";
    };
} | {
    readonly continent: "North America";
    readonly iso: "ANG";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Netherlands Antillean guilder";
        readonly nb: "Antillansk gylden";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "AOA";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Angolan kwanza";
        readonly nb: "Angolansk kwanza";
    };
} | {
    readonly continent: "South America";
    readonly iso: "ARS";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Argentine peso";
        readonly nb: "Argentinsk peso";
    };
} | {
    readonly continent: "North America";
    readonly iso: "AWG";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Aruban florin";
        readonly nb: "Arubansk florin";
    };
} | {
    readonly continent: "Asia";
    readonly iso: "AZN";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Azerbaijani manat";
        readonly nb: "Aserbajdsjansk manat";
    };
} | {
    readonly continent: "Europe";
    readonly iso: "BAM";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Bosnia and Herzegovina convertible mark";
        readonly nb: "Konvertibilna mark";
    };
} | {
    readonly continent: "North America";
    readonly iso: "BBD";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Barbados dollar";
        readonly nb: "Barbadisk dollar";
    };
} | {
    readonly continent: "Asia";
    readonly iso: "BDT";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Bangladeshi taka";
        readonly nb: "Bangladeshisk taka";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "BIF";
    readonly decimals: 0;
    readonly i18n: {
        readonly en: "Burundian franc";
        readonly nb: "Burundisk franc";
    };
} | {
    readonly continent: "North America";
    readonly iso: "BMD";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Bermudian dollar (customarily known as Bermuda dollar)";
        readonly nb: "Bermudisk dollar";
    };
} | {
    readonly continent: "Asia";
    readonly iso: "BND";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Brunei dollar";
        readonly nb: "Bruneisk dollar";
    };
} | {
    readonly continent: "South America";
    readonly iso: "BOB";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Boliviano";
        readonly nb: "Boliviansk boliviano";
    };
} | {
    readonly continent: "South America";
    readonly iso: "BRL";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Brazilian real";
        readonly nb: "Brasiliansk real";
    };
} | {
    readonly continent: "North America";
    readonly iso: "BSD";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Bahamian dollar";
        readonly nb: "Bahamansk dollar";
    };
} | {
    readonly continent: "Asia";
    readonly iso: "BTN";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Bhutanese ngultrum";
        readonly nb: "Bhutansk ngultrum";
    };
} | {
    readonly continent: "Europe";
    readonly iso: "BYR";
    readonly decimals: 0;
    readonly i18n: {
        readonly en: "Belarusian ruble";
        readonly nb: "Belarusisk rubel";
    };
} | {
    readonly continent: "North America";
    readonly iso: "BZD";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Belize dollar";
        readonly nb: "Belizisk dollar";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "CDF";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Congolese franc";
        readonly nb: "Kongolesisk franc";
    };
} | {
    readonly continent: "Europe";
    readonly iso: "CHE";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "WIR Euro (complementary currency)";
        readonly nb: "WIR-euro (komplementærvaluta)";
    };
} | {
    readonly continent: "Europe";
    readonly iso: "CHW";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "WIR Franc (complementary currency)";
        readonly nb: "WIR-franc (komplementærvaluta)";
    };
} | {
    readonly continent: "South America";
    readonly iso: "CLP";
    readonly decimals: 0;
    readonly i18n: {
        readonly en: "Chilean peso";
        readonly nb: "Chilensk peso";
    };
} | {
    readonly continent: "South America";
    readonly iso: "COP";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Colombian peso";
        readonly nb: "Kolombiansk peso";
    };
} | {
    readonly continent: "South America";
    readonly iso: "COU";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Unidad de Valor Real";
        readonly nb: "Unidad de Valor Real";
    };
} | {
    readonly continent: "North America";
    readonly iso: "CRC";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Costa Rican colon";
        readonly nb: "Kostarikansk colón";
    };
} | {
    readonly continent: "North America";
    readonly iso: "CUP";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Cuban peso";
        readonly nb: "Kubansk peso";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "CVE";
    readonly decimals: 0;
    readonly i18n: {
        readonly en: "Cape Verde escudo";
        readonly nb: "Kappverdisk escudo";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "DJF";
    readonly decimals: 0;
    readonly i18n: {
        readonly en: "Djiboutian franc";
        readonly nb: "Djiboutisk franc";
    };
} | {
    readonly continent: "North America";
    readonly iso: "DOP";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Dominican peso";
        readonly nb: "Dominikansk peso";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "DZD";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Algerian dinar";
        readonly nb: "Algerisk dinar";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "EGP";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Egyptian pound";
        readonly nb: "Egyptisk pund";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "ERN";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Eritrean nakfa";
        readonly nb: "Eritreisk nakfa";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "ETB";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Ethiopian birr";
        readonly nb: "Etiopisk birr";
    };
} | {
    readonly continent: "Oceania";
    readonly iso: "FJD";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Fiji dollar";
        readonly nb: "Fijiansk dollar";
    };
} | {
    readonly continent: "South America";
    readonly iso: "FKP";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Falkland Islands pound";
        readonly nb: "Falklandspund";
    };
} | {
    readonly continent: "Asia";
    readonly iso: "GEL";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Georgian lari";
        readonly nb: "Georgisk lari";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "GHS";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Ghanaian cedi";
        readonly nb: "Ghanesisk cedi";
    };
} | {
    readonly continent: "Europe";
    readonly iso: "GIP";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Gibraltar pound";
        readonly nb: "Gibraltarsk pund";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "GMD";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Gambian dalasi";
        readonly nb: "Gambisk dalasi";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "GNF";
    readonly decimals: 0;
    readonly i18n: {
        readonly en: "Guinean franc";
        readonly nb: "Guineansk franc";
    };
} | {
    readonly continent: "North America";
    readonly iso: "GTQ";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Guatemalan quetzal";
        readonly nb: "Guatemalansk quetzal";
    };
} | {
    readonly continent: "South America";
    readonly iso: "GYD";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Guyanese dollar";
        readonly nb: "Guyansk dollar";
    };
} | {
    readonly continent: "North America";
    readonly iso: "HNL";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Honduran lempira";
        readonly nb: "Honduransk lempira";
    };
} | {
    readonly continent: "Europe";
    readonly iso: "HRK";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Croatian kuna";
        readonly nb: "Kroatisk kuna";
    };
} | {
    readonly continent: "North America";
    readonly iso: "HTG";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Haitian gourde";
        readonly nb: "Haitisk gourde";
    };
} | {
    readonly continent: "Asia";
    readonly iso: "IQD";
    readonly decimals: 3;
    readonly i18n: {
        readonly en: "Iraqi dinar";
        readonly nb: "Irakisk dinar";
    };
} | {
    readonly continent: "Asia";
    readonly iso: "IRR";
    readonly decimals: 0;
    readonly i18n: {
        readonly en: "Iranian rial";
        readonly nb: "Iransk rial";
    };
} | {
    readonly continent: "North America";
    readonly iso: "JMD";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Jamaican dollar";
        readonly nb: "Jamaikansk dollar";
    };
} | {
    readonly continent: "Asia";
    readonly iso: "JOD";
    readonly decimals: 3;
    readonly i18n: {
        readonly en: "Jordanian dinar";
        readonly nb: "Jordansk dinar";
    };
} | {
    readonly continent: "Asia";
    readonly iso: "KGS";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Kyrgyzstani som";
        readonly nb: "Kirgisisk som";
    };
} | {
    readonly continent: "Asia";
    readonly iso: "KHR";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Cambodian riel";
        readonly nb: "Kambodsjansk riel";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "KMF";
    readonly decimals: 0;
    readonly i18n: {
        readonly en: "Comoro franc";
        readonly nb: "Komorisk franc";
    };
} | {
    readonly continent: "Asia";
    readonly iso: "KPW";
    readonly decimals: 0;
    readonly i18n: {
        readonly en: "North Korean won";
        readonly nb: "Nordkoreansk won";
    };
} | {
    readonly continent: "North America";
    readonly iso: "KYD";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Cayman Islands dollar";
        readonly nb: "Caymansk dollar";
    };
} | {
    readonly continent: "Asia";
    readonly iso: "KZT";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Kazakhstani tenge";
        readonly nb: "Kasakhstansk tenge";
    };
} | {
    readonly continent: "Asia";
    readonly iso: "LAK";
    readonly decimals: 0;
    readonly i18n: {
        readonly en: "Lao kip";
        readonly nb: "Laotisk kip";
    };
} | {
    readonly continent: "Asia";
    readonly iso: "LBP";
    readonly decimals: 0;
    readonly i18n: {
        readonly en: "Lebanese pound";
        readonly nb: "Libanesisk pund";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "LRD";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Liberian dollar";
        readonly nb: "Liberisk dollar";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "LSL";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Lesotho loti";
        readonly nb: "Lesothisk loti";
    };
} | {
    readonly continent: "Europe";
    readonly iso: "LTL";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Lithuanian litas";
        readonly nb: "Litauisk litas";
    };
} | {
    readonly continent: "Europe";
    readonly iso: "LVL";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Latvian lats";
        readonly nb: "Latvisk lat";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "LYD";
    readonly decimals: 3;
    readonly i18n: {
        readonly en: "Libyan dinar";
        readonly nb: "Libysk dinar";
    };
} | {
    readonly continent: "Europe";
    readonly iso: "MDL";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Moldovan leu";
        readonly nb: "Moldovsk leu";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "MGA";
    readonly decimals: 0;
    readonly i18n: {
        readonly en: "Malagasy ariary";
        readonly nb: "Madagassisk ariary";
    };
} | {
    readonly continent: "Europe";
    readonly iso: "MKD";
    readonly decimals: 0;
    readonly i18n: {
        readonly en: "Macedonian denar";
        readonly nb: "Makedonsk denar";
    };
} | {
    readonly continent: "Asia";
    readonly iso: "MMK";
    readonly decimals: 0;
    readonly i18n: {
        readonly en: "Myanma kyat";
        readonly nb: "Burmesisk kyat";
    };
} | {
    readonly continent: "Asia";
    readonly iso: "MNT";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Mongolian tugrik";
        readonly nb: "Mongolsk togrog";
    };
} | {
    readonly continent: "Asia";
    readonly iso: "MOP";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Macanese pataca";
        readonly nb: "Macaoisk pataca";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "MRO";
    readonly decimals: 0;
    readonly i18n: {
        readonly en: "Mauritanian ouguiya";
        readonly nb: "Mauritansk ouguiya";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "MUR";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Mauritian rupee";
        readonly nb: "Mauritisk rupi";
    };
} | {
    readonly continent: "Asia";
    readonly iso: "MVR";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Maldivian rufiyaa";
        readonly nb: "Maldivisk rufiyah";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "MWK";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Malawian kwacha";
        readonly nb: "Malawisk kwacha";
    };
} | {
    readonly continent: "Asia";
    readonly iso: "MYR";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Malaysian ringgit";
        readonly nb: "Malaysisk ringgit";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "MZN";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Mozambican metical";
        readonly nb: "Mosambikisk metical";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "NAD";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Namibian dollar";
        readonly nb: "Namibisk dollar";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "NGN";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Nigerian naira";
        readonly nb: "Nigeriansk naira";
    };
} | {
    readonly continent: "North America";
    readonly iso: "NIO";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Nicaraguan córdoba";
        readonly nb: "Nicaraguansk córdoba";
    };
} | {
    readonly continent: "Asia";
    readonly iso: "NPR";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Nepalese rupee";
        readonly nb: "Nepalsk rupi";
    };
} | {
    readonly continent: "North America";
    readonly iso: "PAB";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Panamanian balboa";
        readonly nb: "Panamansk balboa";
    };
} | {
    readonly continent: "South America";
    readonly iso: "PEN";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Peruvian nuevo sol";
        readonly nb: "Peruansk nuevo sol";
    };
} | {
    readonly continent: "Oceania";
    readonly iso: "PGK";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Papua New Guinean kina";
        readonly nb: "Papuansk kina";
    };
} | {
    readonly continent: "North America";
    readonly iso: "PYG";
    readonly decimals: 0;
    readonly i18n: {
        readonly en: "Paraguayan guaraní";
        readonly nb: "Paraguayansk guaraní";
    };
} | {
    readonly continent: "Europe";
    readonly iso: "RSD";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Serbian dinar";
        readonly nb: "Serbisk dinar";
    };
} | {
    readonly continent: "Europe";
    readonly iso: "RUB";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Russian rouble";
        readonly nb: "Russisk rubel";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "RWF";
    readonly decimals: 0;
    readonly i18n: {
        readonly en: "Rwandan franc";
        readonly nb: "Rwandisk franc";
    };
} | {
    readonly continent: "Oceania";
    readonly iso: "SBD";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Solomon Islands dollar";
        readonly nb: "Salomonsk dollar";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "SCR";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Seychelles rupee";
        readonly nb: "Seychelliansk rupi";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "SDG";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Sudanese pound";
        readonly nb: "Sudansk pund";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "SHP";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Saint Helena pound";
        readonly nb: "Sankthelensk pund";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "SLL";
    readonly decimals: 0;
    readonly i18n: {
        readonly en: "Sierra Leonean leone";
        readonly nb: "Sierraleonsk leone";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "SOS";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Somali shilling";
        readonly nb: "Somalisk shilling";
    };
} | {
    readonly continent: "South America";
    readonly iso: "SRD";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Surinamese dollar";
        readonly nb: "Surinamsk dollar";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "SSP";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "South Sudanese pound";
        readonly nb: "Sørsudansk pund";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "STD";
    readonly decimals: 0;
    readonly i18n: {
        readonly en: "São Tomé and Príncipe dobra";
        readonly nb: "Saotomesisk dobra";
    };
} | {
    readonly continent: "Asia";
    readonly iso: "SYP";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Syrian pound";
        readonly nb: "Syrisk pund";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "SZL";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Swazi lilangeni";
        readonly nb: "Eswatinisk lilangeni";
    };
} | {
    readonly continent: "Asia";
    readonly iso: "TJS";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Tajikistani somoni";
        readonly nb: "Tadsjikisk somoni";
    };
} | {
    readonly continent: "Asia";
    readonly iso: "TMT";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Turkmenistani manat";
        readonly nb: "Turkmensk manat";
    };
} | {
    readonly continent: "Oceania";
    readonly iso: "TOP";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Tongan paʻanga";
        readonly nb: "Tongansk paanga";
    };
} | {
    readonly continent: "North America";
    readonly iso: "TTD";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Trinidad and Tobago dollar";
        readonly nb: "Trinidadisk dollar";
    };
} | {
    readonly continent: "Asia";
    readonly iso: "TWD";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "New Taiwan dollar";
        readonly nb: "Taiwansk dollar";
    };
} | {
    readonly continent: "Europe";
    readonly iso: "UAH";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Ukrainian hryvnia";
        readonly nb: "Ukrainsk hryvnia";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "UGX";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Ugandan shilling";
        readonly nb: "Ugandisk shilling";
    };
} | {
    readonly continent: "South America";
    readonly iso: "UYU";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Uruguayan peso";
        readonly nb: "Uruguayansk peso";
    };
} | {
    readonly continent: "Asia";
    readonly iso: "UZS";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Uzbekistan som";
        readonly nb: "Usbekisk som";
    };
} | {
    readonly continent: "South America";
    readonly iso: "VEF";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Venezuelan bolívar fuerte";
        readonly nb: "Venezuelansk bolívar";
    };
} | {
    readonly continent: "Asia";
    readonly iso: "VND";
    readonly decimals: 0;
    readonly i18n: {
        readonly en: "Vietnamese dong";
        readonly nb: "Vietnamesisk dong";
    };
} | {
    readonly continent: "Oceania";
    readonly iso: "VUV";
    readonly decimals: 0;
    readonly i18n: {
        readonly en: "Vanuatu vatu";
        readonly nb: "Vanuatisk vatu";
    };
} | {
    readonly continent: "Oceania";
    readonly iso: "WST";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Samoan tala";
        readonly nb: "Samoansk tala";
    };
} | {
    readonly continent: "Asia";
    readonly iso: "YER";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Yemeni rial";
        readonly nb: "Jemenittisk rial";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "ZMW";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Zambian kwacha";
        readonly nb: "Zambisk kwacha";
    };
} | {
    readonly continent: "None";
    readonly iso: "XPD";
    readonly decimals: any;
    readonly i18n: {
        readonly en: "Palladium (one troy ounce)";
        readonly nb: "Palladium (31,1034768 gram)";
    };
} | {
    readonly continent: "None";
    readonly iso: "XPT";
    readonly decimals: any;
    readonly i18n: {
        readonly en: "Platinum (one troy ounce)";
        readonly nb: "Platinum (31,1034768 gram)";
    };
} | {
    readonly continent: "None";
    readonly iso: "XAG";
    readonly decimals: any;
    readonly i18n: {
        readonly en: "Silver (one troy ounce)";
        readonly nb: "Sølv (31,1034768 gram)";
    };
} | {
    readonly continent: "None";
    readonly iso: "XAU";
    readonly decimals: any;
    readonly i18n: {
        readonly en: "Gold (one troy ounce)";
        readonly nb: "Gull (31,1034768 gram)";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "XAF";
    readonly decimals: 0;
    readonly i18n: {
        readonly en: "CFA franc BEAC";
        readonly nb: "Sentralafrikansk CFA-franc";
    };
} | {
    readonly continent: "Europe";
    readonly iso: "XBA";
    readonly decimals: any;
    readonly i18n: {
        readonly en: "European Composite Unit (EURCO) (bond market unit)";
        readonly nb: "Europeisk regnskapsenhet (EURCO) (kredittmarkedsenhet)";
    };
} | {
    readonly continent: "Europe";
    readonly iso: "XBB";
    readonly decimals: any;
    readonly i18n: {
        readonly en: "European Monetary Unit (E.M.U.-6) (bond market unit)";
        readonly nb: "Europeisk regnskapsenhet (E.M.U.-6) (kredittmarkedsenhet)";
    };
} | {
    readonly continent: "Europe";
    readonly iso: "XBC";
    readonly decimals: any;
    readonly i18n: {
        readonly en: "European Unit of Account 9 (E.U.A.-9) (bond market unit)";
        readonly nb: "Europeisk regnskapsenhet (E.U.A.-9) (kredittmarkedsenhet)";
    };
} | {
    readonly continent: "Europe";
    readonly iso: "XBD";
    readonly decimals: any;
    readonly i18n: {
        readonly en: "European Unit of Account 17 (E.U.A.-17) (bond market unit)";
        readonly nb: "Europeisk regnskapsenhet (E.U.A.-17) (kredittmarkedsenhet)";
    };
} | {
    readonly continent: "North America";
    readonly iso: "XCD";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "East Caribbean dollar";
        readonly nb: "Østkaribisk dollar";
    };
} | {
    readonly continent: "None";
    readonly iso: "XDR";
    readonly decimals: any;
    readonly i18n: {
        readonly en: "Special drawing rights";
        readonly nb: "Spesielle trekkrettigheter";
    };
} | {
    readonly continent: "None";
    readonly iso: "XFU";
    readonly decimals: any;
    readonly i18n: {
        readonly en: "UIC franc (special settlement currency)";
        readonly nb: "UIC-franc";
    };
} | {
    readonly continent: "Africa";
    readonly iso: "XOF";
    readonly decimals: 0;
    readonly i18n: {
        readonly en: "CFA franc BCEAO";
        readonly nb: "Vestafrikansk CFA-franc";
    };
} | {
    readonly continent: "Oceania";
    readonly iso: "XPF";
    readonly decimals: 0;
    readonly i18n: {
        readonly en: "CFP franc";
        readonly nb: "CFP-franc";
    };
} | {
    readonly continent: "None";
    readonly iso: "XTS";
    readonly decimals: any;
    readonly i18n: {
        readonly en: "Code reserved for testing purposes";
        readonly nb: "Kode reservert for testing";
    };
} | {
    readonly continent: "None";
    readonly iso: "XXX";
    readonly decimals: any;
    readonly i18n: {
        readonly en: "No currency";
        readonly nb: "Ingen valuta";
    };
} | {
    readonly continent: "Asia";
    readonly iso: "CNH";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Chinese Offshore yuan";
        readonly nb: "Kinesisk Offshore renminbi";
    };
})[];
export default _default;
