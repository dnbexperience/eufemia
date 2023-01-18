# v10

- [v10](#v10)
  - [Migration](#migration)
  - [Features](#features)
    - [StepIndicator](#stepindicator)
    - [Table](#table)
    - [Slider](#slider)
    - [Timeline](#timeline)
    - [Anchor](#anchor)
    - [Button](#button)
    - [Tooltip](#tooltip)
    - [Icon](#icon)
    - [Lists](#lists)
    - [Stopped supporting Internet Explorer (IE)](#stopped-supporting-internet-explorer-ie)
    - [Deprecations](#deprecations)
  - [Install](#install)

## Migration

v10 of @dnb/eufemia contains _breaking changes_. As a migration process, you can simply search and replace:

## Features

1. [Browser support](/uilib/usage/#supported-browsers-and-platforms) has been updated to support modern browsers only (es6).

### StepIndicator

1. Find the `active_item` property and replace it with `current_step`.
1. Find `use_navigation` and remove it or replace it with `mode="strict"` or `mode="loose"`.
1. URL support has been removed – so props like `active_url`, `url`, `url_future`, and `url_passed` are not supported anymore. You have to handle it by yourself from inside your application. Here is [an example](/uilib/components/step-indicator/#stepindicator-with-a-router).

### Breakpoints

Some [breakpoints](https://eufemia.dnb.no/uilib/usage/layout/media-queries) sizes have changed:

- **xx-large:** `1280` is now `1440` – and `80em` is now `90em`
- **x-large:** `1152` is now `1280` – and `72em` is now `80em`
- **large:** `960` is now `1152` – and `60em` is now `72em`
- **medium:** `800` is now `960` – and `50em` is now `60em`

1. Find `$layout-x-large` and replace with `$layout-large`
1. Find `$layout-xx-large` and replace with `$layout-x-large`
1. Find `--layout-x-large` and replace with `--layout-large`
1. Find `--layout-xx-large` and replace with `--layout-x-large`

**NB:** Import and use the Eufemia breakpoints directly in your code:

```scss
// breakpoints.scss
@import '@dnb/eufemia/style/core/utilities';
$layout-small: map-get($breakpoints, 'small');
$layout-medium: map-get($breakpoints, 'medium');
$layout-large: map-get($breakpoints, 'large');
```

### Table

1. Ensure all table sub elements have a CSS Class:
   1. `tr` => `.dnb-table__tr`
   1. `th` => `.dnb-table__th`
   1. `td` => `.dnb-table__td`
1. Find the `sticky_offset` property and replace it with `stickyOffset`.
1. Find the `/elements/Table` property and replace it with `/components/Table`.
1. Alignment classes are removed (`.dnb-table--left`, `.dnb-table--right` and `.dnb-table--center`). Use the `align` attribute instead.
1. Font-sizing classes are removed (`.dnb-table--small` and `.dnb-table--x-small`). Use the `size` property instead.
1. Find and remove `Table.StickyHelper`.

### [Slider](/uilib/components/slider)

1. Find the `thump_title` property and replace it with `thumbTitle`.
1. Find the snake_case `add_title` property and replace it with `addTitle`.
1. Find the snake_case `subtract_title` property and replace it with `subtractTitle`.
1. Remove `@dnb/eufemia/components/slider/style/dnb-range.min.css` and use the Eufemia Slider component instead.

### [Timeline](/uilib/components/timeline)

1. Find the `name` property in your Timeline JSX syntax and replace it with `title`.
1. Find the `date` property in your Timeline JSX syntax and replace it with `subtitle`.

### [Anchor](/uilib/elements/anchor)

1. Find the `target_blank_title` property and replace it with `targetBlankTitle`.

### [Button](/uilib/components/button)

1. The padding of the `teriary` button is removed. Please, check your application and add back the padding of `0.5rem` if needed.

### [Tooltip](/uilib/components/tooltip)

1. Find the `target_element` property and replace it with `targetElement`.
1. Find the `target_selector` property and replace it with `targetSelector`.
1. Find the `animate_position` property and replace it with `animatePosition`.
1. Find the `fixed_position` property and replace it with `fixedPosition`.
1. Find the `skip_portal` property and replace it with `skipPortal`.
1. Find the `no_animation` property and replace it with `noAnimation`.
1. Find the `show_delay` property and replace it with `showDelay`.
1. Find the `hide_delay` property and replace it with `hideDelay`.

### [Icon](/uilib/components/icon)

1. Find the `data-test-id` property and replace it with `data-testid`.
   The usage of `data-test-id` will most likely be found in your tests.

### [Modal](/uilib/components/modal), [Dialog](/uilib/components/dialog) and [Drawer](/uilib/components/drawer)

When you convert from `<Modal mode="drawer" />` to `<Drawer />` – follow these steps:

- All `trigger_*` props are not supported for Drawer, use `triggerAttributes` instead to pass in props for the trigger button.
  - Change prop `trigger_hidden` to `omitTriggerButton` to omit the default trigger button from Modal.
- Only camelCase props are supported for Drawer, so you will need to update the prop names.
- `Modal.Inner` or `Modal.Content` converts to `Drawer.Body`.
- `Modal.Bar` converts to `Drawer.Navigaton`.
- `Modal` was a class component and `Drawer` is a functional component.

When you convert from `<Modal />` to `<Dialog />` – follow these steps:

- All `trigger_*` props are not supported for Dialog, use `triggerAttributes` instead to pass in props for the trigger button.
  - Change prop `trigger_hidden` to `omitTriggerButton` to omit the default trigger button from Modal.
- Only camelCase props are supported for Dialog, so you will need to update the prop names.
- `Modal.Content` converts to `Dialog.Body`.
- `Modal.Bar` converts to `Dialog.Navigaton`.
- `Modal` was a class component and `Dialog` is a functional component.

### [Lists](/uilib/elements/lists)

1. New **Definition List** layout direction: `direction="horizontal"` including `Dl.Item` [demo](https://eufemia.dnb.no/uilib/elements/lists/#definition-list-in-horizontal-direction).

### [Stopped supporting Internet Explorer (IE)](/uilib/usage/#supported-browsers-and-platforms)

Stopped supporting Internet Explorer (IE), as Microsoft formally ended support for IE in June, 2022.

### Deprecations

- `use_scrollwheel` and `on_init` properties, as well as the `raw_value` event value from [Slider](/uilib/components/slider) was removed in order to support multiple buttons.
- Helper class `.dnb-sr-only--inline` and SCSS mixin `srOnlyInline` was removed.
- Helper class `.dnb-not-sr-only` and SCSS mixin `notSrOnly` was removed.
- `import { SpacingHelper } from '@dnb/eufemia/shared'` was removed due to low usage. Use one of the [other exported helpers](/uilib/usage/layout/spacing).
- `import { LocaleProps, DataAttributeTypes, DynamicElement } from '@dnb/eufemia/shared/interfaces'` was removed, and moved to `@dnb/eufemia/shared/types`.
- `isIE11` and `IS_IE11` is deprecated as we have stopped supporting Internet Explorer (IE).

## Install

To upgrade to @dnb/eufemia v10 with NPM, use:

```bash
$ npm i @dnb/eufemia@10
# or
$ yarn add @dnb/eufemia@10
```

_December, 24. 2022_
