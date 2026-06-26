---
title: 'TermDefinition'
description: 'Use TermDefinition to explain a word or phrase without leaving the page.'
version: 11.8.0
generatedAt: 2026-06-26T12:38:09.766Z
checksum: ddde1de4add0beaa3d7c7dbdc745c3cd9e3979a812b8f919df7d27f68010e307
---

# TermDefinition

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

The TermDefinition component uses [PortalRoot](/uilib/components/portal-root) internally to render its explanation content. See the [PortalRoot documentation](/uilib/components/portal-root) for information on how to control where the portal content appears in the DOM, and for the [BrowserTranslate helper](/uilib/components/portal-root/#browsertranslate-helper-google-translate) when browser translation tools such as Google Translate should not modify content rendered through PortalRoot.

<RelatedComponents />


## Demos

### Basic


```tsx
render(<P>
        A text with{' '}
        <TermDefinition content="Unusual words are words that are not commonly used or that many people might not know the meaning of.">
          unusual words (yeah)
        </TermDefinition>{' '}
        lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </P>)
```


### In help text


```tsx
render(<Form.Handler>
        <Form.Card>
          <Form.SubHeading>My form</Form.SubHeading>
          <Field.Email help={{
      title: 'Email help',
      content: <>
                  Enter your{' '}
                  <TermDefinition content="Email is a method of exchanging messages between people using electronic devices.">
                    email
                  </TermDefinition>{' '}
                  address
                </>
    }} />
          <Field.Boolean variant="radio" label="Consent" help={{
      title: 'Data processing help',
      content: <>
                  I consent to{' '}
                  <TermDefinition content="Data processing refers to any operation performed on personal data, such as collection, storage, use, or disclosure.">
                    data processing
                  </TermDefinition>
                </>
    }} />
        </Form.Card>
      </Form.Handler>)
```


### In label


```tsx
render(<Form.Handler>
        <Form.Card>
          <Form.SubHeading>My form</Form.SubHeading>
          <Field.Email label={<>
                Enter your{' '}
                <TermDefinition content="Email is a method of exchanging messages between people using electronic devices.">
                  email
                </TermDefinition>{' '}
                address
              </>} />
          <Field.Boolean variant="checkbox" label={<>
                I consent to{' '}
                <TermDefinition content="Data processing refers to any operation performed on personal data, such as collection, storage, use, or disclosure.">
                  data processing
                </TermDefinition>
              </>} />
        </Form.Card>
      </Form.Handler>)
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

## Properties


```json
{
  "props": {
    "children": {
      "doc": "Term shown as the trigger. Typically a short word or phrase.",
      "type": "React.ReactNode",
      "status": "required"
    },
    "content": {
      "doc": "Definition text that will be displayed inside.",
      "type": "React.ReactNode",
      "status": "required"
    },
    "placement": {
      "doc": "Defines the preferred popover placement relative to the trigger.",
      "type": [
        "\"top\"",
        "\"right\"",
        "\"bottom\"",
        "\"left\""
      ],
      "defaultValue": "\"bottom\"",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
      "type": "boolean",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `left` or `right` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  }
}
```


## Translations


```json
{
  "locales": [
    "da-DK",
    "en-GB",
    "nb-NO",
    "sv-SE"
  ],
  "entries": {
    "TermDefinition.closeButtonTitle": {
      "nb-NO": "Lukk ordforklaring",
      "en-GB": "Close definition",
      "sv-SE": "Stäng ordförklaring",
      "da-DK": "Luk ordforklaring"
    },
    "TermDefinition.closeTriggerTitle": {
      "nb-NO": "Klikk for å lukke ordforklaring",
      "en-GB": "Click to close definition",
      "sv-SE": "Klicka för att stänga ordförklaring",
      "da-DK": "Klik for at lukke ordforklaring"
    },
    "TermDefinition.openTriggerTitle": {
      "nb-NO": "Klikk for å åpne ordforklaring",
      "en-GB": "Click to open definition",
      "sv-SE": "Klicka för att öppna ordförklaring",
      "da-DK": "Klik for at åbne ordforklaring"
    }
  }
}
```
