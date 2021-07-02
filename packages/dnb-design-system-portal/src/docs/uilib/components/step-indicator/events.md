---
showTabs: true
---

## Component events

| Events      | Description                                                                                                                                                          |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `on_change` | _(optional)_ will be called once the users visits actively a new step. Will be emitted only once. Returns an object `{ event, item, current_step }`.                 |
| `on_click`  | _(optional)_ will be called once the users clicks on the current or another step. Will be emitted on every click. Returns an object `{ event, item, current_step }`. |

## Item events

| Events     | Description                                                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `on_click` | _(optional)_ will be called on a click event, if a `anchor` or a `button` is available. Returns an object `{ event, item, current_step }`. |
