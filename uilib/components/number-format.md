---
title: 'NumberFormat'
description: 'A ready to use DNB number formatter.'
version: 11.1.1
generatedAt: 2026-05-05T18:42:12.459Z
checksum: 87a61c9318dc3fae366890f0d7cdbfb0a19ea0463fd4d7c1c87b54848f81d727
---

# NumberFormat

## Import

```tsx
import { NumberFormat } from '@dnb/eufemia'
```

## Description

A ready-to-use DNB number formatter. Use it wherever you have to display a number, a currency value, a phone number, etc.

For a complete locale comparison, see [Best Practices for number formatting](/uilib/usage/best-practices/for-formatting/).

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=52173-680)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/number-format)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/number-format)

Good reasons for why we have this:

- To standardize the formatting of numbers for all DNB applications.
- To make numbers accessible to screen readers.

### Supported formats

- Numbers in general e.g. <code className="dnb-code"><NumberFormat.Number value="12345678.90" /></code>
- Currency e.g. <code className="dnb-code"><NumberFormat.Currency value="12345678.90" /></code>
- Percentage e.g. <code className="dnb-code"><NumberFormat.Percent value="12.34" /></code>
- Phone numbers e.g. <code className="dnb-code"><NumberFormat.PhoneNumber value="004799999999" /></code>
- Bank account number e.g. <code className="dnb-code"><NumberFormat.BankAccountNumber value="20001234567" /></code>
- National identification number e.g. <code className="dnb-code"><NumberFormat.NationalIdentityNumber value="18089212345" /></code>
- Organization number e.g. <code className="dnb-code"><NumberFormat.OrganizationNumber value="123456789" /></code>
- Compact (short) numbers e.g. <code className="dnb-code"><NumberFormat.Number compact value="12345678" decimals={1} /></code>
- Compact (long) currency e.g. <code className="dnb-code"><NumberFormat.Currency compact="long" currencyDisplay="name" value="12345678" decimals={1} /></code>

### Defaults

It uses the browser APIs `number.toLocaleString` or `Intl.NumberFormat.format` under the hood. As well as some custom formatter. The locale defaults to:

- Locale: `nb-NO`
- Currency: `NOK`

#### Norwegian kroner

When the currency format is set to `currencyDisplay="name"`, the currency will be displayed as "kroner" instead of "Norwegian kroner".

- Norwegian currency: <code className="dnb-code"><NumberFormat.Currency currencyDisplay="name" value="1234.90" /></code>
- Swedish currency: <code className="dnb-code"><NumberFormat.Currency currency="SEK" currencyDisplay="name" value="1234.90" /></code>

#### Not available

When a number should be displayed but is not available to the frontend application, the NumberFormat component will display a single **em dash** (–), and a screen reader will receive the text "Ikke tilgjengelig" / "Not available".

Example: <NumberFormat.Currency value="invalid" />

## Decimals

If the value has more decimal places than specified by the `decimals={2}` property, it will be rounded accordingly.

Here are the available options for the `rounding` property:

- `omit`: Truncate decimals without rounding.
- `half-even`: Round to the nearest even number.
- `half-up` (default): Round up if the fractional part is 0.5 or greater; otherwise, round down.

## Value Components

The formatting helpers power several `Value.*` components:

- [Value.Number](/uilib/extensions/forms/Value/Number/)
- [Value.Currency](/uilib/extensions/forms/Value/Currency/)
- [Value.Date](/uilib/extensions/forms/Value/Date/)
- [Value.DateOfBirth](/uilib/extensions/forms/Value/DateOfBirth/)
- [Value.PhoneNumber](/uilib/extensions/forms/Value/PhoneNumber/)
- [Value.BankAccountNumber](/uilib/extensions/forms/Value/BankAccountNumber/)
- [Value.NationalIdentityNumber](/uilib/extensions/forms/Value/NationalIdentityNumber/)
- [Value.OrganizationNumber](/uilib/extensions/forms/Value/OrganizationNumber/)

## Provider

You can send down the `locale` as an application-wide property (Context). More info about the [provider and locale usage](/uilib/components/number-format/provider).

```jsx
import Provider from '@dnb/eufemia/shared/Provider'

render(
  <Provider locale="en-GB" NumberFormat={{ currencyDisplay: 'code' }}>
    <MyApp>
      text <NumberFormat.Number>123</NumberFormat.Number> table etc.
    </MyApp>
  </Provider>
)
```

## Formatter utilities

Each variant has a matching formatter function you can use outside of React (e.g. in utilities, tests or server code). They are all available from the main import:

```tsx
import {
  formatNumber,
  formatCurrency,
  formatPercent,
  formatPhoneNumber,
  formatBankAccountNumber,
  formatNationalIdentityNumber,
  formatOrganizationNumber,
} from '@dnb/eufemia/components/NumberFormat'
```

| Formatter                      | Component variant                     |
| ------------------------------ | ------------------------------------- |
| `formatNumber`                 | `NumberFormat.Number`                 |
| `formatCurrency`               | `NumberFormat.Currency`               |
| `formatPercent`                | `NumberFormat.Percent`                |
| `formatPhoneNumber`            | `NumberFormat.PhoneNumber`            |
| `formatBankAccountNumber`      | `NumberFormat.BankAccountNumber`      |
| `formatNationalIdentityNumber` | `NumberFormat.NationalIdentityNumber` |
| `formatOrganizationNumber`     | `NumberFormat.OrganizationNumber`     |

Each formatter accepts `(value, options?)` and returns a formatted string. Pass `{ returnAria: true }` to get the full object with `number`, `aria`, `cleanedValue` and `locale`.

## NumberFormat Hook

**Heads up:** If you do so, keep in mind that you will have to ensure all the accessibility enhancements the component offers. For that, you can use the `aria` field:

