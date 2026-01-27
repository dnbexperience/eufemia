---
title: 'Textarea'
description: 'The Textarea component has to be used as a multi-line text input control with an unlimited number of characters possible.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:26.990Z
checksum: 28e0a3177d1224c5d1c079e9220e56f4b7c9e2104a850dd5c2394768613df906
---

# Textarea

## Import

```tsx
import { Textarea } from '@dnb/eufemia'
```

## Description

The Textarea component is a multi-line text input control with an unlimited number of characters.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=40922-2303)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/textarea)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/textarea)

### Browser autofill styling

When users insert values using autofill in their browser, the browser applies its own background and text colors. However, in contrast to the [Input](/uilib/components/input/info) component, Eufemia overwrites the `:autofill` background color to avoid a visually inconsistent gap around the writing area when autofill is used.

### Accessibility

Please avoid using the `maxlength` attribute whenever possible, as it is not accessible. Instead, use the `characterCounter` property.

This way, the user gets visual feedback on the number of characters entered and the maximum number of characters allowed, and it will not limit the user in their workflow.

You can still set the requirement for your desired maximum number of characters by setting the `maxLength` property in [Eufemia Forms](/uilib/extensions/forms/base-fields/String/).

```tsx
render(
  <Wrapper>
    <ComponentBox hideCode>
      <Form.Handler>
        <Form.Card>
          <Field.String
            label="Label"
            placeholder="Write more than 3 characters to demonstrate the limit"
            multiline
            maxLength={3}
            required
            characterCounter={{
              max: 3,
              variant: 'up',
            }}
          />
          <Form.SubmitButton text="Test" />
        </Form.Card>
      </Form.Handler>
    </ComponentBox>
  </Wrapper>
)
```

## Demos

### Textarea with rows and colds

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="textarea-default">
      <Textarea
        label="Default"
        rows="2"
        cols="20"
        value="Textarea value\nNewline"
        spellCheck={false}
        on_change={({ value }) => {
          console.log('on_change', value)
        }}
        on_focus={() => {
          console.log('on_focus')
        }}
        on_blur={() => {
          console.log('on_blur')
        }}
      />
    </ComponentBox>
  </Wrapper>
)
```

### Textarea with placeholder text

```tsx
render(
  <Wrapper>
    <ComponentBox>
      <Textarea label="Placeholder" placeholder="Placeholder text" />
    </ComponentBox>
  </Wrapper>
)
```

### Vertically placed label

```tsx
render(
  <Wrapper>
    <ComponentBox>
      <Textarea
        label="Vertical"
        label_direction="vertical"
        rows="3"
        cols="33"
        value="Textarea value with more than 3 lines\nNewline\nNewline\nNewline\nNewline"
      />
    </ComponentBox>
  </Wrapper>
)
```

### Stretched horizontally placed label

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="textarea-stretch">
      <Textarea
        label="Horizontal"
        stretch={true}
        rows="3"
        value="Nec litora inceptos vestibulum id interdum donec gravida."
      />
    </ComponentBox>
  </Wrapper>
)
```

### Autoresize with max rows

```tsx
render(
  <Wrapper>
    <ComponentBox>
      <Textarea
        label="Autogrow"
        rows={1}
        autoresize={true}
        autoresize_max_rows={4}
        placeholder="Placeholder"
        on_key_down={({ rows, event }) => {
          if (rows >= 4 && event.key === 'Enter') {
            event.preventDefault()
          }
        }}
      />
    </ComponentBox>
  </Wrapper>
)
```

### Character counter

Internally, the [TextCounter](/uilib/components/fragments/text-counter/) fragment is used to display the character counter.

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="textarea-character-counter">
      <Textarea
        label="Count characters"
        label_direction="vertical"
        autoresize
        value="Textarea value\nNewline"
        status="Message to the user"
        characterCounter={40}
      />
    </ComponentBox>
  </Wrapper>
)
```

### With FormStatus failure message

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="textarea-error">
      <Textarea
        label="Error Message"
        cols="33"
        value="Nec litora inceptos vestibulum id interdum donec gravida."
        status="Message to the user"
      />
    </ComponentBox>
  </Wrapper>
)
```

