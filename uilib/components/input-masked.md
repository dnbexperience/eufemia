---
title: 'InputMasked'
description: 'The InputMasked component uses the basic input component, but with some additional masking functionality.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:26.797Z
checksum: 7fada4479855a6b17e08bf7350acdd56abbf0d0e2d2cd33e8574692a98166a94
---

# InputMasked

## Import

```tsx
import { InputMasked } from '@dnb/eufemia'
```

## Description

The InputMasked component uses the basic [Input](/uilib/components/input) component, but with some additional masking functionality.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/input-masked)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/input-masked)

### How it works

This component uses the basic [Input](/uilib/components/input) component with a set of additional options and features.

You can either create your own mask or use one of the provided ones. There are also masks that change based on different [locales](/uilib/components/input-masked/info?fullscreen#mask-based-on-locale) (`as_currency` or `as_number`).

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
        mask_options={{
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

- `as_currency="EUR"`
- `as_number={true}`

You can still provide custom mask parameters to `currency_mask={{ ... }}` or `number_mask={{ ... }}`. Alternatively, you can use `mask_options={{ ... }}` and provide your extra options there.

More details in the [examples above](/uilib/components/input-masked/demos).

#### Clean number values

If you use `as_currency` or `as_number`, you must always provide a clean number without any mask (`value="1234.50"`):

```tsx
render(
  <Wrapper>
    <ComponentBox hidePreview>
      <InputMasked as_currency="EUR" value="1234.50" />
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
        as_currency="EUR"
        value="1234.50"
        on_change={({ numberValue }) => {
          console.log(numberValue) // type of float
        }}
      />
    </ComponentBox>
  </Wrapper>
)
```

#### Decimals

- `number_mask` will default to no decimals
- `currency_mask` will default to no decimals
- `as_number` will default to no decimals
- `as_currency` will default to 2 decimals

You can change the number of decimals by sending in options to the `currency_mask`, `number_mask`, or `mask_options` (see example above).

This example here also shows how to affect every InputMasked component in your application, by setting these options on the [Eufemia Provider](/uilib/usage/customisation/provider).

```tsx
render(
  <Wrapper>
    <ComponentBox hidePreview>
      <Provider
        locale="en-GB"
        InputMasked={{
          currency_mask: {
            decimalLimit: 1, // defaults to 2
          },
        }}
      >
        <InputMasked as_currency="USD" value="1234.567" />
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
          number_mask: {
            decimalLimit: 2, // defaults to no decimals
          },
        }}
      >
        <InputMasked as_number value="1234.567" />
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
        as_number
        mask_options={{
          allowDecimal: true,
          decimalLimit: null,
        }}
        value="1234.567"
      />
    </ComponentBox>
  </Wrapper>
)
```

### Mask with multiple inputs

Provides the same input functionality as the [DatePicker](/uilib/components/date-picker), but with your own defined inputs.
`onChange` takes an object with keys based on the step IDs, e.g., `{month: string, year: string, suffix: string}`.

Import as demonstrated below:

```tsx
import { MultiInputMask } from '@dnb/eufemia/components/input-masked'
render(<MultiInputMask />)
```

```tsx
render(
  <Wrapper>
    <ComponentBox
      scope={{
        MultiInputMask,
      }}
    >
      <MultiInputMask
        label="Date"
        delimiter="/"
        onChange={({ month, year, suffix }) =>
          console.log({
            month,
            year,
            suffix,
          })
        }
        inputs={[
          {
            id: 'month',
            label: 'the month',
            placeholderCharacter: 'd',
            mask: [/[0-9]/, /[0-9]/],
          },
          {
            id: 'year',
            label: 'the year',
            placeholderCharacter: 'm',
            mask: [/[0-9]/, /[0-9]/],
          },
          {
            id: 'suffix',
            label: 'suffix text',
            placeholderCharacter: '-',
            mask: [/[a-zA-Z]/, /[a-zA-Z]/, /[a-zA-Z]/],
          },
        ]}
      />
    </ComponentBox>
  </Wrapper>
)
```

## Demos

<ChangeLocale
  label="Locale used in the demos:"
  label_direction="vertical"
  bottom
/>

### Locale based numbers

When you use `as_number` or `as_percent` (and `as_currency` see below) it will create a mask for you and inherit the locale from the [Eufemia Provider](/uilib/usage/customisation/provider), if the locale property is not given.

You can still define extra mask parameters with `number_mask` or `mask_options`, as the second input example shows (e.g. `decimalLimit`).

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="input-masked-number">
      <Provider
        formElement={{
          label_direction: 'vertical',
        }}
      >
        <Flex.Vertical>
          <InputMasked
            label="Number"
            as_number
            mask_options={{
              allowNegative: false,
            }}
            value="1234.50"
            on_change={({ numberValue }) => {
              console.log(numberValue)
            }}
          />
          <InputMasked
            label="Number (decimal limit)"
            as_number
            number_mask={{
              decimalLimit: 2,
            }}
            value="1234.016"
            on_change={({ numberValue }) => {
              console.log(numberValue)
            }}
          />
          <InputMasked
            label="Percentage"
            as_percent
            number_mask={{
              decimalLimit: 1,
            }}
            value="1234.016"
            on_change={({ numberValue }) => {
              console.log(numberValue)
            }}
          />
        </Flex.Vertical>
      </Provider>
    </ComponentBox>
  </Wrapper>
)
```

### Locale based `as_currency`

When you use `as_currency` it will create a mask for you and inherit the locale from the [Eufemia Provider](/uilib/usage/customisation/provider), if the locale property is not given.

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="input-masked-currency">
      <Provider
        formElement={{
          label_direction: 'vertical',
        }}
      >
        <Flex.Vertical>
          <InputMasked
            label="Currency"
            as_currency="EUR"
            value="1234.50"
            on_change={({ numberValue }) => {
              console.log(numberValue)
            }}
          />
          <Provider
            locale="en-GB"
            InputMasked={{
              currency_mask: {
                decimalLimit: 3,
              },
            }}
          >
            <InputMasked
              label="Currency"
              as_currency="USD"
              value="1234.567"
              on_change={({ numberValue }) => {
                console.log(numberValue)
              }}
            />
          </Provider>
        </Flex.Vertical>
      </Provider>
    </ComponentBox>
  </Wrapper>
)
```

### Define the `currency_mask` manually

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="input-masked-currency_mask">
      <Provider
        formElement={{
          label_direction: 'vertical',
        }}
      >
        <Flex.Vertical>
          <InputMasked
            label="Left aligned (default)"
            show_mask
            currency_mask="kr"
            on_change={({ numberValue }) => {
              console.log(numberValue)
            }}
          />
          <InputMasked
            label="Right aligned"
            show_mask
            currency_mask={{
              currency: 'NOK',
            }}
            align="right"
            on_change={({ numberValue }) => {
              console.log(numberValue)
            }}
          />
        </Flex.Vertical>
      </Provider>
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
        show_mask
        number_mask={{
          suffix: ' kr',
          allowDecimal: true,
        }}
        placeholder_char={null}
        on_change={({ numberValue }) => {
          console.log(numberValue)
        }}
      />
    </ComponentBox>
  </Wrapper>
)
```

### Using the `number_mask` with a combined suffix

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="input-masked-number_mask">
      <InputMasked
        label="Masked input"
        value="1000000"
        number_mask={{
          suffix: ',-',
          allowDecimal: false,
        }}
        suffix="kr"
        on_change={({ numberValue }) => {
          console.log(numberValue)
        }}
      />
    </ComponentBox>
  </Wrapper>
)
```

### Using the `number_mask` and a prefix

```tsx
render(
  <Wrapper>
    <ComponentBox>
      <InputMasked
        label="Masked input"
        number_mask={{
          prefix: 'NOK ',
        }}
        stretch={true}
        placeholder="Enter a number"
        on_change={({ numberValue }) => {
          console.log(numberValue)
        }}
      />
    </ComponentBox>
  </Wrapper>
)
```

### Custom mask

This is an example of how you can utilize a custom mask.

For a phone number input, use the [Field.PhoneNumber](/uilib/extensions/forms/feature-fields/PhoneNumber/) field instead.

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="input-masked-custom-mask">
      <InputMasked
        label="Custom mask"
        mask={[
          '0',
          '0',
          /[4]/,
          // have to start with 4
          /[5-7]/,
          // can be 5,6 or 7
          ' ',
          /[49]/,
          // have to start with 4 or 9
          /\\d/,
          ' ',
          /\\d/,
          /\\d/,
          ' ',
          /\\d/,
          /\\d/,
          ' ',
          /\\d/,
          /\\d/,
        ]}
        show_mask
        placeholder_char="_"
        keep_char_positions
        on_change={({ numberValue }) => {
          console.log(numberValue)
        }}
      />
    </ComponentBox>
  </Wrapper>
)
```

### Mask with multiple inputs

Allows for the same input functionality as in the [DatePicker](/uilib/components/date-picker), but with your own defined inputs.
`onChange` takes an object with keys based on the step id's. e.g. `{month: string, year: string, suffix: string}`

`import` as demonstrated below

```tsx
import { MultiInputMask } from '@dnb/eufemia/components/input-masked'
render(<MultiInputMask />)
```

```tsx
render(
  <Wrapper>
    <ComponentBox
      scope={{
        MultiInputMask,
      }}
    >
      <MultiInputMask
        label="Date"
        delimiter="/"
        onChange={({ month, year, suffix }) =>
          console.log({
            month,
            year,
            suffix,
          })
        }
        inputs={[
          {
            id: 'month',
            label: 'the month',
            placeholderCharacter: 'd',
            mask: [/[0-9]/, /[0-9]/],
          },
          {
            id: 'year',
            label: 'the year',
            placeholderCharacter: 'm',
            mask: [/[0-9]/, /[0-9]/],
          },
          {
            id: 'suffix',
            label: 'suffix text',
            placeholderCharacter: '-',
            mask: [/[a-zA-Z]/, /[a-zA-Z]/, /[a-zA-Z]/],
          },
        ]}
      />
    </ComponentBox>
  </Wrapper>
)
```

## Properties

```json
{
  "props": {
    "as_number": {
      "doc": "Set to `true` to automatically set a number mask based on the given or inherited locale.",
      "type": "boolean",
      "status": "optional"
    },
    "as_percent": {
      "doc": "Set to `true` to automatically set a number mask with a percentage sign based on the given or inherited locale.",
      "type": "boolean",
      "status": "optional"
    },
    "as_currency": {
      "doc": "Set to `true` to use `NOK` or give it a currency code e.g. `USD` to automatically set a currency mask based on the given or inherited locale.",
      "type": "boolean",
      "status": "optional"
    },
    "mask_options": {
      "doc": "Use it to manipulate internal masks. You can use it instead of e.g. `number_mask` or `currency_mask`. All options are listed below.",
      "type": "object",
      "status": "optional"
    },
    "number_mask": {
      "doc": "Set to `true` to enable the default numbers formatting – or give an `object` containing the number mask properties. More details below. Can be a JSON string as well, containing the number mask properties. Is disabled by default.",
      "type": ["boolean", "object"],
      "status": "optional"
    },
    "currency_mask": {
      "doc": "Set to `true` or set the _valuta_ (currency_mask=\"kr\") to enable a custom currency mask – or give an `object` containing the number mask properties. More details below. Can be a JSON string as well, containing the number mask properties. Is disabled by default. Defaults to `kr`.",
      "type": ["boolean", "object"],
      "status": "optional"
    },
    "number_format": {
      "doc": "Use an object with [NumberFormat](/uilib/components/number-format/properties).",
      "type": "object",
      "status": "optional"
    },
    "locale": {
      "doc": "Define the locale to be used in the `as_number` or `as_currency` masked. It will be inherited from the [Eufemia Provider](/uilib/usage/customisation/provider) if not given. Defaults to `nb-NO`.",
      "type": "string",
      "status": "optional"
    },
    "mask": {
      "doc": "A mask can be defined both as a [RegExp style of characters](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme) or a callback function. Example below. Defaults to number mask.",
      "type": ["RegExp", "function"],
      "status": "optional"
    },
    "show_mask": {
      "doc": "Show mask when input is empty and has no focus. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "show_guide": {
      "doc": "When `false` is given, it doesn't print out placeholder characters and only adds mask characters when the user reaches them as they're typing. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "placeholder_char": {
      "doc": "The placeholder character represents the fillable spot in the mask (e.g. `_`). Defaults to invisible space.",
      "type": "string",
      "status": "optional"
    },
    "keep_char_positions": {
      "doc": "When `true`, adding or deleting characters will not affect the positions of existing characters. Defaults to `false`.",
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

- `as_number`
- `as_currency`
- `as_percent`

**Static masks:**

- `number_mask`
- `currency_mask`

You can `mask_options` to manipulate the options.

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
    "includeThousandsSeparator": {
      "doc": "Whether or not to separate thousands. Defaults to `true`.",
      "type": "boolean",
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
    "requireDecimal": {
      "doc": "Whether or not to always include a decimal point and placeholder for decimal digits after the integer. Defaults to `false`.",
      "type": "boolean",
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

The number mask is included and can be set with the `number_mask` property.

```jsx

// 1. Use the desired configurations
const numberMask = {
  prefix: '',
  suffix: ',- kr'
}

// 2. Then pass 'numberMask' to the InputMasked component as the number_mask
<InputMasked number_mask={numberMask} ... />
```

But in case you have to create the mask by yourself, you can do so:

```jsx
import createNumberMask from '@dnb/eufemia/components/input-masked/addons/createNumberMask'

// 1. Create the 'numberMask' with your desired configurations
const numberMask = createNumberMask({
  prefix: '',
  suffix: ',- kr'
})

// 2. Then pass 'numberMask' to the InputMasked component as the mask
<InputMasked mask={numberMask} ... />
```

## Email mask

```jsx
import emailMask from '@dnb/eufemia/components/input-masked/addons/emailMask'

render(
  <InputMasked
    label="Email:"
    mask={emailMask}
    placeholder="@."
    keep_placeholder={true}
  />
)
```

Read more about other addons [on the open-source project](https://github.com/text-mask/text-mask)

## Multi-input mask

```json
{
  "props": {
    "label": {
      "doc": "`legend` element describing the group of inputs inside the components.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "labelDirection": {
      "doc": "Use to change the label layout direction. Defaults to `horizontal`.",
      "type": ["horizontal", "vertical"],
      "status": "optional"
    },
    "inputs": {
      "doc": "Array of [MultiInputMaskInput](/uilib/components/input-masked/properties/#multiinputmask-inputs-properties) that defines the inputs in the component. The id's defined here is used to map input value to correct property in `values` parameters used in `onChange`.",
      "type": "array",
      "status": "optional"
    },
    "values": {
      "doc": "Values used for the inputs in the component. Expects an object with keys matching the id's defined in `inputs`.",
      "type": "object",
      "status": "optional"
    },
    "delimiter": {
      "doc": "Character that separates the input inputs.",
      "type": "string",
      "status": "optional"
    },
    "stretch": {
      "doc": "Use `true` in order to stretch the input to the available space. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "status": {
      "doc": "Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "statusState": {
      "doc": "Defines the state of the status. It's two statuses [error, info]. Defaults to error.",
      "type": ["error", "info"],
      "status": "optional"
    },
    "suffix": {
      "doc": "Text describing the content of the input more than the label. you can also send in a React component, so it gets wrapped inside the Input component.",
      "type": "React.ReactNode",
      "status": "optional"
    }
  }
}
```

### MultiInputMask inputs properties

```json
{
  "props": {
    "id": {
      "doc": "(string) Defines input id. This id is also used to map the input value to the correct property on the objects used for `values` and `onChange` parameters.",
      "type": "string",
      "status": "optional"
    },
    "label": {
      "doc": "Label used by the input. The label itself is hidden, but required to uphold accessibility standards for screen readers.",
      "type": "string",
      "status": "optional"
    },
    "mask": {
      "doc": "Each RegExp item in the array defines what the mask should be for each subsequent character in the input. The array length sets the inputs size/character limit.",
      "type": "array",
      "status": "optional"
    },
    "placeholderCharacter": {
      "doc": "Sets the placeholder character used for the input.",
      "type": "string",
      "status": "optional"
    }
  }
}
```

## Events

```json
{
  "props": {
    "on_change": {
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

**NB:** `numberValue` is returned as a float value and is only returned if the createNumberMask is used by either using `number_mask`, `currency_mask`, `as_number` or `as_currency`.

### MultiInputMask

```json
{
  "props": {
    "onChange": {
      "doc": "Runs when an input value changes. Has an object parameter with keys matching the id's defined in `inputs`, and values of string. E.g: `{month: string, year: string}`.",
      "type": "function",
      "status": "optional"
    },
    "onFocus": {
      "doc": "Runs when an input gains focus. Has an object parameter with keys matching the id's defined in `inputs`, and values of string. E.g: `{month: string, year: string}`.",
      "type": "function",
      "status": "optional"
    },
    "onBlur": {
      "doc": "Runs when an input lose focus. Has an object parameter with keys matching the id's defined in `inputs`, and values of string. E.g: `{month: string, year: string}`.",
      "type": "function",
      "status": "optional"
    }
  }
}
```
