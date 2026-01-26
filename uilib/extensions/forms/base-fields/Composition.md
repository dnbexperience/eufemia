---
title: 'Field.Composition'
description: '`Field.Composition` is a component for when you create a field block that contains of several existing fields.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.261Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Field.Composition

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Composition />)
```

## Description

`Field.Composition` is a component for when you create a field block that contains of several existing fields. It uses [FieldBlock](/uilib/extensions/forms/create-component/FieldBlock/) under the hood.

The composition field serves the purpose of managing layout and status messages, with a strong focus on accessibility. More on that topic down below.

There is a corresponding [Value.Composition](/uilib/extensions/forms/Value/Composition) component that can be used for [value](/uilib/extensions/forms/Value/) components.

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'

render(
  <Field.Composition>
    <Field.String label="Field A" />
    <Field.String Label="Field B" />
  </Field.Composition>
)
```

When each field inside your composition is horizontally aligned for larger screens, they will wrap to a vertical layout for smaller screens.

If each of the fields have a label, the labels should ideally be top aligned. But when one of the labels contain more text than fits into one line, the fields will be bottom aligned.

In the demo section you find an [example](#composition-field-with-error) on how to handle form states.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/base-fields/Composition)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/base-fields/Composition)

## Messages

Messages that appears to be the same, will be grouped together and announced as one message.

You can also show an `error`, `warning` or `info` message at the same time.

```jsx
import { Field } from '@dnb/eufemia/extensions/forms'

render(
  <Field.Composition error="Shared error at the bottom">
    <Field.String />
    <Field.String />
  </Field.Composition>
)
```

## Accessibility

When using the `error`, `warning` or `info` property, the displayed [FormStatus](/uilib/components/form-status) components will be placed in the DOM before the content of the form elements itself.

Furthermore, the status messages are linked to the corresponding form elements using `aria-describedby` when [useFieldProps](/uilib/extensions/forms/create-component/useFieldProps) is used in conjunction.

This will allow screen readers to find and announce the error message properly.

## Demos

### Composition field

You may adjust the widths to your needs.

```tsx
render(
  <Field.Composition info="Info at the bottom" width="large">
    <Field.String label="Field A with a long label" width="medium" />
    <Field.String label="Field B" width="stretch" />
  </Field.Composition>
)
```

### Composition with a label

```tsx
render(
  <Field.Composition label="A legend for the fieldset" width="large">
    <Field.String label="Field label" width="stretch" />
    <Field.Number width="small" placeholder="0000" />
  </Field.Composition>
)
```

### Composition of multiple statuses

```tsx
render(
  <Field.Composition label="Label text" info="FieldBlock info">
    <Field.String width="small" minLength={3} warning="Warning message" />
    <Field.Number minimum={10} info="Field info" />
  </Field.Composition>
)
```

### Composition field with error

```tsx
render(
  <Field.Composition
    error={new Error('Error at the bottom')}
    width="large"
  >
    <Field.String label="Field A" width="stretch" />
    <Field.String
      label="Field B with a long label that wraps"
      width="medium"
    />
  </Field.Composition>
)
```

### Alignment

```tsx
render(
  <Field.Composition label="Label text" align="center">
    <Field.Number width="small" defaultValue={0} showStepControls />
    <Field.Boolean />
  </Field.Composition>
)
```

```tsx
render(
  <Field.Composition
    label="A legend for the fieldset"
    width="large"
    help={{
      title: 'Help title',
      content: 'Help content',
      open: true,
    }}
  >
    <Field.String
      label="Field label"
      help={{
        title: 'Help title',
        content: 'Help content',
        open: true,
      }}
    />
    <Field.String
      label="Field label"
      width="stretch"
      help={{
        title: 'Help title',
        content: 'Help content',
        open: true,
      }}
    />
  </Field.Composition>
)
```

```tsx
render(
  <Flex.Stack>
    <Form.Card>
      <Form.SubHeading>Breaking word with 61 characters</Form.SubHeading>
      <Field.Composition label={sixtyOneChars}>
        <Field.String value="string" />
        <Field.String value="string" />
      </Field.Composition>
      <Field.Composition
        label={sixtyOneChars}
        help={{
          title: 'Help title',
          content: 'Help content',
        }}
      >
        <Field.String value="string" />
        <Field.String value="string" />
      </Field.Composition>
    </Form.Card>
    <Form.Card>
      <Form.SubHeading>
        Breaking a sentence of 61 characters that include a space
      </Form.SubHeading>
      <Field.Composition label={sixtyOneCharsIncludingASpace}>
        <Field.String value="string" />
        <Field.String value="string" />
      </Field.Composition>
      <Field.Composition
        label={sixtyOneCharsIncludingASpace}
        help={{
          title: 'Help title',
          content: 'Help content',
        }}
      >
        <Field.String value="string" />
        <Field.String value="string" />
      </Field.Composition>
    </Form.Card>
    <Form.Card>
      <Form.SubHeading>Help button should not wrap alone</Form.SubHeading>
      <Field.Composition
        label={fiftyEightCharsIncludingASpace}
        help={{
          title: 'Help title',
          content: 'Help content',
        }}
      >
        <Field.String value="string" />
        <Field.String value="string" />
      </Field.Composition>
    </Form.Card>
  </Flex.Stack>
)
```

## Properties

```json
{
  "label": {
    "doc": "Field label to show above / before the input feature.",
    "type": "string",
    "status": "optional"
  },
  "labelDescription": {
    "doc": "A more discreet text displayed beside the label (i.e for \"(optional)\").",
    "type": "string",
    "status": "optional"
  },
  "labelSrOnly": {
    "doc": "Use `true` to make the label only readable by screen readers.",
    "type": "boolean",
    "status": "optional"
  },
  "width": {
    "doc": "Will set the width for the whole block. Use `small`, `medium`, `large` for predefined standard widths. You can also set a custom width `{number}rem` or use `stretch` or `false`.",
    "type": ["string", "false"],
    "status": "optional"
  },
  "contentWidth": {
    "doc": "Will set the width for its contents. Use `small`, `medium`, `large` for predefined standard widths. You can also set a custom width `{number}rem` or use `stretch` or `false`.",
    "type": ["string", "false"],
    "status": "optional"
  },
  "disabled": {
    "doc": "Set `true` to make the inner [FormLabel](/uilib/components/form-label/) behave as disabled.",
    "type": "boolean",
    "status": "optional"
  },
  "help": {
    "doc": "Provide help content for the field using `title` and `content` as a string or React.Node. Additionally, you can set `open` to `true` to display the inline help, set the `breakout` property to `false` to disable the breakout of the inline help content, set `outset` to `false` to display the help text inline (inset) instead of the default outset behavior, or use `renderAs` set to `dialog` to render the content in a [Dialog](/uilib/components/dialog/) (recommended for larger amounts of content).",
    "type": "object",
    "status": "optional"
  },
  "align": {
    "doc": "`center` or `bottom` for aligning the contents vertically. Defaults to `bottom`.",
    "type": ["string", "false"],
    "status": "optional"
  },
  "[Space](/uilib/layout/space/properties)": {
    "doc": "Spacing properties like `top` or `bottom` are supported.",
    "type": ["string", "object"],
    "status": "optional"
  }
}
```
