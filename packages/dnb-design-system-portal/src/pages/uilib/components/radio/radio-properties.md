---
draft: true
---

## Radio button

| Properties       | Description                                                                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`          | _(mandatory)_ defines the `value` as a string. Use it to get the value during the `on_change` event listener callback in the **RadioGroup**. |
| `checked`        | _(optional)_ determine whether the radio is checked or not. Default will be `false`.                                                         |
| `title`          | _(optional)_ the `title` of the input - describing it a bit further for accessibility reasons.                                               |
| `group`          | _(optional)_ use a unique group identifier to define the Radio buttons who belongs together.                                                 |
| `label`          | _(optional)_ use either the `label` property or provide custom one.                                                                          |
| `label_position` | _(optional)_ defines the position of the `label`. Use either `left` or `right`. Defaults to `right`.                                         |
| `id`             | _(optional)_ the `id` of the input. Default will be a random id.                                                                             |
| `disabled`       | _(optional)_ to disable/enable the radio.                                                                                                    |
| `status`         | _(optional)_ text with a status message. The style defaults to an error message.                                                             |
| `status_state`   | _(optional)_ defines the state of the status. Currently there are two statuses `[error, info]`. Defaults to `error`.                         |
|                  |                                                                                                                                              |

## Radio group

| Properties         | Description                                                                                                                                                          |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`            | _(optional)_ defines the pre-selected Radio button. The value has to match one provided in the Radio button. Use a string value.                                     |
| `name`             | _(optional)_ custom grouping name. Defaults to random name.                                                                                                          |
| `layout_direction` | _(optional)_ Define the layout direction of the Radio buttons. Can be either `column` or `row`. Defaults to `column`.                                                |
| `title`            | _(optional)_ the `title` of group, describing it a bit further for accessibility reasons.                                                                            |
| `status`           | _(optional)_ uses the `form-status` component to show failure messages.                                                                                              |
| `status_state`     | _(optional)_ defines the state of the status. Currently there are two statuses `[error, info]`. Defaults to `error`.                                                 |
| `id`               | _(optional)_ the `id` of the input. Default will be a random id.                                                                                                     |
| `disabled`         | _(optional)_ to disable/enable the all the nested Radio buttons.                                                                                                     |
| `label`            | _(optional)_ use either the `label` property or provide custom one.                                                                                                  |
| `direction`        | _(optional)_ to define the `label` layout direction on how the next element should be placed on. Can be either `vertical` or `horizontal`. Defaults to `horizontal`. |
| `vertical`         | _(optional)_ is a short hand to define a `vertical` direction if set to `true`.                                                                                      |
