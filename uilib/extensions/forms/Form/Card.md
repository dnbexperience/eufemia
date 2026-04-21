---
title: 'Form.Card'
description: '`Form.Card` is a wrapper for the Card component to make it easier to use inside a form.'
version: 11.0.0
generatedAt: 2026-04-21T13:54:09.803Z
checksum: 8fc2cd617f94f3189944f8c32ce4537941cf6f9caa21cd1e102b6b443cbe0b2a
---

# Form.Card

## Import

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.Card />)
```

## Description

`Form.Card` is a wrapper for the [Card](/uilib/components/card/) component to make it easier to use inside a form:

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
    "stack": {
      "doc": "True to stack the sub components with space between. Same as `stack` in [Card](/uilib/components/card/properties). But defaults to `true`.",
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
    "outset": {
      "doc": "Whether or not to break out (using negative margins) on larger screens. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "direction": {
      "doc": "Defaults to `vertical`.",
      "type": ["\"horizontal\"", "\"vertical\""],
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
      "type": ["string", "number"],
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
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```
