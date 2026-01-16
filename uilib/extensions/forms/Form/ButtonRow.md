---
title: 'ButtonRow'
description: '`Form.ButtonRow` is a wrapper for horizontally separated buttons.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Form/ButtonRow/metadata.json
---

## Import

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.ButtonRow />)
```

## Description

`Form.ButtonRow` is a wrapper for horizontally separated buttons.

```jsx
import { Form } from '@dnb/eufemia/extensions/forms'
render(
  <Form.Handler onSubmit={submitHandler}>
    ...
    <Form.ButtonRow>
      <Form.SubmitButton />
    </Form.ButtonRow>
  </Form.Handler>,
)
```

## Demos

### Without any surrounding layout

```tsx
render(
  <Form.ButtonRow>
    <Wizard.Buttons />
    <Button variant="secondary">Other button</Button>
  </Form.ButtonRow>,
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
  </Form.Handler>,
)
```
