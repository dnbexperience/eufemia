---
header: 'UI Library'
title: 'of styling'
draft: false
order: 1
---

# Styling

To write more structured and uniform CSS code, stick with this approach to write the most influential and important properties first. Have simply a newline between the blocks respective groups.

**Example of how to structure the DNB CSS**

```css
.my-selector {
  /* 1. Layout */
  position: relative;
  z-index: 1;
  display: block;

  /* 2. Sizes & Spaces */
  width: 0.5em;
  height: 0.5em;
  padding: 1em; /* Will be the same as our local font-size of 1.5rem */

  /* 3. Font & Typography */
  font-family: 'Fedra Sans Std';
  font-size: 1.5rem;
  color: var(--color-sea-green);

  /* 4. Styling */
  border: 1px solid var(--color-mint-green); /* Use Pixel for borders. They don't need to be dynamic */
  opacity: 1;

  /* 5. Animations */
  transition: opacity 0.2s linear;
}
```
