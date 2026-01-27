---
title: 'Form.ButtonRow'
description: '`Form.ButtonRow` is a wrapper for horizontally separated buttons.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:27.243Z
checksum: d981eefdb45eafd168f036ff6bd5cdd6fd3f57f1495fb8fa4f65863b174d1723
---

# Form.ButtonRow

## Import

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.ButtonRow />)
```

## Description

`Form.ButtonRow` is a wrapper for horizontally separated buttons. Use it when you place two or more buttons together; a single button can be rendered directly without a ButtonRow.

```jsx
import { Form } from '@dnb/eufemia/extensions/forms'
render(
  <Form.Handler onSubmit={submitHandler}>
    ...
    <Form.ButtonRow>
      <Form.SubmitButton />
      <Button variant="secondary">Other button</Button>
    </Form.ButtonRow>
  </Form.Handler>
)
```

## Demos

### Without any surrounding layout

```tsx
render(
  <Form.ButtonRow>
    <Wizard.Buttons />
    <Button variant="secondary">Other button</Button>
  </Form.ButtonRow>
)
```

### In combination with a Layout

```tsx
render(
  <Form.Handler onSubmit={(data) => console.log('onSubmit', data)}>
    <Form.Card>
      <Field.Email />
      <Form.ButtonRow>
        <Form.SubmitButton icon={sendIcon} />
        <Button variant="secondary">Cancel</Button>
      </Form.ButtonRow>
    </Form.Card>
  </Form.Handler>
)
```

## Properties

```json
{
  "props": {
    "children": {
      "doc": "Buttons.",
      "type": "React.ReactNode",
      "status": "required"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```
