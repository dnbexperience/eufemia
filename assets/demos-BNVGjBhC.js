import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{c as r}from"./ToggleButton-BtQrsiHY.js";import{t as i}from"./Card--_AKADDp.js";import{t as a}from"./Form-913YPZs6.js";import{t as o}from"./Field-CbVmykdw.js";import{t as s}from"./Value-C2hl5_67.js";import{t as c}from"./Tools-Dnz4rN_r.js";import{W as l}from"./index-D7e1avVt.js";import{t as u}from"./ComponentBox-CE7bpcJy.js";var d=e({Disabled:()=>g,FilterCurrencies:()=>y,HorizontalLayout:()=>m,Opened:()=>S,OptionSelected:()=>p,TransformInAndOut:()=>b,ValidationRequired:()=>v,WithError:()=>_,WithFieldCurrency:()=>x,WithHelp:()=>h}),f=t(n()),p=()=>(0,f.jsx)(u,{"data-visual-test":`select-currency-vertical-layout`,stableName:`OptionSelected`,sourceImports:[`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Field:o},children:`<Field.SelectCurrency
  value="NOK"
  onChange={(value, obj) => console.log('onChange', value, obj)}
/>
`}),m=()=>(0,f.jsx)(u,{"data-visual-test":`select-currency-horizontal-layout`,stableName:`HorizontalLayout`,sourceImports:[`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Field:o},children:`<Field.SelectCurrency
  value="NOK"
  layout="horizontal"
  layoutOptions={{
    width: '6rem',
  }}
/>
`}),h=()=>(0,f.jsx)(u,{stableName:`WithHelp`,sourceImports:[`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Field:o},children:`<Field.SelectCurrency
  value="NOK"
  label="Label text"
  help={{
    title: 'Help is available',
    content:
      'Helping others, encouraging others, are often acts of being kind that have more meaning that you may realize.',
  }}
  onChange={(value, obj) => console.log('onChange', value, obj)}
/>
`}),g=()=>(0,f.jsx)(u,{stableName:`Disabled`,sourceImports:[`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Field:o},children:`<Field.SelectCurrency
  value="NOK"
  label="Label text"
  onChange={(value, obj) => console.log('onChange', value, obj)}
  disabled
/>
`}),_=()=>(0,f.jsx)(u,{stableName:`WithError`,sourceImports:[`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Field:o},children:`<Field.SelectCurrency
  value="NOK"
  label="Label text"
  onChange={(value, obj) => console.log('onChange', value, obj)}
  error={new Error('This is what is wrong...')}
/>
`}),v=()=>(0,f.jsx)(u,{stableName:`ValidationRequired`,sourceImports:[`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Field:o},children:`<Field.SelectCurrency
  label="Label text"
  onChange={(value, obj) => console.log('onChange', value, obj)}
  required
  validateInitially
  validateUnchanged
/>
`});function y(){return(0,f.jsx)(u,{stableName:`FilterCurrencies`,sourceImports:[`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Field:o},children:`<Field.SelectCurrency
  currencies="Scandinavia"
  filterCurrencies={({ iso }) => iso !== 'DKK'}
/>
`})}function b(){return(0,f.jsx)(u,{stableName:`TransformInAndOut`,sourceImports:[`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Form:a,Card:i,Field:o,Value:s,Tools:c},noInline:!0,children:`// From the Field (internal value) to the data context or event parameter
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
`})}function x(){return(0,f.jsx)(u,{stableName:`WithFieldCurrency`,sourceImports:[`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Form:a,Card:i,Flex:r,Field:o},children:`<Form.Handler onSubmit={console.log}>
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
`})}var S=()=>(0,f.jsx)(u,{"data-visual-test":`select-currency-opened`,stableName:`Opened`,sourceImports:[`import { Field, Form, Tools, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Field:o},children:`<Field.SelectCurrency
  value="NOK"
  htmlAttributes={{
    opened: true,
  }}
/>
`});function C(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...l(),...e.components},{VisibleWhenVisualTest:n}=t;return d||T(`Examples`,!1),g||T(`Examples.Disabled`,!0),y||T(`Examples.FilterCurrencies`,!0),m||T(`Examples.HorizontalLayout`,!0),S||T(`Examples.Opened`,!0),p||T(`Examples.OptionSelected`,!0),b||T(`Examples.TransformInAndOut`,!0),v||T(`Examples.ValidationRequired`,!0),_||T(`Examples.WithError`,!0),x||T(`Examples.WithFieldCurrency`,!0),h||T(`Examples.WithHelp`,!0),n||T(`VisibleWhenVisualTest`,!0),(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(t.h2,{children:`Demos`}),`
`,(0,f.jsx)(t.h3,{children:`Option selected`}),`
`,(0,f.jsx)(p,{}),`
`,(0,f.jsx)(t.h3,{children:`With a horizontal layout`}),`
`,(0,f.jsx)(m,{}),`
`,(0,f.jsx)(t.h3,{children:`With help`}),`
`,(0,f.jsx)(h,{}),`
`,(0,f.jsx)(t.h3,{children:`Disabled`}),`
`,(0,f.jsx)(g,{}),`
`,(0,f.jsx)(t.h3,{children:`Error`}),`
`,(0,f.jsx)(_,{}),`
`,(0,f.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,f.jsx)(v,{}),`
`,(0,f.jsx)(t.h3,{children:`TransformIn and TransformOut`}),`
`,(0,f.jsx)(b,{}),`
`,(0,f.jsx)(t.h3,{children:`Filter currencies`}),`
`,(0,f.jsxs)(t.p,{children:[`This example demonstrates how to filter specific currencies. Use the `,(0,f.jsx)(t.code,{children:`currencies`}),` property to define a set of currencies and/or the `,(0,f.jsx)(t.code,{children:`filterCurrencies`}),` property to apply custom filtering logic.`]}),`
`,(0,f.jsx)(y,{}),`
`,(0,f.jsxs)(t.h3,{children:[`With `,(0,f.jsx)(t.code,{children:`Field.Currency`})]}),`
`,(0,f.jsxs)(t.p,{children:[`This example demonstrates how to use `,(0,f.jsx)(t.code,{children:`Field.SelectCurrency`}),` together with `,(0,f.jsx)(t.code,{children:`Field.Currency`}),`.
It imitates a transaction, and therefore sets the HTML `,(0,f.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete`,children:`autocomplete`}),` attribute for both fields, `,(0,f.jsx)(t.code,{children:`transaction-currency`}),` in `,(0,f.jsx)(t.code,{children:`Field.SelectCurrency`}),` and `,(0,f.jsx)(t.code,{children:`transaction-amount`}),` in `,(0,f.jsx)(t.code,{children:`Field.Currency`}),`. This is done to provide automated assistance in filling out form field values, as well as guidance to the browser as to the type of information expected in the field.`]}),`
`,(0,f.jsx)(x,{}),`
`,(0,f.jsx)(n,{children:(0,f.jsx)(S,{})})]})}function w(e={}){let{wrapper:t}={...l(),...e.components};return t?(0,f.jsx)(t,{...e,children:(0,f.jsx)(C,{...e})}):C(e)}function T(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{w as default};