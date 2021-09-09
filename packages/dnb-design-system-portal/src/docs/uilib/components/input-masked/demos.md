---
showTabs: true
---

import {
InputMaskedExampleCurrencyLocale,
InputMaskedExampleCurrencyMask,
InputMaskedExampleNumberLocale,
InputMaskedExampleCustomNumberMask,
InputMaskedExampleNumberMask,
InputMaskedExamplePrefix,
InputMaskedExamplePhone
} from 'Pages/uilib/components/input-masked/Examples'
import ChangeLocale from 'Src/core/ChangeLocale'

## Demos

<ChangeLocale label="Locale used in the demos:" label_direction="vertical" bottom />

### Locale based `as_number`

When you use `as_number` it will create a mask for you and inherit the locale from the [Eufemia Provider](/uilib/usage/customisation/provider), if the locale prop is not given.

You can still define extra mask parameters with `number_mask`, as the second input example shows (e.g. `decimalLimit`).

<InputMaskedExampleNumberLocale />

### Locale based `as_currency`

When you use `as_currency` it will create a mask for you and inherit the locale from the [Eufemia Provider](/uilib/usage/customisation/provider), if the locale prop is not given.

<InputMaskedExampleCurrencyLocale />

### Define the `currency_mask` manually

<InputMaskedExampleCurrencyMask />

### Customize the number mask

<InputMaskedExampleCustomNumberMask />

### Using the `number_mask` with a combined suffix

<InputMaskedExampleNumberMask />

### Using the `number_mask` and a prefix

<InputMaskedExamplePrefix />

### Phone Number, starting with 4

<InputMaskedExamplePhone />
