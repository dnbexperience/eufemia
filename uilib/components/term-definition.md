---
title: 'TermDefinition'
description: 'TermDefinition renders a compact, inline explanation for a word or phrase with an anchor-style trigger button.'
metadata: https://eufemia.dnb.no/uilib/components/term-definition/metadata.json
---

## Import

```tsx
import { TermDefinition } from '@dnb/eufemia'
```

## Description

TermDefinition renders a compact, inline explanation for a word or phrase with an anchor-style trigger button.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/term-definition)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/term-definition)

## Accessibility

To ensure that the TermDefinition component is accessible, it uses semantic HTML elements and appropriate ARIA attributes.

- All content inside the TermDefinition can be selected when it is open.
- Clicking anywhere outside the TermDefinition, or pressing Escape, closes it.
- The trigger looks like an [Anchor](/uilib/components/anchor) but is actually a semantic button.
- It is fully focusable and works with keyboard navigation.
- The trigger is aligned to the left side of the word for better readability (not centered).
- Screen readers read the word (its children) first and then announce that the trigger can be activated to show more information.
- When the TermDefinition opens, it receives focus and the screen reader announces its content.
- When it closes, focus returns to the trigger so keyboard users keep their place in the document.
- The close button is placed last in the tab order, making it easy for keyboard users to reach after reading the content.
- It also closes automatically when focus moves outside the TermDefinition or when the Escape key is pressed.
- The trigger shows the hover style of an [Anchor](/uilib/components/anchor) when open.

## Root Element (React Portal)

The TermDefinition component uses [PortalRoot](/uilib/components/portal-root) internally to render its explanation content. See the [PortalRoot documentation](/uilib/components/portal-root) for information on how to control where the portal content appears in the DOM.

## Demos

### Basic

```tsx
render(
  <P>
    A text with{' '}
    <TermDefinition content="Unusual words are words that are not commonly used or that many people might not know the meaning of.">
      unusual words (yeah)
    </TermDefinition>{' '}
    lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </P>,
)
```

### In help text

```tsx
render(
  <Form.Handler>
    <Form.Card>
      <Form.SubHeading>My form</Form.SubHeading>
      <Field.Email
        help={{
          title: 'Email help',
          content: (
            <>
              Enter your{' '}
              <TermDefinition content="Email is a method of exchanging messages between people using electronic devices.">
                email
              </TermDefinition>{' '}
              address
            </>
          ),
        }}
      />
      <Field.Boolean
        variant="radio"
        label="Consent"
        help={{
          title: 'Data processing help',
          content: (
            <>
              I consent to{' '}
              <TermDefinition content="Data processing refers to any operation performed on personal data, such as collection, storage, use, or disclosure.">
                data processing
              </TermDefinition>
            </>
          ),
        }}
      />
    </Form.Card>
  </Form.Handler>,
)
```

### In label

```tsx
render(
  <Form.Handler>
    <Form.Card>
      <Form.SubHeading>My form</Form.SubHeading>
      <Field.Email
        label={
          <>
            Enter your{' '}
            <TermDefinition content="Email is a method of exchanging messages between people using electronic devices.">
              email
            </TermDefinition>{' '}
            address
          </>
        }
      />
      <Field.Boolean
        variant="checkbox"
        label={
          <>
            I consent to{' '}
            <TermDefinition content="Data processing refers to any operation performed on personal data, such as collection, storage, use, or disclosure.">
              data processing
            </TermDefinition>
          </>
        }
      />
    </Form.Card>
  </Form.Handler>,
)
```

```tsx
<Lead>
  As a lead with{' '}
  <TermDefinition content="Unusual words are words that are not commonly used or that many people might not know the meaning of.">
    unusual words (yeah)
  </TermDefinition>
  .
</Lead>
<H2 top={false}>
  As a heading with{' '}
  <TermDefinition content="Unusual words are words that are not commonly used or that many people might not know the meaning of.">
    unusual words (yeah)
  </TermDefinition>
  .
</H2>
```
