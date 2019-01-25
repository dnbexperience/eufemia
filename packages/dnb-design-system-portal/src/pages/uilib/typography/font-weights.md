---
title: 'Font Weights'
draft: false
order: 1
---

import TypographyExamples from 'Pages/uilib/typography/TypographyExamples'

# Font Weights

### For now we have 3 Font Weights:

- <span class="dnb-typo-book">Book</span> (normal)
- <span class="dnb-typo-demi">Demi</span> (500)
- <span class="dnb-typo-medium">Medium</span> (600)

### How to use the Weights

```css
/* I am Book */
p {
  font-weight: normal;
}

/* I am Demi */
p {
  font-weight: var(--font-weight-demi); /* 500 */
}

/* I am Medium */
p {
  font-weight: var(--font-weight-medium); /* 600 */
}
```

## Examples

<TypographyExamples />
