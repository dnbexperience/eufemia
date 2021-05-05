---
showTabs: true
---

## Properties

| Properties                                  | Description                                                                                                                                                         |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checked`                                   | _(optional)_ determine whether the switch is checked or not. Default will be `false`.                                                                               |
| `title`                                     | _(mandatory)_ the `title` of the input - describing it a bit further for accessibility reasons.                                                                     |
| `label`                                     | _(optional)_ use either the `label` property or provide custom one.                                                                                                 |
| `label_position`                            | _(optional)_ defines the position of the `label`. Use either `left` or `right`. Defaults to `right`.                                                                |
| `size`                                      | _(optional)_ the size of the switch. For now there is **medium** (default) and **large**.                                                                           |
| `status`                                    | _(optional)_ text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.                |
| `status_state`                              | _(optional)_ defines the state of the status. Currently there are two statuses `[error, info]`. Defaults to `error`.                                                |
| `global_status_id`                          | _(optional)_ the `status_id` used for the target [GlobalStatus](/uilib/components/global-status).                                                                   |
| `suffix`                                    | _(optional)_ text describing the content of the Switch more than the label. You can also send in a React component, so it gets wrapped inside the Switch component. |
| [Space](/uilib/components/space/properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                                               |
