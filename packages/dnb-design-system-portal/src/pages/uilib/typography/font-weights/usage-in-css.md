---
header: 'UI Library'
title: 'Usage in CSS'
draft: false
order: 1
---

# Font Weights in CSS

```css
/* This will result in loading the Medium Font */
.my-new-class {
  font-family: 'Fedra Sans Std', sans-serif; /* Fallback */
  font-family: var(--font-family-std);
  font-weight: 600;
  font-style: normal;
}
```
