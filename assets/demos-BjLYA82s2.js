import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({Disabled:()=>u,FilterCurrencies:()=>p,HorizontalLayout:()=>c,Opened:()=>g,OptionSelected:()=>s,TransformInAndOut:()=>m,ValidationRequired:()=>f,WithError:()=>d,WithFieldCurrency:()=>h,WithHelp:()=>l}),o=e(n()),s=()=>(0,o.jsx)(r,{"data-visual-test":`select-currency-vertical-layout`,stableName:`OptionSelected`,children:`<Field.SelectCurrency
  value="NOK"
  onChange={(value, obj) => console.log('onChange', value, obj)}
/>
`}),c=()=>(0,o.jsx)(r,{"data-visual-test":`select-currency-horizontal-layout`,stableName:`HorizontalLayout`,children:`<Field.SelectCurrency
  value="NOK"
  layout="horizontal"
  layoutOptions={{
    width: '6rem',
  }}
/>
`}),l=()=>(0,o.jsx)(r,{stableName:`WithHelp`,children:`<Field.SelectCurrency
  value="NOK"
  label="Label text"
  help={{
    title: 'Help is available',
    content:
      'Helping others, encouraging others, are often acts of being kind that have more meaning that you may realize.',
  }}
  onChange={(value, obj) => console.log('onChange', value, obj)}
/>
`}),u=()=>(0,o.jsx)(r,{stableName:`Disabled`,children:`<Field.SelectCurrency
  value="NOK"
  label="Label text"
  onChange={(value, obj) => console.log('onChange', value, obj)}
  disabled
/>
`}),d=()=>(0,o.jsx)(r,{stableName:`WithError`,children:`<Field.SelectCurrency
  value="NOK"
  label="Label text"
  onChange={(value, obj) => console.log('onChange', value, obj)}
  error={new Error('This is what is wrong...')}
/>
`}),f=()=>(0,o.jsx)(r,{stableName:`ValidationRequired`,children:`<Field.SelectCurrency
  label="Label text"
  onChange={(value, obj) => console.log('onChange', value, obj)}
  required
  validateInitially
  validateUnchanged
/>
`});function p(){return(0,o.jsx)(r,{stableName:`FilterCurrencies`,children:`<Field.SelectCurrency
  currencies="Scandinavia"
  filterCurrencies={({ iso }) => iso !== 'DKK'}
/>
`})}function m(){return(0,o.jsx)(r,{stableName:`TransformInAndOut`,noInline:!0,children:`// From the Field (internal value) to the data context or event parameter
const transformOut = (value, currency) => {
  if (value) {
    return currency
  }
}

// To the Field (from e.g. defaultValue)
const transformIn = (currency) => {
  return currency?.iso
}
const MyForm = () => {
  return (
    <Form.Handler onSubmit={console.log}>
      <Form.Card>
        <Field.SelectCurrency
          path="/currency"
          transformIn={transformIn}
          transformOut={transformOut}
          defaultValue="NOK"
        />

        <Value.SelectCurrency
          path="/currency"
          transformIn={transformIn}
          placeholder="(Select a currency)"
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
`})}function h(){return(0,o.jsx)(r,{stableName:`WithFieldCurrency`,children:`<Form.Handler onSubmit={console.log}>
  <Form.Card>
    <Flex.Horizontal>
      <Field.SelectCurrency
        label="Select a currency"
        path="/currency"
        value="EUR"
        autoComplete="transaction-currency"
      />
      <Field.Currency
        label="Amount"
        currency="/currency"
        autoComplete="transaction-amount"
      />
    </Flex.Horizontal>
  </Form.Card>
  <Form.SubmitButton text="Pay" />
</Form.Handler>
`})}var g=()=>(0,o.jsx)(r,{"data-visual-test":`select-currency-opened`,stableName:`Opened`,children:`<Field.SelectCurrency
  value="NOK"
  htmlAttributes={{
    opened: true,
  }}
/>
`});function _(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...i(),...e.components},{VisibleWhenVisualTest:n}=t;return a||y(`Examples`,!1),u||y(`Examples.Disabled`,!0),p||y(`Examples.FilterCurrencies`,!0),c||y(`Examples.HorizontalLayout`,!0),g||y(`Examples.Opened`,!0),s||y(`Examples.OptionSelected`,!0),m||y(`Examples.TransformInAndOut`,!0),f||y(`Examples.ValidationRequired`,!0),d||y(`Examples.WithError`,!0),h||y(`Examples.WithFieldCurrency`,!0),l||y(`Examples.WithHelp`,!0),n||y(`VisibleWhenVisualTest`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
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
`,(0,o.jsx)(t.h3,{children:`Filter currencies`}),`
`,(0,o.jsxs)(t.p,{children:[`This example demonstrates how to filter specific currencies. Use the `,(0,o.jsx)(t.code,{children:`currencies`}),` property to define a set of currencies and/or the `,(0,o.jsx)(t.code,{children:`filterCurrencies`}),` property to apply custom filtering logic.`]}),`
`,(0,o.jsx)(p,{}),`
`,(0,o.jsxs)(t.h3,{children:[`With `,(0,o.jsx)(t.code,{children:`Field.Currency`})]}),`
`,(0,o.jsxs)(t.p,{children:[`This example demonstrates how to use `,(0,o.jsx)(t.code,{children:`Field.SelectCurrency`}),` together with `,(0,o.jsx)(t.code,{children:`Field.Currency`}),`.
It imitates a transaction, and therefore sets the HTML `,(0,o.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete`,children:`autocomplete`}),` attribute for both fields, `,(0,o.jsx)(t.code,{children:`transaction-currency`}),` in `,(0,o.jsx)(t.code,{children:`Field.SelectCurrency`}),` and `,(0,o.jsx)(t.code,{children:`transaction-amount`}),` in `,(0,o.jsx)(t.code,{children:`Field.Currency`}),`. This is done to provide automated assistance in filling out form field values, as well as guidance to the browser as to the type of information expected in the field.`]}),`
`,(0,o.jsx)(h,{}),`
`,(0,o.jsx)(n,{children:(0,o.jsx)(g,{})})]})}function v(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(_,{...e})}):_(e)}function y(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{v as default};