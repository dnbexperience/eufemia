---
title: 'Form.SubHeading'
description: '`Form.SubHeading` is a standardized sub heading for sections, ensuring default layout, spacing etc.'
version: 11.0.2
generatedAt: 2026-04-28T04:47:22.076Z
checksum: fc167f457283cabe892e733be94ba69895180957e54d922b2d6aad09cb80fb4b
---

# Form.SubHeading

## Import

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.SubHeading />)
```

## Description

`Form.SubHeading` is a standardized subheading for sections, ensuring default layout, spacing, etc.

The font size is set to `large`.

```jsx
import { Flex, Card } from '@dnb/eufemia'
import { Form, Field } from '@dnb/eufemia/extensions/forms'
render(
  <Form.Handler onSubmit={submitHandler}>
    <Flex.Stack>
      <Form.MainHeading>Header</Form.MainHeading>
      <Form.Card>
        <Form.SubHeading>Header</Form.SubHeading>
        <Field.Email path="/dataPath" />
      </Form.Card>
    </Flex.Stack>
  </Form.Handler>
)
```

## Demos

### Text only

```tsx
render(<Form.SubHeading>This is a sub heading</Form.SubHeading>)
```

### Below MainHeading

```tsx
<Form.MainHeading>This is a main heading</Form.MainHeading>
<Form.SubHeading>This is a sub heading</Form.SubHeading>
```

### Above a flex container

```tsx
<Form.SubHeading>This is a sub heading</Form.SubHeading>
<Flex.Stack>
  <P>Stack contents</P>
</Flex.Stack>
```

### Inside Card

```tsx
render(
  <Form.Card>
    <Flex.Stack>
      <Form.SubHeading>This is a sub heading</Form.SubHeading>
      <P>Card contents</P>
    </Flex.Stack>
  </Form.Card>
)
```

### Above Card

```tsx
<Form.SubHeading>This is a sub heading</Form.SubHeading>
<Form.Card>
  <P>Card contents</P>
</Form.Card>
```

### Two sub headings

```tsx
<Form.SubHeading>This is sub heading 1</Form.SubHeading>
<Form.SubHeading>This is sub heading 2</Form.SubHeading>
Other contents
```

### With HelpButton

```tsx
render(
  <Flex.Stack>
    <Form.SubHeading
      help={{
        title: 'Title',
        content: 'Content',
      }}
    >
      This is a sub heading
    </Form.SubHeading>
    <Form.Card>
      <P>Card contents</P>
    </Form.Card>
  </Flex.Stack>
)
```

## Properties

```json
{
  "props": {
    "level": {
      "doc": "Define a specific level value to ensure correct level hierarchy. Defaults to `3`.",
      "type": "number",
      "status": "optional"
    },
    "help": {
      "doc": "Provide help content for the field using `title` and `content` as a string or `React.ReactNode`. Additionally, you can set `open` to `true` to display the inline help, set the `breakout` property to `false` to disable the breakout of the inline help content, set `outset` to `false` to display the help text inline (inset) instead of the default outset behavior, or use `renderAs` set to `dialog` to render the content in a [Dialog](/uilib/components/dialog/) (recommended for larger amounts of content).",
      "type": "object",
      "status": "optional"
    },
    "children": {
      "doc": "Heading text / contents.",
      "type": "React.ReactNode",
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
