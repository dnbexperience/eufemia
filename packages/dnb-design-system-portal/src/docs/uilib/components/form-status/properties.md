---
showTabs: true
redirect_from:
  - /uilib/components/status-message/extensions
---

## Properties

| Properties                                  | Description                                                                                                                                 |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `text` or `children`                        | _(optional)_ the `text` appears as the status message. Beside plain text, You can send in a React component as well.                        |
| `title`                                     | _(optional)_ the `title` attribute in the status.                                                                                           |
| `role`                                      | _(optional)_ the `role` attribute for accessibility, defaults to `alert`                                                                    |
| `state`                                     | _(optional)_ defines the visual appearance of the status. These are the statuses `error`, `warn` and `info`. The default status is `error`. |
| `size`                                      | _(optional)_ defines the appearance size. There are these sizes `default`, `large`. The default status is `default`.                        |
| `icon`                                      | _(optional)_ the `icon` show before the status text. Defaults to `exclamation`.                                                             |
| `icon_size`                                 | _(optional)_ the icon size of the icon shows. Defaults to `medium`.                                                                         |
| `variant`                                   | _(optional)_ as of now, there is the `flat` and the `outlined` variant. Defaults to `flat`.                                                 |
| `global_status_id`                          | _(optional)_ the `status_id` used for the target [GlobalStatus](/uilib/components/global-status).                                           |
| `skeleton`                                  | _(optional)_ if set to `true`, an overlaying skeleton with animation will be shown.                                                         |
| [Space](/uilib/components/space/properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                       |
