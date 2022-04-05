---
title: 'Best Practices for styling'
menuTitle: 'for CSS'
order: 1
---

# CSS and Styling

One can be forgiven for assuming that CSS is easy. After all, your stylesheets will probably work still work even when there are mistakes in them. However, this 'freedom' can be a trap.

> It is crucial to do CSS right from the very beginning.

Otherwise you will find yourself making a fix of a fix, and so on. Also, refactoring and enhancements will often effect code deeper down as well.

## Styling structure

To write more structured and uniform CSS code, stick with the following approach:

1. start the most influential and important properties first then work progressively toward aesthetics and motion effects.
1. leave one empty line between these groups

This helps coworkers quickly find and understand the sentence and meaning of the CSS code.

### Example structure of CSS

```css
.my-selector {
  /* -- 1. Layout -- */
  position: relative;
  z-index: 1;
  display: block;

  /* -- 2. Sizes & Spaces -- */
  width: 0.5rem;
  height: 0.5rem;
  /* will be the same as our local font-size of 1.5rem */
  padding: 1rem;

  /* -- 3. Fonts & Typography -- */
  font-family: var(--font-family-default);
  font-weight: var(--font-weight-basis);
  font-size: var(--font-size-large);
  color: var(--color-sea-green);

  /* -- 4. Styling -- */
  /* use Pixel for borders. They don't need to be dynamic */
  border: 1px solid var(--color-mint-green);
  opacity: 1;

  /* -- 5. Animations -- */
  transition: opacity 0.2s linear;
}
```

## CSS Units

Here is a list of what we should use as layout and styling units to embrace the best possible accessibility experience and visual correctness.

- **`rem`**: Use _rem_ as a default sizing unit - as long as no other unit if preferred.
- **`em`**: Use _em_ only on complex layouts, whenever you need the sizes to respond to constraints.
- **`px`**: Use _pixels_ on visual helper lines and borders. Borders don't need necessarily to be responsive.
- **`viewport units and percentage`**: Use these units to make layout and component widths responsive. Use also for placing and positioning layout wrappers which can give a better user experience.

Use _em_ for CSS `@media` queries for the best browser compatibility. Read more about [viewport units, Media Queries and breakpoints](/uilib/usage/layout/media-queries).
