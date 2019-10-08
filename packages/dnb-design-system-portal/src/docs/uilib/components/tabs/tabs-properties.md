---
draft: true
---

| Properties                                      | Description                                                                                                                                                                                                             |     |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| `selected_key`                                  | _(optional)_ in case one of the tabs should be opened by a `key`.                                                                                                                                                       |     |
| `active_item`                                   | _(optional)_ in case one of the tabs should be opened by a url.                                                                                                                                                         |     |
| `align`                                         | _(optional)_ to align the tab list on the right side `align="right"`. Default to `left`.                                                                                                                                |     |
| `section_style`                                 | _(optional)_ to enable the visual helper `.dnb-section` class. Use a supported modifier from the [Section component](/uilib/components/section#tab-properties). Defaults to null.                                       |
| `section_spacing`                               | _(optional)_ to modify the `spacing`. Use a supported modifier from the [Section component](/uilib/components/section#tab-properties). Defaults to null.                                                                |
| `data`                                          | _(mandatory)_ defines the data structure to load as a JSON. e.g. `[{title: '...', content: 'Current tab current', key|hash: '...'}]`                                                                                    |     |
| `children, content`                             | _(mandatory)_ the content to render. Can be a function, returning the current tab content `(key) => ('Current tab current')`, a React Component or an object with the keys and content `{key1: 'Current tab current'}`. |
| `prevent_rerender`                              | _(optional)_ if set to `true`, the Tabs content will stay in the DOM. The visibility will be handled by using the `hidden` and `aria-hidden` HTML attributes. Defaults to `false`.                                      |     |
| [Space](/uilib/components/space#tab-properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                                                                                                   |

## Current tab current

The current Tab content can be a `string`, a function returning content or a `React component`.
