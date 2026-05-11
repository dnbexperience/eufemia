---
title: 'CountryFlag'
description: 'The CountryFlag component lets you display a country flag based on a country ISO code.'
version: 11.2.2
generatedAt: 2026-05-11T08:17:54.713Z
checksum: 96858d9c7269f72350401c3a9b92c476b3cbdcea7f967c9c12932cbbe1d8c391
---

# CountryFlag

## Import

```tsx
import { CountryFlag } from '@dnb/eufemia'

// Import the flag icons as CSS
import '@dnb/eufemia/components/country-flag/style/dnb-country-flag-icons.min.css'

// ... or as SASS
import '@dnb/eufemia/components/country-flag/style/dnb-country-flag-icons.scss'
```

## Description

The `CountryFlag` component lets you display a country flag based on a [ISO 3166-1 alpha-2 code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) like `NO` for Norway.

In order to use the CountryFlag component, you need to import the flag styles as CSS or SASS. The flag styles are available in the `dnb-country-flag-icons.min.css` and `dnb-country-flag-icons.scss` files. See the import example above.

These style files will import the SVG flag icon via a CSS `background-image`. This way only the used flags will be loaded by the browser.

For UX designers, there is the [Figma Flags Library](https://www.figma.com/design/Uc4ydRIqv0Ab4YiR6mSOZH/Eufemia---Flags), which provides a comprehensive collection of flag icons that can be used in your design projects.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/country-flag)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/country-flag)


## Demos

### All sizes


```tsx
render(<Flex.Horizontal align="center">
      <CountryFlag iso="NO" size="auto" />
      <CountryFlag iso="NO" size="xx-small" />
      <CountryFlag iso="NO" size="x-small" />
      <CountryFlag iso="NO" size="small" />
      <CountryFlag iso="NO" size="medium" />
      <CountryFlag iso="NO" size="large" />
      <CountryFlag iso="NO" size="x-large" />
    </Flex.Horizontal>)
```


### Square


```tsx
render(<CountryFlag iso="CH" shape="square" size="large" />)
```


### Eufemia Forms


```tsx
const MyComponent = ({
  label,
  ...props
}) => {
  const {
    value
  } = useValueProps(props);
  const iso = String(value);
  return <FieldBlock label={label}>
            <CountryFlag iso={iso} size="large" />
          </FieldBlock>;
};
render(<Form.Handler>
          <Field.Composition>
            <Field.SelectCountry label="Select a country" path="/country" width="medium" value="SE" />
            <MyComponent label="Country flag" path="/country" />
          </Field.Composition>
        </Form.Handler>);
```


### In various components


```tsx
render(<Flex.Vertical gap="x-small">
      <Button icon={<CountryFlag iso="NO" />} title="Icon button" />
      <Button icon={<CountryFlag iso="NO" />} title="Icon button" size="large" />
      <Button icon={<CountryFlag iso="NO" />} iconPosition="left" text="Button" variant="secondary" />
      <Button icon={<CountryFlag iso="NO" />} iconSize="medium" iconPosition="left" size="large" text="Button" variant="secondary" />
      <Input icon={<CountryFlag iso="NO" />} iconPosition="left" placeholder="Write something" />
      <Input icon={<CountryFlag iso="NO" />} iconPosition="left" size="large" placeholder="Write something" />
      <Dropdown value="NO" iconPosition="left" data={{
    NO: <Dropdown.HorizontalItem>
              <CountryFlag iso="NO" />
              {' '}Norway
            </Dropdown.HorizontalItem>,
    SE: <Dropdown.HorizontalItem>
              <CountryFlag iso="SE" />
              {' '}Sweden
            </Dropdown.HorizontalItem>
  }} />
      <Dropdown icon={<CountryFlag iso="NO" />} size="large" />

      <Flex.Horizontal align="center" gap="x-small">
        In Icon component:
        <Icon icon={<CountryFlag iso="NO" />} />
        <Icon icon={<CountryFlag iso="NO" />} size="medium" />
      </Flex.Horizontal>

      <Flex.Vertical>
        <Heading level="1">
          H1 heading <CountryFlag iso="NO" />
        </Heading>
        <Heading level="2">
          H2 heading <CountryFlag iso="NO" />
        </Heading>
        <Heading level="3">
          H3 heading <CountryFlag iso="NO" />
        </Heading>
        <P style={{
      maxWidth: '20rem'
    }}>
          <CountryFlag iso="NO" /> Paragraph Eiusmod id cillum Lorem nulla
          non consectetur pariatur mollit Lorem non do nulla reprehenderit
          {' '}
          <CountryFlag iso="NO" />
        </P>
      </Flex.Vertical>
    </Flex.Vertical>)
```

## Properties


```json
{
  "props": {
    "iso": {
      "doc": "[ISO 3166-1 alpha-2 code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) representing the country, such as `NO` for Norway. Defaults to `NO`.",
      "type": "string",
      "status": "optional"
    },
    "size": {
      "doc": "The size of the component. Can be `auto`, `xx-small`, `x-small`, `small`, `medium`, `large` or `x-large`. Defaults to `auto` (1em).",
      "type": [
        "\"auto\"",
        "\"xx-small\"",
        "\"x-small\"",
        "\"small\"",
        "\"medium\"",
        "\"large\"",
        "\"x-large\""
      ],
      "status": "optional"
    },
    "shape": {
      "doc": "The shape of the component. Can be `round` or `square`. Defaults to `round`.",
      "type": [
        "\"round\"",
        "\"square\""
      ],
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
