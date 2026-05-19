import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{G as n,J as r,K as i,Q as a,X as o,Y as s,Z as c,q as l,t as u}from"./ComponentBox-a4aOn231.js";function d(e,t){let n=a(e,t?.in).getDay();return n===0||n===6}function f(e,t){let n=o(),r=t?.weekStartsOn??t?.locale?.options?.weekStartsOn??n.weekStartsOn??n.locale?.options?.weekStartsOn??0,i=a(e,t?.in),s=i.getDay(),c=(s<r?-7:0)+6-(s-r);return i.setHours(0,0,0,0),i.setDate(i.getDate()+c),i}var p=e(t()),m=()=>(0,p.jsx)(u,{scope:{addDays:c,startOfMonth:l,lastDayOfMonth:i,startOfWeek:s,lastDayOfWeek:f},stableName:`DatePickerRange`,children:`<DatePicker
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
`}),h=()=>(0,p.jsx)(u,{stableName:`DatePickerWithInput`,children:`<DatePicker
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
`}),g=()=>(0,p.jsx)(u,{"data-visual-test":`date-picker-trigger-default`,stableName:`DatePickerTrigger`,children:`<DatePicker
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
`}),_=()=>(0,p.jsx)(u,{stableName:`DatePickerHiddenNav`,children:`<DatePicker
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
`}),v=()=>(0,p.jsx)(u,{stableName:`DatePickerMonthOnly`,children:`<DatePicker
  label="DatePicker"
  date="05/02/2019"
  dateFormat="MM/dd/yyyy"
  onlyMonth
/>
`}),y=()=>(0,p.jsx)(u,{stableName:`DatePickerStatusMessage`,children:`<DatePicker
  label="DatePicker"
  date={new Date()}
  showInput
  status="Please select a valid date"
  statusState="information"
/>
`}),b=()=>(0,p.jsx)(u,{stableName:`DatePickerSuffix`,children:`<DatePicker
  label="DatePicker"
  date={new Date()}
  showInput
  suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
/>
`}),x=()=>(0,p.jsx)(u,{"data-visual-test":`date-picker-input`,stableName:`DatePickerLinked`,children:`<DatePicker label="DatePicker" range link showInput />
`}),S=()=>(0,p.jsx)(u,{"data-visual-test":`date-picker-trigger-error`,stableName:`DatePickerNoInputStatus`,children:`<DatePicker
  label="DatePicker"
  date="2019-05-05"
  hideNavigation
  status="Please select a valid date"
/>
`}),C=()=>(0,p.jsx)(u,{"data-visual-test":`date-picker-input-error`,stableName:`DatePickerErrorMessage`,children:`<DatePicker
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
`}),w=()=>(0,p.jsx)(u,{stableName:`DatePickerErrorStatus`,children:`<DatePicker
  label="DatePicker"
  date={new Date()}
  hideNavigation
  status="error"
/>
`}),T=()=>(0,p.jsx)(u,{background:`plain`,stableName:`DatePickerCalendarInline`,children:`<DatePicker inline range startDate="2019-05-05" endDate="2019-06-05" />
`}),E=()=>(0,p.jsx)(u,{scope:{addDays:c},hidePreview:!0,hideToolbar:!0,stableName:`DatePickerDateFns`,children:`<DatePicker
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
`}),D=()=>(0,p.jsx)(u,{scope:{startOfMonth:l,lastDayOfMonth:i},hidePreview:!0,hideToolbar:!0,stableName:`DatePickerDateFnsRange`,children:`<DatePicker
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
`}),O=()=>(0,p.jsx)(u,{scope:{isWeekend:d},stableName:`DatePickerDateFnsRangeIsWeekend`,children:`<DatePicker
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
`}),k=()=>(0,p.jsx)(u,{scope:{getOsloDate:n,isSameDay:r},stableName:`DatePickerOsloDate`,noInline:!0,children:`const osloDate = getOsloDate()
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
`}),A=()=>(0,p.jsx)(u,{stableName:`DatePickerYearNavigation`,children:`<DatePicker showInput yearNavigation />
`});export{A as _,C as a,x as c,k as d,m as f,h as g,g as h,O as i,v as l,b as m,E as n,w as o,y as p,D as r,_ as s,T as t,S as u};