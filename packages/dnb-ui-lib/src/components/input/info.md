---
component: 'Input'
class: 'dnb-input'
status: 'prototype'
version: 0.5.0
---

The input component is an umbrella component for all inputs which share the same style as the classic `text` input field. Radio buttons and other form elements are not included here.

There is an experimental [Masked-Input component](/uilib/components/input-masked/)

| Properties            | Description                                                                                                                                                      |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                  | _(mandatory)_ the id is mandatory because of its importance in the DOM - whether it's as a reference for the label or as a hook when submitting a form.          |
| `value`               | _(optional)_ the content value of the input.                                                                                                                     |
| `placeholder`         | _(optional)_ the placeholder witch shows up once the input value is empty                                                                                        |
| `type`                | _(mandatory)_ choose between `text`, `number`, `email`, `password`, `url`, `tel` and `search`.                                                                   |
| `autocomplete`        | _(optional)_ defaults to `off`. Set to `on` or any of [allowed `attributes`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-autocomplete). |
| `search_button_title` | _(optional)_ title attribute for the search icon. Only relevant if search input                                                                                  |
| `description`         | _(optional)_ text describing the content of the input more than the label.                                                                                       |
| `extra_information`   | _(optional)_ text not describing the content, but an extra text to back up the purpose of the input content.                                                     |
| `font_class`          | _(optional)_ check `typography` section for all font class variants. Defaults to `.typo-book`.                                                                   |
| `size`                | _(optional)_ at the moment `large` is the only available variant. Leave blank if you want a standard size input.                                                 |
| `attributes`          | _(optional)_ insert any other attributes. For example `disabled` or any other custom attributes.                                                                 |

| Events            | Description                                                                 |
| ----------------- | --------------------------------------------------------------------------- |
| `on_change`       | _(optional)_ will be called on state changes made by the user.              |
| `on_state_update` | _(optional)_ will be called once the parameter `checked` changes its value. |
