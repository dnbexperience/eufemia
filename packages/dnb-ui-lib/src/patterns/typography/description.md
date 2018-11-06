Our default font is `Fedra Sans Book`. This font, together with its siblings is loaded
and imported with `@font-face` in `/css/core/font-import.scss`. The font is hosted by ourselves and not currently on a CDN.
To make sure we don't load all of the font faces at once, we apply the font weights by using it's dedicated class prefixed with `typo-`.
For instance, if you want a text to be `light` and `italic`, apply the class `.typo-light-italic` where necessary.

Numbers come in two variants; `Lining` and `Old Style`. Use the `lining` in tables and in other contexts where lots of numbers are side-by-side.
`Old Style` is preferred where the numbers stand alone and need to stand out.

For all font weights and variants, check the source of the following examples.
