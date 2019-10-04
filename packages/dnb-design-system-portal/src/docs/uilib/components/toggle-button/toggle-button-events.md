---
draft: true
---

## ToggleButton button

| Events            | Description                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `on_change`       | _(optional)_ will be called on state changes made by the user. Returns an boolean and string `{ checked, value, event }`. |
| `on_state_update` | _(optional)_ will be called once the parameter `checked` changes its state.                                               |

## ToggleButton group

| Events      | Description                                                                                                                                                                                              |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `on_change` | _(optional)_ will be called once a ToggleButton button changes the state. Returns an object `{ value, values, event }`. <br /><br /> **NB**: `values` is only available if `multiselect` is used / true. |
