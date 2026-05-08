import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-C64JNWnl.js";import{Lr as r}from"./index-2AO2Cu5K.js";var i=e({Disabled:()=>l,FilterCurrencies:()=>f,HorizontalLayout:()=>s,Opened:()=>h,OptionSelected:()=>o,TransformInAndOut:()=>p,ValidationRequired:()=>d,WithError:()=>u,WithFieldCurrency:()=>m,WithHelp:()=>c}),a=t(),o=()=>(0,a.jsx)(n,{"data-visual-test":`select-currency-vertical-layout`,children:`<Field.SelectCurrency
  value="NOK"
  onChange={(value, obj) => console.log('onChange', value, obj)}
/>
`}),s=()=>(0,a.jsx)(n,{"data-visual-test":`select-currency-horizontal-layout`,children:`<Field.SelectCurrency
  value="NOK"
  layout="horizontal"
  layoutOptions={{
    width: '6rem',
  }}
/>
`}),c=()=>(0,a.jsx)(n,{children:`<Field.SelectCurrency
  value="NOK"
  label="Label text"
  help={{
    title: 'Help is available',
    content:
      'Helping others, encouraging others, are often acts of being kind that have more meaning that you may realize.',
  }}
  onChange={(value, obj) => console.log('onChange', value, obj)}
/>
`}),l=()=>(0,a.jsx)(n,{children:`<Field.SelectCurrency
  value="NOK"
  label="Label text"
  onChange={(value, obj) => console.log('onChange', value, obj)}
  disabled
/>
`}),u=()=>(0,a.jsx)(n,{children:`<Field.SelectCurrency
  value="NOK"
  label="Label text"
  onChange={(value, obj) => console.log('onChange', value, obj)}
  error={new Error('This is what is wrong...')}
/>
`}),d=()=>(0,a.jsx)(n,{children:`<Field.SelectCurrency
  label="Label text"
  onChange={(value, obj) => console.log('onChange', value, obj)}
  required
  validateInitially
  validateUnchanged
/>
`});function f(){return(0,a.jsx)(n,{children:`<Field.SelectCurrency
  currencies="Scandinavia"
  filterCurrencies={({ iso }) => iso !== 'DKK'}
/>
`})}function p(){return(0,a.jsx)(n,{noInline:!0,children:`// From the Field (internal value) to the data context or event parameter
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
`})}function m(){return(0,a.jsx)(n,{children:`<Form.Handler onSubmit={console.log}>
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
`})}var h=()=>(0,a.jsx)(n,{"data-visual-test":`select-currency-opened`,children:`<Field.SelectCurrency
  value="NOK"
  htmlAttributes={{
    opened: true,
  }}
/>
`});function g(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...r(),...e.components},{VisibleWhenVisualTest:n}=t;return i||v(`Examples`,!1),l||v(`Examples.Disabled`,!0),f||v(`Examples.FilterCurrencies`,!0),s||v(`Examples.HorizontalLayout`,!0),h||v(`Examples.Opened`,!0),o||v(`Examples.OptionSelected`,!0),p||v(`Examples.TransformInAndOut`,!0),d||v(`Examples.ValidationRequired`,!0),u||v(`Examples.WithError`,!0),m||v(`Examples.WithFieldCurrency`,!0),c||v(`Examples.WithHelp`,!0),n||v(`VisibleWhenVisualTest`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
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
`,(0,a.jsx)(t.h3,{children:`Filter currencies`}),`
`,(0,a.jsxs)(t.p,{children:[`This example demonstrates how to filter specific currencies. Use the `,(0,a.jsx)(t.code,{children:`currencies`}),` property to define a set of currencies and/or the `,(0,a.jsx)(t.code,{children:`filterCurrencies`}),` property to apply custom filtering logic.`]}),`
`,(0,a.jsx)(f,{}),`
`,(0,a.jsxs)(t.h3,{children:[`With `,(0,a.jsx)(t.code,{children:`Field.Currency`})]}),`
`,(0,a.jsxs)(t.p,{children:[`This example demonstrates how to use `,(0,a.jsx)(t.code,{children:`Field.SelectCurrency`}),` together with `,(0,a.jsx)(t.code,{children:`Field.Currency`}),`.
It imitates a transaction, and therefore sets the HTML `,(0,a.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete`,children:`autocomplete`}),` attribute for both fields, `,(0,a.jsx)(t.code,{children:`transaction-currency`}),` in `,(0,a.jsx)(t.code,{children:`Field.SelectCurrency`}),` and `,(0,a.jsx)(t.code,{children:`transaction-amount`}),` in `,(0,a.jsx)(t.code,{children:`Field.Currency`}),`. This is done to provide automated assistance in filling out form field values, as well as guidance to the browser as to the type of information expected in the field.`]}),`
`,(0,a.jsx)(m,{}),`
`,(0,a.jsx)(n,{children:(0,a.jsx)(h,{})})]})}function _(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(g,{...e})}):g(e)}function v(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{_ as default};