---
showTabs: true
---

## Component Properties

| Properties                                  | Description                                                                                                                                                                                                                                                 |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`                                      | _(required)_ defines how the StepIndicator should work. Use `static` for non-interactive steps. Use `strict` for a chronological step order, also, the user can navigate between visited steps. Use `loose` if the user should be able to navigate freely. |
| `data`                                      | _(required)_ defines the data/steps showing up in a JavaScript Array or JSON format like `[{title,is_current}]`. See parameters and the example above.                                                                                                         |
| `sidebar_id`                                | _(required)_ a unique string-based ID in order to bind together the main component and the sidebar (`<StepIndicator.Sidebar />`). Both have to get the same ID.                                                                                           |
| `current_step`                              | _(optional)_ defines the active number marked step starting by 0. Defaults to `0`.                                                                                                                                                                          |
| `hide_numbers`                              | _(optional)_ define whether to show automatically counted numbers or not. Defaults to `false`.                                                                                                                                                              |
| `no_animation`                              | _(optional)_ if set to `true`, the height animation on the step items and the drawer button will be omitted. Defaults to false.                                                                                                                             |
| `on_item_render`                            | _(optional)_ callback function to manipulate or wrap every item. Has to return a React Node. You receive an object you can use in your custom HOC `{ StepItem, element, attributes, props, context }`.                                                      |
| ~~`use_navigation`~~                        | _(deprecated)_ use `mode="static"` instead – if set to true, every achieved step (and the current step) has an item with a [Button](/uilib/components/button) so the user can navigate back and forth.                                                      |
| ~~`active_item`~~                           | _(deprecated)_ defines the active number marked step starting by 0. Defaults to `0`.                                                                                                                                                                        |
| ~~`active_url`~~                            | _(deprecated)_ defines the active url marked step.                                                                                                                                                                                                          |
| [Space](/uilib/components/space/properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                                                                                                                                       |

## Steps Parameters

| Parameters       | Description                                                                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`          | _(required)_ the title as a string or React element.                                                                                                               |
| `is_current`     | _(optional)_ if set to `true`, this item step will be set as the current current selected step. This can be used instead of `current_step` on the component itself. |
| `inactive`       | _(optional)_ if set to `true`, this item step will be handled as an inactive step and will not be clickable. Defaults to false.                                     |
| `disabled`       | _(optional)_ if set to `true`, this item step will be visible as an disabled button and will not be clickable. Defaults to false.                                   |
| `status`         | _(optional)_ a status text.                                                                                                                                         |
| `status_state`   | _(optional)_ In case the status state should be `info` or `error`. Defaults to `warn`.                                                                              |
| `on_render`      | _(optional)_ callback function to manipulate or wrap a certain item. Has to return a React Node.                                                                    |
| `on_click`       | _(optional)_ event function that gets invoked once the users clicks on the active item.                                                                             |
| ~~`is_active`~~  | _(deprecated)_ if set to `is_active`: true, this item step will be handled as an active (activated) step and may be clickable .                                     |
| ~~`url`~~        | _(deprecated)_ sets the url, showing on every step, if not `url_future` is set.                                                                                     |
| ~~`url_future`~~ | _(deprecated)_ sets the url, showing only on the future steps. Can be used to _reset_ the future steps individually.                                                |
| ~~`url_passed`~~ | _(deprecated)_ sets the url, showing only on the passed steps. Can be used to _reset_ the passed steps individually.                                                |

## Steps example

```js
const steps = [
  { title: 'Active' },
  { title: 'Active and marked as current', is_current: true },
  { title: 'Not active', inactive: true },
  { title: 'Disabled', disabled: true },
  {
    title: 'Active item with status text',
    status: 'Status text',
    status_state: 'warn', // defaults to warning
  },
]
```
