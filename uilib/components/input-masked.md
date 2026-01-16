---
title: 'InputMasked'
description: 'The InputMasked component uses the basic input component, but with some additional masking functionality.'
metadata: https://eufemia.dnb.no/uilib/components/input-masked/metadata.json
---

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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
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
  </Wrapper>,
)
```
