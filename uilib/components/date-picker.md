---
title: 'DatePicker'
description: 'The DatePicker component should be used whenever the user is to enter a single date or a date period.'
metadata: https://eufemia.dnb.no/uilib/components/date-picker/metadata.json
---

## Import

```tsx
import { DatePicker } from '@dnb/eufemia'
```

## Description

The DatePicker component should be used whenever the user is to enter a single date or a date range/period with a start and end date.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=4243-1497)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/date-picker)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/date-picker)

### Date Object

The DatePicker operates with a default JavaScript Date instance as well as a string (ISO 8601) like `date="2019-05-05"` (yyyy-MM-dd).

### Handling time zones

The DatePicker component has no built-in time zone support because it only deals with dates (not time).

Ensure you do not create Date objects with time information (`new Date()`), as that will introduce time zone issues.

If you need to use a `Date` object but want the same date everywhere, regardless of runtime timezone, you have to normalize it first.

Use an ISO string with an explicit offset:

```js
const isoDate = '2025-01-01T00:00:00Z'
```

Or use UTC constructors:

```js
const utcDate = new Date(Date.UTC(2025, 0, 1))
```

### Root Element (React Portal)

The DatePicker component uses [PortalRoot](/uilib/components/portal-root) internally to render its calendar. See the [PortalRoot documentation](/uilib/components/portal-root) for information on how to control where the portal content appears in the DOM.

### Manipulate the days in the calendar view

The callback event `on_days_render` gives you the possibility to manipulate the "day" object before it gets rendered. This callback will be called many times, both on the first render and on every user interaction, like hover and selection. This means you have to ensure a performant date calculation.

