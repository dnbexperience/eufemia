import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{t}from"./ComponentBox-DPdYTeDv.js";import{Lr as n,Mt as r,s as i}from"./index--zEB_f_m.js";var a=e(),o=()=>(0,a.jsx)(f,{children:(0,a.jsx)(t,{"data-visual-test":`input-masked-number`,children:`<Flex.Vertical>
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
`})}),s=()=>(0,a.jsx)(f,{children:(0,a.jsx)(t,{"data-visual-test":`input-masked-currency`,children:`<Flex.Vertical>
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
`})}),c=()=>(0,a.jsx)(f,{children:(0,a.jsx)(t,{"data-visual-test":`input-masked-currency_mask`,children:`<Flex.Vertical>
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
`})}),l=()=>(0,a.jsx)(f,{children:(0,a.jsx)(t,{children:`<InputMasked
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
`})}),u=()=>(0,a.jsx)(f,{children:(0,a.jsx)(t,{"data-visual-test":`input-masked-number_mask`,children:`<InputMasked
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
`})}),d=()=>(0,a.jsx)(f,{children:(0,a.jsx)(t,{children:`<InputMasked
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
`})}),f=r.div`
  display: block;
  width: 100%;

  .dnb-masked-input {
    margin: 1rem 0;
  }
  .dnb-form-label + .dnb-masked-input {
    margin-top: 0;
  }
`,p=()=>(0,a.jsx)(f,{children:(0,a.jsx)(t,{hidePreview:!0,hideToolbar:!0,children:`<InputMasked
  maskOptions={{
    allowNegative: false,
  }}
/>
`})}),m=()=>(0,a.jsx)(f,{children:(0,a.jsx)(t,{hidePreview:!0,children:`<InputMasked asCurrency="EUR" value="1234.50" />
`})}),h=()=>(0,a.jsx)(f,{children:(0,a.jsx)(t,{hidePreview:!0,children:`<InputMasked
  asCurrency="EUR"
  value="1234.50"
  onChange={({ numberValue }) => {
    console.log(numberValue) // type of float
  }}
/>
`})}),g=()=>(0,a.jsx)(f,{children:(0,a.jsx)(t,{hidePreview:!0,children:`<Provider
  locale="en-GB"
  InputMasked={{
    currencyMask: {
      decimalLimit: 1, // defaults to 2
    },
  }}
>
  <InputMasked asCurrency="USD" value="1234.567" />
</Provider>
`})}),_=()=>(0,a.jsx)(f,{children:(0,a.jsx)(t,{hidePreview:!0,children:`<Provider
  locale="en-GB"
  InputMasked={{
    numberMask: {
      decimalLimit: 2, // defaults to no decimals
    },
  }}
>
  <InputMasked asNumber value="1234.567" />
</Provider>
`})}),v=()=>(0,a.jsx)(f,{children:(0,a.jsx)(t,{hidePreview:!0,children:`<InputMasked
  asNumber
  maskOptions={{
    allowDecimal: true,
    decimalLimit: null,
  }}
  value="1234.567"
/>
`})});function y(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...n(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(i,{label:`Locale used in the demos:`,bottom:!0}),`
`,(0,a.jsx)(t.h3,{children:`Locale based numbers`}),`
`,(0,a.jsxs)(t.p,{children:[`When you use `,(0,a.jsx)(t.code,{children:`asNumber`}),` or `,(0,a.jsx)(t.code,{children:`asPercent`}),` (and `,(0,a.jsx)(t.code,{children:`asCurrency`}),` see below) it will create a mask for you and inherit the locale from the `,(0,a.jsx)(t.a,{href:`/uilib/usage/customisation/provider`,children:`Eufemia Provider`}),`, if the locale property is not given.`]}),`
`,(0,a.jsxs)(t.p,{children:[`You can still define extra mask parameters with `,(0,a.jsx)(t.code,{children:`numberMask`}),` or `,(0,a.jsx)(t.code,{children:`maskOptions`}),`, as the second input example shows (e.g. `,(0,a.jsx)(t.code,{children:`decimalLimit`}),`).`]}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsxs)(t.h3,{children:[`Locale based `,(0,a.jsx)(t.code,{children:`asCurrency`})]}),`
`,(0,a.jsxs)(t.p,{children:[`When you use `,(0,a.jsx)(t.code,{children:`asCurrency`}),` it will create a mask for you and inherit the locale from the `,(0,a.jsx)(t.a,{href:`/uilib/usage/customisation/provider`,children:`Eufemia Provider`}),`, if the locale property is not given.`]}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsxs)(t.h3,{children:[`Define the `,(0,a.jsx)(t.code,{children:`currencyMask`}),` manually`]}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`Customize the number mask`}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsxs)(t.h3,{children:[`Using the `,(0,a.jsx)(t.code,{children:`numberMask`}),` with a combined suffix`]}),`
`,(0,a.jsx)(u,{}),`
`,(0,a.jsxs)(t.h3,{children:[`Using the `,(0,a.jsx)(t.code,{children:`numberMask`}),` and a prefix`]}),`
`,(0,a.jsx)(d,{})]})}function b(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(y,{...e})}):y(e)}export{p as a,b as default,_ as i,h as n,v as o,g as r,m as t};