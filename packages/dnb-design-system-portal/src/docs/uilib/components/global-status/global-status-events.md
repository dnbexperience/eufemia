---
draft: true
---

| Events     | Description                                                                                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `on_open`  | _(optional)_ gets triggered the first time the GlobalStatus appears on the screen. In other words, it has to have been hidden before. Returns `{ ...properties }`. |
| `on_show`  | _(optional)_ gets triggered for the first time and for every new content update the GlobalStatus gets. Returns `{ ...properties }`.                                |
| `on_close` | _(optional)_ gets triggered once the GlobalStatus disappears from the screen. Works only if `no_animation` is not `true`. Returns `{ ...properties }`.             |
| `on_hide`  | _(optional)_ gets triggered once the GlobalStatus is getting closed/hidden by the user. Returns `{ ...properties }`.                                               |
