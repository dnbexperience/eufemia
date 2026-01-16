---
title: 'Text Counter'
description: 'The TextCounter is a component designed to provide real-time character count feedback in text input fields.'
metadata: https://eufemia.dnb.no/uilib/components/fragments/text-counter/metadata.json
---

## Import

```tsx
import { TextCounter } from '@dnb/eufemia/fragments'
```

## Description

The `TextCounter` is a component designed to provide real-time character count feedback in text input fields.

It provides the correct text translations and color and a visual indicator of the remaining characters.

It is used in the [Textarea](/uilib/components/textarea/) component.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/fragments/text-counter)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/fragments/text-counter)

## Demos

### Interactive

```tsx
const text = 'Count me!'
const variant: TextCounterProps['variant'] = 'down'
const Counter = () => {
  const { data } = Form.useData('text-counter', {
    max: 10,
    variant,
    text,
  })
  return (
    <Flex.Stack divider="line">
      <Flex.Vertical gap="x-small">
        <Field.String label="Text" path="/text" maxLength={data.max} />
        <TextCounter
          variant={data.variant}
          text={data.text}
          max={data.max}
        />
      </Flex.Vertical>
      <Field.Toggle
        valueOn="down"
        valueOff="up"
        textOn="Down"
        textOff="Up"
        variant="buttons"
        label="Variant"
        path="/variant"
      />
    </Flex.Stack>
  )
}
render(
  <Form.Handler id="text-counter">
    <Counter />
  </Form.Handler>,
)
```

### Count characters downwards

```tsx
render(<TextCounter variant="down" text="test" max={10} />)
```

### Count characters upwards

```tsx
render(<TextCounter variant="up" text="test" max={10} />)
```

### Show message as exceeded

```tsx
render(<TextCounter text="test" max={2} />)
```
