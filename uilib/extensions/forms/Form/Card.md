---
title: 'Form.Card'
description: '`Form.Card` is a wrapper for the Card component to make it easier to use inside a form.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:27.253Z
checksum: e2c835faa46550f07b7035374eaf42b4ceeedfbc1c00075484f0133cd3d7cb1d
---

# Form.Card

## Import

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.Card />)
```

## Description

`Form.Card` is a wrapper for the [Card](/uilib/components/card/) component to make it easier to use inside a form:

- It will set `outset` to `true` by default (instead of `false`). [See example below.](#outset)
- It will set `stack` to `true` by default (instead of `false`).

But in all other ways, it works just like the [Card](/uilib/components/card/) component.

## Demos

```tsx
render(
  <Flex.Stack>
    <Form.MainHeading>Main heading</Form.MainHeading>
    <Form.Card>
      <Field.String label="Field A" required />
      <Field.String label="Field B" required />
      <Form.Card>
        <P>Nested card</P>
      </Form.Card>
    </Form.Card>
    <Form.SubmitButton />
  </Flex.Stack>
)
```

## Outset

`<Form.Card>` will "outsets" (break out) from the layout using negative margins to preserve content alignment in forms.

This outset is turned off if it is placed inside a `<Card>` (or another `<Form.Card>`) to avoid overlapping margins/padding/borders, but if placed in a different wrapper that messes with the layout, you can manually turn it off in two ways:

- Wrap it in `<Form.Card.Provider disableCardBreakout>` to make all nested `<Form.Card>` act like they’re inside a `<Card>` (stay contained in the parent content area on all screen sizes).
- Or set `outset={false}` on each card (only affects medium and large screen sizes).

```tsx
render(
  <Flex.Stack>
    <P>Regular content position</P>

    <Form.Card>
      <P>Default outset to preserve content position.</P>
    </Form.Card>

    <Form.Card outset={false}>
      <P>
        Outset turned off, will still breakout (go full width) on small
        screens
      </P>
    </Form.Card>

    <Form.Card.Provider disableCardBreakout>
      <Form.Card>
        <P>
          Told to behave as if inside a parent card. Will stay inside the
          content area of the parent even on small screens.
        </P>
      </Form.Card>
    </Form.Card.Provider>
  </Flex.Stack>
)
```

```tsx
render(
  <Form.Handler>
    <Wizard.Container>
      <Wizard.Step>
        <Form.Card>
          <Form.Section>
            <Form.Section.ViewContainer
              title="In a Wizard"
              variant="basic"
            >
              <Value.String defaultValue="Something" />
            </Form.Section.ViewContainer>
            <Form.Section.EditContainer variant="basic">
              <Field.String defaultValue="Something" />
            </Form.Section.EditContainer>
          </Form.Section>
        </Form.Card>
        <Form.SubmitButton text="Happy coding!" />
      </Wizard.Step>
    </Wizard.Container>
  </Form.Handler>
)
```

## Properties

```json
{
  "props": {
    "outset": {
      "doc": "Whether or not to break out (using negative margins) on larger screens. Same as `outset` in [Card](/uilib/components/card/properties). But defaults to `true`",
      "type": "boolean",
      "status": "optional"
    },
    "stack": {
      "doc": "True to stack the sub components with space between. The `spacing` will default to `medium`. Same as `stack` in [Card](/uilib/components/card/properties). But defaults to `true`",
      "type": "boolean",
      "status": "optional"
    }
  }
}
```

## Other properties inherited from [Card](/uilib/components/card/properties)

```json
{
  "props": {
    "direction": {
      "doc": "Defaults to `vertical`.",
      "type": "string",
      "status": "optional"
    },
    "alignSelf": {
      "doc": "Defaults to `stretch`.",
      "type": "string",
      "status": "optional"
    },
    "title": {
      "doc": "Define a title that appears on top of the Card.",
      "type": "React.Node",
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
      "type": "React.Node",
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
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```
