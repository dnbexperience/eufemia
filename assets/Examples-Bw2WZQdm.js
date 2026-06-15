import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{a as n,t as r}from"./HelpButton-C7xeEDxM.js";import{A as i,C as a,M as o,N as s,T as c,a as l,k as u}from"./DateFormatUtils-CVXR2VQt.js";import{t as d}from"./DatePicker-CuQdkzyP.js";import{t as f}from"./ComponentBox-R2c6Bo76.js";function p(e,t){let n=s(e,t?.in).getDay();return n===0||n===6}function m(e,t){let n=s(e,t?.in),r=n.getMonth();return n.setFullYear(n.getFullYear(),r+1,0),n.setHours(0,0,0,0),s(n,t?.in)}function h(e,t){let n=i(),r=t?.weekStartsOn??t?.locale?.options?.weekStartsOn??n.weekStartsOn??n.locale?.options?.weekStartsOn??0,a=s(e,t?.in),o=a.getDay(),c=(o<r?-7:0)+6-(o-r);return a.setHours(0,0,0,0),a.setDate(a.getDate()+c),a}var g=e(t()),_=()=>(0,g.jsx)(f,{scope:{addDays:o,startOfMonth:a,lastDayOfMonth:m,startOfWeek:u,lastDayOfWeek:h},stableName:`DatePickerRange`,sourceImports:[`import { addDays, isSameDay, startOfMonth, lastDayOfMonth, startOfWeek, lastDayOfWeek, isWeekend } from 'date-fns'`,`import { DatePicker, HelpButton } from '@dnb/eufemia'`,`import { getOsloDate } from '@dnb/eufemia/components/date-format/DateFormatUtils'`],__buildScope:{DatePicker:d},children:`<DatePicker
  label="DatePicker"
  startDate="2019-04-01"
  endDate="2019-05-17"
  range
  showInput
  onChange={({ startDate, endDate }) => {
    console.log('onChange', startDate, endDate)
  }}
  onSubmit={({ startDate, endDate }) => {
    console.log('onSubmit', startDate, endDate)
  }}
  onCancel={({ startDate, endDate }) => {
    console.log('onCancel', startDate, endDate)
  }}
  onBlur={({ startDate, endDate }) => {
    console.log('onBlurComplete', startDate, endDate)
  }}
  shortcuts={[
    {
      title: 'Set date period',
      startDate: '1969-07-15',
      endDate: '1969-08-15',
    },
    {
      title: 'Today',
      startDate: new Date(),
    },
    {
      title: 'This week',
      startDate: startOfWeek(new Date()),
      endDate: lastDayOfWeek(new Date()),
    },
    {
      closeOnSelect: true,
      title: 'This month',
      startDate: startOfMonth(new Date()),
      endDate: lastDayOfMonth(new Date()),
    },
    {
      title: 'Relative +3 days',
      // @ts-expect-error -- strictFunctionTypes
      startDate: ({ startDate }) => startDate || new Date(),
      // @ts-expect-error -- strictFunctionTypes
      endDate: ({ endDate }) => addDays(endDate || new Date(), 3),
    },
  ]}
/>
`}),v=()=>(0,g.jsx)(f,{stableName:`DatePickerWithInput`,sourceImports:[`import { addDays, isSameDay, startOfMonth, lastDayOfMonth, startOfWeek, lastDayOfWeek, isWeekend } from 'date-fns'`,`import { DatePicker, HelpButton } from '@dnb/eufemia'`,`import { getOsloDate } from '@dnb/eufemia/components/date-format/DateFormatUtils'`],__buildScope:{DatePicker:d},children:`<DatePicker
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
`}),y=()=>(0,g.jsx)(f,{"data-visual-test":`date-picker-trigger-default`,stableName:`DatePickerTrigger`,sourceImports:[`import { addDays, isSameDay, startOfMonth, lastDayOfMonth, startOfWeek, lastDayOfWeek, isWeekend } from 'date-fns'`,`import { DatePicker, HelpButton } from '@dnb/eufemia'`,`import { getOsloDate } from '@dnb/eufemia/components/date-format/DateFormatUtils'`],__buildScope:{DatePicker:d},children:`<DatePicker
  label="DatePicker"
  date="2019-05-05"
  returnFormat="dd-MM-yyyy"
  onChange={({ date }) => {
    console.log('onChange', date)
  }}
  onOpen={({ date }) => {
    console.log('onOpen', date)
  }}
  onBlur={({ startDate, endDate }) => {
    console.log('onBlur', startDate, endDate)
  }}
/>
`}),b=()=>(0,g.jsx)(f,{stableName:`DatePickerHiddenNav`,sourceImports:[`import { addDays, isSameDay, startOfMonth, lastDayOfMonth, startOfWeek, lastDayOfWeek, isWeekend } from 'date-fns'`,`import { DatePicker, HelpButton } from '@dnb/eufemia'`,`import { getOsloDate } from '@dnb/eufemia/components/date-format/DateFormatUtils'`],__buildScope:{DatePicker:d},children:`<DatePicker
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
  onClose={({ date }) => {
    console.log('onClose', date)
  }}
  onBlur={({ date }) => {
    console.log('onBlur', date)
  }}
/>
`}),x=()=>(0,g.jsx)(f,{stableName:`DatePickerMonthOnly`,sourceImports:[`import { addDays, isSameDay, startOfMonth, lastDayOfMonth, startOfWeek, lastDayOfWeek, isWeekend } from 'date-fns'`,`import { DatePicker, HelpButton } from '@dnb/eufemia'`,`import { getOsloDate } from '@dnb/eufemia/components/date-format/DateFormatUtils'`],__buildScope:{DatePicker:d},children:`<DatePicker
  label="DatePicker"
  date="05/02/2019"
  dateFormat="MM/dd/yyyy"
  onlyMonth
/>
`}),S=()=>(0,g.jsx)(f,{stableName:`DatePickerStatusMessage`,sourceImports:[`import { addDays, isSameDay, startOfMonth, lastDayOfMonth, startOfWeek, lastDayOfWeek, isWeekend } from 'date-fns'`,`import { DatePicker, HelpButton } from '@dnb/eufemia'`,`import { getOsloDate } from '@dnb/eufemia/components/date-format/DateFormatUtils'`],__buildScope:{DatePicker:d},children:`<DatePicker
  label="DatePicker"
  date={new Date()}
  showInput
  status="Please select a valid date"
  statusState="information"
/>
`}),C=()=>(0,g.jsx)(f,{stableName:`DatePickerSuffix`,sourceImports:[`import { addDays, isSameDay, startOfMonth, lastDayOfMonth, startOfWeek, lastDayOfWeek, isWeekend } from 'date-fns'`,`import { DatePicker, HelpButton } from '@dnb/eufemia'`,`import { getOsloDate } from '@dnb/eufemia/components/date-format/DateFormatUtils'`],__buildScope:{DatePicker:d,HelpButton:r,Modal:n},children:`<DatePicker
  label="DatePicker"
  date={new Date()}
  showInput
  suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
/>
`}),w=()=>(0,g.jsx)(f,{"data-visual-test":`date-picker-input`,stableName:`DatePickerLinked`,sourceImports:[`import { addDays, isSameDay, startOfMonth, lastDayOfMonth, startOfWeek, lastDayOfWeek, isWeekend } from 'date-fns'`,`import { DatePicker, HelpButton } from '@dnb/eufemia'`,`import { getOsloDate } from '@dnb/eufemia/components/date-format/DateFormatUtils'`],__buildScope:{DatePicker:d},children:`<DatePicker label="DatePicker" range link showInput />
`}),T=()=>(0,g.jsx)(f,{"data-visual-test":`date-picker-trigger-error`,stableName:`DatePickerNoInputStatus`,sourceImports:[`import { addDays, isSameDay, startOfMonth, lastDayOfMonth, startOfWeek, lastDayOfWeek, isWeekend } from 'date-fns'`,`import { DatePicker, HelpButton } from '@dnb/eufemia'`,`import { getOsloDate } from '@dnb/eufemia/components/date-format/DateFormatUtils'`],__buildScope:{DatePicker:d},children:`<DatePicker
  label="DatePicker"
  date="2019-05-05"
  hideNavigation
  status="Please select a valid date"
/>
`}),E=()=>(0,g.jsx)(f,{"data-visual-test":`date-picker-input-error`,stableName:`DatePickerErrorMessage`,sourceImports:[`import { addDays, isSameDay, startOfMonth, lastDayOfMonth, startOfWeek, lastDayOfWeek, isWeekend } from 'date-fns'`,`import { DatePicker, HelpButton } from '@dnb/eufemia'`,`import { getOsloDate } from '@dnb/eufemia/components/date-format/DateFormatUtils'`],__buildScope:{DatePicker:d},children:`<DatePicker
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
`}),D=()=>(0,g.jsx)(f,{stableName:`DatePickerErrorStatus`,sourceImports:[`import { addDays, isSameDay, startOfMonth, lastDayOfMonth, startOfWeek, lastDayOfWeek, isWeekend } from 'date-fns'`,`import { DatePicker, HelpButton } from '@dnb/eufemia'`,`import { getOsloDate } from '@dnb/eufemia/components/date-format/DateFormatUtils'`],__buildScope:{DatePicker:d},children:`<DatePicker
  label="DatePicker"
  date={new Date()}
  hideNavigation
  status="error"
/>
`}),O=()=>(0,g.jsx)(f,{background:`plain`,stableName:`DatePickerCalendarInline`,sourceImports:[`import { addDays, isSameDay, startOfMonth, lastDayOfMonth, startOfWeek, lastDayOfWeek, isWeekend } from 'date-fns'`,`import { DatePicker, HelpButton } from '@dnb/eufemia'`,`import { getOsloDate } from '@dnb/eufemia/components/date-format/DateFormatUtils'`],__buildScope:{DatePicker:d},children:`<DatePicker inline range startDate="2019-05-05" endDate="2019-06-05" />
`}),k=()=>(0,g.jsx)(f,{scope:{addDays:o},hidePreview:!0,hideToolbar:!0,stableName:`DatePickerDateFns`,sourceImports:[`import { addDays, isSameDay, startOfMonth, lastDayOfMonth, startOfWeek, lastDayOfWeek, isWeekend } from 'date-fns'`,`import { DatePicker, HelpButton } from '@dnb/eufemia'`,`import { getOsloDate } from '@dnb/eufemia/components/date-format/DateFormatUtils'`],__buildScope:{DatePicker:d},children:`<DatePicker
  shortcuts={[
    {
      title: 'Set date',
      date: '1969-07-15',
    },
    {
      title: 'Relative +3 days',
      // @ts-expect-error -- strictFunctionTypes
      date: ({ date }) => date && addDays(date, 3),
    },
  ]}
/>
`}),A=()=>(0,g.jsx)(f,{scope:{startOfMonth:a,lastDayOfMonth:m},hidePreview:!0,hideToolbar:!0,stableName:`DatePickerDateFnsRange`,sourceImports:[`import { addDays, isSameDay, startOfMonth, lastDayOfMonth, startOfWeek, lastDayOfWeek, isWeekend } from 'date-fns'`,`import { DatePicker, HelpButton } from '@dnb/eufemia'`,`import { getOsloDate } from '@dnb/eufemia/components/date-format/DateFormatUtils'`],__buildScope:{DatePicker:d},children:`<DatePicker
  shortcuts={[
    {
      title: 'Set date period',
      startDate: '1969-07-15',
      endDate: '1969-07-15',
      closeOnSelect: true, // will close the picker
    },
    {
      title: 'This month',
      startDate: startOfMonth(new Date()),
      endDate: lastDayOfMonth(new Date()),
    },
  ]}
/>
`}),j=()=>(0,g.jsx)(f,{scope:{isWeekend:p},stableName:`DatePickerDateFnsRangeIsWeekend`,sourceImports:[`import { addDays, isSameDay, startOfMonth, lastDayOfMonth, startOfWeek, lastDayOfWeek, isWeekend } from 'date-fns'`,`import { DatePicker, HelpButton } from '@dnb/eufemia'`,`import { getOsloDate } from '@dnb/eufemia/components/date-format/DateFormatUtils'`],__buildScope:{DatePicker:d},children:`<DatePicker
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
`}),M=()=>(0,g.jsx)(f,{scope:{getOsloDate:l,isSameDay:c},stableName:`DatePickerOsloDate`,sourceImports:[`import { addDays, isSameDay, startOfMonth, lastDayOfMonth, startOfWeek, lastDayOfWeek, isWeekend } from 'date-fns'`,`import { DatePicker, HelpButton } from '@dnb/eufemia'`,`import { getOsloDate } from '@dnb/eufemia/components/date-format/DateFormatUtils'`],__buildScope:{DatePicker:d},noInline:!0,children:`const osloDate = getOsloDate()
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
`}),N=()=>(0,g.jsx)(f,{stableName:`DatePickerYearNavigation`,sourceImports:[`import { addDays, isSameDay, startOfMonth, lastDayOfMonth, startOfWeek, lastDayOfWeek, isWeekend } from 'date-fns'`,`import { DatePicker, HelpButton } from '@dnb/eufemia'`,`import { getOsloDate } from '@dnb/eufemia/components/date-format/DateFormatUtils'`],__buildScope:{DatePicker:d},children:`<DatePicker showInput yearNavigation />
`});export{N as _,E as a,w as c,M as d,_ as f,v as g,y as h,j as i,x as l,C as m,k as n,D as o,S as p,A as r,b as s,O as t,T as u};