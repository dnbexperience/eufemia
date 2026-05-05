import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-geTEYZ7b.js";import{Rr as r,p as i}from"./index-CMgyXmp3.js";var a=e({Disabled:()=>d,Empty:()=>s,HorizontalLayout:()=>l,Label:()=>c,TransformInAndOut:()=>m,ValidationExtendValidator:()=>h,ValidationRequired:()=>p,WithError:()=>f,WithHelp:()=>u}),o=t(),s=()=>(0,o.jsx)(n,{"data-visual-test":`expiry-empty`,children:`<Field.Expiry onChange={(expiry) => console.log('onChange', expiry)} />
`}),c=()=>(0,o.jsx)(n,{"data-visual-test":`expiry-with-value`,children:`<Field.Expiry
  value="0835"
  label="Label text"
  onChange={(expiry) => console.log('onChange', expiry)}
/>
`}),l=()=>(0,o.jsx)(n,{"data-visual-test":`expiry-horizontal-layout`,children:`<Field.Expiry
  value="0835"
  layout="horizontal"
  layoutOptions={{
    width: 'medium', // can be a rem value
  }}
/>
`}),u=()=>(0,o.jsx)(n,{"data-visual-test":`expiry-with-help`,children:`<Field.Expiry
  label="Label text"
  help={{
    title: 'Help is available',
    content:
      'Kindness and helping others will return to you when you least expect it, and maybe when you need it.',
  }}
  onChange={(expiry) => console.log('onChange', expiry)}
/>
`}),d=()=>(0,o.jsx)(n,{"data-visual-test":`expiry-disabled`,children:`<Field.Expiry
  value="0826"
  label="Label text"
  onChange={(expiry) => console.log('onChange', expiry)}
  disabled
/>
`}),f=()=>(0,o.jsx)(n,{"data-visual-test":`expiry-error`,children:`<Field.Expiry
  value="0326"
  label="Label text"
  onChange={(expiry) => console.log('onChange', expiry)}
  error={new Error('This is what is wrong...')}
/>
`}),p=()=>(0,o.jsx)(n,{children:`<Field.Expiry
  label="Label text"
  onChange={(expiry) => console.log('onChange', expiry)}
  required
  validateInitially
/>
`}),m=()=>(0,o.jsx)(n,{noInline:!0,children:`const transformOut = (internal, additionalArgs) => {
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
`}),h=()=>(0,o.jsx)(n,{noInline:!0,children:`const myExpiryValidator = (value: string) => {
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
`});function g(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...r(),...e.components};return a||v(`Examples`,!1),d||v(`Examples.Disabled`,!0),s||v(`Examples.Empty`,!0),l||v(`Examples.HorizontalLayout`,!0),c||v(`Examples.Label`,!0),m||v(`Examples.TransformInAndOut`,!0),h||v(`Examples.ValidationExtendValidator`,!0),p||v(`Examples.ValidationRequired`,!0),f||v(`Examples.WithError`,!0),u||v(`Examples.WithHelp`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsxs)(t.p,{children:[`The locale is what determines the components `,(0,o.jsx)(t.code,{children:`placeholder`}),` format .e.g. `,(0,o.jsx)(t.code,{children:`mm/åå`}),` in Norwegian, `,(0,o.jsx)(t.code,{children:`mm/yy`}),` in English.`]}),`
`,(0,o.jsx)(i,{bottom:!0,label:`Locale used in the demos:`,listUSLocale:!0}),`
`,(0,o.jsx)(t.p,{children:`English (US) is not included in Eufemia by default. You can include it like:`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-jsx`,children:`import enUS from '@dnb/eufemia/shared/locales/en-US'
<EufemiaProvider locale={enUS} ...>
	App
</EufemiaProvider>
`})}),`
`,(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Empty`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Label`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`With a horizontal layout`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`With help`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`Disabled`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`Error`}),`
`,(0,o.jsx)(f,{}),`
`,(0,o.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,o.jsx)(p,{}),`
`,(0,o.jsx)(t.h3,{children:`Transform in and out`}),`
`,(0,o.jsx)(t.p,{children:`This example demonstrates how to transform data when it enters and leaves the form field.`}),`
`,(0,o.jsxs)(t.p,{children:[`You can use the `,(0,o.jsx)(t.code,{children:`transformIn`}),` property to modify the incoming data before it is displayed in the field, and the `,(0,o.jsx)(t.code,{children:`transformOut`}),` property to adjust the data before it is submitted or processed.
When `,(0,o.jsx)(t.code,{children:`transformIn`}),` one can either return a simple value `,(0,o.jsx)(t.code,{children:`"0835"`}),` or an object `,(0,o.jsx)(t.code,{children:`{ month:"08", year:"35" }`}),`.`]}),`
`,(0,o.jsx)(m,{}),`
`,(0,o.jsx)(t.h3,{children:`Extend validation with custom validation function`}),`
`,(0,o.jsxs)(t.p,{children:[`You can `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/info/#validators`,children:`extend the existing validation`}),` (`,(0,o.jsx)(t.code,{children:`expiryValidator`}),`) with your own validation function.`]}),`
`,(0,o.jsx)(h,{})]})}function _(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(g,{...e})}):g(e)}function v(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{_ as default};