---
title: 'Form.SubmitButton'
description: '`Form.SubmitButton` connects to the `Form.Handler` to submit the active state of the internal DataContext, triggering `onSubmit`.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:27.387Z
checksum: 94297868c7fcb391480f7508ca2e4c349769a80809b5b456b395fddb66bb86b6
---

# Form.SubmitButton

## Import

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.SubmitButton />)
```

## Description

`Form.SubmitButton` connects to the [Form.Handler](/uilib/extensions/forms/Form/Handler/) to submit the active state of the internal [DataContext](/uilib/extensions/forms/DataContext/), triggering `onSubmit`.

The default button type is `type="submit"`, ready to be used with the [Form.Handler](/uilib/extensions/forms/Form/Handler).

```jsx
import { Form } from '@dnb/eufemia/extensions/forms'
render(
  <Form.Handler>
    <Form.ButtonRow>
      <Form.SubmitButton />
    </Form.ButtonRow>
  </Form.Handler>
)
```

## Demos

### Standard text

```tsx
render(
  <Form.Handler
    data={{
      foo: 'bar',
    }}
    onSubmit={(data) => console.log('onSubmit', data)}
  >
    <Form.SubmitButton />
  </Form.Handler>
)
```

### Send variant

```tsx
render(
  <Form.Handler
    data={{
      foo: 'bar',
    }}
    onSubmit={(data) => console.log('onSubmit', data)}
  >
    <Form.SubmitButton variant="send" />
  </Form.Handler>
)
```

### With SubmitIndicator

Example of showing the [Form.SubmitIndicator](/uilib/extensions/forms/Form/SubmitIndicator/) with the property `showSubmitIndicator` set to `true`.

When using the submit button inside [Form.Handler](/uilib/extensions/forms/Form/Handler/) you can use an async `onSubmit` event handler to show a loading indicator when the form is submitting.

```tsx
render(
  <Form.Handler>
    <Form.SubmitButton showIndicator />
  </Form.Handler>
)
```

## Properties

```json
{
  "props": {
    "variant": {
      "doc": "Use `send` to show the send icon, or `secondary` for secondary button styling.",
      "type": "string",
      "status": "optional"
    },
    "showIndicator": {
      "doc": "Show the submit indicator.",
      "type": "boolean",
      "status": "optional"
    },
    "[Button](/uilib/components/button/properties)": {
      "doc": "All button properties.",
      "type": "Various",
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
    "SubmitButton.sendText": {
      "nb-NO": "Send inn",
      "en-GB": "Send",
      "sv-SE": "Skicka in",
      "da-DK": "Indsend"
    },
    "SubmitButton.text": {
      "nb-NO": "Send",
      "en-GB": "Send",
      "sv-SE": "Skicka",
      "da-DK": "Send"
    }
  }
}
```
