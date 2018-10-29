---
component: 'Dropdown'
class: 'dnb-dropdown'
status: 'ready'
version: 0.5.0
---

<!-- The dropdown component is a 100% custom element.
The reason to go all custom and not do a hybrid or a native `select` box is so we can display more info in each option.
Since it looks totally different on smaller screens and touch devices, doing this component 100% custom gives us more flexibility. -->

#### NB!

_This pattern can be constructed in a number of ways to achieve a similar effect - from using the HTML 'select' element to custom building with divs, spans and javascript._

### What is it

The dropdown component is 100% custom-made.
The reason for this is so we can display more information in each option. Since it looks totally different on smaller screens and touch devices, doing this component 100% custom gives us more flexibility.

### When to use it

When you need to provide a considerable amount of option to the user and do not have the space to do so. Other reasons may be because the hidden options may clutter the interface and need only be displayed after the user specifically requests it.

### When not to use it

Don't use this if you have only a few 'menu' options which could otherwise be shown such as tabs or buttons.

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
