---
title: 'ToggleButton'
description: 'The ToggleButton component should be used to toggle on or off a limited number of choices.'
version: 11.2.2
generatedAt: 2026-05-11T08:17:55.289Z
checksum: 353894e3b19029b335e5ff143d3d62ae26b3ffbd961810568cf2141082dc8824
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

## Accessibility

ToggleButton components use `role="button"` with `aria-pressed` to communicate their state to assistive technologies. When used in a group, navigation between buttons is possible using arrow keys, following standard toolbar interaction patterns.

You can use the React component `<ToggleButton.Group>` to wrap several `ToggleButton` components. This makes it easier to handle the `onChange` event at a higher level, as well as several other [context-related properties](/uilib/components/toggle-button/properties).

By default, the `ToggleButton.Group` is single-select, like a [Radio](/uilib/components/radio) button. However, you can easily enable `multiselect` as well.

## How to use

You can use the ToggleButton in different modes. Either as a stand-alone component or together with the `ToggleButton.Group` context.

### Multi-select

If `multiselect` is enabled on the group, several items can be enabled or disabled by the user.

You need to decide if you want to track the state yourself by using the `checked` property, or if you want to listen to the internal state with `onChange(({ values }) => console.log(values))`. In this case, you also need to give every item a `value` property.


## Demos

### Unchecked ToggleButton


```tsx
render(<ToggleButton label="Label" text="Toggle Me" />)
```


### Checked ToggleButton


```tsx
render(<ToggleButton label="Label" text="Checked ToggleButton" checked onChange={({
  checked
}) => {
  console.log('onChange', checked);
}} />)
```


### Default ToggleButton group


```tsx
render(<ToggleButton.Group label="ToggleButton Group" value="first" onChange={({
  value
}) => {
  console.log('onChange', value);
}}>
      <ToggleButton text="First" value="first" />
      <ToggleButton text="Second" value="second" />
      <ToggleButton text="Third" value="third" />
    </ToggleButton.Group>)
```


### Multi-select ToggleButton group


```tsx
render(<ToggleButton.Group label="Multi-select" multiselect={true} values={['first', 'third']} onChange={({
  values
}) => {
  console.log('onChange', values);
}}>
      <ToggleButton text="First" value="first" />
      <ToggleButton text="Second" value="second" />
      <ToggleButton text="Third" value="third" />
    </ToggleButton.Group>)
```


### Vertical aligned ToggleButton group with `checkbox` variant and `multiselect`


```tsx
render(<ToggleButton.Group label="Vertical Group" layoutDirection="column" multiselect={true} variant="checkbox" onChange={({
  values
}) => {
  console.log('onChange', values);
}}>
      <ToggleButton text="First" value="first" />
      <ToggleButton text="Second" value="second" />
      <ToggleButton text="Third" value="third" checked />
    </ToggleButton.Group>)
```


### ToggleButton group as `multiselect` with a status message


```tsx
render(<ToggleButton.Group label="ToggleButton Group with status" status="Error message" multiselect={true} onChange={({
  values
}) => {
  console.log('onChange', values);
}}>
      <ToggleButton text="First" value="first" />
      <ToggleButton text="Second" value="second" checked />
      <ToggleButton text="Third" value="third" checked={true} />
    </ToggleButton.Group>)
```


### ToggleButton with status messages and a group variant as `radio`


```tsx
render(<ToggleButton.Group label="ToggleButtons with status" variant="radio" onChange={({
  value
}) => {
  console.log('onChange', value);
}}>
      <ToggleButton text="First" value="first" status="error" />
      <ToggleButton text="Second" value="second" checked status="Error message" />
      <ToggleButton text="Third" value="third" status="Info message" statusState="information" />
    </ToggleButton.Group>)
```


### Disabled ToggleButton group


```tsx
render(<ToggleButton.Group label="Disabled Group" disabled value="first" variant="checkbox">
      <ToggleButton text="First" value="first" />
      <ToggleButton text="Second" value="second" />
      <ToggleButton text="Third" value="third" checked />
    </ToggleButton.Group>)
```


### ToggleButtons with a suffix


```tsx
render(<ToggleButton.Group label="With suffixes" suffix={<HelpButton title="Group suffix">Group suffix</HelpButton>}>
      <ToggleButton text="First" value="first" />
      <ToggleButton text="Second" value="second" status="Error message" suffix={<HelpButton title="Button suffix">Button suffix</HelpButton>} />
      <ToggleButton text="Third" value="third" checked />
    </ToggleButton.Group>)
```


