---
showTabs: true
---

## Description

The InputMasked component uses the basic [Input](/uilib/components/input) component, but with some additional masking functionality.

### How it works

This component uses the basic [Input](/uilib/components/input) but with a set of options and features.

You will either create your own mask, or use one of the provided once. There are also masks which change based on different [locales](/uilib/components/input-masked/info?fullscreen#mask-based-on-locale) (`as_currency` or `as_number`).

### Accessibility

Screen readers will read also the mask before the user is entering content. Also the user will hear the mask during typing. This behavior can both have positive and negative side effects to the user. But overall, it works ok.

Both entering a coma or a dot will act as a decimal separator if [decimals are enabled](https://eufemia.dnb.no/uilib/components/input-masked#decimals) and one of the internal masks for numbers is used.

### Mask based on locale

The InputMasked component supports masks based on a given locale. The locale will be inherited from the [Eufemia Provider](/uilib/usage/customisation/provider) if not given.

As of now you can enable these masks by giving:

- `as_currency="EUR"`
- `as_number={true}`

You can still send in custom mask parameters by the `currency_mask={{ ... }}` and `number_mask={{ ... }}` properties.

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

- `as_number` will default to no decimals
- `number_mask` will default to no decimals
- `as_currency` will default to 2 decimals
- `currency_mask` will default to 2 decimals

You can change the amount of decimals by sending in options to the `currency_mask` or `number_mask` (also see example above).

This example here also shows how to effect every InputMasked component in your application, by setting these options on the [Eufemia Provider](/uilib/usage/customisation/provider).

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

In order to remove a decimal limit, you can send in `null` and allow decimals with `allowDecimal`:

```jsx
<InputMasked
  as_number
  number_mask={{
    allowDecimal: true,
    decimalLimit: null,
  }}
  value="1234.567"
/>
```

##### Rounding

You can also change the NumberFormat options (`number_format`) internally used – if needed.

```jsx
<Provider
  locale="en-GB"
  InputMasked={{
    number_format: {
      omit_rounding: false, // defaults to true
    },
  }}
>
  <InputMasked as_currency="USD" value="1234.567" />
</Provider>
```
