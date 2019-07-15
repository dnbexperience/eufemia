---
draft: true
---

| Properties                                      | Description                                                                                                                                                                       |     |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| `selected_key`                                  | _(optional)_ in case one of the tabs should be opened by a `key`.                                                                                                                 |     |
| `active_item`                                   | _(optional)_ in case one of the tabs should be opened by a url.                                                                                                                   |     |
| `align`                                         | _(optional)_ to align the tab list on the right side `align="right"`. Default to `left`.                                                                                          |     |
| `section_style`                                 | _(optional)_ to enable the visual helper `.dnb-section` class. Use a supported modifier from the [Section component](/uilib/components/section#tab-properties). Defaults to null. |
| `section_spacing`                               | _(optional)_ to modify the `spacing`. Use a supported modifier from the [Section component](/uilib/components/section#tab-properties). Defaults to null.                          |
| `data`                                          | _(mandatory)_ defines the data structure to load as a JSON. e.g. `[{title: '...', key|hash: '...'}]`                                                                              |     |
| [Space](/uilib/components/space#tab-properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                                                             |
