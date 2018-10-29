---
component: 'StepIndicator'
type: 'element'
class: 'dnb-step-indicator'
status: 'prototype'
version: 0.5.0
---

The breadcrumb component is a pagination component - not a navigation.
In this example we've sent the component an array of objects to simulate a scenario in a web application.
Previously visited pages will be clickable `anchor links` and unvisited/unlocked items are simply unclickable `spans`.
`activeItem` is the active indicator.

| Properties     | Description                                                                                  |
| -------------- | -------------------------------------------------------------------------------------------- |
| `data`         | _(mandatory)_ defines the data/steps showing up in a json format like `[{title,url}]`        |
| `active_item`  | _(mandatory)_ defines the as active marked step                                              |
| `show_numbers` | _(optional)_ define whether to show automatically counted numbers or not. Defaults to `true` |

| Data Parameters | Description                                                                                                       |
| --------------- | ----------------------------------------------------------------------------------------------------------------- |
| `title`         | _(mandatory)_ the title showing on every step                                                                     |
| `url`           | _(optional)_ sets the url, showing on every step, if not `url_future` is set                                      |
| `url_future`    | _(optional)_ sets the url, showing only on the future steps. Can be used to _reset_ the future steps individually |
| `url_passed`    | _(optional)_ sets the url, showing only on the passed steps. Can be used to _reset_ the passed steps individually |
