---
status: 'imp'
---

## Description

DNB's default font is `Fedra Sans Book`. This font, together with its siblings is loaded and imported with `@font-face` in `/css/core/typography.scss`. The font is included in the library package.
To make sure we don't load all of the font faces at once, we apply the font weights and font styles by using its predefined font faces.

Numbers come in two variants; `Lining` and `Old Style`. Use the `lining` in tables and in other contexts where lots of numbers are side-by-side.
`Old Style` is preferred where the numbers stand alone and need to stand out.

For all font weights, styles and variants, check the source of the following examples.
