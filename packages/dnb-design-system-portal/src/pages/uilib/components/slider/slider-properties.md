---
draft: true
---

## Properties

| Properties     | Description                                                                                                          |
| -------------- | -------------------------------------------------------------------------------------------------------------------- |
| `value`        | _(mandatory)_ the `vlaue` of the slider. Also the event callback result.                                             |
| `min`          | _(optional)_ the minimum value. Defaults to `0`.                                                                     |
| `max`          | _(optional)_ the maxium value. Defaults to `100`                                                                     |
| `step`         | _(optional)_ the steps the slider takes on changing the value. Defaults to `null`                                    |
| `vertical`     | _(optional)_ show the slider vertically. Defaults to `false`.                                                        |
| `reverse`      | _(optional)_ show the slider reversed. Defaults to `false`.                                                          |
| `hide_buttons` | _(optional)_ removes the helper buttons. Defaults to `false`.                                                        |
| `thump_title`  | _(optional)_ show the slider reversed. Defaults to `null`.                                                           |
| `label`        | _(optional)_ prepends the Form Label component. If no ID is provided, a random ID is created.                        |
| `status`       | _(optional)_ text with a status message. The style defaults to an error message.                                     |
| `status_state` | _(optional)_ defines the state of the status. Currently there are two statuses `[error, info]`. Defaults to `error`. |
