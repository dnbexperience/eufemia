---
title: 'Layout'
draft: false
order: 3
---

# Layout

To make things easy and lower the barrier of entry for using Eufemia, the UX team has decided to not force the usage of a dedicated layout system. Although, this may change in future. This allows for more freedom in designing and building interface layouts.

## Grid

There is, however a simple [Grid Pattern with CSS helpers](/uilib/patterns/grid) in Eufemia which you can use.

## Spacing

Eufemia has a [Spatial System](/quickguide-designer/spatial-system) with a grid of **8px**. This is simply a guide grid which helps with making design decisions about the sizes of components, elements, margins, paddings etc.

### Web Applications

In short, only use `rem` for layouts and spacing and make sure ...

- you always use the nearest half `rem` value, like _0.5rem_, _1rem_ or _1.5rem_ and so forth.
- you always get a **total computed height** within the grid.

This results in maintaining the integrity of the 8px base grid.

## Responsibility

If You are working together with an DNB UX Designer, You can decide freely what layout mechanism You want to use. For Web Applications we mainly use **CSS Flexbox** or **CSS Grid**. But it is Your responsibility to ensure 100% consistency and compatibility.

### Media Queries and Breakpoints

- `small`: 40em
- `medium`: 50em
- `large`: 60em
- `x-large`: 90em (is the default max-width of 1440px)

Use `em` for media query sizing for best overall browser support. Read [more abouts units](/uilib/usage/best-practices/for-styling#units)
