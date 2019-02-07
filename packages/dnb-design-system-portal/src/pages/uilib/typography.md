---
title: 'Typography'
icon: 'typography'
draft: false
order: 4
---

# Typography

## Font Face

The DNB default Font Family is `Fedra Sans Std`. This font, together with its weights is loaded and imported with `@font-face` in `/css/core/fonts.scss`. The font is included in the library package.
To make sure You don't load all of the font faces at once, You apply a font `weights` to load the predefined font faces.

Read more how to use the [different weights](/uilib/typography/font-weights/).

### Headings

DNB UX Team has currently only defined tree levels of heading styles (h1, h2 and h3). But level 4, 5 and 6 is also supported by the `dnb-ui-lib`.

In case You want to have a header look like a heading, You can use these classes:

- `.dnb-h1`
- `.dnb-h2`
- `.dnb-lead`

Read more about [best practices for typography](/uilib/usage/best-practices/for-typography).

#### Heading examples

<div class="example-box">
  <h1>H1</h1>
  <h2>H2</h2>
  <h3>H3</h3>
  <h4>H4</h4>
  <h5>H5</h5>
  <h6>H6</h6>
</div>

### Paragraph

<div class="example-box">
  <p>
    Here is a paragraph with some nonsense
    <a href="/">Lorem Ipsum</a>
    comes from <b>sections</b> 1.10.32 and 1.10.33 of "de
    <i>Finibus Bonorum</i> et <u>Malorum</u>" (
    <strong>The Extremes</strong> of Good and Evil) by Cicero,
    written in 45 BC.
  </p>
</div>

Or read more [about fonts in the Designer Guides](/quickguide-designer/fonts/).
