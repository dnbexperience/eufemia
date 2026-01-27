---
title: 'Span'
description: 'Spans are inline-elements, used to define parts of text content.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:27.211Z
checksum: 701d133ddb6c7ccf403a7d6763884e6c8b736ae9a3563f9fa68dd0ead96b28f5
---

# Span

## Import

```tsx
import { Span } from '@dnb/eufemia/elements'
```

## Description

Spans are inline elements used to define parts of text content.

Span does not define any default styling. If no properties are set, it will just be a regular inline `<span>` element.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/elements/span)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/elements/span)

### Typography CSS classes

Both Span and the [Paragraph](/uilib/elements/paragraph/) component have the same typography properties that use the [typography helper classes](/uilib/typography/helper-classes/).

## Demos

For more detailed examples of every property, see the [Paragraph demos](/uilib/elements/paragraph/#demos).

### Basics

```tsx
<P>
  Here is a paragraph with a <Span size="x-small">x-small</Span> word and
  some <Span weight="medium">medium weight text</Span> in it.
</P>
<H4>
  Heading 4 with <Span size="x-large">x-large</Span> word
</H4>
<Anchor href="/">
  Anchor with <Span weight="medium">medium weight</Span> words
</Anchor>
```

### Span modifiers

```tsx
render(
  <div>
    <Span>Default span</Span>
    <br />
    <Span weight="medium">Medium weight span</Span>
    <br />
    <Span size="basis">Basis size span</Span>
    <br />
    <Span weight="medium" size="x-small">
      X-small span with medium weight
    </Span>
  </div>
)
```

```tsx
<SpanWrap />
<SpanWrap size="xx-large" />
<SpanWrap size="x-large" />
<SpanWrap size="large" />
<SpanWrap size="medium" />
<SpanWrap size="basis" />
<SpanWrap size="small" />
<SpanWrap size="x-small" />
```

## Properties

```json
{
  "props": {
    "element": {
      "doc": "Defines the Element Type, like `p`.",
      "type": ["HTMLElement", "string"],
      "status": "optional"
    },
    "size": {
      "doc": "Sets the font size, also sets the line-height if `lineHeight` prop is not set.",
      "type": [
        "'x-small'",
        "'small'",
        "'basis'",
        "'medium'",
        "'large'",
        "'x-large'",
        "'xx-large'"
      ],
      "status": "optional"
    },
    "lineHeight": {
      "doc": "Sets the line height, will use same value as `size` if not set.",
      "type": [
        "'x-small'",
        "'small'",
        "'basis'",
        "'medium'",
        "'large'",
        "'x-large'",
        "'xx-large'"
      ],
      "status": "optional"
    },
    "align": {
      "doc": "Sets the text alignment.",
      "type": ["'center'", "'left'", "'right'"],
      "status": "optional"
    },
    "family": {
      "doc": "Sets the font family.",
      "type": ["'basis'", "'heading'", "'monospace'"],
      "status": "optional"
    },
    "weight": {
      "doc": "Sets the font weight.",
      "type": ["'regular'", "'medium'"],
      "status": "optional"
    },
    "decoration": {
      "doc": "Sets the font decoration.",
      "type": "'underline'",
      "status": "optional"
    },
    "slant": {
      "doc": "Sets the font style.",
      "type": "'italic'",
      "status": "optional"
    },
    "proseMaxWidth": {
      "doc": "Sets the maximum width based on character count. This will limit the text width to approximately the specified number of characters. Use `true` for a default value of 60ch.",
      "type": ["number", "boolean"],
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
