---
title: 'Value.SelectCountry'
description: '`Value.SelectCountry` will render the selected country.'
version: 11.2.1
generatedAt: 2026-05-08T08:59:11.419Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Value.SelectCountry

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.SelectCountry />)
```

## Description

`Value.SelectCountry` will render the selected country name by `value`'s ISO code ([ISO 3166-1 alpha-2 code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)). It displays the country name in the current locale. If the value provided is not a valid/supported ISO code, it displays the value.

There is a corresponding [Field.SelectCountry](/uilib/extensions/forms/feature-fields/SelectCountry) component.

```jsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.SelectCountry path="/country" />)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/SelectCountry)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/SelectCountry)

### The `useCountry` hook

You can use the `Value.SelectCountry.useCountry` hook to get the country name by ISO code ([ISO 3166-1 alpha-2 code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)). It returns the country name in the current locale.

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'

const MyComponent = () => {
  const { getCountryNameByIso } = Value.SelectCountry.useCountry('NO')
}
```


## Demos

### Interactive


```tsx
render(<Form.Handler data={{
  myCountry: 'NO'
}}>
        <Flex.Stack>
          <Field.SelectCountry path="/myCountry" />
          <Value.SelectCountry path="/myCountry" />
        </Flex.Stack>
      </Form.Handler>)
```


### Placeholder


```tsx
render(<Value.SelectCountry placeholder="No value given" />)
```


### Value


```tsx
render(<Value.SelectCountry value="NO" />)
```


### Use different locale


```tsx
render(<Form.Handler locale="en-GB" data={{
  myCountry: 'CH'
}}>
        <Value.SelectCountry path="/myCountry" />
      </Form.Handler>)
```


### Label


```tsx
render(<Value.SelectCountry label="Label text" showEmpty />)
```


### Label and value


```tsx
render(<Value.SelectCountry label="Label text" value="NO" />)
```


### Inline


```tsx
render(<P>
        This is before the component{' '}
        <Value.SelectCountry value="NO" inline /> This is after the
        component
      </P>)
