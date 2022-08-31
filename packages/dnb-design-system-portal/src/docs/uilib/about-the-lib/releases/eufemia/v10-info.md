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
1. URL support has been removed – so props like `active_url`, `url`, `url_future`, and `url_passed` are not supported anymore. You have to handle it by yourself from inside your application.

### Table

1. Find the `sticky_offset` property and replace it with `stickyOffset`.
1. Find the `/elements/Table` property and replace it with `/components/Table`.

### [Slider](/uilib/components/slider)

1. Find the `thump_title` property and replace it with `thumb_title`.
1. Find the snake_case `add_title` property and replace it with `addTitle`.
1. Find the snake_case `subtract_title` property and replace it with `subtractTitle`.
1. Remove `@dnb/eufemia/components/slider/style/dnb-range.min.css` and use the Eufemia Slider component instead.

### [Timeline](/uilib/components/timeline)

1. Find the `name` property in your Timeline JSX syntax and replace it with `title`.
1. Find the `date` property in your Timeline JSX syntax and replace it with `subtitle`.

### [Anchor](/uilib/elements/anchor)

1. Find the `target_blank_title` property and replace it with `targetBlankTitle`.

### Deprecations

- `use_scrollwheel` and `on_init` properties, as well as the `raw_value` event value from [Slider](/uilib/components/slider) was removed in order to support multiple buttons.

## Install

To upgrade to @dnb/eufemia v10 with NPM, use:

```bash
$ npm i @dnb/eufemia@10
# or
$ yarn add @dnb/eufemia@10
```

_June, 1. 2022_
