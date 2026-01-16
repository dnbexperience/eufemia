---
title: 'Card'
description: '`Card` is a block section element showing the white box with rounded gray borders, adding spacing automatically.'
metadata: https://eufemia.dnb.no/uilib/components/card/metadata.json
---

## Import

```tsx
import { Card } from '@dnb/eufemia'
```

## Description

`Card` is a block section element showing the white box with rounded gray borders, adding spacing automatically.

It uses [Flex.Item](/uilib/layout/flex/item) under the hood. When one of these properties were given, `stack`, `direction` or `spacing` – the [Flex.Container](/uilib/layout/flex/container) will be used.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/card)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/card)

```jsx
import { Card } from '@dnb/eufemia'
import { Form, Field } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler data={existingData} onSubmit={submitHandler}>
    <Card>
      <Field.Email path="/dataPath" />
      <Form.ButtonRow>
        <Form.SubmitButton />
      </Form.ButtonRow>
    </Card>
  </Form.Handler>,
)
```

## Accessibility

It uses a `section` element. Which allows you to add an `aria-label` or `aria-labelledby` to provide screen readers with landmarks.

```tsx
render(
  <Card aria-labelledby="unique-id">
    <Form.SubHeading id="unique-id" space={0}>
      Heading
    </Form.SubHeading>
    <P>Content inside a landmark ...</P>
  </Card>,
)
```

## Demos

### Default border

```tsx
render(
  <Card>
    <P>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus
      pharetra elit in bibendum.
    </P>
  </Card>,
)
```

### Stack

When `stack` is set to `true`, the Card will add a gap between its children and stretch them to the full.

For [form components](/uilib/extensions/forms/), you should use [Form.Card](/uilib/extensions/forms/Form/Card/) instead of the original Card component.

When `stack` is set to `true`, the Card will add a gap between its children and stretch them to the full.

```tsx
render(
  <Card stack>
    <P>Stacked content</P>
    <P>Stacked content</P>
  </Card>,
)
```

### Vertical fields

When using Eufemia Forms, you may want to use [Form.Card](/uilib/extensions/forms/Form/Card/) instead of the original Card component.

```tsx
render(
  <Form.Card>
    <Field.String label="Label" value="Value" />
    <Field.String label="Label" value="Value" />
  </Form.Card>,
)
```

### Horizontal fields

When using Eufemia Forms, you may want to use [Form.Card](/uilib/extensions/forms/Form/Card/) instead of the original Card component.

```tsx
render(
  <Form.Card>
    <Flex.Horizontal>
      <Field.String label="Label" value="Value" width="small" />
      <Field.String label="Label" value="Value" width="stretch" />
    </Flex.Horizontal>
  </Form.Card>,
)
```

### Nested Cards

Nested cards have `responsive={false}` by default and will not behave responsive.

```tsx
render(
  <Card stack>
    <P>First Card</P>
    <Card stack>
      <P>Second Card</P>
      <Card stack>
        <P>Third Card (for edge cases only)</P>
      </Card>
    </Card>
  </Card>,
)
```

## With `outset`

When using `outset`, the Card will break out of the layout container.
On small screens (mobile) the outset is removed.

```tsx
render(
  <Flex.Vertical>
    <Form.MainHeading>I'm left aligned</Form.MainHeading>
    <Card stack outset>
      <P>Card content</P>
      <Card>
        <P>Nested card</P>
      </Card>
    </Card>
    <Form.SubmitButton text="I'm also left aligned" />
  </Flex.Vertical>,
)
```

### Without padding

```tsx
render(
  <Card innerSpace={false} align="stretch">
    <P>no inner space</P>
  </Card>,
)
```

### With nested Section

Card components need to have `stack={true}` or `align="stretch"` in order to stretch its children components.

