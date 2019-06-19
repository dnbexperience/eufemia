---
draft: true
---

| Properties       | Description                                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------------------- |
| `checked`        | _(optional)_ determine whether the switch is checked or not. Default will be `false`.                          |
| `default_state`  | _(optional)_ boolean value. The state of the switch. Defaults to `false`. Set to `true` if otherwise.          |
| `title`          | _(mandatory)_ the `title` of the input - describing it a bit further for accessibility reasons.                |
| `label`          | _(optional)_ use either the `label` property or provide custom one.                                            |
| `label_position` | _(optional)_ defines the position of the `label`. Use either `left` or `right`. Defaults to `left`.            |
| `id`             | _(optional)_ the `id` of the input. Default will be a random id.                                               |
| `disabled`       | _(optional)_ to disable/enable the switch.                                                                     |
| `status`         | _(optional)_ text with a status message. The style defaults to an error message.                               |
| `status_state`   | _(optional)_ defines the state of the status. Currently there are two statuses `[error, info]`. Defaults to `error`. |
