import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{o as i,zr as a}from"./index-DqqByKA2.js";var o=t({AutoClose:()=>h,DatePickerDateLimitValidation:()=>g,Disabled:()=>d,HorizontalLayout:()=>l,LabelAndValue:()=>c,Range:()=>m,ValidationExtendValidator:()=>_,ValidationRequired:()=>p,Width:()=>v,WithError:()=>f,WithHelp:()=>u}),s=e(n()),c=()=>(0,s.jsx)(r,{"data-visual-test":`date-label`,stableName:`LabelAndValue`,children:`<Field.Date
  label="Label text"
  value="2023-01-16"
  onChange={(value) => console.log('onChange', value)}
/>
`}),l=()=>(0,s.jsx)(r,{"data-visual-test":`date-horizontal-layout`,stableName:`HorizontalLayout`,children:`<Field.Date
  label="Label with a long text that will wrap"
  layout="horizontal"
  layoutOptions={{
    width: 'medium', // can be a rem value
  }}
/>
`}),u=()=>(0,s.jsx)(r,{stableName:`WithHelp`,children:`<Field.Date
  label="Label text"
  value="2023-01-16"
  help={{
    title: 'Help is available',
    content:
      'Kindness and helping others will return to you when you least expect it, and maybe when you need it.',
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),d=()=>(0,s.jsx)(r,{stableName:`Disabled`,children:`<Field.Date
  label="Label text"
  value="2023-01-16"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),f=()=>(0,s.jsx)(r,{"data-visual-test":`date-error`,stableName:`WithError`,children:`<Field.Date
  value="2023-01-16"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),p=()=>(0,s.jsx)(r,{stableName:`ValidationRequired`,children:`<Field.Date
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  required
  validateInitially
/>
`}),m=()=>(0,s.jsx)(r,{stableName:`Range`,children:`<Field.Date label="Label text" value="2023-01-16|2023-04-01" range />
`}),h=()=>(0,s.jsx)(r,{stableName:`AutoClose`,children:`<Field.Date label="Automatically Close" showCancelButton={false} />
`}),g=()=>(0,s.jsx)(r,{stableName:`DatePickerDateLimitValidation`,children:`<Field.Date
  value="2024-12-31|2025-02-01"
  minDate="2025-01-01"
  maxDate="2025-01-31"
  range
/>
`}),_=()=>(0,s.jsx)(r,{stableName:`ValidationExtendValidator`,noInline:!0,children:`const myDateValidator = (value: string) => {
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
`}),v=()=>(0,s.jsx)(r,{"data-visual-test":`date-width`,stableName:`Width`,children:`<Form.Card>
  <Field.String width="stretch" />
  <Field.Date label="default" />
  <Field.Date width="small" label="small" />
  <Field.Date width="medium" label="medium" />
  <Field.Date width="large" label="large" />
  <Field.Date width="stretch" label="stretch" />
</Form.Card>
`});function y(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...a(),...e.components},{VisibleWhenVisualTest:n}=t;return o||x(`Examples`,!1),h||x(`Examples.AutoClose`,!0),g||x(`Examples.DatePickerDateLimitValidation`,!0),d||x(`Examples.Disabled`,!0),l||x(`Examples.HorizontalLayout`,!0),c||x(`Examples.LabelAndValue`,!0),m||x(`Examples.Range`,!0),_||x(`Examples.ValidationExtendValidator`,!0),p||x(`Examples.ValidationRequired`,!0),v||x(`Examples.Width`,!0),f||x(`Examples.WithError`,!0),u||x(`Examples.WithHelp`,!0),n||x(`VisibleWhenVisualTest`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(i,{bottom:!0,label:`Locale used in the demos:`,listUSLocale:!0}),`
`,(0,s.jsx)(t.h3,{children:`Label and value`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h3,{children:`With a horizontal layout`}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsx)(t.h3,{children:`Date range`}),`
`,(0,s.jsx)(m,{}),`
`,(0,s.jsx)(t.h3,{children:`Automatically close picker`}),`
`,(0,s.jsx)(t.p,{children:`The calendar will be prevented from automatically closing when the submit or cancel buttons are visible, to ensure that the user is actually able to interact with them after date selection.`}),`
`,(0,s.jsxs)(t.p,{children:[`To enable the picker to close automatically, you have to set `,(0,s.jsx)(t.code,{children:`showCancelButton`}),` to `,(0,s.jsx)(t.code,{children:`false`}),`, to override the default behavior.`]}),`
`,(0,s.jsx)(h,{}),`
`,(0,s.jsx)(t.h3,{children:`With help`}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsx)(t.h3,{children:`Disabled`}),`
`,(0,s.jsx)(d,{}),`
`,(0,s.jsx)(t.h3,{children:`Error`}),`
`,(0,s.jsx)(f,{}),`
`,(0,s.jsx)(t.h3,{children:`Date limit validation`}),`
`,(0,s.jsxs)(t.p,{children:[`The Date field will automatically display an error message if the selected date is before `,(0,s.jsx)(t.code,{children:`minDate`}),` or after `,(0,s.jsx)(t.code,{children:`maxDate`}),`.`]}),`
`,(0,s.jsx)(g,{}),`
`,(0,s.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,s.jsx)(p,{}),`
`,(0,s.jsx)(t.h3,{children:`Extend validation with custom validation function`}),`
`,(0,s.jsxs)(t.p,{children:[`You can `,(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/info/#validators`,children:`extend the existing validation`}),` (`,(0,s.jsx)(t.code,{children:`dateValidator`}),`) with your own validation function.`]}),`
`,(0,s.jsx)(_,{}),`
`,(0,s.jsx)(n,{children:(0,s.jsx)(v,{})})]})}function b(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(y,{...e})}):y(e)}function x(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{b as default};