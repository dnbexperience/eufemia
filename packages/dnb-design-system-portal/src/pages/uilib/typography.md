---
title: 'Typography'
icon: 'typography'
draft: false
order: 4
---

import CodeBlock from 'Tags/CodeBlock'

# Typography

## Font Face

The DNB default Font Family is `Fedra Sans Std`. This font, together with it's weights is loaded and imported with `@font-face` in `/css/core/fonts.scss`. The font is included in the library package.
To make sure you don't load all of the font faces at once, you apply font `weights` to load the predefined font faces.

Read more how to use the [different weights](/uilib/typography/font-weights/).

### Headings

The DNB UX team has currently only defined tree levels of heading styles (h1, h2 and h3). But level 4, 5 and 6 are also supported by the `dnb-ui-lib`.

If you wish to have a header look like a heading, you can use these classes:

- `.dnb-h1`
- `.dnb-h2`
- `.dnb-lead`

Read more about [best practices for typography](/uilib/usage/best-practices/for-typography).

#### Heading examples

<CodeBlock reactLive hideCode caption="Default Heading typography">
{`
<h1 className="dnb-h1">H1</h1>
<h2 className="dnb-h2">H2</h2>
<h3 className="dnb-h3">H3</h3>
<h4 className="dnb-h4">H4</h4>
<h5 className="dnb-h5">H5</h5>
<h6 className="dnb-h6">H6</h6>
`}
</CodeBlock>

<CodeBlock reactLive hideCode data-dnb-test="heading-additional" caption="Additional Heading typography">
{`
<article>
  <h1 className="dnb-h1">
    <small>Small H1</small> Normal H1
  </h1>
  <h1 className="dnb-h1 dnb-small">Small H1 with class</h1>
  <h2 className="dnb-h2">
    Normal H2 <small>Small H2</small>
  </h2>
  <h3 className="dnb-h3">
    Normal H3/Lead <small>Small H3/Lead</small>
  </h3>
</article>
`}
</CodeBlock>

### Paragraph

<CodeBlock reactLive hideCode data-dnb-test="paragraph-default" caption="Default Paragraph styles">
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
</CodeBlock>

<CodeBlock reactLive hideCode data-dnb-test="paragraph-small" caption="Paragraph with small font-size">
{`
<p className="dnb-p">
  <small>
    Here is a small paragraph text<br />
    <a href="/" className="dnb-anchor">Anchor / Text Link</a><br />
    <b>Bold paragraph</b><br />
    <strong>Strong paragraph</strong><br />
    <i>Italic paragraph</i><br />
    <u>Underline paragraph</u><br />
    Numbers 0123456789<br />
    <code className="dnb-code">Code paragraph</code><br />
    <cite>Cite paragraph</cite><br />
  </small>
</p>
`}
</CodeBlock>

<CodeBlock reactLive hideCode data-dnb-test="paragraph-additional" caption="Additional Paragraph formatting (not defined yet)">
{`
<p className="dnb-p">
  <del>Deleted paragraph</del><br />
  <mark>Marked paragraph</mark><br />
  <ins>Inserted paragraph</ins><br />
  <sub>Subscript paragraph</sub><br />
  <sup>Superscript paragraph</sup><br />
</p>
`}
</CodeBlock>

Read more [about Fonts in the Designer Guides](/quickguide-designer/fonts/)

### Anchor

- `.dnb-anchor` <a href="/" class="dnb-anchor">Anchor with default style</a>
- `.dnb-anchor--hover` <a href="/" class="dnb-anchor dnb-anchor--hover">Hover Style</a>
- `.dnb-anchor--active` <a href="/" class="dnb-anchor dnb-anchor--active">Active Style</a>
- `.dnb-anchor--focus` <a href="/" class="dnb-anchor dnb-anchor--focus">Focus Style</a>

Read more about the [Anchor / Link](/uilib/elements/anchor)