```

## Properties


```json
{
  "props": {
    "value": {
      "doc": "Value for the value component. Will take precedence over the path value given in the data context.",
      "type": "{valueType}",
      "status": "optional"
    },
    "defaultValue": {
      "doc": "Default value for the value component. Will not take precedence over the path value given in the data context.",
      "type": "{valueType}",
      "status": "optional"
    },
    "label": {
      "doc": "Field label to show above the displayed value.",
      "type": "string",
      "status": "optional"
    },
    "labelSrOnly": {
      "doc": "Use `true` to make the label only readable by screen readers.",
      "type": "boolean",
      "status": "optional"
    },
    "help": {
      "doc": "Provide help content for the field using `title` and `content` as a string or `React.ReactNode`. Additionally, you can set `open` to `true` to display the inline help, set the `breakout` property to `false` to disable the breakout of the inline help content, set `outset` to `false` to display the help text inline (inset) instead of the default outset behavior, or use `renderAs` set to `dialog` to render the content in a [Dialog](/uilib/components/dialog/) (recommended for larger amounts of content).",
      "type": "object",
      "status": "optional"
    },
    "transformLabel": {
      "doc": "Transforms the label before it gets displayed. Receives the label as the first parameter. The second parameter is a object containing the `convertJsxToString` function.",
      "type": "function",
      "status": "optional"
    },
    "inheritLabel": {
      "doc": "Use `true` to inherit the label from a visible (rendered) field with the same path.",
      "type": "boolean",
      "status": "optional"
    },
    "inheritVisibility": {
      "doc": "Use `true` to inherit the visibility from a field with the same path. You can find more info in the [Value section](/uilib/extensions/forms/Value/#inherit-visibility-from-fields-based-on-path).",
      "type": "boolean",
      "status": "optional"
    },
    "showEmpty": {
      "doc": "Shows the value even if it is empty.",
      "type": "boolean",
      "status": "optional"
    },
    "placeholder": {
      "doc": "Text showing in place of the value if no value is given.",
      "type": "string",
      "status": "optional"
    },
    "path": {
      "doc": "JSON Pointer for where the data for this input is located in the source dataset.",
      "type": "string",
      "status": "optional"
    },
    "inline": {
      "doc": "For showing the value inline (not as a block element).",
      "type": "boolean",
      "status": "optional"
    },
    "maxWidth": {
      "doc": "Use `auto` for no max-width (use browser default), `small`, `medium` or `large` for predefined standard max widths. Defaults to `large`.",
      "type": [
        "\"auto\"",
        "\"small\"",
        "\"medium\"",
        "\"large\""
      ],
      "status": "optional"
    },
    "transformIn": {
      "doc": "Transforms the `value` before its displayed in the value component.",
      "type": "function",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  }
}
```


## Translations


```json
{
  "locales": [
    "da-DK",
    "en-GB",
    "nb-NO",
    "sv-SE"
  ],
  "entries": {
    "Field.errorPattern": {
      "nb-NO": "Du må skrive inn en gyldig verdi.",
      "en-GB": "You must enter a valid value.",
      "sv-SE": "Du måste ange ett giltigt värde.",
      "da-DK": "Du skal indtaste en gyldig værdi."
    },
    "Field.errorRequired": {
      "nb-NO": "Dette feltet må fylles ut.",
      "en-GB": "This field is required.",
      "sv-SE": "Detta fält måste fyllas i.",
      "da-DK": "Dette felt skal udfyldes."
    },
    "Field.errorSummary": {
      "nb-NO": "Feil som må rettes:",
      "en-GB": "Please correct the following errors:",
      "sv-SE": "Fel som måste åtgärdas:",
      "da-DK": "Felter der skal rettes:"
    },
    "Field.errorSummaryTitle": {
      "nb-NO": "Feil som må rettes",
      "en-GB": "Please correct the following errors",
      "sv-SE": "Fel som måste åtgärdas",
      "da-DK": "Felter der skal rettes"
    },
    "Field.optionalLabelSuffix": {
      "nb-NO": "(valgfritt)",
      "en-GB": "(optional)",
      "sv-SE": "(valfritt)",
      "da-DK": "(valgfrit)"
    },
    "Field.stateSummary": {
      "nb-NO": "Oppsummering:",
      "en-GB": "Summary:",
      "sv-SE": "Sammanfattning:",
      "da-DK": "Oversigt:"
    },
    "SelectCountry.errorRequired": {
      "nb-NO": "Du må velge et land fra listen.",
      "en-GB": "You must select a country from the list.",
      "sv-SE": "Du måste välja ett land från listan.",
      "da-DK": "Du skal vælge et land fra listen."
    },
    "SelectCountry.label": {
      "nb-NO": "Land",
      "en-GB": "Country",
      "sv-SE": "Land",
      "da-DK": "Land"
    },
    "SelectCountry.placeholder": {
      "nb-NO": "Velg et land",
      "en-GB": "Select country",
      "sv-SE": "Välj ett land",
      "da-DK": "Vælg et land"
    }
  }
}
```


## List of available countries

[Link to the code of the available countries](https://github.com/dnbexperience/eufemia/blob/main/packages/dnb-eufemia/src/extensions/forms/constants/countries.ts#L46).


| ISO 3166-1 alpha-2 code | en | nb |
| --- | --- | --- |
| `AF` | Afghanistan | Afghanistan |
| `AL` | Albania | Albania |
| `DZ` | Algeria | Algerie |
| `AS` | American Samoa | Amerikansk Samoa |
| `AD` | Andorra | Andorra |
| `AO` | Angola | Angola |
| `AI` | Anguilla | Anguilla |
| `AQ` | Antarctica | Antarktis |
| `AG` | Antigua and Barbuda | Antigua og Barbuda |
| `AR` | Argentina | Argentina |
| `AM` | Armenia | Armenia |
| `AW` | Aruba | Aruba |
| `AU` | Australia | Australia |
| `AT` | Austria | Østerrike |
| `AZ` | Azerbaijan | Aserbajdsjan |
| `BS` | Bahamas | Bahamas |
| `BH` | Bahrain | Bahrain |
| `BD` | Bangladesh | Bangladesh |
| `BB` | Barbados | Barbados |
| `BY` | Belarus | Belarus |
| `BE` | Belgium | Belgia |
| `BZ` | Belize | Belize |
| `BJ` | Benin | Benin |
| `BM` | Bermuda | Bermuda |
| `BT` | Bhutan | Bhutan |
| `BO` | Bolivia | Bolivia |
| `BA` | Bosnia and Herzegovina | Bosnia-Hercegovina |
| `BW` | Botswana | Botswana |
| `BV` | Bouvet Island | Bouvetøya |
| `BR` | Brazil | Brasil |
| `IO` | British Indian Ocean Territory | Det britiske territoriet i Indiahavet |
| `VG` | British Virgin Islands | De britiske Jomfruøyer |
| `BN` | Brunei | Brunei |
| `BG` | Bulgaria | Bulgaria |
| `BF` | Burkina Faso | Burkina Faso |
| `BI` | Burundi | Burundi |
| `KH` | Cambodia | Kambodsja |
| `CM` | Cameroon | Kamerun |
| `CA` | Canada | Canada |
| `CV` | Cape Verde | Kapp Verde |
| `BQ` | Bonaire, Sint Eustatius and Saba | Bonaire, Sint Eustatius og Saba |
| `KY` | Cayman Islands | Caymanøyene |
| `CF` | Central African Republic | Den sentralafrikanske republikk |
| `TD` | Chad | Tsjad |
| `CL` | Chile | Chile |
| `CN` | China | Kina |
| `CX` | Christmas Island | Juleøya |
| `CC` | Cocos Islands | Kokosøyene |
| `CO` | Colombia | Colombia |
| `KM` | Comoros | Komorene |
| `CK` | Cook Islands | Cookøyene |
| `CR` | Costa Rica | Costa Rica |
| `HR` | Croatia | Kroatia |
| `CU` | Cuba | Cuba |
| `CW` | Curaçao | Curaçao |
| `CY` | Cyprus | Kypros |
| `CZ` | Czech Republic | Tsjekkia |
| `CD` | Congo, the Democratic Republic | Kongo, den demokratiske republikken |
| `DK` | Denmark | Danmark |
| `DJ` | Djibouti | Djibouti |
| `DM` | Dominica | Dominica |
| `DO` | Dominican Republic | Den dominikanske republikk |
| `TL` | East Timor | Øst-Timor |
| `EC` | Ecuador | Ecuador |
| `EG` | Egypt | Egypt |
| `SV` | El Salvador | El Salvador |
| `GQ` | Equatorial Guinea | Ekvatorial-Guinea |
| `ER` | Eritrea | Eritrea |
| `EE` | Estonia | Estland |
| `SZ` | Eswatini | Eswatini |
| `ET` | Ethiopia | Etiopia |
| `FK` | Falkland Islands | Falklandsøyene |
| `FO` | Faroe Islands | Færøyene |
| `FJ` | Fiji | Fiji |
| `FI` | Finland | Finland |
| `FR` | France | Frankrike |
| `GF` | French Guiana | Fransk Guyana |
| `PF` | French Polynesia | Fransk Polynesia |
| `TF` | French Southern and Antarctic Lands | De franske sørterritorier |
| `GA` | Gabon | Gabon |
| `GM` | Gambia | Gambia |
| `GE` | Georgia | Georgia |
| `DE` | Germany | Tyskland |
| `GH` | Ghana | Ghana |
| `GI` | Gibraltar | Gibraltar |
| `GR` | Greece | Hellas |
| `GL` | Greenland | Grønland |
| `GD` | Grenada | Grenada |
| `GP` | Guadeloupe | Guadeloupe |
| `GU` | Guam | Guam |
| `GT` | Guatemala | Guatemala |
| `GG` | Guernsey | Guernsey |
| `GN` | Guinea | Guinea |
| `GW` | Guinea-Bissau | Guinea-Bissau |
| `GY` | Guyana | Guyana |
| `HT` | Haiti | Haiti |
| `HM` | Heard Island and McDonald Islands | Heard- og McDonaldøyene |
| `HN` | Honduras | Honduras |
| `HK` | Hong Kong | Hongkong |
| `HU` | Hungary | Ungarn |
| `IS` | Iceland | Island |
| `IN` | India | India |
| `ID` | Indonesia | Indonesia |
| `IR` | Iran | Iran |
| `IQ` | Iraq | Irak |
| `IE` | Ireland | Irland |
| `IM` | Isle of Man | Man |
| `IL` | Israel | Israel |
| `IT` | Italy | Italia |
| `CI` | Ivory Coast | Elfenbenskysten |
| `JM` | Jamaica | Jamaica |
| `JP` | Japan | Japan |
| `JE` | Jersey | Jersey |
| `JO` | Jordan | Jordan |
| `KZ` | Kazakhstan | Kasakhstan |
| `KE` | Kenya | Kenya |
| `KI` | Kiribati | Kiribati |
| `XK` | Kosovo | Kosovo |
| `KW` | Kuwait | Kuwait |
| `KG` | Kyrgyzstan | Kirgisistan |
| `LA` | Laos | Laos |
| `LV` | Latvia | Latvia |
| `LB` | Lebanon | Libanon |
| `LS` | Lesotho | Lesotho |
| `LR` | Liberia | Liberia |
| `LY` | Libya | Libya |
| `LI` | Liechtenstein | Liechtenstein |
| `LT` | Lithuania | Litauen |
| `LU` | Luxembourg | Luxembourg |
| `MO` | Macao | Macao |
| `MG` | Madagascar | Madagaskar |
| `MW` | Malawi | Malawi |
| `MY` | Malaysia | Malaysia |
| `MV` | Maldives | Maldivene |
| `ML` | Mali | Mali |
| `MT` | Malta | Malta |
| `MH` | Marshall Islands | Marshalløyene |
| `MQ` | Martinique | Martinique |
| `MR` | Mauritania | Mauritania |
| `MU` | Mauritius | Mauritius |
| `YT` | Mayotte | Mayotte |
| `MX` | Mexico | Mexico |
| `FM` | Micronesia | Mikronesia |
| `MD` | Moldova | Moldova |
| `MC` | Monaco | Monaco |
| `MN` | Mongolia | Mongolia |
| `ME` | Montenegro | Montenegro |
| `MS` | Montserrat | Montserrat |
| `MA` | Morocco | Marokko |
| `MZ` | Mozambique | Mosambik |
| `MM` | Myanmar | Myanmar |
| `NA` | Namibia | Namibia |
| `NR` | Nauru | Nauru |
| `NP` | Nepal | Nepal |
| `NL` | Netherlands | Nederland |
| `NC` | New Caledonia | Ny-Caledonia |
| `NZ` | New Zealand | New Zealand |
| `NI` | Nicaragua | Nicaragua |
| `NE` | Niger | Niger |
| `NG` | Nigeria | Nigeria |
| `NU` | Niue | Niue |
| `NF` | Norfolk Island | Norfolkøya |
| `KP` | North Korea | Nord-Korea |
| `MK` | North Macedonia | Nord-Makedonia |
| `MP` | Northern Mariana Islands | Nord-Marianene |
| `NO` | Norway | Norge |
| `OM` | Oman | Oman |
| `PK` | Pakistan | Pakistan |
| `PW` | Palau | Palau |
| `PS` | Palestine | Palestina |
| `PA` | Panama | Panama |
| `PG` | Papua New Guinea | Papua Ny-Guinea |
| `PY` | Paraguay | Paraguay |
| `PE` | Peru | Peru |
| `PH` | Philippines | Filippinene |
| `PN` | Pitcairn | Pitcairnøyene |
| `PL` | Poland | Polen |
| `PT` | Portugal | Portugal |
| `PR` | Puerto Rico | Puerto Rico |
| `QA` | Qatar | Qatar |
| `CG` | Congo, the Republic | Kongo, republikken |
| `RE` | Réunion | Réunion |
| `RO` | Romania | Romania |
| `RU` | Russia | Russland |
| `RW` | Rwanda | Rwanda |
| `BL` | Saint-Barthélemy | Saint-Barthélemy |
| `SH` | Saint Helena, Ascension and Tristan da Cunha | Saint Helena, Ascension og Tristan da Cunha |
| `KN` | Saint Kitts and Nevis | Saint Kitts og Nevis |
| `LC` | Saint Lucia | Saint Lucia |
| `MF` | Saint-Martin (FR) | Saint-Martin (FR) |
| `PM` | Saint Pierre and Miquelon | Saint Pierre og Miquelon |
| `VC` | Saint Vincent and the Grenadines | Saint Vincent og Grenadinene |
| `WS` | Samoa | Samoa |
| `SM` | San Marino | San Marino |
| `ST` | Sao Tome and Principe | São Tomé og Príncipe |
| `SA` | Saudi Arabia | Saudi-Arabia |
| `SN` | Senegal | Senegal |
| `RS` | Serbia | Serbia |
| `SC` | Seychelles | Seychellene |
| `SL` | Sierra Leone | Sierra Leone |
| `SG` | Singapore | Singapore |
| `SX` | Sint Maarten (NL) | Sint Maarten (NL) |
| `SK` | Slovakia | Slovakia |
| `SI` | Slovenia | Slovenia |
| `SB` | Solomon Islands | Salomonøyene |
| `SO` | Somalia | Somalia |
| `ZA` | South Africa | Sør-Afrika |
| `GS` | South Georgia and the South Sandwich Islands | Sør-Georgia og Sør-Sandwichøyene |
| `KR` | South Korea | Sør-Korea |
| `SS` | South Sudan | Sør-Sudan |
| `ES` | Spain | Spania |
| `LK` | Sri Lanka | Sri Lanka |
| `SD` | Sudan | Sudan |
| `SR` | Suriname | Surinam |
| `SJ` | Svalbard and Jan Mayen | Svalbard og Jan Mayen |
| `SE` | Sweden | Sverige |
| `CH` | Switzerland | Sveits |
| `SY` | Syria | Syria |
| `TW` | Taiwan | Taiwan |
| `TJ` | Tajikistan | Tadsjikistan |
| `TZ` | Tanzania | Tanzania |
| `TH` | Thailand | Thailand |
| `TG` | Togo | Togo |
| `TK` | Tokelau | Tokelau |
| `TO` | Tonga | Tonga |
| `TT` | Trinidad and Tobago | Trinidad og Tobago |
| `TN` | Tunisia | Tunisia |
| `TR` | Turkey | Tyrkia |
| `TM` | Turkmenistan | Turkmenistan |
| `TC` | Turks and Caicos Islands | Turks- og Caicosøyene |
| `TV` | Tuvalu | Tuvalu |
| `VI` | Virgin Islands (U.S) | De amerikanske Jomfruøyer |
| `UG` | Uganda | Uganda |
| `UA` | Ukraine | Ukraina |
| `AE` | United Arab Emirates | De forente arabiske emirater |
| `GB` | United Kingdom | Storbritannia |
| `US` | United States | USA |
| `UM` | United States Minor Outlying Islands | USAs ytre småøyer |
| `UY` | Uruguay | Uruguay |
| `UZ` | Uzbekistan | Usbekistan |
| `VU` | Vanuatu | Vanuatu |
| `VA` | Vatican | Vatikanstaten |
| `VE` | Venezuela | Venezuela |
| `VN` | Vietnam | Vietnam |
| `WF` | Wallis and Futuna | Wallis og Futuna |
| `EH` | Western Sahara | Vest-Sahara |
| `YE` | Yemen | Jemen |
| `ZM` | Zambia | Zambia |
| `ZW` | Zimbabwe | Zimbabwe |
| `AX` | Åland Islands | Åland |
