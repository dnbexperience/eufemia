import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-DPdYTeDv.js";import{Lr as r,s as i}from"./index--zEB_f_m.js";var a=e({AutoClose:()=>m,DatePickerDateLimitValidation:()=>h,Disabled:()=>u,HorizontalLayout:()=>c,LabelAndValue:()=>s,Range:()=>p,ValidationExtendValidator:()=>g,ValidationRequired:()=>f,Width:()=>_,WithError:()=>d,WithHelp:()=>l}),o=t(),s=()=>(0,o.jsx)(n,{"data-visual-test":`date-label`,children:`<Field.Date
  label="Label text"
  value="2023-01-16"
  onChange={(value) => console.log('onChange', value)}
/>
`}),c=()=>(0,o.jsx)(n,{"data-visual-test":`date-horizontal-layout`,children:`<Field.Date
  label="Label with a long text that will wrap"
  layout="horizontal"
  layoutOptions={{
    width: 'medium', // can be a rem value
  }}
/>
`}),l=()=>(0,o.jsx)(n,{children:`<Field.Date
  label="Label text"
  value="2023-01-16"
  help={{
    title: 'Help is available',
    content:
      'Kindness and helping others will return to you when you least expect it, and maybe when you need it.',
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),u=()=>(0,o.jsx)(n,{children:`<Field.Date
  label="Label text"
  value="2023-01-16"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),d=()=>(0,o.jsx)(n,{"data-visual-test":`date-error`,children:`<Field.Date
  value="2023-01-16"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),f=()=>(0,o.jsx)(n,{children:`<Field.Date
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  required
  validateInitially
/>
`}),p=()=>(0,o.jsx)(n,{children:`<Field.Date label="Label text" value="2023-01-16|2023-04-01" range />
`}),m=()=>(0,o.jsx)(n,{children:`<Field.Date label="Automatically Close" showCancelButton={false} />
`}),h=()=>(0,o.jsx)(n,{children:`<Field.Date
  value="2024-12-31|2025-02-01"
  minDate="2025-01-01"
  maxDate="2025-01-31"
  range
/>
`}),g=()=>(0,o.jsx)(n,{noInline:!0,children:`const myDateValidator = (value: string) => {
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
`}),_=()=>(0,o.jsx)(n,{"data-visual-test":`date-width`,children:`<Form.Card>
  <Field.String width="stretch" />
  <Field.Date label="default" />
  <Field.Date width="small" label="small" />
  <Field.Date width="medium" label="medium" />
  <Field.Date width="large" label="large" />
  <Field.Date width="stretch" label="stretch" />
</Form.Card>
`});function v(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...r(),...e.components},{VisibleWhenVisualTest:n}=t;return a||b(`Examples`,!1),m||b(`Examples.AutoClose`,!0),h||b(`Examples.DatePickerDateLimitValidation`,!0),u||b(`Examples.Disabled`,!0),c||b(`Examples.HorizontalLayout`,!0),s||b(`Examples.LabelAndValue`,!0),p||b(`Examples.Range`,!0),g||b(`Examples.ValidationExtendValidator`,!0),f||b(`Examples.ValidationRequired`,!0),_||b(`Examples.Width`,!0),d||b(`Examples.WithError`,!0),l||b(`Examples.WithHelp`,!0),n||b(`VisibleWhenVisualTest`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(i,{bottom:!0,label:`Locale used in the demos:`,listUSLocale:!0}),`
`,(0,o.jsx)(t.h3,{children:`Label and value`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`With a horizontal layout`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Date range`}),`
`,(0,o.jsx)(p,{}),`
`,(0,o.jsx)(t.h3,{children:`Automatically close picker`}),`
`,(0,o.jsx)(t.p,{children:`The calendar will be prevented from automatically closing when the submit or cancel buttons are visible, to ensure that the user is actually able to interact with them after date selection.`}),`
`,(0,o.jsxs)(t.p,{children:[`To enable the picker to close automatically, you have to set `,(0,o.jsx)(t.code,{children:`showCancelButton`}),` to `,(0,o.jsx)(t.code,{children:`false`}),`, to override the default behavior.`]}),`
`,(0,o.jsx)(m,{}),`
`,(0,o.jsx)(t.h3,{children:`With help`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Disabled`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`Error`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`Date limit validation`}),`
`,(0,o.jsxs)(t.p,{children:[`The Date field will automatically display an error message if the selected date is before `,(0,o.jsx)(t.code,{children:`minDate`}),` or after `,(0,o.jsx)(t.code,{children:`maxDate`}),`.`]}),`
`,(0,o.jsx)(h,{}),`
`,(0,o.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,o.jsx)(f,{}),`
`,(0,o.jsx)(t.h3,{children:`Extend validation with custom validation function`}),`
`,(0,o.jsxs)(t.p,{children:[`You can `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/info/#validators`,children:`extend the existing validation`}),` (`,(0,o.jsx)(t.code,{children:`dateValidator`}),`) with your own validation function.`]}),`
`,(0,o.jsx)(g,{}),`
`,(0,o.jsx)(n,{children:(0,o.jsx)(_,{})})]})}function y(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(v,{...e})}):v(e)}function b(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{y as default};