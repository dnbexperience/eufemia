---
showTabs: true
redirect_from:
  - /uilib/components/number/info
---

import { NumberFormat } from '@dnb/eufemia/src'

## Description

A ready to use DNB number formatter. Use it where over you have to display a number, a currency value, phone number etc.

Good reasons for why we have this is to:

- uniform the formation of numbers for all DNB applications.
- and make numbers accessible to screen readers.

### Supported formats

- Numbers in general e.g. <pre className="dnb-code"><NumberFormat value="12345678.90" /></pre>
- Currency e.g. <pre className="dnb-code"><NumberFormat currency value="12345678.90" /></pre>
- Phone numbers e.g. <pre className="dnb-code"><NumberFormat phone value="004799999999" /></pre>
- Bank account number e.g. <pre className="dnb-code"><NumberFormat ban value="20001234567" /></pre>
- National identification number e.g. <pre className="dnb-code"><NumberFormat nin value="18089212345" /></pre>
- Organization number e.g. <pre className="dnb-code"><NumberFormat org value="123456789" /></pre>

### Defaults

It uses the browser APIs `number.toLocaleString` or `Intl.NumberFormat.format` under the hood. As well as some custom formatter. The locale defaults to:

- Locale: `nb-NO`
- Currency: `NOK`

### Element and style

The number component is style independent, so it has no visual styles. By default a `<span>` is used (with [speak-as: numbers](https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style/speak-as), even the support is very low). But you can easily change the element type by providing something else to `element="div"` property.

### Sources

Eufemia is basing their number formats on both the [Norwegian authority](https://lovdata.no/forskrift/2004-02-16-426/§16) and [Språkradet](https://www.sprakradet.no/sprakhjelp/Skriveregler/Dato). Wikipedia has more info on world wide [decimal separator](https://en.wikipedia.org/wiki/Decimal_separator) usage.

## Details

> Screen readers requires numbers to be formatted properly in order to be read as numbers. The **NumberFormat** component will help to achieve this requirement.

So, numbers are formatted differently for screen readers than the visual number. And numbers also gets assigned a `lang` attribute, so the screen reader knows what language (locale) should be used on the particular number, even if the text around not corresponds to the same language.

## Accessibility

To enhance the **Copy & Paste** experience of copying numbers into other applications, the NumberFormat component automatically changes the number formatting to be without thousand separator and to have a dot, instead of a coma for the decimal separator.

**NVDA** has also [issues](https://github.com/nvaccess/nvda/issues/8874) on reconciling the `lang` attribute, this makes it hard to have a solid and good working solution for reading numbers. VoiceOver on desktop makes a perfect job there.

**VoiceOver** on mobile devices (iOS) only supports numbers read out properly to a maximum of `99,999.00`. On amounts above this value, VO reads numbers digit by digit.

## Formatting only

You can use the formatting without using the Component. Have a look at the [available properties](/uilib/components/number-format/properties).

```js
import { format } from '@dnb/eufemia/components/number-format/NumberUtils'

const value = 12345678.9

// basic formatting
const number = format(value)

// by using returnAria you get an object
const { number, aria } = format(value, {
  locale: 'nb-NO', // also inherited from the Provider
  currency: true,
  returnAria: true,
})
```

## Using number helpers, like cleanNumber

You can use the clean helpers without using the Component. Have a look at the [available properties](/uilib/components/number-format/properties). Also, you may check out the related tests **NumberFormat > cleanNumber** in the source code to find more examples.

```js
import { cleanNumber } from '@dnb/eufemia/components/number-format/NumberUtils'

const string = cleanNumber('prefix -12 345,678 suffix') // returns -12345.678
const string = cleanNumber('prefix -12.345,678 suffix') // returns -12345.678
```

## Node.js and SSR usage

If you run the component or `format` function in [Node.js](https://nodejs.org) you have to include [ICU](https://nodejs.org/api/intl.html) data in order to display other locales than en-GB. You can do this by:

- installing `npm i full-icu`
- and call node (or jest) with an environment variable pointing to the package: `NODE_ICU_DATA=./node_modules/full-icu node ...`
- after a Node.js version upgrade you may have to run `npm rebuild`

## Provider

You can send down the `locale` as an application wide property (Context). More info about the [provider and locale usage](/uilib/components/number-format/provider).

```jsx
import Provider from '@dnb/eufemia/shared/Provider'

render(
  <Provider locale="en-GB" currency_display="code">
    <MyApp>
      text <NumberFormat>123</NumberFormat> table etc.
    </MyApp>
  </Provider>
)
```

## Known issues

Edge Browser on Windows 10 is converting numbers automatically to followable links. This makes the experience on NVDA bad, as it reads also the new, unformatted link number.

You can [disable this behavior](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/x-ms-format-detection):

```html
<html x-ms-format-detection="none">
  ...
</html>
```
