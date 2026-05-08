import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-C64JNWnl.js";import{Lr as r,s as i}from"./index-2AO2Cu5K.js";var a=e({Disabled:()=>d,Empty:()=>s,InForm:()=>g,Label:()=>c,LabelAndValue:()=>l,TransformInAndOut:()=>_,ValidationExtendValidator:()=>m,ValidationRequired:()=>p,Width:()=>h,WithError:()=>f,WithHelp:()=>u}),o=t(),s=()=>(0,o.jsx)(n,{"data-visual-test":`date-of-birth-default`,children:`<Field.DateOfBirth
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
`}),c=()=>(0,o.jsx)(n,{children:`<Field.DateOfBirth
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
/>
`}),l=()=>(0,o.jsx)(n,{"data-visual-test":`date-of-birth-label-and-value`,children:`<Field.DateOfBirth
  label="Label text"
  value="2000-05-17"
  onChange={(value) => console.log('onChange', value)}
/>
`}),u=()=>(0,o.jsx)(n,{"data-visual-test":`date-of-birth-help`,children:`<Field.DateOfBirth
  label="Label text"
  value="2000-05-17"
  help={{
    title: 'Help is available',
    content:
      'The real point is that we all need help somewhere along life’s path whether we think we will or not. And, if you are the one giving and helping, just remember this: no matter what happens later, you will always be secure in the fact knowing that you have remained strong and true to assist those that need your help.',
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),d=()=>(0,o.jsx)(n,{"data-visual-test":`date-of-birth-disabled`,children:`<Field.DateOfBirth
  value="2000-05-17"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),f=()=>(0,o.jsx)(n,{"data-visual-test":`date-of-birth-error`,children:`<Field.DateOfBirth
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),p=()=>(0,o.jsx)(n,{children:`<Field.DateOfBirth
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  required
  validateInitially
/>
`}),m=()=>(0,o.jsx)(n,{noInline:!0,children:`const firstDigitIs1Validator = (value: string) => {
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
`}),h=()=>(0,o.jsx)(n,{"data-visual-test":`date-of-birth-width`,children:`<Form.Card>
  <Field.String width="stretch" />
  <Field.DateOfBirth label="default" />
  <Field.DateOfBirth width="large" label="large" />
  <Field.DateOfBirth width="stretch" label="stretch" />
</Form.Card>
`}),g=()=>(0,o.jsx)(n,{"data-visual-test":`date-of-birth-in-form`,children:`<Form.Handler
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
`}),_=()=>(0,o.jsx)(n,{noInline:!0,children:`const transformOut = (internal, additionalArgs) => {
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
`});function v(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...r(),...e.components},{VisibleWhenVisualTest:n}=t;return a||b(`Examples`,!1),d||b(`Examples.Disabled`,!0),s||b(`Examples.Empty`,!0),g||b(`Examples.InForm`,!0),c||b(`Examples.Label`,!0),l||b(`Examples.LabelAndValue`,!0),_||b(`Examples.TransformInAndOut`,!0),m||b(`Examples.ValidationExtendValidator`,!0),p||b(`Examples.ValidationRequired`,!0),h||b(`Examples.Width`,!0),f||b(`Examples.WithError`,!0),u||b(`Examples.WithHelp`,!0),n||b(`VisibleWhenVisualTest`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(i,{bottom:!0,label:`Locale used in the demos:`,listUSLocale:!0}),`
`,(0,o.jsx)(t.h3,{children:`Empty`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Label`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Label and value`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`With help`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`Disabled`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`Error`}),`
`,(0,o.jsx)(f,{}),`
`,(0,o.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,o.jsx)(p,{}),`
`,(0,o.jsx)(t.h3,{children:`Extend validation with custom validation function`}),`
`,(0,o.jsxs)(t.p,{children:[`You can `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/info/#validators`,children:`extend the existing validation`}),` (`,(0,o.jsx)(t.code,{children:`dateOfBirthValidator`}),`) with your own validation function.`]}),`
`,(0,o.jsx)(m,{}),`
`,(0,o.jsx)(n,{children:(0,o.jsx)(h,{})}),`
`,(0,o.jsx)(t.h3,{children:`Path usage`}),`
`,(0,o.jsx)(g,{}),`
`,(0,o.jsx)(t.h3,{children:`Transform in and out`}),`
`,(0,o.jsxs)(t.p,{children:[`You can use `,(0,o.jsx)(t.code,{children:`transformIn`}),` and `,(0,o.jsx)(t.code,{children:`transformOut`}),` to transform data between external and internal formats.`]}),`
`,(0,o.jsx)(_,{})]})}function y(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(v,{...e})}):v(e)}function b(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{y as default};