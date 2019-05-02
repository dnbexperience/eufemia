| Properties      | Description                                                                                                                             |     |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --- |
| `selected_key`  | _(optional)_ in case one of the tabs should be opened by a number                                                                       |     |
| `active_item`   | _(optional)_ in case one of the tabs should be opened by a url                                                                          |     |
| `show_numbers`  | _(optional)_ in case numbers should be shown. Defaults to true                                                                          |     |
| `align`         | _(optional)_ to align the tab list on the right side `align="right"`. Default to left                                                   |     |
| `section_style` | _(optional)_ to enable the visual helper `.dnb-section`. Use a supported modifier, like: `section_style="mint-green"`. Defaults to null |     |
| `data`          | _(mandatory)_ defines the data structure to load as a JSON. e.g. `[{title: '...', key|hash: '...'}]`                                    |     |

| Events      | Description                                                                  |
| ----------- | ---------------------------------------------------------------------------- |
| `on_change` | _(optional)_ this event gets triggered once the tab changes its selected key |
