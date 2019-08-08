---
draft: true
---

## The difference

The difference between `on_change` and `on_select` is:

- `on_change` will be called when the state changes, either with a **click** or **space/enter** keypress confirmation.
- `on_select` differs most when the users is navigating by keyboard. Once the uses is pressing e.g. the arrow keys, the selection is changing, but not the state.

## Dropdown Events

| Events            | Description                                                                                                                                                                                                                                                                                        |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `on_change`       | _(optional)_ will be called on state changes made by the user. Returns an object with the new selected `data` item `{ data, event, selected_item }`. The **selected_item** property is the selected item by number, starting by 0.                                                                 |
| `on_select`       | _(optional)_ will be called once the users selects an item by a click or keyboard navigation. Returns an object with the new selected `data` item `{ data, event, selected_item, active_item }`. The **active_item** property is the currently selected one by keyboard navigation, starting by 0. |
| `on_show`         | _(optional)_ will be called once the user presses the dropdown. Returns the data item `{ data }`.                                                                                                                                                                                                  |
| `on_hide`         | _(optional)_ will be called once the user presses the dropdown again, or clicks somewhere else. Returns the data item `{ data }`.                                                                                                                                                                  |
| `on_state_update` | _(optional)_ will be called once the parameter `selected_value` changes its value.                                                                                                                                                                                                                 |
