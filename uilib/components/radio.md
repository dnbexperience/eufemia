---
title: 'Radio'
description: 'The Radio component is shown as a circle that is filled (checked) when activated.'
metadata: https://eufemia.dnb.no/uilib/components/radio/metadata.json
---

## Import

```tsx
import { Radio } from '@dnb/eufemia'
```

## Description

The Radio component is displayed as a circle that is filled (checked) when activated. Radio buttons let users select one option from a limited number of choices within a group.

It is recommended to use radio buttons in a group. You can use either the React component `<Radio.Group>` or the property `group="NAME"` to define the group.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=4243-1493)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/radio)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/radio)

## Demos

### Radio group

```tsx
render(
  <Radio.Group
    label="Radio Group"
    on_change={({ value }) => {
      console.log('on_change', value)
    }}
    value="first"
  >
    <Radio label="First" value="first" />
    <Radio label="Second" value="second" />
    <Radio label="Third" value="third" />
  </Radio.Group>,
)
```

### Vertical aligned Radio group

```tsx
render(
  <Radio.Group
    label="Vertical Group"
    layout_direction="column"
    on_change={({ value }) => {
      console.log('on_change', value)
    }}
  >
    <Radio label="First" value="first" />
    <Radio label="Second" value="second" />
    <Radio label="Third" value="third" checked />
  </Radio.Group>,
)
```

### Radio group with label above

```tsx
render(
  <Radio.Group
    vertical
    label="Vertical Group"
    layout_direction="column"
    on_change={({ value }) => {
      console.log('on_change', value)
    }}
  >
    <Radio label="First" value="first" />
    <Radio label="Second" value="second" />
    <Radio label="Third" value="third" checked />
  </Radio.Group>,
)
```

### Radio group with status messages

```tsx
render(
  <Radio.Group
    label="Radio Group with status"
    layout_direction="column"
    on_change={({ value }) => {
      console.log('on_change', value)
    }}
  >
    <Radio label="First" value="first" status="error" />
    <Radio label="Second" value="second" status="Error message" />
    <Radio
      label="Third"
      value="third"
      checked
      status="Info message"
      status_state="info"
    />
  </Radio.Group>,
)
```

### Plain Radio group

Without `<Radio.Group>`. It is recommended to use the `<Radio.Group>` if you are using **React**.

```tsx
render(
  <FieldBlock
    label="Plain Radio group"
    layout="horizontal"
    labelHeight="small"
  >
    <Radio
      value="first"
      label="First"
      group="MyRadioGroup"
      on_change={({ value, checked }) => {
        console.log('on_change', value, checked)
      }}
      right
    />
    <Radio
      value="second"
      label="Second"
      group="MyRadioGroup"
      on_change={({ value, checked }) => {
        console.log('on_change', value, checked)
      }}
      right
    />
    <Radio
      checked
      value="third"
      label="Third"
      group="MyRadioGroup"
      on_change={({ value, checked }) => {
        console.log('on_change', value, checked)
      }}
      right
    />
  </FieldBlock>,
)
```

### With different sizes

As for now, there are two sizes. `medium` is the default size.

```tsx
<Radio size="medium" label="Medium" right="large" checked />
<Radio size="large" label="Large" checked />
```

### Disabled Radio Group

With `label_position` set to left.

```tsx
render(
  <Radio.Group
    label="Disabled Group"
    disabled
    label_position="left"
    name="MyGroup"
  >
    <Radio label="First" value="first" />
    <Radio label="Second" value="second" />
    <Radio label="Third" value="third" checked />
  </Radio.Group>,
)
```

### Radio Buttons with a suffix

```tsx
render(
  <Radio.Group label="With suffixes" label_position="left">
    <Radio label="First" value="first" />
    <Radio
      label="Second"
      value="second"
      suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
    />
    <Radio
      label="Third"
      value="third"
      status="Error message"
      suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
      checked
    />
  </Radio.Group>,
)
```

```tsx
<ComponentBox data-visual-test="radio-error-unchecked">
  <Radio label="Unchecked" status="error" />
</ComponentBox>
<ComponentBox data-visual-test="radio-error-checked">
  <Radio label="Checked" status="error" checked />
</ComponentBox>
```

```tsx
<ComponentBox data-visual-test="radio-default">
  <Radio label="Single Radio" />
</ComponentBox>
<ComponentBox data-visual-test="radio-checked">
  <Radio
    label="Checked Radio"
    checked
    on_change={({ checked }) => console.log(checked)}
  />
</ComponentBox>
```

```tsx
render(
  <ShowBoundingArea>
    <ComponentBox data-visual-test="radio-bounding">
      <Radio label="Radio button" checked />
    </ComponentBox>
  </ShowBoundingArea>,
)
```
