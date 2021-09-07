---
showTabs: true
---

## Description

The InputMasked component uses the basic [Input](/uilib/components/input) component, but with some additional masking functionality.

### How it works

This component uses the basic [Input](/uilib/components/input) but with a set of options and features.

You will either create your own mask, or use one of the provided once. There are also masks which change based on different [locales](/uilib/components/input-masked/info?fullscreen#mask-based-on-locale) (`as_currency` or `as_number`).

### Accessibility

When you use `as_currency`, `as_number`, `currency_mask` or `number_mask` the user can enter both a coma or a dot to separate the decimals.

Screen readers will read also the mask before the user is entering content. Also the user will hear the mask during typing. This behavior can both have positive and negative side effects to the user. But overall, it works ok.

### Mask based on locale

The InputMasked component supports masks based on a given locale. The locale will be inherited from the [Eufemia Provider](/uilib/usage/customisation/provider) if not given.

As of now you can enable these masks by giving:

- `as_currency="EUR"`
- `as_number={true}`

You can still send in custom mask parameters by the `currency_mask={{ ... }}` and `number_mask={{ ... }}` properties.

More details in the [examples above](/uilib/components/input-masked/demos).

#### Clean number values

If you use `as_currency` or `as_number` you may always send inn in a clean number without any mask (`value="1234.50"`):

```jsx
<InputMasked as_currency="EUR" value="1234.50" />
```

You can also receive a clean number value you can use and send back in again:

```jsx
<InputMasked
  as_currency="EUR"
  value="1234.50"
  on_change={({ cleaned_value }) => {
    console.log(cleaned_value)
  }}
/>
```

#### Decimals

- `as_currency` will default to two decimals
- `as_number` will default to infinite decimals

You can change the amount of decimals by sending in options to the `currency_mask` (also see example above). Also, you can change the NumberFormat options (`number_format`) internally used – if needed. This example here also shows how to effect every InputMasked component in your application, by setting these options on the [Eufemia Provider](/uilib/usage/customisation/provider).

```jsx
<Provider
  locale="en-GB"
  InputMasked={{
    currency_mask: {
      decimalLimit: 3, // defaults to 2
    },
    number_mask: {
      decimalLimit: 6, // defaults to infinite
    },
    number_format: {
      omit_rounding: true, // defaults to false
    },
  }}
>
  <InputMasked label="Currency:" as_currency="USD" value="1234.567" />
</Provider>
```
