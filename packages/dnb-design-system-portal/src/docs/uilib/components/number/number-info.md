---
draft: true
---

import Examples from 'Pages/uilib/components/number/Examples'

## Description

A ready to use DNB number formatter. Use it where over you have to display a number showing up the the DOM.

Good reasons for why we have this is to:

- uniform the formation of numbers for all DNB applications.
- and make numbers accessible to screen readers.

### Supported formats

- Numbers in general e.g. `12 345 678,90`
- Currency e.g. `kr 12 345 678,90`
- Phone numbers e.g. `0047 99 99 99 99`
- Bank account number e.g. `2000 12 34567`
- National identification number e.g. `180892 12345`

### Defaults

It uses the browser APIs `number.toLocaleString` or `Intl.NumberFormat.format` under the hood. As well as some custom formatter. The locale defaults to:

- Locale: `no`
- Currency: `NOK`

### Sources

Eufemia is basing their number formats on both the [Norwegian authority](https://lovdata.no/forskrift/2004-02-16-426/§16) and [Sprakradet](https://www.sprakradet.no/sprakhjelp/Skriveregler/Dato).

## Usage and known issues

Edge Browser on Windows 10 is converting numbers automatically to followable links. This makes the experience on NVDA bad, as it reads also the new, unformatted link number.

You can [disable this behavior](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/x-ms-format-detection):

```html
<html x-ms-format-detection="none">
  ...
</html>
```

NVDA has also [issues](https://github.com/nvaccess/nvda/issues/8874) on reconciling the `lang` attribute, this makes it hard to have a solid and good working solution for reading numbers. VoiceOver makes a perfect job there.

NVDA has also a hard time to read numbers with minus (-) suffix.

## Details

> Screen readers requires numbers to be formatted properly in order to be read as numbers. The **Number** component will help to achieve this requirement.

So, numbers are formatted differently for screen readers than the visual number. And numbers also gets assigned a `lang` attribute, so the screen reader knows what language (locale) should be used on the particular number.

## Provider

You can send down the `locale` as an application wide property (Context).

```jsx
import Provider from 'dnb-ui-lib/shared/Provider'

render(
  <Provider locale="en">
    <YourApp>
      text <Number>123</Number> table etc.
    </YourApp>
  </Provider>
)
```

## Demos

<Examples />
