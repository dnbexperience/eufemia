---
component: 'Switch'
class: 'dnb-switch'
status: 'prototype'
version: 0.5.0
---

<!-- The switch component is an enhancement of the classic radio button. It acts like a switch. Example: On/off, yes/no.
Use mainly the toggle switch where instant user response is required. -->

#### Also known as a toggle switch or a toggle

A (toggle) switch is a digital on/off switch.
Toggle switches are best used for changing the state of system functionalities and preferences. "Toggles may replace two radio buttons or a single checkbox to allow users to choose between two opposing states." - nngroup

## How it _**should**_ work

"Toggle switches should take immediate effect and should not require the user to click Save or Submit to apply the new state. As always, we should strive to match the system to the real world."

-src: https://www.nngroup.com/articles/toggle-switch-guidelines/

### When not to use it

Don't use it if the user is required to click save or update to apply the new state.

## Good practices

"The toggle labels should describe what the control will do when the switch is on; they should not be neutral or ambiguous. When in doubt, say the label aloud and append “on/off” to the end. If it doesn’t make sense, then rewrite the label"
-src: https://www.nngroup.com/articles/toggle-switch-guidelines/

The label should describe what the toggle will do when the switch is on.

| Properties      | Description                                                                                           |
| --------------- | ----------------------------------------------------------------------------------------------------- |
| `title`         | _(mandatory)_ the `title` of the input - describing it a bit further for accessibility reasons.       |
| `id`            | _(optional)_ the `id` of the input. Default will be a random id.                                      |
| `default_state` | _(optional)_ boolean value. The state of the switch. Defaults to `false`. Set to `true` if otherwise. |
| `checked`       | _(optional)_ determine whether the switch is checked or not. Default will be `false`.                 |
| `disabled`      | _(optional)_ to disable/enable the switch.                                                            |
| `text_positive` | _(optional)_ the text for the `on` status of the switch. Default will be `Yes`.                       |
| `text_negative` | _(optional)_ the text for the `off` status of the switch. Default will be `No`.                       |
| `attributes`    | _(optional)_ insert any other attributes. For example `disabled` or any other custom attributes.      |

| Events            | Description                                                                 |
| ----------------- | --------------------------------------------------------------------------- |
| `on_change`       | _(optional)_ will be called on state changes made by the user.              |
| `on_state_update` | _(optional)_ will be called once the parameter `checked` changes its value. |
