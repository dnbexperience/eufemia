---
title: 'Layout'
description: 'To make it easier to build application layouts and form views in line with defined design sketches, there are a number of components for layout.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.332Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Layout

## Description

To make it easier to build application layout and [form](/uilib/extensions/forms)-views in line with defined design sketches, there are a number of components for layout.

- **[Spacing](/uilib/layout/spacing)** table and information.

- **[Media Queries](/uilib/layout/media-queries)** and breakpoints table and information.

- **[Flex](/uilib/layout/flex)** is a building block for CSS flexbox based layout of contents, components and [forms](/uilib/extensions/forms).

- **[Grid](/uilib/layout/grid)** is a layout system for CSS grid based layout of contents.

- **[Space](/uilib/layout/space)** is a component that provides `margins` within the [provided spacing patterns](/uilib/usage/layout/spacing#spacing-helpers).

## Deprecated layout components

- **[FormSet](/uilib/layout/form-set)** is deprecated. Use [Flex](/uilib/layout/flex), the [Forms](/uilib/extensions/forms) extension and the Eufemia [Provider](/uilib/usage/customisation/provider-info) as an replacement.

- **[FormRow](/uilib/layout/form-row)** is deprecated. Use [Flex](/uilib/layout/flex) and the [Forms](/uilib/extensions/forms) extension as an replacement.

## Units and responsiveness

Please – use `rem` instead of `px` for all of your custom CSS, and make sure;

- you always use the nearest half `rem` value, like _0.5rem_, _1rem_ or _1.5rem_ and so forth.
- you always get a **total computed height** within the grid.

This results in maintaining the integrity of the **8px** base grid.

### Exceptions

There are exceptions for when you define a "minimum" of an area, such as `min-width`. Because it will increase in size when a larger browser font-size is used. In that case, user `px` as your sizing unit.

### Smaller Units

Sometimes you may need a compensation of only a few pixels. Heres how to calculate the correct _rem_ values:

- 1px = `1/16x1` = **0.0625rem**
- 2px = `1/16x2` = **0.125rem**
- And so on ...

## Columns

UX designers are using a 12 column system, along with a 4 and 6 column system, during their design processes.

### What are the differences between Flex and Grid?

Both to support different sizing of items on different media breakpoints.

**Flex**

Uses CSS `flexbox`.

- Best suited for Forms layout.
- Can either stack vertically or horizontally.
- Can be used with any kind of children.
- Even distribution of space.
- Keeps order of items like they were given in the DOM structure.
- Items can be sized in percentage.
- When a size (percentage) is given, they stack horizontally.

```jsx
import { Flex } from '@dnb/eufemia'
render(
  <Flex.Container>
    <Flex.Item>content</Flex.Item>
    <OtherComponent>content</OtherComponent>
  </Flex.Container>
)
```

**Grid**

Uses CSS `grid`.

- Best suited for applications with a column based layout.
- Columns do change between 4, 6 and 12 on the given size (media query) of the browser or screen size.
- The Grid.Container depends on Grid.Item.
- Items do span from column "a" to "b".
- Items can have different order in opposition from what's given in the DOM structure.

```jsx
import { Grid } from '@dnb/eufemia'

render(
  <Grid.Container>
    <Grid.Item>content</Grid.Item>
    <Grid.Item>content</Grid.Item>
  </Grid.Container>
)
```

## Demos

### Horizontal aligned Cards

Grid wraps the Cards nicely on smaller screens. More examples in the [Card](/uilib/components/card/) section.

```tsx
render(
  <Grid.Container
    columns={{
      small: 1,
      medium: 3,
      large: 3,
    }}
    columnGap="small"
  >
    <Card stack>
      <H2>Heading</H2>
      <P>Text</P>
    </Card>
    <Card stack>
      <H2>Heading</H2>
      <P>Pariatur officia sit adipisicing pariatur commodo enim do quis</P>
    </Card>
    <Card stack>
      <H2>Heading</H2>
      <P>Text</P>
    </Card>
  </Grid.Container>
)
```

### Accordion in two columns

This is a demo of how to outline accordions in two columns, including the correct tab order.

```tsx
const items = [
  <Accordion key="one" variant="filled">
    <Accordion.Header>
      Sit amet suscipit ipsum tincidunt id?
    </Accordion.Header>
    <Accordion.Content space>
      <P>
        Sociis sapien sociosqu vel sollicitudin accumsan laoreet gravida
        himenaeos nostra mollis volutpat bibendum convallis cum condimentum
        dictumst blandit rutrum vehicula
      </P>
    </Accordion.Content>
  </Accordion>,
  <Accordion key="two" variant="filled">
    <Accordion.Header>
      Cras eget quam eget tortor placerat viverra?
    </Accordion.Header>
    <Accordion.Content space>
      <P>
        Morbi condimentum odio ut enim vulputate, rutrum ullamcorper sem
        vestibulum. Ut luctus tempus leo vel finibus. Pellentesque ultrices
        interdum nisi, sit amet suscipit ipsum tincidunt id. Praesent
        sodales vel eros ut accumsan.
      </P>
    </Accordion.Content>
  </Accordion>,
  <Accordion key="three" variant="filled">
    <Accordion.Header>Nam porta nec ipsum id porta</Accordion.Header>
    <Accordion.Content space>
      <P>
        Nam porta nec ipsum id porta. Cras eget quam eget tortor placerat
        viverra.
      </P>
    </Accordion.Content>
  </Accordion>,
]
render(
  <>
    <Heading size="large">Accordion in columns</Heading>
    <Grid.Container columns={2} columnGap="small" rowGap="x-small">
      <Grid.Item
        span={{
          small: [1, 2],
          medium: [1, 1],
          large: [1, 1],
        }}
      >
        <Flex.Stack gap="x-small">{items}</Flex.Stack>
      </Grid.Item>
      <Grid.Item
        span={{
          small: [1, 2],
          medium: [2, 2],
          large: [2, 2],
        }}
      >
        <Flex.Stack gap="x-small">{[...items].reverse()}</Flex.Stack>
      </Grid.Item>
    </Grid.Container>
  </>
)
```

### Responsive application [Grid](/uilib/layout/grid/) usage

```tsx
render(
  <Grid.Container rowGap columnGap>
    <Grid.Item
      span={{
        small: [1, 2],
        medium: [1, 3],
        large: [1, 12],
      }}
      style={colors[0]}
      element={TestElement}
    >
      Item A
    </Grid.Item>

    <Grid.Item
      span={{
        small: [3, 4],
        medium: [4, 6],
        large: [1, 4],
      }}
      style={colors[1]}
      element={TestElement}
    >
      Item B
    </Grid.Item>

    <Grid.Item
      span={{
        small: [2, 3],
        medium: [4, 6],
        large: [5, 8],
      }}
      style={colors[2]}
      element={TestElement}
    >
      Item C
    </Grid.Item>

    <Grid.Item
      span={{
        small: [1, 4],
        medium: [4, 6],
        large: [9, 12],
      }}
      style={colors[3]}
      element={TestElement}
    >
      Item D
    </Grid.Item>
  </Grid.Container>
)
```

### Responsive [Flex](/uilib/layout/flex/) usage

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
  </Flex.Container>
)
```

### Customized [Flex.Item](/uilib/layout/flex/item/) sizes

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
  </CustomMediaQuery>
)
```

### [Flex](/uilib/layout/flex/) usage in [Forms](/uilib/extensions/forms/)

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
  </Flex.Stack>
)
```
