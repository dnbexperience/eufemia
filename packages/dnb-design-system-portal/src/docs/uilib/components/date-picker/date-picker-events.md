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

The type of native event will depend on the interaction.
All additional HTML attributes will be returned as well.

```js
{
  date: null|"return_format", /* Gets returned if range is true */
  start_date: null|"return_format",
  end_date: null|"return_format",
  days_between: number,
  attributes: { attributes },
  event: null|{ native event }
}
```

### Min & Max date

If `min_date` or `max_date` is given, the return object also contains info about if the `start_date` or `end_date` is valid. The reason is because the user can still enter an invalid date in the input.

```js
{
  is_valid_start_date: boolean,
  is_valid_end_date: boolean,
  ...
}
```
