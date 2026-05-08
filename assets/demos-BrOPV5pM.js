import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-C64JNWnl.js";import{Lr as r}from"./index-2AO2Cu5K.js";var i=e({Disabled:()=>l,FilterCountries:()=>f,HorizontalLayout:()=>s,Opened:()=>m,OptionSelected:()=>o,TransformInAndOut:()=>p,ValidationRequired:()=>d,WithError:()=>u,WithHelp:()=>c}),a=t(),o=()=>(0,a.jsx)(n,{"data-visual-test":`select-country-vertical-layout`,children:`<Field.SelectCountry
  value="NO"
  onChange={(value, obj) => console.log('onChange', value, obj)}
/>
`}),s=()=>(0,a.jsx)(n,{"data-visual-test":`select-country-horizontal-layout`,children:`<Field.SelectCountry
  value="NO"
  layout="horizontal"
  layoutOptions={{
    width: '6rem',
  }}
/>
`}),c=()=>(0,a.jsx)(n,{children:`<Field.SelectCountry
  value="NO"
  label="Label text"
  help={{
    title: 'Help is available',
    content:
      'Helping others, encouraging others, are often acts of being kind that have more meaning that you may realize.',
  }}
  onChange={(value, obj) => console.log('onChange', value, obj)}
/>
`}),l=()=>(0,a.jsx)(n,{children:`<Field.SelectCountry
  value="NO"
  label="Label text"
  onChange={(value, obj) => console.log('onChange', value, obj)}
  disabled
/>
`}),u=()=>(0,a.jsx)(n,{children:`<Field.SelectCountry
  value="NO"
  label="Label text"
  onChange={(value, obj) => console.log('onChange', value, obj)}
  error={new Error('This is what is wrong...')}
/>
`}),d=()=>(0,a.jsx)(n,{children:`<Field.SelectCountry
  label="Label text"
  onChange={(value, obj) => console.log('onChange', value, obj)}
  required
  validateInitially
  validateUnchanged
/>
`});function f(){return(0,a.jsx)(n,{children:`<Field.SelectCountry
  countries="Scandinavia"
  filterCountries={({ iso }) => iso !== 'DK'}
/>
`})}function p(){return(0,a.jsx)(n,{noInline:!0,children:`// From the Field (internal value) to the data context or event parameter
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
`})}var m=()=>(0,a.jsx)(n,{"data-visual-test":`select-country-opened`,children:`<Field.SelectCountry
  value="NO"
  htmlAttributes={{
    opened: true,
  }}
/>
`});function h(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...r(),...e.components},{VisibleWhenVisualTest:n}=t;return i||_(`Examples`,!1),l||_(`Examples.Disabled`,!0),f||_(`Examples.FilterCountries`,!0),s||_(`Examples.HorizontalLayout`,!0),m||_(`Examples.Opened`,!0),o||_(`Examples.OptionSelected`,!0),p||_(`Examples.TransformInAndOut`,!0),d||_(`Examples.ValidationRequired`,!0),u||_(`Examples.WithError`,!0),c||_(`Examples.WithHelp`,!0),n||_(`VisibleWhenVisualTest`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Option selected`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`With a horizontal layout`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`With help`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`Disabled`}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsx)(t.h3,{children:`Error`}),`
`,(0,a.jsx)(u,{}),`
`,(0,a.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,a.jsx)(d,{}),`
`,(0,a.jsx)(t.h3,{children:`TransformIn and TransformOut`}),`
`,(0,a.jsx)(p,{}),`
`,(0,a.jsx)(t.h3,{children:`Filter countries`}),`
`,(0,a.jsxs)(t.p,{children:[`This example demonstrates how to filter specific countries. Use the `,(0,a.jsx)(t.code,{children:`countries`}),` property to define a set of countries and/or the `,(0,a.jsx)(t.code,{children:`filterCountries`}),` property to apply custom filtering logic.`]}),`
`,(0,a.jsx)(f,{}),`
`,(0,a.jsx)(n,{children:(0,a.jsx)(m,{})})]})}function g(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(h,{...e})}):h(e)}function _(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{g as default};