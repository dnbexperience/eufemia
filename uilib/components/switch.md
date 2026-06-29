---
title: 'Switch'
description: 'Use Switch when people can turn one setting on or off.'
version: 11.8.1
generatedAt: 2026-06-29T11:30:03.706Z
checksum: e288cce458a9b54ddbb5f5d40392a7f958ceb267c5d4fcb59e172bd5f8205a0e
---

# Switch

## Import

```tsx
import { Switch } from '@dnb/eufemia'
```

## Description

_Also known as a toggle switch or toggle._

The Switch component (toggle) is a digital on/off switch. Toggle switches are best used for changing system functionalities and preferences. "Toggles may replace two radio buttons or a single checkbox to allow users to choose between two opposing states." – [Source][1]

You may also check out the [Checkbox](/uilib/components/checkbox) component.

## When to use Switch vs Eufemia Forms


# When to use Eufemia Forms

Classic form components like this one are presentational controls. They handle the styling, sizing, icons, and basic events, while you manage their value, validation, and error handling yourself.

For most data input and forms situations, use [Eufemia Forms](/uilib/extensions/forms/) fields instead. They build on these same components, but add data handling, validation, and error messages through the surrounding [Form.Handler](/uilib/extensions/forms/Form/Handler/). Browse the [field components](/uilib/extensions/forms/all-fields/) to find the one that matches your data.

Reach for a classic component when you need it standalone outside of a form context, or when you handle the value and validation yourself.


The Eufemia Forms equivalent of `Switch` is [Field.Boolean](/uilib/extensions/forms/base-fields/Boolean/) with the switch variant (`variant="switch"`), or [Field.Toggle](/uilib/extensions/forms/base-fields/Toggle/) for toggling between two values.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=4243-1493)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/switch)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/switch)

## Accessibility

The Switch component uses a semantic checkbox input with `role="switch"` to properly communicate its toggle functionality. It is keyboard accessible (Space to toggle) and announces its current state to screen readers.

## How it **should** work

"Toggle switches should take immediate effect and should not require the user to click Save or Submit to apply the new state. As always, we should strive to match the system to the real world." – [Source][1]

### When not to use

Do not use a toggle switch if the user is required to click Save or Update to apply the new state.

## Good practices

"The toggle labels should describe what the control will do when the switch is on; they should not be neutral or ambiguous. When in doubt, say the label aloud and append 'on/off' to the end. If it doesn't make sense, then rewrite the label." – [Source][1]

The label should describe what the toggle will do when the switch is on.

[1]: https://www.nngroup.com/articles/toggle-switch-guidelines/


## Related components

Switch is part of the [Input](/uilib/components/overview/#input) category. Other components for similar needs:

- [Autocomplete](/uilib/components/autocomplete/) – to help people find and choose from matching suggestions as they type.
- [Checkbox](/uilib/components/checkbox/) – when people can turn one or more options on or off.
- [DatePicker](/uilib/components/date-picker/) – when people need to choose one date or a date range.
- [Dropdown](/uilib/components/dropdown/) – when people need to choose one option from a list.
- [Filter](/uilib/components/filter/) – to help people narrow down a list or data set.
- [FormLabel](/uilib/components/form-label/) – to name an input, control, or form-related field.

[See all in Input](/uilib/components/overview/#input)


## Demos

### Unchecked Switch


```tsx
render(<Switch label="Switch" onChange={console.log} />)
```


### Checked Switch


```tsx
render(<Switch label="Label" labelPosition="left" checked onChange={({
  checked
}) => console.log(checked)} />)
```


### Checked Switch with error message


```tsx
render(<Switch label="Switch" checked status="Error message" />)
```


### Switch with suffix


```tsx
render(<Switch label="Switch" checked suffix={<HelpButton title="Modal Title">Modal content</HelpButton>} />)
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

## Properties


```json
{
  "props": {
    "checked": {
      "doc": "Determine whether the switch is checked or not. The default will be `false`.",
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
      "type": "React.ReactNode",
      "status": "optional"
    },
    "labelPosition": {
      "doc": "Defines the position of the `label`. Use either `left` or `right`. Defaults to `right`.",
      "type": [
        "\"left\"",
        "\"right\""
      ],
      "status": "optional"
    },
    "labelSrOnly": {
      "doc": "Use `true` to make the label only readable by screen readers.",
      "type": "boolean",
      "status": "optional"
    },
    "size": {
      "doc": "The size of the switch. For now there are `medium` (default) and `large`.",
      "type": [
        "\"default\"",
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
      "doc": "Defines the state of the status. Defaults to `error`.",
      "type": [
        "\"error\"",
        "\"warning\"",
        "\"information\"",
        "\"success\"",
        "\"marketing\""
      ],
      "status": "optional"
    },
    "statusProps": {
      "doc": "Use an object to define additional [FormStatus](/uilib/components/form-status/properties/) properties.",
      "type": "FormStatus",
      "status": "optional"
    },
    "globalStatus": {
      "doc": "The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).",
      "type": "GlobalStatus",
      "status": "optional"
    },
    "suffix": {
      "doc": "Text describing the content of the Switch more than the label. You can also send in a React component, so it gets wrapped inside the Switch component.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
      "type": "boolean",
      "status": "optional"
    },
    "ref": {
      "doc": "By providing a `React.Ref` we can get the internally used input element (DOM), e.g. `ref={myRef}` by using `React.useRef(null)`.",
      "type": "React.RefObject",
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

## Events


```json
{
  "props": {
    "onChange": {
      "doc": "Will be called on state changes made by the user.",
      "type": "({ checked: boolean; event }) => void",
      "status": "optional"
    },
    "onChangeEnd": {
      "doc": "Will be called on state changes made by the user, but with a delay. This way the user sees the animation before e.g. an error will be removed. Returns a boolean { checked, event }.",
      "type": "({ checked: boolean; event }) => void",
      "status": "optional"
    },
    "onClick": {
      "doc": "Will be called on click.",
      "type": "({ checked: boolean; event: MouseEvent, preventDefault: () => void }) => void",
      "status": "optional"
    }
  }
}
```
