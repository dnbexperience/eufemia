import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{j as r,l as i,v as a,w as o}from"./forms-CFi5-4x5.js";import{t as s}from"./Card-Db-Q1D3Y.js";import{U as c}from"./index-kfZVC31v.js";import{t as l}from"./ComponentBox-qLaLt9T0.js";var u=e({Disabled:()=>h,FilterCountries:()=>v,HorizontalLayout:()=>p,Opened:()=>b,OptionSelected:()=>f,TransformInAndOut:()=>y,ValidationRequired:()=>_,WithError:()=>g,WithHelp:()=>m}),d=t(n()),f=()=>(0,d.jsx)(l,{"data-visual-test":`select-country-vertical-layout`,stableName:`OptionSelected`,sourceImports:[`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.SelectCountry
  value="NO"
  onChange={(value, obj) => console.log('onChange', value, obj)}
/>
`}),p=()=>(0,d.jsx)(l,{"data-visual-test":`select-country-horizontal-layout`,stableName:`HorizontalLayout`,sourceImports:[`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.SelectCountry
  value="NO"
  layout="horizontal"
  layoutOptions={{
    width: '6rem',
  }}
/>
`}),m=()=>(0,d.jsx)(l,{stableName:`WithHelp`,sourceImports:[`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.SelectCountry
  value="NO"
  label="Label text"
  help={{
    title: 'Help is available',
    content:
      'Helping others, encouraging others, are often acts of being kind that have more meaning that you may realize.',
  }}
  onChange={(value, obj) => console.log('onChange', value, obj)}
/>
`}),h=()=>(0,d.jsx)(l,{stableName:`Disabled`,sourceImports:[`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.SelectCountry
  value="NO"
  label="Label text"
  onChange={(value, obj) => console.log('onChange', value, obj)}
  disabled
/>
`}),g=()=>(0,d.jsx)(l,{stableName:`WithError`,sourceImports:[`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.SelectCountry
  value="NO"
  label="Label text"
  onChange={(value, obj) => console.log('onChange', value, obj)}
  error={new Error('This is what is wrong...')}
/>
`}),_=()=>(0,d.jsx)(l,{stableName:`ValidationRequired`,sourceImports:[`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.SelectCountry
  label="Label text"
  onChange={(value, obj) => console.log('onChange', value, obj)}
  required
  validateInitially
  validateUnchanged
/>
`});function v(){return(0,d.jsx)(l,{stableName:`FilterCountries`,sourceImports:[`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.SelectCountry
  countries="Scandinavia"
  filterCountries={({ iso }) => iso !== 'DK'}
/>
`})}function y(){return(0,d.jsx)(l,{stableName:`TransformInAndOut`,sourceImports:[`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:o,Card:s,Field:r,Value:a,Tools:i},noInline:!0,children:`// From the Field (internal value) to the data context or event parameter
const transformOut = (value, country) => {
  if (value) {
    return country
  }
}

// To the Field (from e.g. defaultValue)
const transformIn = (country) => {
  return country?.iso
}
const MyForm = () => {
  return (
    <Form.Handler onSubmit={console.log}>
      <Form.Card>
        <Field.SelectCountry
          path="/country"
          transformIn={transformIn}
          transformOut={transformOut}
          defaultValue="NO"
        />

        <Value.SelectCountry
          path="/country"
          transformIn={transformIn}
          placeholder="(Select a country)"
          showEmpty
        />

        <Form.SubHeading>Data Context</Form.SubHeading>
        <Tools.Log />
      </Form.Card>
      <Form.SubmitButton />
    </Form.Handler>
  )
}
render(<MyForm />)
`})}var b=()=>(0,d.jsx)(l,{"data-visual-test":`select-country-opened`,stableName:`Opened`,sourceImports:[`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.SelectCountry
  value="NO"
  htmlAttributes={{
    opened: true,
  }}
/>
`});function x(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...c(),...e.components},{VisibleWhenVisualTest:n}=t;return u||C(`Examples`,!1),h||C(`Examples.Disabled`,!0),v||C(`Examples.FilterCountries`,!0),p||C(`Examples.HorizontalLayout`,!0),b||C(`Examples.Opened`,!0),f||C(`Examples.OptionSelected`,!0),y||C(`Examples.TransformInAndOut`,!0),_||C(`Examples.ValidationRequired`,!0),g||C(`Examples.WithError`,!0),m||C(`Examples.WithHelp`,!0),n||C(`VisibleWhenVisualTest`,!0),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(t.h2,{children:`Demos`}),`
`,(0,d.jsx)(t.h3,{children:`Option selected`}),`
`,(0,d.jsx)(f,{}),`
`,(0,d.jsx)(t.h3,{children:`With a horizontal layout`}),`
`,(0,d.jsx)(p,{}),`
`,(0,d.jsx)(t.h3,{children:`With help`}),`
`,(0,d.jsx)(m,{}),`
`,(0,d.jsx)(t.h3,{children:`Disabled`}),`
`,(0,d.jsx)(h,{}),`
`,(0,d.jsx)(t.h3,{children:`Error`}),`
`,(0,d.jsx)(g,{}),`
`,(0,d.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,d.jsx)(_,{}),`
`,(0,d.jsx)(t.h3,{children:`TransformIn and TransformOut`}),`
`,(0,d.jsx)(y,{}),`
`,(0,d.jsx)(t.h3,{children:`Filter countries`}),`
`,(0,d.jsxs)(t.p,{children:[`This example demonstrates how to filter specific countries. Use the `,(0,d.jsx)(t.code,{children:`countries`}),` property to define a set of countries and/or the `,(0,d.jsx)(t.code,{children:`filterCountries`}),` property to apply custom filtering logic.`]}),`
`,(0,d.jsx)(v,{}),`
`,(0,d.jsx)(n,{children:(0,d.jsx)(b,{})})]})}function S(e={}){let{wrapper:t}={...c(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(x,{...e})}):x(e)}function C(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{S as default};