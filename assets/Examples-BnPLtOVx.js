import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{G as t,J as n,K as r,Q as i,X as a,Y as o,Z as s,q as c,t as l}from"./ComponentBox-xW2kV1s2.js";function u(e,t){let n=i(e,t?.in).getDay();return n===0||n===6}function d(e,t){let n=a(),r=t?.weekStartsOn??t?.locale?.options?.weekStartsOn??n.weekStartsOn??n.locale?.options?.weekStartsOn??0,o=i(e,t?.in),s=o.getDay(),c=(s<r?-7:0)+6-(s-r);return o.setHours(0,0,0,0),o.setDate(o.getDate()+c),o}var f=e(),p=()=>(0,f.jsx)(l,{scope:{addDays:s,startOfMonth:c,lastDayOfMonth:r,startOfWeek:o,lastDayOfWeek:d},children:`<DatePicker
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
`}),m=()=>(0,f.jsx)(l,{children:`<DatePicker
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
`}),h=()=>(0,f.jsx)(l,{"data-visual-test":`date-picker-trigger-default`,children:`<DatePicker
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
`}),g=()=>(0,f.jsx)(l,{children:`<DatePicker
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
`}),_=()=>(0,f.jsx)(l,{children:`<DatePicker
  label="DatePicker"
  date="05/02/2019"
  dateFormat="MM/dd/yyyy"
  onlyMonth
/>
`}),v=()=>(0,f.jsx)(l,{children:`<DatePicker
  label="DatePicker"
  date={new Date()}
  showInput
  status="Please select a valid date"
  statusState="information"
/>
`}),y=()=>(0,f.jsx)(l,{children:`<DatePicker
  label="DatePicker"
  date={new Date()}
  showInput
  suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
/>
`}),b=()=>(0,f.jsx)(l,{"data-visual-test":`date-picker-input`,children:`<DatePicker label="DatePicker" range link showInput />
`}),x=()=>(0,f.jsx)(l,{"data-visual-test":`date-picker-trigger-error`,children:`<DatePicker
  label="DatePicker"
  date="2019-05-05"
  hideNavigation
  status="Please select a valid date"
/>
`}),S=()=>(0,f.jsx)(l,{"data-visual-test":`date-picker-input-error`,children:`<DatePicker
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
`}),C=()=>(0,f.jsx)(l,{children:`<DatePicker
  label="DatePicker"
  date={new Date()}
  hideNavigation
  status="error"
/>
`}),w=()=>(0,f.jsx)(l,{background:`plain`,children:`<DatePicker inline range startDate="2019-05-05" endDate="2019-06-05" />
`}),T=()=>(0,f.jsx)(l,{scope:{addDays:s},hidePreview:!0,hideToolbar:!0,children:`<DatePicker
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
`}),E=()=>(0,f.jsx)(l,{scope:{startOfMonth:c,lastDayOfMonth:r},hidePreview:!0,hideToolbar:!0,children:`<DatePicker
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
`}),D=()=>(0,f.jsx)(l,{scope:{isWeekend:u},children:`<DatePicker
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
`}),O=()=>(0,f.jsx)(l,{scope:{getOsloDate:t,isSameDay:n},noInline:!0,children:`const osloDate = getOsloDate()
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
`}),k=()=>(0,f.jsx)(l,{children:`<DatePicker showInput yearNavigation />
`});export{k as _,S as a,b as c,O as d,p as f,m as g,h,D as i,_ as l,y as m,T as n,C as o,v as p,E as r,g as s,w as t,x as u};