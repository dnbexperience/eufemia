| Properties      | Description                                                                                                                   |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `data`          | _(mandatory)_ the data we want to fill the list with. Provide the data as a json string or data array structure.              |
| `selected_item` | _(optional)_ a number as a string or integer, defines the active item in the data array. The default value is the first item. |
| `icon`          | _(optional)_ name of icon to be included in the dropdown.                                                                     |
| `icon_position` | _(optional)_ position of icon inside the dropdown. Set to `left` or `right`. Defaults to `right` if not set.                  |
| `disabled`      | _(optional)_ to disable/enable the dropdown without using the `attribute` property.                                           |
| `id`            | _(optional)_ the `id` of the input.                                                                                           |

| Events            | Description                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------------------- |
| `on_change`       | _(optional)_ will be called on state changes made by the user.                                              |
| `on_select`       | _(optional)_ will be called once the users selects the current item by a click or enter/space bar activity. |
| `on_show`         | _(optional)_ will be called once the user presses the dropdown.                                             |
| `on_hide`         | _(optional)_ will be called once the user presses the dropdown again, or clicks somewhere else.             |
| `on_state_update` | _(optional)_ will be called once the parameter `selected_value` changes its value.                          |
