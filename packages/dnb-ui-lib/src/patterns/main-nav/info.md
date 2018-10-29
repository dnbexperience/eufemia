---
component: 'MainNav'
type: 'element'
class: 'dnb-main-nav'
status: 'prototype'
version: 0.5.0
---

The main navigation is an element which consists of multiple components.

| Properties   | Description                                                               |
| ------------ | ------------------------------------------------------------------------- |
| `next_href`  | _(optional)_ define what url will be calle next                           |
| `prev_href`  | _(optional)_ define what url will be calle as previews                    |
| `next_text`  | _(optional)_ defines the text showing up in the previews button           |
| `prev_text`  | _(optional)_ defines the text showing up in the next button               |
| `next_title` | _(optional)_ defines the title showing up on hover in the previews button |
| `prev_title` | _(optional)_ defines the title showing up on hover in the next button     |

| Events                 | Description                                                       |
| ---------------------- | ----------------------------------------------------------------- |
| `render_left_content`  | _(optional)_ this render prop, renders content into the left nav  |
| `render_right_content` | _(optional)_ this render prop, renders content into the right nav |
