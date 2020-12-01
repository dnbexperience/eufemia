---
showTabs: true
redirect_from:
  - /uilib/components/status-message/patterns
---

## Properties

| Properties                                  | Description                                                                                                                                 |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `text` or `children`                        | _(optional)_ the `text` appears as the status message. Beside plain text, You can send in a React component as well.                        |
| `title`                                     | _(optional)_ the `title` attribute in the status.                                                                                           |
| `state`                                     | _(optional)_ defines the visual appearance of the status. These are the statuses `error`, `warn` and `info`. The default status is `error`. |
| `size`                                      | _(optional)_ defines the appearance size. There are these sizes `defualt`, `large`. The default status is `default`.                        |
| `icon`                                      | _(optional)_ the `icon` show before the status text. Defaults to `exclamation`.                                                             |
| `icon_size`                                 | _(optional)_ the icon size of the icon shows. Defaults to `medium`.                                                                         |
| `global_status_id`                          | _(optional)_ the `status_id` used for the target [GlobalStatus](/uilib/components/global-status).                                           |
| [Space](/uilib/components/space/properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                       |
