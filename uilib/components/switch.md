---
title: 'Switch'
description: 'The Switch component (toggle) is a digital on/off switch.'
metadata: https://eufemia.dnb.no/uilib/components/switch/metadata.json
---

## Import

```tsx
import { Switch } from '@dnb/eufemia'
```

## Description

_Also known as a toggle switch or toggle._

The Switch component (toggle) is a digital on/off switch. Toggle switches are best used for changing system functionalities and preferences. "Toggles may replace two radio buttons or a single checkbox to allow users to choose between two opposing states." – [Source][1]

You may also check out the [Checkbox](/uilib/components/checkbox) component.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=4243-1493)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/switch)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/switch)

## How it should work

"Toggle switches should take immediate effect and should not require the user to click Save or Submit to apply the new state. As always, we should strive to match the system to the real world." – [Source][1]

### When not to use

Do not use a toggle switch if the user is required to click Save or Update to apply the new state.

## Good practices

"The toggle labels should describe what the control will do when the switch is on; they should not be neutral or ambiguous. When in doubt, say the label aloud and append 'on/off' to the end. If it doesn't make sense, then rewrite the label." – [Source][1]

The label should describe what the toggle will do when the switch is on.

[1]: https://www.nngroup.com/articles/toggle-switch-guidelines/

## Demos

### Unchecked Switch

```tsx
render(<Switch label="Switch" onChange={console.log} />)
```

### Checked Switch

```tsx
render(
  <Switch
    label="Label"
    labelPosition="left"
    checked
    onChange={({ checked }) => console.log(checked)}
  />,
)
```

### Checked Switch with error message

```tsx
render(<Switch label="Switch" checked status="Error message" />)
```

### Switch with suffix

```tsx
render(
  <Switch
    label="Switch"
    checked
    suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
  />,
)
```

### Switch in different sizes

As for now, there are two sizes. `medium` is the default size.

```tsx
<Switch size="medium" label="Medium" right="large" checked />
<Switch size="large" label="Large" right="large" checked />
<Switch size="large" label="Large" />
```

### Switch in disabled state

```tsx
render(<Switch checked disabled label="Disabled" />)
```
