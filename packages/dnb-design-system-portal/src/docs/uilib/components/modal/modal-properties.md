---
draft: true
---

## Modal Properties

| Properties          | Description                                                                                                                                                                                                |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`             | _(optional)_ the modal title. Displays on the very top of the content.                                                                                                                                     |
| `labelled_by`       | _(optional)_ the ID of the trigger component, describing the modal content. Defaults to the internal `trigger`, so make sure You define the `trigger_title`!                                               |
| `modal_content`     | _(optional)_ the content which will appear when triggering the modal.                                                                                                                                      |
| `content_id`        | _(optional)_ defines an unique identifier to a modal. Use it in case you have to refer in some way to the modal content wrapper.                                                                           |
| `min_width`         | _(optional)_ the minimum Modal content width, defined by a CSS width value like `50vw` (50% of the viewport). Be careful on using fixed `min_width` so you don't break responsiveness. Defualts to `auto`. |
| `max_width`         | _(optional)_ the maximum Modal content width, defined by a CSS width value like `20em`. Defualts to `60rem`.                                                                                               |
| `fullscreen`        | _(optional)_ if set to `true` then the modal content will be shown as fullscreen, without showing the original content behind. Defaults to `false`.                                                        |
| `open_state`        | _(optional)_ use this prop to control the open/close state by setting either: `opened` or `closed`                                                                                                         |
| `close_title`       | _(optional)_ the title of the close button. Defaults to _Close Modal Window_                                                                                                                               |
| `hide_close_button` | _(optional)_ if truthy, the close button will now be shown                                                                                                                                                 |
| `prevent_close`     | _(optional)_ if set to `true` (boolean or string), then the user can't close the modal.                                                                                                                    |
| `open_modal`        | _(optional)_ set a function to call the callback function, once the modal should open: `open_modal={(open) => open()}`                                                                                     |
| `close_modal`       | _(optional)_ set a function to call the callback function, once the modal should close: `close_modal={(close) => close()}`                                                                                 |

## Trigger Properties

Properties targeting the trigger component (Button), but they will be set the same way as the all the other properties:

```jsx
<Modal trigger_icon="primary_icon" right="small">
  ... content ...
</Modal>
```

| Properties                                      | Description                                                                                                                                               |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `trigger_hidden`                                | _(optional)_ if truthy, no trigger button will be show. This can be used in combination with `open_state="opened"`.                                       |
| `trigger_variant`                               | _(optional)_ the modal triggering button variant. Defaults to `secondary`.                                                                                |
| `trigger_text`                                  | _(optional)_ if type is set to `text`, this will be the text which triggers the modal. If set to `button` it will be the `title` attribute of the button. |
| `trigger_title`                                 | _(optional)_ the modal triggering button title.                                                                                                           |
| `trigger_icon`                                  | _(optional)_ the modal triggering button icon. Can be used instead of a `trigger_text`. Defaults to `question` .                                          |
| `trigger_icon_position`                         | _(optional)_ defines the modal triggering icon position. Defaults to `left` because of the tertiary button variant.                                       |
| `trigger_disabled`                              | _(optional)_ if truthy, then the trigger button can't be opened.                                                                                          |
| [Space](/uilib/components/space#tab-properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                                     |
