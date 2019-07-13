---
draft: true
---

| Properties            | Description                                                                                                                                                                                   |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`               | _(optional)_ the content value of the input.                                                                                                                                                  |
| `align`               | _(optional)_ defines the `text-align` of the input. Defaults to `left`.                                                                                                                       |
| `label`               | _(optional)_ prepends the Form Label component. If no ID is provided, a random ID is created.                                                                                                 |
| `label_direction`     | _(optional)_ use `label_direction="vertical"` to change the label layout direction. Defaults to `horizontal`                                                                                  |
| `status`              | _(optional)_ text with a status message. The style defaults to an error message.                                                                                                              |
| `status_state`        | _(optional)_ defines the state of the status. Currently there are two statuses `[error, info]`. Defaults to `error`.                                                                          |
| `placeholder`         | _(optional)_ the placeholder which shows up once the input value is empty                                                                                                                     |
| `input_state`         | _(optional)_ to control the visual focus state as a prop, like `focus` or `blur`.                                                                                                             |
| `input_class`         | _(optional)_ in case we have to set a custom input class.                                                                                                                                     |
| `type`                | _(optional)_ choose between `text`, `number`, `email`, `password`, `url`, `tel` and `search`.                                                                                                 |
| `autocomplete`        | _(optional)_ defaults to `off`. Set to `on` or any of [allowed `attributes`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-autocomplete).                              |
| `submit_button_title` | _(optional)_ title attribute for the search icon. Only relevant if search input                                                                                                               |
| `description`         | _(optional)_ text describing the content of the input more than the label.                                                                                                                    |
| `size`                | _(optional)_ at the moment `large` is the only available variant. Leave blank if you want a standard size input.                                                                              |
| `selectall`           | _(optional)_ if set to `true`, then the whole input value gets selected on the entry focus. A second click will place the cursor on the wanted position.                                      |
| `stretch`             | _(optional)_ if set to `true`, then the input field will be 100% in `width`.                                                                                                                  |
| `input_state`         | _(optional)_ defines a custom visual state of the input. Use it only if you have to simulate a custom state. Currently are three statuses `virgin` , `focus` and `dirty`. Defaults to `null`. |
