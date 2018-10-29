---
component: 'DescriptionList'
type: 'element'
class: 'dnb-description-list'
status: 'prototype'
version: 0.5.0
---

The description list component is a simplified version of a table.
Use it when you want a crossover between a list and a table where you've got the key on the left hand side and description on the right hand side.

| Properties | Description                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------ |
| `data`     | _(mandatory)_ defines the data structure to load as a JSON. e.g. `[{title: '...',value: '...'}]` |
| `info`     | _(optional)_ shows a reference info text on the bottom                                           |

| Data Parameters | Description                                                                |
| --------------- | -------------------------------------------------------------------------- |
| `title`         | _(mandatory)_ the title that shows on the table main info field            |
| `value`         | _(mandatory)_ use this property for more info/description style of content |
