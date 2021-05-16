---
showTabs: true
---

## Component Properties

| Properties                                  | Description                                                                                                                                                            |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`                                      | _(mandatory)_ defines the data/steps showing up in a JavaScript Array or JSON format like `[{title,is_current}]`. See parameters and example above.                    |
| `current_step`                              | _(optional)_ defines the active number marked step starting by 0. Defaults to `0`.                                                                                     |
| `hide_numbers`                              | _(optional)_ define whether to show automatically counted numbers or not. Defaults to `false`.                                                                         |
| `enable_navigation`                         | _(optional)_ if set to true, every achieved step (and the current step) has an item with a [Button](/uilib/components/button) so the user can navigate back and forth. |
| ~~`use_navigation`~~                        | _(optional)_ if set to true, every achieved step (and the current step) has an item with a [Button](/uilib/components/button) so the user can navigate back and forth. |
| ~~`active_item`~~                           | _(optional)_ defines the active number marked step starting by 0. Defaults to `0`.                                                                                     |
| ~~`active_url`~~                            | _(optional)_ defines the active url marked step.                                                                                                                       |
| `on_item_render`                            | _(optional)_ callback function to manipulate or wrap every item. Has to return a React Node.                                                                           |
| [Space](/uilib/components/space/properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                                                  |

## Step Parameters

| Parameters       | Description                                                                                                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`          | _(mandatory)_ the title showing on every step.                                                                                                                                  |
| `is_current`     | _(optional)_ if set to `is_current: true`, this item step will be set as the current current selected step. This can be used instead of `current_step` on the component itself. |
| `is_active`      | _(optional)_ if set to `is_active: true`, this item step will be handled as an active (activated) step and may be clickable .                                                   |
| `on_render`      | _(optional)_ callback function to manipulate or wrap a certain item. Has to return a React Node.                                                                                |
| ~~`url`~~        | _(optional)_ sets the url, showing on every step, if not `url_future` is set.                                                                                                   |
| ~~`url_future`~~ | _(optional)_ sets the url, showing only on the future steps. Can be used to _reset_ the future steps individually.                                                              |
| ~~`url_passed`~~ | _(optional)_ sets the url, showing only on the passed steps. Can be used to _reset_ the passed steps individually.                                                              |

## Steps example

```js
const steps = [
  { title: 'Active', is_active: true },
  { title: 'Active and marked as current', is_current: true },
  { title: 'Not active' },
]
```
