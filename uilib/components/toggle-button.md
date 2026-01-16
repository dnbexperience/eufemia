---
title: 'ToggleButton'
description: 'The ToggleButton component should be used to toggle on or off a limited number of choices.'
metadata: https://eufemia.dnb.no/uilib/components/toggle-button/metadata.json
---

## Import

```tsx
import { ToggleButton } from '@dnb/eufemia'
```

## Description

The ToggleButton component is used to toggle on or off a limited number of choices.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=4243-1493)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/toggle-button)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/toggle-button)

You can use the React component `<ToggleButton.Group>` to wrap several `ToggleButton` components. This makes it easier to handle the `on_change` event at a higher level, as well as several other [context-related properties](/uilib/components/toggle-button/properties).

By default, the `ToggleButton.Group` is single-select, like a [Radio](/uilib/components/radio) button. However, you can easily enable `multiselect` as well.

## How to use

You can use the ToggleButton in different modes. Either as a stand-alone component or together with the `ToggleButton.Group` context.

### Multi-select

If `multiselect` is enabled on the group, several items can be enabled or disabled by the user.

You need to decide if you want to track the state yourself by using the `checked` property, or if you want to listen to the internal state with `on_change(({ values }) => console.log(values))`. In this case, you also need to give every item a `value` property.

## Demos

### Unchecked ToggleButton

```tsx
render(<ToggleButton label="Label" text="Toggle Me" />)
```

### Checked ToggleButton

```tsx
render(
  <ToggleButton
    label="Label"
    text="Checked ToggleButton"
    checked
    on_change={({ checked }) => {
      console.log('on_change', checked)
    }}
  />,
)
```

### Default ToggleButton group

```tsx
render(
  <ToggleButton.Group
    label="ToggleButton Group"
    value="first"
    on_change={({ value }) => {
      console.log('on_change', value)
    }}
  >
    <ToggleButton text="First" value="first" />
    <ToggleButton text="Second" value="second" />
    <ToggleButton text="Third" value="third" />
  </ToggleButton.Group>,
)
```

### Multi-select ToggleButton group

```tsx
render(
  <ToggleButton.Group
    label="Multi-select"
    multiselect={true}
    values={['first', 'third']}
    on_change={({ values }) => {
      console.log('on_change', values)
    }}
  >
    <ToggleButton text="First" value="first" />
    <ToggleButton text="Second" value="second" />
    <ToggleButton text="Third" value="third" />
  </ToggleButton.Group>,
)
```

### Vertical aligned ToggleButton group with `checkbox` variant and `multiselect`

```tsx
render(
  <ToggleButton.Group
    label="Vertical Group"
    layout_direction="column"
    multiselect={true}
    variant="checkbox"
    on_change={({ values }) => {
      console.log('on_change', values)
    }}
  >
    <ToggleButton text="First" value="first" />
    <ToggleButton text="Second" value="second" />
    <ToggleButton text="Third" value="third" checked />
  </ToggleButton.Group>,
)
```

### ToggleButton group as `multiselect` with a status message

```tsx
render(
  <ToggleButton.Group
    label="ToggleButton Group with status"
    status="Error message"
    multiselect={true}
    on_change={({ values }) => {
      console.log('on_change', values)
    }}
  >
    <ToggleButton text="First" value="first" />
    <ToggleButton text="Second" value="second" checked />
    <ToggleButton text="Third" value="third" checked={true} />
  </ToggleButton.Group>,
)
```

### ToggleButton with status messages and a group variant as `radio`

```tsx
render(
  <ToggleButton.Group
    label="ToggleButtons with status"
    variant="radio"
    on_change={({ value }) => {
      console.log('on_change', value)
    }}
  >
    <ToggleButton text="First" value="first" status="error" />
    <ToggleButton
      text="Second"
      value="second"
      checked
      status="Error message"
    />
    <ToggleButton
      text="Third"
      value="third"
      status="Info message"
      status_state="info"
    />
  </ToggleButton.Group>,
)
```

### Disabled ToggleButton group

```tsx
render(
  <ToggleButton.Group
    label="Disabled Group"
    disabled
    value="first"
    variant="checkbox"
  >
    <ToggleButton text="First" value="first" />
    <ToggleButton text="Second" value="second" />
    <ToggleButton text="Third" value="third" checked />
  </ToggleButton.Group>,
)
```

### ToggleButtons with a suffix

```tsx
render(
  <ToggleButton.Group
    label="With suffixes"
    suffix={<HelpButton title="Group suffix">Group suffix</HelpButton>}
  >
    <ToggleButton text="First" value="first" />
    <ToggleButton
      text="Second"
      value="second"
      status="Error message"
      suffix={<HelpButton title="Button suffix">Button suffix</HelpButton>}
    />
    <ToggleButton text="Third" value="third" checked />
  </ToggleButton.Group>,
)
```

### ToggleButtons with icons only

```tsx
render(
  <ToggleButton.Group label="Icons only">
    <ToggleButton icon="bell" value="first" checked />
    <ToggleButton icon="loupe" value="second" />
    <ToggleButton icon="calendar" value="third" />
  </ToggleButton.Group>,
)
```
