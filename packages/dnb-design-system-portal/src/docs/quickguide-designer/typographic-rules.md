---
draft: true
---

## In General

The default font for all web applications is the `DNB` font.

You can download the font as a [ZIP file](https://github.com/dnbexperience/eufemia/tree/develop/packages/dnb-ui-lib/assets/fonts/DNB.zip).

Make sure it is installed on your system so you can use the design resources.

## Typographic scale

The Eufemia typographic scale is as follows:

_16px, 18px, 20px, 26px, 34px, 48px_

**NB!** we use `em` and `rem` for setting the size in code **not** pixels.

Line-heights vary depending on context but adhere to the Eufemia space units (multiples of 8 including halves (4px)).

## Typographic styling

Refer to the Figma style guides for styling typography with color.

## Margins & Padding

Blocks of text (headings and body etc.) do not have TOP, RIGHT, BOTTOM or LEFT margins by default. This is usually set by the containing element and based on context. However, there is a helper class to enable the "default" spacing:

```html
<div class="dnb-spacing">
  <h1 class="dnb-h1">...</h1>
  <p class="dnb-p">...</p>
</div>
```

The reason for this is to provide an out-of-the-box style which looks good before any customizing is applied.

Make sure to stick to the Eufemia spacing system when adding or removing bottom margins.

Padding is also not something applied to blocks of text by default.
