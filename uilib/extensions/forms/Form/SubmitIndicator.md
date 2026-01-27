---
title: 'Form.SubmitIndicator'
description: '`Form.SubmitIndicator` lets you show an indicator while async form operations are performed.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:27.398Z
checksum: a39d076f906999737f2849a316a1da061f13658d996f615e37a75d8866950cba
---

# Form.SubmitIndicator

## Import

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.SubmitIndicator />)
```

## Description

`Form.SubmitIndicator` lets you show an indicator while async form operations are performed.

```jsx
import { Form } from '@dnb/eufemia/extensions/forms'

render(<Form.SubmitIndicator state="pending" />)
```

### Integration

The indicator is implemented by default in the [Form.SubmitButton](/uilib/extensions/forms/Form/SubmitButton/) and [FieldBlock](/uilib/extensions/forms/create-component/FieldBlock/) label. It will be displayed when the `onSubmit` event handler on the [Form.Handler](/uilib/extensions/forms/Form/Handler/) component is an async function. You can find some examples down below.

## Demos

### Default appearance

```tsx
render(<Form.SubmitIndicator state="pending" />)
```

### SubmitIndicator in a simple form

Press the "Send" button to see the submit indicator.

```tsx
const delay = debounceAsync(async function () {
  try {
    const request = createRequest()
    await request(1000) // Simulate a request
  } catch (error) {
    return error
  }
})
render(
  <Form.Handler onSubmit={delay}>
    <Form.Card>
      <Field.String path="/myField" label="Short label" />
      <Form.ButtonRow>
        <Form.SubmitButton />
        <Button variant="tertiary">Cancel</Button>
      </Form.ButtonRow>
    </Form.Card>
  </Form.Handler>
)
```

### SubmitIndicator with field validation

This example shows a combination of async validation and async change behavior, which could be used for e.g. **autosaving** the field value.

**NB:** if the indicator in the label does not have enough room, it will animate to a new line.

Make a change in the input field.

```tsx
const delay = debounceAsync(async function () {
  try {
    const request = createRequest()
    await request(1000) // Simulate a request
  } catch (error) {
    return error
  }
})
render(
  <Form.Handler onSubmit={delay} onChange={delay}>
    <Form.Card>
      <Field.String
        path="/myField1"
        label="Label (with async validation)"
        placeholder="Write something ..."
        onChangeValidator={delay}
      />
      <FieldBlock width="medium">
        <Field.String
          path="/myField2"
          width="stretch"
          label="This is a long label"
        />
      </FieldBlock>
      <Form.ButtonRow>
        <Form.SubmitButton />
        <Button variant="tertiary">Cancel</Button>
      </Form.ButtonRow>
    </Form.Card>
  </Form.Handler>
)
```

### Used in other components

```tsx
render(
  <Form.Handler>
    <Flex.Horizontal align="center">
      <Form.SubmitButton showIndicator />
      <Button variant="secondary" icon="chevron_right">
        Secondary
        <Form.SubmitIndicator state="pending" />
      </Button>
      <Button variant="tertiary">
        Tertiary
        <Form.SubmitIndicator state="pending" />
      </Button>
      <FormLabel>
        Label
        <Form.SubmitIndicator state="pending" />
      </FormLabel>
    </Flex.Horizontal>
  </Form.Handler>
)
```

### With a label

```tsx
render(
  <Form.Handler>
    <Form.SubmitIndicator state="pending" showLabel />
  </Form.Handler>
)
```

## Properties

```json
{
  "props": {
    "state": {
      "doc": "Provide `pending` to make the dots visible and `success` to show the checkmark icon.",
      "type": "string",
      "status": "required"
    },
    "showLabel": {
      "doc": "If `true`, the label will be shown. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "label": {
      "doc": "Provide a label that will be shown next to the indicator.",
      "type": "string",
      "status": "optional"
    },
    "children": {
      "doc": "If content is provided, the component will try to find out if the indicator needs to be put on a new row or not. This way it will animate the height nicely.",
      "type": "React.Node",
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

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "SubmitIndicator.label": {
      "nb-NO": "Vennligst vent",
      "en-GB": "Please wait",
      "sv-SE": "Vänligen vänta",
      "da-DK": "Vent venligst"
    }
  }
}
```
