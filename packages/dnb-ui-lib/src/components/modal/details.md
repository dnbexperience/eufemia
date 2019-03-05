| Properties        | Description                                                                                                                                                |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`           | _(optional)_ the modal title. Show on the very top of the content.                                                                                         |
| `trigger_variant` | _(optional)_ the modal triggering button variant. Defaults to `secondary`.                                                                                 |
| `trigger_text`    | _(mandatory)_ if type is set to `text`, this will be the text which triggers the modal. If set to `button` it will be the `title` attribute of the button. |
| `trigger_title`   | _(optional)_ the modal triggering button title.                                                                                                            |
| `trigger_icon`    | _(optional)_ the modal triggering button icon. Can be used instead of a `trigger_text`                                                                     |
| `modal_content`   | _(optional)_ the content which will appear when triggering the modal.                                                                                      |
| `content_id`      | _(optional)_ The `content_id` defines an unique identifier to a Modal. Use it in case You have to refer in some way to the modal content wrapper.          |

| Events     | Description                                                      |
| ---------- | ---------------------------------------------------------------- |
| `on_open`  | _(optional)_ this event gets triggered once the modal shows up   |
| `on_close` | _(optional)_ this event gets triggered one the modal gets closed |
