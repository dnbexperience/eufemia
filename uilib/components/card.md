---
title: 'Card'
description: '`Card` is a block section element showing the white box with rounded gray borders, adding spacing automatically.'
version: 11.5.0
generatedAt: 2026-06-03T07:21:23.734Z
checksum: 0e50b33934d75ff8ee86042f8b38b80cfeb981cf163f459e0272d67f2eaf2b22
---

# Card

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
  </Form.Handler>
)
```

## Accessibility

It uses a `section` element. Which allows you to add an `aria-label` or `aria-labelledby` to provide screen readers with landmarks.


```tsx
render(<Card aria-labelledby="unique-id">
        <Form.SubHeading id="unique-id" space={0}>
          Heading
        </Form.SubHeading>
        <P>Content inside a landmark ...</P>
      </Card>)
```


## Card.List and Card.ListItem

Use `Card.List` and `Card.ListItem` to render a semantic `<ul>` / `<li>` list of cards. `Card.List` provides a responsive flex layout with wrapping. `Card.ListItem` supports a `center` prop to center content vertically — set it to `true` to always center, or `"when-small"` to center only on small screens.


## Demos

### Default border


```tsx
render(<Card>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          cursus pharetra elit in bibendum.
        </P>
      </Card>)
```


### Stack

When `stack` is set to `true`, the Card will add a gap between its children and stretch them to the full.

For [form components](/uilib/extensions/forms/), you should use [Form.Card](/uilib/extensions/forms/Form/Card/) instead of the original Card component.

When `stack` is set to `true`, the Card will add a gap between its children and stretch them to the full.


```tsx
render(<Card stack>
        <P>Stacked content</P>
        <P>Stacked content</P>
      </Card>)
```


### With form fields

When using Eufemia Forms, you may want to use [Form.Card](/uilib/extensions/forms/Form/Card/) instead of the original Card component.


```tsx
render(<Form.Card>
        <Field.String label="Label" value="Value" />
        <Field.String label="Label" value="Value" />
      </Form.Card>)
```


### Nested Cards

Nested cards have `responsive={false}` by default and will not behave responsive.


```tsx
render(<Card stack>
        <P>First Card</P>
        <Card stack>
          <P>Second Card</P>
          <Card stack>
            <P>Third Card (edge case)</P>
          </Card>
        </Card>
      </Card>)
```


### With drop shadow


```tsx
render(<Card stack dropShadow>
        <Lead>Card 1</Lead>
        <Card stack top="2.5rem">
          <Lead size="basis">Card 2</Lead>
          <Card stack top="1.5rem" innerSpace={{
      top: true,
      block: '3rem',
      inline: true
    }}>
            <Lead size="small">Card 3 (edge case)</Lead>
          </Card>
        </Card>
      </Card>)
```


## With `outset`

When using `outset`, the Card will break out of the layout container.
On small screens (mobile) the outset is removed.


```tsx
render(<Flex.Vertical>
        <Form.MainHeading>I'm left aligned</Form.MainHeading>
        <Card stack outset>
          <P>Card content</P>
          <Card>
            <P>Nested card</P>
          </Card>
        </Card>
        <Form.SubmitButton text="I'm also left aligned" />
      </Flex.Vertical>)
```


### Without padding


```tsx
render(<Card innerSpace={false} align="stretch">
        <P>no inner space</P>
      </Card>)
```


### With nested Section

Card components need to have `stack={true}` or `align="stretch"` in order to stretch its children components.


```tsx
render(<Flex.Stack>
        <Card gap="x-small" align="stretch">
          <Form.SubHeading>Card with a nested Section</Form.SubHeading>
          <Section variant="information" innerSpace={{
      top: 'small',
      bottom: 'medium'
    }}>
            <Field.String width="medium" label="In nested Section" />
          </Section>
        </Card>

        <Card innerSpace="x-large" stack>
          <Section variant="information" innerSpace={{
      top: 'small',
      bottom: 'medium'
    }}>
            <Field.String width="medium" label="Card with a 'x-large' inner space" />
          </Section>
        </Card>

        <Card innerSpace={false} align="stretch">
          <P>no inner space</P>
          <Section innerSpace backgroundColor="var(--color-lavender)">
            <Field.String width="medium" label="Card with no inner space" />
          </Section>
          <P>no inner space</P>
        </Card>
      </Flex.Stack>)
