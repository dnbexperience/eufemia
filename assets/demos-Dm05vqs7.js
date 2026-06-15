import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{Q as n}from"./Anchor-Djq5YQEM.js";import{t as r}from"./P-C9wBv35m.js";import{t as i}from"./H3-BONyL4Vo.js";import{t as a}from"./NumberFormatExport-VkMzyyld.js";import{K as o,m as s,o as c}from"./index-ppRu2ktv.js";import{t as l}from"./ComponentBox-R2c6Bo76.js";import{t as u}from"./Stat-CGkUEeWs.js";var d=e(t()),f=a,p=s.div`
  *:not([data-visual-test='number-format-spacing'])
    > span.dnb-number-format {
    display: flex;
    width: max-content;
  }
  [data-visual-test='number-locales'] .dnb-p:last-of-type {
    padding-bottom: 1rem;
  }
`,m=()=>(0,d.jsx)(p,{children:(0,d.jsx)(l,{"data-visual-test":`number-format-default`,stableName:`NumberDefault`,sourceImports:[`import styled from '@emotion/styled'`,`import { Provider } from '@dnb/eufemia/shared'`,`import NumberFormat from '@dnb/eufemia/components/NumberFormat'`,`import Stat from '@dnb/eufemia/components/Stat'`,`import P from '@dnb/eufemia/elements/P'`,`import H3 from '@dnb/eufemia/elements/H3'`],__buildScope:{P:r,NumberFormat:f},children:`<P>
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
`})}),h=()=>(0,d.jsx)(p,{children:(0,d.jsx)(l,{"data-visual-test":`number-format-percent`,stableName:`NumberPercent`,sourceImports:[`import styled from '@emotion/styled'`,`import { Provider } from '@dnb/eufemia/shared'`,`import NumberFormat from '@dnb/eufemia/components/NumberFormat'`,`import Stat from '@dnb/eufemia/components/Stat'`,`import P from '@dnb/eufemia/elements/P'`,`import H3 from '@dnb/eufemia/elements/H3'`],__buildScope:{P:r,NumberFormat:f},children:`<P>
  <NumberFormat.Percent value="12.34" />
  <NumberFormat.Percent>-12.34</NumberFormat.Percent>
  <NumberFormat.Percent decimals={1}>-12.34</NumberFormat.Percent>
</P>
`})}),g=()=>(0,d.jsx)(p,{children:(0,d.jsx)(l,{"data-visual-test":`number-format-currency`,stableName:`NumberCurrency`,sourceImports:[`import styled from '@emotion/styled'`,`import { Provider } from '@dnb/eufemia/shared'`,`import NumberFormat from '@dnb/eufemia/components/NumberFormat'`,`import Stat from '@dnb/eufemia/components/Stat'`,`import P from '@dnb/eufemia/elements/P'`,`import H3 from '@dnb/eufemia/elements/H3'`],__buildScope:{P:r,NumberFormat:f},children:`<P>
  <NumberFormat.Currency>12345</NumberFormat.Currency>
  <NumberFormat.Currency currencyPosition="before" value={-12345678.9} />
  <NumberFormat.Currency value={-12345678.95} decimals={0} />
  <NumberFormat.Currency value={-12345678.9} currencyDisplay="code" />
  <NumberFormat.Currency value={-12345678.9} currencyDisplay={false} />
  <NumberFormat.Currency decimals={2}>invalid</NumberFormat.Currency>
</P>
`})}),_=()=>(0,d.jsx)(p,{children:(0,d.jsx)(l,{stableName:`NumberHeroStyleAmount`,sourceImports:[`import styled from '@emotion/styled'`,`import { Provider } from '@dnb/eufemia/shared'`,`import NumberFormat from '@dnb/eufemia/components/NumberFormat'`,`import Stat from '@dnb/eufemia/components/Stat'`,`import P from '@dnb/eufemia/elements/P'`,`import H3 from '@dnb/eufemia/elements/H3'`],__buildScope:{Stat:u},children:`<Stat.Currency
  value={12345}
  currency="NOK"
  suffix="/mnd"
  signDisplay="always"
  mainSize="x-large"
  auxiliarySize="x-small"
/>
`})}),v=()=>(0,d.jsx)(p,{children:(0,d.jsx)(l,{stableName:`NumberProvider`,sourceImports:[`import styled from '@emotion/styled'`,`import { Provider } from '@dnb/eufemia/shared'`,`import NumberFormat from '@dnb/eufemia/components/NumberFormat'`,`import Stat from '@dnb/eufemia/components/Stat'`,`import P from '@dnb/eufemia/elements/P'`,`import H3 from '@dnb/eufemia/elements/H3'`],__buildScope:{Provider:n,NumberFormat:f,P:r},children:`<Provider
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
`})}),y=()=>(0,d.jsx)(p,{children:(0,d.jsx)(l,{"data-visual-test":`number-format-compact`,stableName:`NumberCompact`,sourceImports:[`import styled from '@emotion/styled'`,`import { Provider } from '@dnb/eufemia/shared'`,`import NumberFormat from '@dnb/eufemia/components/NumberFormat'`,`import Stat from '@dnb/eufemia/components/Stat'`,`import P from '@dnb/eufemia/elements/P'`,`import H3 from '@dnb/eufemia/elements/H3'`],__buildScope:{P:r,NumberFormat:f},children:`<P>
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
`})}),b=()=>(0,d.jsx)(p,{children:(0,d.jsx)(l,{"data-visual-test":`number-format-phone`,stableName:`NumberPhone`,sourceImports:[`import styled from '@emotion/styled'`,`import { Provider } from '@dnb/eufemia/shared'`,`import NumberFormat from '@dnb/eufemia/components/NumberFormat'`,`import Stat from '@dnb/eufemia/components/Stat'`,`import P from '@dnb/eufemia/elements/P'`,`import H3 from '@dnb/eufemia/elements/H3'`],__buildScope:{P:r,NumberFormat:f},children:`<P>
  <NumberFormat.PhoneNumber value="99999999" />
  <NumberFormat.PhoneNumber value="+4799999999" />
  <NumberFormat.PhoneNumber value="004799999999" />
  <NumberFormat.PhoneNumber value="+4780022222" link="sms" />
  <NumberFormat.PhoneNumber value="+47116000" selectAll={false} />
  <NumberFormat.PhoneNumber value="+4702000" />
</P>
`})}),x=()=>(0,d.jsx)(p,{children:(0,d.jsx)(l,{"data-visual-test":`number-format-ban`,stableName:`NumberBankAccount`,sourceImports:[`import styled from '@emotion/styled'`,`import { Provider } from '@dnb/eufemia/shared'`,`import NumberFormat from '@dnb/eufemia/components/NumberFormat'`,`import Stat from '@dnb/eufemia/components/Stat'`,`import P from '@dnb/eufemia/elements/P'`,`import H3 from '@dnb/eufemia/elements/H3'`],__buildScope:{P:r,NumberFormat:f},children:`<P>
  <NumberFormat.BankAccountNumber value="20001234567" />
</P>
`})}),S=()=>(0,d.jsx)(p,{children:(0,d.jsx)(l,{"data-visual-test":`number-format-nin`,stableName:`NumberNationalIdentification`,sourceImports:[`import styled from '@emotion/styled'`,`import { Provider } from '@dnb/eufemia/shared'`,`import NumberFormat from '@dnb/eufemia/components/NumberFormat'`,`import Stat from '@dnb/eufemia/components/Stat'`,`import P from '@dnb/eufemia/elements/P'`,`import H3 from '@dnb/eufemia/elements/H3'`],__buildScope:{P:r,NumberFormat:f},children:`<P>
  <NumberFormat.NationalIdentityNumber value="18089212345" />
</P>
`})}),C=()=>(0,d.jsx)(p,{children:(0,d.jsx)(l,{"data-visual-test":`number-format-org`,stableName:`NumberOrganization`,sourceImports:[`import styled from '@emotion/styled'`,`import { Provider } from '@dnb/eufemia/shared'`,`import NumberFormat from '@dnb/eufemia/components/NumberFormat'`,`import Stat from '@dnb/eufemia/components/Stat'`,`import P from '@dnb/eufemia/elements/P'`,`import H3 from '@dnb/eufemia/elements/H3'`],__buildScope:{P:r,NumberFormat:f},children:`<P>
  <NumberFormat.OrganizationNumber value="123456789" suffix="MVA" />
</P>
`})}),w=()=>(0,d.jsx)(p,{children:(0,d.jsx)(l,{"data-visual-test":`number-format-locales`,stableName:`NumberLocales`,sourceImports:[`import styled from '@emotion/styled'`,`import { Provider } from '@dnb/eufemia/shared'`,`import NumberFormat from '@dnb/eufemia/components/NumberFormat'`,`import Stat from '@dnb/eufemia/components/Stat'`,`import P from '@dnb/eufemia/elements/P'`,`import H3 from '@dnb/eufemia/elements/H3'`],__buildScope:{H3:i,P:r,NumberFormat:f},children:`
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

`})}),T=()=>(0,d.jsx)(p,{children:(0,d.jsx)(l,{"data-visual-test":`number-format-spacing`,stableName:`NumberSpacing`,sourceImports:[`import styled from '@emotion/styled'`,`import { Provider } from '@dnb/eufemia/shared'`,`import NumberFormat from '@dnb/eufemia/components/NumberFormat'`,`import Stat from '@dnb/eufemia/components/Stat'`,`import P from '@dnb/eufemia/elements/P'`,`import H3 from '@dnb/eufemia/elements/H3'`],__buildScope:{NumberFormat:f},children:`
<span>text</span>
<NumberFormat.Currency value="1234" left right />
<span>text</span>
<NumberFormat.Currency value="5678" left right />
<span>text</span>

`})}),E=()=>(0,d.jsx)(p,{children:(0,d.jsx)(l,{"data-visual-test":`number-format-sign-display`,stableName:`NumberSignDisplay`,sourceImports:[`import styled from '@emotion/styled'`,`import { Provider } from '@dnb/eufemia/shared'`,`import NumberFormat from '@dnb/eufemia/components/NumberFormat'`,`import Stat from '@dnb/eufemia/components/Stat'`,`import P from '@dnb/eufemia/elements/P'`,`import H3 from '@dnb/eufemia/elements/H3'`],__buildScope:{H3:i,P:r,NumberFormat:f},children:`
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

`})}),D=()=>(0,d.jsx)(p,{children:(0,d.jsx)(l,{"data-visual-test":`number-format-monospace`,stableName:`NumberMonospace`,sourceImports:[`import styled from '@emotion/styled'`,`import { Provider } from '@dnb/eufemia/shared'`,`import NumberFormat from '@dnb/eufemia/components/NumberFormat'`,`import Stat from '@dnb/eufemia/components/Stat'`,`import P from '@dnb/eufemia/elements/P'`,`import H3 from '@dnb/eufemia/elements/H3'`],__buildScope:{NumberFormat:f},children:`<NumberFormat.Currency
  value="123456"
  locale="en-GB"
  currency="NOK"
  monospace
/>
`})});function O(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...o(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(t.h2,{children:`Demos`}),`
`,(0,d.jsx)(c,{label:`Locale used in the demos:`}),`
`,(0,d.jsx)(t.h3,{children:`Default numbers`}),`
`,(0,d.jsx)(m,{}),`
`,(0,d.jsx)(t.h3,{children:`Currency`}),`
`,(0,d.jsx)(g,{}),`
`,(0,d.jsx)(t.h3,{children:`Hero-style values`}),`
`,(0,d.jsxs)(t.p,{children:[`For prominent values, use `,(0,d.jsx)(t.a,{href:`/uilib/components/stat/`,children:`Stat`}),` with `,(0,d.jsx)(t.code,{children:`Stat.Currency`}),` and `,(0,d.jsx)(t.code,{children:`Stat.Percent`}),`.`]}),`
`,(0,d.jsx)(_,{}),`
`,(0,d.jsx)(t.h3,{children:`Compact (shorten) numbers`}),`
`,(0,d.jsxs)(t.p,{children:[`Shorten numbers should only be used for numbers above 100 000. A small `,(0,d.jsx)(t.code,{children:`k`}),` for thousand is not a Norwegian standard, and should not be used in formal contexts.`]}),`
`,(0,d.jsx)(y,{}),`
`,(0,d.jsx)(t.h3,{children:`Percentage`}),`
`,(0,d.jsx)(h,{}),`
`,(0,d.jsx)(t.h3,{children:`Phone`}),`
`,(0,d.jsxs)(t.p,{children:[`By using `,(0,d.jsx)(t.code,{children:`selectAll={false}`}),` you disable the auto-select all feature.`]}),`
`,(0,d.jsx)(b,{}),`
`,(0,d.jsx)(t.h3,{children:`Bank Account number (Kontonummer)`}),`
`,(0,d.jsx)(x,{}),`
`,(0,d.jsx)(t.h3,{children:`National Identification number (Fødselsnummer)`}),`
`,(0,d.jsx)(S,{}),`
`,(0,d.jsx)(t.h3,{children:`Organization number (Organisasjonsnummer)`}),`
`,(0,d.jsx)(C,{}),`
`,(0,d.jsx)(t.h3,{children:`Numbers and currencies in different locales`}),`
`,(0,d.jsx)(w,{}),`
`,(0,d.jsx)(t.h3,{children:`NumberFormat and spacing`}),`
`,(0,d.jsxs)(t.p,{children:[`The NumberFormat uses `,(0,d.jsx)(t.code,{children:`display: inline-block;`}),` in order to make the `,(0,d.jsx)(t.a,{href:`/uilib/layout/space`,children:`spacing system`}),` to work.`]}),`
`,(0,d.jsx)(T,{}),`
`,(0,d.jsx)(t.h3,{children:`Sign display`}),`
`,(0,d.jsxs)(t.p,{children:[`Control when to display the sign for numbers using the `,(0,d.jsx)(t.code,{children:`signDisplay`}),` property. Options include `,(0,d.jsx)(t.code,{children:`always`}),`, `,(0,d.jsx)(t.code,{children:`exceptZero`}),`, `,(0,d.jsx)(t.code,{children:`negative`}),`, and `,(0,d.jsx)(t.code,{children:`never`}),`.`]}),`
`,(0,d.jsx)(E,{}),`
`,(0,d.jsx)(t.h3,{children:`Using the Provider with NumberFormat`}),`
`,(0,d.jsxs)(t.p,{children:[`In this example every NumberFormat will receive the Provider defined properties, including `,(0,d.jsx)(t.code,{children:`cleanCopyValue`}),`.`]}),`
`,(0,d.jsx)(v,{}),`
`,(0,d.jsx)(t.h3,{children:`Monospace`}),`
`,(0,d.jsxs)(t.p,{children:[`By using the `,(0,d.jsx)(t.code,{children:`monospace`}),` property you can set the font to `,(0,d.jsx)(t.a,{href:`/quickguide-designer/fonts`,children:`DNB Mono Regular`})]}),`
`,(0,d.jsx)(D,{})]})}function k(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(O,{...e})}):O(e)}export{k as default};