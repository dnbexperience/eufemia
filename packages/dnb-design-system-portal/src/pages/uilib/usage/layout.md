---
title: 'Layout'
draft: false
order: 3
---

# Layout

To lower the barrier of using Eufemia or the `dnb-ui-lib` - the UX Team at DNB has decided to not force the usage of a dedicated layout system. Although, this may change in future.
This gives projects much more freedom of thinking new and creating more exciting layouts.
This also lowers the time to get started and the learning curve.

## Grid

Anyhow, there is already today a [Grid Pattern with CSS helpers](/uilib/patterns/grid) You can use.

## Spacing

Eufemia has a [Spatial System](/quickguide-designer/spatial-system) with a grid of **8px**.

### Web Applications

In short, only use `rem` for layouts and spacing. So, make sure ...

- You always use the nearest half `rem` value, like _0.5rem_, _1rem_ or _1.5rem_ and so forth.
- You always get a **total computed height** within the grid.

## Responsibility

If You are working together with an DNB UX Designer, You can decide freely what layout mechanism You want to use. For Web Applications we mainly use **CSS Flexbox** or **CSS Grid**. But it is Your responsibility to ensure 100% consistency and compatibility.
