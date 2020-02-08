---
showTabs: true
---

## Properties

| Properties                                  | Description                                                                                                                            |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `type`                                      | _(optional)_ `button`, `reset` or `submit` for the `type` HTML attribute (default to `button`) .                                       |
| `text, children`                            | _(optional)_ the content of the button. `children` are treated as `text` as long as the typeof is a string.                            |
| `title`                                     | _(optional)_ title of the button. Optional, but should always be included because of accessibility.                                    |
| `variant`                                   | _(optional)_ defines the kind of button. Possible values are `primary`, `secondary`, `tertiary` and `signal`.                          |
| `size`                                      | _(optional)_ the size of the button. For now there is **medium**, **default** and **large**.                                           |
| `icon`                                      | _(optional)_ name of icon to be included in the button.                                                                                |
| `icon_position`                             | _(optional)_ position of icon inside the button. Set to `left` or `right`. Defaults to `right` if not set.                             |
| `icon_size`                                 | _(optional)_ define icon width and height. Defaults to 16px                                                                            |
| `class`                                     | _(optional)_ any extra modifying class.                                                                                                |
| `href`                                      | _(optional)_ if you want the button to behave as a link. Use with caution! A link should normally visually be a link and not a button. |
| `status`                                    | _(optional)_ set it to either `status="error"` or a text with a status message. The style defaults to an error message.                |
| `status_state`                              | _(optional)_ defines the state of the status. Currently there are two statuses `[error, info]`. Defaults to `error`.                   |
| `global_status_id`                          | _(optional)_ the `status_id` used for the target [GlobalStatus](/uilib/components/global-status).                                      |
| [Space](/uilib/components/space/properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                  |
