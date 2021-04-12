---
showTabs: true
---

import DrawerListProperties from 'Pages/uilib/components/fragments/drawer-list/properties'

## Properties

You may check out the [DrawerList Properties](#drawerlist-properties) down below as well as the [Data structure examples](#data-structure).

| Properties                                  | Description                                                                                                                                                                                                                                                               |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`                                      | _(optional)_ if set to `infinity`, then the pagination bar will be now shown and but infinity scrolling will do the content presentation. Defaults to `pagination`.                                                                                                       |
| `children`                                  | _(optional)_ the given content can be either a function or a React node, depending on your needs. A function contains several helper functions. More details down below and have a look at the examples in the demos section.                                             |
| `align`                                     | _(optional)_ define the aligned of the pagination button bar. Can be `center`, `left` or `right`. Defaults to `left`.                                                                                                                                                     |
| `startup_page`                              | _(optional)_ the page show in the very beginning. If `current_page` is set, then it may not make too much sense to set this as well.                                                                                                                                      |
| `current_page`                              | _(optional)_ the page show in the moment the component renders. Defaults to `1`.                                                                                                                                                                                          |
| `page_count`                                | _(optional)_ the total pages count. Defaults to `1`.                                                                                                                                                                                                                      |
| `startup_count`                             | _(optional)_ defines how many `infinity` pages should be loaded / show on the first render. Defaults to `1`.                                                                                                                                                              |
| `parallel_load_count`                       | _(optional)_ defines how many `infinity` pages should be loaded / show once the users scrolls down. Defaults to `1`.                                                                                                                                                      |
| `min_wait_time`                             | _(optional)_ the minimum time to wait, if the infinity scroll was invoked under that time threshold. This prevents not intentional infinity scroll loop calls. Defaults to `400` milliseconds.                                                                            |
| `place_maker_before_content`                | _(optional)_ if set to `true`, the infinity marker will be placed before the content (on top off). This could potentially have negative side effect. But it depends really on the content, if this would make more sense to use instead. Defaults to `false`.             |
| `use_load_button`                           | _(optional)_ if set to `true` it will disable the automated infinity scrolling, but shows a load more button at the of the content instead.                                                                                                                               |
| `hide_progress_indicator`                   | _(optional)_ if set to `true` no indicator will be shown.                                                                                                                                                                                                                 |
| `page_element`                              | _(optional)_ by default a `<div>` is used. Set it to what ever element you have to use. Adds also a class: `dnb-pagination__page` shown.                                                                                                                                  |
| `fallback_element`                          | _(optional)_ (infinity mode) is used by the _indicator_, _load more_ bar as well as by the marker. Defaults to a `div`.                                                                                                                                                   |
| `indicator_element`                         | _(optional)_ (infinity mode) is used by the _indicator_. Falls back to `fallback_element` if not defined.                                                                                                                                                                 |
| `marker_element`                            | _(optional)_ (infinity mode) is used by the internal marker. Falls back to `fallback_element` if not defined.                                                                                                                                                             |
| `set_content_handler`                       | _(optional)_ callback function to get the `setContent` handler from the current pagination instance. e.g. `set_content_handler={fn => (...)}`. Use this handler to insert content during infinity mode.                                                                   |
| `reset_content_handler`                     | _(optional)_ callback function to get the `resetContent` handler from the current pagination instance. e.g. `reset_content_handler={fn => (...)}`. Use this handler to reset all the content. You can set it to `true`, to programmatically reset the content.            |
| `reset_pagination_handler`                  | _(optional)_ callback function to get the `resetInfinity` handler from the current pagination instance. e.g. `reset_pagination_handler={fn => (...)}`. Use this handler to reset all the internal states. You can set it to `true`, to programmatically reset the states. |
| `end_infinity_handler`                      | _(optional)_ callback function to get the `endInfinity` handler from the current pagination instance. e.g. `end_infinity_handler={fn => (...)}`. Use this handler to end the infinity scrolling procedure, in case the `page_count` is unknown.                           |
| `button_title`                              | _(optional)_ The title used in every button shown in the bar. Defaults to `Side %s`.                                                                                                                                                                                      |
| `next_title`                                | _(optional)_ The title used in the next page button. Defaults to `Neste side`.                                                                                                                                                                                            |
| `prev_title`                                | _(optional)_ The title used in the previous page button. Defaults to `Forrige side`.                                                                                                                                                                                      |
| `more_pages`                                | _(optional)_ The title used in the dots. Relevant for screen-readers. Defaults to `%s flere sider`.                                                                                                                                                                       |
| `is_loading_text`                           | _(optional)_ Shown until new content is inserted in to the page. Defaults to `Laster nytt innhold`.                                                                                                                                                                       |
| `load_button_text`                          | _(optional)_ Used during infinity mode. If `use_load_button` is set to true, then a button is show on the bottom. If the `startup_page` is higher than 1, . Defaults to `Vis mer innhold`.                                                                                |
| `disabled`                                  | _(optional)_ if set to `true`, all pagination bar buttons are disabled.                                                                                                                                                                                                   |
| `skeleton`                                  | _(optional)_ if set to `true`, an overlaying skeleton with animation will be shown.                                                                                                                                                                                       |
| [Space](/uilib/components/space/properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                                                                                                                                                     |

### Content as a render prop

The content can be either a function or a React Node. A function may be more useful if `infinity` mode is used.

```jsx
<Pagination
  ...
>
  {({ pageNumber, setContent, resetContent, ...otherInternalMethods }) => <code>Page {pageNumber}</code>}
</Pagination>
```
