import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{Q as r}from"./Anchor-Djq5YQEM.js";import{c as i}from"./ToggleButton-_NsXxiTa.js";import{t as a}from"./Card-ChPhpBPz.js";import{t as o}from"./Form-JTiJXf2d.js";import{t as s}from"./Field-DqRpWyNm.js";import{K as c}from"./index-ppRu2ktv.js";import{t as l}from"./ComponentBox-R2c6Bo76.js";var u=e({Disabled:()=>y,Empty:()=>f,ExclusiveMinMax:()=>g,Label:()=>m,LabelAndValue:()=>h,Placeholder:()=>p,ValidationRequired:()=>x,WithError:()=>b,WithFieldSelectCurrency:()=>C,WithGBLocale:()=>v,WithHelp:()=>_,WithStepControls:()=>S}),d=t(n()),f=()=>(0,d.jsx)(l,{stableName:`Empty`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Field:s},children:`<Field.Currency onChange={(value) => console.log('onChange', value)} />
`}),p=()=>(0,d.jsx)(l,{stableName:`Placeholder`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Field:s},children:`<Field.Currency
  placeholder="Enter a number"
  onChange={(value) => console.log('onChange', value)}
/>
`}),m=()=>(0,d.jsx)(l,{stableName:`Label`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Field:s},children:`<Field.Currency
  label="Amount"
  currencyDisplay="name"
  onChange={(value) => console.log('onChange', value)}
/>
`}),h=()=>(0,d.jsx)(l,{stableName:`LabelAndValue`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Field:s},children:`<Field.Currency
  value={150000}
  currency="NOK"
  label="Amount"
  onChange={(value) => console.log('onChange', value)}
/>
`}),g=()=>(0,d.jsx)(l,{stableName:`ExclusiveMinMax`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Field:s},children:`<Field.Currency
  value={1000}
  label="Label text"
  allowNegative={false}
  required
  exclusiveMinimum={900}
  exclusiveMaximum={1000}
  validateInitially
/>
`}),_=()=>(0,d.jsx)(l,{stableName:`WithHelp`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Field:s},children:`<Field.Currency
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
`}),v=()=>(0,d.jsx)(l,{stableName:`WithGBLocale`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Provider:r,Field:s},children:`<Provider locale="en-GB">
  <Field.Currency value={-150000} align="right" />
</Provider>
`}),y=()=>(0,d.jsx)(l,{stableName:`Disabled`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Field:s},children:`<Field.Currency
  value={25000000}
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),b=()=>(0,d.jsx)(l,{stableName:`WithError`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Field:s},children:`<Field.Currency
  value={12345678}
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),x=()=>(0,d.jsx)(l,{stableName:`ValidationRequired`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Field:s},children:`<Field.Currency
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  required
  validateInitially
/>
`}),S=()=>(0,d.jsx)(l,{"data-visual-test":`currency-input-step-controls`,stableName:`WithStepControls`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Field:s},children:`<Field.Currency
  showStepControls
  label="Amount"
  minimum={500}
  maximum={2000}
  value={1000}
  step={100}
/>
`});function C(){return(0,d.jsx)(l,{stableName:`WithFieldSelectCurrency`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Form:o,Card:a,Flex:i,Field:s},children:`<Form.Handler onSubmit={console.log}>
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
`})}function w(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...c(),...e.components};return u||E(`Examples`,!1),y||E(`Examples.Disabled`,!0),f||E(`Examples.Empty`,!0),g||E(`Examples.ExclusiveMinMax`,!0),m||E(`Examples.Label`,!0),h||E(`Examples.LabelAndValue`,!0),p||E(`Examples.Placeholder`,!0),x||E(`Examples.ValidationRequired`,!0),b||E(`Examples.WithError`,!0),C||E(`Examples.WithFieldSelectCurrency`,!0),v||E(`Examples.WithGBLocale`,!0),_||E(`Examples.WithHelp`,!0),S||E(`Examples.WithStepControls`,!0),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(t.h2,{children:`Demos`}),`
`,(0,d.jsx)(t.h3,{children:`Empty`}),`
`,(0,d.jsx)(f,{}),`
`,(0,d.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,d.jsx)(p,{}),`
`,(0,d.jsx)(t.h3,{children:`Label`}),`
`,(0,d.jsx)(m,{}),`
`,(0,d.jsx)(t.h3,{children:`Label and value`}),`
`,(0,d.jsx)(h,{}),`
`,(0,d.jsx)(t.h3,{children:`Exclusive minimum and exclusive maximum`}),`
`,(0,d.jsx)(g,{}),`
`,(0,d.jsx)(t.h3,{children:`With step controls`}),`
`,(0,d.jsx)(S,{}),`
`,(0,d.jsx)(t.h2,{children:`Locale`}),`
`,(0,d.jsxs)(t.p,{children:[`This field is using `,(0,d.jsx)(t.code,{children:`NOK`}),` when `,(0,d.jsx)(t.code,{children:`locale`}),` is `,(0,d.jsx)(t.code,{children:`en-GB`}),`.`]}),`
`,(0,d.jsx)(v,{}),`
`,(0,d.jsx)(t.h3,{children:`With help`}),`
`,(0,d.jsx)(_,{}),`
`,(0,d.jsx)(t.h3,{children:`Disabled`}),`
`,(0,d.jsx)(y,{}),`
`,(0,d.jsx)(t.h3,{children:`Error`}),`
`,(0,d.jsx)(b,{}),`
`,(0,d.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,d.jsx)(x,{}),`
`,(0,d.jsxs)(t.h3,{children:[`With `,(0,d.jsx)(t.code,{children:`Field.SelectCurrency`})]}),`
`,(0,d.jsxs)(t.p,{children:[`This example demonstrates how to use `,(0,d.jsx)(t.code,{children:`Field.Currency`}),` together with `,(0,d.jsx)(t.code,{children:`Field.SelectCurrency`}),`.
It imitates a transaction, and therefore sets the HTML `,(0,d.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete`,children:`autofill`}),` attribute for both fields, `,(0,d.jsx)(t.code,{children:`transaction-currency`}),` in `,(0,d.jsx)(t.code,{children:`Field.SelectCurrency`}),` and `,(0,d.jsx)(t.code,{children:`transaction-amount`}),` in `,(0,d.jsx)(t.code,{children:`Field.Currency`}),`.`]}),`
`,(0,d.jsx)(C,{})]})}function T(e={}){let{wrapper:t}={...c(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(w,{...e})}):w(e)}function E(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{T as default};