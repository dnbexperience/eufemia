---
title: 'Text Counter'
description: 'The TextCounter is a component designed to provide real-time character count feedback in text input fields.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:26.319Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Text Counter

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
  </Form.Handler>
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

## Properties

```json
{
  "text": {
    "doc": "The text to count characters from.",
    "type": "string",
    "status": "required"
  },
  "max": {
    "doc": "The maximum number of characters allowed.",
    "type": "number",
    "status": "required"
  },
  "variant": {
    "doc": "The counting variant. Can be either `up` (counts up from zero) or `down` (counts down from max). Default is `down`.",
    "type": ["down", "up"],
    "status": "optional"
  },
  "[Space](/uilib/layout/space/properties)": {
    "doc": "Spacing properties like `top` or `bottom` are supported.",
    "type": ["string", "object"],
    "status": "optional"
  }
}
```

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "TextCounter.characterDown": {
      "nb-NO": "%count av %max tegn gjenstår.",
      "en-GB": "%count of %max characters remaining.",
      "sv-SE": "%count av %max tecken återstår.",
      "da-DK": "%count af %max tegn tilbage."
    },
    "TextCounter.characterExceeded": {
      "nb-NO": "%count tegn over grensen på %max.",
      "en-GB": "%count characters over the limit of %max.",
      "sv-SE": "%count tecken över gränsen på %max.",
      "da-DK": "%count tegn over grænsen på %max."
    },
    "TextCounter.characterUp": {
      "nb-NO": "Du har brukt %count av %max tegn.",
      "en-GB": "You have used %count of %max characters.",
      "sv-SE": "Du har använt %count av %max tecken.",
      "da-DK": "Du har brugt %count af %max tegn."
    }
  }
}
```
