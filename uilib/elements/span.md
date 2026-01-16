---
title: 'Span'
description: 'Spans are inline-elements, used to define parts of text content.'
metadata: https://eufemia.dnb.no/uilib/elements/span/metadata.json
---

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
  </div>,
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
