import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./Card-ClZNWqpG.js";import{t as i}from"./Form-C8lTzZqR.js";import{t as a}from"./Field-neGd0eKd.js";import{t as o}from"./Tools-B6PN-yHu.js";import{K as s}from"./index-Bx3ttow-.js";import{t as c}from"./ComponentBox-CG7uqrFy.js";var l=e({Disabled:()=>h,Empty:()=>d,HorizontalLayout:()=>p,Label:()=>f,ShowSeconds:()=>v,TransformInAndOut:()=>y,ValidationExtendValidator:()=>b,ValidationRequired:()=>_,WithError:()=>g,WithHelp:()=>m}),u=t(n()),d=()=>(0,u.jsx)(c,{"data-visual-test":`time-empty`,stableName:`Empty`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`,`import { TimeValidator } from '@dnb/eufemia/extensions/forms/Field/Time'`],__buildScope:{Field:a},children:`<Field.Time onChange={(time) => console.log('onChange', time)} />
`}),f=()=>(0,u.jsx)(c,{"data-visual-test":`time-with-value`,stableName:`Label`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`,`import { TimeValidator } from '@dnb/eufemia/extensions/forms/Field/Time'`],__buildScope:{Field:a},children:`<Field.Time
  value="14:30"
  label="Label text"
  onChange={(time) => console.log('onChange', time)}
/>
`}),p=()=>(0,u.jsx)(c,{"data-visual-test":`time-horizontal-layout`,stableName:`HorizontalLayout`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`,`import { TimeValidator } from '@dnb/eufemia/extensions/forms/Field/Time'`],__buildScope:{Field:a},children:`<Field.Time
  value="14:30"
  layout="horizontal"
  layoutOptions={{
    width: 'medium',
  }}
/>
`}),m=()=>(0,u.jsx)(c,{"data-visual-test":`time-with-help`,stableName:`WithHelp`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`,`import { TimeValidator } from '@dnb/eufemia/extensions/forms/Field/Time'`],__buildScope:{Field:a},children:`<Field.Time
  label="Label text"
  help={{
    title: 'Help is available',
    content: 'Enter the time using hours and minutes.',
  }}
  onChange={(time) => console.log('onChange', time)}
/>
`}),h=()=>(0,u.jsx)(c,{"data-visual-test":`time-disabled`,stableName:`Disabled`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`,`import { TimeValidator } from '@dnb/eufemia/extensions/forms/Field/Time'`],__buildScope:{Field:a},children:`<Field.Time
  value="14:30"
  label="Label text"
  onChange={(time) => console.log('onChange', time)}
  disabled
/>
`}),g=()=>(0,u.jsx)(c,{"data-visual-test":`time-error`,stableName:`WithError`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`,`import { TimeValidator } from '@dnb/eufemia/extensions/forms/Field/Time'`],__buildScope:{Field:a},children:`<Field.Time
  value="14:30"
  label="Label text"
  onChange={(time) => console.log('onChange', time)}
  error={new Error('This is what is wrong...')}
/>
`}),_=()=>(0,u.jsx)(c,{stableName:`ValidationRequired`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`,`import { TimeValidator } from '@dnb/eufemia/extensions/forms/Field/Time'`],__buildScope:{Field:a},children:`<Field.Time
  label="Label text"
  onChange={(time) => console.log('onChange', time)}
  required
  validateInitially
/>
`}),v=()=>(0,u.jsx)(c,{"data-visual-test":`time-with-seconds`,stableName:`ShowSeconds`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`,`import { TimeValidator } from '@dnb/eufemia/extensions/forms/Field/Time'`],__buildScope:{Field:a},children:`<Field.Time
  value="14:30:45"
  label="With seconds"
  showSeconds
  onChange={(time) => console.log('onChange', time)}
/>
`}),y=()=>(0,u.jsx)(c,{stableName:`TransformInAndOut`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`,`import { TimeValidator } from '@dnb/eufemia/extensions/forms/Field/Time'`],__buildScope:{Form:i,Card:r,Field:a,Tools:o},noInline:!0,children:`const transformOut = (internal, additionalArgs) => {
  const { hours, minutes } = additionalArgs
  return {
    hours,
    minutes,
  }
}
const transformIn = (external) => {
  if (external) {
    const { hours, minutes } = external
    return {
      hours,
      minutes,
    }
  }
}
render(
  <Form.Handler
    defaultData={{
      myField: {
        hours: '14',
        minutes: '30',
      },
    }}
  >
    <Form.Card>
      <Field.Time
        path="/myField"
        transformOut={transformOut}
        transformIn={transformIn}
        label="Transform in and out"
      />
      <Tools.Log />
    </Form.Card>
  </Form.Handler>
)
`}),b=()=>(0,u.jsx)(c,{stableName:`ValidationExtendValidator`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`,`import { TimeValidator } from '@dnb/eufemia/extensions/forms/Field/Time'`],__buildScope:{Field:a},noInline:!0,children:`const noMidnight = (value: string) => {
  if (value === '00:00') {
    return new Error('Midnight is not allowed')
  }
}
const myOnBlurValidator: TimeValidator = (
  value: string,
  { validators }
) => {
  const { timeValidator } = validators
  return [noMidnight, timeValidator]
}
render(
  <Field.Time
    value="00:00"
    // @ts-expect-error -- strictFunctionTypes
    onBlurValidator={myOnBlurValidator}
  />
)
`});function x(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...s(),...e.components};return l||C(`Examples`,!1),h||C(`Examples.Disabled`,!0),d||C(`Examples.Empty`,!0),p||C(`Examples.HorizontalLayout`,!0),f||C(`Examples.Label`,!0),v||C(`Examples.ShowSeconds`,!0),y||C(`Examples.TransformInAndOut`,!0),b||C(`Examples.ValidationExtendValidator`,!0),_||C(`Examples.ValidationRequired`,!0),g||C(`Examples.WithError`,!0),m||C(`Examples.WithHelp`,!0),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Demos`}),`
`,(0,u.jsx)(t.h3,{children:`Empty`}),`
`,(0,u.jsx)(d,{}),`
`,(0,u.jsx)(t.h3,{children:`Label`}),`
`,(0,u.jsx)(f,{}),`
`,(0,u.jsx)(t.h3,{children:`With a horizontal layout`}),`
`,(0,u.jsx)(p,{}),`
`,(0,u.jsx)(t.h3,{children:`With help`}),`
`,(0,u.jsx)(m,{}),`
`,(0,u.jsx)(t.h3,{children:`Disabled`}),`
`,(0,u.jsx)(h,{}),`
`,(0,u.jsx)(t.h3,{children:`Error`}),`
`,(0,u.jsx)(g,{}),`
`,(0,u.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,u.jsx)(_,{}),`
`,(0,u.jsx)(t.h3,{children:`With seconds`}),`
`,(0,u.jsx)(v,{}),`
`,(0,u.jsx)(t.h3,{children:`Transform in and out`}),`
`,(0,u.jsx)(t.p,{children:`This example demonstrates how to transform data when it enters and leaves the form field.`}),`
`,(0,u.jsxs)(t.p,{children:[`You can use the `,(0,u.jsx)(t.code,{children:`transformIn`}),` property to modify the incoming data before it is displayed in the field, and the `,(0,u.jsx)(t.code,{children:`transformOut`}),` property to adjust the data before it is submitted or processed.
When `,(0,u.jsx)(t.code,{children:`transformIn`}),` one can either return a simple value `,(0,u.jsx)(t.code,{children:`"14:30"`}),` or an object `,(0,u.jsx)(t.code,{children:`{ hours: "14", minutes: "30" }`}),`.`]}),`
`,(0,u.jsx)(y,{}),`
`,(0,u.jsx)(t.h3,{children:`Extend validation with custom validation function`}),`
`,(0,u.jsxs)(t.p,{children:[`You can `,(0,u.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/info/#validators`,children:`extend the existing validation`}),` (`,(0,u.jsx)(t.code,{children:`timeValidator`}),`) with your own validation function.`]}),`
`,(0,u.jsx)(b,{})]})}function S(e={}){let{wrapper:t}={...s(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(x,{...e})}):x(e)}function C(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{S as default};