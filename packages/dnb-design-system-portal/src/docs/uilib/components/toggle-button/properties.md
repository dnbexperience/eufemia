---
showTabs: true
---

## ToggleButton (button) properties

| Properties                                  | Description                                                                                                                                                                     |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`                                     | _(mandatory)_ defines the `value` as a string. Use it to get the value during the `on_change` event listener callback in the **ToggleButtonGroup**.                             |
| `text`                                      | _(mandatory)_ the text show in the ToggleButton.                                                                                                                                |
| `checked`                                   | _(optional)_ determine whether the ToggleButton is checked or not. Default will be `false`.                                                                                     |
| `title`                                     | _(optional)_ the `title` of the input - describing it a bit further for accessibility reasons.                                                                                  |
| `label`                                     | _(optional)_ use either the `label` property or provide custom one.                                                                                                             |
| `icon`                                      | _(optional)_ icon to be included in the toggle button.                                                                                                                          |
| `icon_position`                             | _(optional)_ position of icon inside the toggle button. Set to `left` or `right`. Defaults to `right` if not set.                                                               |
| `icon_size`                                 | _(optional)_ define icon width and height. Defaults to 16px                                                                                                                     |
| `status`                                    | _(optional)_ text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.                            |
| `status_state`                              | _(optional)_ defines the state of the status. Currently there are two statuses `[error, info]`. Defaults to `error`.                                                            |
| `global_status_id`                          | _(optional)_ the `status_id` used for the target [GlobalStatus](/uilib/components/global-status).                                                                               |
| `suffix`                                    | _(optional)_ text describing the content of the ToggleButton more than the label. You can also send in a React component, so it gets wrapped inside the ToggleButton component. |
| `skeleton`                                  | _(optional)_ if set to `true`, an overlaying skeleton with animation will be shown.                                                                                             |
| [Space](/uilib/components/space/properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                                                           |

## ToggleButton (group) properties

| Properties                                  | Description                                                                                                                                                                                     |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`                                     | _(optional)_ defines the pre-selected ToggleButton button. The value has to match one provided in the ToggleButton button. Use a string value.                                                  |
| `values`                                    | _(optional)_ defines the pre-selected ToggleButton buttons in `multiselect` mode. The values has to match the one provided in the ToggleButton buttons. Use array, either as JS or JSON string. |
| `multiselect`                               | _(optional)_ defines if the ToggleButton's should act as a multi selectable list of toggle buttons. Defaults to false.                                                                          |
| `layout_direction`                          | _(optional)_ Define the layout direction of the ToggleButton buttons. Can be either `column` or `row`. Defaults to `column`.                                                                    |
| `title`                                     | _(optional)_ the `title` of group, describing it a bit further for accessibility reasons.                                                                                                       |
| `status`                                    | _(optional)_ uses the `form-status` component to show failure messages.                                                                                                                         |
| `status_state`                              | _(optional)_ defines the state of the status. Currently there are two statuses `[error, info]`. Defaults to `error`.                                                                            |
| `global_status_id`                          | _(optional)_ the `status_id` used for the target [GlobalStatus](/uilib/components/global-status).                                                                                               |
| `label`                                     | _(optional)_ use either the `label` property or provide custom one.                                                                                                                             |
| `label_direction`                           | _(optional)_ to define the `label` layout direction on how the next element should be placed on. Can be either `vertical` or `horizontal`. Defaults to `horizontal`.                            |
| `label_sr_only`                             | _(optional)_ use `true` to make the label only readable by screen readers.                                                                                                                      |
| `vertical`                                  | _(optional)_ will force both `direction` and `label_direction` to be **vertical** if set to `true`.                                                                                             |
| `suffix`                                    | _(optional)_ text describing the content of the ToggleButtonGroup more than the label. You can also send in a React component, so it gets wrapped inside the ToggleButtonGroup component.       |
| `skeleton`                                  | _(optional)_ if set to `true`, an overlaying skeleton with animation will be shown.                                                                                                             |
| [Space](/uilib/components/space/properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                                                                           |

### ToggleButton group Context

You can also pass through `label_position` and some more **ToggleButton** properties to the Group. This way all nested ToggleButton's will get the properties.
