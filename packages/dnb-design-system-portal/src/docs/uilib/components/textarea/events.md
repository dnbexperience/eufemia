---
showTabs: true
---

## Events

| Events        | Description                                                                                                                                          |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `on_change`   | _(optional)_ will be called on value changes made by the user. Returns an object with a string value and the native event: `{ value, rows, event }`. |
| `on_focus`    | _(optional)_ will be called on focus set by the user. Returns `{ value, event }`.                                                                    |
| `on_blur`     | _(optional)_ will be called on blur set by the user. Returns `{ value, event }`.                                                                     |
| `on_key_down` | _(optional)_ will be called during every keystroke. Returns `{ value, rows, event }`.                                                                |
