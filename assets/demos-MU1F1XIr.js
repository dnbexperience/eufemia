import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({Disabled:()=>u,FilterCountries:()=>p,HorizontalLayout:()=>c,Opened:()=>h,OptionSelected:()=>s,TransformInAndOut:()=>m,ValidationRequired:()=>f,WithError:()=>d,WithHelp:()=>l}),o=e(n()),s=()=>(0,o.jsx)(r,{"data-visual-test":`select-country-vertical-layout`,stableName:`OptionSelected`,children:`<Field.SelectCountry
  value="NO"
  onChange={(value, obj) => console.log('onChange', value, obj)}
/>
`}),c=()=>(0,o.jsx)(r,{"data-visual-test":`select-country-horizontal-layout`,stableName:`HorizontalLayout`,children:`<Field.SelectCountry
  value="NO"
  layout="horizontal"
  layoutOptions={{
    width: '6rem',
  }}
/>
`}),l=()=>(0,o.jsx)(r,{stableName:`WithHelp`,children:`<Field.SelectCountry
  value="NO"
  label="Label text"
  help={{
    title: 'Help is available',
    content:
      'Helping others, encouraging others, are often acts of being kind that have more meaning that you may realize.',
  }}
  onChange={(value, obj) => console.log('onChange', value, obj)}
/>
`}),u=()=>(0,o.jsx)(r,{stableName:`Disabled`,children:`<Field.SelectCountry
  value="NO"
  label="Label text"
  onChange={(value, obj) => console.log('onChange', value, obj)}
  disabled
/>
`}),d=()=>(0,o.jsx)(r,{stableName:`WithError`,children:`<Field.SelectCountry
  value="NO"
  label="Label text"
  onChange={(value, obj) => console.log('onChange', value, obj)}
  error={new Error('This is what is wrong...')}
/>
`}),f=()=>(0,o.jsx)(r,{stableName:`ValidationRequired`,children:`<Field.SelectCountry
  label="Label text"
  onChange={(value, obj) => console.log('onChange', value, obj)}
  required
  validateInitially
  validateUnchanged
/>
`});function p(){return(0,o.jsx)(r,{stableName:`FilterCountries`,children:`<Field.SelectCountry
  countries="Scandinavia"
  filterCountries={({ iso }) => iso !== 'DK'}
/>
`})}function m(){return(0,o.jsx)(r,{stableName:`TransformInAndOut`,noInline:!0,children:`// From the Field (internal value) to the data context or event parameter
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
`})}var h=()=>(0,o.jsx)(r,{"data-visual-test":`select-country-opened`,stableName:`Opened`,children:`<Field.SelectCountry
  value="NO"
  htmlAttributes={{
    opened: true,
  }}
/>
`});function g(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...i(),...e.components},{VisibleWhenVisualTest:n}=t;return a||v(`Examples`,!1),u||v(`Examples.Disabled`,!0),p||v(`Examples.FilterCountries`,!0),c||v(`Examples.HorizontalLayout`,!0),h||v(`Examples.Opened`,!0),s||v(`Examples.OptionSelected`,!0),m||v(`Examples.TransformInAndOut`,!0),f||v(`Examples.ValidationRequired`,!0),d||v(`Examples.WithError`,!0),l||v(`Examples.WithHelp`,!0),n||v(`VisibleWhenVisualTest`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Option selected`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`With a horizontal layout`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`With help`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Disabled`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`Error`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,o.jsx)(f,{}),`
`,(0,o.jsx)(t.h3,{children:`TransformIn and TransformOut`}),`
`,(0,o.jsx)(m,{}),`
`,(0,o.jsx)(t.h3,{children:`Filter countries`}),`
`,(0,o.jsxs)(t.p,{children:[`This example demonstrates how to filter specific countries. Use the `,(0,o.jsx)(t.code,{children:`countries`}),` property to define a set of countries and/or the `,(0,o.jsx)(t.code,{children:`filterCountries`}),` property to apply custom filtering logic.`]}),`
`,(0,o.jsx)(p,{}),`
`,(0,o.jsx)(n,{children:(0,o.jsx)(h,{})})]})}function _(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(g,{...e})}):g(e)}function v(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{_ as default};