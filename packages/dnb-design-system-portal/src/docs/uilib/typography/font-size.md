---
title: 'Font Size'
order: 2
---

# Font Size

For details about what values Typographic elements do use, have a loot at the [Fonts & Typography](/quickguide-designer/fonts#typographic-elements) documentation.

## Default `font-size` **rem** table

| Pixel | Type       | Rem          | Custom Property        | Info                            |
| ----- | ---------- | ------------ | ---------------------- | ------------------------------- |
| 14px  | `x-small`  | **0.875rem** | `--font-size-x-small`  | Do not use for texts            |
| 16px  | `small`    | **1rem**     | `--font-size-small`    | [Fallback](#fallback-font-size) |
| 18px  | `basis`    | **1.125rem** | `--font-size-basis`    | Default size                    |
| 20px  | `medium`   | **1.25rem**  | `--font-size-medium`   |                                 |
| 26px  | `large`    | **1.625rem** | `--font-size-large`    |                                 |
| 34px  | `x-large`  | **2.125rem** | `--font-size-x-large`  |                                 |
| 48px  | `xx-large` | **3rem**     | `--font-size-xx-large` |                                 |

## Additional `font-size` **em** table

| Pixel | Type        | Em      | Custom Property         | Info |
| ----- | ----------- | ------- | ----------------------- | ---- |
| 16px  | `basis--em` | **1em** | `--font-size-basis--em` |      |

## How to use the sizes (CSS)

```css
/* I have a default size */
.dnb-p {
  font-size: var(--font-size-basis); /* 1.125 = 18px */
}
```

## Fallback font-size

If no specific `font-size` is defined, we use still `1rem` as the basis. This is due to the fact that we use the basis `font-size` for many other layout related purposes.

<!-- ### Usage in HTML (Helper Classes)

```html
<h3 class="dnb-font-size--small">Heading</h3>
``` -->
