| Properties     | Description                                                                                  |
| -------------- | -------------------------------------------------------------------------------------------- |
| `data`         | _(mandatory)_ defines the data/steps showing up in a JSON format like `[{title,url}]`        |
| `active_item`  | _(mandatory)_ defines the active number marked step                                          |
| `active_url`   | _(mandatory)_ defines the active url marked step                                             |
| `show_numbers` | _(optional)_ define whether to show automatically counted numbers or not. Defaults to `true` |

| Data Parameters | Description                                                                                                       |
| --------------- | ----------------------------------------------------------------------------------------------------------------- |
| `title`         | _(mandatory)_ the title showing on every step                                                                     |
| `url`           | _(optional)_ sets the url, showing on every step, if not `url_future` is set                                      |
| `url_future`    | _(optional)_ sets the url, showing only on the future steps. Can be used to _reset_ the future steps individually |
| `url_passed`    | _(optional)_ sets the url, showing only on the passed steps. Can be used to _reset_ the passed steps individually |
