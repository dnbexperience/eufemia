---
draft: true
---

| Events     | Description                                                                                                                                                           |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `on_open`  | _(optional)_ gets triggered once the GlobalStatus appears on the screen. Returns `{ ...properties, id, status_id }`.                                                  |
| `on_close` | _(optional)_ gets triggered once the GlobalStatus is getting closed by the user. Returns `{ ...properties, id, status_id }`.                                          |
| `on_hide`  | _(optional)_ gets triggered once the GlobalStatus disappears from the screen. Works only if `no_animation` is not `true`. Returns `{ ...properties, id, status_id }`. |