```


### With Table


```tsx
const MyTable = () => <Table.ScrollView>
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
          </Table.ScrollView>;
render(<Card title="Card title" responsive={false} innerSpace={0} filled>
            <MyTable />
          </Card>);
```


### With Grid

Grid wraps the Cards nicely on smaller screens.


```tsx
render(<Grid.Container columns={{
  small: 1,
  medium: 3,
  large: 3
}} columnGap="small">
        <Card stack>
          <H2>Heading</H2>
          <P>Text</P>
        </Card>
        <Card stack>
          <H2>Heading</H2>
          <P>
            Pariatur officia sit adipisicing pariatur commodo enim do quis
          </P>
        </Card>
        <Card stack>
          <H2>Heading</H2>
          <P>Text</P>
        </Card>
      </Grid.Container>)
```


### With Flex

While Flex has the horizontal direction, it uses rowGap when wrapping. So it's the container spacing the Cards then. This is not ideal, because the Cards should ideally have no gap, like in the Grid example above.


```tsx
render(<Flex.Container>
        <Card span={{
    small: 'auto',
    medium: 4,
    large: 4
  }} stack>
          <H2>Heading</H2>
          <P>Text</P>
        </Card>
        <Card span={{
    small: 'auto',
    medium: 4,
    large: 4
  }} stack>
          <H2>Heading</H2>
          <P>
            Pariatur officia sit adipisicing pariatur commodo enim do quis
          </P>
        </Card>
        <Card span={{
    small: 'auto',
    medium: 4,
    large: 4
  }} stack>
          <H2>Heading</H2>
          <P>Text</P>
        </Card>
      </Flex.Container>)
```



  
```tsx
const MyTable = () => <Table.ScrollView>
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
          </Table.ScrollView>;
render(<Card title="Card title" responsive={false} filled>
            <MyTable />
          </Card>);
```

  
```tsx
render(<Section backgroundColor="var(--color-signal-orange)" innerSpace="large">
        <Card>Card in colored Section</Card>
      </Section>)
```



## With `backgroundColor` and `outline`


```tsx
render(<Flex.Vertical>
        <Form.MainHeading>I'm left aligned</Form.MainHeading>
        <Card stack backgroundColor="var(--token-color-background-neutral-subtle)" outline="var(--token-color-stroke-neutral)">
          <P>Card content</P>
          <Card outline="transparent">
            <P>Nested card</P>
          </Card>
        </Card>
      </Flex.Vertical>)
```


### Interactive Cards

Use `Card.Action` to make a Card clickable or a link. Pass `onClick` for a button-like card, or `href`/`to` for a link card. Both variants get hover, focus, and keyboard styles automatically.

For custom routing (e.g. react-router), pass a router `Link` via the `element` prop on `Card.Action`.


```tsx
render(<Card.List style={{
  maxWidth: '640px',
  margin: '0 auto'
}}>
        <Card.ListItem center="when-small">
          <Card.Action onClick={() => console.log('Card clicked')} stack gap="x-small">
            <Lead>Clickable card</Lead>
            <P>
              Click this card. It has hover, focus, and keyboard support.
            </P>
            <Button variant="tertiary" icon="chevron_right" text="Read more" element="span" />
          </Card.Action>
        </Card.ListItem>

        <Card.ListItem center="when-small">
          <Card.Action href="/" stack gap="x-small">
            <Lead>Link card</Lead>
            <P>This card navigates with an anchor element.</P>
            <Button variant="tertiary" icon="chevron_right" text="Read more" element="span" />
          </Card.Action>
        </Card.ListItem>
      </Card.List>)
