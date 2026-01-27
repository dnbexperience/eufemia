---
title: 'Field.Date'
description: '`Field.Date` is a wrapper component for the input of strings, with user experience tailored for date values.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.299Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Field.Date

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Date />)
```

## Description

`Field.Date` is a wrapper component for the [DatePicker](/uilib/components/date-picker/), with user experience tailored for date values.

There is a corresponding [Value.Date](/uilib/extensions/forms/Value/Date) component.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/Date)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/Date)

## Validators

### Internal validators exposed

`Field.Date` exposes the `dateValidator` validator through its `onBlurValidator` property. Take a look at [this demo](/uilib/extensions/forms/feature-fields/Date/demos/#extend-validation-with-custom-validation-function).
The `dateValidator` validator validates invalid dates and dates against the `minDate` and `maxDate` properties.

### Extending validators

You can compose the shared validator with your own checks by returning it along with custom logic. Import `DateValidator` to type your validator and have `validators` typed too.

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
import type { DateValidator } from '@dnb/eufemia/extensions/forms/Field/Date'

const myValidator: DateValidator = (value, { validators }) => {
  const { dateValidator } = validators ?? {}
  const notToday = (value: string) => {
    if (value === new Date().toISOString().slice(0, 10)) {
      return new Error('Please enter another date than today')
    }
  }

  // Keep the default validation and ban today's date.
  return [dateValidator, notToday]
}

render(<Field.Date onBlurValidator={myValidator} />)
```

## Demos

<ChangeLocale
  bottom
  label="Locale used in the demos:"
  listUSLocale={true}
/>

### Label and value

```tsx
render(
  <Field.Date
    label="Label text"
    value="2023-01-16"
    onChange={(value) => console.log('onChange', value)}
  />
)
```

### With a horizontal layout

```tsx
render(
  <Field.Date
    label="Label with a long text that will wrap"
    layout="horizontal"
    layoutOptions={{
      width: 'medium', // can be a rem value
    }}
  />
)
```

### Date range

```tsx
render(
  <Field.Date label="Label text" value="2023-01-16|2023-04-01" range />
)
```

### Automatically close picker

The calendar will be prevented from automatically closing when the submit or cancel buttons are visible, to ensure that the user is actually able to interact with them after date selection.

To enable the picker to close automatically, you have to set `showCancelButton` to `false`, to override the default behavior.

```tsx
render(<Field.Date label="Automatically Close" showCancelButton={false} />)
```

### With help

```tsx
render(
  <Field.Date
    label="Label text"
    value="2023-01-16"
    help={{
      title: 'Help is available',
      content:
        'Kindness and helping others will return to you when you least expect it, and maybe when you need it.',
    }}
    onChange={(value) => console.log('onChange', value)}
  />
)
```

### Disabled

```tsx
render(
  <Field.Date
    label="Label text"
    value="2023-01-16"
    onChange={(value) => console.log('onChange', value)}
    disabled
  />
)
```

### Error

```tsx
render(
  <Field.Date
    value="2023-01-16"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    error={new Error('This is what is wrong...')}
  />
)
```

### Date limit validation

The Date field will automatically display an error message if the selected date is before `minDate` or after `maxDate`.

```tsx
render(
  <Field.Date
    value="2024-12-31|2025-02-01"
    minDate="2025-01-01"
    maxDate="2025-01-31"
    range
  />
)
```

### Validation - Required

```tsx
render(
  <Field.Date
    label="Label text"
    value="2023-01-16"
    onChange={(value) => console.log('onChange', value)}
    required
  />
)
```

### Extend validation with custom validation function

