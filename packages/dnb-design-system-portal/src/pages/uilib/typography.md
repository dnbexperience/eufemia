---
header: 'UI Library'
title: 'Typography'
icon: 'typography'
draft: false
order: 4
---

# Typography

## Font Face

Our default font is `Fedra Sans Book`. This font, together with its siblings is loaded and imported with `@font-face` in `/css/core/typography.scss`. The font is included in the library package.
To make sure we don't load all of the font faces at once, we apply the font weights and font styles by using its predefined font faces.

Read more about [fonts at DNB](/quickguide-designer/fonts/)

### Headings

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
