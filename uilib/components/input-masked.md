---
title: 'InputMasked'
description: 'The InputMasked component uses the basic input component, but with some additional masking functionality.'
version: 11.0.3
generatedAt: 2026-04-28T21:06:11.728Z
checksum: ec854c3f7edab3767cebaea07e1723cb55406d476c88740bcf81d27b7291d502
---

# InputMasked

## Import

```tsx
import { InputMasked } from '@dnb/eufemia'
```

## Description

The InputMasked component uses the basic [Input](/uilib/components/input) component, but with input masking powered by [Maskito](https://maskito.dev/).

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/input-masked)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/input-masked)

### How it works

This component uses the basic [Input](/uilib/components/input) component with a set of additional options and features.

You can either create your own mask using an array of RegExp and string tokens, a single RegExp, or use one of the provided number/currency masks. There are also masks that change based on different [locales](/uilib/components/input-masked/info?fullscreen#mask-based-on-locale) (`asCurrency` or `asNumber`).

Array masks define the expected input character-by-character. Each RegExp in the array represents a user-editable slot, while strings act as fixed separator tokens. For example, `[/[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/]` creates a mask for a six-digit code with spaces after every two digits.

You can also use `allowOverflow` to let users type beyond the defined mask length, and `overwriteMode` to control how characters are overwritten (`shift` moves to the next slot, `replace` stays on the current slot).

### Accessibility

Screen readers will also read the mask before the user enters the content. Additionally, the user will hear the mask during typing. This behavior can have both positive and negative side effects for the user, but overall, it works well.

Both entering a comma or a dot will act as a decimal separator if [decimals are enabled](/uilib/components/input-masked/#decimals) and one of the internal masks for numbers is used.

#### InputMode

**NB:** Please do not set `inputMode="numeric"` or `inputMode="decimal"` because devices may or may not show a minus key (`-`)!

The InputMasked component handles soft keyboards (iOS and Android) by using either `inputMode="numeric"` or `inputMode="decimal"`, depending on `allowNegative` and `allowDecimal` (getSoftKeyboardAttributes).

For iOS it additionally sets `type="number"` during focus (InputModeNumber). This way the correct numeric soft keyboard is shown.

```tsx
render(
  <Wrapper>
    <ComponentBox hidePreview hideToolbar>
      <InputMasked
        maskOptions={{
          allowNegative: false,
        }}
      />
    </ComponentBox>
  </Wrapper>
)
```

### Mask based on locale

The InputMasked component supports masks based on a given locale. The locale will be inherited from the [Eufemia Provider](/uilib/usage/customisation/provider) if not specified.

You can enable these masks by setting:

- `asCurrency="EUR"`
- `asNumber={true}`

You can still provide custom mask parameters to `currencyMask={{ ... }}` or `numberMask={{ ... }}`. Alternatively, you can use `maskOptions={{ ... }}` and provide your extra options there.

More details in the [examples above](/uilib/components/input-masked/demos).

#### Clean number values

If you use `asCurrency` or `asNumber`, you must always provide a clean number without any mask (`value="1234.50"`):

```tsx
render(
  <Wrapper>
    <ComponentBox hidePreview>
      <InputMasked asCurrency="EUR" value="1234.50" />
    </ComponentBox>
  </Wrapper>
)
```

You can also receive a clean number value you can use and send back in again:

```tsx
render(
  <Wrapper>
    <ComponentBox hidePreview>
      <InputMasked
        asCurrency="EUR"
        value="1234.50"
        onChange={({ numberValue }) => {
          console.log(numberValue) // type of float
        }}
      />
    </ComponentBox>
  </Wrapper>
)
```

#### Decimals

- `numberMask` will default to no decimals
- `currencyMask` will default to no decimals
- `asNumber` will default to no decimals
- `asCurrency` will default to 2 decimals

You can change the number of decimals by sending in options to the `currencyMask`, `numberMask`, or `maskOptions` (see example above).

This example here also shows how to affect every InputMasked component in your application, by setting these options on the [Eufemia Provider](/uilib/usage/customisation/provider).

```tsx
render(
  <Wrapper>
    <ComponentBox hidePreview>
      <Provider
        locale="en-GB"
        InputMasked={{
          currencyMask: {
            decimalLimit: 1, // defaults to 2
          },
        }}
      >
        <InputMasked asCurrency="USD" value="1234.567" />
      </Provider>
    </ComponentBox>
  </Wrapper>
)
```

```tsx
render(
  <Wrapper>
    <ComponentBox hidePreview>
      <Provider
        locale="en-GB"
        InputMasked={{
          numberMask: {
            decimalLimit: 2, // defaults to no decimals
          },
        }}
      >
        <InputMasked asNumber value="1234.567" />
      </Provider>
    </ComponentBox>
  </Wrapper>
)
```

To remove a decimal limit, you can provide `null` and allow decimals with `allowDecimal`:

```tsx
render(
  <Wrapper>
    <ComponentBox hidePreview>
      <InputMasked
        asNumber
        maskOptions={{
          allowDecimal: true,
          decimalLimit: null,
        }}
        value="1234.567"
      />
    </ComponentBox>
  </Wrapper>
)
```

## Demos

<ChangeLocale label="Locale used in the demos:" bottom />

### Locale based numbers

When you use `asNumber` or `asPercent` (and `asCurrency` see below) it will create a mask for you and inherit the locale from the [Eufemia Provider](/uilib/usage/customisation/provider), if the locale property is not given.

You can still define extra mask parameters with `numberMask` or `maskOptions`, as the second input example shows (e.g. `decimalLimit`).

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="input-masked-number">
      <Flex.Vertical>
        <InputMasked
          label="Number"
          asNumber
          maskOptions={{
            allowNegative: false,
          }}
          value="1234.50"
          onChange={({ numberValue }) => {
            console.log(numberValue)
          }}
        />
        <InputMasked
          label="Number (decimal limit)"
          asNumber
          numberMask={{
            decimalLimit: 2,
          }}
          value="1234.016"
          onChange={({ numberValue }) => {
            console.log(numberValue)
          }}
        />
        <InputMasked
          label="Percentage"
          asPercent
          numberMask={{
            decimalLimit: 1,
          }}
          value="1234.016"
          onChange={({ numberValue }) => {
            console.log(numberValue)
          }}
        />
      </Flex.Vertical>
    </ComponentBox>
  </Wrapper>
)
```

### Locale based `asCurrency`

When you use `asCurrency` it will create a mask for you and inherit the locale from the [Eufemia Provider](/uilib/usage/customisation/provider), if the locale property is not given.

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="input-masked-currency">
      <Flex.Vertical>
        <InputMasked
          label="Currency"
          asCurrency="EUR"
          value="1234.50"
          onChange={({ numberValue }) => {
            console.log(numberValue)
          }}
        />
        <Provider
          locale="en-GB"
          InputMasked={{
            currencyMask: {
              decimalLimit: 3,
            },
          }}
        >
          <InputMasked
            label="Currency"
            asCurrency="USD"
            value="1234.567"
            onChange={({ numberValue }) => {
              console.log(numberValue)
            }}
          />
        </Provider>
      </Flex.Vertical>
    </ComponentBox>
  </Wrapper>
)
```

### Define the `currencyMask` manually

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="input-masked-currency_mask">
      <Flex.Vertical>
        <InputMasked
          label="Left aligned (default)"
          showMask
          currencyMask="kr"
          onChange={({ numberValue }) => {
            console.log(numberValue)
          }}
        />
        <InputMasked
          label="Right aligned"
          showMask
          currencyMask={{
            currency: 'NOK',
          }}
          align="right"
          onChange={({ numberValue }) => {
            console.log(numberValue)
          }}
        />
      </Flex.Vertical>
    </ComponentBox>
  </Wrapper>
)
```

### Customize the number mask

```tsx
render(
  <Wrapper>
    <ComponentBox>
      <InputMasked
        label="Masked amount"
        showMask
        numberMask={{
          suffix: ' kr',
          allowDecimal: true,
        }}
        onChange={({ numberValue }) => {
          console.log(numberValue)
        }}
      />
    </ComponentBox>
  </Wrapper>
)
```

### Using the `numberMask` with a combined suffix

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="input-masked-number_mask">
      <InputMasked
        label="Masked input"
        value="1000000"
        numberMask={{
          suffix: ',-',
          allowDecimal: false,
        }}
        suffix="kr"
        onChange={({ numberValue }) => {
          console.log(numberValue)
        }}
      />
    </ComponentBox>
  </Wrapper>
)
```

