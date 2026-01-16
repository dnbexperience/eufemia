---
title: 'MainHeading'
description: '`Form.MainHeading` is a standardized main heading for sections, ensuring default layout, spacing etc.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Form/MainHeading/metadata.json
---

## Import

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.MainHeading />)
```

## Description

`Form.MainHeading` is a standardized main heading for sections, ensuring default layout, spacing etc.

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
  </Form.Handler>,
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

When placed above a [Form.Card](/uilib/extensions/forms/Form/Card/) component, the heading will be indented to align with the card content.

On small screens, the indention will be removed.

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
  </Flex.Stack>,
)
```
