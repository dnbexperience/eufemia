---
draft: true
---

| Properties                                      | Description                                                                                                          |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `value`                                         | _(optional)_ the content value of the textarea.                                                                      |
| `align`                                         | _(optional)_ defines the `text-align` of the textarea. Defaults to `left`.                                           |
| `stretch`                                       | _(optional)_ if set to `true`, then the textarea field will be 100% in `width`.                                      |
| `placeholder`                                   | _(optional)_ the placeholder which shows up once the textarea value is empty                                         |
| `label`                                         | _(optional)_ prepends the Form Label component. If no ID is provided, a random ID is created. textarea.              |
| `label_direction`                               | _(optional)_ use `label_direction="vertical"` to change the label layout direction. Defaults to `horizontal`         |
| `status`                                        | _(optional)_ text with a status message. The style defaults to an error message.                                     |
| `status_state`                                  | _(optional)_ defines the state of the status. Currently there are two statuses `[error, info]`. Defaults to `error`. |
| `global_status_id`                              | _(optional)_ the `status_id` used for the target [GlobalStatus](/uilib/components/global-status).                    |
| `textarea_state`                                | _(optional)_ to control the visual focus state as a prop, like `focus` or `blur`.                                    |
| `textarea_class`                                | _(optional)_ in case we have to set a custom textarea class.                                                         |
| [Space](/uilib/components/space#tab-properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                |
