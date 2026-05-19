import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{o as i,zr as a}from"./index-DqqByKA2.js";var o=t({Disabled:()=>f,Empty:()=>c,InForm:()=>_,Label:()=>l,LabelAndValue:()=>u,TransformInAndOut:()=>v,ValidationExtendValidator:()=>h,ValidationRequired:()=>m,Width:()=>g,WithError:()=>p,WithHelp:()=>d}),s=e(n()),c=()=>(0,s.jsx)(r,{"data-visual-test":`date-of-birth-default`,stableName:`Empty`,children:`<Field.DateOfBirth
  onChange={(value, additionalArgs) => {
    {
      const { day, month, year } = additionalArgs || {}
      console.log('onChange', value, {
        day,
        month,
        year,
      })
    }
  }}
  onDayChange={(day) => console.log('onDayChange', day)}
  onMonthChange={(month) => console.log('onMonthChange', month)}
  onYearChange={(year) => console.log('onYearChange', year)}
/>
`}),l=()=>(0,s.jsx)(r,{stableName:`Label`,children:`<Field.DateOfBirth
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
/>
`}),u=()=>(0,s.jsx)(r,{"data-visual-test":`date-of-birth-label-and-value`,stableName:`LabelAndValue`,children:`<Field.DateOfBirth
  label="Label text"
  value="2000-05-17"
  onChange={(value) => console.log('onChange', value)}
/>
`}),d=()=>(0,s.jsx)(r,{"data-visual-test":`date-of-birth-help`,stableName:`WithHelp`,children:`<Field.DateOfBirth
  label="Label text"
  value="2000-05-17"
  help={{
    title: 'Help is available',
    content:
      'The real point is that we all need help somewhere along life’s path whether we think we will or not. And, if you are the one giving and helping, just remember this: no matter what happens later, you will always be secure in the fact knowing that you have remained strong and true to assist those that need your help.',
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),f=()=>(0,s.jsx)(r,{"data-visual-test":`date-of-birth-disabled`,stableName:`Disabled`,children:`<Field.DateOfBirth
  value="2000-05-17"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),p=()=>(0,s.jsx)(r,{"data-visual-test":`date-of-birth-error`,stableName:`WithError`,children:`<Field.DateOfBirth
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),m=()=>(0,s.jsx)(r,{stableName:`ValidationRequired`,children:`<Field.DateOfBirth
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  required
  validateInitially
/>
`}),h=()=>(0,s.jsx)(r,{stableName:`ValidationExtendValidator`,noInline:!0,children:`const firstDigitIs1Validator = (value: string) => {
  if (value.substring(0, 4) !== '1990') {
    return new Error('Has to be born in the year 1990!')
  }
}

// Keep the default validator and add a custom year rule.
const myValidator: DateOfBirthValidator = (value, { validators }) => {
  const { dateOfBirthValidator } = validators
  return [dateOfBirthValidator, firstDigitIs1Validator]
}
render(
  <Field.DateOfBirth
    required
    value="2000-05-17"
    // @ts-expect-error -- strictFunctionTypes
    onBlurValidator={myValidator}
    validateInitially
  />
)
`}),g=()=>(0,s.jsx)(r,{"data-visual-test":`date-of-birth-width`,stableName:`Width`,children:`<Form.Card>
  <Field.String width="stretch" />
  <Field.DateOfBirth label="default" />
  <Field.DateOfBirth width="large" label="large" />
  <Field.DateOfBirth width="stretch" label="stretch" />
</Form.Card>
`}),_=()=>(0,s.jsx)(r,{"data-visual-test":`date-of-birth-in-form`,stableName:`InForm`,children:`<Form.Handler
  onSubmit={console.log}
  data={{
    dob: '2000-05-17',
  }}
>
  <Form.Card>
    <Field.DateOfBirth path="/dob" />

    <Value.DateOfBirth path="/dob" showEmpty />

    <Tools.Log />
  </Form.Card>
  <Form.SubmitButton />
</Form.Handler>
`}),v=()=>(0,s.jsx)(r,{stableName:`TransformInAndOut`,noInline:!0,children:`const transformOut = (internal, additionalArgs) => {
  if (additionalArgs) {
    const { year, month, day } = additionalArgs
    return {
      year,
      month,
      day,
    }
  }
}
const transformIn = (external) => {
  if (external) {
    const { year, month, day } = external
    return \`\${year}-\${month}-\${day}\`
  }
}
render(
  <Form.Handler
    defaultData={{
      myField: {
        year: '1990',
        month: '05',
        day: '15',
      },
    }}
  >
    <Form.Card>
      <Field.DateOfBirth
        path="/myField"
        transformOut={transformOut}
        transformIn={transformIn}
        label="Transform in and out"
      />
      <Tools.Log />
    </Form.Card>
  </Form.Handler>
)
`});function y(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...a(),...e.components},{VisibleWhenVisualTest:n}=t;return o||x(`Examples`,!1),f||x(`Examples.Disabled`,!0),c||x(`Examples.Empty`,!0),_||x(`Examples.InForm`,!0),l||x(`Examples.Label`,!0),u||x(`Examples.LabelAndValue`,!0),v||x(`Examples.TransformInAndOut`,!0),h||x(`Examples.ValidationExtendValidator`,!0),m||x(`Examples.ValidationRequired`,!0),g||x(`Examples.Width`,!0),p||x(`Examples.WithError`,!0),d||x(`Examples.WithHelp`,!0),n||x(`VisibleWhenVisualTest`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(i,{bottom:!0,label:`Locale used in the demos:`,listUSLocale:!0}),`
`,(0,s.jsx)(t.h3,{children:`Empty`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h3,{children:`Label`}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsx)(t.h3,{children:`Label and value`}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsx)(t.h3,{children:`With help`}),`
`,(0,s.jsx)(d,{}),`
`,(0,s.jsx)(t.h3,{children:`Disabled`}),`
`,(0,s.jsx)(f,{}),`
`,(0,s.jsx)(t.h3,{children:`Error`}),`
`,(0,s.jsx)(p,{}),`
`,(0,s.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,s.jsx)(m,{}),`
`,(0,s.jsx)(t.h3,{children:`Extend validation with custom validation function`}),`
`,(0,s.jsxs)(t.p,{children:[`You can `,(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/info/#validators`,children:`extend the existing validation`}),` (`,(0,s.jsx)(t.code,{children:`dateOfBirthValidator`}),`) with your own validation function.`]}),`
`,(0,s.jsx)(h,{}),`
`,(0,s.jsx)(n,{children:(0,s.jsx)(g,{})}),`
`,(0,s.jsx)(t.h3,{children:`Path usage`}),`
`,(0,s.jsx)(_,{}),`
`,(0,s.jsx)(t.h3,{children:`Transform in and out`}),`
`,(0,s.jsxs)(t.p,{children:[`You can use `,(0,s.jsx)(t.code,{children:`transformIn`}),` and `,(0,s.jsx)(t.code,{children:`transformOut`}),` to transform data between external and internal formats.`]}),`
`,(0,s.jsx)(v,{})]})}function b(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(y,{...e})}):y(e)}function x(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{b as default};