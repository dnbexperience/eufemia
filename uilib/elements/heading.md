---
title: 'Heading'
description: 'The heading element is used to indicate the quotation of a large section of text from another source.'
metadata: https://eufemia.dnb.no/uilib/elements/heading/metadata.json
---

## Import

```tsx
import { Heading } from '@dnb/eufemia/components'
import { H1, H2, H3, H4, H5, H6 } from '@dnb/eufemia/elements'
```

## Description

Eufemia comes with three levels of heading styles:

- `.dnb-h--xx-large` (Heading xx-large)
- `.dnb-h--x-large` (Heading x-large)
- `.dnb-h--large` (Heading large)

Additionally, you can use these style modifiers if needed:

- `.dnb-h--medium`
- `.dnb-h--basis`
- `.dnb-h--small`
- `.dnb-h--x-small`

Optionally, you can use `.dnb-lead` (equivalent to `.dnb-h--medium`) to style a heading as well, but only if that makes sense in the particular context.

The sizes are aligned to the [font-size definitions](/uilib/typography/font-size).

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/elements/heading)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/elements/heading)

## Think semantics first

You should [think semantics first](/uilib/usage/best-practices/for-typography#headings-and-styling) when choosing what level of heading you use. Always try to start with an `<h1>`. When the heading levels are properly defined, you can go ahead and define the sizes (styles).

If you have to use a paragraph (`<p>`) or an arbitrary heading, and it has to **look like** a specific heading, you can use these classes:

- `.dnb-h--xx-large`
- `.dnb-h--x-large`
- `.dnb-h--large`
- etc.

Read more about [best practices for typography](/uilib/usage/best-practices/for-typography).

## Automated heading levels

There is also [Heading](/uilib/components/heading), a component to create automated semantic headings within a boundary of some rules.

```jsx
import { Heading } from '@dnb/eufemia/components'
```

## Heading styles in React

```jsx
import { H1, H2, ... } from '@dnb/eufemia'
```

## Demos

### The most basic use of headings

Just using the `H1, H2, etc.` components will give you the basic headings.

```tsx
<H1>Heading 1</H1>
<H2>Heading 2</H2>
<H3>Heading 3</H3>
<H4>Heading 4</H4>
<H5>Heading 5</H5>
<H6>Heading 6</H6>
<P>Regular text</P>
```

### Heading typography using React JSX

The visual size of a heading can be customized using the `size` property with values: `xx-large | x-large | large | medium | basis | small | x-small`

```tsx
<H1>Heading 1 (default size 'xx-large')</H1>
<H1 size="x-large">Heading 1 style 'x-large'</H1>
<H1 size="small">Heading 1 style small</H1>
```

By using the `<small>` element, we decrease the size one level (default size is `xx-large`):

```tsx
<H1 size="x-large">Heading style x-large (using 'size')</H1>
<H1>
  <small>Heading style x-large (using &lt;small&gt;)</small>
</H1>
```

### Prose max width

The `proseMaxWidth` prop allows you to limit the width of heading text based on character count, creating optimal reading line lengths:

```tsx
<H2>
  This is a regular heading without any width constraints. It will extend
  to the full width of its container.
</H2>
<H2 proseMaxWidth={40}>
  This heading uses proseMaxWidth={40} to limit its width to
  approximately 40 characters.
</H2>
<H2 proseMaxWidth={20}>
  This heading uses proseMaxWidth={20} for an even narrower reading
  width.
</H2>
<H2 proseMaxWidth>
  This heading uses proseMaxWidth with its default value.
</H2>
```

## Heading styles in vanilla HTML

```tsx
<h1 className="dnb-h--xx-large">Heading style xx-large</h1>
<h2 className="dnb-h--x-large">Heading style x-large</h2>
<h5 className="dnb-h--large">Heading style large</h5>
<h3 className="dnb-h--small">Heading style small</h3>
<h3 className="dnb-h--basis">Heading style basis</h3>
```

### Additional Heading modifiers

```tsx
render(
  <article>
    <h1 className="dnb-h--xx-large">
      .dnb-h--xx-large <small>small</small>
    </h1>
    <h2 className="dnb-h--x-large">
      .dnb-h--x-large <small>small</small>
    </h2>
    <h2 className="dnb-h--large">
      .dnb-h--large <small>small</small>
    </h2>
    <h3 className="dnb-h--medium">
      .dnb-h--medium <small>small</small>
    </h3>
    <h3 className="dnb-lead">
      .dnb-lead <small>small</small>
    </h3>
  </article>,
)
```

### Example of margin collapsing

Only the largest margin takes effect.

```tsx
<H1 size="small" top bottom="small">
  Spacing with bottom margin: small
</H1>
<P top="large" bottom="small">
  Spacing with top margin: large
</P>
```

```tsx
<ComponentBox
  scope={{
    HWrap,
  }}
  data-visual-test="heading-sizes"
>
  <HWrap size="xx-large" />
  <HWrap size="x-large" />
  <HWrap size="large" />
  <HWrap size="medium" />
  <HWrap size="basis" />
  <HWrap size="small" />
  <HWrap size="x-small" />
</ComponentBox>
<ComponentBox
  scope={{
    HWrap,
  }}
  data-visual-test="heading-base"
>
  <H>default (h1 - xx-large)</H>
  <H as="h2">custom level (h2 - xx-large)</H>
  <H size="small">custom size (h1 - small)</H>
  <H as="h2" size="small">
    custom level and size (h2 - small)
  </H>
</ComponentBox>
```
