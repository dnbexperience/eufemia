import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{j as r,l as i,v as a,w as o}from"./forms-CsJzlVUF.js";import{t as s}from"./Card-DP9KYSzC.js";import{B as c,f as l}from"./index-DdG6L_K8.js";import{t as u}from"./ComponentBox-q_23Ylzi.js";var d=e({Disabled:()=>_,Empty:()=>p,InForm:()=>S,Label:()=>m,LabelAndValue:()=>h,TransformInAndOut:()=>C,ValidationExtendValidator:()=>b,ValidationRequired:()=>y,Width:()=>x,WithError:()=>v,WithHelp:()=>g}),f=t(n()),p=()=>(0,f.jsx)(u,{"data-visual-test":`date-of-birth-default`,stableName:`Empty`,sourceImports:[`import { Value, Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`,`import { DateOfBirthValidator } from '@dnb/eufemia/extensions/forms/Field/DateOfBirth'`],__buildScope:{Field:r},children:`<Field.DateOfBirth
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
`}),m=()=>(0,f.jsx)(u,{stableName:`Label`,sourceImports:[`import { Value, Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`,`import { DateOfBirthValidator } from '@dnb/eufemia/extensions/forms/Field/DateOfBirth'`],__buildScope:{Field:r},children:`<Field.DateOfBirth
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
/>
`}),h=()=>(0,f.jsx)(u,{"data-visual-test":`date-of-birth-label-and-value`,stableName:`LabelAndValue`,sourceImports:[`import { Value, Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`,`import { DateOfBirthValidator } from '@dnb/eufemia/extensions/forms/Field/DateOfBirth'`],__buildScope:{Field:r},children:`<Field.DateOfBirth
  label="Label text"
  value="2000-05-17"
  onChange={(value) => console.log('onChange', value)}
/>
`}),g=()=>(0,f.jsx)(u,{"data-visual-test":`date-of-birth-help`,stableName:`WithHelp`,sourceImports:[`import { Value, Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`,`import { DateOfBirthValidator } from '@dnb/eufemia/extensions/forms/Field/DateOfBirth'`],__buildScope:{Field:r},children:`<Field.DateOfBirth
  label="Label text"
  value="2000-05-17"
  help={{
    title: 'Help is available',
    content:
      'The real point is that we all need help somewhere along life’s path whether we think we will or not. And, if you are the one giving and helping, just remember this: no matter what happens later, you will always be secure in the fact knowing that you have remained strong and true to assist those that need your help.',
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),_=()=>(0,f.jsx)(u,{"data-visual-test":`date-of-birth-disabled`,stableName:`Disabled`,sourceImports:[`import { Value, Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`,`import { DateOfBirthValidator } from '@dnb/eufemia/extensions/forms/Field/DateOfBirth'`],__buildScope:{Field:r},children:`<Field.DateOfBirth
  value="2000-05-17"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),v=()=>(0,f.jsx)(u,{"data-visual-test":`date-of-birth-error`,stableName:`WithError`,sourceImports:[`import { Value, Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`,`import { DateOfBirthValidator } from '@dnb/eufemia/extensions/forms/Field/DateOfBirth'`],__buildScope:{Field:r},children:`<Field.DateOfBirth
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),y=()=>(0,f.jsx)(u,{stableName:`ValidationRequired`,sourceImports:[`import { Value, Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`,`import { DateOfBirthValidator } from '@dnb/eufemia/extensions/forms/Field/DateOfBirth'`],__buildScope:{Field:r},children:`<Field.DateOfBirth
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  required
  validateInitially
/>
`}),b=()=>(0,f.jsx)(u,{stableName:`ValidationExtendValidator`,sourceImports:[`import { Value, Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`,`import { DateOfBirthValidator } from '@dnb/eufemia/extensions/forms/Field/DateOfBirth'`],__buildScope:{Field:r},noInline:!0,children:`const firstDigitIs1Validator = (value: string) => {
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
`}),x=()=>(0,f.jsx)(u,{"data-visual-test":`date-of-birth-width`,stableName:`Width`,sourceImports:[`import { Value, Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`,`import { DateOfBirthValidator } from '@dnb/eufemia/extensions/forms/Field/DateOfBirth'`],__buildScope:{Form:o,Card:s,Field:r},children:`<Form.Card>
  <Field.String width="stretch" />
  <Field.DateOfBirth label="default" />
  <Field.DateOfBirth width="large" label="large" />
  <Field.DateOfBirth width="stretch" label="stretch" />
</Form.Card>
`}),S=()=>(0,f.jsx)(u,{"data-visual-test":`date-of-birth-in-form`,stableName:`InForm`,sourceImports:[`import { Value, Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`,`import { DateOfBirthValidator } from '@dnb/eufemia/extensions/forms/Field/DateOfBirth'`],__buildScope:{Form:o,Card:s,Field:r,Value:a,Tools:i},children:`<Form.Handler
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
`}),C=()=>(0,f.jsx)(u,{stableName:`TransformInAndOut`,sourceImports:[`import { Value, Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`,`import { DateOfBirthValidator } from '@dnb/eufemia/extensions/forms/Field/DateOfBirth'`],__buildScope:{Form:o,Card:s,Field:r,Tools:i},noInline:!0,children:`const transformOut = (internal, additionalArgs) => {
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
`});function w(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...c(),...e.components},{VisibleWhenVisualTest:n}=t;return d||E(`Examples`,!1),_||E(`Examples.Disabled`,!0),p||E(`Examples.Empty`,!0),S||E(`Examples.InForm`,!0),m||E(`Examples.Label`,!0),h||E(`Examples.LabelAndValue`,!0),C||E(`Examples.TransformInAndOut`,!0),b||E(`Examples.ValidationExtendValidator`,!0),y||E(`Examples.ValidationRequired`,!0),x||E(`Examples.Width`,!0),v||E(`Examples.WithError`,!0),g||E(`Examples.WithHelp`,!0),n||E(`VisibleWhenVisualTest`,!0),(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(t.h2,{children:`Demos`}),`
`,(0,f.jsx)(l,{bottom:!0,label:`Locale used in the demos:`,listUSLocale:!0}),`
`,(0,f.jsx)(t.h3,{children:`Empty`}),`
`,(0,f.jsx)(p,{}),`
`,(0,f.jsx)(t.h3,{children:`Label`}),`
`,(0,f.jsx)(m,{}),`
`,(0,f.jsx)(t.h3,{children:`Label and value`}),`
`,(0,f.jsx)(h,{}),`
`,(0,f.jsx)(t.h3,{children:`With help`}),`
`,(0,f.jsx)(g,{}),`
`,(0,f.jsx)(t.h3,{children:`Disabled`}),`
`,(0,f.jsx)(_,{}),`
`,(0,f.jsx)(t.h3,{children:`Error`}),`
`,(0,f.jsx)(v,{}),`
`,(0,f.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,f.jsx)(y,{}),`
`,(0,f.jsx)(t.h3,{children:`Extend validation with custom validation function`}),`
`,(0,f.jsxs)(t.p,{children:[`You can `,(0,f.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/info/#validators`,children:`extend the existing validation`}),` (`,(0,f.jsx)(t.code,{children:`dateOfBirthValidator`}),`) with your own validation function.`]}),`
`,(0,f.jsx)(b,{}),`
`,(0,f.jsx)(n,{children:(0,f.jsx)(x,{})}),`
`,(0,f.jsx)(t.h3,{children:`Path usage`}),`
`,(0,f.jsx)(S,{}),`
`,(0,f.jsx)(t.h3,{children:`Transform in and out`}),`
`,(0,f.jsxs)(t.p,{children:[`You can use `,(0,f.jsx)(t.code,{children:`transformIn`}),` and `,(0,f.jsx)(t.code,{children:`transformOut`}),` to transform data between external and internal formats.`]}),`
`,(0,f.jsx)(C,{})]})}function T(e={}){let{wrapper:t}={...c(),...e.components};return t?(0,f.jsx)(t,{...e,children:(0,f.jsx)(w,{...e})}):w(e)}function E(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{T as default};