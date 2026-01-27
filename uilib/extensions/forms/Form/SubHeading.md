---
title: 'Form.SubHeading'
description: '`Form.SubHeading` is a standardized sub heading for sections, ensuring default layout, spacing etc.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:27.383Z
checksum: 2cc1c6355eb5efbe05e0862c6140463aae4b8c4816d6f27d9edfb3ee0c7a4c32
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

When placed above a [Form.Card](/uilib/extensions/forms/Form/Card/) component, the heading will be indented to align with the card content.

On small screens, the indention will be removed.

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
      "doc": "Provide help content for the field using `title` and `content` as a string or React.Node. Additionally, you can set `open` to `true` to display the inline help, set the `breakout` property to `false` to disable the breakout of the inline help content, set `outset` to `false` to display the help text inline (inset) instead of the default outset behavior, or use `renderAs` set to `dialog` to render the content in a [Dialog](/uilib/components/dialog/) (recommended for larger amounts of content).",
      "type": "object",
      "status": "optional"
    },
    "children": {
      "doc": "Heading text / contents.",
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
