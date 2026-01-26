---
title: 'ToggleButton'
description: 'The ToggleButton component should be used to toggle on or off a limited number of choices.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:26.585Z
checksum: f50f67f95eb854b98659587f27b66b3e57d1dc5d1f97eb61321f8e7356afafef
---

# ToggleButton

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
  />
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
  </ToggleButton.Group>
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
  </ToggleButton.Group>
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
  </ToggleButton.Group>
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
  </ToggleButton.Group>
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
  </ToggleButton.Group>
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
  </ToggleButton.Group>
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
  </ToggleButton.Group>
)
```

### ToggleButtons with icons only

```tsx
render(
  <ToggleButton.Group label="Icons only">
    <ToggleButton icon="bell" value="first" checked />
    <ToggleButton icon="loupe" value="second" />
    <ToggleButton icon="calendar" value="third" />
  </ToggleButton.Group>
)
```

## `ToggleButton` properties

```json
{
  "value": {
    "doc": "Defines the `value` as a string. Use it to get the value during the `on_change` event listener callback in the **ToggleButtonGroup**.",
    "type": "string",
    "status": "required"
  },
  "text": {
    "doc": "The text shown in the ToggleButton.",
    "type": "string",
    "status": "required"
  },
  "checked": {
    "doc": "Determine whether the ToggleButton is checked or not. The default will be `false`.",
    "type": "boolean",
    "status": "optional"
  },
  "title": {
    "doc": "The `title` of the input - describing it a bit further for accessibility reasons.",
    "type": "string",
    "status": "optional"
  },
  "label": {
    "doc": "Use either the `label` property or provide a custom one.",
    "type": "string",
    "status": "optional"
  },
  "icon": {
    "doc": "Icon to be included in the toggle button.",
    "type": ["string", "React.ReactNode"],
    "status": "optional"
  },
  "icon_position": {
    "doc": "Position of the icon inside the toggle button. Set to `left` or `right`. Defaults to `right` if not set.",
    "type": ["left", "right"],
    "status": "optional"
  },
  "icon_size": {
    "doc": "Define icon width and height. Defaults to `16px`.",
    "type": "string",
    "status": "optional"
  },
  "tooltip": {
    "doc": "Provide a string or a React Element to be shown as the tooltip content.",
    "type": ["string", "React.ReactNode"],
    "status": "optional"
  },
  "size": {
    "doc": "The size of the button. For now there is `small`, `medium`, `default` and `large`.",
    "type": ["small", "medium", "default", "large"],
    "status": "optional"
  },
  "status": {
    "doc": "Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.",
    "type": ["error", "info", "boolean"],
    "status": "optional"
  },
  "status_state": {
    "doc": "Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.",
    "type": ["error", "info"],
    "status": "optional"
  },
  "status_props": {
    "doc": "Use an object to define additional FormStatus properties.",
    "type": "object",
    "status": "optional"
  },
  "globalStatus": {
    "doc": "The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).",
    "type": "object",
    "status": "optional"
  },
  "suffix": {
    "doc": "Text describing the content of the ToggleButton more than the label. You can also send in a React component, so it gets wrapped inside the ToggleButton component.",
    "type": ["string", "React.ReactNode"],
    "status": "optional"
  },
  "skeleton": {
    "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
    "type": "boolean",
    "status": "optional"
  },
  "[Space](/uilib/layout/space/properties)": {
    "doc": "Spacing properties like `top` or `bottom` are supported.",
    "type": ["string", "object"],
    "status": "optional"
  }
}
```

## `ToggleButton.Group` properties

```json
{
  "value": {
    "doc": "Defines the pre-selected ToggleButton button. The value has to match the one provided in the ToggleButton button. Use a string value.",
    "type": "string",
    "status": "optional"
  },
  "values": {
    "doc": "Defines the pre-selected ToggleButton buttons in `multiselect` mode. The values have to match the one provided in the ToggleButton buttons. Use array, either as JS or JSON string.",
    "type": "array",
    "status": "optional"
  },
  "multiselect": {
    "doc": "Defines if the ToggleButton's should act as a multi-selectable list of toggle buttons. Defaults to `false`.",
    "type": "boolean",
    "status": "optional"
  },
  "layout_direction": {
    "doc": "Define the layout direction of the ToggleButton buttons. Can be either `column` or `row`. Defaults to `column`.",
    "type": ["column", "row"],
    "status": "optional"
  },
  "title": {
    "doc": "The `title` of group, describing it a bit further for accessibility reasons.",
    "type": "string",
    "status": "optional"
  },
  "status": {
    "doc": "Uses the `form-status` component to show failure messages.",
    "type": ["error", "info", "boolean"],
    "status": "optional"
  },
  "status_state": {
    "doc": "Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.",
    "type": ["error", "info"],
    "status": "optional"
  },
  "status_props": {
    "doc": "Use an object to define additional FormStatus properties.",
    "type": "object",
    "status": "optional"
  },
  "globalStatus": {
    "doc": "The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).",
    "type": "object",
    "status": "optional"
  },
  "label": {
    "doc": "Use either the `label` property or provide a custom one.",
    "type": "string",
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
  },
  "suffix": {
    "doc": "Text describing the content of the ToggleButtonGroup more than the label. You can also send in a React component, so it gets wrapped inside the ToggleButtonGroup component.",
    "type": "string",
    "status": "optional"
  },
  "skeleton": {
    "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
    "type": "boolean",
    "status": "optional"
  },
  "[Space](/uilib/layout/space/properties)": {
    "doc": "Spacing properties like `top` or `bottom` are supported.",
    "type": ["string", "object"],
    "status": "optional"
  }
}
```

## `ToggleButton` events

```json
{
  "on_change": {
    "doc": "Will be called on state changes made by the user. Returns a boolean and string `{ checked, value, event }`.",
    "type": "function",
    "status": "optional"
  }
}
```

## `ToggleButton.Group` events

```json
{
  "on_change": {
    "doc": "Will be called once a ToggleButton button changes the state. Returns an object `{ value, values, event }`. <br /><br /> **NB**: `values` is only available if `multiselect` is used / true.",
    "type": "function",
    "status": "optional"
  }
}
```
