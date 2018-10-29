---
component: 'Tabs'
type: 'component'
class: 'dnb-tabs'
status: 'prototype'
version: 0.5.0
---

Tabs are a list buttons to show variation of different content, quickly. The content is available on the page so the user can access it fast as possible.

| Properties     | Description                                                                                     |
| -------------- | ----------------------------------------------------------------------------------------------- |
| `selected_key` | _(optional)_ in case one of the Tabs should be opened by default                                |
| `data`         | _(mandatory)_ defines the data structure to load as a JSON. e.g. `[{title: '...', key: '...'}]` |  |

| Events      | Description                                                                   |
| ----------- | ----------------------------------------------------------------------------- |
| `on_change` | _(optional)_ this event gets triggered once the tabs changes its selected key |
