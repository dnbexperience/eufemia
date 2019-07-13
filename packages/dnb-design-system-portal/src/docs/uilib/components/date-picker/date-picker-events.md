---
draft: true
---

## Events

| Events      | Description                                                                         |
| ----------- | ----------------------------------------------------------------------------------- |
| `on_change` | _(optional)_ will be called on a date change event. Returns an `object`. See above. |
| `on_submit` | _(optional)_ will be called once a user presses the submit button.                  |
| `on_cancel` | _(optional)_ will be called once a user presses the cancel button.                  |
| `on_show`   | _(optional)_ will be called once date-picker is visible.                            |
| `on_hide`   | _(optional)_ will be called once date-picker is hidden.                             |

## Returned Object

```js
{
  date: "return_format", /* Gets returned if range is true. Same as start_date and startDate */
  start_date: "return_format",
  end_date: "return_format",
  days_between: number
}
```
