---
showTabs: true
---

## Properties

| Properties                                  | Description                                                                                                                                                                                                                                                                                              |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as_number`                                 | _(optional)_ Set to `true` to automatically set a number mask based on the given or inherited locale.                                                                                                                                                                                                    |
| `as_currency`                               | _(optional)_ Set to `true` to use `NOK` or give it a currency code e.g. `USD` to automatically set a currency mask based on the given or inherited locale.                                                                                                                                               |
| `number_mask`                               | _(optional)_ Set to `true` to enable the default numbers formatting – or give an `object` containing the number mask properties. More details below. Can be a JSON string as well, containing the number mask properties. Is disabled by default.                                                        |
| `currency_mask`                             | _(optional)_ Set to `true` or set the _valuta_ (currency_mask="kr") to enable the a custom currency mask – or give an `object` containing the number mask properties. More details below. Can be a JSON string as well, containing the number mask properties. Is disabled by default. Defaults to `kr`. |
| `number_format`                             | _(optional)_ Use an object with [NumberFormat](/uilib/components/number-format/properties) e.g. `{ omit_rounding: false }`.                                                                                                                                                                              |
| `locale`                                    | _(optional)_ Define the locale to be used in the `as_number` or `as_currency` masked. It will be inherited from the [Eufemia Provider](/uilib/usage/customisation/provider) if not given. Defaults to `nb-NO`.                                                                                           |
| `mask`                                      | _(optional)_ A mask can be define both as a [RegExp style of characters](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme) or a callback function. Example below.                                                                                                     |
| `show_mask`                                 | _(optional)_ Show mask when input is empty and has no focus. Defaults to `false`.                                                                                                                                                                                                                        |
| `show_guide`                                | _(optional)_ When guide is `false`, input-masked doesn't print out placeholder characters and only adds mask characters when the user reaches them as they're typing. Defaults to `true`.                                                                                                                |
| `placeholder_char`                          | _(optional)_ The placeholder character represents the fillable spot in the mask. Defaults to underscore `_`.                                                                                                                                                                                             |
| `keep_char_positions`                       | _(optional)_ When `true`, adding or deleting characters will not affect the positions of existing characters. Defaults to `false`.                                                                                                                                                                       |
| [Input](/uilib/components/input/properties) | _(optional)_ all `Input` properties are supported.                                                                                                                                                                                                                                                       |

## Number mask properties

Defaults to Norwegian number format:

| Properties                  | Description                                                                                                                            |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `prefix`                    | (string): What to display before the amount. Defaults to empty string.                                                                 |
| `suffix`                    | (string): What to display after the amount. Defaults to empty string.                                                                  |
| `includeThousandsSeparator` | (boolean): Whether or not to separate thousands. Defaults to to `true`.                                                                |
| `thousandsSeparatorSymbol`  | (string): Character with which to separate thousands. Default to `' '`.                                                                |
| `allowDecimal`              | (boolean): Whether or not to allow the user to enter a fraction with the amount. Default to `false`.                                   |
| `decimalSymbol`             | (string): Character that will act as a decimal point. Defaults to `','`.                                                               |
| `decimalLimit`              | (number): How many digits to allow after the decimal. Defaults to `2`.                                                                 |
| `integerLimit`              | (number): Limit the length of the integer number. Defaults to `null` for unlimited.                                                    |
| `requireDecimal`            | (boolean): Whether or not to always include a decimal point and placeholder for decimal digits after the integer. Defaults to `false`. |
| `allowNegative`             | (boolean): Whether or not to allow negative numbers. Defaults to `true`.                                                               |
| `allowLeadingZeroes`        | (boolean): Whether or not to allow leading zeroes. Defaults to `false`.                                                                |

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

## Custom mask usage

By now, you don't need to install `react-text-mask` as it comes with the `@dnb/eufemia`. For other masks than the **createNumberMask** you have to create or install custom masks. Read more on [how to use the addons](https://github.com/text-mask/text-mask/blob/master/addons/README.md).

1. Install the needed dependencies:

```bash
npm i text-mask-addons
```

2. Create and use the mask:

```jsx
import emailMask from 'text-mask-addons/dist/emailMask'

// or import it from the @dnb/eufemia
import emailMask from '@dnb/eufemia/components/input-masked/addons/emailMask'

render(
  <InputMasked
    label="Email:"
    mask={emailMask}
    placeholder="@."
    keep_placeholder="true"
  />
)
```

Read more about the details [on the open source project](https://github.com/text-mask/text-mask)
