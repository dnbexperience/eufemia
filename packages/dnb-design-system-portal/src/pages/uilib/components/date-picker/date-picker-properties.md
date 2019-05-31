---
draft: true
---

## Properties

| Properties           | Description                                                                                                                                                          |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `date`               | _(optional)_ defines the pre filled date by either a JavaScript DateInstance or (ISO 8601) like `date="2019-05-05"`.                                                 |
| `start_date`         | _(optional)_ to set the pre filled starting date. Is used if `range={true}` is set to true. Defaults to null, showing the `mask_placeholder`.                        |
| `end_date`           | _(optional)_ to set the pre filled ending date. Is used if `range={true}` is set to true. Defaults to null, showing the `mask_placeholder`.                          |
| `month`              | _(optional)_ to display what month should be shows in the first calendar by default. Defaults to the `date` respective `start_date`.                                 |
| `start_month`        | _(optional)_ to display what month should be shows in the first calendar by default. Defaults to the `date` respective `start_date`.                                 |
| `end_month`          | _(optional)_ to display what month should be shows in the second calendar by default. Defaults to the `date` respective `start_date`.                                |
| `min_date`           | _(optional)_ to limit a date range to a minimum `start_date`. Defaults to null. `start_date`.                                                                        |
| `max_date`           | _(optional)_ to limit a date range to a maximum `end_date`. Defaults to null. `start_date`.                                                                          |
| `return_format`      | _(optional)_ Defines how the returned date, as a string, should be formatted as. Defualts to `YYYY-MM-DD`.                                                           |
| `range`              | _(optional)_ if the date picker should support a range of two dates (starting and ending date). Defaults to `false`.                                                 |
| `show_input`         | _(optional)_ if the input fields with the mask should be visible. Defaults to `false`.                                                                               |
| `mask_order`         | _(optional)_ to define the order of the masked placeholder input fields. Defaults to `dd/mm/yyyy`                                                                    |
| `opened`             | _(optional)_ to open the date-picker by default. Defaults to `false`.                                                                                                |
| `mask_placeholder`   | _(optional)_ to display the placeholder on input. Defaults to `dd/mm/åååå`.                                                                                          |
| `hide_navigation`    | _(optional)_ if set to `true`, the navigation will be hidden. Defaults to `false`.                                                                                   |
| `hide_days`          | _(optional)_ if set to `true`, the week days will be hidden. Defaults to `false`.                                                                                    |
| `show_submit_button` | _(optional)_ if set to `true`, a submit button will be shown. Defaults to `false`.                                                                                   |
| `show_cancel_button` | _(optional)_ if set to `true`, a cancel button will be shown. Defaults to `false`.                                                                                   |
| `link`               | _(optional)_ link both calendars, once to user is navigating between months. Only meant to use if range is set to ture. Defaults to `false`.                         |
| `sync`               | _(optional)_ sync input values with the calendars views. Once the input values getting changed, the calendar changes its views in sync. Defaults to `true`.          |
| `first_day`          | _(optional)_ to define the first day of the week. Defaults to `monday`.                                                                                              |
| `locale`             | _(optional)_ to define the locale used in the calendar. Needs to be an `date-fns` locale object, like `import nbLocale from 'date-fns/locale/nb'`. Defaults to `nb`. |
| `label`              | _(optional)_ a prepending label in sync with the date input field.                                                                                                   |
