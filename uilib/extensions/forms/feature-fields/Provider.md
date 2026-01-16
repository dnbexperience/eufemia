---
title: 'Field.Provider'
description: '`Field.Provider` is a provider for forwarding fields properties, such as `required` or `disabled` to all nested field components.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/feature-fields/Provider/metadata.json
---

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
  </Field.Provider>,
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
  </Form.Handler>,
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
  </Form.Handler>,
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
  </Form.Handler>,
)
```
