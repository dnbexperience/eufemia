---
showTabs: true
---

## Description

The Dropdown component is a fully custom-made component. This allows us to change it's form based on context (small screens, touch devices etc.)

### When to use it:

When you need to provide a considerable amount of options to the user and do not have the space to do so. Other reasons may be because the hidden options may clutter the interface and need only be displayed after the user specifically requests it.

1. when space is an issue (not enough)
1. when you wish to reduce visual clutter
1. when it is intuitive for the user to request the hidden content

### When not to use it:

1. do not use this if you have only a few _menu_ options which could otherwise be shown such as [Radio buttons](/uilib/components/radio) or [ToggleButtons](/uilib/components/toggle-button).

**NB:** This pattern can be constructed in a number of ways to achieve a similar effect - from using the HTML 'select' element to custom building with divs, spans and javascript.

## Action Menu

The Dropdown component can easily be used as a so called **action button** by setting the prop `action_menu="true"`. In mobile view, the title/text will be hidden, only showing the icon and the DrawerList will open from the browser bottom.

## Menu Button

The Dropdown component can easily be used as a so called **menu button** by setting the prop `more_menu="true"` which shows then the [more](/icons/primary#icon-more) icon, appears as dots. You also could use `prevent_selection="true"` together with an empty title `title=""` and `aria-label="Choose an item"`.

## Accessibility

Both the Action Menu and the Menu Button (and if `prevent_selection` is true), the Dropdown will use `role="menu"`, instead of `role="menuitems"` for better screen reader support.

## Custom size

Changing the **width** of the Dropdown component by CSS is easy done by doing:

```css
.dnb-dropdown {
  --dropdown-width: 20rem; /* custom width */
}
```

You can also set the width directly, but then it has to be defined like so (including `min-width`):

```css
/** Because of the included label/status etc. we target the "__shell" */
.dnb-dropdown__shell {
  width: 10rem;
}

/** In order to change only the drawer-list width */
.dnb-dropdown .dnb-drawer-list__root {
  width: 10rem;
}

/** If more_menu="true" is used */
.dnb-dropdown--is-popup .dnb-drawer-list__root {
  width: 10rem;
}
```
