---
showTabs: true
---

## Events

| Events           | Description                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------- |
| `on_change`      | _(optional)_ will be called on a date change event. Returns an `object`. See above.                     |
| `on_type`        | _(optional)_ will be called on every input and date picker interaction. Returns an `object`. See above. |
| `on_submit`      | _(optional)_ will be called once a user presses the submit button.                                      |
| `on_cancel`      | _(optional)_ will be called once a user presses the cancel button.                                      |
| `on_reset`       | _(optional)_ will be called once a user presses the reset button.                                       |
| `on_show`        | _(optional)_ will be called once date-picker is visible.                                                |
| `on_hide`        | _(optional)_ will be called once date-picker is hidden.                                                 |
| `on_days_render` | _(optional)_ will be called right before every new calendar view gets rendered. See the example above.       |

## Returned Object

The type of native event will depend on the interaction.
All additional HTML attributes will be returned as well.

```js
{
  date: null|'like return_format', /* Gets returned if range is false */
  start_date: null|'like return_format',
  end_date: null|'like return_format',
  days_between: number,
  attributes: { attributes },
  event: null|{ native event }
}
```

### Validation during input changes

In order to validate dates during typing, you can make use of `is_valid` or `is_valid_start_date` and `is_valid_end_date`. Because the user can change a date in the input field, and the `on_type` event will then return a falsy `is_valid`.

Additional event return object properties:

```js
{
  is_valid: boolean, /* Gets returned if range is false */
  is_valid_start_date: boolean,
  is_valid_end_date: boolean,
  ...
}
```

### Min & Max date

If `min_date` or `max_date` is given, the return object also contains info about if the `start_date` or `end_date` is in between the given limits. The reason is that the user can still enter an invalid date in the input.

```js
{
  is_valid_start_date: boolean,
  is_valid_end_date: boolean,
  ...
}
```

### Manipulate the days in the calendar view

The callback event `on_days_render` gives you the possibility to manipulate the "day" object, before it gets rendered. This callback will be called many times. Both on the first render, and on every user interaction, like hover and selection, etc. This means you have to ensure a performant date calculation.

Please use [date-fns](https://date-fns.org) to make the calculations.

```jsx
import isWeekend from 'date-fns/isWeekend'

render(
  <DatePicker
    on_days_render={(days, calendarNumber = 0) => {
      return days.map((dayObject) => {
        if (isWeekend(dayObject.date)) {
          dayObject.isInactive = true
          date.className = 'dnb-date-picker__day--weekend' // custom css
        }
        return dayObject
      })
    }}
  />
)
```

The `dayObject` object contains:

```js
[
    {
      date: Date,// Vanilla JavaScript Date object
      className: // define your custom css classes
      isInactive: boolean,// shows it as disabled only
      isDisabled: boolean,// shows it as disabled and with a strikethrough
      isPreview: boolean,// date is between startDate (exclusive) and hoverDate (inclusive)
      isSelectable: boolean,// if not last and next month and not disabled – handles z-index
      isStartDate: boolean,// date selected is start date
      isEndDate: boolean,// date selected is end date
      isToday: boolean,
      isWithinSelection: boolean,// date is between selection range
      isNextMonth: boolean,// used for selection and inactive calculation
      isLastMonth: boolean,// used for selection and inactive calculation
    },
    ...
]
```
