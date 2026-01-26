---
title: 'Font Size'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.332Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Font Size for

<ChangeStyleTheme label="Change the brand:" bottom="large" />

For details about what values Typographic elements do use, have a look at the
[Fonts & Typography](/quickguide-designer/fonts#typographic-elements) documentation.

## Default `font-size` **rem** table

| Pixel                                 | Type       | Rem                                        | CSS variable / property | CSS Classname            | Info                            |
| ------------------------------------- | ---------- | ------------------------------------------ | ----------------------- | ------------------------ | ------------------------------- |
| {GetPropAsPx('--font-size-x-small')}  | `x-small`  | **{GetPropValue('--font-size-x-small')}**  | `--font-size-x-small`   | `.dnb-t__size--x-small`  | Do not use for texts            |
| {GetPropAsPx('--font-size-small')}    | `small`    | **{GetPropValue('--font-size-small')}**    | `--font-size-small`     | `.dnb-t__size--small`    | [Fallback](#fallback-font-size) |
| {GetPropAsPx('--font-size-basis')}    | `basis`    | **{GetPropValue('--font-size-basis')}**    | `--font-size-basis`     | `.dnb-t__size--basis`    | Default size                    |
| {GetPropAsPx('--font-size-medium')}   | `medium`   | **{GetPropValue('--font-size-medium')}**   | `--font-size-medium`    | `.dnb-t__size--medium`   |                                 |
| {GetPropAsPx('--font-size-large')}    | `large`    | **{GetPropValue('--font-size-large')}**    | `--font-size-large`     | `.dnb-t__size--large`    |                                 |
| {GetPropAsPx('--font-size-x-large')}  | `x-large`  | **{GetPropValue('--font-size-x-large')}**  | `--font-size-x-large`   | `.dnb-t__size--x-large`  |                                 |
| {GetPropAsPx('--font-size-xx-large')} | `xx-large` | **{GetPropValue('--font-size-xx-large')}** | `--font-size-xx-large`  | `.dnb-t__size--xx-large` |                                 |

### Code Editor Extensions

You may be interested to install an [Eufemia code editor extension](/uilib/usage/first-steps/tools/#code-editor-extensions) that allows you to quickly auto complete the correct `font-size`.

## Additional `font-size` **em** table

| Pixel | Type        | Em                                          | Custom Property         | Info |
| ----- | ----------- | ------------------------------------------- | ----------------------- | ---- |
| 16px  | `basis--em` | **{GetPropValue('--font-size-basis--em')}** | `--font-size-basis--em` |      |

## How to use the sizes (CSS)

```css
/* I have a default size */
.dnb-p {
  font-size: var(--font-size-basis); /* 1.125rem = 18px (in Ui theme) */
}
```

## Fallback font-size

If no specific `font-size` is defined, we use still `1rem` as the basis. This is because we use the basis `font-size` for many other layout related purposes.
