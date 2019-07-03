---
draft: true
---

import { Data } from 'Pages/uilib/components/dropdown/Examples'

| Properties            | Description                                                                                                                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `data`                | _(mandatory)_ the data we want to fill the list with. Provide the data as a json string or data array structure.                      |
| `selected_item`       | _(optional)_ a number as a string or integer, defines the active item in the data array. Defaults to `null` and the `title` is shown. |
| `title`               | _(optional)_ give a title to let the user know what they has to do. Defaults to `Option Menu` .                                       |
| `icon`                | _(optional)_ name of icon to be included in the dropdown.                                                                             |
| `icon_position`       | _(optional)_ position of icon inside the dropdown. Set to `left` or `right`. Defaults to `right` if not set.                          |
| `direction`           | _(optional)_ defines the direction of how the dropdown shows the options list. Can be `bottom` or `top`. Defaults to `auto`.          |
| `scrollable`          | _(optional)_ defines if the options list should be scrollable (the `max-height` is set by default to `50vh`). Defaults to `true`.     |
| `no_scroll_animation` | _(optional)_ to disable scrolling animation. Defaults to `false`.                                                                     |
| `no_animation`        | _(optional)_ to disable appear/disappear (show/hide) animation. Defaults to `false`.                                                  |
| `max_height`          | _(optional)_ defines if the height (in `rem`) of the options list. Defaults to null, as this is set automatically by default.         |
| `status`              | _(optional)_ text with a status message. The style defaults to an error message.                                                      |
| `status_state`        | _(optional)_ defines the state of the status. Currently there are two statuses `[error, info]`. Defaults to `error`.                  |
| `label`               | _(optional)_ prepends the Form Label component. If no ID is provided, a random ID is created.                                         |

## Data structure

<Data />
