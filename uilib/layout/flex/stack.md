---
title: 'Flex Stack'
description: '`Flex.Stack` is an outer block element that wraps content to ensure proper layout and spacing between form elements, larger regions and headings. It stretches its content horizontally (100%).'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.321Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Flex Stack

## Import

```tsx
import { Flex } from '@dnb/eufemia'
render(<Flex.Stack />)
```

## Description

`Flex.Stack` is an outer block element that wraps content to ensure proper layout and spacing between form elements, larger regions and headings.

It stretches its content horizontally (100%).

It uses [Flex.Container](/uilib/layout/flex/container) under the hood.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/flex/Stack.tsx)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/layout/flex/stack/)

## Accessibility

It uses a `section` element. Which allows you to add an `aria-label` or `aria-labelledby` to provide screen readers with landmarks.

```tsx
render(
  <Flex.Stack aria-labelledby="unique-id">
    <Form.SubHeading id="unique-id">Heading</Form.SubHeading>
    <Card>
      <P>Content inside a landmark ...</P>
    </Card>
  </Flex.Stack>
)
```

## Demos

### With input fields

```tsx
render(
  <Flex.Stack>
    <Field.String label="Label" value="Foo" />
    <Field.String label="Label" value="Foo" />
    <Form.SubmitButton />
  </Flex.Stack>
)
```

### With paragraphs

```tsx
render(
  <Flex.Stack>
    <P>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus
      pharetra elit in bibendum.
    </P>
    <P>
      Praesent nunc ipsum, convallis eget convallis gravida, vehicula vitae
      metus.
    </P>
  </Flex.Stack>
)
```

### With main heading

```tsx
render(
  <Flex.Stack>
    <Form.MainHeading>Heading</Form.MainHeading>
    <P>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</P>
    <P>Aliquam at felis rutrum, luctus dui at, bibendum ipsum.</P>
  </Flex.Stack>
)
```

### With Card

```tsx
render(
  <Flex.Stack>
    <Card gap="medium">
      <P>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</P>
      <P>Aliquam at felis rutrum, luctus dui at, bibendum ipsum.</P>
    </Card>
    <Card gap="medium">
      <P>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</P>
      <P>Aliquam at felis rutrum, luctus dui at, bibendum ipsum.</P>
    </Card>
  </Flex.Stack>
)
```

### With Card and heading

```tsx
render(
  <Flex.Stack>
    <Form.MainHeading>Main heading</Form.MainHeading>
    <Card gap="medium">
      <P>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</P>
      <P>Aliquam at felis rutrum, luctus dui at, bibendum ipsum.</P>
    </Card>
  </Flex.Stack>
)
```

### With Card and headings

```tsx
render(
  <Flex.Stack>
    <Form.MainHeading>Main heading</Form.MainHeading>
    <Form.SubHeading>Sub heading</Form.SubHeading>
    <Card gap="medium">
      <P>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</P>
      <P>Aliquam at felis rutrum, luctus dui at, bibendum ipsum.</P>
    </Card>
  </Flex.Stack>
)
```

## Properties

```json
{
  "direction": {
    "doc": "Defaults to `vertical`.",
    "type": "string",
    "status": "optional"
  },
  "align": {
    "doc": "Defaults to `stretch`.",
    "type": "string",
    "status": "optional"
  },
  "[Flex.Container](/uilib/layout/flex/container/properties)": {
    "doc": "Flex.Container properties.",
    "type": "Various",
    "status": "optional"
  },
  "[Space](/uilib/layout/space/properties)": {
    "doc": "Spacing properties like `top` or `bottom` are supported.",
    "type": ["string", "object"],
    "status": "optional"
  }
}
```
