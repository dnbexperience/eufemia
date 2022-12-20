---
draft: true
---

# v10

- [Migration](#migration)
- [Changes](#changes)
- [Feature](#features)

## Migration

v10 of @dnb/eufemia contains _breaking changes_. As a migration process, you can simply search and replace:

### StepIndicator

1. Find the `active_item` property and replace it with `current_step`.
1. Find `use_navigation` and remove it or replace it with `mode="strict"` or `mode="loose"`.
1. URL support has been removed – so props like `active_url`, `url`, `url_future`, and `url_passed` are not supported anymore. You have to handle it by yourself from inside your application. Here is [an example](/uilib/components/step-indicator/#stepindicator-with-a-router).

### Table

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

### [Lists](/uilib/elements/lists)

1. New **Definition List** layout direction: `direction="horizontal"` including `Dl.Item` [demo](https://eufemia.dnb.no/uilib/elements/lists/#definition-list-in-horizontal-direction).

### Deprecations

- `use_scrollwheel` and `on_init` properties, as well as the `raw_value` event value from [Slider](/uilib/components/slider) was removed in order to support multiple buttons.
- Helper class `.dnb-sr-only--inline` and SCSS mixin `srOnlyInline` was removed.
- Helper class `.dnb-not-sr-only` and SCSS mixin `notSrOnly` was removed.
- `import { SpacingHelper } from '@dnb/eufemia/shared'` was removed due to low usage. Use one of the [other exported helpers](/uilib/usage/layout/spacing).

## Install

To upgrade to @dnb/eufemia v10 with NPM, use:

```bash
$ npm i @dnb/eufemia@10
# or
$ yarn add @dnb/eufemia@10
```

_June, 1. 2022_
