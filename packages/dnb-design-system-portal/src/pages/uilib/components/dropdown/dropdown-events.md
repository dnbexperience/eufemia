---
draft: true
---

| Events            | Description                                                                                                                                                          |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `on_change`       | _(optional)_ will be called on state changes made by the user. Returns an object with the new selected `data` item `{ data, event }`.                                |
| `on_select`       | _(optional)_ will be called once the users selects an item by a click or keyboard navigation. Returns an object with the new selected `data` item `{ data, event }`. |
| `on_show`         | _(optional)_ will be called once the user presses the dropdown. Returns the data item `{ data }`.                                                                    |
| `on_hide`         | _(optional)_ will be called once the user presses the dropdown again, or clicks somewhere else. Returns the data item `{ data }`.                                    |
| `on_state_update` | _(optional)_ will be called once the parameter `selected_value` changes its value.                                                                                   |