### ToggleButtons with icons only


```tsx
render(<ToggleButton.Group label="Icons only">
      <ToggleButton icon="bell" value="first" checked />
      <ToggleButton icon="loupe" value="second" />
      <ToggleButton icon="calendar" value="third" />
    </ToggleButton.Group>)
```

## `ToggleButton` properties


```json
{
  "props": {
    "value": {
      "doc": "Defines the `value`. Use it to get the value during the `onChange` event listener callback in the **ToggleButtonGroup**.",
      "type": [
        "string",
        "number",
        "object",
        "Array"
      ],
      "status": "optional"
    },
    "text": {
      "doc": "The text shown in the ToggleButton.",
      "type": [
        "string",
        "React.ReactNode"
      ],
      "status": "optional"
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
      "type": [
        "string",
        "React.ReactNode"
      ],
      "status": "optional"
    },
    "iconPosition": {
      "doc": "Position of the icon inside the toggle button. Set to `left` or `right`. Defaults to `right` if not set.",
      "type": [
        "\"left\"",
        "\"right\""
      ],
      "status": "optional"
    },
    "iconSize": {
      "doc": "Define icon width and height. Defaults to `16px`.",
      "type": "string",
      "status": "optional"
    },
    "tooltip": {
      "doc": "Provide a string or a React Element to be shown as the tooltip content.",
      "type": [
        "string",
        "React.ReactNode"
      ],
      "status": "optional"
    },
    "size": {
      "doc": "The size of the button. There is `default`, `small`, `medium` and `large`. The `tertiary` button officially supports only default and large. Changing the size mainly affects spacing, but the large tertiary button also has a larger font size.",
      "type": [
        "\"default\"",
        "\"small\"",
        "\"medium\"",
        "\"large\""
      ],
      "status": "optional"
    },
    "status": {
      "doc": "Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.",
      "type": [
        "\"error\"",
        "\"information\"",
        "boolean"
      ],
      "status": "optional"
    },
    "statusState": {
      "doc": "Defines the state of the status. Currently, there are two statuses `[error, information]`. Defaults to `error`.",
      "type": [
        "\"error\"",
        "\"information\""
      ],
      "status": "optional"
    },
    "statusProps": {
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
      "type": [
        "string",
        "React.ReactNode"
      ],
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
      "type": "boolean",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  }
}
```


## `ToggleButton.Group` properties


```json
{
  "props": {
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
    "layoutDirection": {
      "doc": "Define the layout direction of the ToggleButton buttons. Can be either `column` or `row`. Defaults to `row`.",
      "type": [
        "\"column\"",
        "\"row\""
      ],
      "status": "optional"
    },
    "title": {
      "doc": "The `title` of group, describing it a bit further for accessibility reasons.",
      "type": "string",
      "status": "optional"
    },
    "status": {
      "doc": "Uses the `form-status` component to show failure messages.",
      "type": [
        "\"error\"",
        "\"information\"",
        "boolean"
      ],
      "status": "optional"
    },
    "statusState": {
      "doc": "Defines the state of the status. Currently, there are two statuses `[error, information]`. Defaults to `error`.",
      "type": [
        "\"error\"",
        "\"information\""
      ],
      "status": "optional"
    },
    "statusProps": {
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
    "labelDirection": {
      "doc": "To define the `label` layout direction on how the next element should be placed on. Can be either `vertical` or `horizontal`. Defaults to `vertical`.",
      "type": [
        "\"vertical\"",
        "\"horizontal\""
      ],
      "status": "optional"
    },
    "labelSrOnly": {
      "doc": "Use `true` to make the label only readable by screen readers.",
      "type": "boolean",
      "status": "optional"
    },
    "vertical": {
      "doc": "Will force both `direction` and `labelDirection` to be `vertical` if set to `true`.",
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
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  }
}
```

## `ToggleButton` events


```json
{
  "props": {
    "onChange": {
      "doc": "Will be called on state changes made by the user. Returns a boolean and string `{ checked, value, event }`.",
      "type": "function",
      "status": "optional"
    }
  }
}
```


## `ToggleButton.Group` events


```json
{
  "props": {
    "onChange": {
      "doc": "Will be called once a ToggleButton button changes the state. Returns an object `{ value, values, event }`. <br /><br /> **NB**: `values` is only available if `multiselect` is used / true.",
      "type": "function",
      "status": "optional"
    }
  }
}
```