```tsx
render(
  <Flex.Stack>
    <Card gap="x-small" align="stretch">
      <Form.SubHeading>Card with a nested Section</Form.SubHeading>
      <Section
        variant="info"
        innerSpace={{
          top: 'small',
          bottom: 'medium',
        }}
      >
        <Field.String width="medium" label="In nested Section" />
      </Section>
    </Card>

    <Card innerSpace="x-large" stack>
      <Section
        variant="info"
        innerSpace={{
          top: 'small',
          bottom: 'medium',
        }}
      >
        <Field.String
          width="medium"
          label="Card with a 'x-large' inner space"
        />
      </Section>
    </Card>

    <Card innerSpace={false} align="stretch">
      <P>no inner space</P>
      <Section innerSpace backgroundColor="var(--color-lavender)">
        <Field.String width="medium" label="Card with no inner space" />
      </Section>
      <P>no inner space</P>
    </Card>
  </Flex.Stack>,
)
```

### With Table

```tsx
const MyTable = () => (
  <Table.ScrollView>
    <Table border outline size="medium">
      <thead>
        <Tr noWrap>
          <Th>Column 1</Th>
          <Th>Column 2</Th>
          <Th>Column 3</Th>
        </Tr>
      </thead>
      <tbody>
        <Tr>
          <Td>Row 1</Td>
          <Td>Row 1</Td>
          <Td>Row 1</Td>
        </Tr>
        <Tr>
          <Td colSpan={3} align="right">
            <Button>Button</Button>
          </Td>
        </Tr>
        <Tr>
          <Td>Row 3</Td>
          <Td>Row 3</Td>
          <Td>Row 3</Td>
        </Tr>
      </tbody>
    </Table>
  </Table.ScrollView>
)
render(
  <Card title="Card title" responsive={false} innerSpace={0} filled>
    <MyTable />
  </Card>,
)
```

### With Grid

Grid wraps the Cards nicely on smaller screens.

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
  </Grid.Container>,
)
```

### With Flex

While Flex has the horizontal direction, it uses rowGap when wrapping. So it's the container spacing the Cards then. This is not ideal, because the Cards should ideally have no gap, like in the Grid example above.

```tsx
render(
  <Flex.Container>
    <Card
      size={{
        small: 'auto',
        medium: 4,
        large: 4,
      }}
      stack
    >
      <H2>Heading</H2>
      <P>Text</P>
    </Card>
    <Card
      size={{
        small: 'auto',
        medium: 4,
        large: 4,
      }}
      stack
    >
      <H2>Heading</H2>
      <P>Pariatur officia sit adipisicing pariatur commodo enim do quis</P>
    </Card>
    <Card
      size={{
        small: 'auto',
        medium: 4,
        large: 4,
      }}
      stack
    >
      <H2>Heading</H2>
      <P>Text</P>
    </Card>
  </Flex.Container>,
)
```

```tsx
const MyTable = () => (
  <Table.ScrollView>
    <Table border outline size="medium">
      <thead>
        <Tr noWrap>
          <Th>Column 1</Th>
          <Th>Column 2</Th>
          <Th>Column 3</Th>
        </Tr>
      </thead>
      <tbody>
        <Tr>
          <Td>Row 1</Td>
          <Td>Row 1</Td>
          <Td>Row 1</Td>
        </Tr>
        <Tr>
          <Td colSpan={3} align="right">
            <Button>Button</Button>
          </Td>
        </Tr>
        <Tr>
          <Td>Row 3</Td>
          <Td>Row 3</Td>
          <Td>Row 3</Td>
        </Tr>
      </tbody>
    </Table>
  </Table.ScrollView>
)
render(
  <Card title="Card title" responsive={false} filled>
    <MyTable />
  </Card>,
)
```

```tsx
render(
  <Section backgroundColor="var(--color-signal-orange)" innerSpace="large">
    <Card>Card in colored Section</Card>
  </Section>,
)
```

## With `backgroundColor` and `outline`

```tsx
render(
  <Flex.Vertical>
    <Form.MainHeading>I'm left aligned</Form.MainHeading>
    <Card stack backgroundColor="pistachio" outline="sea-green">
      <P>Card content</P>
      <Card outline="transparent">
        <P>Nested card</P>
      </Card>
    </Card>
  </Flex.Vertical>,
)
```
