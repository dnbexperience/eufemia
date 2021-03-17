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

## Media Queries and Breakpoints

Use `em` for media query sizing for best overall browser support. Read [more abouts units](/uilib/usage/best-practices/for-styling#units)

### Media Queries Examples

```css
@media screen and (max-width: 40em) {
  /* small (mobile) */
}
@media screen and (max-width: 50em) {
  /* medium */
}
@media screen and (max-width: 60em) {
  /* large (default) */
}
@media screen and (min-width: 60em) and (max-width: 72em) {
  /* x-large */
}
@media screen and (min-width: 70em) and (max-width: 80em) {
  /* xx-large */
}
```

Or you may re-use the SASS mixins from Eufemia:

```scss
@import '@dnb/eufemia/style/core/utilities.scss';

@include allBelow(large) {
  /* Your CSS */
}

@include allAbove(small) {
  /* Your CSS */
}
```


## Sizing

UX designers are using a 12 column system during their design processes. But we as developers have to make our layouts responsive to give users the best experience and meet WCAG requirements.

| Pixel | Type       | Rem      | Custom Property     | Comments    |
| ----- | ---------- | -------- | ------------------- | ----------- |
| 640   | `small`    | **40em** | `--layout-small`    | Mobile      |
| 800   | `medium`   | **50em** | `--layout-medium`   |             |
| 960   | `large`    | **60em** | `--layout-large`    | DNB default |
| 1152  | `x-large`  | **72em** | `--layout-x-large`  |             |
| 1280  | `xx-large` | **80em** | `--layout-xx-large` |             |

<!-- | 1440  | `xxx-large` | **90em** | `--layout-xxx-large` |             | -->

## Layout system

If You are working together with an DNB UX Designer, You can decide freely what layout mechanism You want to use. For web applications use **CSS Flexbox** or **CSS Grid**. But it is Your responsibility to ensure 100% consistency and compatibility.

## Grid Pattern

There is, however a simple [Grid Pattern with CSS helpers](/uilib/extensions/grid) in Eufemia which you can use.

Although, it will probably be removed in a future major release.
