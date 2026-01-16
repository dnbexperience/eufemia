---
title: 'Toggle'
description: '`Field.Toggle` is a base component for allowing the user to toggle between two different values in the target data point.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/base-fields/Toggle/metadata.json
---

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Toggle />)
```

## Description

`Field.Toggle` is a base component for allowing the user to toggle between two different values in the target data point.

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Toggle path="/myState" />)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/base-fields/Toggle)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/base-fields/Toggle)

### Indeterminate checkbox

Here is a indeterminate state (partially checked) [working example](/uilib/extensions/forms/base-fields/Indeterminate/).

## Demos

### Value On

```tsx
render(
  <Field.Toggle
    valueOn="checked"
    valueOff="unchecked"
    variant="checkbox"
    label="Label text"
    value="checked"
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### Value Off

```tsx
render(
  <Field.Toggle
    valueOn="checked"
    valueOff="unchecked"
    variant="checkbox"
    label="Label text"
    value="unchecked"
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### Text On

```tsx
render(
  <Field.Toggle
    valueOn="checked"
    valueOff="unchecked"
    textOn="Text on"
    textOff="Text off"
    variant="checkbox"
    value="checked"
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### Text Off

```tsx
render(
  <Field.Toggle
    valueOn="checked"
    valueOff="unchecked"
    textOn="Text on"
    textOff="Text off"
    variant="checkbox"
    value="unchecked"
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### Disabled

```tsx
render(
  <Field.Toggle
    valueOn="checked"
    valueOff="unchecked"
    variant="checkbox"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    disabled
  />,
)
```

### Info

```tsx
render(
  <Field.Toggle
    valueOn="checked"
    valueOff="unchecked"
    variant="checkbox"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    info="Useful information (?)"
  />,
)
```

### Warning

```tsx
render(
  <Field.Toggle
    valueOn="checked"
    valueOff="unchecked"
    variant="checkbox"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    warning="I'm warning you..."
  />,
)
```

### Error

```tsx
render(
  <Field.Toggle
    valueOn="checked"
    valueOff="unchecked"
    variant="checkbox"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    error={new Error('This is what is wrong...')}
  />,
)
```

### Value types

#### Boolean value - On state

```tsx
render(
  <Field.Toggle
    valueOn={true}
    valueOff={false}
    variant="checkbox"
    label="Boolean value"
    value={true}
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

#### Boolean value - Off state

```tsx
render(
  <Field.Toggle
    valueOn={true}
    valueOff={false}
    variant="checkbox"
    label="Boolean value"
    value={false}
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

#### Number value - On state

```tsx
render(
  <Field.Toggle
    valueOn={100}
    valueOff={0}
    variant="checkbox"
    label="Number value"
    value={100}
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

#### Number value - Off state

```tsx
render(
  <Field.Toggle
    valueOn={100}
    valueOff={0}
    variant="checkbox"
    label="Number value"
    value={0}
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### Variants

#### Switch

```tsx
render(
  <Field.Toggle
    valueOn="on"
    valueOff="off"
    variant="switch"
    label="Switch variant"
    value="on"
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

#### Button

```tsx
render(
  <Field.Toggle
    valueOn="on"
    valueOff="off"
    variant="button"
    label="Toggle button variant"
    value="on"
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

#### Buttons

```tsx
render(
  <Field.Toggle
    valueOn="on"
    valueOff="off"
    variant="buttons"
    label="Buttons variant"
    value="on"
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

#### Buttons with help

```tsx
render(
  <Field.Toggle
    valueOn="on"
    valueOff="off"
    variant="buttons"
    label="Buttons variant"
    help={{
      title: 'Help title',
      content: 'Help content',
    }}
    value="on"
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

#### Radio

```tsx
render(
  <Field.Toggle
    valueOn="on"
    valueOff="off"
    variant="radio"
    label="Radio variant"
    value="on"
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

#### Radio with help

```tsx
render(
  <Field.Toggle
    valueOn="on"
    valueOff="off"
    variant="radio"
    label="Radio variant"
    help={{
      title: 'Help title',
      content: 'Help content',
    }}
    value="on"
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

```tsx
Text above the toggle:
<Field.Toggle
  valueOn="on"
  valueOff="off"
  variant="buttons"
  value="on"
  onChange={(value) => console.log('onChange', value)}
/>
```

```tsx
Text above the toggle:
<Field.Toggle
  valueOn="on"
  valueOff="off"
  variant="radio"
  value="on"
  onChange={(value) => console.log('onChange', value)}
/>
```

#### Checkbox button

```tsx
render(
  <Field.Toggle
    valueOn="on"
    valueOff="off"
    variant="checkbox-button"
    label="Toggle checkbox variant"
    value="on"
    onChange={(value) => console.log('onChange', value)}
  />,
)
```
