import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({Disabled:()=>m,Empty:()=>s,ExclusiveMinMax:()=>d,Label:()=>l,LabelAndValue:()=>u,Placeholder:()=>c,ValidationRequired:()=>g,WithError:()=>h,WithFieldSelectCurrency:()=>v,WithGBLocale:()=>p,WithHelp:()=>f,WithStepControls:()=>_}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`Empty`,children:`<Field.Currency onChange={(value) => console.log('onChange', value)} />
`}),c=()=>(0,o.jsx)(r,{stableName:`Placeholder`,children:`<Field.Currency
  placeholder="Enter a number"
  onChange={(value) => console.log('onChange', value)}
/>
`}),l=()=>(0,o.jsx)(r,{stableName:`Label`,children:`<Field.Currency
  label="Amount"
  currencyDisplay="name"
  onChange={(value) => console.log('onChange', value)}
/>
`}),u=()=>(0,o.jsx)(r,{stableName:`LabelAndValue`,children:`<Field.Currency
  value={150000}
  currency="NOK"
  label="Amount"
  onChange={(value) => console.log('onChange', value)}
/>
`}),d=()=>(0,o.jsx)(r,{stableName:`ExclusiveMinMax`,children:`<Field.Currency
  value={1000}
  label="Label text"
  allowNegative={false}
  required
  exclusiveMinimum={900}
  exclusiveMaximum={1000}
  validateInitially
/>
`}),f=()=>(0,o.jsx)(r,{stableName:`WithHelp`,children:`<Field.Currency
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
`}),p=()=>(0,o.jsx)(r,{stableName:`WithGBLocale`,children:`<Provider locale="en-GB">
  <Field.Currency value={-150000} align="right" />
</Provider>
`}),m=()=>(0,o.jsx)(r,{stableName:`Disabled`,children:`<Field.Currency
  value={25000000}
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),h=()=>(0,o.jsx)(r,{stableName:`WithError`,children:`<Field.Currency
  value={12345678}
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),g=()=>(0,o.jsx)(r,{stableName:`ValidationRequired`,children:`<Field.Currency
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  required
  validateInitially
/>
`}),_=()=>(0,o.jsx)(r,{"data-visual-test":`currency-input-step-controls`,stableName:`WithStepControls`,children:`<Field.Currency
  showStepControls
  label="Amount"
  minimum={500}
  maximum={2000}
  value={1000}
  step={100}
/>
`});function v(){return(0,o.jsx)(r,{stableName:`WithFieldSelectCurrency`,children:`<Form.Handler onSubmit={console.log}>
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
`})}function y(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...i(),...e.components};return a||x(`Examples`,!1),m||x(`Examples.Disabled`,!0),s||x(`Examples.Empty`,!0),d||x(`Examples.ExclusiveMinMax`,!0),l||x(`Examples.Label`,!0),u||x(`Examples.LabelAndValue`,!0),c||x(`Examples.Placeholder`,!0),g||x(`Examples.ValidationRequired`,!0),h||x(`Examples.WithError`,!0),v||x(`Examples.WithFieldSelectCurrency`,!0),p||x(`Examples.WithGBLocale`,!0),f||x(`Examples.WithHelp`,!0),_||x(`Examples.WithStepControls`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Empty`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Label`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Label and value`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`Exclusive minimum and exclusive maximum`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`With step controls`}),`
`,(0,o.jsx)(_,{}),`
`,(0,o.jsx)(t.h2,{children:`Locale`}),`
`,(0,o.jsxs)(t.p,{children:[`This field is using `,(0,o.jsx)(t.code,{children:`NOK`}),` when `,(0,o.jsx)(t.code,{children:`locale`}),` is `,(0,o.jsx)(t.code,{children:`en-GB`}),`.`]}),`
`,(0,o.jsx)(p,{}),`
`,(0,o.jsx)(t.h3,{children:`With help`}),`
`,(0,o.jsx)(f,{}),`
`,(0,o.jsx)(t.h3,{children:`Disabled`}),`
`,(0,o.jsx)(m,{}),`
`,(0,o.jsx)(t.h3,{children:`Error`}),`
`,(0,o.jsx)(h,{}),`
`,(0,o.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,o.jsx)(g,{}),`
`,(0,o.jsxs)(t.h3,{children:[`With `,(0,o.jsx)(t.code,{children:`Field.SelectCurrency`})]}),`
`,(0,o.jsxs)(t.p,{children:[`This example demonstrates how to use `,(0,o.jsx)(t.code,{children:`Field.Currency`}),` together with `,(0,o.jsx)(t.code,{children:`Field.SelectCurrency`}),`.
It imitates a transaction, and therefore sets the HTML `,(0,o.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete`,children:`autofill`}),` attribute for both fields, `,(0,o.jsx)(t.code,{children:`transaction-currency`}),` in `,(0,o.jsx)(t.code,{children:`Field.SelectCurrency`}),` and `,(0,o.jsx)(t.code,{children:`transaction-amount`}),` in `,(0,o.jsx)(t.code,{children:`Field.Currency`}),`.`]}),`
`,(0,o.jsx)(v,{})]})}function b(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(y,{...e})}):y(e)}function x(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{b as default};