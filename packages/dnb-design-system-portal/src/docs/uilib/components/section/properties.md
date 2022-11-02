---
showTabs: true
---

## Properties

| Properties                                  | Description                                                                                                                                                                           |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `style_type`                                | _(optional)_ to define the style of the visual helper. Use and `Style ID` from below. Defaults to `mint-green-12`.                                                                    |
| `spacing`                                   | _(optional)_ will add spacing around the given content. If `true`, then `large` is used. Se the [available sizes](/uilib/usage/layout/spacing#spacing-helpers). Defaults to `false`. |
| `element`                                   | _(optional)_ define what HTML element should be used. Defaults to `<section>`.                                                                                                        |
| `inner_ref`                                 | _(optional)_ by providing a React Ref we can get the internally used element (DOM). E.g. `inner_ref={myRef}` by using `React.createRef()` or `React.useRef()`.                        |
| [Space](/uilib/components/space/properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                                                                 |

## Styles

You can easily [customize the color](/uilib/components/section#customize-color).

| Style           | Description                                                                                         |
| --------------- | --------------------------------------------------------------------------------------------------- |
| `mint-green-12` | _(default)_ uses `--color-mint-green-12`.                                                           |
| `white`         | uses `--color-white`.                                                                               |
| `mint-green`    | uses `--color-mint-green`.                                                                          |
| `lavender`      | uses `--color-lavender`.                                                                            |
| `sand-yellow`   | uses `--color-sand-yellow`.                                                                         |
| `pistachio`     | uses `--color-pistachio`.                                                                           |
| `black-3`       | uses `--color-black-3`.                                                                             |
| `emerald-green` | uses `--color-emerald-green`.                                                                       |
| `fire-red`      | uses `--color-fire-red`. Is used by [GlobalStatus](/uilib/components/global-status)                 |
| `divider`       | uses `--color-white` as background with a border-line on top and bottom.                            |
| `transparent`   | CSS transparent. Used in situations where a Section is of interest, but without a color as a basis. |
