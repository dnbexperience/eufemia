---
title: 'HelpButton'
description: 'A help button with custom semantics, helping screen readers determine the meaning of that button.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:26.771Z
checksum: 4c38317663e884d46d1687367502de962906c21331a6f78b8de2c78f8d99087f
---

# HelpButton

## Import

```tsx
import { HelpButton } from '@dnb/eufemia'
```

## Description

A help button with custom semantics, helping screen readers determine the meaning of the button. Visually, it is a default [icon button](/uilib/components/button#icon-button) with the `question` icon as its basis.

This button is used as the default [Modal trigger button](/uilib/components/modal/demos).

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=43836-5699)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/help-button)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/help-button)

## Demos

### Default HelpButton

```tsx
render(<HelpButton>Text</HelpButton>)
```

### Help button inside a suffix

```tsx
render(
  <Input
    size={10}
    placeholder="Input ..."
    suffix={<HelpButton title="Custom title">Text</HelpButton>}
  />
)
```

### Help button in different sizes

```tsx
<HelpButton title="Custom title">Text</HelpButton>
<HelpButton
  size="small"
  left
  on_click={() => {
    console.log('on_click')
  }}
>
  Text
</HelpButton>
```

### Help button with an information icon

```tsx
render(
  <HelpButton icon="information" tooltip="More info">
    <Dl>
      <Dt>Term</Dt>
      <Dd>Description</Dd>
      <Dd>Description</Dd>
      <Dt>Term</Dt>
      <Dd>Description</Dd>
    </Dl>
  </HelpButton>
)
```

### Help button used inside text

```tsx
render(
  <span>
    Text <HelpButton>Text</HelpButton> Text
  </span>
)
```

## Properties

```json
{
  "props": {
    "children": {
      "doc": "The content to show.",
      "type": "React.Node",
      "status": "optional"
    },
    "title": {
      "doc": "The content title. Defaults to `Hjelpetekst` (HelpButton.title).",
      "type": "string",
      "status": "optional"
    },
    "icon": {
      "doc": "To be included in the button. [Primary Icons](/icons/primary) can be set as a string (e.g. `icon=\"information\"`), other icons should be set as React elements.",
      "type": ["string", "React.ReactNode"],
      "status": "optional"
    },
    "render": {
      "doc": "Accepts a function that returns a valid React Element. See example below.",
      "type": "function",
      "status": "optional"
    },
    "[Button](/uilib/components/button/properties)": {
      "doc": "All button properties.",
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

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "HelpButton.aria_role": {
      "nb-NO": "Hjelp-knapp",
      "en-GB": "Help button",
      "sv-SE": "Hjälp-knapp",
      "da-DK": "Hjælp-knap"
    },
    "HelpButton.title": {
      "nb-NO": "Hjelpetekst",
      "en-GB": "Help text",
      "sv-SE": "Hjälptext",
      "da-DK": "Hjælpetekst"
    }
  }
}
```

## How to use `render`

```tsx
render(
  <HelpButton
    title="Title"
    render={(children, props) => (
      <Dialog triggerAttributes={props} className="your-class">
        {children}
      </Dialog>
    )}
  >
    Help text
  </HelpButton>
)
```

## Events

```json
{
  "props": {
    "[Button](/uilib/components/button/events)": {
      "doc": "Accepts all Button events.",
      "type": "Various",
      "status": "optional"
    }
  }
}
```
