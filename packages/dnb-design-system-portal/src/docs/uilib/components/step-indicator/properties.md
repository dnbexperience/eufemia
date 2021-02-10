---
showTabs: true
---

## Component Properties

| Properties                                  | Description                                                                                                                                            |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `data`                                      | _(mandatory)_ defines the data/steps showing up in a JavaScript Array or JSON format like `[{title,url}]`.                                             |
| `use_navigation`                            | _(optional)_ then every achieved (and the current) step has an item with a [Button](/uilib/components/button) so the user can navigate back and forth. |
| `active_item`                               | _(optional)_ defines the active number marked step starting by 0. Defaults to `0`.                                                                     |
| `active_url`                                | _(optional)_ defines the active url marked step.                                                                                                       |
| `hide_numbers`                              | _(optional)_ define whether to show automatically counted numbers or not. Defaults to `false`.                                                         |
| `on_item_render`                            | _(optional)_ callback function to manipulate or wrap every item. Has to return a React Node.                                                           |
| [Space](/uilib/components/space/properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                                  |

## Item Parameters

| Parameters   | Description                                                                                                                                                           |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`      | _(mandatory)_ the title showing on every step.                                                                                                                        |
| `url`        | _(optional)_ sets the url, showing on every step, if not `url_future` is set.                                                                                         |
| `is_current` | _(optional)_ if set to `is_current="true"`, the current items will be selected as the current selected.                                                               |
| `is_active`  | _(optional)_ if set to `is_active="true"`, the current items will be selected as the current active. This can be used instead of using `active_item` or `active_url`. |
| `url_future` | _(optional)_ sets the url, showing only on the future steps. Can be used to _reset_ the future steps individually.                                                    |
| `url_passed` | _(optional)_ sets the url, showing only on the passed steps. Can be used to _reset_ the passed steps individually.                                                    |
| `on_render`  | _(optional)_ callback function to manipulate or wrap a certain item. Has to return a React Node.                                                                      |

## Item data structure

```json
[
  { "title": "Om din nye bolig", "url": "?a" },
  { "title": "Ditt lån og egenkapital", "url": "?b" },
  { "title": "Oppsummering", "url": "?c", "url_future": "" }
]
```
