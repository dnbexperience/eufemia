---
draft: true
---

## Radio button

| Events            | Description                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| `on_change`       | _(optional)_ will be called on state changes made by the user. Returns an boolean and string `{ checked, value }`. |
| `on_state_update` | _(optional)_ will be called once the parameter `checked` changes its state.                                        |

## Radio group

| Events      | Description                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------------- |
| `on_change` | _(optional)_ will be called once a Radio button changes the state. Returns an object `{ value }`. |
