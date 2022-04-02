---
showTabs: true
---

import {
ButtonPrimary,
ButtonSecondary,
ButtonDisabled,
ButtonPrimaryWithIcon,
ButtonPrimaryWithIconLeft,
ButtonTertiary,
ButtonTertiaryTop,
ButtonTertiaryWrap,
ButtonAnchor,
ButtonCustomContent,
ButtonSignal,
ButtonSignalLarge,
ButtonIcon,
ButtonStretch,
TertiaryWithNoIcon,
UnstyledVariant,
} from 'Docs/uilib/components/button/Examples'

## Demos

### Primary button

<ButtonPrimary />

### Secondary button

<ButtonSecondary />

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

### Disabled buttons

<ButtonDisabled />

### Signal button

Medium is equivalent to 24, but responsive. To import custom icons, use: `import { bell_medium as Bell } from '@dnb/eufemia/icons'`

<ButtonSignal />

### Large Signal button

Large Signal button with medium sized icon. To import custom icons, use: `import { bell_medium as Bell } from '@dnb/eufemia/icons'`

<ButtonSignalLarge />

### Icon button

<ButtonIcon />

### Custom button content

This is, as all of the demos, only an example of how to achieve various needs, and not that you should do it.

<ButtonCustomContent />

<ButtonStretch />
<TertiaryWithNoIcon />
<UnstyledVariant />