```jsx
import Provider from '@dnb/eufemia/shared/Provider'
import {
  useNumberFormat,
  formatCurrency,
} from '@dnb/eufemia/components/NumberFormat'

function Component() {
  // By using returnAria you get an object
  const { number, aria } = useNumberFormat(12345678.9, formatCurrency, {
    // Props are inherited from the Eufemia Provider and the NumberFormat object
    returnAria: true,
  })

  return (
    <span>
      <span aria-hidden>{number}</span>
      <span className="dnb-sr-only">{aria}</span>
    </span>
  )
}

render(
  <Provider locale="en-GB" NumberFormat={{ currency: 'EUR' }}>
    <Component />
  </Provider>
)
```

### NumberFormat Hook with parts

You can also use `useNumberFormatWithParts` when you need split output for custom layouts:

```jsx
import Provider from '@dnb/eufemia/shared/Provider'
import {
  useNumberFormatWithParts,
  formatCurrency,
} from '@dnb/eufemia/components/NumberFormat'

function Component() {
  // useNumberFormatWithParts defaults to returnAria=true
  const { number, aria, parts } = useNumberFormatWithParts(
    12345678.9,
    formatCurrency
  )

  return (
    <span>
      <span aria-hidden>
        {parts.sign}
        {parts.number}
        {parts.currency ? ` ${parts.currency}` : null}
      </span>
      <span className="dnb-sr-only">{aria}</span>
    </span>
  )
}

render(
  <Provider locale="en-GB" NumberFormat={{ currency: 'EUR' }}>
    <Component />
  </Provider>
)
```

## Related component

For prominent values with dedicated typography controls, use [Stat](/uilib/components/stat/).

## Formatting only (interceptor)

You can use the variant formatter functions without using a React Component or React Hook.

**Heads up:** If you do so, keep in mind that you will have to ensure all the accessibility enhancements the component offers. For that, you can use the `aria` field:

```ts
import {
  formatCurrency,
  formatNumber,
} from '@dnb/eufemia/components/number-format/NumberUtils'

// By using returnAria you get an object
const { number, aria } = formatCurrency(12345678.9, {
  locale: 'nb-NO', // not inherited
  returnAria: true,
})

// Basic formatting
const number = formatNumber(1234)
```

Each variant formatter accepts the same options as the corresponding component variant.

### Interceptor helpers

Also, you may check out the related tests **NumberFormat > cleanNumber** in the source code to find more examples.

```ts
import { cleanNumber } from '@dnb/eufemia/components/number-format/NumberUtils'

const string = cleanNumber('prefix -12 345,678 suffix') // returns -12345.678
const string = cleanNumber('prefix -12.345,678 suffix') // returns -12345.678
```

### Format bank account numbers

Use `formatBankAccountNumberByType` to format bank account numbers with a specific type. It supports Norwegian BBAN, Swedish BBAN, Swedish Bankgiro, Swedish Plusgiro, and IBAN.

```ts
import { formatBankAccountNumberByType } from '@dnb/eufemia/components/NumberFormat'

formatBankAccountNumberByType('20001234567') // { number: '2000 12 34567', aria: '20 00 12 34 56 7' }
formatBankAccountNumberByType('50001234567', 'swedishBban') // { number: '5000-1234567', aria: '50 00 12 34 56 7' }
formatBankAccountNumberByType('59140129', 'swedishBankgiro') // { number: '5914-0129', aria: '59 14 01 29' }
formatBankAccountNumberByType('1263664', 'swedishPlusgiro') // { number: '126366-4', aria: '12 63 66 4' }
formatBankAccountNumberByType('NO9386011117947', 'iban') // { number: 'NO93 8601 1117 947', aria: 'NO93 8601 1117 947' }
```

### Element and style

The number component is style-independent, so it has no visual styles. By default, a `<span>` is used (with [speak-as: numbers](https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style/speak-as), even though the support is very low). However, you can easily change the element type by providing a different value to the `element="div"` property.

## Accessibility

