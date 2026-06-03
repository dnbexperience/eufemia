import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./Card-C6UABezd.js";import{t as i}from"./Form-C16rVaXm.js";import{t as a}from"./Field-B5trC2Cn.js";import{W as o,o as s}from"./index-BCXtuv-b.js";import{t as c}from"./ComponentBox-B2X8809Z.js";var l=e({AutoClose:()=>v,DatePickerDateLimitValidation:()=>y,Disabled:()=>m,HorizontalLayout:()=>f,LabelAndValue:()=>d,Range:()=>_,ValidationExtendValidator:()=>b,ValidationRequired:()=>g,Width:()=>x,WithError:()=>h,WithHelp:()=>p}),u=t(n()),d=()=>(0,u.jsx)(c,{"data-visual-test":`date-label`,stableName:`LabelAndValue`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { DateValidator } from '@dnb/eufemia/extensions/forms/Field/Date'`],__buildScope:{Field:a},children:`<Field.Date
  label="Label text"
  value="2023-01-16"
  onChange={(value) => console.log('onChange', value)}
/>
`}),f=()=>(0,u.jsx)(c,{"data-visual-test":`date-horizontal-layout`,stableName:`HorizontalLayout`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { DateValidator } from '@dnb/eufemia/extensions/forms/Field/Date'`],__buildScope:{Field:a},children:`<Field.Date
  label="Label with a long text that will wrap"
  layout="horizontal"
  layoutOptions={{
    width: 'medium', // can be a rem value
  }}
/>
`}),p=()=>(0,u.jsx)(c,{stableName:`WithHelp`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { DateValidator } from '@dnb/eufemia/extensions/forms/Field/Date'`],__buildScope:{Field:a},children:`<Field.Date
  label="Label text"
  value="2023-01-16"
  help={{
    title: 'Help is available',
    content:
      'Kindness and helping others will return to you when you least expect it, and maybe when you need it.',
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),m=()=>(0,u.jsx)(c,{stableName:`Disabled`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { DateValidator } from '@dnb/eufemia/extensions/forms/Field/Date'`],__buildScope:{Field:a},children:`<Field.Date
  label="Label text"
  value="2023-01-16"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),h=()=>(0,u.jsx)(c,{"data-visual-test":`date-error`,stableName:`WithError`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { DateValidator } from '@dnb/eufemia/extensions/forms/Field/Date'`],__buildScope:{Field:a},children:`<Field.Date
  value="2023-01-16"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),g=()=>(0,u.jsx)(c,{stableName:`ValidationRequired`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { DateValidator } from '@dnb/eufemia/extensions/forms/Field/Date'`],__buildScope:{Field:a},children:`<Field.Date
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  required
  validateInitially
/>
`}),_=()=>(0,u.jsx)(c,{stableName:`Range`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { DateValidator } from '@dnb/eufemia/extensions/forms/Field/Date'`],__buildScope:{Field:a},children:`<Field.Date label="Label text" value="2023-01-16|2023-04-01" range />
`}),v=()=>(0,u.jsx)(c,{stableName:`AutoClose`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { DateValidator } from '@dnb/eufemia/extensions/forms/Field/Date'`],__buildScope:{Field:a},children:`<Field.Date label="Automatically Close" showCancelButton={false} />
`}),y=()=>(0,u.jsx)(c,{stableName:`DatePickerDateLimitValidation`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { DateValidator } from '@dnb/eufemia/extensions/forms/Field/Date'`],__buildScope:{Field:a},children:`<Field.Date
  value="2024-12-31|2025-02-01"
  minDate="2025-01-01"
  maxDate="2025-01-31"
  range
/>
`}),b=()=>(0,u.jsx)(c,{stableName:`ValidationExtendValidator`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { DateValidator } from '@dnb/eufemia/extensions/forms/Field/Date'`],__buildScope:{Field:a},noInline:!0,children:`const myDateValidator = (value: string) => {
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
`}),x=()=>(0,u.jsx)(c,{"data-visual-test":`date-width`,stableName:`Width`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { DateValidator } from '@dnb/eufemia/extensions/forms/Field/Date'`],__buildScope:{Form:i,Card:r,Field:a},children:`<Form.Card>
  <Field.String width="stretch" />
  <Field.Date label="default" />
  <Field.Date width="small" label="small" />
  <Field.Date width="medium" label="medium" />
  <Field.Date width="large" label="large" />
  <Field.Date width="stretch" label="stretch" />
</Form.Card>
`});function S(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...o(),...e.components},{VisibleWhenVisualTest:n}=t;return l||w(`Examples`,!1),v||w(`Examples.AutoClose`,!0),y||w(`Examples.DatePickerDateLimitValidation`,!0),m||w(`Examples.Disabled`,!0),f||w(`Examples.HorizontalLayout`,!0),d||w(`Examples.LabelAndValue`,!0),_||w(`Examples.Range`,!0),b||w(`Examples.ValidationExtendValidator`,!0),g||w(`Examples.ValidationRequired`,!0),x||w(`Examples.Width`,!0),h||w(`Examples.WithError`,!0),p||w(`Examples.WithHelp`,!0),n||w(`VisibleWhenVisualTest`,!0),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Demos`}),`
`,(0,u.jsx)(s,{bottom:!0,label:`Locale used in the demos:`,listUSLocale:!0}),`
`,(0,u.jsx)(t.h3,{children:`Label and value`}),`
`,(0,u.jsx)(d,{}),`
`,(0,u.jsx)(t.h3,{children:`With a horizontal layout`}),`
`,(0,u.jsx)(f,{}),`
`,(0,u.jsx)(t.h3,{children:`Date range`}),`
`,(0,u.jsx)(_,{}),`
`,(0,u.jsx)(t.h3,{children:`Automatically close picker`}),`
`,(0,u.jsx)(t.p,{children:`The calendar will be prevented from automatically closing when the submit or cancel buttons are visible, to ensure that the user is actually able to interact with them after date selection.`}),`
`,(0,u.jsxs)(t.p,{children:[`To enable the picker to close automatically, you have to set `,(0,u.jsx)(t.code,{children:`showCancelButton`}),` to `,(0,u.jsx)(t.code,{children:`false`}),`, to override the default behavior.`]}),`
`,(0,u.jsx)(v,{}),`
`,(0,u.jsx)(t.h3,{children:`With help`}),`
`,(0,u.jsx)(p,{}),`
`,(0,u.jsx)(t.h3,{children:`Disabled`}),`
`,(0,u.jsx)(m,{}),`
`,(0,u.jsx)(t.h3,{children:`Error`}),`
`,(0,u.jsx)(h,{}),`
`,(0,u.jsx)(t.h3,{children:`Date limit validation`}),`
`,(0,u.jsxs)(t.p,{children:[`The Date field will automatically display an error message if the selected date is before `,(0,u.jsx)(t.code,{children:`minDate`}),` or after `,(0,u.jsx)(t.code,{children:`maxDate`}),`.`]}),`
`,(0,u.jsx)(y,{}),`
`,(0,u.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,u.jsx)(g,{}),`
`,(0,u.jsx)(t.h3,{children:`Extend validation with custom validation function`}),`
`,(0,u.jsxs)(t.p,{children:[`You can `,(0,u.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/info/#validators`,children:`extend the existing validation`}),` (`,(0,u.jsx)(t.code,{children:`dateValidator`}),`) with your own validation function.`]}),`
`,(0,u.jsx)(b,{}),`
`,(0,u.jsx)(n,{children:(0,u.jsx)(x,{})})]})}function C(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(S,{...e})}):S(e)}function w(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{C as default};