### Using the `numberMask` and a prefix

```tsx
render(
  <Wrapper>
    <ComponentBox>
      <InputMasked
        label="Masked input"
        numberMask={{
          prefix: 'NOK ',
        }}
        stretch={true}
        placeholder="Enter a number"
        onChange={({ numberValue }) => {
          console.log(numberValue)
        }}
      />
    </ComponentBox>
  </Wrapper>
)
```

## Properties

```json
{
  "props": {
    "asNumber": {
      "doc": "Set to `true` to automatically set a number mask based on the given or inherited locale.",
      "type": "boolean",
      "status": "optional"
    },
    "asPercent": {
      "doc": "Set to `true` to automatically set a number mask with a percentage sign based on the given or inherited locale.",
      "type": "boolean",
      "status": "optional"
    },
    "asCurrency": {
      "doc": "Set to `true` to use `NOK` or give it a currency code e.g. `USD` to automatically set a currency mask based on the given or inherited locale.",
      "type": ["boolean", "string"],
      "status": "optional"
    },
    "maskOptions": {
      "doc": "Use it to manipulate internal masks. You can use it instead of e.g. `numberMask` or `currencyMask`. All options are listed below.",
      "type": "object",
      "status": "optional"
    },
    "numberMask": {
      "doc": "Set to `true` to enable the default numbers formatting – or give an `object` containing the number mask properties. More details below. Can be a JSON string as well, containing the number mask properties. Is disabled by default.",
      "type": ["boolean", "object"],
      "status": "optional"
    },
    "currencyMask": {
      "doc": "Set to `true` or set the _valuta_ (currencyMask=\"kr\") to enable a custom currency mask – or give an `object` containing the number mask properties. More details below. Can be a JSON string as well, containing the number mask properties. Is disabled by default. Defaults to `kr`.",
      "type": ["boolean", "object"],
      "status": "optional"
    },
    "numberFormat": {
      "doc": "Use an object with [NumberFormat](/uilib/components/number-format/properties).",
      "type": "object",
      "status": "optional"
    },
    "locale": {
      "doc": "Define the locale to be used in the `asNumber` or `asCurrency` masked. It will be inherited from the [Eufemia Provider](/uilib/usage/customisation/provider) if not given. Defaults to `nb-NO`.",
      "type": "string",
      "status": "optional"
    },
    "mask": {
      "doc": "A mask defined as an array of RegExp and string tokens (e.g. `[/\\d/, /\\d/, \" \", /\\d/, /\\d/]`) or a single RegExp. Defaults to `number mask`.",
      "type": ["RegExp", "Array<RegExp | string>"],
      "status": "optional"
    },
    "allowOverflow": {
      "doc": "Allow users to keep typing after the defined mask has been filled. Extra characters will be appended without masking.",
      "type": "boolean",
      "status": "optional"
    },
    "overwriteMode": {
      "doc": "Control how overwriting characters is handled; `shift` (default) moves to the next slot while `replace` stays on the current slot.",
      "type": ["string", "function"],
      "status": "optional"
    },
    "showMask": {
      "doc": "Show mask when input is empty and has no focus. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    },
    "[Input](/uilib/components/input/properties)": {
      "doc": "All `Input` properties are supported.",
      "type": "Various",
      "status": "optional"
    }
  }
}
```

## Number mask properties

The number mask is used for all kinds of number based masks, like:

**Locale based masks:**

- `asNumber`
- `asCurrency`
- `asPercent`

**Static masks:**

- `numberMask`
- `currencyMask`

You can `maskOptions` to manipulate the options.

Defaults to Norwegian number format.

```json
{
  "props": {
    "prefix": {
      "doc": "What to display before the amount. Defaults to an empty string.",
      "type": "string",
      "status": "optional"
    },
    "suffix": {
      "doc": "What to display after the amount. Defaults to an empty string.",
      "type": "string",
      "status": "optional"
    },
    "thousandsSeparatorSymbol": {
      "doc": "Character with which to separate thousands. Defaults to `' '`.",
      "type": "string",
      "status": "optional"
    },
    "allowDecimal": {
      "doc": "Whether or not to allow the user to enter a fraction with the amount. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "decimalSymbol": {
      "doc": "Character that will act as a decimal point. Defaults to `','`.",
      "type": "string",
      "status": "optional"
    },
    "decimalLimit": {
      "doc": "How many digits to allow after the decimal. Defaults to `2`.",
      "type": "number",
      "status": "optional"
    },
    "integerLimit": {
      "doc": "Limit the length of the integer number. Defaults to `null` for unlimited.",
      "type": "number",
      "status": "optional"
    },
    "allowNegative": {
      "doc": "Whether or not to allow negative numbers. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "disallowLeadingZeroes": {
      "doc": "Whether or not to allow leading zeroes during typing. *A leading zero is any 0 digit that comes before the first nonzero digit in a number string in positional notation* - [wikipedia](https://en.wikipedia.org/wiki/Leading_zero). Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    }
  }
}
```

### Custom number mask usage

The number mask is included and can be set with the `numberMask` property.

```jsx

// 1. Use the desired configurations
const numberMask = {
  prefix: '',
  suffix: ',- kr'
}

// 2. Then pass 'numberMask' to the InputMasked component as the numberMask
<InputMasked numberMask={numberMask} ... />
```

## Events

```json
{
  "props": {
    "onChange": {
      "doc": "Will be called on value changes made by the user. Returns an object with the value as a string and the native event: `{ value, numberValue, cleanedValue, event }`.",
      "type": "function",
      "status": "optional"
    },
    "[Input](/uilib/components/input/events)": {
      "doc": "All `Input` events are supported.",
      "type": "Various",
      "status": "optional"
    }
  }
}
```

**NB:** `numberValue` is returned as a float value and is only returned when using `numberMask`, `currencyMask`, `asNumber`, or `asCurrency`.
