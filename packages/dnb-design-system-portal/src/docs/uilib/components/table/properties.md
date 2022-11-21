---
showTabs: true
---

## Properties

### `<Table>`

| Properties                                  | Description                                                                                                                                                                                          |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sticky`                                    | _(optional)_ use `true` to enable a sticky Table header. Defaults to `false`.                                                                                                                        |
| `stickyOffset`                              | _(optional)_ defines the offset (top) in `rem` from where the header should start to stick. You may define your app header height here, if you have a sticky header on your page. Defaults to `0`.   |
| ~~`variant`~~ (not implemented yet)         | _(coming)_ defines the style variant of the table. Options: `basis` . Defaults to `generic`.                                                                                                         |
| ~~`size`~~ (not implemented yet)            | _(coming)_ spacing size inside the table header and data. Options: `small` \| `medium` \| `large` \. Defaults to `large`.                                                                            |
| `fixed`                                     | _(optional)_ if set to `true`, the table will behave with a fixed table layout, using: `table-layout: fixed;`. Use e.g. CSS `width: 40%` on a table column to define the width. Defaults to `false`. |
| `skeleton`                                  | _(optional)_ if set to `true`, an overlaying skeleton with animation will be shown.                                                                                                                  |
| [Space](/uilib/components/space/properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                                                                                |

### Table Row `<Tr>`

| Properties | Description                                                                                                                                                     |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`  | _(optional)_ defines the variant of the current row. If set to either `odd` or `even`, the next row one will continue with the opposite. Defaults to automatic. |

### Table Header `<Th>`

| Properties | Description                                                                                     |
| ---------- | ----------------------------------------------------------------------------------------------- |
| `sortable` | _(optional)_ defines the table header as sortable if set to `true`. Defaults to `false`.        |
| `active`   | _(optional)_ defines the sortable column as the current active. Defaults to `false`.            |
| `reversed` | _(optional)_ defines the sortable column as in reversed order. Defaults to `false`.             |
| `noWrap`   | _(optional)_ if set to `true`, the header text will not wrap to new lines. Defaults to `false`. |
