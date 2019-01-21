| Properties     | Description                                                                                                      |     |
| -------------- | ---------------------------------------------------------------------------------------------------------------- | --- |
| `selected_key` | _(optional)_ in case one of the Tabs should be opened by default                                                 |     |
| `label`        | _(optional)_ for accessibility reason, we can decorate our tablist with a title                                  |     |
| `align`        | _(optional)_ define the align placement. Defaults to left.                                                       |     |
| `use_hash`     | _(optional)_ enable adding a hash to the url (on tab changes), so the tab will be remembered. Defaults to false. |     |
| `data`         | _(mandatory)_ defines the data structure to load as a JSON. e.g. `[{title: '...', key|hash: '...'}]`             |     |

| Events      | Description                                                                   |
| ----------- | ----------------------------------------------------------------------------- |
| `on_change` | _(optional)_ this event gets triggered once the tabs changes its selected key |
