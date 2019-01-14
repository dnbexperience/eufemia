---
header: 'UI Library'
title: 'Best Practices of styling'
menuTitle: 'of styling'
draft: false
order: 1
---

# Styling

CSS is easy. Everyone is thinking at least that in the first place. Cause You get not forced to make things right - so it fells like an endless freedom. But actually, this is a kind of trap.

> It is VERY important to do CSS right from the very beginning.

You will else find You make a fix of for a fix, and so on. Also, refactoring and enhancements will often effect code deeper down as well.

## Structure

To write more structured and uniform CSS code, stick with this approach to write the most influential and important properties first. Have simply a newline between the blocks respective groups.

This helps other developers quickly find and understand the sentence and meaning of the CSS code.

### Example structure of CSS

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
