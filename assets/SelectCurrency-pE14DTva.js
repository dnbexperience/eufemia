import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";import n from"./demos-BWzROiAM.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.SelectCurrency />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Value.SelectCurrency`}),` will render the selected currency display name by the `,(0,r.jsx)(n.code,{children:`value`}),`'s ISO code (`,(0,r.jsx)(n.a,{href:`https://en.wikipedia.org/wiki/ISO_4217`,children:`ISO 4217 code`}),`). It displays the currency name in the current locale, together with the currency ISO code, like `,(0,r.jsx)(n.code,{children:`Norwegian krone (NOK)`}),`. If the value provided is not a valid/supported ISO code, it displays the value.`]}),`
`,(0,r.jsxs)(n.p,{children:[`There is a corresponding `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/feature-fields/SelectCurrency`,children:`Field.SelectCurrency`}),` component.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.SelectCurrency path="/currency" />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/SelectCurrency`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/SelectCurrency`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsxs)(n.h3,{children:[`The `,(0,r.jsx)(n.code,{children:`useCurrency`}),` hook`]}),`
`,(0,r.jsxs)(n.p,{children:[`You can use the `,(0,r.jsx)(n.code,{children:`Value.SelectCurrency.useCurrency`}),` hook to get the currency display name by ISO code (`,(0,r.jsx)(n.a,{href:`https://en.wikipedia.org/wiki/ISO_4217`,children:`ISO 4217 code`}),`). It returns the currency name in the current locale, together with the currency ISO code, like `,(0,r.jsx)(n.code,{children:`Norwegian krone (NOK)`}),`.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Value } from '@dnb/eufemia/extensions/forms'

const MyComponent = () => {
  const { getCurrencyDisplayNameByIso } =
    Value.SelectCurrency.useCurrency('NOK')
}
`})})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};