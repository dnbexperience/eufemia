---
title: 'Flex'
description: 'To make it easier to build application layout and form-views in line with defined design sketches, there are a number of components for layout.'
metadata: https://eufemia.dnb.no/uilib/layout/flex/metadata.json
---

## Import

```tsx
import { Flex } from '@dnb/eufemia'
```

## Description

To make it easier to build application layout and [form](/uilib/extensions/forms)-views in line with defined design sketches, there are a number of components for layout.

- **[Flex.Container](/uilib/layout/flex/container)** is a building block for CSS flexbox based layout of contents and components.

  - **`Flex.Vertical`** can be used as an alias instead of the property `direction="vertical"`.
  - **`Flex.Horizontal`** can be used as an alias instead of the property `direction="horizontal"`.

- **[Flex.Item](/uilib/layout/flex/item)** is a building block for CSS flexbox based layout of contents and components.

- **[Flex.Stack](/uilib/layout/flex/stack)** is an outer block element that wraps content to ensure proper layout and spacing between form elements, larger regions and headings. It stretches its content horizontally (100%).

```jsx
import { Form } from '@dnb/eufemia/extensions/forms'
import { Flex } from '@dnb/eufemia'

function MyForm() {
  return (
    <Form.Handler>
      <Flex.Stack>
        <Form.MainHeading>Main heading</Form.MainHeading>
        <Form.Card>...</Form.Card>
      </Flex.Stack>
    </Form.Handler>
  )
}
```

You can find more related information in the [Layout](/uilib/layout) pages.

## Demos

### Used in forms

```tsx
render(
  <Flex.Stack>
    <Form.MainHeading>Profile</Form.MainHeading>

    <Form.Card>
      <Form.SubHeading>Name</Form.SubHeading>

      <Field.String label="Fornavn" value="John" />
      <Field.String label="Etternavn" value="Smith" />
    </Form.Card>

    <Form.Card>
      <Form.SubHeading>More information</Form.SubHeading>

      <Field.NationalIdentityNumber value="20058512345" />
      <Field.Email value="john@smith.email" />
      <Field.PhoneNumber value="+47 98765432" />
    </Form.Card>
  </Flex.Stack>,
)
```

### Responsive Flex.Item

With the default `sizeCount` of 12 parts.

```tsx
render(
  <Flex.Container>
    <Flex.Item size={8}>
      <TestElement style={colors[0]}>FlexItem (8)</TestElement>
    </Flex.Item>
    <Flex.Item size={4}>
      <TestElement style={colors[1]}>FlexItem (4)</TestElement>
    </Flex.Item>
    <Flex.Item
      size={{
        small: 12,
        medium: 4,
      }}
    >
      <TestElement style={colors[2]}>
        FlexItem (small: 8, medium: 4)
      </TestElement>
    </Flex.Item>
    <Flex.Item
      size={{
        small: 12,
        medium: 8,
      }}
    >
      <TestElement style={colors[3]}>
        FlexItem (small: 4, medium: 8)
      </TestElement>
    </Flex.Item>
  </Flex.Container>,
)
```

### Customized Flex.Item sizes

With a custom amount of 4 parts (`sizeCount`) as well as custom breakpoints and media queries.

```tsx
const breakpoints = {
  ...defaultBreakpoints,
  xsmall: '30em',
}
const queries = {
  ...defaultQueries,
  xsmall: {
    min: 0,
    max: 'xsmall',
  },
  small: {
    min: 'xsmall',
    max: 'small',
  },
}
const CustomMediaQuery = styled.div`
  display: flex;
  flex-direction: column;
  .dnb-flex-container[data-media-key='xsmall'] .dnb-flex-item--responsive {
    --size: var(--xsmall);
  }
`
render(
  <CustomMediaQuery>
    <Flex.Container
      direction="horizontal"
      sizeCount={4}
      breakpoints={breakpoints}
      queries={queries}
    >
      <Flex.Item
        size={{
          small: 2,
          medium: 3,
          large: 1,
        }}
      >
        <TestElement style={colors[0]}>FlexItem</TestElement>
      </Flex.Item>
      <Flex.Item
        size={{
          small: 2,
          medium: 1,
          large: 2,
        }}
      >
        <TestElement style={colors[1]}>FlexItem</TestElement>
      </Flex.Item>
      <Flex.Item
        size={{
          xsmall: 4,
          small: 2,
          medium: 1,
          large: 1,
        }}
      >
        <TestElement style={colors[2]}>FlexItem</TestElement>
      </Flex.Item>
      <Flex.Item
        size={{
          xsmall: 4,
          small: 2,
          medium: 3,
          large: 4,
        }}
      >
        <TestElement style={colors[3]}>FlexItem</TestElement>
      </Flex.Item>
    </Flex.Container>
  </CustomMediaQuery>,
)
```
