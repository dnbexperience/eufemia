---
draft: true
---

| Events            | Description                                                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `on_change`       | _(optional)_ will be called on value changes made by the user. Returns an object with the value as a string and the a native event: `{ value, event }`. |
| `on_focus`        | _(optional)_ will be called on focus set by the user. Returns `{ value, event }`.                                                                       |
| `on_blur`         | _(optional)_ will be called on blur set by the user. Returns `{ value, event }`.                                                                        |
| `on_submit`       | _(optional)_ will be called on submit button click. Returns `{ value, event }`.                                                                         |
| `on_state_update` | _(optional)_ will be called once the parameter `checked` changes its state.                                                                             |
