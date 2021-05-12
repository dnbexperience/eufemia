---
title: 'Best Practices for styling'
menuTitle: 'for css'
order: 1
---

# CSS and Styling

One can be forgiven for assuming that CSS is easy. After all, your stylesheets will probably work still work even when there are mistakes in them. However, this 'freedom' can be a trap.

> It is crucial to do CSS right from the very beginning.

Otherwise you will find yourself making a fix of a fix, and so on. Also, refactoring and enhancements will often effect code deeper down as well.

## Styling structure

To write more structured and uniform CSS code, your team may considder to use a rational CSS properties order:

The idea is:

1. have the most influential and important properties first then work progressively toward aesthetics and motion effects.
1. leave one empty line between these logical "groups" to enhance readability.

This helps coworkers quickly find and understand the sentence and meaning of the CSS code.

### Example structure of CSS

```css
.declaration-order {
  /* Positioning */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: block;
  float: right;

  /* Box Model */
  width: 16rem;
  height: 16rem;
  margin: 2rem;
  padding: 1rem;
  color: #111;

  /* Typography */
  font: normal 1rem Helvetica, sans-serif;
  line-height: 1.5rem;
  text-align: left;

  /* Visual */
  background-color: #eee;
  border: 1px solid #888;
  border-radius: 0.25rem;
  opacity: 1;

  /* Animation */
  transition: all 1s;

  /* Misc */
  user-select: none;
}
```

You can install [prettier-plugin-rational-order](https://github.com/tujoworker/prettier-plugin-rational-order) to automatically format your CSS.

## CSS Units

Here is a list of what we should use as layout and styling units to embrace the best possible accessibility experience and visual correctness.

- **`rem`**: Use _rem_ as a default sizing unit - as long as no other unit if preferred.
- **`em`**: Use _em_ only on complex layouts, whenever you need the sizes to respond to constraints.
- **`px`**: Use _pixels_ on visual helper lines and borders. Borders don't need necessarily to be responsive.
- **`viewport units and percentage`**: Use these units to make layout and component widths responsive. Use also for placing and positioning layout wrappers which can give a better user experience.

Use _em_ for CSS `@media` queries for the best browser compatibility. Read more about [viewport units, Media Queries and breakpoints](/uilib/usage/layout#media-queries-and-breakpoints).
