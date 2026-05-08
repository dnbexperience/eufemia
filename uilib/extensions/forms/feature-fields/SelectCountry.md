---
title: 'Field.SelectCountry'
description: '`Field.SelectCountry` is a wrapper component for the selection component, with options built in for selecting a country.'
version: 11.2.1
generatedAt: 2026-05-08T08:59:11.566Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Field.SelectCountry

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.SelectCountry />)
```

## Description

`Field.SelectCountry` is a wrapper component for [Field.Selection](/uilib/extensions/forms/base-fields/Selection), with options built in for selecting a country.
[The list of available countries to select](/uilib/extensions/forms/feature-fields/SelectCountry/properties/#list-of-available-countries) is carefully curated to meet the demands we know today.
When selecting a country, the value returned is the selected country's [ISO 3166-1 alpha-2 code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) (country code) like `NO` for Norway.

It supports the HTML [autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attribute, and by default set it to `country-name`.

There is a corresponding [Value.SelectCountry](/uilib/extensions/forms/Value/SelectCountry) component.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/SelectCountry)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/SelectCountry)

## Support for locales like `sv-SE` and `da-DK`

In addition to the default support for `nb-NO` and `en-GB`, you can also use the `sv-SE` and `da-DK` locales to display country names in Swedish or Danish.

Learn more about [importing additional locales](/uilib/usage/customisation/localization/#eufemia-forms).

### Filter or prioritize country listing

You can filter countries with the `countries` property's values `Scandinavia`, `Nordic` or `Europe`.

Countries are sorted in alphabetically order, with the following prioritized countries on top of the list:

- Norway
- Sweden
- Denmark
- Finland

```jsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.PhoneNumber countries="Prioritized" />)
```

### TransformIn and TransformOut

You can use the `transformIn` and `transformOut` to transform the value before it gets displayed in the field and before it gets sent to the form context. The second parameter is the country object. You may have a look at the demo below to see how it works.

```tsx
import type { CountryType } from '@dnb/eufemia/extensions/forms/Field/SelectCountry'

// From the Field (internal value) to the data context or event parameter
const transformOut = (internal: string, country: CountryType) => {
  if (internal) {
    return `${country.name} (${internal})`
  }
}

// To the Field (from e.g. defaultValue)
const transformIn = (external: unknown) => {
  return String(external).match(/\((.*)\)/)?.[1] || 'NO'
}
```

### onFocus, onBlur, onChange

These events have an additional parameter with the country object.

```tsx
const onFocus = (value, country) => {}
```

### The country object

```ts
{
  cdc: '47',
  iso: 'NO',
  name: 'Norge',
  i18n: { en: 'Norway', nb: 'Norge' },
  regions: ['Scandinavia', 'Nordic'],
  continent: 'Europe',
}
```


## Demos

### Option selected


```tsx
render(<Field.SelectCountry value="NO" onChange={(value, obj) => console.log('onChange', value, obj)} />)
```


### With a horizontal layout


```tsx
render(<Field.SelectCountry value="NO" layout="horizontal" layoutOptions={{
  width: '6rem'
}} />)
```


### With help


```tsx
render(<Field.SelectCountry value="NO" label="Label text" help={{
  title: 'Help is available',
  content: 'Helping others, encouraging others, are often acts of being kind that have more meaning that you may realize.'
}} onChange={(value, obj) => console.log('onChange', value, obj)} />)
```


### Disabled


```tsx
render(<Field.SelectCountry value="NO" label="Label text" onChange={(value, obj) => console.log('onChange', value, obj)} disabled />)
```


### Error


```tsx
render(<Field.SelectCountry value="NO" label="Label text" onChange={(value, obj) => console.log('onChange', value, obj)} error={new Error('This is what is wrong...')} />)
```


### Validation - Required


```tsx
render(<Field.SelectCountry label="Label text" onChange={(value, obj) => console.log('onChange', value, obj)} required validateInitially validateUnchanged />)
```


### TransformIn and TransformOut


```tsx
// From the Field (internal value) to the data context or event parameter
const transformOut = (value, country) => {
  if (value) {
    return country;
  }
};

