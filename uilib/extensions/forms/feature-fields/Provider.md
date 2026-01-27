---
title: 'Field.Provider'
description: '`Field.Provider` is a provider for forwarding fields properties, such as `required` or `disabled` to all nested field components.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.307Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Field.Provider

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Provider />)
```

## Description

`Field.Provider` is a provider for forwarding fields properties, such as `required` or `disabled` to all nested field components.

## Usage

```tsx
import { Form, Field } from '@dnb/eufemia/extensions/forms'
render(
  <Field.Provider required disabled>
    <Field.String />
  </Field.Provider>
)
```

Keep in mind, you can also set `required` or `disabled` on the [Form.Handler](/uilib/extensions/forms/Form/Handler/). And invert the logic via the `Field.Provider` by using `required={false}` or `disabled={false}`.

## Demos

### Required

```tsx
render(
  <Form.Handler>
    <Flex.Stack>
      <Field.String label="Not required" />

      <Field.Provider required>
        <Field.String label="Required A" />
        <Field.Number label="Required B" />
      </Field.Provider>

      <Form.ButtonRow>
        <Form.SubmitButton />
      </Form.ButtonRow>
    </Flex.Stack>
  </Form.Handler>
)
```

### Disabled

```tsx
render(
  <Form.Handler>
    <Flex.Stack>
      <Field.String label="Not disabled" />

      <Field.Provider disabled>
        <Flex.Stack>
          <Field.String label="Disabled" />
          <Form.ButtonRow>
            <Form.SubmitButton />
          </Form.ButtonRow>
        </Flex.Stack>
      </Field.Provider>
    </Flex.Stack>
  </Form.Handler>
)
```

### Inverted

```tsx
render(
  <Form.Handler disabled>
    <Flex.Stack>
      <Field.String label="Disabled" />

      <Field.Provider disabled={false}>
        <Flex.Stack>
          <Field.String label="Not disabled" />
          <Form.ButtonRow>
            <Form.SubmitButton />
          </Form.ButtonRow>
        </Flex.Stack>
      </Field.Provider>
    </Flex.Stack>
  </Form.Handler>
)
```

## Properties

```json
{
  "props": {
    "required": {
      "doc": "When set to `true`, the field will give an error if the value fails the required validation. When set to `false`, the field will not be required, but will add a \"(optional)\" suffix to the label.",
      "type": "boolean",
      "status": "optional"
    },
    "disabled": {
      "doc": "Set `true` to show the field but without the possibility of changing the value.",
      "type": "boolean",
      "status": "optional"
    },
    "locale": {
      "doc": "Locale (language) to use for all nested Eufemia components.",
      "type": "string",
      "status": "optional"
    }
  }
}
```
