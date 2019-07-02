---
draft: true
---

| Events            | Description                                                                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `on_change`       | _(optional)_ will be called on state changes made by the user. Returns an object `{ data, event }`.                                              |
| `on_select`       | _(optional)_ will be called once the users selects the current item by a click or enter/space bar activity. Returns an object `{ data, event }`. |
| `on_show`         | _(optional)_ will be called once the user presses the dropdown. Returns `{ data }`.                                                              |
| `on_hide`         | _(optional)_ will be called once the user presses the dropdown again, or clicks somewhere else. Returns `{ data }`.                              |
| `on_state_update` | _(optional)_ will be called once the parameter `selected_value` changes its value.                                                               |
