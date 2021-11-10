---
showTabs: true
---

import AutocompleteMethods from 'Docs/uilib/components/autocomplete/methods'

## Events

| Events      | Description                                                                                                                                                                                                                                                                                                                                                                      |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `on_type`   | _(optional)_ will be called for every key change the users makes. Returns an object with the input `value` inside `{ value, event, attributes }` including [these methods](/uilib/components/autocomplete/events#dynamically-change-data).                                                                                                                                       |
| `on_focus`  | _(optional)_ will be called on user generated focus action. Returns an object with the input `value` inside `{ value, event, attributes }` including [these methods](/uilib/components/autocomplete/events#dynamically-change-data).                                                                                                                                             |
| `on_blur`   | _(optional)_ will be called on user generated blur action. Returns an object with the input `value` inside `{ value, event, attributes }` including [these methods](/uilib/components/autocomplete/events#dynamically-change-data).                                                                                                                                              |
| `on_change` | _(optional)_ will be called on state changes made by the user. Returns an object with the new selected `data` item `{ data, event, attributes, value }` including [these methods](/uilib/components/autocomplete/events#dynamically-change-data).                                                                                                                                |
| `on_select` | _(optional)_ will be called once the users selects an item by a click or keyboard navigation. Returns an object with the new selected `data` item `{ data, event, attributes, value, active_item }` including [these methods](/uilib/components/autocomplete/events#dynamically-change-data). The **active_item** property is the currently selected item by keyboard navigation |
| `on_show`   | _(optional)_ will be called once the user presses the autocomplete. Returns the data item `{ data, attributes }`.                                                                                                                                                                                                                                                                |
| `on_hide`   | _(optional)_ will be called once the user presses the autocomplete again, or clicks somewhere else. Returns the data item `{ data, attributes }`.                                                                                                                                                                                                                                |

### The `on_change` vs `on_select` difference

The difference between `on_change` and `on_select` is:

- `on_change` will be called when the state changes, either with a **click** or **space/enter** keypress confirmation.
- `on_select` differs most when the users is navigating by keyboard. Once the uses is pressing e.g. the arrow keys, the selection is changing, but not the state.

<AutocompleteMethods></AutocompleteMethods>
