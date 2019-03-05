| Properties           | Description                                                                                                                                                |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`               | _(mandatory)_ the modal triggering element. Choose between `button` or `text`                                                                              |
| `title`              | _(optional)_ the modal title. Show on the very top of the content.                                                                                         |
| `modal_trigger_text` | _(mandatory)_ if type is set to `text`, this will be the text which triggers the modal. If set to `button` it will be the `title` attribute of the button. |
| `modal_text`         | _(mandatory)_ the text which will appear when triggering the modal.                                                                                        |
| `content_id`         | _(optional)_ The `content_id` defines an unique identifier to a Modal. Use it in case You have to refer in some way to the modal content wrapper.          |

| Events     | Description                                                      |
| ---------- | ---------------------------------------------------------------- |
| `on_open`  | _(optional)_ this event gets triggered once the modal shows up   |
| `on_close` | _(optional)_ this event gets triggered one the modal gets closed |
