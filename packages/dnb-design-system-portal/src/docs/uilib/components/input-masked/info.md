---
showTabs: true
---

## Description

The InputMasked component uses the basic [Input](/uilib/components/input) component, but with some additional masking functionality.

### How it works

This component uses the basic [Input](/uilib/components/input) but with a set of options and features.

You will either create your own mask, or use one of the provided once. There are also masks which change based on different [locales](/uilib/components/input-masked/info?fullscreen#mask-based-on-locale) (`as_currency` or `as_number`).

### Accessibility

Screen readers will read also the mask before the user is entering the content. Also, the user will hear the mask during typing. This behavior can both have positive and negative side effects on the user. But overall, it works ok.

Both entering a coma or a dot will act as a decimal separator if [decimals are enabled](/uilib/components/input-masked#decimals) and one of the internal masks for numbers is used.

#### InputMode

For mobile devices and soft keyboards, the HTML input element does support a numeric-only keyboard. But sadly it does not support negative values at the time of writing this. So it is only enabled if `allowNegative` is set to false.

```jsx
<InputMasked mask_options={{ allowNegative: false }} />
```

### Mask based on locale

The InputMasked component supports masks based on a given locale. The locale will be inherited from the [Eufemia Provider](/uilib/usage/customisation/provider) if not given.

As of now, you can enable these masks by giving:

- `as_currency="EUR"`
- `as_number={true}`

You can still send in custom mask parameters to `currency_mask={{ ... }}` or `number_mask={{ ... }}`. But you can also make use of `mask_options={{ ... }}` and just send in your extra options in there.

More details in the [examples above](/uilib/components/input-masked/demos).

#### Clean number values

If you use `as_currency` or `as_number` you have to always send inn in a clean number without any mask (`value="1234.50"`):

```jsx
<InputMasked as_currency="EUR" value="1234.50" />
```

You can also receive a clean number value you can use and send back in again:

```jsx
<InputMasked
  as_currency="EUR"
  value="1234.50"
  on_change={({ numberValue }) => {
    console.log(numberValue) // type of float
  }}
/>
```

#### Decimals

- `number_mask` will default to no decimals
- `currency_mask` will default to no decimals
- `as_number` will default to no decimals
- `as_currency` will default to 2 decimals

You can change the number of decimals by sending in options to the `currency_mask`, `number_mask`, or `mask_options` (see example above).

This example here also shows how to affect every InputMasked component in your application, by setting these options on the [Eufemia Provider](/uilib/usage/customisation/provider).

```jsx
<Provider
  locale="en-GB"
  InputMasked={{
    currency_mask: {
      decimalLimit: 3, // defaults to 2
    },
    number_mask: {
      decimalLimit: 6, // defaults to no decimals
    },
  }}
>
  <InputMasked as_currency="USD" value="1234.567" />
</Provider>
```

To remove a decimal limit, you can send in `null` and allow decimals with `allowDecimal`:

```jsx
<InputMasked
  as_number
  mask_options={{
    allowDecimal: true,
    decimalLimit: null,
  }}
  value="1234.567"
/>
```