---
component: 'Button'
class: 'dnb-button'
status: 'prototype'
version: 0.5.0
---

The button component should be used as the call-to-action in a form, or as a user interaction mechanism. Generally speaking, a button should not be used when a link would do the trick. Exceptions are made at times when it is used as a navigation element in the `action-nav` element.

| Properties      | Description                                                                                                                            |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `type`          | _(optional)_ `button`, `reset` or `submit` for the `type` HTML attribute (default to `button`) .                                       |
| `text`          | _(optional)_ the content of the button.                                                                                                |
| `title`         | _(optional)_ title of the button. Optional, but should always be included because of accessibility.                                    |
| `variant`       | _(optional)_ defines the kind of button. Possible values are `primary` or `secondary`.                                                 |
| `icon`          | _(optional)_ name of icon to be included in the button.                                                                                |
| `icon_position` | _(optional)_ position of icon inside the button. Set to `left` or `right`. Defaults to `right` if not set.                             |
| `icon_size`     | _(optional)_ define icon width and height. Defaults to 16px                                                                            |
| `disabled`      | _(optional)_ to disable/enable the button without using the `attribute` property.                                                      |
| `class`         | _(optional)_ any extra modifying class.                                                                                                |
| `attributes`    | _(optional)_ insert any other attributes. For example `disabled` or any other custom attributes.                                       |
| `href`          | _(optional)_ if you want the button to behave as a link. Use with caution! A link should normally visually be a link and not a button. |

| Events     | Description                                   |
| ---------- | --------------------------------------------- |
| `on_click` | _(optional)_ will be called on a click event. |