// To the Field (from e.g. defaultValue)
// To the Field (from e.g. defaultValue)
const transformIn = country => {
  return country?.iso;
};
const MyForm = () => {
  return <Form.Handler onSubmit={console.log}>
              <Form.Card>
                <Field.SelectCountry path="/country" transformIn={transformIn} transformOut={transformOut} defaultValue="NO" />

                <Value.SelectCountry path="/country" transformIn={transformIn} placeholder="(Select a country)" showEmpty />

                <Form.SubHeading>Data Context</Form.SubHeading>
                <Tools.Log />
              </Form.Card>
              <Form.SubmitButton />
            </Form.Handler>;
};
render(<MyForm />);
```


### Filter countries

This example demonstrates how to filter specific countries. Use the `countries` property to define a set of countries and/or the `filterCountries` property to apply custom filtering logic.


```tsx
render(<Field.SelectCountry countries="Scandinavia" filterCountries={({
  iso
}) => iso !== 'DK'} />)
```



  
```tsx
render(<Field.SelectCountry value="NO" htmlAttributes={{
  opened: true
}} />)
```

### Field-specific properties


```json
{
  "props": {
    "countries": {
      "doc": "List only a certain set of countries: `Scandinavia`, `Nordic`, `Europe` or `Prioritized`(all countries [sorted by priority](/uilib/extensions/forms/feature-fields/SelectCountry/#filter-or-prioritize-country-listing)). Defaults to `Prioritized`.",
      "type": [
        "\"Scandinavia\"",
        "\"Nordic\"",
        "\"Europe\"",
        "\"Prioritized\""
      ],
      "status": "optional"
    },
    "filterCountries": {
      "doc": "Use this property to filter out certain countries. The function receives the country object and should return a boolean. Returning `false` will omit the country.",
      "type": "function",
      "status": "optional"
    },
    "size": {
      "doc": "Define the height of the Autocomplete. Can be set to `small`, `default`, `medium` and `large`. Defaults to `default`. Consider rather setting field sizes with [Form.Appearance](/uilib/extensions/forms/Form/Appearance/).",
      "type": [
        "\"small\"",
        "\"default\"",
        "\"medium\"",
        "\"large\""
      ],
      "status": "optional"
    }
  }
}
```


### General properties


```json
{
  "props": {
    "value": {
      "doc": "Source data value for the field. Will take precedence over the path value given in the data context.",
      "type": "{valueType}",
      "status": "optional"
    },
    "defaultValue": {
      "doc": "Default source data value for the field. Will not take precedence over the path value given in the data context.",
      "type": "{valueType}",
      "status": "optional"
    },
    "path": {
      "doc": "JSON Pointer for where the data for the field is located in the source dataset (when using Form.Handler or DataContext). The `path` will also be set as the `name` attribute for the [string](/uilib/extensions/forms/base-fields/String/)-field.",
      "type": "string",
      "status": "optional"
    },
    "info": {
      "doc": "Info message shown below / after the field by default. Use `statusPosition=\"above\"` to show status messages above the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`.",
      "type": [
        "React.ReactNode",
        "Array<React.ReactNode>",
        "function"
      ],
      "status": "optional"
    },
    "warning": {
      "doc": "Warning message shown below / after the field by default. Use `statusPosition=\"above\"` to show status messages above the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`.",
      "type": [
        "React.ReactNode",
        "Array<React.ReactNode>",
        "function"
      ],
      "status": "optional"
    },
    "error": {
      "doc": "Error message shown below / after the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`.",
      "type": [
        "Error",
        "FormError",
        "Array<Error | FormError>",
        "function"
      ],
      "status": "optional"
    },
    "disabled": {
      "doc": "Set `true` to show the field but without the possibility of changing the value.",
      "type": "boolean",
      "status": "optional"
    },
    "emptyValue": {
      "doc": "The value to use (in `onChange` events etc) when emptying the field. Makes it possible for instance to provide `undefined` instead of an empty string when clearing the content of a text input.",
      "type": [
        "{valueType}",
        "undefined"
      ],
      "status": "optional"
    },
    "required": {
      "doc": "When set to `true`, the field will give an error if the value fails the required validation. When set to `false`, the field will not be required, but will add a \"(optional)\" suffix to the label.",
      "type": "boolean",
      "status": "optional"
    },
    "labelSuffix": {
      "doc": "Will append an additional text to the label, like \"(optional)\". When using `inheritLabel`, the suffix will not be inherited. **NB:** The visual appearance of the `labelSuffix` may change in the future.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "schema": {
      "doc": "Custom JSON Schema for validating the value.",
      "type": "object",
      "status": "optional"
    },
    "validateInitially": {
      "doc": "Set to `true` to show validation based errors initially (from given value-property or source data) before the user interacts with the field.",
      "type": "boolean",
      "status": "optional"
    },
    "validateUnchanged": {
      "doc": "Set to `true` to show validation based errors when the field is touched (like focusing a field and blurring) without having changed the value. Since the user did not introduce a new error, this will apply when the value was initially invalid based on validation.",
      "type": "boolean",
      "status": "optional"
    },
    "validateContinuously": {
      "doc": "Set to `true` to show validation based errors continuously while writing, not just when blurring the field.",
      "type": "boolean",
      "status": "optional"
    },
    "errorMessages": {
      "doc": "Custom error messages for each type of error, overriding default messages. The messages can be a `React.ReactNode` or a string.",
      "type": "object",
      "status": "optional"
    },
    "onChangeValidator": {
      "doc": "Custom validator function where you can return `undefined`, `Error`, `FormError` or an Array with either several other validators or several `Error` or `FormError`. It is triggered on every change done by the user. The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }.",
      "type": "function",
      "status": "optional"
    },
    "onBlurValidator": {
      "doc": "Custom validator function where you can return `undefined`, `Error`, `FormError` or an Array with either several other validators or several `Error` or `FormError`. It is triggered when the user leaves a field (e.g., blurring a text input or closing a dropdown). The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }.",
      "type": "function",
      "status": "optional"
    },
    "transformIn": {
      "doc": "Transforms the `value` before its displayed in the field (e.g. input).",
      "type": "function",
      "status": "optional"
    },
    "transformOut": {
      "doc": "Transforms the value before it gets forwarded to the form data object (context) or returned as the `onChange` value parameter. The first parameter is the internal value. Some fields do support a second parameter, like the SelectCountry, where the country object is given.",
      "type": "function",
      "status": "optional"
    },
    "label": {
      "doc": "Label text displayed above the field. Most fields already have a default label, so check the field translations for an existing label entry. Only set `label` when you need to override the default.",
      "type": "string",
      "status": "optional"
    },
    "labelDescription": {
      "doc": "A more discreet text displayed beside the label (i.e. for \"(optional)\").",
      "type": "string",
      "status": "optional"
    },
    "labelDescriptionInline": {
      "doc": "If `true`, the `labelDescription` will be displayed on the same line as the label.",
      "type": "boolean",
      "status": "optional"
    },
    "labelSrOnly": {
      "doc": "Use `true` to make the label only readable by screen readers.",
      "type": "boolean",
      "status": "optional"
    },
    "labelSize": {
      "doc": "Define the font-size of the label based on the [font-size](/uilib/typography/font-size/) table.",
      "type": [
        "\"medium\"",
        "\"large\""
      ],
      "status": "optional"
    },
    "help": {
      "doc": "Provide help content for the field using `title` and `content` as a string or `React.ReactNode`. Additionally, you can set `open` to `true` to display the inline help, set the `breakout` property to `false` to disable the breakout of the inline help content, set `outset` to `false` to display the help text inline (inset) instead of the default outset behavior, or use `renderAs` set to `dialog` to render the content in a [Dialog](/uilib/components/dialog/) (recommended for larger amounts of content).",
      "type": "object",
      "status": "optional"
    },
    "hideHelpButton": {
      "doc": "Set `true` when you render the inline help button outside the label (e.g. inside a checkbox suffix) so FieldBlock skips drawing the default label help button.",
      "type": "boolean",
      "status": "optional"
    },
    "statusPosition": {
      "doc": "Controls where status messages (`error`, `warning`, `information`) are visually shown. Use `below` (default) or `above`.",
      "type": [
        "\"below\"",
        "\"above\""
      ],
      "status": "optional"
    },
    "layout": {
      "doc": "Layout for the label and input. Can be `horizontal` or `vertical`.",
      "type": [
        "\"horizontal\"",
        "\"vertical\""
      ],
      "status": "optional"
    },
    "layoutOptions": {
      "doc": "Use this to set additional options for the `horizontal` layout, e.g. `{ width: \"medium\" }`. You can also use a custom width `{number}rem`. Instead of a width, you can use a min/max width, e.g. `{ minWidth: \"6rem\", maxWidth: \"12rem\" }`.",
      "type": "object",
      "status": "optional"
    },
    "width": {
      "doc": "Will set the width for the whole block. Use `small`, `medium`, `large` for predefined standard widths. You can also set a custom width `{number}rem` or use `stretch` or `false`.",
      "type": [
        "string",
        "false"
      ],
      "status": "optional"
    },
    "contentWidth": {
      "doc": "Will set the width for its contents. Use `small`, `medium`, `large` for predefined standard widths. You can also set a custom width `{number}rem` or use `stretch` or `false`.",
      "type": [
        "string",
        "false"
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

NOTE: This list does not say anything about the order in which they will appear in component `Field.SelectCountry`. And is only meant to easily find which countries that's supported and available to use.


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

## Events


```json
{
  "props": {
    "onChange": {
      "doc": "Will be called on value changes made by the user, with the new value as argument. When an `async` function is used, the corresponding [FieldBlock](/uilib/extensions/forms/create-component/FieldBlock/) will show an indicator on the field label. You can return `{ success: 'saved' } as const` to show a success symbol, or an error or an object with these keys `{ info: 'Info message', warning: 'Warning message', error: Error('My error') } as const`. The second parameter is an object that e.g. contains `properties` (all given `Field.*` properties).",
      "type": "(value?: string, additionalArgs?: object) => void",
      "status": "optional"
    },
    "onFocus": {
      "doc": "Will be called when the component gets into focus. Like clicking inside a text input or opening a dropdown. Called with active value as argument. The second parameter is an object that e.g. contains `properties` (all given `Field.*` properties).",
      "type": "(value?: string, additionalArgs?: object) => void",
      "status": "optional"
    },
    "onBlur": {
      "doc": "Will be called when the component stop being in focus. Like when going to next field, or closing a dropdown. Called with active value as argument. The second parameter is an object that e.g. contains `properties` (all given `Field.*` properties).",
      "type": "(value?: string, additionalArgs?: object) => void",
      "status": "optional"
    },
    "onStatusChange": {
      "doc": "Called whenever the status messages (info, warning or error) gets visible or changes. Receives the current `{ info, warning, error }` object.",
      "type": "({ info?, warning?, error? }: FieldStatus) => void",
      "status": "optional"
    }
  }
}
```


### Details about argument values

The event handlers has two arguments. The first one is a `string` containing the `ISO` of the selected country, e.g. `CH`, and the second argument is an object with the properties `cdc`, `continent`, `i18n` and `iso`.

```jsx
(
  value?: string, // e.g. "CH"
  additionalArgs?: {
    i18n: {
      en: string, // e.g. "Switzerland"
      nb: string // e.g. "Sveits"
    },
    cdc: string, // e.g. "41"
    iso: string, // e.g. "CH"
    continent: string, // e.g. "Europe"
    name: string, // e.g. "Sveits"
    regions?: string[] // e.g ["Scandinavia", "Nordic"]
  }
) => void
```
