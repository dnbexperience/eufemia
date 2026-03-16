import type { ContinentType, RegionType } from './countries';
export type CurrencyType = {
    iso: string;
    decimals: number;
    i18n: {
        en: string;
        nb: string;
    };
    continent: ContinentType;
    regions?: RegionType;
    name?: string;
    search?: {
        en: readonly string[];
        nb: readonly string[];
    };
};
export type CurrencyLang = keyof CurrencyType['i18n'];
export type CurrencyISO = (typeof currencies)[number]['iso'];
export declare const prioritizedCurrencies: string[];
declare const currencies: ({
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
    readonly continent: "Asia";
    readonly iso: "CNH";
    readonly decimals: 2;
    readonly i18n: {
        readonly en: "Chinese Offshore yuan";
        readonly nb: "Kinesisk Offshore renminbi";
    };
})[];
export default _default;