### Sizes

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="textarea-sizes">
      <Flex.Stack>
        <Textarea placeholder="Small size" size="small" rows={1} />
        <Textarea placeholder="Medium size" size="medium" rows={1} />
        <Textarea placeholder="Large size" size="large" rows={1} />
      </Flex.Stack>
    </ComponentBox>
  </Wrapper>
)
```

### Disabled textarea

```tsx
render(
  <Wrapper>
    <ComponentBox>
      <Textarea
        label="Disabled"
        disabled
        value="Nec litora inceptos vestibulum id interdum donec gravida."
      />
    </ComponentBox>
  </Wrapper>
)
```

### Textarea with a suffix

```tsx
render(
  <Wrapper>
    <ComponentBox>
      <Textarea
        label="Textarea with suffix"
        value="Nec litora inceptos vestibulum id interdum donec gravida."
        suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
      />
    </ComponentBox>
  </Wrapper>
)
```

## Properties

```json
{
  "props": {
    "value": {
      "doc": "The content value of the Textarea.",
      "type": "string",
      "status": "optional"
    },
    "align": {
      "doc": "Defines the `text-align` of the Textarea. Defaults to `left`.",
      "type": "string",
      "status": "optional"
    },
    "stretch": {
      "doc": "If set to `true`, then the Textarea field will be 100% in `width`.",
      "type": "boolean",
      "status": "optional"
    },
    "placeholder": {
      "doc": "The placeholder which shows up once the Textarea value is empty.",
      "type": "string",
      "status": "optional"
    },
    "keepPlaceholder": {
      "doc": "Use `true` to keep the placeholder visible even when the Textarea has focus. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "label": {
      "doc": "Prepends the Form Label component. If no ID is provided, a random ID is created.",
      "type": "string",
      "status": "optional"
    },
    "label_direction": {
      "doc": "Use `label_direction=\"vertical\"` to change the label layout direction. Defaults to `horizontal`.",
      "type": "string",
      "status": "optional"
    },
    "suffix": {
      "doc": "Text describing the content of the Textarea more than the label. You can also send in a React component, so it gets wrapped inside the Textarea component.",
      "type": "string",
      "status": "optional"
    },
    "label_sr_only": {
      "doc": "Use `true` to make the label only readable by screen readers.",
      "type": "boolean",
      "status": "optional"
    },
    "autoresize": {
      "doc": "Use `true` to make the Textarea grow and shrink depending on how many lines the user has filled.",
      "type": "boolean",
      "status": "optional"
    },
    "autoresize_max_rows": {
      "doc": "Set a number to define how many rows the Textarea can auto grow.",
      "type": "number",
      "status": "optional"
    },
    "characterCounter": {
      "doc": "Use a number to define the displayed max length. You can also use an object defining the [TextCounter](uilib/components/fragments/text-counter/) `variant` or properties. Please avoid using `maxLength` for accessibility reasons.",
      "type": ["number", "object"],
      "status": "optional"
    },
    "size": {
      "doc": "The sizes you can choose for 1 row is `small` (2rem), `medium` (2.5rem) and `large` (3rem). Defaults to `small`.",
      "type": "string",
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
    "textarea_state": {
      "doc": "To control the visual focus state as a prop, like `focus` or `blur`.",
      "type": "string",
      "status": "optional"
    },
    "inner_ref": {
      "doc": "By providing a React.Ref we can get the internally used Textarea element (DOM). E.g. `inner_ref={myRef}` by using `React.createRef()` or `React.useRef()`.",
      "type": "React.RefObject",
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
}
```

### Set Textarea height

You can set the height of a Textarea by both CSS styles or the `rows` attribute.

## Events

```json
{
  "props": {
    "on_change": {
      "doc": "Will be called on value changes made by the user. Returns an object with a string value and the native event: `{ value, rows, event }`.",
      "type": "function",
      "status": "optional"
    },
    "on_focus": {
      "doc": "Will be called on the focus set by the user. Returns `{ value, event }`.",
      "type": "function",
      "status": "optional"
    },
    "on_blur": {
      "doc": "Will be called on blur set by the user. Returns `{ value, event }`.",
      "type": "function",
      "status": "optional"
    },
    "on_key_down": {
      "doc": "Will be called during every keystroke. Returns `{ value, rows, event }`.",
      "type": "function",
      "status": "optional"
    }
  }
}
```
