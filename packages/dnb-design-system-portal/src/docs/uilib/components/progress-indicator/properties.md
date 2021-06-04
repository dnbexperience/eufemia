---
showTabs: true
---

## Properties

| Properties                                  | Description                                                                                                                                                                   |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`                                     | _(optional)_ if a text label is needed. Defaults to `null`.                                                                                                                   |
| `progress`                                  | _(optional)_ to visualize a static **percentage** (0-100) as a progress state. Defaults to `null`.                                                                            |
| `visible`                                   | _(optional)_ defines the visibility of the progress. Toggling the `visible` property to false will force a fade-out animation. Defaults to `true`.                            |
| `type`                                      | _(optional)_ defines the **type** of progress, like `circular` or `linear`. Defaults to `circular`.                                                                           |
| `no_animation`                              | _(optional)_ disables the fade-in and fade-out animation. Defaults to false.                                                                                                  |
| ~~`min_time`~~                              | _(optional)_ defines the minimum time the progress should be displayed. Defaults to `null`.                                                                                   |
| ~~`variant`~~                               | _(optional)_ defines the color variant, like `primary` or `secondary`. Defaults to `primary`.                                                                                 |
| `size`                                      | _(optional)_ defines the size, like `large` or `medium`. Defaults to `medium`.                                                                                                |
| `label`                                     | _(optional)_ show a custom label to the right or under the indicator.                                                                                                         |
| `label_direction`                           | _(optional)_ set it to `vertical` if you want the label to be placed under the indicator. Defaults to `horizontal`.                                                           |
| `show_label`                                | _(optional)_ if set to `true` a default label will be shown.                                                                                                                  |
| `section_style`                             | _(optional)_ to enable the visual helper `.dnb-section` class. Use a supported modifier from the [Section component](/uilib/components/section/properties). Defaults to null. |
| `section_spacing`                           | _(optional)_ to modify the `spacing`. Use a supported modifier from the [Section component](/uilib/components/section/properties). Defaults to null.                          |
| `title`                                     | _(optional)_ used to set title and aria-label. Defaults to the value of progress property, formatted as a percent.                                                            |
| [Space](/uilib/components/space/properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                                                         |
