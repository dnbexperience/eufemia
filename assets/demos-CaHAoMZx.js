import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{o as i,zr as a}from"./index-DqqByKA2.js";var o=t({Disabled:()=>f,Empty:()=>c,HorizontalLayout:()=>u,Label:()=>l,TransformInAndOut:()=>h,ValidationExtendValidator:()=>g,ValidationRequired:()=>m,WithError:()=>p,WithHelp:()=>d}),s=e(n()),c=()=>(0,s.jsx)(r,{"data-visual-test":`expiry-empty`,stableName:`Empty`,children:`<Field.Expiry onChange={(expiry) => console.log('onChange', expiry)} />
`}),l=()=>(0,s.jsx)(r,{"data-visual-test":`expiry-with-value`,stableName:`Label`,children:`<Field.Expiry
  value="0835"
  label="Label text"
  onChange={(expiry) => console.log('onChange', expiry)}
/>
`}),u=()=>(0,s.jsx)(r,{"data-visual-test":`expiry-horizontal-layout`,stableName:`HorizontalLayout`,children:`<Field.Expiry
  value="0835"
  layout="horizontal"
  layoutOptions={{
    width: 'medium', // can be a rem value
  }}
/>
`}),d=()=>(0,s.jsx)(r,{"data-visual-test":`expiry-with-help`,stableName:`WithHelp`,children:`<Field.Expiry
  label="Label text"
  help={{
    title: 'Help is available',
    content:
      'Kindness and helping others will return to you when you least expect it, and maybe when you need it.',
  }}
  onChange={(expiry) => console.log('onChange', expiry)}
/>
`}),f=()=>(0,s.jsx)(r,{"data-visual-test":`expiry-disabled`,stableName:`Disabled`,children:`<Field.Expiry
  value="0826"
  label="Label text"
  onChange={(expiry) => console.log('onChange', expiry)}
  disabled
/>
`}),p=()=>(0,s.jsx)(r,{"data-visual-test":`expiry-error`,stableName:`WithError`,children:`<Field.Expiry
  value="0326"
  label="Label text"
  onChange={(expiry) => console.log('onChange', expiry)}
  error={new Error('This is what is wrong...')}
/>
`}),m=()=>(0,s.jsx)(r,{stableName:`ValidationRequired`,children:`<Field.Expiry
  label="Label text"
  onChange={(expiry) => console.log('onChange', expiry)}
  required
  validateInitially
/>
`}),h=()=>(0,s.jsx)(r,{stableName:`TransformInAndOut`,noInline:!0,children:`const transformOut = (internal, additionalArgs) => {
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
`}),g=()=>(0,s.jsx)(r,{stableName:`ValidationExtendValidator`,noInline:!0,children:`const myExpiryValidator = (value: string) => {
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
`});function _(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...a(),...e.components};return o||y(`Examples`,!1),f||y(`Examples.Disabled`,!0),c||y(`Examples.Empty`,!0),u||y(`Examples.HorizontalLayout`,!0),l||y(`Examples.Label`,!0),h||y(`Examples.TransformInAndOut`,!0),g||y(`Examples.ValidationExtendValidator`,!0),m||y(`Examples.ValidationRequired`,!0),p||y(`Examples.WithError`,!0),d||y(`Examples.WithHelp`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsxs)(t.p,{children:[`The locale is what determines the components `,(0,s.jsx)(t.code,{children:`placeholder`}),` format .e.g. `,(0,s.jsx)(t.code,{children:`mm/åå`}),` in Norwegian, `,(0,s.jsx)(t.code,{children:`mm/yy`}),` in English.`]}),`
`,(0,s.jsx)(i,{bottom:!0,label:`Locale used in the demos:`,listUSLocale:!0}),`
`,(0,s.jsx)(t.p,{children:`English (US) is not included in Eufemia by default. You can include it like:`}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-jsx`,children:`import enUS from '@dnb/eufemia/shared/locales/en-US'
<EufemiaProvider locale={enUS} ...>
	App
</EufemiaProvider>
`})}),`
`,(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`Empty`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h3,{children:`Label`}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsx)(t.h3,{children:`With a horizontal layout`}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsx)(t.h3,{children:`With help`}),`
`,(0,s.jsx)(d,{}),`
`,(0,s.jsx)(t.h3,{children:`Disabled`}),`
`,(0,s.jsx)(f,{}),`
`,(0,s.jsx)(t.h3,{children:`Error`}),`
`,(0,s.jsx)(p,{}),`
`,(0,s.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,s.jsx)(m,{}),`
`,(0,s.jsx)(t.h3,{children:`Transform in and out`}),`
`,(0,s.jsx)(t.p,{children:`This example demonstrates how to transform data when it enters and leaves the form field.`}),`
`,(0,s.jsxs)(t.p,{children:[`You can use the `,(0,s.jsx)(t.code,{children:`transformIn`}),` property to modify the incoming data before it is displayed in the field, and the `,(0,s.jsx)(t.code,{children:`transformOut`}),` property to adjust the data before it is submitted or processed.
When `,(0,s.jsx)(t.code,{children:`transformIn`}),` one can either return a simple value `,(0,s.jsx)(t.code,{children:`"0835"`}),` or an object `,(0,s.jsx)(t.code,{children:`{ month:"08", year:"35" }`}),`.`]}),`
`,(0,s.jsx)(h,{}),`
`,(0,s.jsx)(t.h3,{children:`Extend validation with custom validation function`}),`
`,(0,s.jsxs)(t.p,{children:[`You can `,(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/info/#validators`,children:`extend the existing validation`}),` (`,(0,s.jsx)(t.code,{children:`expiryValidator`}),`) with your own validation function.`]}),`
`,(0,s.jsx)(g,{})]})}function v(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(_,{...e})}):_(e)}function y(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{v as default};