---
component: 'Modal'
type: 'component'
class: 'dnb-modal'
status: 'prototype'
version: 0.5.0
---

The modal can be triggered from either a text element or a button. It will open up a modal with the helping text.

#### Root Element

To make sure the HTML structure is decoupled from all the page content, You can define a kins of wrapper div like `<div class="dnb-modal-root" />`. Just place this as a sibling of Your App root HTML element.

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
