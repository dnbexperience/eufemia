---
title: 'Font Weights'
draft: false
order: 3
---

import TypographyExamples from 'Pages/uilib/typography/TypographyExamples'

# Font Weights

### Currently we have 3 font weights:

- <span class="dnb-typo-book">Book</span> (normal)
- <span class="dnb-typo-demi">Demi</span> (500)
- <span class="dnb-typo-medium">Medium</span> (600)

### How to use the weights (CSS)

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

/* This will result in loading the Medium Font */
.my-new-class {
  font-weight: var(--font-weight-demi);
}
```

### Usage in HTML (Helper Classes)

```html
<!-- Example usage of Weights in Markup -->
<h3 class="dnb-typo-book">Heading</h3>
<p class="dnb-typo-demi">Paragraph</p>
<span class="dnb-typo-medium">Third Tag</span>
```

## Examples

<TypographyExamples />
