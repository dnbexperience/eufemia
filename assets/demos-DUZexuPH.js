import"./rolldown-runtime-BYbx6iT9.js";import{n as e,t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-geTEYZ7b.js";import{Rr as r,a as i,p as a}from"./index-CMgyXmp3.js";e();var o=t(),s=i.div`
  *:not([data-visual-test='number-format-spacing'])
    > span.dnb-number-format {
    display: flex;
    width: max-content;
  }
  [data-visual-test='number-locales'] .dnb-p:last-of-type {
    padding-bottom: 1rem;
  }
`,c=()=>(0,o.jsx)(s,{children:(0,o.jsx)(n,{"data-visual-test":`number-format-default`,children:`<P>
  <NumberFormat.Number value="12345" srLabel="Total:" />
  <NumberFormat.Number>-12345678.9</NumberFormat.Number>
  <NumberFormat.Number prefix={<b>prefix</b>} suffix="suffix">
    -12345678.9
  </NumberFormat.Number>
  <NumberFormat.Number decimals={1}>-1234.54321</NumberFormat.Number>
  <NumberFormat.Number decimals={2} copySelection={false}>
    -1234
  </NumberFormat.Number>
  <NumberFormat.Number decimals={2}>invalid</NumberFormat.Number>
</P>
`})}),l=()=>(0,o.jsx)(s,{children:(0,o.jsx)(n,{"data-visual-test":`number-format-percent`,children:`<P>
  <NumberFormat.Percent value="12.34" />
  <NumberFormat.Percent>-12.34</NumberFormat.Percent>
  <NumberFormat.Percent decimals={1}>-12.34</NumberFormat.Percent>
</P>
`})}),u=()=>(0,o.jsx)(s,{children:(0,o.jsx)(n,{"data-visual-test":`number-format-currency`,children:`<P>
  <NumberFormat.Currency>12345</NumberFormat.Currency>
  <NumberFormat.Currency currencyPosition="before" value={-12345678.9} />
  <NumberFormat.Currency value={-12345678.95} decimals={0} />
  <NumberFormat.Currency value={-12345678.9} currencyDisplay="code" />
  <NumberFormat.Currency value={-12345678.9} currencyDisplay={false} />
  <NumberFormat.Currency decimals={2}>invalid</NumberFormat.Currency>
</P>
`})}),d=()=>(0,o.jsx)(s,{children:(0,o.jsx)(n,{children:`<Stat.Currency
  value={12345}
  currency="NOK"
  suffix="/mnd"
  signDisplay="always"
  mainSize="x-large"
  auxiliarySize="x-small"
/>
`})}),f=()=>(0,o.jsx)(s,{children:(0,o.jsx)(n,{children:`<Provider
  value={{
    NumberFormat: {
      currency: true,
      rounding: 'omit',
      cleanCopyValue: true,
    },
  }}
>
  <P>
    <NumberFormat.Currency>12345</NumberFormat.Currency>
    <NumberFormat.Currency value={-12345.123} decimals={0} />
    <NumberFormat.Currency
      value={-12345678.955}
      currencyPosition="before"
    />
  </P>
</Provider>
`})}),p=()=>(0,o.jsx)(s,{children:(0,o.jsx)(n,{"data-visual-test":`number-format-compact`,children:`<P>
  <NumberFormat.Number compact decimals={1}>
    1234
  </NumberFormat.Number>
  <NumberFormat.Number compact decimals={1} value={123456} />
  <NumberFormat.Number compact="short" decimals={2} value={-1723967.38} />
  <NumberFormat.Number compact="long" decimals={3} value={-1234567.9876} />
  <NumberFormat.Currency
    compact="long"
    value={12345}
    decimals={1}
    currencyDisplay="name"
  />
  <NumberFormat.Number compact value={123455678912} decimals={3} />
</P>
`})}),m=()=>(0,o.jsx)(s,{children:(0,o.jsx)(n,{"data-visual-test":`number-format-phone`,children:`<P>
  <NumberFormat.PhoneNumber value="99999999" />
  <NumberFormat.PhoneNumber value="+4799999999" />
  <NumberFormat.PhoneNumber value="004799999999" />
  <NumberFormat.PhoneNumber value="+4780022222" link="sms" />
  <NumberFormat.PhoneNumber value="+47116000" selectAll={false} />
  <NumberFormat.PhoneNumber value="+4702000" />
</P>
`})}),h=()=>(0,o.jsx)(s,{children:(0,o.jsx)(n,{"data-visual-test":`number-format-ban`,children:`<P>
  <NumberFormat.BankAccountNumber value="20001234567" />
</P>
`})}),g=()=>(0,o.jsx)(s,{children:(0,o.jsx)(n,{"data-visual-test":`number-format-nin`,children:`<P>
  <NumberFormat.NationalIdentityNumber value="18089212345" />
</P>
`})}),_=()=>(0,o.jsx)(s,{children:(0,o.jsx)(n,{"data-visual-test":`number-format-org`,children:`<P>
  <NumberFormat.OrganizationNumber value="123456789" suffix="MVA" />
</P>
`})}),v=()=>(0,o.jsx)(s,{children:(0,o.jsx)(n,{"data-visual-test":`number-format-locales`,children:`
<H3>Numbers</H3>
<P>
  <NumberFormat.Number locale="nb-NO" value="-12345678.9" />
  <NumberFormat.Number locale="en-GB" value="-12345678.9" />
  <NumberFormat.Number locale="de-DE" value="-12345678.9" />
  <NumberFormat.Number locale="de-CH" value="-12345678.9" />
  <NumberFormat.Number locale="fr-CH" value="-12345678.9" />
</P>
<H3>Currencies</H3>
<P>
  <NumberFormat.Currency locale="nb-NO" value="-12345.6" />
  <NumberFormat.Currency locale="en-GB" value="-12345.6" />
  <NumberFormat.Currency locale="de-DE" value="-12345.6" />
  <NumberFormat.Currency locale="de-CH" value="-12345.6" />
  <NumberFormat.Currency locale="fr-CH" value="-12345.6" />
</P>

`})}),y=()=>(0,o.jsx)(s,{children:(0,o.jsx)(n,{"data-visual-test":`number-format-spacing`,children:`
<span>text</span>
<NumberFormat.Currency value="1234" left right />
<span>text</span>
<NumberFormat.Currency value="5678" left right />
<span>text</span>

`})}),b=()=>(0,o.jsx)(s,{children:(0,o.jsx)(n,{"data-visual-test":`number-format-sign-display`,children:`
<H3>signDisplay="auto"</H3>
<P>
  <NumberFormat.Number signDisplay="auto" value={1234} />
  <NumberFormat.Number signDisplay="auto" value={-1234} />
  <NumberFormat.Number signDisplay="auto" value={0} />
</P>
<H3>signDisplay="always"</H3>
<P>
  <NumberFormat.Number signDisplay="always" value={1234} />
  <NumberFormat.Number signDisplay="always" value={-1234} />
  <NumberFormat.Number signDisplay="always" value={0} />
</P>
<H3>signDisplay="never"</H3>
<P>
  <NumberFormat.Number signDisplay="never" value={1234} />
  <NumberFormat.Number signDisplay="never" value={-1234} />
  <NumberFormat.Number signDisplay="never" value={0} />
</P>
<H3>signDisplay="negative"</H3>
<P>
  <NumberFormat.Number signDisplay="negative" value={1234} />
  <NumberFormat.Number signDisplay="negative" value={-1234} />
  <NumberFormat.Number signDisplay="negative" value={0} />
</P>
<H3>signDisplay="exceptZero"</H3>
<P>
  <NumberFormat.Number signDisplay="exceptZero" value={1234} />
  <NumberFormat.Number signDisplay="exceptZero" value={-1234} />
  <NumberFormat.Number signDisplay="exceptZero" value={0} />
</P>

`})}),x=()=>(0,o.jsx)(s,{children:(0,o.jsx)(n,{"data-visual-test":`number-format-monospace`,children:`<NumberFormat.Currency
  value="123456"
  locale="en-GB"
  currency="NOK"
  monospace
/>
`})});function S(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...r(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(a,{label:`Locale used in the demos:`}),`
`,(0,o.jsx)(t.h3,{children:`Default numbers`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Currency`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`Hero-style values`}),`
`,(0,o.jsxs)(t.p,{children:[`For prominent values, use `,(0,o.jsx)(t.a,{href:`/uilib/components/stat/`,children:`Stat`}),` with `,(0,o.jsx)(t.code,{children:`Stat.Currency`}),` and `,(0,o.jsx)(t.code,{children:`Stat.Percent`}),`.`]}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`Compact (shorten) numbers`}),`
`,(0,o.jsxs)(t.p,{children:[`Shorten numbers should only be used for numbers above 100 000. A small `,(0,o.jsx)(t.code,{children:`k`}),` for thousand is not a Norwegian standard, and should not be used in formal contexts.`]}),`
`,(0,o.jsx)(p,{}),`
`,(0,o.jsx)(t.h3,{children:`Percentage`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Phone`}),`
`,(0,o.jsxs)(t.p,{children:[`By using `,(0,o.jsx)(t.code,{children:`selectAll={false}`}),` you disable the auto-select all feature.`]}),`
`,(0,o.jsx)(m,{}),`
`,(0,o.jsx)(t.h3,{children:`Bank Account number (Kontonummer)`}),`
`,(0,o.jsx)(h,{}),`
`,(0,o.jsx)(t.h3,{children:`National Identification number (Fødselsnummer)`}),`
`,(0,o.jsx)(g,{}),`
`,(0,o.jsx)(t.h3,{children:`Organization number (Organisasjonsnummer)`}),`
`,(0,o.jsx)(_,{}),`
`,(0,o.jsx)(t.h3,{children:`Numbers and currencies in different locales`}),`
`,(0,o.jsx)(v,{}),`
`,(0,o.jsx)(t.h3,{children:`NumberFormat and spacing`}),`
`,(0,o.jsxs)(t.p,{children:[`The NumberFormat uses `,(0,o.jsx)(t.code,{children:`display: inline-block;`}),` in order to make the `,(0,o.jsx)(t.a,{href:`/uilib/layout/space`,children:`spacing system`}),` to work.`]}),`
`,(0,o.jsx)(y,{}),`
`,(0,o.jsx)(t.h3,{children:`Sign display`}),`
`,(0,o.jsxs)(t.p,{children:[`Control when to display the sign for numbers using the `,(0,o.jsx)(t.code,{children:`signDisplay`}),` property. Options include `,(0,o.jsx)(t.code,{children:`always`}),`, `,(0,o.jsx)(t.code,{children:`exceptZero`}),`, `,(0,o.jsx)(t.code,{children:`negative`}),`, and `,(0,o.jsx)(t.code,{children:`never`}),`.`]}),`
`,(0,o.jsx)(b,{}),`
`,(0,o.jsx)(t.h3,{children:`Using the Provider with NumberFormat`}),`
`,(0,o.jsxs)(t.p,{children:[`In this example every NumberFormat will receive the Provider defined properties, including `,(0,o.jsx)(t.code,{children:`cleanCopyValue`}),`.`]}),`
`,(0,o.jsx)(f,{}),`
`,(0,o.jsx)(t.h3,{children:`Monospace`}),`
`,(0,o.jsxs)(t.p,{children:[`By using the `,(0,o.jsx)(t.code,{children:`monospace`}),` property you can set the font to `,(0,o.jsx)(t.a,{href:`/quickguide-designer/fonts`,children:`DNB Mono Regular`})]}),`
`,(0,o.jsx)(x,{})]})}function C(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(S,{...e})}):S(e)}export{C as default};