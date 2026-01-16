---
title: 'Card'
description: '`Form.Card` is a wrapper for the Card component to make it easier to use inside a form.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Form/Card/metadata.json
---

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
  </Flex.Stack>,
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
  </Flex.Stack>,
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
  </Form.Handler>,
)
```
