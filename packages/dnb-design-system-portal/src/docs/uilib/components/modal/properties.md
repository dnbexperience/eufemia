---
showTabs: true
---

## Modal Properties

| Properties               | Description                                                                                                                                                                                                                                  |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                     | _(optional)_ the id used internal in the modal root element. Defaults to `root`, so the element id will be `dnb-modal-root`.                                                                                                                 |
| `title`                  | _(optional)_ the modal title. Displays on the very top of the content.                                                                                                                                                                       |
| `mode`                   | _(optional)_ the modal mode. Can be set to `drawer`. Defaults to `modal`.                                                                                                                                                                    |
| `labelled_by`            | _(optional)_ the ID of the trigger component, describing the modal content. Defaults to the internal `trigger`, so make sure You define the `trigger_title`.                                                                                 |
| `modal_content`          | _(optional)_ the content which will appear when triggering the modal.                                                                                                                                                                        |
| `content_id`             | _(optional)_ defines an unique identifier to a modal. Use it in case you have to refer in some way to the modal content wrapper.                                                                                                             |
| `min_width`              | _(optional)_ the minimum Modal content width, defined by a CSS width value like `50vw` (50% of the viewport). Be careful on using fixed `min_width` so you don't break responsiveness. Defaults to `30rem` (average width is set to `60vw`). |
| `max_width`              | _(optional)_ the maximum Modal content width, defined by a CSS width value like `20rem`. Defaults to `60rem` (average width is set to `60vw`).                                                                                               |
| `fullscreen`             | _(optional)_ if set to `true` then the modal content will be shown as fullscreen, without showing the original content behind. Can be set to `false` to omit the auto fullscreen. Defaults to `auto`.                                        |
| `spacing`                | _(optional)_ if set to `false` then the modal content will be shown without any spacing. Defaults to `true`.                                                                                                                                 |
| `align_content`          | _(optional)_ Define the inner horizontal alignment of the content. Can be set to `left`, `center`, `right` and `centered`. If `centered`, then the content will also be centered vertically. Defaults to `left`.                             |
| `container_placement`    | _(optional)_ For `drawer` mode only. Defines the placement on what side the Drawer should be opened. Can be set to `left`, `right`, `top` and `bottom`. Defaults to `right`.                                                                 |
| `open_state`             | _(optional)_ use this prop to control the open/close state by setting either: `opened` or `closed`                                                                                                                                           |
| `open_delay`             | _(optional)_ forces the modal to delay the opening. The delay is given in `ms`.                                                                                                                                                              |
| `close_title`            | _(optional)_ the title of the close button. Defaults to _Close Modal Window_.                                                                                                                                                                |
| `hide_close_button`      | _(optional)_ if truthy, the close button will now be shown.                                                                                                                                                                                  |
| `no_animation`           | _(optional)_ if set to `true`, no open/close animation will be shown. Defaults to false.                                                                                                                                                     |
| `no_animation_on_mobile` | _(optional)_ same as `no_animation`, but gets triggered only if the viewport width is less than `40em`. Defaults to false.                                                                                                                   |
| `prevent_close`          | _(optional)_ if set to `true` (boolean or string), then the user can't close the modal.                                                                                                                                                      |
| `prevent_core_style`     | _(optional)_ by default the modal content gets added the core style class `dnb-core-style`. Use `false` to disable this behavior.                                                                                                            |
| `open_modal`             | _(optional)_ set a function to call the callback function, once the modal should open: `open_modal={(open) => open()}`                                                                                                                       |
| `close_modal`            | _(optional)_ set a function to call the callback function, once the modal should close: `close_modal={(close) => close()}`                                                                                                                   |
| `overlay_class`          | _(optional)_ give the page overlay a custom class name (maps to `dnb-modal__overlay`).                                                                                                                                                       |
| `content_class`          | _(optional)_ give the content wrapper a custom class name (maps to `dnb-modal__content`).                                                                                                                                                    |
| `class` or `className`   | _(optional)_ give the inner content wrapper a class name (maps to `dnb-modal__content__inner`).                                                                                                                                              |

### Drawer sizes

The Drawer is responsive with the following properties:

```css
--modal-drawer-width: 40vw;
--modal-drawer-min-width: 25rem;
--modal-drawer-max-width: 40rem;
```

## Trigger Properties

Properties targeting the trigger component (Button), but they will be set the same way as the all the other properties:

```jsx
<Modal trigger_icon="primary_icon" right="small">
  ... content ...
</Modal>
```

| Properties                                  | Description                                                                                                                                               |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `trigger_props`                             | _(optional)_ send along custom properties to the trigger button `trigger_props={{'aria-label': 'My Label'}}`.                                             |
| `trigger_hidden`                            | _(optional)_ if truthy, no trigger button will be show. This can be used in combination with `open_state="opened"`.                                       |
| `trigger_variant`                           | _(optional)_ the modal triggering button variant. Defaults to `secondary`.                                                                                |
| `trigger_text`                              | _(optional)_ if type is set to `text`, this will be the text which triggers the modal. If set to `button` it will be the `title` attribute of the button. |
| `trigger_title`                             | _(optional)_ the modal triggering button title.                                                                                                           |
| `trigger_icon`                              | _(optional)_ the modal triggering button icon. Can be used instead of a `trigger_text`. Defaults to `question`.                                           |
| `trigger_icon_position`                     | _(optional)_ defines the modal triggering icon position. Defaults to `left` because of the tertiary button variant.                                       |
| `trigger_class`                             | _(optional)_ adds a custom modal trigger class name.                                                                                                      |
| `trigger_disabled`                          | _(optional)_ if truthy, then the trigger button can't be opened.                                                                                          |
| [Space](/uilib/components/space/properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                                     |
