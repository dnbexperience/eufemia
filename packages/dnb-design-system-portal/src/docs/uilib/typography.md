---
title: 'Typography'
icon: 'typography'
order: 5
---

import ComponentBox from 'Tags/ComponentBox'

# Typography

Fonts are handled automatically once the CSS packages **dnb-ui-core** or **dnb-ui-basis** are loaded.

Every typography HTML element, like headings and paragraphs, have a defined `height`, respective `line-height` so everything falls exactly into the **8 pixel grid**.

You don't need to define the `font-family` ever, but rather use CSS Custom Properties for `font-weight`, `font-size` and `line-height`.

Read more how to use the [different weights](/uilib/typography/font-weights/).

## Font Face

The DNB default Font Family is `DNB`. This font, together with it's weights is loaded and imported with `@font-face` in `/css/core/fonts.scss`. The font family is included in the library package.

## Headings and heading styles

The DNB UX team has defined three levels of heading styles:

- `.dnb-h-xx--large` (Heading xx-large)
- `.dnb-h-x--large` (Heading x-large)
- `.dnb-h--large` (Heading large)

Also available are:

- `.dnb-h--medium`
- `.dnb-h--basis`
- `.dnb-h--small`
- `.dnb-h--x-small`

Optional, you could use `.dnb-lead` (equivalent to `.dnb-h--medium`) to style a heading as well. But only if that would make sense in the particular context.

The sizes are aligned to the [font-size definitions](/uilib/typography/font-size).

### Think semantics first