**NVDA** also has [issues](https://github.com/nvaccess/nvda/issues/8874) reconciling the `lang` attribute, which makes it hard to have a solid and good solution for reading numbers. VoiceOver on desktop does a perfect job with this.

**VoiceOver** on mobile devices (iOS) only supports numbers read out properly to a maximum of `99,999.00`. On amounts above this value, VO reads numbers digit by digit.

To enhance the **Copy & Paste** experience of copying numbers into other applications (Excel), you may use the `cleanCopyValue` property. It will then provide a second number, without thousand separators and to have a comma/dot (depending on the locale) as the decimal separator. This number is not visible, but will be used when selecting & copying the whole number on the first click to the system clipboard.

You can enable this feature on all your NumberFormat components by using the `Provider`:

```jsx
import { Provider } from '@dnb/eufemia/shared'

render(
  <Provider value={{ NumberFormat: { cleanCopyValue: true } }}>
    <YourApp />
  </Provider>
)
```

### More details

> Screen readers require numbers to be formatted properly in order to be read as numbers. The **NumberFormat** component helps achieve this requirement.

Numbers are formatted differently for screen readers than the visual number. Numbers also get assigned a `lang` attribute so the screen reader knows what language (locale) should be used for the particular number, even if the surrounding text does not correspond to the same language.

### Sources

Eufemia bases its number formats on both the [Norwegian authority](https://lovdata.no/forskrift/2004-02-16-426/§16) and [Språkradet](https://www.sprakradet.no/sprakhjelp/Skriveregler/Dato), and currency is based on [guidelines](https://www.sprakradet.no/svardatabase/sporsmal-og-svar/kronebelop-rekkjefolgje-komma-og-strek/) from Språkrådet. Wikipedia has more info on worldwide [decimal separator](https://en.wikipedia.org/wiki/Decimal_separator) usage.

For international number formatting we use these sources:

- [ONS – Writing numbers](https://service-manual.ons.gov.uk/content/numbers/writing-numbers)
- [GOV.UK Style Guide](https://www.gov.uk/guidance/style-guide/a-to-z-of-gov-uk-style#numbers)
- [NHS Service Manual](https://service-manual.nhs.uk/content/numbers-measurements-dates-time) all recommend using **commas** as the thousands separator for `en-GB`.
- [EU Data Visualisation Guide](https://data.europa.eu/apps/data-visualisation-guide/number-formatting) states the same for digital content.
- [EU’s Handbook for authors and translators](https://commission.europa.eu/system/files/2023-11/styleguide_english_dgt_en.pdf) specifies non-breaking spaces as the main rule, **but explicitly allows commas when writing for the web** – which is exactly our context.
- [ISO 80000-1](https://www.iso.org/standard/76921.html) (formerly ISO 31-0) is a scientific/technical standard and **not a linguistic style guide**, so we do not use it for how we present numbers to end users on the web.

**Difference between formats:**

- `1 234.00` – 🇬🇧 Current DNB practice for English
- `1,234.00` – 🇬🇧 Recommended by official UK sources (ONS, GOV.UK, NHS)

**Accessibility:** WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html) and [3.1.1 Language of Page](https://www.w3.org/WAI/WCAG21/Understanding/language-of-page.html) require that content can be correctly interpreted by assistive technologies.

When using spaces as thousand separators, screen readers misinterpret numbers in English. For example: `45 804` is read as "45" and "804" instead of "forty-five thousand eight hundred and four."

## Node.js and SSR usage

If you run the component or `format` function in [Node.js](https://nodejs.org), you have to include [ICU](https://nodejs.org/api/intl.html) data in order to display other locales than en-GB. You can do this by:

- installing `npm i full-icu`
- and call node (or jest) with an environment variable pointing to the package: `NODE_ICU_DATA=./node_modules/full-icu node ...`
- after a Node.js version upgrade you may have to run `npm rebuild`

## Known issues

Edge Browser on Windows 10 is converting numbers automatically to followable links. This makes the experience on NVDA bad, as it reads also the new, unformatted link number.

You can [disable this behavior](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/x-ms-format-detection):

```html
<html x-ms-format-detection="none">
  ...
</html>
```


## Demos

<ChangeLocale label="Locale used in the demos:" />

### Default numbers


```tsx
render(<Style>
    <ComponentBox data-visual-test="number-format-default">
      <P>
        <NumberFormat.Number value="12345" srLabel="Total:" />
        <NumberFormat.Number>-12345678.9</NumberFormat.Number>
        <NumberFormat.Number prefix={<b>prefix</b>} suffix="suffix">
          -12345678.9
        </NumberFormat.Number>
        <NumberFormat.Number decimals={1}>-1234.54321</NumberFormat.Number>
        <NumberFormat.Number decimals={2} copySelection={false}>
          -1234
        </NumberFormat.Number>
        <NumberFormat.Number decimals={2}>invalid</NumberFormat.Number>
      </P>
    </ComponentBox>
  </Style>)
```


### Currency


```tsx
render(<Style>
    <ComponentBox data-visual-test="number-format-currency">
      <P>
        <NumberFormat.Currency>12345</NumberFormat.Currency>
        <NumberFormat.Currency currencyPosition="before" value={-12345678.9} />
        <NumberFormat.Currency value={-12345678.95} decimals={0} />
        <NumberFormat.Currency value={-12345678.9} currencyDisplay="code" />
        <NumberFormat.Currency value={-12345678.9} currencyDisplay={false} />
        <NumberFormat.Currency decimals={2}>invalid</NumberFormat.Currency>
      </P>
    </ComponentBox>
  </Style>)
```


### Hero-style values

For prominent values, use [Stat](/uilib/components/stat/) with `Stat.Currency` and `Stat.Percent`.


```tsx
render(<Style>
    <ComponentBox>
      <Stat.Currency value={12345} currency="NOK" suffix="/mnd" signDisplay="always" mainSize="x-large" auxiliarySize="x-small" />
    </ComponentBox>
  </Style>)
```


### Compact (shorten) numbers

Shorten numbers should only be used for numbers above 100 000. A small `k` for thousand is not a Norwegian standard, and should not be used in formal contexts.


```tsx
render(<Style>
    <ComponentBox data-visual-test="number-format-compact">
      <P>
        <NumberFormat.Number compact decimals={1}>
          1234
        </NumberFormat.Number>
        <NumberFormat.Number compact decimals={1} value={123456} />
        <NumberFormat.Number compact="short" decimals={2} value={-1723967.38} />
        <NumberFormat.Number compact="long" decimals={3} value={-1234567.9876} />
        <NumberFormat.Currency compact="long" value={12345} decimals={1} currencyDisplay="name" />
        <NumberFormat.Number compact value={123455678912} decimals={3} />
      </P>
    </ComponentBox>
  </Style>)
```


### Percentage


```tsx
render(<Style>
    <ComponentBox data-visual-test="number-format-percent">
      <P>
        <NumberFormat.Percent value="12.34" />
        <NumberFormat.Percent>-12.34</NumberFormat.Percent>
        <NumberFormat.Percent decimals={1}>-12.34</NumberFormat.Percent>
      </P>
    </ComponentBox>
  </Style>)
```


### Phone

By using `selectAll={false}` you disable the auto-select all feature.


```tsx
render(<Style>
    <ComponentBox data-visual-test="number-format-phone">
      <P>
        <NumberFormat.PhoneNumber value="99999999" />
        <NumberFormat.PhoneNumber value="+4799999999" />
        <NumberFormat.PhoneNumber value="004799999999" />
        <NumberFormat.PhoneNumber value="+4780022222" link="sms" />
        <NumberFormat.PhoneNumber value="+47116000" selectAll={false} />
        <NumberFormat.PhoneNumber value="+4702000" />
      </P>
    </ComponentBox>
  </Style>)
```


### Bank Account number (Kontonummer)


```tsx
render(<Style>
    <ComponentBox data-visual-test="number-format-ban">
      <P>
        <NumberFormat.BankAccountNumber value="20001234567" />
      </P>
    </ComponentBox>
  </Style>)
```


### National Identification number (Fødselsnummer)


```tsx
render(<Style>
    <ComponentBox data-visual-test="number-format-nin">
      <P>
        <NumberFormat.NationalIdentityNumber value="18089212345" />
      </P>
    </ComponentBox>
  </Style>)
```


### Organization number (Organisasjonsnummer)


```tsx
render(<Style>
    <ComponentBox data-visual-test="number-format-org">
      <P>
        <NumberFormat.OrganizationNumber value="123456789" suffix="MVA" />
      </P>
    </ComponentBox>
  </Style>)
```


### Numbers and currencies in different locales


```tsx
render(<Style>
    <ComponentBox data-visual-test="number-format-locales">
      <H3>Numbers</H3>
      <P>
        <NumberFormat.Number locale="nb-NO" value="-12345678.9" />
        <NumberFormat.Number locale="en-GB" value="-12345678.9" />
        <NumberFormat.Number locale="de-DE" value="-12345678.9" />
        <NumberFormat.Number locale="de-CH" value="-12345678.9" />
        <NumberFormat.Number locale="fr-CH" value="-12345678.9" />
      </P>

      <H3>Currencies</H3>
      <P>
        <NumberFormat.Currency locale="nb-NO" value="-12345.6" />
        <NumberFormat.Currency locale="en-GB" value="-12345.6" />
        <NumberFormat.Currency locale="de-DE" value="-12345.6" />
        <NumberFormat.Currency locale="de-CH" value="-12345.6" />
        <NumberFormat.Currency locale="fr-CH" value="-12345.6" />
      </P>
    </ComponentBox>
  </Style>)
```


### NumberFormat and spacing

The NumberFormat uses `display: inline-block;` in order to make the [spacing system](/uilib/layout/space) to work.


```tsx
render(<Style>
    <ComponentBox data-visual-test="number-format-spacing">
      <span>text</span> <NumberFormat.Currency value="1234" left right />
      <span>text</span> <NumberFormat.Currency value="5678" left right />
      <span>text</span>
    </ComponentBox>
  </Style>)
```


### Sign display

Control when to display the sign for numbers using the `signDisplay` property. Options include `always`, `exceptZero`, `negative`, and `never`.


```tsx
render(<Style>
    <ComponentBox data-visual-test="number-format-sign-display">
      <H3>signDisplay="auto"</H3>
      <P>
        <NumberFormat.Number signDisplay="auto" value={1234} />
        <NumberFormat.Number signDisplay="auto" value={-1234} />
        <NumberFormat.Number signDisplay="auto" value={0} />
      </P>
      <H3>signDisplay="always"</H3>
      <P>
        <NumberFormat.Number signDisplay="always" value={1234} />
        <NumberFormat.Number signDisplay="always" value={-1234} />
        <NumberFormat.Number signDisplay="always" value={0} />
      </P>
      <H3>signDisplay="never"</H3>
      <P>
        <NumberFormat.Number signDisplay="never" value={1234} />
        <NumberFormat.Number signDisplay="never" value={-1234} />
        <NumberFormat.Number signDisplay="never" value={0} />
      </P>
      <H3>signDisplay="negative"</H3>
      <P>
        <NumberFormat.Number signDisplay="negative" value={1234} />
        <NumberFormat.Number signDisplay="negative" value={-1234} />
        <NumberFormat.Number signDisplay="negative" value={0} />
      </P>
      <H3>signDisplay="exceptZero"</H3>
      <P>
        <NumberFormat.Number signDisplay="exceptZero" value={1234} />
        <NumberFormat.Number signDisplay="exceptZero" value={-1234} />
        <NumberFormat.Number signDisplay="exceptZero" value={0} />
      </P>
    </ComponentBox>
  </Style>)
```


### Using the Provider with NumberFormat

In this example every NumberFormat will receive the Provider defined properties, including `cleanCopyValue`.


```tsx
render(<Style>
    <ComponentBox>
      <Provider value={{
      NumberFormat: {
        currency: true,
        rounding: 'omit',
        cleanCopyValue: true
      }
    }}>
        <P>
          <NumberFormat.Currency>12345</NumberFormat.Currency>
          <NumberFormat.Currency value={-12345.123} decimals={0} />
          <NumberFormat.Currency value={-12345678.955} currencyPosition="before" />
        </P>
      </Provider>
    </ComponentBox>
  </Style>)
```


### Monospace

By using the `monospace` property you can set the font to [DNB Mono Regular](/quickguide-designer/fonts)


```tsx
render(<Style>
    <ComponentBox data-visual-test="number-format-monospace">
      <NumberFormat.Currency value="123456" locale="en-GB" currency="NOK" monospace />
    </ComponentBox>
  </Style>)
```

## Properties

`NumberFormat` is only exposed as a namespace. Pick the variant you need – this keeps the bundle small because only the variants you import are included.

### `NumberFormat.Number`


```json
{
  "props": {
    "value": {
      "doc": "A number or a string containing a number.",
      "type": [
        "number",
        "string"
      ],
      "status": "optional"
    },
    "locale": {
      "doc": "Use a [2 Letter Language Code](https://www.sitepoint.com/iso-2-letter-language-codes/) or an extended code such as `nb-NO`. Use `auto` to detect the locale from the browser (`navigator.language`). Defaults to the Norwegian locale: `nb-NO`.",
      "type": "string",
      "status": "optional"
    },
    "decimals": {
      "doc": "Set a number to define the number of decimals. Like `decimals=\"0\"` will ensure that decimals are simply not shown. The default decimals for currency usage are `2` (Browser API default).",
      "type": "number",
      "status": "optional"
    },
    "rounding": {
      "doc": "If `omit` is given, the decimal will NOT be rounded. If set to `half-even`, the value will be rounded to the nearest even number. If set to `half-up`, the fractional part is 0.5 or greater, the number is rounded up. If the fractional part is less than 0.5, the number is rounded down. Defaults to `half-up`.",
      "type": [
        "\"omit\"",
        "\"half-even\"",
        "\"half-up\""
      ],
      "status": "optional"
    },
    "signDisplay": {
      "doc": "When to display the sign for the number. Use `auto` (default) for negative numbers only, `always` to always display sign, `exceptZero` for positive and negative numbers but not zero, `negative` for negative numbers only including negative zero, or `never` to never display sign.",
      "type": [
        "\"auto\"",
        "\"always\"",
        "\"exceptZero\"",
        "\"negative\"",
        "\"never\""
      ],
      "status": "optional"
    },
    "clean": {
      "doc": "If set to `true` a dirty string will be parsed to extract the number (`prefix -123.45 suffix` would result in e.g. `kr -123,45`).",
      "type": "boolean",
      "status": "optional"
    },
    "prefix": {
      "doc": "Add a string or React component before the number, including white space.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "suffix": {
      "doc": "Appends a string or React component after the number, including white space. When the suffix is a string starting with `/`, no space is added (e.g. `suffix=\"/mnd\"` renders \"123/mnd\").",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "selectAll": {
      "doc": "Use `false` to disable the auto select all on the first click. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "alwaysSelectAll": {
      "doc": "Use `true` to always auto select all on the first click. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "copySelection": {
      "doc": "Use `false` to disable the auto copy feature. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "cleanCopyValue": {
      "doc": "If set to `true` the copy&paste value will be provided without e.g. a currency sign or a percent sign. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "srLabel": {
      "doc": "Will add a visually hidden label, to give screen reader users the missing context to easier understand what the number represents.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "monospace": {
      "doc": "Sets the font to [DNB Mono Regular](/quickguide-designer/fonts/#dnbmono-regular).",
      "type": "boolean",
      "status": "optional"
    },
    "element": {
      "doc": "Define what HTML element should be used. Defaults to `<span>`.",
      "type": "string",
      "status": "optional"
    },
    "options": {
      "doc": "Accepts all [number.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString) or [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) options as an object - can also be a JSON given as the parameter e.g. `options={{ 'minimumFractionDigits': 2 }}`.",
      "type": "object",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
      "type": "boolean",
      "status": "optional"
    },
    "tooltip": {
      "doc": "Provide a string or a React Element to be shown as the tooltip content.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "compact": {
      "doc": "Shortens any number or currency including an abbreviation. Available on both `NumberFormat.Number` and `NumberFormat.Currency`. It gives you zero decimal by default `decimals={0}`. Use either `short` or `long`. Defaults to `short` if `true` is given.",
      "type": [
        "boolean",
        "string"
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


### `NumberFormat.Currency`


```json
{
  "props": {
    "value": {
      "doc": "A number or a string containing a number.",
      "type": [
        "number",
        "string"
      ],
      "status": "optional"
    },
    "locale": {
      "doc": "Use a [2 Letter Language Code](https://www.sitepoint.com/iso-2-letter-language-codes/) or an extended code such as `nb-NO`. Use `auto` to detect the locale from the browser (`navigator.language`). Defaults to the Norwegian locale: `nb-NO`.",
      "type": "string",
      "status": "optional"
    },
    "currency": {
      "doc": "Currency code (ISO 4217) or `true` to use the default `NOK`. Defaults to `true` when using `NumberFormat.Currency`. Uses two decimals by default.",
      "type": [
        "string",
        "boolean"
      ],
      "status": "optional"
    },
    "currencyDisplay": {
      "doc": "Use either empty/false to hide the sign/name or use `code` (NOK), `name` (kroner), `symbol` (kr) or `narrowSymbol` (for a shorter symbol variant). Defaults to `narrowSymbol` when the locale is `no` else we default to `code`.",
      "type": "string",
      "status": "optional"
    },
    "currencyPosition": {
      "doc": "Use either `before` or `after` to change/define the position of the currency. Defaults to `auto` (Browser API defaults, but with an exception, if the locale is `nb-NO` or `no`, use after as the default position).",
      "type": "string",
      "status": "optional"
    },
    "compact": {
      "doc": "Shortens any number or currency including an abbreviation. Available on both `NumberFormat.Number` and `NumberFormat.Currency`. It gives you zero decimal by default `decimals={0}`. Use either `short` or `long`. Defaults to `short` if `true` is given.",
      "type": [
        "boolean",
        "string"
      ],
      "status": "optional"
    },
    "decimals": {
      "doc": "Set a number to define the number of decimals. Like `decimals=\"0\"` will ensure that decimals are simply not shown. The default decimals for currency usage are `2` (Browser API default).",
      "type": "number",
      "status": "optional"
    },
    "rounding": {
      "doc": "If `omit` is given, the decimal will NOT be rounded. If set to `half-even`, the value will be rounded to the nearest even number. If set to `half-up`, the fractional part is 0.5 or greater, the number is rounded up. If the fractional part is less than 0.5, the number is rounded down. Defaults to `half-up`.",
      "type": [
        "\"omit\"",
        "\"half-even\"",
        "\"half-up\""
      ],
      "status": "optional"
    },
    "signDisplay": {
      "doc": "When to display the sign for the number. Use `auto` (default) for negative numbers only, `always` to always display sign, `exceptZero` for positive and negative numbers but not zero, `negative` for negative numbers only including negative zero, or `never` to never display sign.",
      "type": [
        "\"auto\"",
        "\"always\"",
        "\"exceptZero\"",
        "\"negative\"",
        "\"never\""
      ],
      "status": "optional"
    },
    "clean": {
      "doc": "If set to `true` a dirty string will be parsed to extract the number (`prefix -123.45 suffix` would result in e.g. `kr -123,45`).",
      "type": "boolean",
      "status": "optional"
    },
    "prefix": {
      "doc": "Add a string or React component before the number, including white space.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "suffix": {
      "doc": "Appends a string or React component after the number, including white space. When the suffix is a string starting with `/`, no space is added (e.g. `suffix=\"/mnd\"` renders \"123/mnd\").",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "selectAll": {
      "doc": "Use `false` to disable the auto select all on the first click. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "alwaysSelectAll": {
      "doc": "Use `true` to always auto select all on the first click. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "copySelection": {
      "doc": "Use `false` to disable the auto copy feature. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "cleanCopyValue": {
      "doc": "If set to `true` the copy&paste value will be provided without e.g. a currency sign or a percent sign. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "srLabel": {
      "doc": "Will add a visually hidden label, to give screen reader users the missing context to easier understand what the number represents.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "monospace": {
      "doc": "Sets the font to [DNB Mono Regular](/quickguide-designer/fonts/#dnbmono-regular).",
      "type": "boolean",
      "status": "optional"
    },
    "element": {
      "doc": "Define what HTML element should be used. Defaults to `<span>`.",
      "type": "string",
      "status": "optional"
    },
    "options": {
      "doc": "Accepts all [number.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString) or [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) options as an object - can also be a JSON given as the parameter e.g. `options={{ 'minimumFractionDigits': 2 }}`.",
      "type": "object",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
      "type": "boolean",
      "status": "optional"
    },
    "tooltip": {
      "doc": "Provide a string or a React Element to be shown as the tooltip content.",
      "type": "React.ReactNode",
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


### `NumberFormat.Percent`


```json
{
  "props": {
    "value": {
      "doc": "A number or a string containing a number.",
      "type": [
        "number",
        "string"
      ],
      "status": "optional"
    },
    "locale": {
      "doc": "Use a [2 Letter Language Code](https://www.sitepoint.com/iso-2-letter-language-codes/) or an extended code such as `nb-NO`. Use `auto` to detect the locale from the browser (`navigator.language`). Defaults to the Norwegian locale: `nb-NO`.",
      "type": "string",
      "status": "optional"
    },
    "decimals": {
      "doc": "Set a number to define the number of decimals. Like `decimals=\"0\"` will ensure that decimals are simply not shown. The default decimals for currency usage are `2` (Browser API default).",
      "type": "number",
      "status": "optional"
    },
    "rounding": {
      "doc": "If `omit` is given, the decimal will NOT be rounded. If set to `half-even`, the value will be rounded to the nearest even number. If set to `half-up`, the fractional part is 0.5 or greater, the number is rounded up. If the fractional part is less than 0.5, the number is rounded down. Defaults to `half-up`.",
      "type": [
        "\"omit\"",
        "\"half-even\"",
        "\"half-up\""
      ],
      "status": "optional"
    },
    "signDisplay": {
      "doc": "When to display the sign for the number. Use `auto` (default) for negative numbers only, `always` to always display sign, `exceptZero` for positive and negative numbers but not zero, `negative` for negative numbers only including negative zero, or `never` to never display sign.",
      "type": [
        "\"auto\"",
        "\"always\"",
        "\"exceptZero\"",
        "\"negative\"",
        "\"never\""
      ],
      "status": "optional"
    },
    "clean": {
      "doc": "If set to `true` a dirty string will be parsed to extract the number (`prefix -123.45 suffix` would result in e.g. `kr -123,45`).",
      "type": "boolean",
      "status": "optional"
    },
    "prefix": {
      "doc": "Add a string or React component before the number, including white space.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "suffix": {
      "doc": "Appends a string or React component after the number, including white space. When the suffix is a string starting with `/`, no space is added (e.g. `suffix=\"/mnd\"` renders \"123/mnd\").",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "selectAll": {
      "doc": "Use `false` to disable the auto select all on the first click. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "alwaysSelectAll": {
      "doc": "Use `true` to always auto select all on the first click. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "copySelection": {
      "doc": "Use `false` to disable the auto copy feature. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "cleanCopyValue": {
      "doc": "If set to `true` the copy&paste value will be provided without e.g. a currency sign or a percent sign. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "srLabel": {
      "doc": "Will add a visually hidden label, to give screen reader users the missing context to easier understand what the number represents.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "monospace": {
      "doc": "Sets the font to [DNB Mono Regular](/quickguide-designer/fonts/#dnbmono-regular).",
      "type": "boolean",
      "status": "optional"
    },
    "element": {
      "doc": "Define what HTML element should be used. Defaults to `<span>`.",
      "type": "string",
      "status": "optional"
    },
    "options": {
      "doc": "Accepts all [number.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString) or [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) options as an object - can also be a JSON given as the parameter e.g. `options={{ 'minimumFractionDigits': 2 }}`.",
      "type": "object",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
      "type": "boolean",
      "status": "optional"
    },
    "tooltip": {
      "doc": "Provide a string or a React Element to be shown as the tooltip content.",
      "type": "React.ReactNode",
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


### `NumberFormat.PhoneNumber`


```json
{
  "props": {
    "value": {
      "doc": "A number or a string containing a number.",
      "type": [
        "number",
        "string"
      ],
      "status": "optional"
    },
    "locale": {
      "doc": "Use a [2 Letter Language Code](https://www.sitepoint.com/iso-2-letter-language-codes/) or an extended code such as `nb-NO`. Use `auto` to detect the locale from the browser (`navigator.language`). Defaults to the Norwegian locale: `nb-NO`.",
      "type": "string",
      "status": "optional"
    },
    "decimals": {
      "doc": "Set a number to define the number of decimals. Like `decimals=\"0\"` will ensure that decimals are simply not shown. The default decimals for currency usage are `2` (Browser API default).",
      "type": "number",
      "status": "optional"
    },
    "rounding": {
      "doc": "If `omit` is given, the decimal will NOT be rounded. If set to `half-even`, the value will be rounded to the nearest even number. If set to `half-up`, the fractional part is 0.5 or greater, the number is rounded up. If the fractional part is less than 0.5, the number is rounded down. Defaults to `half-up`.",
      "type": [
        "\"omit\"",
        "\"half-even\"",
        "\"half-up\""
      ],
      "status": "optional"
    },
    "signDisplay": {
      "doc": "When to display the sign for the number. Use `auto` (default) for negative numbers only, `always` to always display sign, `exceptZero` for positive and negative numbers but not zero, `negative` for negative numbers only including negative zero, or `never` to never display sign.",
      "type": [
        "\"auto\"",
        "\"always\"",
        "\"exceptZero\"",
        "\"negative\"",
        "\"never\""
      ],
      "status": "optional"
    },
    "clean": {
      "doc": "If set to `true` a dirty string will be parsed to extract the number (`prefix -123.45 suffix` would result in e.g. `kr -123,45`).",
      "type": "boolean",
      "status": "optional"
    },
    "prefix": {
      "doc": "Add a string or React component before the number, including white space.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "suffix": {
      "doc": "Appends a string or React component after the number, including white space. When the suffix is a string starting with `/`, no space is added (e.g. `suffix=\"/mnd\"` renders \"123/mnd\").",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "selectAll": {
      "doc": "Use `false` to disable the auto select all on the first click. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "alwaysSelectAll": {
      "doc": "Use `true` to always auto select all on the first click. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "copySelection": {
      "doc": "Use `false` to disable the auto copy feature. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "cleanCopyValue": {
      "doc": "If set to `true` the copy&paste value will be provided without e.g. a currency sign or a percent sign. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "srLabel": {
      "doc": "Will add a visually hidden label, to give screen reader users the missing context to easier understand what the number represents.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "monospace": {
      "doc": "Sets the font to [DNB Mono Regular](/quickguide-designer/fonts/#dnbmono-regular).",
      "type": "boolean",
      "status": "optional"
    },
    "element": {
      "doc": "Define what HTML element should be used. Defaults to `<span>`.",
      "type": "string",
      "status": "optional"
    },
    "options": {
      "doc": "Accepts all [number.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString) or [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) options as an object - can also be a JSON given as the parameter e.g. `options={{ 'minimumFractionDigits': 2 }}`.",
      "type": "object",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
      "type": "boolean",
      "status": "optional"
    },
    "tooltip": {
      "doc": "Provide a string or a React Element to be shown as the tooltip content.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "link": {
      "doc": "Use `tel` (default) or `sms` to enable a clickable / touchable anchor link. Only available on `NumberFormat.PhoneNumber`.",
      "type": "string",
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


### `NumberFormat.BankAccountNumber`

Norwegian bank account number (e.g. `2000 12 34567`).


```json
{
  "props": {
    "value": {
      "doc": "A number or a string containing a number.",
      "type": [
        "number",
        "string"
      ],
      "status": "optional"
    },
    "locale": {
      "doc": "Use a [2 Letter Language Code](https://www.sitepoint.com/iso-2-letter-language-codes/) or an extended code such as `nb-NO`. Use `auto` to detect the locale from the browser (`navigator.language`). Defaults to the Norwegian locale: `nb-NO`.",
      "type": "string",
      "status": "optional"
    },
    "decimals": {
      "doc": "Set a number to define the number of decimals. Like `decimals=\"0\"` will ensure that decimals are simply not shown. The default decimals for currency usage are `2` (Browser API default).",
      "type": "number",
      "status": "optional"
    },
    "rounding": {
      "doc": "If `omit` is given, the decimal will NOT be rounded. If set to `half-even`, the value will be rounded to the nearest even number. If set to `half-up`, the fractional part is 0.5 or greater, the number is rounded up. If the fractional part is less than 0.5, the number is rounded down. Defaults to `half-up`.",
      "type": [
        "\"omit\"",
        "\"half-even\"",
        "\"half-up\""
      ],
      "status": "optional"
    },
    "signDisplay": {
      "doc": "When to display the sign for the number. Use `auto` (default) for negative numbers only, `always` to always display sign, `exceptZero` for positive and negative numbers but not zero, `negative` for negative numbers only including negative zero, or `never` to never display sign.",
      "type": [
        "\"auto\"",
        "\"always\"",
        "\"exceptZero\"",
        "\"negative\"",
        "\"never\""
      ],
      "status": "optional"
    },
    "clean": {
      "doc": "If set to `true` a dirty string will be parsed to extract the number (`prefix -123.45 suffix` would result in e.g. `kr -123,45`).",
      "type": "boolean",
      "status": "optional"
    },
    "prefix": {
      "doc": "Add a string or React component before the number, including white space.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "suffix": {
      "doc": "Appends a string or React component after the number, including white space. When the suffix is a string starting with `/`, no space is added (e.g. `suffix=\"/mnd\"` renders \"123/mnd\").",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "selectAll": {
      "doc": "Use `false` to disable the auto select all on the first click. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "alwaysSelectAll": {
      "doc": "Use `true` to always auto select all on the first click. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "copySelection": {
      "doc": "Use `false` to disable the auto copy feature. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "cleanCopyValue": {
      "doc": "If set to `true` the copy&paste value will be provided without e.g. a currency sign or a percent sign. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "srLabel": {
      "doc": "Will add a visually hidden label, to give screen reader users the missing context to easier understand what the number represents.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "monospace": {
      "doc": "Sets the font to [DNB Mono Regular](/quickguide-designer/fonts/#dnbmono-regular).",
      "type": "boolean",
      "status": "optional"
    },
    "element": {
      "doc": "Define what HTML element should be used. Defaults to `<span>`.",
      "type": "string",
      "status": "optional"
    },
    "options": {
      "doc": "Accepts all [number.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString) or [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) options as an object - can also be a JSON given as the parameter e.g. `options={{ 'minimumFractionDigits': 2 }}`.",
      "type": "object",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
      "type": "boolean",
      "status": "optional"
    },
    "tooltip": {
      "doc": "Provide a string or a React Element to be shown as the tooltip content.",
      "type": "React.ReactNode",
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


### `NumberFormat.NationalIdentityNumber`

Norwegian national identification number (e.g. `180892 12345`).


```json
{
  "props": {
    "value": {
      "doc": "A number or a string containing a number.",
      "type": [
        "number",
        "string"
      ],
      "status": "optional"
    },
    "locale": {
      "doc": "Use a [2 Letter Language Code](https://www.sitepoint.com/iso-2-letter-language-codes/) or an extended code such as `nb-NO`. Use `auto` to detect the locale from the browser (`navigator.language`). Defaults to the Norwegian locale: `nb-NO`.",
      "type": "string",
      "status": "optional"
    },
    "decimals": {
      "doc": "Set a number to define the number of decimals. Like `decimals=\"0\"` will ensure that decimals are simply not shown. The default decimals for currency usage are `2` (Browser API default).",
      "type": "number",
      "status": "optional"
    },
    "rounding": {
      "doc": "If `omit` is given, the decimal will NOT be rounded. If set to `half-even`, the value will be rounded to the nearest even number. If set to `half-up`, the fractional part is 0.5 or greater, the number is rounded up. If the fractional part is less than 0.5, the number is rounded down. Defaults to `half-up`.",
      "type": [
        "\"omit\"",
        "\"half-even\"",
        "\"half-up\""
      ],
      "status": "optional"
    },
    "signDisplay": {
      "doc": "When to display the sign for the number. Use `auto` (default) for negative numbers only, `always` to always display sign, `exceptZero` for positive and negative numbers but not zero, `negative` for negative numbers only including negative zero, or `never` to never display sign.",
      "type": [
        "\"auto\"",
        "\"always\"",
        "\"exceptZero\"",
        "\"negative\"",
        "\"never\""
      ],
      "status": "optional"
    },
    "clean": {
      "doc": "If set to `true` a dirty string will be parsed to extract the number (`prefix -123.45 suffix` would result in e.g. `kr -123,45`).",
      "type": "boolean",
      "status": "optional"
    },
    "prefix": {
      "doc": "Add a string or React component before the number, including white space.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "suffix": {
      "doc": "Appends a string or React component after the number, including white space. When the suffix is a string starting with `/`, no space is added (e.g. `suffix=\"/mnd\"` renders \"123/mnd\").",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "selectAll": {
      "doc": "Use `false` to disable the auto select all on the first click. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "alwaysSelectAll": {
      "doc": "Use `true` to always auto select all on the first click. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "copySelection": {
      "doc": "Use `false` to disable the auto copy feature. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "cleanCopyValue": {
      "doc": "If set to `true` the copy&paste value will be provided without e.g. a currency sign or a percent sign. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "srLabel": {
      "doc": "Will add a visually hidden label, to give screen reader users the missing context to easier understand what the number represents.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "monospace": {
      "doc": "Sets the font to [DNB Mono Regular](/quickguide-designer/fonts/#dnbmono-regular).",
      "type": "boolean",
      "status": "optional"
    },
    "element": {
      "doc": "Define what HTML element should be used. Defaults to `<span>`.",
      "type": "string",
      "status": "optional"
    },
    "options": {
      "doc": "Accepts all [number.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString) or [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) options as an object - can also be a JSON given as the parameter e.g. `options={{ 'minimumFractionDigits': 2 }}`.",
      "type": "object",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
      "type": "boolean",
      "status": "optional"
    },
    "tooltip": {
      "doc": "Provide a string or a React Element to be shown as the tooltip content.",
      "type": "React.ReactNode",
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


### `NumberFormat.OrganizationNumber`

Norwegian organization number (e.g. `123 456 789`). Screen readers read digit by digit.


```json
{
  "props": {
    "value": {
      "doc": "A number or a string containing a number.",
      "type": [
        "number",
        "string"
      ],
      "status": "optional"
    },
    "locale": {
      "doc": "Use a [2 Letter Language Code](https://www.sitepoint.com/iso-2-letter-language-codes/) or an extended code such as `nb-NO`. Use `auto` to detect the locale from the browser (`navigator.language`). Defaults to the Norwegian locale: `nb-NO`.",
      "type": "string",
      "status": "optional"
    },
    "decimals": {
      "doc": "Set a number to define the number of decimals. Like `decimals=\"0\"` will ensure that decimals are simply not shown. The default decimals for currency usage are `2` (Browser API default).",
      "type": "number",
      "status": "optional"
    },
    "rounding": {
      "doc": "If `omit` is given, the decimal will NOT be rounded. If set to `half-even`, the value will be rounded to the nearest even number. If set to `half-up`, the fractional part is 0.5 or greater, the number is rounded up. If the fractional part is less than 0.5, the number is rounded down. Defaults to `half-up`.",
      "type": [
        "\"omit\"",
        "\"half-even\"",
        "\"half-up\""
      ],
      "status": "optional"
    },
    "signDisplay": {
      "doc": "When to display the sign for the number. Use `auto` (default) for negative numbers only, `always` to always display sign, `exceptZero` for positive and negative numbers but not zero, `negative` for negative numbers only including negative zero, or `never` to never display sign.",
      "type": [
        "\"auto\"",
        "\"always\"",
        "\"exceptZero\"",
        "\"negative\"",
        "\"never\""
      ],
      "status": "optional"
    },
    "clean": {
      "doc": "If set to `true` a dirty string will be parsed to extract the number (`prefix -123.45 suffix` would result in e.g. `kr -123,45`).",
      "type": "boolean",
      "status": "optional"
    },
    "prefix": {
      "doc": "Add a string or React component before the number, including white space.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "suffix": {
      "doc": "Appends a string or React component after the number, including white space. When the suffix is a string starting with `/`, no space is added (e.g. `suffix=\"/mnd\"` renders \"123/mnd\").",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "selectAll": {
      "doc": "Use `false` to disable the auto select all on the first click. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "alwaysSelectAll": {
      "doc": "Use `true` to always auto select all on the first click. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "copySelection": {
      "doc": "Use `false` to disable the auto copy feature. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "cleanCopyValue": {
      "doc": "If set to `true` the copy&paste value will be provided without e.g. a currency sign or a percent sign. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "srLabel": {
      "doc": "Will add a visually hidden label, to give screen reader users the missing context to easier understand what the number represents.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "monospace": {
      "doc": "Sets the font to [DNB Mono Regular](/quickguide-designer/fonts/#dnbmono-regular).",
      "type": "boolean",
      "status": "optional"
    },
    "element": {
      "doc": "Define what HTML element should be used. Defaults to `<span>`.",
      "type": "string",
      "status": "optional"
    },
    "options": {
      "doc": "Accepts all [number.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString) or [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) options as an object - can also be a JSON given as the parameter e.g. `options={{ 'minimumFractionDigits': 2 }}`.",
      "type": "object",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
      "type": "boolean",
      "status": "optional"
    },
    "tooltip": {
      "doc": "Provide a string or a React Element to be shown as the tooltip content.",
      "type": "React.ReactNode",
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
    "NumberFormat.clipboardCopy": {
      "nb-NO": "Kopiert",
      "en-GB": "Copied",
      "sv-SE": "Kopierad",
      "da-DK": "Kopieret"
    },
    "NumberFormat.notAvailable": {
      "nb-NO": "Ikke tilgjengelig",
      "en-GB": "Not available",
      "sv-SE": "Inte tillgänglig",
      "da-DK": "Ikke tilgængelig"
    }
  }
}
```
