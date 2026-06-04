import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./Field-CbVmykdw.js";import{W as i}from"./index-D7e1avVt.js";import{t as a}from"./ComponentBox-CE7bpcJy.js";var o=e({Disabled:()=>m,Empty:()=>c,Label:()=>d,LabelAndValue:()=>f,OmitMask:()=>l,Placeholder:()=>u,ValidationExtendValidator:()=>_,ValidationRequired:()=>g,WithError:()=>h,WithHelp:()=>p}),s=t(n()),c=()=>(0,s.jsx)(a,{stableName:`Empty`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`,`import { OrganizationNumberValidator } from '@dnb/eufemia/extensions/forms/Field/OrganizationNumber'`],__buildScope:{Field:r},children:`<Field.OrganizationNumber
  onChange={(value) => console.log('onChange', value)}
/>
`}),l=()=>(0,s.jsx)(a,{stableName:`OmitMask`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`,`import { OrganizationNumberValidator } from '@dnb/eufemia/extensions/forms/Field/OrganizationNumber'`],__buildScope:{Field:r},children:`<Field.OrganizationNumber
  onChange={(value) => console.log('onChange', value)}
  omitMask
/>
`}),u=()=>(0,s.jsx)(a,{stableName:`Placeholder`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`,`import { OrganizationNumberValidator } from '@dnb/eufemia/extensions/forms/Field/OrganizationNumber'`],__buildScope:{Field:r},children:`<Field.OrganizationNumber
  placeholder="Enter 9 digits..."
  onChange={(value) => console.log('onChange', value)}
/>
`}),d=()=>(0,s.jsx)(a,{stableName:`Label`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`,`import { OrganizationNumberValidator } from '@dnb/eufemia/extensions/forms/Field/OrganizationNumber'`],__buildScope:{Field:r},children:`<Field.OrganizationNumber
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
/>
`}),f=()=>(0,s.jsx)(a,{stableName:`LabelAndValue`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`,`import { OrganizationNumberValidator } from '@dnb/eufemia/extensions/forms/Field/OrganizationNumber'`],__buildScope:{Field:r},children:`<Field.OrganizationNumber
  label="Label text"
  value="987654321"
  onChange={(value) => console.log('onChange', value)}
/>
`}),p=()=>(0,s.jsx)(a,{stableName:`WithHelp`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`,`import { OrganizationNumberValidator } from '@dnb/eufemia/extensions/forms/Field/OrganizationNumber'`],__buildScope:{Field:r},children:`<Field.OrganizationNumber
  label="Label text"
  value="987654321"
  help={{
    title: 'Help is available',
    content:
      'Success has nothing to do with what you gain in life or accomplish for yourself. It’s what you do for others.',
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),m=()=>(0,s.jsx)(a,{stableName:`Disabled`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`,`import { OrganizationNumberValidator } from '@dnb/eufemia/extensions/forms/Field/OrganizationNumber'`],__buildScope:{Field:r},children:`<Field.OrganizationNumber
  value="989898989"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),h=()=>(0,s.jsx)(a,{stableName:`WithError`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`,`import { OrganizationNumberValidator } from '@dnb/eufemia/extensions/forms/Field/OrganizationNumber'`],__buildScope:{Field:r},children:`<Field.OrganizationNumber
  value="007"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),g=()=>(0,s.jsx)(a,{stableName:`ValidationRequired`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`,`import { OrganizationNumberValidator } from '@dnb/eufemia/extensions/forms/Field/OrganizationNumber'`],__buildScope:{Field:r},children:`<Field.OrganizationNumber
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  required
  validateInitially
/>
`}),_=()=>(0,s.jsx)(a,{stableName:`ValidationExtendValidator`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`,`import { OrganizationNumberValidator } from '@dnb/eufemia/extensions/forms/Field/OrganizationNumber'`],__buildScope:{Field:r},noInline:!0,children:`const firstDigitIs1Validator = (value: string) => {
  if (value.substring(0, 1) !== '1') {
    return new Error('First digit is not 1')
  }
}

// Keep the built-in validator while requiring the first digit.
const myValidator: OrganizationNumberValidator = (
  value,
  { validators }
) => {
  const { organizationNumberValidator } = validators
  return [organizationNumberValidator, firstDigitIs1Validator]
}
render(
  <Field.OrganizationNumber
    required
    value="991541209"
    onBlurValidator={myValidator}
    validateInitially
  />
)
`});function v(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...i(),...e.components};return o||b(`Examples`,!1),m||b(`Examples.Disabled`,!0),c||b(`Examples.Empty`,!0),d||b(`Examples.Label`,!0),f||b(`Examples.LabelAndValue`,!0),l||b(`Examples.OmitMask`,!0),u||b(`Examples.Placeholder`,!0),_||b(`Examples.ValidationExtendValidator`,!0),g||b(`Examples.ValidationRequired`,!0),h||b(`Examples.WithError`,!0),p||b(`Examples.WithHelp`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`Empty`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h3,{children:`Omit mask`}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsx)(t.h3,{children:`Label`}),`
`,(0,s.jsx)(d,{}),`
`,(0,s.jsx)(t.h3,{children:`Label and value`}),`
`,(0,s.jsx)(f,{}),`
`,(0,s.jsx)(t.h3,{children:`With help`}),`
`,(0,s.jsx)(p,{}),`
`,(0,s.jsx)(t.h3,{children:`Disabled`}),`
`,(0,s.jsx)(m,{}),`
`,(0,s.jsx)(t.h3,{children:`Error`}),`
`,(0,s.jsx)(h,{}),`
`,(0,s.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,s.jsx)(g,{}),`
`,(0,s.jsx)(t.h3,{children:`Extend validation with custom validation function`}),`
`,(0,s.jsxs)(t.p,{children:[`You can `,(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/info/#validators`,children:`extend the existing validation`}),`(`,(0,s.jsx)(t.code,{children:`organizationNumberValidator`}),`) with your own validation function.`]}),`
`,(0,s.jsx)(_,{})]})}function y(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(v,{...e})}):v(e)}function b(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{y as default};