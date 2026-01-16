---
title: 'Checkbox'
description: 'The Checkbox component is shown as a square box that is ticked (checked) when activated.'
metadata: https://eufemia.dnb.no/uilib/components/checkbox/metadata.json
---

## Import

```tsx
import { Checkbox } from '@dnb/eufemia'
```

## Description

The Checkbox component is displayed as a square box that is ticked (checked) when activated. Checkboxes let users select one or more options from a limited number of choices.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=4243-1493)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/checkbox)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/checkbox)

## Demos

### Unchecked Checkbox (default state)

```tsx
render(<Checkbox label="Checkbox" onChange={(e) => console.log(e)} />)
```

### Checked Checkbox, left label position

```tsx
render(
  <Checkbox
    label="Label"
    labelPosition="left"
    checked
    onChange={({ checked }) => console.log(checked)}
  />,
)
```

### Checked Checkbox with error message

```tsx
render(<Checkbox label="Checkbox" checked status="Error message" />)
```

### Checkbox with suffix

```tsx
render(
  <Checkbox
    label="Checkbox"
    checked
    suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
  />,
)
```

### With different sizes

As for now, there are two sizes. `medium` is the default size.

```tsx
<Checkbox size="medium" label="Medium" right="large" checked />
<Checkbox size="large" label="Large" checked />
```

### Prevent changing the state of the checkbox

You can prevent the state of the checkbox from changing by calling `preventDefault` on the `onClick` event.

```tsx
render(
  <Checkbox
    label="Checkbox"
    onClick={(event) => {
      event.preventDefault()
    }}
    onChange={({ checked }) => console.log('onChange', checked)}
  />,
)
```

### Disabled checkbox

```tsx
render(<Checkbox checked disabled />)
```

### Indeterminate state (partially checked)

The checkbox offers a fully controlled indeterminate state.

Here is a indeterminate state [working example](/uilib/extensions/forms/base-fields/Indeterminate).

```tsx
render(<Checkbox label="Checkbox" indeterminate />)
```

```tsx
render(<Checkbox label="Checkbox" indeterminate size="large" />)
```

```tsx
<ComponentBox data-visual-test="checkbox-error-unchecked">
  <Checkbox label="Unchecked" status="error" />
</ComponentBox>
<ComponentBox data-visual-test="checkbox-error-checked">
  <Checkbox label="Checked" status="error" checked />
</ComponentBox>
```

```tsx
render(
  <ShowBoundingArea>
    <ComponentBox data-visual-test="checkbox-bounding">
      <Checkbox label="Checkbox" checked />
    </ComponentBox>
  </ShowBoundingArea>,
)
```
