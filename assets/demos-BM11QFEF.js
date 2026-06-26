import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{Q as n}from"./Anchor-CgDcBCwP.js";import{s as r}from"./ToggleButton-DM984GyO.js";import{$ as i}from"./forms-CFi5-4x5.js";import{U as a,f as o,w as s}from"./index-kfZVC31v.js";import{t as c}from"./ComponentBox-qLaLt9T0.js";var l=e(t()),u=()=>(0,l.jsx)(g,{children:(0,l.jsx)(c,{"data-visual-test":`input-masked-number`,stableName:`InputMaskedExampleNumberLocale`,sourceImports:[`import styled from '@emotion/styled'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { Flex, InputMasked } from '@dnb/eufemia'`],__buildScope:{Flex:r,InputMasked:i},children:`<Flex.Vertical>
  <InputMasked
    label="Number"
    asNumber
    maskOptions={{
      allowNegative: false,
    }}
    value="1234.50"
    onChange={({ numberValue }) => {
      console.log(numberValue)
    }}
  />
  <InputMasked
    label="Number (decimal limit)"
    asNumber
    numberMask={{
      decimalLimit: 2,
    }}
    value="1234.016"
    onChange={({ numberValue }) => {
      console.log(numberValue)
    }}
  />
  <InputMasked
    label="Percentage"
    asPercent
    numberMask={{
      decimalLimit: 1,
    }}
    value="1234.016"
    onChange={({ numberValue }) => {
      console.log(numberValue)
    }}
  />
</Flex.Vertical>
`})}),d=()=>(0,l.jsx)(g,{children:(0,l.jsx)(c,{"data-visual-test":`input-masked-currency`,stableName:`InputMaskedExampleCurrencyLocale`,sourceImports:[`import styled from '@emotion/styled'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { Flex, InputMasked } from '@dnb/eufemia'`],__buildScope:{Flex:r,InputMasked:i,Provider:n},children:`<Flex.Vertical>
  <InputMasked
    label="Currency"
    asCurrency="EUR"
    value="1234.50"
    onChange={({ numberValue }) => {
      console.log(numberValue)
    }}
  />
  <Provider
    locale="en-GB"
    InputMasked={{
      currencyMask: {
        decimalLimit: 3,
      },
    }}
  >
    <InputMasked
      label="Currency"
      asCurrency="USD"
      value="1234.567"
      onChange={({ numberValue }) => {
        console.log(numberValue)
      }}
    />
  </Provider>
</Flex.Vertical>
`})}),f=()=>(0,l.jsx)(g,{children:(0,l.jsx)(c,{"data-visual-test":`input-masked-currency_mask`,stableName:`InputMaskedExampleCurrencyMask`,sourceImports:[`import styled from '@emotion/styled'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { Flex, InputMasked } from '@dnb/eufemia'`],__buildScope:{Flex:r,InputMasked:i},children:`<Flex.Vertical>
  <InputMasked
    label="Left aligned (default)"
    showMask
    currencyMask="kr"
    onChange={({ numberValue }) => {
      console.log(numberValue)
    }}
  />
  <InputMasked
    label="Right aligned"
    showMask
    currencyMask={{
      currency: 'NOK',
    }}
    align="right"
    onChange={({ numberValue }) => {
      console.log(numberValue)
    }}
  />
</Flex.Vertical>
`})}),p=()=>(0,l.jsx)(g,{children:(0,l.jsx)(c,{stableName:`InputMaskedExampleCustomNumberMask`,sourceImports:[`import styled from '@emotion/styled'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { Flex, InputMasked } from '@dnb/eufemia'`],__buildScope:{InputMasked:i},children:`<InputMasked
  label="Masked amount"
  showMask
  numberMask={{
    suffix: ' kr',
    allowDecimal: true,
  }}
  onChange={({ numberValue }) => {
    console.log(numberValue)
  }}
/>
`})}),m=()=>(0,l.jsx)(g,{children:(0,l.jsx)(c,{"data-visual-test":`input-masked-number_mask`,stableName:`InputMaskedExampleNumberMask`,sourceImports:[`import styled from '@emotion/styled'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { Flex, InputMasked } from '@dnb/eufemia'`],__buildScope:{InputMasked:i},children:`<InputMasked
  label="Masked input"
  value="1000000"
  numberMask={{
    suffix: ',-',
    allowDecimal: false,
  }}
  suffix="kr"
  onChange={({ numberValue }) => {
    console.log(numberValue)
  }}
/>
`})}),h=()=>(0,l.jsx)(g,{children:(0,l.jsx)(c,{stableName:`InputMaskedExamplePrefix`,sourceImports:[`import styled from '@emotion/styled'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { Flex, InputMasked } from '@dnb/eufemia'`],__buildScope:{InputMasked:i},children:`<InputMasked
  label="Masked input"
  numberMask={{
    prefix: 'NOK ',
  }}
  stretch={true}
  placeholder="Enter a number"
  onChange={({ numberValue }) => {
    console.log(numberValue)
  }}
/>
`})}),g=s.div`
  display: block;
  width: 100%;

  .dnb-masked-input {
    margin: 1rem 0;
  }
  .dnb-form-label + .dnb-masked-input {
    margin-top: 0;
  }
`,_=()=>(0,l.jsx)(g,{children:(0,l.jsx)(c,{hidePreview:!0,hideToolbar:!0,stableName:`InputMaskedInfoInputMode`,sourceImports:[`import styled from '@emotion/styled'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { Flex, InputMasked } from '@dnb/eufemia'`],__buildScope:{InputMasked:i},children:`<InputMasked
  maskOptions={{
    allowNegative: false,
  }}
/>
`})}),v=()=>(0,l.jsx)(g,{children:(0,l.jsx)(c,{hidePreview:!0,stableName:`InputMaskedInfoCleanNumberValues`,sourceImports:[`import styled from '@emotion/styled'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { Flex, InputMasked } from '@dnb/eufemia'`],__buildScope:{InputMasked:i},children:`<InputMasked asCurrency="EUR" value="1234.50" />
`})}),y=()=>(0,l.jsx)(g,{children:(0,l.jsx)(c,{hidePreview:!0,stableName:`InputMaskedInfoCleanNumberValues2`,sourceImports:[`import styled from '@emotion/styled'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { Flex, InputMasked } from '@dnb/eufemia'`],__buildScope:{InputMasked:i},children:`<InputMasked
  asCurrency="EUR"
  value="1234.50"
  onChange={({ numberValue }) => {
    console.log(numberValue) // type of float
  }}
/>
`})}),b=()=>(0,l.jsx)(g,{children:(0,l.jsx)(c,{hidePreview:!0,stableName:`InputMaskedInfoDecimalsCurrencyProvider`,sourceImports:[`import styled from '@emotion/styled'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { Flex, InputMasked } from '@dnb/eufemia'`],__buildScope:{Provider:n,InputMasked:i},children:`<Provider
  locale="en-GB"
  InputMasked={{
    currencyMask: {
      decimalLimit: 1, // defaults to 2
    },
  }}
>
  <InputMasked asCurrency="USD" value="1234.567" />
</Provider>
`})}),x=()=>(0,l.jsx)(g,{children:(0,l.jsx)(c,{hidePreview:!0,stableName:`InputMaskedInfoDecimalsNumberProvider`,sourceImports:[`import styled from '@emotion/styled'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { Flex, InputMasked } from '@dnb/eufemia'`],__buildScope:{Provider:n,InputMasked:i},children:`<Provider
  locale="en-GB"
  InputMasked={{
    numberMask: {
      decimalLimit: 2, // defaults to no decimals
    },
  }}
>
  <InputMasked asNumber value="1234.567" />
</Provider>
`})}),S=()=>(0,l.jsx)(g,{children:(0,l.jsx)(c,{hidePreview:!0,stableName:`InputMaskedInfoRemoveDecimalLimit`,sourceImports:[`import styled from '@emotion/styled'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { Flex, InputMasked } from '@dnb/eufemia'`],__buildScope:{InputMasked:i},children:`<InputMasked
  asNumber
  maskOptions={{
    allowDecimal: true,
    decimalLimit: null,
  }}
  value="1234.567"
/>
`})});function C(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...a(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.h2,{children:`Demos`}),`
`,(0,l.jsx)(o,{label:`Locale used in the demos:`,bottom:!0}),`
`,(0,l.jsx)(t.h3,{children:`Locale based numbers`}),`
`,(0,l.jsxs)(t.p,{children:[`When you use `,(0,l.jsx)(t.code,{children:`asNumber`}),` or `,(0,l.jsx)(t.code,{children:`asPercent`}),` (and `,(0,l.jsx)(t.code,{children:`asCurrency`}),` see below) it will create a mask for you and inherit the locale from the `,(0,l.jsx)(t.a,{href:`/uilib/usage/customisation/provider`,children:`Eufemia Provider`}),`, if the locale property is not given.`]}),`
`,(0,l.jsxs)(t.p,{children:[`You can still define extra mask parameters with `,(0,l.jsx)(t.code,{children:`numberMask`}),` or `,(0,l.jsx)(t.code,{children:`maskOptions`}),`, as the second input example shows (e.g. `,(0,l.jsx)(t.code,{children:`decimalLimit`}),`).`]}),`
`,(0,l.jsx)(u,{}),`
`,(0,l.jsxs)(t.h3,{children:[`Locale based `,(0,l.jsx)(t.code,{children:`asCurrency`})]}),`
`,(0,l.jsxs)(t.p,{children:[`When you use `,(0,l.jsx)(t.code,{children:`asCurrency`}),` it will create a mask for you and inherit the locale from the `,(0,l.jsx)(t.a,{href:`/uilib/usage/customisation/provider`,children:`Eufemia Provider`}),`, if the locale property is not given.`]}),`
`,(0,l.jsx)(d,{}),`
`,(0,l.jsxs)(t.h3,{children:[`Define the `,(0,l.jsx)(t.code,{children:`currencyMask`}),` manually`]}),`
`,(0,l.jsx)(f,{}),`
`,(0,l.jsx)(t.h3,{children:`Customize the number mask`}),`
`,(0,l.jsx)(p,{}),`
`,(0,l.jsxs)(t.h3,{children:[`Using the `,(0,l.jsx)(t.code,{children:`numberMask`}),` with a combined suffix`]}),`
`,(0,l.jsx)(m,{}),`
`,(0,l.jsxs)(t.h3,{children:[`Using the `,(0,l.jsx)(t.code,{children:`numberMask`}),` and a prefix`]}),`
`,(0,l.jsx)(h,{})]})}function w(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(C,{...e})}):C(e)}export{_ as a,w as default,x as i,y as n,S as o,b as r,v as t};