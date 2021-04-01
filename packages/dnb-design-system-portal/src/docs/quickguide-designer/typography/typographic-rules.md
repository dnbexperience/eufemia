## In General

The default font for all web applications is the `DNB` font.

### Download DNB font family

You can download the [DNB font files as a ZIP package](https://github.com/dnbexperience/eufemia/blob/main/packages/eufemia/assets/fonts/DNB.zip?raw=true) **Last update: November 8, 2020**.

If you get access to Figma **Eufemia Web** main file, then you don't need to install the DNB font. Figma will provide the font automatically for you inside Figma. If you use other designer tools, make sure it is installed on your system so you can use the design resources.

## Typographic scale

The Eufemia typographic scale is as follows:

_16px, 18px, 20px, 26px, 34px, 48px_

**NB!** we use `rem` for setting the size in code **not** pixels.

Line-heights vary depending on context but adhere to the Eufemia space units (multiples of 8 including halves (4px)).

## Typographic styling

Refer to the Figma style guides for styling typography with color.

## Margins & Padding

Blocks of text (headings and body etc.) do not have TOP, RIGHT, BOTTOM or LEFT margins by default. This is usually set by the containing element and based on context. However, there is a helper class to enable the "default" spacing:

```html
<div class="dnb-spacing">
  <h1 class="dnb-h--xx-large">...</h1>
  <p class="dnb-p">...</p>
</div>
```

The reason for this is to provide an out-of-the-box style which looks good before any customizing is applied.

Make sure to stick to the Eufemia spacing system when adding or removing bottom margins.

Padding is also not something applied to blocks of text by default.
