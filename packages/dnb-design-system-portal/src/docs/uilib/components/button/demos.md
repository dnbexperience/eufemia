---
showTabs: true
---

import {
ButtonPrimary,
ButtonSecondary,
ButtonDisabledPrimary,
ButtonDisabledSecondary,
ButtonPrimaryWithIcon,
ButtonPrimaryWithIconLeft,
ButtonTertiary,
ButtonTertiaryTop,
ButtonTertiaryWrap,
ButtonAnchor,
ButtonSignal,
ButtonSignalLarge,
ButtonIcon,
TertiaryWithNoIcon,
} from 'Pages/uilib/components/button/Examples'

## Demos

### Primary button

<ButtonPrimary />

### Secondary button

<ButtonSecondary />

### Disabled primary button

<ButtonDisabledPrimary />

### Disabled secondary button

<ButtonDisabledSecondary />

### Primary button with icon

<ButtonPrimaryWithIcon />

### Primary button with icon on left

<ButtonPrimaryWithIconLeft />

### Tertiary button

The tertiary button variant does support newlines while the icon is placed top aligned. You can enable multiline support with the `wrap` property.

<ButtonTertiary />

Tertiary button with **top** placed icon.

<ButtonTertiaryTop />

Tertiary button with long text and text `wrap` enabled.

<ButtonTertiaryWrap />

### Anchor button

<ButtonAnchor />

### Signal button

Medium is equivalent to 24, but responsive. To import custom icons, use: `import { bell_medium as Bell } from '@dnb/eufemia/icons'`

<ButtonSignal />

### Large Signal button

Large Signal button with medium sized icon. To import custom icons, use: `import { bell_medium as Bell } from '@dnb/eufemia/icons'`

<ButtonSignalLarge />

### Icon button

<ButtonIcon />

<TertiaryWithNoIcon />
