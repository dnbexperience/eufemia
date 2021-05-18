---
title: 'Layout'
order: 3
---

# Layout

To not overcomplicate the Eufemia - and limit the creativity and possibilities, the DNB UX team has decided to not force the usage of a dedicated layout system. This opens up for more freedom in designing and building interface layouts.

## Responsiveness

In short, only use `rem` for layouts and spacing and make sure ...

- you always use the nearest half `rem` value, like _0.5rem_, _1rem_ or _1.5rem_ and so forth.
- you always get a **total computed height** within the grid.

This results in maintaining the integrity of the **8px** base grid.

### Smaller Units

Sometimes You may need a compensation of only a few pixels. Heres how to calculate the correct _rem_ values:

- 1px = `1/16x1` = **0.0625rem**
- 2px = `1/16x2` = **0.125rem**
- And so on ...

## Layout system

If You are working together with an DNB UX Designer, You can decide freely what layout mechanism You want to use. For web applications use **CSS Flexbox** or **CSS Grid**. But it is Your responsibility to ensure 100% consistency and compatibility.

## Grid Pattern

There is, however a simple [Grid Pattern with CSS helpers](/uilib/extensions/grid) in Eufemia which you can use.

Although, it will probably be removed in a future major release.
