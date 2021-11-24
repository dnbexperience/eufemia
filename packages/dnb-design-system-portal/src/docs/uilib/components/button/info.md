---
showTabs: true
---

import { PrimaryButtonSizes, SecondaryButtonSizes, TertiaryButtonSizes, SignalButtonSizes, IconButtonSizes } from 'Docs/uilib/components/button/Examples'

## Description

The Button component should be used as the **primary call-to-action** in a form, or as a user interaction mechanism.

### Variants and sizes

There should never be more than one `primary` button in a given context; `secondary` and `tertiary` button variants does not have this constraint. Generally speaking, a button should not be used when a link would suffice.

The Button component comes in different sizes.

For variant primary, the recommended sizes are `default` and `large`.

<PrimaryButtonSizes />

For variant secondary, the recommended sizes are `default` and `large`.

<SecondaryButtonSizes />

For variant tertiary, the recommended size are `default`. A variant with `icon_position="top"` is also available for use.
It is **not** recommended to use the tertiary button without icon. Looking for a similar variant without icon? You might want to check out [Anchor](/uilib/elements/anchor) instead.

<TertiaryButtonSizes />

For variant signal, the recommended sizes are `default` and `large`.

<SignalButtonSizes />

Icon buttons comes in all sizes.

<IconButtonSizes />
