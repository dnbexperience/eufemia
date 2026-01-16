---
title: 'SubHeading'
description: '`Form.SubHeading` is a standardized sub heading for sections, ensuring default layout, spacing etc.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Form/SubHeading/metadata.json
---

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
  </Form.Handler>,
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
  </Form.Card>,
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
  </Flex.Stack>,
)
```
