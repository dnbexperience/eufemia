import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-C64JNWnl.js";import{Lr as r}from"./index-2AO2Cu5K.js";var i=e({Disabled:()=>p,Empty:()=>o,ExclusiveMinMax:()=>u,Label:()=>c,LabelAndValue:()=>l,Placeholder:()=>s,ValidationRequired:()=>h,WithError:()=>m,WithFieldSelectCurrency:()=>_,WithGBLocale:()=>f,WithHelp:()=>d,WithStepControls:()=>g}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Field.Currency onChange={(value) => console.log('onChange', value)} />
`}),s=()=>(0,a.jsx)(n,{children:`<Field.Currency
  placeholder="Enter a number"
  onChange={(value) => console.log('onChange', value)}
/>
`}),c=()=>(0,a.jsx)(n,{children:`<Field.Currency
  label="Amount"
  currencyDisplay="name"
  onChange={(value) => console.log('onChange', value)}
/>
`}),l=()=>(0,a.jsx)(n,{children:`<Field.Currency
  value={150000}
  currency="NOK"
  label="Amount"
  onChange={(value) => console.log('onChange', value)}
/>
`}),u=()=>(0,a.jsx)(n,{children:`<Field.Currency
  value={1000}
  label="Label text"
  allowNegative={false}
  required
  exclusiveMinimum={900}
  exclusiveMaximum={1000}
  validateInitially
/>
`}),d=()=>(0,a.jsx)(n,{children:`<Field.Currency
  value={150000}
  currency="NOK"
  label="Amount"
  help={{
    title: 'Help is available',
    content:
      'Helping others, without expecting anything in return is what true self-worth is all about.',
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),f=()=>(0,a.jsx)(n,{children:`<Provider locale="en-GB">
  <Field.Currency value={-150000} align="right" />
</Provider>
`}),p=()=>(0,a.jsx)(n,{children:`<Field.Currency
  value={25000000}
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),m=()=>(0,a.jsx)(n,{children:`<Field.Currency
  value={12345678}
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),h=()=>(0,a.jsx)(n,{children:`<Field.Currency
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  required
  validateInitially
/>
`}),g=()=>(0,a.jsx)(n,{"data-visual-test":`currency-input-step-controls`,children:`<Field.Currency
  showStepControls
  label="Amount"
  minimum={500}
  maximum={2000}
  value={1000}
  step={100}
/>
`});function _(){return(0,a.jsx)(n,{children:`<Form.Handler onSubmit={console.log}>
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
`})}function v(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...r(),...e.components};return i||b(`Examples`,!1),p||b(`Examples.Disabled`,!0),o||b(`Examples.Empty`,!0),u||b(`Examples.ExclusiveMinMax`,!0),c||b(`Examples.Label`,!0),l||b(`Examples.LabelAndValue`,!0),s||b(`Examples.Placeholder`,!0),h||b(`Examples.ValidationRequired`,!0),m||b(`Examples.WithError`,!0),_||b(`Examples.WithFieldSelectCurrency`,!0),f||b(`Examples.WithGBLocale`,!0),d||b(`Examples.WithHelp`,!0),g||b(`Examples.WithStepControls`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Empty`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`Label`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`Label and value`}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsx)(t.h3,{children:`Exclusive minimum and exclusive maximum`}),`
`,(0,a.jsx)(u,{}),`
`,(0,a.jsx)(t.h3,{children:`With step controls`}),`
`,(0,a.jsx)(g,{}),`
`,(0,a.jsx)(t.h2,{children:`Locale`}),`
`,(0,a.jsxs)(t.p,{children:[`This field is using `,(0,a.jsx)(t.code,{children:`NOK`}),` when `,(0,a.jsx)(t.code,{children:`locale`}),` is `,(0,a.jsx)(t.code,{children:`en-GB`}),`.`]}),`
`,(0,a.jsx)(f,{}),`
`,(0,a.jsx)(t.h3,{children:`With help`}),`
`,(0,a.jsx)(d,{}),`
`,(0,a.jsx)(t.h3,{children:`Disabled`}),`
`,(0,a.jsx)(p,{}),`
`,(0,a.jsx)(t.h3,{children:`Error`}),`
`,(0,a.jsx)(m,{}),`
`,(0,a.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,a.jsx)(h,{}),`
`,(0,a.jsxs)(t.h3,{children:[`With `,(0,a.jsx)(t.code,{children:`Field.SelectCurrency`})]}),`
`,(0,a.jsxs)(t.p,{children:[`This example demonstrates how to use `,(0,a.jsx)(t.code,{children:`Field.Currency`}),` together with `,(0,a.jsx)(t.code,{children:`Field.SelectCurrency`}),`.
It imitates a transaction, and therefore sets the HTML `,(0,a.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete`,children:`autofill`}),` attribute for both fields, `,(0,a.jsx)(t.code,{children:`transaction-currency`}),` in `,(0,a.jsx)(t.code,{children:`Field.SelectCurrency`}),` and `,(0,a.jsx)(t.code,{children:`transaction-amount`}),` in `,(0,a.jsx)(t.code,{children:`Field.Currency`}),`.`]}),`
`,(0,a.jsx)(_,{})]})}function y(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(v,{...e})}):v(e)}function b(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{y as default};