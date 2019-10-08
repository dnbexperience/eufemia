---
draft: true
---

| Properties                                      | Description                                                                                                                                                                                          |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mask`                                          | _(optional)_ A mask can be define both as a [RegExp style of characters](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme) or a callback function. Example below. |
| `number_mask`                                   | _(optional)_ An object containing the number mask properties. More details below.                                                                                                                    |
| `show_mask`                                     | _(optional)_ Show mask when input is empty and has no focus.                                                                                                                                         |
| [Input](/uilib/components/input#tab-properties) | _(optional)_ all `Input` properties are supported.                                                                                                                                                   |

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

But in case you have to create the mask by yourself, you can do so:

```js
import createNumberMask from 'dnb-ui-lib/components/input-masked/addons/createNumberMask'

// 1. Create the 'numberMask' with your desired configurations
const numberMask = createNumberMask({
  prefix: '',
  suffix: ',- kr.'
})

// 2. Then pass 'numberMask' to the InputMasked component as the mask
<InputMasked mask={numberMask} ... />
```

## Custom mask usage

By now, you don't need to install `react-text-mask` as it comes with the `dnb-ui-lib`. For other masks than the **createNumberMask** you have to create or install custom masks. Read more on [how to use the addons](https://github.com/text-mask/text-mask/blob/master/addons/README.md).

1. Install the needed dependencies:

```bash
npm i text-mask-addons
```

2. Create and usage the mask:

```js
import emailMask from 'text-mask-addons/dist/emailMask'

<InputMasked mask={emailMask} ... />
```

Read more about the details [on the open source project](https://github.com/text-mask/text-mask)
