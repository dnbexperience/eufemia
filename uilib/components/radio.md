---
title: 'Radio'
description: 'The Radio component is shown as a circle that is filled (checked) when activated.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:26.476Z
checksum: 9c409d8d980ce0b39735a12a8f93b131ac13e45b8f1e01c4f1f8905b12b8abbe
---

# Radio

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
  </Radio.Group>
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
  </Radio.Group>
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
  </Radio.Group>
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
  </Radio.Group>
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
  </FieldBlock>
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
  </Radio.Group>
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
  </Radio.Group>
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
  </ShowBoundingArea>
)
```

## `Radio` properties

```json
{
  "value": {
    "doc": "Defines the `value` as a string. Use it to get the value during the `on_change` event listener callback in the **RadioGroup**.",
    "type": "string",
    "status": "required"
  },
  "checked": {
    "doc": "Determine whether the radio is checked or not. Default will be `false`.",
    "type": "boolean",
    "status": "optional"
  },
  "group": {
    "doc": "Use a unique group identifier to define the Radio buttons that belongs together.",
    "type": "string",
    "status": "optional"
  },
  "size": {
    "doc": "The size of the Radio button. For now there is **medium** (default) and **large**.",
    "type": ["medium", "large"],
    "status": "optional"
  },
  "label": {
    "doc": "Use either the `label` property or provide a custom one.",
    "type": "React.ReactNode",
    "status": "optional"
  },
  "label_position": {
    "doc": "Defines the position of the `label`. Use either `left` or `right`. Defaults to `right`.",
    "type": ["left", "right"],
    "status": "optional"
  },
  "label_sr_only": {
    "doc": "Use `true` to make the label only readable by screen readers.",
    "type": "boolean",
    "status": "optional"
  },
  "status": {
    "doc": "Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.",
    "type": ["error", "info", "boolean"],
    "status": "optional"
  },
  "status_state": {
    "doc": "Defines the state of the status. It's two statuses `[error, info]`. Defaults to `error`.",
    "type": ["error", "info"],
    "status": "optional"
  },
  "status_props": {
    "doc": "Use an object to define additional FormStatus properties.",
    "type": "Various",
    "status": "optional"
  },
  "globalStatus": {
    "doc": "The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).",
    "type": "Various",
    "status": "optional"
  },
  "innerRef": {
    "doc": "By providing a React.ref we can get the internally used input element (DOM). E.g. `innerRef={myRef}` by using `React.createRef()` or `React.useRef()`.",
    "type": "React.RefObject",
    "status": "optional"
  }
}
```

## `Radio.Group` properties

```json
{
  "value": {
    "doc": "Defines the pre-selected Radio button. The value has to match the one provided in the Radio button. Use a string value.",
    "type": "string",
    "status": "optional"
  },
  "name": {
    "doc": "Custom grouping name. Defaults to a random name.",
    "type": "string",
    "status": "optional"
  },
  "layout_direction": {
    "doc": "Define the layout direction of the Radio buttons. Can be either `column` or `row`. Defaults to `column`.",
    "type": ["column", "row"],
    "status": "optional"
  },
  "size": {
    "doc": "The size of the Radio button. For now there is **medium** (default) and **large**.",
    "type": ["medium", "large"],
    "status": "optional"
  },
  "status": {
    "doc": "Uses the `form-status` component to show failure messages.",
    "type": ["string", "boolean"],
    "status": "optional"
  },
  "status_state": {
    "doc": "Defines the state of the status. It's two statuses `[error, info]`. Defaults to `error`.",
    "type": ["error", "info"],
    "status": "optional"
  },
  "status_props": {
    "doc": "Use an object to define additional FormStatus properties.",
    "type": "Various",
    "status": "optional"
  },
  "globalStatus": {
    "doc": "The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).",
    "type": "Various",
    "status": "optional"
  },
  "label": {
    "doc": "Use either the `label` property or provide a custom one.",
    "type": "React.ReactNode",
    "status": "optional"
  },
  "label_direction": {
    "doc": "To define the `label` layout direction on how the next element should be placed on. Can be either `vertical` or `horizontal`. Defaults to `horizontal`.",
    "type": ["vertical", "horizontal"],
    "status": "optional"
  },
  "label_sr_only": {
    "doc": "Use `true` to make the label only readable by screen readers.",
    "type": "boolean",
    "status": "optional"
  },
  "vertical": {
    "doc": "Will force both `direction` and `label_direction` to be **vertical** if set to `true`.",
    "type": "boolean",
    "status": "optional"
  }
}
```

### Radio group Context

You can also pass through `label_position` and some more **Radio button** properties to the Group. This way all nested Radio buttons will get the properties.

## `Radio` events

```json
{
  "on_change": {
    "doc": "Will be called on state changes made by the user. Returns an object `{ checked, value, event }`.",
    "type": "function",
    "status": "optional"
  }
}
```

## `Radio.Group` events

```json
{
  "on_change": {
    "doc": "Will be called once a Radio button changes the state. Returns an object `{ value, event }`.",
    "type": "function",
    "status": "optional"
  }
}
```
