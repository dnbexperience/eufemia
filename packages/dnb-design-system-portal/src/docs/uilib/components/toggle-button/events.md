---
showTabs: true
---

## ToggleButton (button) events

| Events      | Description                                                                                                               |
| ----------- | ------------------------------------------------------------------------------------------------------------------------- |
| `on_change` | _(optional)_ will be called on state changes made by the user. Returns a boolean and string `{ checked, value, event }`. |

## ToggleButton (group) events

| Events      | Description                                                                                                                                                                                              |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `on_change` | _(optional)_ will be called once a ToggleButton button changes the state. Returns an object `{ value, values, event }`. <br /><br /> **NB**: `values` is only available if `multiselect` is used / true. |