```

## Properties


```json
{
  "props": {
    "outset": {
      "doc": "Whether or not to break out (using negative margins) on larger screens. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "stack": {
      "doc": "True to stack the sub components with space between. The `spacing` will default to `medium`. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "direction": {
      "doc": "Defaults to `vertical`.",
      "type": [
        "\"horizontal\"",
        "\"vertical\""
      ],
      "status": "optional"
    },
    "alignSelf": {
      "doc": "Defaults to `stretch`.",
      "type": [
        "\"flex-start\"",
        "\"flex-end\"",
        "\"center\"",
        "\"baseline\"",
        "\"stretch\""
      ],
      "status": "optional"
    },
    "title": {
      "doc": "Define a title that appears on top of the Card.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "responsive": {
      "doc": "Define if the card should behave responsive. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "filled": {
      "doc": "Define if the Card should get the same background color as the outline border.",
      "type": "boolean",
      "status": "optional"
    },
    "outline": {
      "doc": "Define the outline color. Defaults to `var(--card-outline-color)`.",
      "type": "string",
      "status": "optional"
    },
    "outlineWidth": {
      "doc": "Define the outline width. Defaults to `var(--card-outline-width)` (`0.0625rem`).",
      "type": [
        "string",
        "number"
      ],
      "status": "optional"
    },
    "dropShadow": {
      "doc": "Define if the Card should have drop shadow. Uses Section `dropShadow`.",
      "type": "boolean",
      "status": "optional"
    },
    "backgroundColor": {
      "doc": "Define the background color. Defaults to `var(--card-background-color)`.",
      "type": "string",
      "status": "optional"
    },
    "element": {
      "doc": "Define the type of element. Defaults to `section`.",
      "type": "React.Element",
      "status": "optional"
    },
    "children": {
      "doc": "Contents.",
      "type": "React.ReactNode",
      "status": "required"
    },
    "[Flex.Container](/uilib/layout/flex/container/properties)": {
      "doc": "Flex.Container properties.",
      "type": "Various",
      "status": "optional"
    },
    "[Flex.Item](/uilib/layout/flex/item/properties)": {
      "doc": "Flex.Item properties.",
      "type": "Various",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  }
}
```


### Card.Action Properties


```json
{
  "props": {
    "href": {
      "doc": "The URL to navigate to. When set, renders an anchor element.",
      "type": "string",
      "status": "optional"
    },
    "to": {
      "doc": "Route path for use with a router Link component (e.g. react-router). Pass a custom `element` that accepts `to`.",
      "type": "string",
      "status": "optional"
    },
    "target": {
      "doc": "The anchor target attribute.",
      "type": "string",
      "status": "optional"
    },
    "rel": {
      "doc": "The anchor rel attribute.",
      "type": "string",
      "status": "optional"
    },
    "element": {
      "doc": "Custom element to render as the wrapper. Defaults to `a` when `href`/`to` is set. Use this for router Link components.",
      "type": [
        "string",
        "React.Element"
      ],
      "status": "optional"
    },
    "onClick": {
      "doc": "Click handler. When used without `href`/`to`, renders a button-like wrapper with keyboard support (Enter/Space).",
      "type": "function",
      "status": "optional"
    },
    "children": {
      "doc": "Contents of the Card inside the action wrapper.",
      "type": "React.ReactNode",
      "status": "required"
    },
    "Card properties": {
      "doc": "All [Card](/uilib/components/card/properties) properties are supported.",
      "type": "Various",
      "status": "optional"
    }
  }
}
```


### Card.List Properties


```json
{
  "props": {
    "children": {
      "doc": "Card.ListItem elements.",
      "type": "React.ReactNode",
      "status": "required"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  }
}
```


### Card.ListItem Properties


```json
{
  "props": {
    "center": {
      "doc": "Center the content of the list item. Use `true` to always center, or `\"when-small\"` to center only on small screens.",
      "type": [
        "boolean",
        "\"when-small\""
      ],
      "status": "optional"
    },
    "children": {
      "doc": "A Card or Card.Action element.",
      "type": "React.ReactNode",
      "status": "required"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  }
}
```
