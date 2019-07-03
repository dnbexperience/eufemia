---
draft: true
---

## ToggleButton button

| Properties       | Description                                                                                                                                         |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`          | _(mandatory)_ defines the `value` as a string. Use it to get the value during the `on_change` event listener callback in the **ToggleButtonGroup**. |
| `text`           | _(mandatory)_ the text show in the ToggleButton.                                                                                                    |
| `checked`        | _(optional)_ determine whether the ToggleButton is checked or not. Default will be `false`.                                                         |
| `title`          | _(optional)_ the `title` of the input - describing it a bit further for accessibility reasons.                                                      |
| `label`          | _(optional)_ use either the `label` property or provide custom one.                                                                                 |
| `label_position` | _(optional)_ defines the position of the `label`. Use either `left` or `right`. Defaults to `right`.                                                |
| `status`         | _(optional)_ text with a status message. The style defaults to an error message.                                                                    |
| `status_state`   | _(optional)_ defines the state of the status. Currently there are two statuses `[error, info]`. Defaults to `error`.                                |

## ToggleButton group

| Properties         | Description                                                                                                                                                                                     |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`            | _(optional)_ defines the pre-selected ToggleButton button. The value has to match one provided in the ToggleButton button. Use a string value.                                                  |
| `values`           | _(optional)_ defines the pre-selected ToggleButton buttons in `multiselect` mode. The values has to match the one provided in the ToggleButton buttons. Use array, either as JS or JSON string. |
| `multiselect`      | _(optional)_ defines if the ToggleButton's should act as a multi selectable list of toggle buttons. Defaults to false.                                                                          |
| `layout_direction` | _(optional)_ Define the layout direction of the ToggleButton buttons. Can be either `column` or `row`. Defaults to `column`.                                                                    |
| `title`            | _(optional)_ the `title` of group, describing it a bit further for accessibility reasons.                                                                                                       |
| `status`           | _(optional)_ uses the `form-status` component to show failure messages.                                                                                                                         |
| `status_state`     | _(optional)_ defines the state of the status. Currently there are two statuses `[error, info]`. Defaults to `error`.                                                                            |
| `label`            | _(optional)_ use either the `label` property or provide custom one.                                                                                                                             |
| `direction`        | _(optional)_ to define the `label` layout direction on how the next element should be placed on. Can be either `vertical` or `horizontal`. Defaults to `horizontal`.                            |
| `vertical`         | _(optional)_ is a short hand to define a `vertical` direction if set to `true`.                                                                                                                 |
