| Properties          | Description                                                                                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`             | _(optional)_ the modal title. Displays on the very top of the content.                                                                                    |
| `trigger_variant`   | _(optional)_ the modal triggering button variant. Defaults to `secondary`.                                                                                |
| `trigger_text`      | _(optional)_ if type is set to `text`, this will be the text which triggers the modal. If set to `button` it will be the `title` attribute of the button. |
| `trigger_title`     | _(optional)_ the modal triggering button title.                                                                                                           |
| `trigger_icon`      | _(optional)_ the modal triggering button icon. Can be used instead of a `trigger_text`. Defaults to `question` .                                          |
| `trigger_hidden`    | _(optional)_ if truthy, no trigger button will be show. This can be used in combination with `open_state="opened"`.                                       |
| `trigger_disabled`  | _(optional)_ if truthy, then the trigger button can't be opened.                                                                                          |
| `modal_content`     | _(optional)_ the content which will appear when triggering the modal.                                                                                     |
| `content_id`        | _(optional)_ defines an unique identifier to a modal. Use it in case you have to refer in some way to the modal content wrapper.                          |
| `close_title`       | _(optional)_ the title of the close button. Defaults to _Close Modal Window_                                                                              |
| `hide_close_button` | _(optional)_ if truthy, the close button will now be shown                                                                                                |
| `prevent_close`     | _(optional)_ if set to `true` (boolean or string), then the user can't close the modal.                                                                   |
| `open_state`        | _(optional)_ use this prop to control the open/close state by setting either: `opened` or `closed`                                                        |
| `open_modal`        | _(optional)_ set a function to call the callback function, once the modal should open: `open_modal={(open) => open()}`                                    |
| `close_modal`       | _(optional)_ set a function to call the callback function, once the modal should close: `close_modal={(close) => close()}`                                |

| Events             | Description                                                                                                                                                                                    |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `on_open`          | _(optional)_ this event gets triggered once the modal shows up                                                                                                                                 |
| `on_close`         | _(optional)_ this event gets triggered once the modal gets closed                                                                                                                              |
| `on_close_prevent` | _(optional)_ this event gets triggered once the user tries to close the modal, but `prevent_close` is set to **true**. Returns a callback `close` You can call to trigger the close mechanism. |
