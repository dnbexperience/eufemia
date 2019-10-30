---
draft: true
---

| Properties                                      | Description                                                                                                                                                                                                                                                           |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `style_type`                                    | _(optional)_ to define the style of the visual helper. Use and `Style ID` from below. Defaults to `mint-green-12`.                                                                                                                                                    |
| `spacing`                                       | _(optional)_ will add the default spacing around the wrapped content. Use `spacing-large`, `spacing-medium` or `spacing-small`. Defaults to `false`. If `true`, then `spacing-default` is used. Se the [avilable sizes](/uilib/usage/layout/spacing#spacing-helpers). |
| `element`                                       | _(optional)_ define what HTML element should be used. Defaults to `<section>`.                                                                                                                                                                                        |
| [Space](/uilib/components/space#tab-properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                                                                                                                                                 |

## Styles

| Style           | Description                                                                         |
| --------------- | ----------------------------------------------------------------------------------- |
| `mint-green-12` | _(default)_ uses `--color-mint-green-12`.                                           |
| `white`         | uses `--color-white`.                                                               |
| `mint-green`    | uses `--color-mint-green`.                                                          |
| `emerald-green` | uses `--color-emerald-green`.                                                       |
| `signal-orange` | uses `--color-signal-orange`.                                                       |
| `fire-red`      | uses `--color-fire-red`. Is used by [GlobalStatus](/uilib/components/global-status) |
| `divider`       | uses `--color-white` as background with a border-line on top and bottom.            |
