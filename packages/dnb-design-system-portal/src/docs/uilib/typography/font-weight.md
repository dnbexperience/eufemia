---
title: 'Font Weights'
order: 1
redirect_from:
  - /uilib/typography/font-weights
---

import { FontWeightExample } from 'Docs/uilib/typography/Examples'

# Font Weights

For details about what values Typographic elements do use, have a loot at the [Fonts & Typography](/quickguide-designer/fonts#typographic-elements) documentation.

## Eufemia has three (3) font-weights

- <span class="dnb-typo-regular">Regular</span> (normal)
- <span class="dnb-typo-medium">Medium</span> (500)
- <span class="dnb-typo-bold">Bold</span> (600)

## `font-weight` table

| Type        | Custom Property         |
| ----------- | ----------------------- |
| **Regular** | `--font-weight-regular` |
| **Medium**  | `--font-weight-medium`  |
| **Bold**    | `--font-weight-bold`    |

### How to use the weights (CSS)

```css
/* I am Regular */
p {
  font-weight: normal;
}

/* I am Medium */
p {
  font-weight: var(--font-weight-medium); /* 500 */
}

/* I am Bold */
p {
  font-weight: var(--font-weight-bold); /* 600 */
}

/* This will result in loading the Bold Font */
.my-new-class {
  font-weight: var(--font-weight-bold);
}
```

### Usage in HTML (Helper Classes)

```html
<!-- Example usage of Weights in Markup -->
<h3 class="dnb-typo-regular">Heading</h3>
<p class="dnb-typo-medium">Paragraph</p>
<span class="dnb-typo-bold">Third Tag</span>
```

## Examples

<FontWeightExample />
