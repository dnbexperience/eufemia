---
draft: true
---

| Properties            | Description                                                                                                                                                      |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                  | _(mandatory)_ the **id** attribute of the input element                                                                                                          |
| `value`               | _(optional)_ the content value of the input.                                                                                                                     |
| `label`               | _(optional)_ prepends the Form Label component. If no ID is provided, a random ID is created. input.                                                             |
| `status`              | _(optional)_ text with a status message. The style defaults to an error message.                                                                                 |
| `status_state`        | _(optional)_ defines the state of the status. Currently are two statuses `[error, info]`. Defaults to `error`.                                                   |
| `placeholder`         | _(optional)_ the placeholder which shows up once the input value is empty                                                                                        |
| `input_class`         | _(optional)_ in case we have to set a custom input class.                                                                                                        |
| `type`                | _(optional)_ choose between `text`, `number`, `email`, `password`, `url`, `tel` and `search`.                                                                    |
| `autocomplete`        | _(optional)_ defaults to `off`. Set to `on` or any of [allowed `attributes`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-autocomplete). |
| `submit_button_title` | _(optional)_ title attribute for the search icon. Only relevant if search input                                                                                  |
| `description`         | _(optional)_ text describing the content of the input more than the label.                                                                                       |
| `size`                | _(optional)_ at the moment `large` is the only available variant. Leave blank if you want a standard size input.                                                 |
| `attributes`          | _(optional)_ insert any other attributes. For example `disabled` or any other custom attributes.                                                                 |
