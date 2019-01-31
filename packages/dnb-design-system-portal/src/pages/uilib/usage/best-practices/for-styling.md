---
title: 'Best Practices for styling'
menuTitle: 'for styling'
draft: false
order: 1
---

# Styling

CSS is easy. Everyone is thinking at least that in the first place. Cause You get not forced to make things right - so it fells like an endless freedom. But actually, this is a kind of trap.

> It is VERY important to do CSS right from the very beginning.

You will else find Yourself making a fix of a fix, and so on. Also, refactoring and enhancements will often effect code deeper down as well.

## Structure

To write more structured and uniform CSS code, stick with the following approach:

1. start the most influential and important properties first then work progressively toward aesthetics and motion effects.
1. leave one empty line between these groups

This helps coworkers quickly find and understand the sentence and meaning of the CSS code.

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

  /* 3. Fonts & Typography */
  font-family: var(--font-family-default);
  font-weight: var(--font-weight-default);
  font-size: 1.5rem;
  color: var(--color-sea-green);

  /* 4. Styling */
  border: 1px solid var(--color-mint-green); /* Use Pixel for borders. They don't need to be dynamic */
  opacity: 1;

  /* 5. Animations */
  transition: opacity 0.2s linear;
}
```

## Units

Here is a list of what we should use as layout and styling units to embrace the best possible accessibility experience and visual correctness.

- **`rem`**: Use _rem_ as a default sizing unit - when ever other units don't are favorited.
- **`em`**: Use _em_ only on complex layouts, when ever You need the sizes to respond to constrains. But use _em_ for CSS `@media` queries for the best browser compatibility.
- **`px`**: Use _pixels_ on visual helper lines and borders. Borders don't need necessarily to be responsive.
