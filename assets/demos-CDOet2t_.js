import"./rolldown-runtime-BYbx6iT9.js";import{n as e,t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-geTEYZ7b.js";import{Rr as r,a as i,p as a}from"./index-CMgyXmp3.js";e();var o=t(),s=()=>(0,o.jsx)(p,{children:(0,o.jsx)(n,{"data-visual-test":`input-masked-number`,children:`<Flex.Vertical>
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
`})}),c=()=>(0,o.jsx)(p,{children:(0,o.jsx)(n,{"data-visual-test":`input-masked-currency`,children:`<Flex.Vertical>
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
`})}),l=()=>(0,o.jsx)(p,{children:(0,o.jsx)(n,{"data-visual-test":`input-masked-currency_mask`,children:`<Flex.Vertical>
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
`})}),u=()=>(0,o.jsx)(p,{children:(0,o.jsx)(n,{children:`<InputMasked
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
`})}),d=()=>(0,o.jsx)(p,{children:(0,o.jsx)(n,{"data-visual-test":`input-masked-number_mask`,children:`<InputMasked
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
`})}),f=()=>(0,o.jsx)(p,{children:(0,o.jsx)(n,{children:`<InputMasked
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
`})}),p=i.div`
  display: block;
  width: 100%;

  .dnb-masked-input {
    margin: 1rem 0;
  }
  .dnb-form-label + .dnb-masked-input {
    margin-top: 0;
  }
`,m=()=>(0,o.jsx)(p,{children:(0,o.jsx)(n,{hidePreview:!0,hideToolbar:!0,children:`<InputMasked
  maskOptions={{
    allowNegative: false,
  }}
/>
`})}),h=()=>(0,o.jsx)(p,{children:(0,o.jsx)(n,{hidePreview:!0,children:`<InputMasked asCurrency="EUR" value="1234.50" />
`})}),g=()=>(0,o.jsx)(p,{children:(0,o.jsx)(n,{hidePreview:!0,children:`<InputMasked
  asCurrency="EUR"
  value="1234.50"
  onChange={({ numberValue }) => {
    console.log(numberValue) // type of float
  }}
/>
`})}),_=()=>(0,o.jsx)(p,{children:(0,o.jsx)(n,{hidePreview:!0,children:`<Provider
  locale="en-GB"
  InputMasked={{
    currencyMask: {
      decimalLimit: 1, // defaults to 2
    },
  }}
>
  <InputMasked asCurrency="USD" value="1234.567" />
</Provider>
`})}),v=()=>(0,o.jsx)(p,{children:(0,o.jsx)(n,{hidePreview:!0,children:`<Provider
  locale="en-GB"
  InputMasked={{
    numberMask: {
      decimalLimit: 2, // defaults to no decimals
    },
  }}
>
  <InputMasked asNumber value="1234.567" />
</Provider>
`})}),y=()=>(0,o.jsx)(p,{children:(0,o.jsx)(n,{hidePreview:!0,children:`<InputMasked
  asNumber
  maskOptions={{
    allowDecimal: true,
    decimalLimit: null,
  }}
  value="1234.567"
/>
`})});function b(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...r(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(a,{label:`Locale used in the demos:`,bottom:!0}),`
`,(0,o.jsx)(t.h3,{children:`Locale based numbers`}),`
`,(0,o.jsxs)(t.p,{children:[`When you use `,(0,o.jsx)(t.code,{children:`asNumber`}),` or `,(0,o.jsx)(t.code,{children:`asPercent`}),` (and `,(0,o.jsx)(t.code,{children:`asCurrency`}),` see below) it will create a mask for you and inherit the locale from the `,(0,o.jsx)(t.a,{href:`/uilib/usage/customisation/provider`,children:`Eufemia Provider`}),`, if the locale property is not given.`]}),`
`,(0,o.jsxs)(t.p,{children:[`You can still define extra mask parameters with `,(0,o.jsx)(t.code,{children:`numberMask`}),` or `,(0,o.jsx)(t.code,{children:`maskOptions`}),`, as the second input example shows (e.g. `,(0,o.jsx)(t.code,{children:`decimalLimit`}),`).`]}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsxs)(t.h3,{children:[`Locale based `,(0,o.jsx)(t.code,{children:`asCurrency`})]}),`
`,(0,o.jsxs)(t.p,{children:[`When you use `,(0,o.jsx)(t.code,{children:`asCurrency`}),` it will create a mask for you and inherit the locale from the `,(0,o.jsx)(t.a,{href:`/uilib/usage/customisation/provider`,children:`Eufemia Provider`}),`, if the locale property is not given.`]}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsxs)(t.h3,{children:[`Define the `,(0,o.jsx)(t.code,{children:`currencyMask`}),` manually`]}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Customize the number mask`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsxs)(t.h3,{children:[`Using the `,(0,o.jsx)(t.code,{children:`numberMask`}),` with a combined suffix`]}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsxs)(t.h3,{children:[`Using the `,(0,o.jsx)(t.code,{children:`numberMask`}),` and a prefix`]}),`
`,(0,o.jsx)(f,{})]})}function x(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(b,{...e})}):b(e)}export{m as a,x as default,v as i,g as n,y as o,_ as r,h as t};