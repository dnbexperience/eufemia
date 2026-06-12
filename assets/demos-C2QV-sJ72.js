import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./Card-Dsou21Li.js";import{t as i}from"./Form-B9l6EvGx.js";import{t as a}from"./Field-DHicZJEj.js";import{t as o}from"./Tools-DabwYqKy.js";import{K as s,o as c}from"./index-CsG353ar.js";import{t as l}from"./ComponentBox-Cb1rLw_D.js";var u=e({Disabled:()=>g,Empty:()=>f,HorizontalLayout:()=>m,Label:()=>p,TransformInAndOut:()=>y,ValidationExtendValidator:()=>b,ValidationRequired:()=>v,WithError:()=>_,WithHelp:()=>h}),d=t(n()),f=()=>(0,d.jsx)(l,{"data-visual-test":`expiry-empty`,stableName:`Empty`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`,`import { ExpiryValidator } from '@dnb/eufemia/extensions/forms/Field/Expiry'`],__buildScope:{Field:a},children:`<Field.Expiry onChange={(expiry) => console.log('onChange', expiry)} />
`}),p=()=>(0,d.jsx)(l,{"data-visual-test":`expiry-with-value`,stableName:`Label`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`,`import { ExpiryValidator } from '@dnb/eufemia/extensions/forms/Field/Expiry'`],__buildScope:{Field:a},children:`<Field.Expiry
  value="0835"
  label="Label text"
  onChange={(expiry) => console.log('onChange', expiry)}
/>
`}),m=()=>(0,d.jsx)(l,{"data-visual-test":`expiry-horizontal-layout`,stableName:`HorizontalLayout`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`,`import { ExpiryValidator } from '@dnb/eufemia/extensions/forms/Field/Expiry'`],__buildScope:{Field:a},children:`<Field.Expiry
  value="0835"
  layout="horizontal"
  layoutOptions={{
    width: 'medium', // can be a rem value
  }}
/>
`}),h=()=>(0,d.jsx)(l,{"data-visual-test":`expiry-with-help`,stableName:`WithHelp`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`,`import { ExpiryValidator } from '@dnb/eufemia/extensions/forms/Field/Expiry'`],__buildScope:{Field:a},children:`<Field.Expiry
  label="Label text"
  help={{
    title: 'Help is available',
    content:
      'Kindness and helping others will return to you when you least expect it, and maybe when you need it.',
  }}
  onChange={(expiry) => console.log('onChange', expiry)}
/>
`}),g=()=>(0,d.jsx)(l,{"data-visual-test":`expiry-disabled`,stableName:`Disabled`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`,`import { ExpiryValidator } from '@dnb/eufemia/extensions/forms/Field/Expiry'`],__buildScope:{Field:a},children:`<Field.Expiry
  value="0826"
  label="Label text"
  onChange={(expiry) => console.log('onChange', expiry)}
  disabled
/>
`}),_=()=>(0,d.jsx)(l,{"data-visual-test":`expiry-error`,stableName:`WithError`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`,`import { ExpiryValidator } from '@dnb/eufemia/extensions/forms/Field/Expiry'`],__buildScope:{Field:a},children:`<Field.Expiry
  value="0326"
  label="Label text"
  onChange={(expiry) => console.log('onChange', expiry)}
  error={new Error('This is what is wrong...')}
/>
`}),v=()=>(0,d.jsx)(l,{stableName:`ValidationRequired`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`,`import { ExpiryValidator } from '@dnb/eufemia/extensions/forms/Field/Expiry'`],__buildScope:{Field:a},children:`<Field.Expiry
  label="Label text"
  onChange={(expiry) => console.log('onChange', expiry)}
  required
  validateInitially
/>
`}),y=()=>(0,d.jsx)(l,{stableName:`TransformInAndOut`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`,`import { ExpiryValidator } from '@dnb/eufemia/extensions/forms/Field/Expiry'`],__buildScope:{Form:i,Card:r,Field:a,Tools:o},noInline:!0,children:`const transformOut = (internal, additionalArgs) => {
  const { year, month } = additionalArgs
  return {
    year,
    month,
  }
}
const transformIn = (external) => {
  if (external) {
    const { year, month } = external
    return {
      year,
      month,
    }
  }
}
render(
  <Form.Handler
    defaultData={{
      myField: {
        year: '35',
        month: '08',
      },
    }}
  >
    <Form.Card>
      <Field.Expiry
        path="/myField"
        transformOut={transformOut}
        transformIn={transformIn}
        label="Transform in and out"
      />
      <Tools.Log />
    </Form.Card>
  </Form.Handler>
)
`}),b=()=>(0,d.jsx)(l,{stableName:`ValidationExtendValidator`,sourceImports:[`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`,`import { ExpiryValidator } from '@dnb/eufemia/extensions/forms/Field/Expiry'`],__buildScope:{Field:a},noInline:!0,children:`const myExpiryValidator = (value: string) => {
  if (value?.startsWith('12')) {
    return new Error('Expiry month cannot be december')
  }
}

// Keep the built-in validator while banning December.
const myOnBlurValidator: ExpiryValidator = (
  value: string,
  { validators }
) => {
  const { expiryValidator } = validators
  return [myExpiryValidator, expiryValidator]
}
render(
  <Field.Expiry
    value="1225"
    // @ts-expect-error -- strictFunctionTypes
    onBlurValidator={myOnBlurValidator}
  />
)
`});function x(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...s(),...e.components};return u||C(`Examples`,!1),g||C(`Examples.Disabled`,!0),f||C(`Examples.Empty`,!0),m||C(`Examples.HorizontalLayout`,!0),p||C(`Examples.Label`,!0),y||C(`Examples.TransformInAndOut`,!0),b||C(`Examples.ValidationExtendValidator`,!0),v||C(`Examples.ValidationRequired`,!0),_||C(`Examples.WithError`,!0),h||C(`Examples.WithHelp`,!0),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(t.h2,{children:`Demos`}),`
`,(0,d.jsxs)(t.p,{children:[`The locale is what determines the components `,(0,d.jsx)(t.code,{children:`placeholder`}),` format .e.g. `,(0,d.jsx)(t.code,{children:`mm/åå`}),` in Norwegian, `,(0,d.jsx)(t.code,{children:`mm/yy`}),` in English.`]}),`
`,(0,d.jsx)(c,{bottom:!0,label:`Locale used in the demos:`,listUSLocale:!0}),`
`,(0,d.jsx)(t.p,{children:`English (US) is not included in Eufemia by default. You can include it like:`}),`
`,(0,d.jsx)(t.pre,{children:(0,d.jsx)(t.code,{className:`language-jsx`,children:`import enUS from '@dnb/eufemia/shared/locales/en-US'
<EufemiaProvider locale={enUS} ...>
	App
</EufemiaProvider>
`})}),`
`,(0,d.jsx)(t.h2,{children:`Demos`}),`
`,(0,d.jsx)(t.h3,{children:`Empty`}),`
`,(0,d.jsx)(f,{}),`
`,(0,d.jsx)(t.h3,{children:`Label`}),`
`,(0,d.jsx)(p,{}),`
`,(0,d.jsx)(t.h3,{children:`With a horizontal layout`}),`
`,(0,d.jsx)(m,{}),`
`,(0,d.jsx)(t.h3,{children:`With help`}),`
`,(0,d.jsx)(h,{}),`
`,(0,d.jsx)(t.h3,{children:`Disabled`}),`
`,(0,d.jsx)(g,{}),`
`,(0,d.jsx)(t.h3,{children:`Error`}),`
`,(0,d.jsx)(_,{}),`
`,(0,d.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,d.jsx)(v,{}),`
`,(0,d.jsx)(t.h3,{children:`Transform in and out`}),`
`,(0,d.jsx)(t.p,{children:`This example demonstrates how to transform data when it enters and leaves the form field.`}),`
`,(0,d.jsxs)(t.p,{children:[`You can use the `,(0,d.jsx)(t.code,{children:`transformIn`}),` property to modify the incoming data before it is displayed in the field, and the `,(0,d.jsx)(t.code,{children:`transformOut`}),` property to adjust the data before it is submitted or processed.
When `,(0,d.jsx)(t.code,{children:`transformIn`}),` one can either return a simple value `,(0,d.jsx)(t.code,{children:`"0835"`}),` or an object `,(0,d.jsx)(t.code,{children:`{ month:"08", year:"35" }`}),`.`]}),`
`,(0,d.jsx)(y,{}),`
`,(0,d.jsx)(t.h3,{children:`Extend validation with custom validation function`}),`
`,(0,d.jsxs)(t.p,{children:[`You can `,(0,d.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/info/#validators`,children:`extend the existing validation`}),` (`,(0,d.jsx)(t.code,{children:`expiryValidator`}),`) with your own validation function.`]}),`
`,(0,d.jsx)(b,{})]})}function S(e={}){let{wrapper:t}={...s(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(x,{...e})}):x(e)}function C(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{S as default};