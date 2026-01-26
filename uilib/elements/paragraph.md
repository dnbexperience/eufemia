---
title: 'Paragraph'
description: 'Paragraphs are block-level elements, used to structure and format text contents.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:26.756Z
checksum: 8ca1a8dbfa38ce91ec8dc7ebf113334db61f45a4848fa815125f84df2a476441
---

# Paragraph

## Import

```tsx
import { P } from '@dnb/eufemia/elements'
```

## Description

Paragraphs are block-level elements used to structure and format text contents.

Paragraph has some default typography styling, even without any properties being set.

Read more [about Fonts in the Designer Guides](/quickguide-designer/fonts/).

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/elements/paragraph)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/elements/paragraph)

### Typography CSS classes

Both Paragraph and the [Span](/uilib/elements/span/) component have the same typography properties that use the [typography helper classes](/uilib/typography/helper-classes/).

## Demos

### Paragraphs modifiers

These are the standard available modifiers for paragraph typography:

- [Weight](#weight)
- [Size](#size)
- [Alignment](#alignment)
- [Font family](#font-family)
- [Line height](#line-height)

As well as some [other modifiers](#other-modifiers).

#### Weight

```tsx
<P>Default paragraph</P>
<P weight="regular">Regular weight paragraph (same as default)</P>
<P weight="medium">Medium weight paragraph</P>
```

#### Size

Also automatically sets the matching line-height (`line` property).

```tsx
<P size="x-small">x-small paragraph</P>
<P size="small">small paragraph</P>
<P size="medium">medium paragraph</P>
<P size="basis">basis paragraph (same as default)</P>
<P size="large">large paragraph</P>
<P size="x-large">x-large paragraph</P>
<P size="xx-large">xx-large paragraph</P>
```

#### Alignment

```tsx
<P align="right">Right aligned paragraph</P>
<P align="center">Center aligned paragraph</P>
<P align="left">Left aligned paragraph</P>
```

#### Font family

```tsx
<P family="basis">Basis family paragraph (same as default)</P>
<P family="heading">
  Heading family paragraph (only different on some themes)
</P>
<P family="monospace">Monospace family paragraph</P>
```

#### Line height

Line-height will be set automatically based on the `size` properties, but can also be set separately if needed.

```tsx
<P lineHeight="x-small">x-small line-height paragraph</P>
<P lineHeight="small">small line-height paragraph</P>
<P lineHeight="medium">medium line-height paragraph</P>
<P lineHeight="basis">basis line-height paragraph (same as default)</P>
<P lineHeight="large">large line-height paragraph</P>
<P lineHeight="x-large">x-large line-height paragraph</P>
<P lineHeight="xx-large">xx-large line-height paragraph</P>
```

#### Other modifiers

Although bold, italic and underline are not a standard part of the Eufemia design system for typography (in particular, "medium" should be used instead of "bold"), we still include them as an option for convenience. And there are also cases where an accessibility case can be made for their use.

```tsx
render(
  <article>
    <P weight="bold">Bold weight paragraph</P>
    <P decoration="underline">Underline paragraph</P>
    <P slant="italic">Italic paragraph</P>
  </article>
)
```

#### Prose max width

The `proseMaxWidth` prop allows you to limit the width of paragraph text based on character count, creating optimal reading line lengths:

```tsx
render(
  <Flex.Stack>
    <P>
      This is a regular paragraph without any width constraints. It will
      extend to the full width of its container.
    </P>
    <P proseMaxWidth={60}>
      This paragraph uses proseMaxWidth={60} to limit its width to
      approximately 60 characters.
    </P>
    <P proseMaxWidth={40}>
      This paragraph uses proseMaxWidth={40} for an even narrower reading
      width.
    </P>
    <P proseMaxWidth>
      This paragraph uses proseMaxWidth with its default value.
    </P>
  </Flex.Stack>
)
```

#### Using Typography.Provider

Use `Typography.Provider` to apply `proseMaxWidth` to multiple paragraphs at once:

```tsx
render(
  <Flex.Stack>
    <Typography.Provider proseMaxWidth={60}>
      <P>
        This paragraph is inside a Typography.Provider with proseMaxWidth=
        {60}
      </P>
      <P>
        This paragraph also inherits the same proseMaxWidth from the
        Provider
      </P>
      <P proseMaxWidth={40}>
        This paragraph overrides the Provider value with its own
        proseMaxWidth={40}
      </P>
    </Typography.Provider>
  </Flex.Stack>
)
```

### Children tag styling

Paragraph also adds some default styling to child typography HTML elements. Like `<b>` or `<strong>`.

#### Paragraphs `basis` sized

```tsx
render(
  <P>
    <Case>Here is a paragraph text</Case>
    <Case>
      <Anchor href="/">Anchor / Text Link</Anchor>
    </Case>
    <Case>
      <b>Bold paragraph (medium weight)</b>
    </Case>
    <Case>
      <strong>Strong paragraph (medium weight)</strong>
    </Case>
    {/* <i>Italic paragraph (Currently not supported by DNB UX)</i> */}
    {/* <u>Underline paragraph (Currently not supported by DNB UX)</u> */}
    <Case>Numbers 0123456789</Case>
    <Case>
      <code className="dnb-code">Code paragraph</code>
    </Case>
    <Case>
      <cite>Cite paragraph</cite>
    </Case>
    <Case>
      Text <sup>1</sup>{' '}
      <b>
        Text <sup>1</sup>
      </b>{' '}
    </Case>
    <Case>
      Text{' '}
      <sup>
        <Anchor href="/">1</Anchor>
      </sup>{' '}
      <b>
        Text{' '}
        <sup>
          <Anchor href="/">1</Anchor>
        </sup>
      </b>{' '}
    </Case>
    <Case>
      Text <sub>1</sub>{' '}
      <b>
        Text <sub>1</sub>
      </b>{' '}
    </Case>
    <Case>
      <abbr title="Bolig Sparing for Ungdom">BSU</abbr>
    </Case>
  </P>
)
```

##### Paragraph `small` sized

```tsx
render(
  <article>
    <P size="small">
      <Case>Here is a small paragraph text</Case>
      <Case>
        <Anchor href="/">Anchor / Text Link</Anchor>
      </Case>
      <Case>
        <b>Bold paragraph (medium weight)</b>
      </Case>
      <Case>
        <strong>Strong paragraph (medium weight)</strong>
      </Case>
      <Case>Numbers 0123456789</Case>
      <Case>
        <code className="dnb-code">Code paragraph</code>
      </Case>
      <Case>
        <cite>Cite paragraph</cite>
      </Case>
      <Case>
        Text <sup>1</sup>{' '}
        <b>
          Text <sup>1</sup>
        </b>{' '}
      </Case>
      <Case>
        Text{' '}
        <sup>
          <Anchor href="/">1</Anchor>
        </sup>{' '}
        <b>
          Text{' '}
          <sup>
            <Anchor href="/">1</Anchor>
          </sup>
        </b>{' '}
      </Case>
      <Case>
        Text <sub>1</sub>{' '}
        <b>
          Text <sub>1</sub>
        </b>{' '}
      </Case>
    </P>
    <P size="x-small">
      <Case>
        Here is a x-small paragraph text
        <br />
        with a new line.
      </Case>
    </P>
  </article>
)
```

##### Additional Paragraph formatting (not defined yet)

```tsx
render(
  <P>
    <Case>
      <i>Italic paragraph</i>
    </Case>
    <Case>
      <u>Underline paragraph</u>
    </Case>
    <Case>
      <Anchor title="User Experience">UX</Anchor>
    </Case>
    <Case>
      <del>Deleted paragraph</del>
    </Case>
    <Case>
      <mark>Marked paragraph</mark>
    </Case>
    <Case>
      <ins>Inserted paragraph</ins>
    </Case>
    <Case>
      Text <sup>Superscript</sup>
    </Case>
    <Case>
      Text <sub>Subscript</sub>
    </Case>
  </P>
)
```

```tsx
<PWrap customSize="default" />
<PWrap size="xx-large" />
<PWrap size="x-large" />
<PWrap size="large" />
<PWrap size="medium" />
<PWrap size="basis" />
<PWrap size="small" />
<PWrap size="x-small" />
```

## Properties

```json
{
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
  },
  "medium": {
    "doc": "Tells the component to use the medium font-weight styling `dnb-t__weight--medium`. More details [here](/uilib/typography/font-weight).",
    "type": "boolean",
    "status": "deprecated"
  },
  "bold": {
    "doc": "Tells the component to use the bold font-weight styling class `dnb-t__weight--bold`. More details [here](/uilib/typography/font-weight).",
    "type": "boolean",
    "status": "deprecated"
  },
  "modifier": {
    "doc": "String containing a combination of modifiers, used to set both font-size and weight in one property. e.g. `x-small medium` would make the paragraph extra small and medium.",
    "type": "string",
    "status": "deprecated"
  }
}
```
