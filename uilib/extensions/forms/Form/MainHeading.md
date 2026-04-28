---
title: 'Form.MainHeading'
description: '`Form.MainHeading` is a standardized main heading for sections, ensuring default layout, spacing etc.'
version: 11.0.2
generatedAt: 2026-04-28T04:47:22.029Z
checksum: a49b043d7d31fec7f6ac2697605efdd82f8ebd7752638c7458c014cc87429631
---

# Form.MainHeading

## Import

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.MainHeading />)
```

## Description

`Form.MainHeading` is a standardized main heading for sections, ensuring default layout, spacing etc.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Form/MainHeading)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Form/MainHeading)

The used font-size is set to `large`.

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
render(<Form.MainHeading>This is a main heading</Form.MainHeading>)
```

### Above a flex container

```tsx
<Form.MainHeading>This is a main heading</Form.MainHeading>
<Flex.Stack>
  <P>Stack contents</P>
</Flex.Stack>
```

### Above Card

```tsx
<Form.MainHeading>This is a main heading</Form.MainHeading>
<Form.Card>
  <P>Card contents</P>
</Form.Card>
```

### With HelpButton

```tsx
render(
  <Flex.Stack>
    <Form.MainHeading
      help={{
        title: 'Title',
        content: 'Content',
      }}
    >
      This is a main heading
    </Form.MainHeading>
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
      "doc": "Define a specific level value to ensure correct level hierarchy. Defaults to `2`.",
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
