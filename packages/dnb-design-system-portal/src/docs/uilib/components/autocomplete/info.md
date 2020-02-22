---
showTabs: true
---

## Description

The Autocomplete component is a fully custom-made component. This allows us to change it's form based on context (small screens, touch devices etc.)

### When to use it:

When you need to provide a considerable amount of options to the user and do not have the space to do so. Other reasons may be because the hidden options may clutter the interface and need only be displayed after the user specifically requests it.

1. when space is an issue (not enough)
1. when you wish to reduce visual clutter
1. when it is intuitive for the user to request the hidden content

### When not to use it:

1. do not use this if you have only a few 'menu' options which could otherwise be shown such as tabs or buttons

**NB:** This pattern can be constructed in a number of ways to achieve a similar effect - from using the HTML 'select' element to custom building with divs, spans and javascript.

## Custom size

Changing the **width** of the Autocomplete component by CSS is easy done by doing:

```css
.dnb-autocomplete {
  --autocomplete-width: 20rem; /* custom width */
}
```

You can also set the width directly, but then it has to be defined like so (including `min-width`):

```css
.dnb-autocomplete__shell {
  width: 20rem; /* custom width */
}
.dnb-autocomplete__list {
  min-width: 20rem; /* custom width */
}
```
