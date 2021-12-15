---
showTabs: true
---

## Events

| Events          | Description                                                                                                                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `on_change`     | _(optional)_ will be called on state changes made by the user. Returns a boolean `{ checked, event }`.                                                                                                |
| `on_change_end` | _(optional)_ will be called on state changes made by the user, but with a delay. This way the user sees the animation before e.g. an error will be removed. Returns a boolean `{ checked, event }`. |
