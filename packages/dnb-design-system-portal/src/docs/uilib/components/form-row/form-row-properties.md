---
draft: true
---

| Properties                                      | Description                                                                                                                                                                                          |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`                                         | _(optional)_ use either the `label` property or provide custom one.                                                                                                                                  |
| `label_direction`                               | _(optional)_ use `label_direction="vertical"` to change the label/legend layout direction. Defaults to `horizontal`.                                                                                 |
| `direction`                                     | _(optional)_ to define the layout direction on how the next component should be placed on. Can be either `vertical` or `horizontal`. Defaults to `horizontal`.                                       |
| `vertical`                                      | _(optional)_ will force both `direction` and `label_diretion` to be **vertical** if set to `true`.                                                                                                   |
| `indent`                                        | _(optional)_ indents the **FormLabel** (`.dnb-form-label`) left it `direction` is `horizontal`. ~~Use `small`, `medium` and `large`~~. Defaults to `false`. If set to `true`, then `medium` is used. |
| `section_style`                                 | _(optional)_ to enable the visual helper `.dnb-section` class. Use a supported modifier from the [Section component](/uilib/components/section#tab-properties). Defaults to null.                    |
| `section_spacing`                               | _(optional)_ to modify the `spacing`. Use a supported modifier from the [Section component](/uilib/components/section#tab-properties). Defaults to null.                                             |
| `no_fieldset`                                   | _(optional)_ if set to `true`, then the internal `legend` will be a `label` instead, and no `fieldset` is used. Defaults to `false`.                                                                 |
| [Space](/uilib/components/space#tab-properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                                                                                |
