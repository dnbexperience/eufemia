---
title: 'Checkbox'
description: 'The Checkbox component is shown as a square box that is ticked (checked) when activated.'
version: 11.2.0
generatedAt: 2026-05-08T07:25:36.622Z
checksum: bb164c6a3535a7ad04203332e51a918cfe8e20dd89520b0925d627f9db05e9f0
---

# Checkbox

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

## Accessibility

Checkbox components use semantic `<input type="checkbox">` elements, ensuring full keyboard accessibility (Space to toggle) and proper state announcement by screen readers. Labels are properly associated using `htmlFor` attributes.


## Demos

### Unchecked Checkbox (default state)


```tsx
render(<Checkbox label="Checkbox" onChange={e => console.log(e)} />)
```


### Checked Checkbox, left label position


```tsx
render(<Checkbox label="Label" labelPosition="left" checked onChange={({
  checked
}) => console.log(checked)} />)
```


### Checked Checkbox with error message


```tsx
render(<Checkbox label="Checkbox" checked status="Error message" />)
```


### Checkbox with suffix


```tsx
render(<Checkbox label="Checkbox" checked suffix={<HelpButton title="Modal Title">Modal content</HelpButton>} />)
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
render(<Checkbox label="Checkbox" onClick={event => {
  event.preventDefault();
}} onChange={({
  checked
}) => console.log('onChange', checked)} />)
```


### Disabled checkbox


```tsx
render(<Checkbox checked disabled />)
```


### Indeterminate state (partially checked)

The checkbox offers a fully controlled indeterminate state.

Here is an indeterminate state [working example](/uilib/extensions/forms/base-fields/Indeterminate).


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
render(<ShowBoundingArea>
    <ComponentBox data-visual-test="checkbox-bounding">
      <Checkbox label="Checkbox" checked />
    </ComponentBox>
  </ShowBoundingArea>)
```

## Properties


```json
{
  "props": {
    "checked": {
      "doc": "Determine whether the checkbox is checked or not. The default is `false`.",
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
      "doc": "The size of the checkbox. For now there is `medium` (default) and `large`.",
      "type": [
        "\"default\"",
        "\"medium\"",
        "\"large\""
      ],
      "status": "optional"
    },
    "indeterminate": {
      "doc": "Controls the checkbox indeterminate (partial) state.",
      "type": "boolean",
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
      "doc": "Use an object to define additional FormStatus properties. See [FormStatus](/uilib/components/form-status/properties/).",
      "type": "FormStatusProps",
      "status": "optional"
    },
    "globalStatus": {
      "doc": "The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).",
      "type": "object",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
      "type": "boolean",
      "status": "optional"
    },
    "suffix": {
      "doc": "Text describing the content of the Checkbox more than the label. You can also send in a React component, so it gets wrapped inside the Checkbox component.",
      "type": "React.ReactNode",
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
      "type": "({ checked: boolean; event: ChangeEvent }) => void",
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
