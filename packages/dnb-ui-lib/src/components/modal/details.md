| Properties           | Description                                                                                                                                                |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`               | _(mandatory)_ the modal triggering element. Choose between `button` or `text`                                                                              |
| `modal_trigger_text` | _(mandatory)_ if type is set to `text`, this will be the text which triggers the modal. If set to `button` it will be the `title` attribute of the button. |
| `modal_text`         | _(mandatory)_ the text which will appear when triggering the modal.                                                                                        |
| `content_id`         | _(optional)_ The                                                                                                                                           |

| Events     | Description                                                      |
| ---------- | ---------------------------------------------------------------- |
| `on_open`  | _(optional)_ this event gets triggered once the modal shows up   |
| `on_close` | _(optional)_ this event gets triggered one the modal gets closed |