You should [think semantics first](/uilib/usage/best-practices/for-typography#headings-and-styling) once you choose what level of heading you use. Always try to start with an `<h1>`. Later on you can style them properly.

If you have to use a paragraph or a arbitrary heading, and it has to **look like** a specific heading, you can use these classes:

- `.dnb-h--xx-large`
- `.dnb-h--x-large`
- `.dnb-h--large`
- etc.

Read more about [best practices for typography](/uilib/usage/best-practices/for-typography).

### Spacing / margin of headings

You can use the [Spacing properties](/uilib/components/space/properties) inside every Eufemia React Element, but keep in mind, [margin collapsing](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing) can some times a little tricky to get right.

```jsx
import { H1, H2, ... } from 'dnb-ui-lib/elements'

<H1 bottom="x-large">Heading with bottom margin: x-large</H1>
<H2 top="x-large">Heading with top margin: x-large</H2>
```

<ComponentBox caption="Example of margin collapsing. Only x-large takes effect.">
{`
<H1 size="small" top bottom="small">Heading with bottom margin: small</H1>
<P collapse="false" top="large" bottom="small">Heading with top margin: large</P>
<P collapse="false" top="large">Heading with top margin: large - not collapsed</P>
`}
</ComponentBox>

### Heading styles in React

```jsx
import { H1, H2, ... } from 'dnb-ui-lib/elements'

<H1>Heading style xx-large</H1>
<H1 size="small">Heading style small</H1>

/** These are equivalent */
<H1><small>Heading style x-large</small></H1>
<H1 modifier="small">Heading style x-large</H1>
```

<ComponentBox caption="Default Heading typography using React JSX">
{`
<H1 bottom="large">Heading style xx-large</H1>
<H1 size="x-large">Heading style x-large (one down)</H1>
<H1 size="small">Heading style small</H1>
<H2>Heading style large</H2>
`}
</ComponentBox>

### Heading styles in vanilla HTML

<ComponentBox reactLive hideCode caption="Heading styles in vanilla HTML">
{`
<h1 className="dnb-h--xx-large">Heading style xx-large</h1>
<h2 className="dnb-h--x-large">Heading style x-large</h2>
<h5 className="dnb-h--large">Heading style large</h5>
<h3 className="dnb-h--small">Heading style small</h3>
<h3 className="dnb-h--basis">Heading style basis</h3>
`}
</ComponentBox>

<ComponentBox reactLive hideCode data-dnb-test="heading-additional" caption="Additional Heading modifiers">
{`
<article>
  <h1 className="dnb-h--xx-large">
    <small>dnb-h--x-large</small> Normal dnb-h--xx-large
  </h1>
  <h2 className="dnb-h--large">
    Normal dnb-h--large <small>dnb-h--medium</small>
  </h2>
  <h3 className="dnb-lead">
    Normal dnb-h--medium <small>dnb-h--basis</small>
  </h3>
</article>
`}
</ComponentBox>

### Paragraph

Paragraph comes in several variants. You can use these classes:

- `.dnb-p` (Text basis)
- `.dnb-p--medium`
- `.dnb-p--bold`
- `.dnb-p--small`

<!-- - `.dnb-p--ingress` -->

### Paragraphs in React

```jsx
import { Lead, P, Link, ... } from 'dnb-ui-lib/elements'

<Lead>Lead style medium</Lead>
<P>Paragraph style basis</P>
<P modifier="small">Paragraph style small</P>
```

<ComponentBox data-dnb-test="paragraph-modifiers" caption="Default paragraph typography using React JSX">
{`
<P bottom="small">Paragraph (Default)</P>
<P modifier="medium">Paragraph (Medium weight)</P>
<P modifier="bold">Paragraph (Bold weight)</P>
<P modifier="small">Paragraph Small</P>
<P modifier="small medium">Paragraph Small (Medium weight)</P>
<P modifier="small bold">Paragraph Small (Bold weight)</P>
`}
</ComponentBox>

### Paragraphs with vanilla HTML

<ComponentBox reactLive hideCode data-dnb-test="paragraph-default" caption="Default Paragraph styles">
{`
<p className="dnb-p">
  Here is a paragraph text<br />
  <a href="/" className="dnb-anchor">Anchor / Text Link</a><br />
  <b>Bold paragraph</b><br />
  <strong>Strong paragraph</strong><br />
  <i>Italic paragraph</i><br />
  <u>Underline paragraph</u><br />
  Numbers 0123456789<br />
  <code className="dnb-code">Code paragraph</code><br />
  <cite>Cite paragraph</cite><br />
</p>
`}
</ComponentBox>

<ComponentBox reactLive hideCode data-dnb-test="paragraph-small" caption="Paragraph with small font-size">
{`
<p className="dnb-p dnb-p--small">
  Here is a small paragraph text<br />
  <a href="/" className="dnb-anchor">Anchor / Text Link</a><br />
  <b>Bold paragraph</b><br />
  <strong>Strong paragraph</strong><br />
  <i>Italic paragraph</i><br />
  <u>Underline paragraph</u><br />
  Numbers 0123456789<br />
  <code className="dnb-code">Code paragraph</code><br />
  <cite>Cite paragraph</cite><br />
</p>
<p className="dnb-p dnb-p--x-small">
  Here is a x-small paragraph text<br />
  with a new line.
</p>
`}
</ComponentBox>

<ComponentBox reactLive hideCode data-dnb-test="paragraph-additional" caption="Additional Paragraph formatting (not defined yet)">
{`
<p className="dnb-p">
  <del>Deleted paragraph</del><br />
  <mark>Marked paragraph</mark><br />
  <ins>Inserted paragraph</ins><br />
  <sub>Subscript paragraph</sub><br />
  <sup>Superscript paragraph</sup><br />
</p>
`}
</ComponentBox>

Read more [about Fonts in the Designer Guides](/quickguide-designer/fonts/)

## Anchor

- `.dnb-anchor` <a href="/" class="dnb-anchor">Anchor with default style</a>
- `.dnb-anchor--hover` <a href="/" class="dnb-anchor dnb-anchor--hover">Hover Style</a>
- `.dnb-anchor--active` <a href="/" class="dnb-anchor dnb-anchor--active">Active Style</a>
- `.dnb-anchor--focus` <a href="/" class="dnb-anchor dnb-anchor--focus">Focus Style</a>

Read more about the [Anchor / Text Link](/uilib/elements/anchor)

## DNB Mono (monospace)

DNB hast it's own monospace typeface (`font-family`).

Use it either by a CSS class `.dnb-typo-mono-regular` or define your own like so:

```css
.css-selector {
  font-family: var(--font-family-monospace);
  font-weight: normal;
  font-style: normal;
}
```
