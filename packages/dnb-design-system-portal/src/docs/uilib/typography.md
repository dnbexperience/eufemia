---
title: 'Typography'
icon: 'typography'
draft: false
order: 5
---

import CodeBlock from 'Tags/CodeBlock'
import ComponentBox from 'Tags/ComponentBox'

# Typography

Fonts are handled automatically once the CSS packages **dnb-ui-core** or **dnb-ui-basis** are loaded.

Every typography HTML element, like headings and paragraphs, have a defined `height`, respective `line-height` so everything falls exactly into the **8 pixel grid**.

You don't need to define the `font-family` ever, but rather use CSS Custom Properties for `font-weight`, `font-size` and `line-height`.

Read more how to use the [different weights](/uilib/typography/font-weights/).

## Font Face

The DNB default Font Family is `Fedra Sans Std`. This font, together with it's weights is loaded and imported with `@font-face` in `/css/core/fonts.scss`. The font family is included in the library package.

## Headings

The DNB UX team has currently only defined tree levels of heading styles (h1, h2 and h3). But level 4, 5 and 6 are also supported by the `dnb-ui-lib`.

### Think semantics first

You should [think semantics first](/uilib/usage/best-practices/for-typography#headings-and-styling) once you choose what level of heading you use. Always try to start with an `<h1>`. Later on you can style them properly.

If you have to use a paragraph or a arbitrary heading, and it has to **look like** a specific heading, you can use these classes:

- `.dnb-h1`
- `.dnb-h1--small`
- `.dnb-h2`
- `.dnb-lead` (h3)

Read more about [best practices for typography](/uilib/usage/best-practices/for-typography).

### Headings in React

```jsx
import { H1, H2, Lead, P, Link, ... } from 'dnb-ui-lib/elements'

<H1>Title</H1>
```

<ComponentBox hideOnTest caption="Default Heading typography using React JSX">
{`
<H1 style_type="small">H1 small</H1>
<H1>H1</H1>
<H2>H2</H2>
<Lead>Lead</Lead>
`}
</ComponentBox>

### Headings with vanilla HTML

<CodeBlock reactLive hideCode caption="Default Heading typography">
{`
<h1 class="dnb-h1">H1</h1>
<h2 class="dnb-h2">H2</h2>
<h3 class="dnb-lead">Lead</h3>
`}
</CodeBlock>

<CodeBlock reactLive hideCode data-dnb-test="heading-additional" caption="Additional Heading typography">
{`
<article>
  <h1 class="dnb-h1">
    <small>Small H1</small> Normal H1
  </h1>
  <h1 class="dnb-h1 dnb-h1--small">Small H1 with class</h1>
  <h2 class="dnb-h2">
    Normal H2 <small>Small H2</small>
  </h2>
  <h3 class="dnb-lead">
    Normal H3/Lead <small>Small H3/Lead</small>
  </h3>
</article>
`}
</CodeBlock>

### Paragraph

Paragraph comes in several variants. You can use these classes:

- `.dnb-p` (Body)
- `.dnb-p--demi`
- `.dnb-p--medium`
- `.dnb-p--ingress`
- `.dnb-p--small`

### Paragraphs in React

  <ComponentBox hideOnTest caption="Default paragraph typography using React JSX">
  {`
  <P>Paragraph (Body)</P>
  <P style_type="demi">Paragraph Demi</P>
  <P style_type="medium">Paragraph Medium</P>
  <P style_type="ingress">Paragraph Ingress</P>
  <P style_type="small">Paragraph Small</P>
  <P style_type="small demi">Paragraph Demi Small</P>
  <P style_type="small medium">Paragraph Medium Small</P>
  `}
  </ComponentBox>

### Paragraphs with vanilla HTML

<CodeBlock reactLive hideCode data-dnb-test="paragraph-default" caption="Default Paragraph styles">
{`
<p class="dnb-p">
  Here is a paragraph text<br />
  <a href="/" class="dnb-anchor">Anchor / Text Link</a><br />
  <b>Bold paragraph</b><br />
  <strong>Strong paragraph</strong><br />
  <i>Italic paragraph</i><br />
  <u>Underline paragraph</u><br />
  Numbers 0123456789<br />
  <code class="dnb-code">Code paragraph</code><br />
  <cite>Cite paragraph</cite><br />
</p>
`}
</CodeBlock>

<CodeBlock reactLive hideCode data-dnb-test="paragraph-small" caption="Paragraph with small font-size">
{`
<p class="dnb-p dnb-p--small">
  Here is a small paragraph text<br />
  <a href="/" class="dnb-anchor">Anchor / Text Link</a><br />
  <b>Bold paragraph</b><br />
  <strong>Strong paragraph</strong><br />
  <i>Italic paragraph</i><br />
  <u>Underline paragraph</u><br />
  Numbers 0123456789<br />
  <code class="dnb-code">Code paragraph</code><br />
  <cite>Cite paragraph</cite><br />
</p>
`}
</CodeBlock>

<CodeBlock reactLive hideCode data-dnb-test="paragraph-additional" caption="Additional Paragraph formatting (not defined yet)">
{`
<p class="dnb-p">
  <del>Deleted paragraph</del><br />
  <mark>Marked paragraph</mark><br />
  <ins>Inserted paragraph</ins><br />
  <sub>Subscript paragraph</sub><br />
  <sup>Superscript paragraph</sup><br />
</p>
`}
</CodeBlock>

Read more [about Fonts in the Designer Guides](/quickguide-designer/fonts/)

## Anchor

- `.dnb-anchor` <a href="/" class="dnb-anchor">Anchor with default style</a>
- `.dnb-anchor--hover` <a href="/" class="dnb-anchor dnb-anchor--hover">Hover Style</a>
- `.dnb-anchor--active` <a href="/" class="dnb-anchor dnb-anchor--active">Active Style</a>
- `.dnb-anchor--focus` <a href="/" class="dnb-anchor dnb-anchor--focus">Focus Style</a>

Read more about the [Anchor / Text Link](/uilib/elements/anchor)
