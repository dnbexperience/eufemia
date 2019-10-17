---
title: 'Font Weights'
draft: false
order: 1
---

import TypographyExamples from 'Pages/uilib/typography/TypographyExamples'

# Font Weights

## `font-weight` table

| Type        | Custom Property         | Info       |
| ----------- | ----------------------- | ---------- |
| **Regular** | `--font-weight-regular` |            |
| **Medium**  | `--font-weight-medium`  |            |
| **Bold**    | `--font-weight-bold`    |            |
| Book        | `--font-weight-book`    | Deprecated |
| Demi        | `--font-weight-demi`    | Deprecated |
| Medium      | `--font-weight-medium`  | Deprecated |

### Currently we have 3 font weights:

- <span class="dnb-typo-regular">Regular (formerly, Book)</span> (normal)
- <span class="dnb-typo-medium">Medium (formerly, Demi)</span> (500)
- <span class="dnb-typo-medium">Bold (formerly, Medium)</span> (600)

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

<TypographyExamples />
