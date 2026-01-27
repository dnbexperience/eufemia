---
title: 'DatePicker'
description: 'The DatePicker component should be used whenever the user is to enter a single date or a date period.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:26.690Z
checksum: c3e47755867381a7ff26debf4e3ef67c6fb5bc06acf6c08868731cbe12d78af7
---

# DatePicker

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
  />
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
  />
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
  />
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
  />
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
  />
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
  />
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
  />
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
  />
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
  />
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
  />
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
  />
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
  />
)
```

### Inline DatePicker

```tsx
render(
  <DatePicker inline range startDate="2019-05-05" endDate="2019-06-05" />
)
```

## Properties

```json
{
  "props": {
    "date": {
      "doc": "Defines the pre-filled date by either a JavaScript DateInstance or (ISO 8601) like `date=\"2019-05-05\"` and `content`.",
      "type": ["string", "Date"],
      "status": "optional"
    },
    "startDate": {
      "doc": "To set the pre-filled starting date. Is used if `range={true}` is set to `true`. Defaults to `null`, showing the `maskPlaceholder`.",
      "type": ["string", "Date"],
      "status": "optional"
    },
    "endDate": {
      "doc": "To set the pre-filled ending date. Is used if `range={true}` is set to `true`. Defaults to `null`, showing the `maskPlaceholder`.",
      "type": ["string", "Date"],
      "status": "optional"
    },
    "month": {
      "doc": "To display what month should be shown in the first calendar by default. Defaults to the `date` respective `startDate`.",
      "type": ["string", "Date"],
      "status": "optional"
    },
    "startMonth": {
      "doc": "To display what month should be shown in the first calendar by default. Defaults to the `date` respective `startDate`.",
      "type": ["string", "Date"],
      "status": "optional"
    },
    "endMonth": {
      "doc": "To display what month should be shown in the second calendar by default. Defaults to the `date` respective `startDate`.",
      "type": ["string", "Date"],
      "status": "optional"
    },
    "minDate": {
      "doc": "To limit a date range to a minimum `startDate`. Defaults to `null`.",
      "type": ["string", "Date"],
      "status": "optional"
    },
    "maxDate": {
      "doc": "To limit a date range to a maximum `endDate`. Defaults to `null`.",
      "type": ["string", "Date"],
      "status": "optional"
    },
    "dateFormat": {
      "doc": "Defines how the property dates (`date`, `startDate` and `endDate`) should be parsed, e.g. `yyyy/MM/dd`. Defaults to `yyyy-MM-dd`.",
      "type": "string",
      "status": "optional"
    },
    "returnFormat": {
      "doc": "Defines how the returned date, as a string, should be formatted as. Defaults to `yyyy-MM-dd`.",
      "type": "string",
      "status": "optional"
    },
    "range": {
      "doc": "Defines if the date picker should support a range of two dates (starting and ending date).Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "showInput": {
      "doc": "If the input fields with the mask should be visible. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "inline": {
      "doc": "If set to `true`, renders the calendar inline without a button or input. The calendar is always visible and not wrapped in a Popover. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "maskOrder": {
      "doc": "To define the order of the masked placeholder input fields. Defaults to `dd/mm/yyyy`.",
      "type": "string",
      "status": "optional"
    },
    "opened": {
      "doc": "To open the date-picker by default. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "maskPlaceholder": {
      "doc": "To display the placeholder on input. Defaults to `dd/mm/åååå`.",
      "type": "string",
      "status": "optional"
    },
    "hideNavigation": {
      "doc": "If set to `true`, the navigation will be hidden. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "hideDays": {
      "doc": "If set to `true`, the week days will be hidden. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "showSubmitButton": {
      "doc": "If set to `true`, a submit button will be shown. You can change the default text by using `submitButtonText=\"Ok\"`. Defaults to `false`. If the `range` property is `true`, then the submit button is shown.",
      "type": "boolean",
      "status": "optional"
    },
    "showCancelButton": {
      "doc": "If set to `true`, a cancel button will be shown. You can change the default text by using `cancelButtonText=\"Avbryt\"`. If the `range` property is `true`, then the cancel button is shown. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "showResetButton": {
      "doc": "If set to `true`, a reset button will be shown. You can change the default text by using `resetButtonText=\"Tilbakestill\"`. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "link": {
      "doc": "Link both calendars, once to the user is navigating between months. Only meant to use if the range is set to `true`. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "sync": {
      "doc": "Sync input values with the calendars views. Once the input values get changed, the calendar changes its views in sync. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "firstDay": {
      "doc": "To define the first day of the week. Defaults to `monday`.",
      "type": [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday"
      ],
      "status": "optional"
    },
    "alignPicker": {
      "doc": "Use `right` to change the preferred calendar alignment direction. Defaults to `left`. If the DatePicker is close to the edge of the screen, the alignment of the calendar will change automatically to fit in the viewport.",
      "type": "string",
      "status": "optional"
    },
    "skipPortal": {
      "doc": "If set to `true`, the calendar will not be rendered inside a react portal. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "yearNavigation": {
      "doc": "Will enable year navigation in the calendar if set to `true`. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "labelAlignment": {
      "doc": "Sets the alignment of the label. Defaults to `left`.",
      "type": ["left", "right"],
      "status": "optional"
    },
    "onlyMonth": {
      "doc": "Use `true` to only show the defined month. Disables the month navigation possibility. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "hideLastWeek": {
      "doc": "Use `true` to only show the last week in the current month if it needs to be shown. The result is that there will mainly be shows five (5) weeks (rows) instead of six (6). Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "stretch": {
      "doc": "If set to `true`, then the date-picker input field will be 100% in `width`.",
      "type": "boolean",
      "status": "optional"
    },
    "label": {
      "doc": "A prepending label in sync with the date input field.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "labelDirection": {
      "doc": " Use `label_direction=\"vertical\"` to change the label layout direction. Defaults to `horizontal`.",
      "type": ["vertical", "horizontal"],
      "status": "optional"
    },
    "suffix": {
      "doc": "Text describing the content of the DatePicker more than the label. You can also send in a React component, so it gets wrapped inside the DatePicker component.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "labelSrOnly": {
      "doc": "Use `true` to make the label only readable by screen readers.",
      "type": "boolean",
      "status": "optional"
    },
    "shortcuts": {
      "doc": "Gives you the possibility to set predefined dates and date ranges so the user can select these by one click. Define either a JSON or an object with the defined shortcuts. More info is below.",
      "type": "object",
      "status": "optional"
    },
    "addonElement": {
      "doc": "Gives you the possibility to inject a React element showing up over the footer. Use it to customize `shortcuts`.",
      "type": "object",
      "status": "optional"
    },
    "inputElement": {
      "doc": "Gives you the possibility to use a plain/vanilla `<input />` HTML element by defining it as a string `inputElement=\"input\"`, a React element, or a render function `inputElement={(internalProps) => (<Return />)}`. Can also be used in circumstances where the `react-text-mask` should not be used, e.g. in testing environments. Defaults to custom masked input.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "status": {
      "doc": "Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.",
      "type": ["error", "info", "boolean"],
      "status": "optional"
    },
    "statusState": {
      "doc": "Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.",
      "type": "string",
      "status": "optional"
    },
    "statusProps": {
      "doc": "Use an object to define additional FormStatus properties.",
      "type": "object",
      "status": "optional"
    },
    "disableAutofocus": {
      "doc": "Once the date picker gets opened, there is a focus handling to ensure good accessibility. This can be disabled with this property. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "globalStatus": {
      "doc": "The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).",
      "type": "object",
      "status": "optional"
    },
    "tooltip": {
      "doc": "Provide a short Tooltip content that shows up on the picker button.",
      "type": "string",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
      "type": "boolean",
      "status": "optional"
    },
    "size": {
      "doc": "The sizes you can choose is `small` (1.5rem), `default` (2rem), `medium` (2.5rem) and `large` (3rem) are supported component sizes. Defaults to `default` / `null`.",
      "type": "string",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "DatePicker.cancelButtonText": {
      "nb-NO": "Avbryt",
      "en-GB": "Cancel",
      "sv-SE": "Stäng",
      "da-DK": "Annuller"
    },
    "DatePicker.dateFormat": {
      "nb-NO": "yyyy-MM-dd",
      "en-GB": "yyyy-MM-dd",
      "sv-SE": "yyyy-MM-dd",
      "da-DK": "yyyy-MM-dd"
    },
    "DatePicker.day": {
      "nb-NO": "dag",
      "en-GB": "Day",
      "sv-SE": "dag",
      "da-DK": "dag"
    },
    "DatePicker.end": {
      "nb-NO": "til",
      "en-GB": "to",
      "sv-SE": "till",
      "da-DK": "til"
    },
    "DatePicker.firstDay": {
      "nb-NO": "monday",
      "en-GB": "monday",
      "sv-SE": "monday",
      "da-DK": "monday"
    },
    "DatePicker.maskOrder": {
      "nb-NO": "dd/mm/yyyy",
      "en-GB": "dd/mm/yyyy",
      "sv-SE": "yyyy/mm/dd",
      "da-DK": "dd/mm/yyyy"
    },
    "DatePicker.maskPlaceholder": {
      "nb-NO": "dd.mm.åååå",
      "en-GB": "dd/mm/yyyy",
      "sv-SE": "åååå.mm.dd",
      "da-DK": "dd.mm.åååå"
    },
    "DatePicker.month": {
      "nb-NO": "måned",
      "en-GB": "Month",
      "sv-SE": "månad",
      "da-DK": "måned"
    },
    "DatePicker.nextMonth": {
      "nb-NO": "Neste måned %s",
      "en-GB": "Next month %s",
      "sv-SE": "Nästa månad %s",
      "da-DK": "Næste måned %s"
    },
    "DatePicker.nextYear": {
      "nb-NO": "Neste år %s",
      "en-GB": "Next year %s",
      "sv-SE": "Nästa år %s",
      "da-DK": "Næste år %s"
    },
    "DatePicker.openPickerText": {
      "nb-NO": "Åpne datovelger",
      "en-GB": "Open date picker",
      "sv-SE": "Öppna datumväljaren",
      "da-DK": "Åbn datovælger"
    },
    "DatePicker.placeholderCharacters.day": {
      "nb-NO": "d",
      "en-GB": "d",
      "sv-SE": "d",
      "da-DK": "d"
    },
    "DatePicker.placeholderCharacters.month": {
      "nb-NO": "m",
      "en-GB": "m",
      "sv-SE": "m",
      "da-DK": "m"
    },
    "DatePicker.placeholderCharacters.year": {
      "nb-NO": "å",
      "en-GB": "y",
      "sv-SE": "å",
      "da-DK": "å"
    },
    "DatePicker.prevMonth": {
      "nb-NO": "Forrige måned %s",
      "en-GB": "Previous month %s",
      "sv-SE": "Förra månaden %s",
      "da-DK": "Forrige måned %s"
    },
    "DatePicker.prevYear": {
      "nb-NO": "Forrige år %s",
      "en-GB": "Previous year %s",
      "sv-SE": "Förra året %s",
      "da-DK": "Forrige år %s"
    },
    "DatePicker.resetButtonText": {
      "nb-NO": "Tilbakestill",
      "en-GB": "Reset",
      "sv-SE": "Återställ",
      "da-DK": "Gendan"
    },
    "DatePicker.returnFormat": {
      "nb-NO": "yyyy-MM-dd",
      "en-GB": "yyyy-MM-dd",
      "sv-SE": "yyyy-MM-dd",
      "da-DK": "yyyy-MM-dd"
    },
    "DatePicker.selectedDate": {
      "nb-NO": "Valgt dato: %s",
      "en-GB": "Selected date: %s",
      "sv-SE": "Valt datum: %s",
      "da-DK": "Valgt dato: %s"
    },
    "DatePicker.selectedDateRange": {
      "nb-NO": "Valgte datoer: %s",
      "en-GB": "Selected dates: %s",
      "sv-SE": "Valda datum: %s",
      "da-DK": "Valgte datoer: %s"
    },
    "DatePicker.selectedMonth": {
      "nb-NO": "Valgt måned %s",
      "en-GB": "Selected month %s",
      "sv-SE": "Vald månad %s",
      "da-DK": "Valgt måned %s"
    },
    "DatePicker.selectedYear": {
      "nb-NO": "Valgt år %s",
      "en-GB": "Selected year %s",
      "sv-SE": "Valt år %s",
      "da-DK": "Valgt år %s"
    },
    "DatePicker.start": {
      "nb-NO": "fra",
      "en-GB": "from",
      "sv-SE": "från",
      "da-DK": "fra"
    },
    "DatePicker.submitButtonText": {
      "nb-NO": "Ok",
      "en-GB": "OK",
      "sv-SE": "Okej",
      "da-DK": "Ok"
    },
    "DatePicker.year": {
      "nb-NO": "år",
      "en-GB": "Year",
      "sv-SE": "år",
      "da-DK": "år"
    }
  }
}
```

## Shortcuts

You may use [date-fns](https://date-fns.org) to make date calculations.

<VisibleWhenNotVisualTest>
  
```tsx
render(
  <DatePicker
    shortcuts={[
      {
        title: 'Set date',
        date: '1969-07-15',
      },
      {
        title: 'Relative +3 days',
        date: ({ date }) => date && addDays(date, 3),
      },
    ]}
  />
)
```

</VisibleWhenNotVisualTest>

With range enabled.

<VisibleWhenNotVisualTest>
  
```tsx
render(
  <DatePicker
    shortcuts={[
      {
        title: 'Set date period',
        start_date: '1969-07-15',
        end_date: '1969-07-15',
        close_on_select: true, // will close the picker
      },
      {
        title: 'This month',
        start_date: startOfMonth(new Date()),
        end_date: lastDayOfMonth(new Date()),
      },
    ]}
  />
)
```

</VisibleWhenNotVisualTest>

## Events

```json
{
  "props": {
    "onChange": {
      "doc": "Will be called on a date change event. Returns an object. See Returned Object below.",
      "type": "function",
      "status": "optional"
    },
    "onType": {
      "doc": "Will be called on every input and date picker interaction. Returns an `object`. See Returned Object below.",
      "type": "function",
      "status": "optional"
    },
    "onSubmit": {
      "doc": "Will be called once a user presses the submit button.",
      "type": "function",
      "status": "optional"
    },
    "onCancel": {
      "doc": "Will be called once a user presses the cancel button.",
      "type": "function",
      "status": "optional"
    },
    "onReset": {
      "doc": "Will be called once a user presses the reset button.",
      "type": "function",
      "status": "optional"
    },
    "onShow": {
      "doc": "Will be called once date-picker is visible.",
      "type": "function",
      "status": "optional"
    },
    "onHide": {
      "doc": "Will be called once date-picker is hidden.",
      "type": "function",
      "status": "optional"
    },
    "onDaysRender": {
      "doc": "Will be called right before every new calendar view gets rendered. See the example above.",
      "type": "function",
      "status": "optional"
    },
    "onFocus": {
      "doc": "Will be called once the input gets focus.",
      "type": "function",
      "status": "optional"
    },
    "onBlur": {
      "doc": "Will be called once the input lose focus.",
      "type": "function",
      "status": "optional"
    }
  }
}
```

## Returned Object

The type of native event will depend on the interaction.
All additional HTML attributes will be returned as well.

```js
{
  date: null | 'date as `returnFormat` | `yyyy-MM-dd` ', /* Available if `range` is `false` */
  start_date: null | 'date as `returnFormat` | `yyyy-MM-dd`', /* Available if `range` is `true` */
  end_date: null | 'date as `returnFormat` | `yyyy-MM-dd`', /* Available if `range` is `true` */
  invalidDate: null | 'date as `returnFormat` | `yyyy-MM-dd`', /* Available if `range` is `false` */
  invalidStartDate: null | 'date as `returnFormat` | ´yyyy-MM-dd`', /* Available if `range` is `true` */
  invalidEndDate: null | 'date as `returnFormat` | `yyyy-MM-dd`', /* Available if `range` is `true` */
  partialDate: null | 'date as `returnFormat` | `yyyy-MM-dd`' /* Available if `range` is `false` */
  partialStartDate: null | 'date as `returnFormat` | `yyyy-MM-dd`' /* Available if `range` is `true` */
  partialEndDate: null | 'date as `returnFormat` | `yyyy-MM-dd`' /* Available if `range` is `true` */
  days_between: number,
  attributes: { attributes },
  event: null | { native event }
}
```
