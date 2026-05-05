import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as t}from"./index-CMgyXmp3.js";import n from"./demos-DL0IfePd.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.SelectCurrency />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Field.SelectCurrency`}),` is a wrapper component for `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/base-fields/Selection`,children:`Field.Selection`}),`, with options built in for selecting a currency.
`,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/feature-fields/SelectCurrency/properties/#list-of-available-currencies`,children:`The list of available currencies to select`}),` is carefully curated to meet the demands we know today.
When selecting a currency, the value returned is the selected currency's `,(0,r.jsx)(n.a,{href:`https://en.wikipedia.org/wiki/ISO_4217`,children:`ISO 4217 code`}),` (currency code) like `,(0,r.jsx)(n.code,{children:`NOK`}),` for Norwegian krone.`]}),`
`,(0,r.jsxs)(n.p,{children:[`It supports the HTML `,(0,r.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete`,children:`autocomplete`}),` attribute. Consider setting `,(0,r.jsx)(n.code,{children:`autoComplete="transaction-currency"`}),` if used to set the currency of a transaction, in a payment form.`]}),`
`,(0,r.jsxs)(n.p,{children:[`There is a corresponding `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Value/SelectCurrency`,children:`Value.SelectCurrency`}),` component.`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/SelectCurrency`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/SelectCurrency`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h3,{children:`Filter or prioritize currency listing`}),`
`,(0,r.jsxs)(n.p,{children:[`You can filter currencies with the `,(0,r.jsx)(n.code,{children:`currencies`}),` property's values `,(0,r.jsx)(n.code,{children:`Scandinavia`}),`, `,(0,r.jsx)(n.code,{children:`Nordic`}),` or `,(0,r.jsx)(n.code,{children:`Europe`}),`.`]}),`
`,(0,r.jsx)(n.p,{children:`Currencies are sorted in alphabetically order, with the following prioritized currencies on top of the list:`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:`Norwegian krone`}),`
`,(0,r.jsx)(n.li,{children:`Swedish krona`}),`
`,(0,r.jsx)(n.li,{children:`Danish krone`}),`
`,(0,r.jsx)(n.li,{children:`Euro`}),`
`,(0,r.jsx)(n.li,{children:`United States dollar`}),`
`]}),`
`,(0,r.jsx)(n.h3,{children:`TransformIn and TransformOut`}),`
`,(0,r.jsxs)(n.p,{children:[`You can use the `,(0,r.jsx)(n.code,{children:`transformIn`}),` and `,(0,r.jsx)(n.code,{children:`transformOut`}),` to transform the value before it gets displayed in the field and before it gets sent to the form context. The second parameter is the currency object. You may have a look at the demo below to see how it works.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import type { CurrencyType } from '@dnb/eufemia/extensions/forms/Field/SelectCurrency'

// From the Field (internal value) to the data context or event parameter
const transformOut = (internal: string, currency: CurrencyType) => {
  if (internal) {
    return \`\${currency.name} (\${internal})\`
  }
}

// To the Field (from e.g. defaultValue)
const transformIn = (external: unknown) => {
  return String(external).match(/\\((.*)\\)/)?.[1] || 'NOK'
}
`})}),`
`,(0,r.jsx)(n.h3,{children:`onFocus, onBlur, onChange`}),`
`,(0,r.jsx)(n.p,{children:`These events have an additional parameter with the currency object.`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`const onFocus = (value, currency) => {}
`})}),`
`,(0,r.jsx)(n.h3,{children:`The currency object`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-ts`,children:`{
  continent: 'Europe',
  name: 'Norsk krone',
  iso: 'NOK',
  decimals: 2,
  i18n: {
    en: 'Norwegian krone',
    nb: 'Norsk krone',
  },
  regions: ['Scandinavia', 'Nordic']
},
`})})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};