Please use [date-fns](https://date-fns.org) to make the calculations.

<VisibleWhenNotVisualTest>
  
```tsx
render(
  <DatePicker
    onDaysRender={(days, calendarNumber = 0) => {
      return days.map((dayObject) => {
        if (isWeekend(dayObject.date)) {
          dayObject.isInactive = true
          dayObject.className = 'dnb-date-picker__day--weekend' // custom css
        }
        return dayObject
      })
    }}
  />,
)
```

</VisibleWhenNotVisualTest>

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

#### Highlighting "today"

By default, the DatePicker highlights the "today" date based on the user's local time zone.

If you need to treat another time zone as "today", mutate the `dayObject.isToday` flag inside the `on_days_render` callback. The example below demonstrates how to compare every day against `getOsloDate()` and keep the highlight in sync with Oslo time.

<VisibleWhenNotVisualTest>
  
```tsx
const osloDate = getOsloDate()
render(
  <DatePicker
    onDaysRender={(days) => {
      return days.map((dayObject) => {
        dayObject.isToday = isSameDay(dayObject.date, osloDate)
        return dayObject
      })
    }}
  />,
)
```

</VisibleWhenNotVisualTest>

Here is how to import the required helper:

```tsx
import { isSameDay } from 'date-fns'
import { DatePicker } from '@dnb/eufemia'
import { getOsloDate } from '@dnb/eufemia/components/date-format/DateFormatUtils'
```

### Validation for `minDate`, `maxDate`, and invalid dates

`Field.Date` has [built-in validation](https://eufemia.dnb.no/uilib/extensions/forms/feature-fields/Date/#date-limit-validation]) for `minDate`, `maxDate`, and invalid dates. This is the preferred method of handling scenarios where the user has typed in an invalid date or a date outside of the set date limits. Automatically changing the user input, on the other hand, leads to worse UX and confusion, as the user might not understand why the date is changed for seemingly no reason. So it's best practice to tell the user what is wrong and let them correct it.

### Min & Max date

If `min_date` or `max_date` is given, the return object also contains information about whether the `start_date` or `end_date` is within the given limits. The reason is that the user can still enter an invalid date in the input.

```js
{
  is_valid_start_date: boolean,
  is_valid_end_date: boolean,
  ...
}
```

### Validation during input changes

In order to validate dates during typing, you can make use of `is_valid` or `is_valid_start_date` and `is_valid_end_date`. Because the user can change a date in the input field, and the `on_type` event will then return a falsy `is_valid`.

Additional event return object properties:

```js
{
  is_valid: boolean, /* Available if `range` is `false` */
  is_valid_start_date: boolean, /* Available if `range` is `true` */
  is_valid_end_date: boolean, /* Available if `range` is `true` */
}
```

## Demos

<ChangeLocale
  bottom
  label="Locale used in the demos:"
  listUSLocale={true}
/>

English (US) is not included in Eufemia by default. You can include it like:

```jsx
import enUS from '@dnb/eufemia/shared/locales/en-US'
<EufemiaProvider locale={enUS} ...>
	App
</EufemiaProvider>
```

### Range DatePicker

<VisibleWhenNotVisualTest>
  
```tsx
render(
  <DatePicker
    label="DatePicker"
    startDate="2019-04-01"
    endDate="2019-05-17"
    range
    showInput
    onChange={({ start_date, end_date }) => {
      console.log('onChange', start_date, end_date)
    }}
    onSubmit={({ start_date, end_date }) => {
      console.log('onSubmit', start_date, end_date)
    }}
    onCancel={({ start_date, end_date }) => {
      console.log('onCancel', start_date, end_date)
    }}
    onBlur={({
      start_date,
      end_date,
      partialStartDate,
      partialEndDate,
    }) => {
      console.log('onBlurPartial', partialStartDate, partialEndDate)
      console.log('onBlurComplete', start_date, end_date)
    }}
    shortcuts={[
      {
        title: 'Set date period',
        start_date: '1969-07-15',
        end_date: '1969-08-15',
      },
      {
        title: 'Today',
        start_date: new Date(),
      },
      {
        title: 'This week',
        start_date: startOfWeek(new Date()),
        end_date: lastDayOfWeek(new Date()),
      },
      {
        close_on_select: true,
        title: 'This month',
        start_date: startOfMonth(new Date()),
        end_date: lastDayOfMonth(new Date()),
      },
      {
        title: 'Relative +3 days',
        start_date: ({ start_date }) => start_date || new Date(),
        end_date: ({ end_date }) => addDays(end_date || new Date(), 3),
      },
    ]}
  />,
)
```

</VisibleWhenNotVisualTest>

### Default DatePicker

```tsx
render(
  <DatePicker
    label="DatePicker"
    date="2019-05-05"
    returnFormat="dd-MM-yyyy"
    onChange={({ date }) => {
      console.log('onChange', date)
    }}
    onShow={({ date }) => {
      console.log('onShow', date)
    }}
    onBlur={({ start_date, end_date }) => {
      console.log('onBlur', start_date, end_date)
    }}
  />,
)
```

### Default DatePicker with Input

<VisibleWhenNotVisualTest>
  
```tsx
render(
  <DatePicker
    label="DatePicker"
    date={new Date()}
    showInput
    showCancelButton
    showResetButton
    onChange={({ date }) => {
      console.log('onChange', date)
    }}
    onCancel={({ date }) => {
      console.log('onCancel', date)
    }}
    onBlur={({ date }) => {
      console.log('onBlur', date)
    }}
  />,
)
```

</VisibleWhenNotVisualTest>

### Hidden Nav:

<VisibleWhenNotVisualTest>
  
```tsx
render(
  <DatePicker
    label="DatePicker"
    date="2022/05/05"
    minDate="2022/05/01"
    maxDate="2022/05/17"
    dateFormat="yyyy/MM/dd"
    returnFormat="dd/MM/yyyy"
    hideNavigation
    hideDays
    onChange={({ date }) => {
      console.log('onChange', date)
    }}
    onHide={({ date }) => {
      console.log('onHide', date)
    }}
    onBlur={({ date }) => {
      console.log('onBlur', date)
    }}
  />,
)
```

</VisibleWhenNotVisualTest>

### Show days in a specific month

<VisibleWhenNotVisualTest>
  
```tsx
render(
  <DatePicker
    label="DatePicker"
    date="05/02/2019"
    dateFormat="MM/dd/yyyy"
    onlyMonth
  />,
)
```

</VisibleWhenNotVisualTest>

### With info message

<VisibleWhenNotVisualTest>
  
```tsx
render(
  <DatePicker
    label="DatePicker"
    date={new Date()}
    showInput
    status="Please select a valid date"
    statusState="info"
  />,
)
```

</VisibleWhenNotVisualTest>

### With suffix

<VisibleWhenNotVisualTest>
  
```tsx
render(
  <DatePicker
    label="DatePicker"
    date={new Date()}
    showInput
    suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
  />,
)
```

</VisibleWhenNotVisualTest>

### Linked DatePickers

```tsx
render(<DatePicker label="DatePicker" range link showInput />)
```

### Year navigation

```tsx
render(<DatePicker showInput yearNavigation />)
```

### DatePicker with error status (no input)

```tsx
render(
  <DatePicker
    label="DatePicker"
    date="2019-05-05"
    hideNavigation
    status="Please select a valid date"
  />,
)
```

### DatePicker with error

```tsx
render(
  <DatePicker
    label="DatePicker"
    date="2019-05-05"
    showInput
    showSubmitButton
    status={
      <span>
        Status message with <b>HTML</b> inside
      </span>
    }
  />,
)
```

### DatePicker with error status

```tsx
render(
  <DatePicker
    label="DatePicker"
    date={new Date()}
    hideNavigation
    status="error"
  />,
)
```

### Inline DatePicker

```tsx
render(
  <DatePicker inline range startDate="2019-05-05" endDate="2019-06-05" />,
)
```
