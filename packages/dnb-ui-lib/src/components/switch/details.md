| Properties       | Description                                                                                           |
| ---------------- | ----------------------------------------------------------------------------------------------------- |
| `title`          | _(mandatory)_ the `title` of the input - describing it a bit further for accessibility reasons.       |
| `id`             | _(optional)_ the `id` of the input. Default will be a random id.                                      |
| `default_state`  | _(optional)_ boolean value. The state of the switch. Defaults to `false`. Set to `true` if otherwise. |
| `checked`        | _(optional)_ determine whether the switch is checked or not. Default will be `false`.                 |
| `disabled`       | _(optional)_ to disable/enable the switch.                                                            |
| `title_positive` | _(optional)_ the text for the `on` status of the switch. Default will be `Yes`.                       |
| `title_negative` | _(optional)_ the text for the `off` status of the switch. Default will be `No`.                       |
| `attributes`     | _(optional)_ insert any other attributes. For example `disabled` or any other custom attributes.      |

| Events            | Description                                                                 |
| ----------------- | --------------------------------------------------------------------------- |
| `on_change`       | _(optional)_ will be called on state changes made by the user.              |
| `on_state_update` | _(optional)_ will be called once the parameter `checked` changes its value. |