You can [extend the existing validation](/uilib/extensions/forms/create-component/useFieldProps/info/#validators) (`dateValidator`) with your own validation function.

```tsx
const myDateValidator = (value: string) => {
  if (value === '2025-01-01') {
    return new Error('My custom message')
  }
  if (value === '2025-01-03') {
    return [
      new Error('My custom message 1'),
      new Error('My custom message 2'),
    ]
  }
}

// Combine the shared validator with the custom date rules.
// Combine the shared validator with the custom date rules.
const myOnBlurValidator: DateValidator = (
  value: string,
  { validators }
) => {
  const { dateValidator } = validators ?? {}
  return [myDateValidator, dateValidator]
}
render(
  <Field.Date
    value="2025-01-01"
    minDate="2024-12-31"
    maxDate="2025-01-31"
    onBlurValidator={myOnBlurValidator}
  />
)
```

```tsx
render(
  <Form.Card>
    <Field.String width="stretch" />
    <Field.Date label="default" />
    <Field.Date width="small" label="small" />
    <Field.Date width="medium" label="medium" />
    <Field.Date width="large" label="large" />
    <Field.Date width="stretch" label="stretch" />
  </Form.Card>
)
```

## Properties

### Field-specific properties

```json
{
  "props": {
    "range": {
      "doc": "Defines if the Date field should support a value of two dates (starting and ending date). The `value` needs to be a string containing two dates, separated by a pipe character (`|`) (`01-09-2024|30-09-2024`) when this is set to `true`. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "showInput": {
      "doc": "If the input fields with the mask should be visible. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "showCancelButton": {
      "doc": "If set to `true`, a cancel button will be shown. You can change the default text by using `cancelButtonText=\"Avbryt\"` Defaults to `true`. If the `range` property is `true`, then the cancel button is shown.",
      "type": "boolean",
      "status": "optional"
    },
    "showResetButton": {
      "doc": "If set to `true`, a reset button will be shown. You can change the default text by using `resetButtonText=\"Tilbakestill\"` Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "size": {
      "doc": "The sizes you can choose is `small` (1.5rem), `default` (2rem), `medium` (2.5rem) and `large` (3rem) are supported component sizes. Defaults to `default` / `null`. Consider rather setting field sizes with [Form.Appearance](/uilib/extensions/forms/Form/Appearance/).",
      "type": "string",
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
    "disableAutofocus": {
      "doc": "Once the date picker gets opened, there is a focus handling to ensure good accessibility. This can be disabled with this property. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "onType": {
      "doc": "Event handler that is called when the user types in the input field. The first parameter is a string, the second parameter is an object containing { date, start_date, end_date, is_valid, event }.",
      "type": "function",
      "status": "optional"
    },
    "onBlurValidator": {
      "doc": "Custom validator function that is triggered when the user leaves a field (e.g., blurring a text input or closing a dropdown). The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }. Defaults to validating invalid dates, and dates against `minDate` and `maxDate`, using `dateValidator`. Can be disabled using `false`.",
      "type": "function",
      "status": "optional"
    }
  }
}
```

### General properties

```json
{
  "props": {
    "value": {
      "doc": "Source data value for the field. Will take precedence over the path value given in the data context.",
      "type": "{valueType}",
      "status": "optional"
    },
    "defaultValue": {
      "doc": "Default source data value for the field. Will not take precedence over the path value given in the data context.",
      "type": "{valueType}",
      "status": "optional"
    },
    "path": {
      "doc": "JSON Pointer for where the data for the field is located in the source dataset (when using Form.Handler or DataContext). The `path` will also be set as the `name` attribute for the [string](/uilib/extensions/forms/base-fields/String/)-field.",
      "type": "string",
      "status": "optional"
    },
    "info": {
      "doc": "Info message shown below / after the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`",
      "type": ["React.Node", "Array<React.Node>", "function"],
      "status": "optional"
    },
    "warning": {
      "doc": "Warning message shown below / after the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`",
      "type": ["React.Node", "Array<React.Node>", "function"],
      "status": "optional"
    },
    "error": {
      "doc": "Error message shown below / after the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`",
      "type": [
        "Error",
        "FormError",
        "Array<Error | FormError>",
        "function"
      ],
      "status": "optional"
    },
    "disabled": {
      "doc": "Set `true` to show the field but without the possibility of changing the value.",
      "type": "boolean",
      "status": "optional"
    },
    "emptyValue": {
      "doc": "The value to use (in `onChange` events etc) when emptying the field. Makes it possible for instance to provide `undefined` instead of an empty string when clearing the content of a text input.",
      "type": ["{valueType}", "undefined"],
      "status": "optional"
    },
    "required": {
      "doc": "When set to `true`, the field will give an error if the value fails the required validation. When set to `false`, the field will not be required, but will add a \"(optional)\" suffix to the label.",
      "type": "boolean",
      "status": "optional"
    },
    "labelSuffix": {
      "doc": "Will append an additional text to the label, like \"(optional)\". When using `inheritLabel`, the suffix will not be inherited. NB: The visual appearance of the `labelSuffix` may change in the future.",
      "type": "React.Node",
      "status": "optional"
    },
    "schema": {
      "doc": "Custom JSON Schema for validating the value.",
      "type": "object",
      "status": "optional"
    },
    "validateInitially": {
      "doc": "Set to `true` to show validation based errors initially (from given value-prop or source data) before the user interacts with the field.",
      "type": "boolean",
      "status": "optional"
    },
    "validateUnchanged": {
      "doc": "Set to `true` to show validation based errors when the field is touched (like focusing a field and blurring) without having changed the value. Since the user did not introduce a new error, this will apply when the value was initially invalid based on validation.",
      "type": "boolean",
      "status": "optional"
    },
    "validateContinuously": {
      "doc": "Set to `true` to show validation based errors continuously while writing, not just when blurring the field.",
      "type": "boolean",
      "status": "optional"
    },
    "errorMessages": {
      "doc": "Custom error messages for each type of error, overriding default messages. The messages can be a React.ReactNode or a string.",
      "type": "object",
      "status": "optional"
    },
    "onChangeValidator": {
      "doc": "Custom validator function where you can return `undefined`, `Error`, `FormError` or an Array with either several other validators or several `Error` or `FormError`. It is triggered on every change done by the user. The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }.",
      "type": "function",
      "status": "optional"
    },
    "onBlurValidator": {
      "doc": "Custom validator function where you can return `undefined`, `Error`, `FormError` or an Array with either several other validators or several `Error` or `FormError`. It is triggered when the user leaves a field (e.g., blurring a text input or closing a dropdown). The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }.",
      "type": "function",
      "status": "optional"
    },
    "transformIn": {
      "doc": "Transforms the `value` before its displayed in the field (e.g. input).",
      "type": "function",
      "status": "optional"
    },
    "transformOut": {
      "doc": "Transforms the value before it gets forwarded to the form data object (context) or returned as the `onChange` value parameter. The first parameter is the internal value. Some fields do support a second parameter, like the SelectCountry, where the country object is given.",
      "type": "function",
      "status": "optional"
    },
    "label": {
      "doc": "Label text displayed above the field. Most fields already have a default label, so check the field translations for an existing label entry. Only set `label` when you need to override the default.",
      "type": "string",
      "status": "optional"
    },
    "labelDescription": {
      "doc": "A more discreet text displayed beside the label (i.e for \"(optional)\").",
      "type": "string",
      "status": "optional"
    },
    "labelDescriptionInline": {
      "doc": "If true, the `labelDescription` will be displayed on the same line as the label.",
      "type": "boolean",
      "status": "optional"
    },
    "labelSrOnly": {
      "doc": "Use `true` to make the label only readable by screen readers.",
      "type": "boolean",
      "status": "optional"
    },
    "labelSize": {
      "doc": "Define the font-size of the label based on the [font-size](/uilib/typography/font-size/) table.",
      "type": ["medium", "large"],
      "status": "optional"
    },
    "help": {
      "doc": "Provide help content for the field using `title` and `content` as a string or React.Node. Additionally, you can set `open` to `true` to display the inline help, set the `breakout` property to `false` to disable the breakout of the inline help content, set `outset` to `false` to display the help text inline (inset) instead of the default outset behavior, or use `renderAs` set to `dialog` to render the content in a [Dialog](/uilib/components/dialog/) (recommended for larger amounts of content).",
      "type": "object",
      "status": "optional"
    },
    "hideHelpButton": {
      "doc": "Set `true` when you render the inline help button outside the label (e.g. inside a checkbox suffix) so FieldBlock skips drawing the default label help button.",
      "type": "boolean",
      "status": "optional"
    },
    "layout": {
      "doc": "Layout for the label and input. Can be `horizontal` or `vertical`.",
      "type": "string",
      "status": "optional"
    },
    "layoutOptions": {
      "doc": "Use this to set additional options for the `horizontal` layout. E.g. `{ width: \"medium\" }`. You can also use a custom width `{number}rem`. Instead of a width, you can use a min/max width. E.g. `{ minWidth: \"6rem\", maxWidth: \"12rem\" }`.",
      "type": "object",
      "status": "optional"
    },
    "width": {
      "doc": "Will set the width for the whole block. Use `small`, `medium`, `large` for predefined standard widths. You can also set a custom width `{number}rem` or use `stretch` or `false`.",
      "type": ["string", "false"],
      "status": "optional"
    },
    "contentWidth": {
      "doc": "Will set the width for its contents. Use `small`, `medium`, `large` for predefined standard widths. You can also set a custom width `{number}rem` or use `stretch` or `false`.",
      "type": ["string", "false"],
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  },
  "omit": "onBlurValidator"
}
```

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "Date.errorEndDateMaxDate": {
      "nb-NO": "Sluttdato kan ikke være etter {date}.",
      "en-GB": "End date cannot be after {date}.",
      "sv-SE": "Slutdatum kan inte vara efter {date}.",
      "da-DK": "Slutdato må ikke være efter {date}."
    },
    "Date.errorEndDateMinDate": {
      "nb-NO": "Sluttdato kan ikke være før {date}.",
      "en-GB": "End date cannot be before {date}.",
      "sv-SE": "Slutdatum kan inte vara före {date}.",
      "da-DK": "Slutdato må ikke være før {date}."
    },
    "Date.errorInvalidDate": {
      "nb-NO": "Ugyldig dato.",
      "en-GB": "Invalid date.",
      "sv-SE": "Ogiltigt datum.",
      "da-DK": "Ugyldig dato."
    },
    "Date.errorInvalidEndDate": {
      "nb-NO": "Ugyldig sluttdato.",
      "en-GB": "Invalid end date.",
      "sv-SE": "Ogiltigt slutdatum.",
      "da-DK": "Ugyldig slutdato."
    },
    "Date.errorInvalidStartDate": {
      "nb-NO": "Ugyldig startdato.",
      "en-GB": "Invalid start date.",
      "sv-SE": "Ogiltigt startdatum.",
      "da-DK": "Ugyldig startdato."
    },
    "Date.errorMaxDate": {
      "nb-NO": "Valgt dato kan ikke være etter {date}.",
      "en-GB": "Chosen date cannot be after {date}.",
      "sv-SE": "Valt datum kan inte vara efter {date}.",
      "da-DK": "Valgt dato må ikke være efter {date}."
    },
    "Date.errorMinDate": {
      "nb-NO": "Valgt dato kan ikke være før {date}.",
      "en-GB": "Chosen date cannot be before {date}.",
      "sv-SE": "Valt datum kan inte vara före {date}.",
      "da-DK": "Valgt dato må ikke være før {date}."
    },
    "Date.errorRequired": {
      "nb-NO": "Du må fylle inn en dato.",
      "en-GB": "You must enter a date.",
      "sv-SE": "Du måste fylla i ett datum.",
      "da-DK": "Du skal udfylde en dato."
    },
    "Date.errorRequiredRange": {
      "nb-NO": "Du må fylle inn en datoperiode.",
      "en-GB": "You must enter a date range.",
      "sv-SE": "Du måste fylla i ett datumintervall.",
      "da-DK": "Du skal udfylde et datointerval."
    },
    "Date.errorStartDateMaxDate": {
      "nb-NO": "Startdato kan ikke være etter {date}.",
      "en-GB": "Start date cannot be after {date}.",
      "sv-SE": "Startdatum kan inte vara efter {date}.",
      "da-DK": "Startdato må ikke være efter {date}."
    },
    "Date.errorStartDateMinDate": {
      "nb-NO": "Startdato kan ikke være før {date}.",
      "en-GB": "Start date cannot be before {date}.",
      "sv-SE": "Startdatum kan inte vara före {date}.",
      "da-DK": "Startdato må ikke være før {date}."
    },
    "Date.label": {
      "nb-NO": "Dato",
      "en-GB": "Date",
      "sv-SE": "Datum",
      "da-DK": "Dato"
    },
    "Field.errorPattern": {
      "nb-NO": "Verdien er ugyldig.",
      "en-GB": "The value is invalid.",
      "sv-SE": "Värdet är ogiltigt.",
      "da-DK": "Ugyldig værdi."
    },
    "Field.errorRequired": {
      "nb-NO": "Dette feltet må fylles ut.",
      "en-GB": "This field is required.",
      "sv-SE": "Detta fält måste fyllas i.",
      "da-DK": "Dette felt skal udfyldes."
    },
    "Field.errorSummary": {
      "nb-NO": "Feil som må rettes:",
      "en-GB": "Please correct the following errors:",
      "sv-SE": "Fel som måste åtgärdas:",
      "da-DK": "Felter der skal rettes:"
    },
    "Field.errorSummaryTitle": {
      "nb-NO": "Feil som må rettes",
      "en-GB": "Please correct the following errors",
      "sv-SE": "Fel som måste åtgärdas",
      "da-DK": "Felter der skal rettes"
    },
    "Field.optionalLabelSuffix": {
      "nb-NO": "(valgfritt)",
      "en-GB": "(optional)",
      "sv-SE": "(valfritt)",
      "da-DK": "(valgfrit)"
    },
    "Field.stateSummary": {
      "nb-NO": "Oppsummering:",
      "en-GB": "Summary:",
      "sv-SE": "Sammanfattning:",
      "da-DK": "Oversigt:"
    }
  }
}
```

## Date Events

```json
{
  "props": {
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
    }
  }
}
```

## Events

```json
{
  "props": {
    "onChange": {
      "doc": "Will be called on value changes made by the user, with the new value as argument. When an `async` function is used, the corresponding [FieldBlock](/uilib/extensions/forms/create-component/FieldBlock/) will show an indicator on the field label. You can return `{ success: 'saved' } as const` to show a success symbol, or an error or an object with these keys `{ info: 'Info message', warning: 'Warning message', error: Error('My error') } as const`. The second parameter is an object that e.g. contains `props` (all given `Field.*` properties).",
      "type": "(value) => void",
      "status": "optional"
    },
    "onFocus": {
      "doc": "Will be called when the component gets into focus. Like clicking inside a text input or opening a dropdown. Called with active value as argument. The second parameter is an object that e.g. contains `props` (all given `Field.*` properties).",
      "type": "(value) => void",
      "status": "optional"
    },
    "onBlur": {
      "doc": "Will be called when the component stop being in focus. Like when going to next field, or closing a dropdown. Called with active value as argument. The second parameter is an object that e.g. contains `props` (all given `Field.*` properties).",
      "type": "(value) => void",
      "status": "optional"
    },
    "onStatusChange": {
      "doc": "Called whenever the status messages (info, warning or error) gets visible or changes. Receives the current `{ info, warning, error }` object.",
      "type": "({ info?, warning?, error? }: FieldStatus) => void",
      "status": "optional"
    }
  }
}
```
