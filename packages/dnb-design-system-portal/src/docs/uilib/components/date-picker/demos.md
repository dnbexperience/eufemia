---
showTabs: true
---

import {
DatePickerRange,
DatePickerTrigger,
DatePickerWithInput,
DatePickerHiddenNav,
DatePickerMonthOnly,
DatePickerDisabled,
DatePickerSuffix,
DatePickerLinked,
DatePickerNoInputStatus,
DatePickerErrorMessage,
DatePickerErrorStatus,
DatePickerTests,
} from 'Docs/uilib/components/date-picker/Examples'
import ChangeLocale from 'dnb-design-system-portal/src/core/ChangeLocale'

## Demos

<ChangeLocale bottom label="Locale used in the demos:" showUS={true} />

English (US) is not included in Eufemia by default. You can include it like:

```jsx
import enUS from '@dnb/eufemia/shared/locales/en-US'
<EufemiaProvider locale={enUS} ...>
	App
</EufemiaProvider>
```

### Range DatePicker

<DatePickerRange />

### Default DatePicker

<DatePickerTrigger />

### Default DatePicker with Input

<DatePickerWithInput />

### Hidden Nav:

<DatePickerHiddenNav />

### Show month only

<DatePickerMonthOnly />

### Disabled with info message

<DatePickerDisabled />

### With suffix

<DatePickerSuffix />

### Linked DatePickers

<DatePickerLinked />

### DatePicker with error status

<DatePickerNoInputStatus />

### DatePicker with error

<DatePickerErrorMessage />

### DatePicker with error status

<DatePickerErrorStatus />

<DatePickerTests />
