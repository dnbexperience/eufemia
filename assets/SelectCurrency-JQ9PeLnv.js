import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-ppRu2ktv.js";import r from"./demos-CuFoM4wk.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.SelectCurrency />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Field.SelectCurrency`}),` is a wrapper component for `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Selection`,children:`Field.Selection`}),`, with options built in for selecting a currency.
`,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/SelectCurrency/properties/#list-of-available-currencies`,children:`The list of available currencies to select`}),` is carefully curated to meet the demands we know today.
When selecting a currency, the value returned is the selected currency's `,(0,i.jsx)(t.a,{href:`https://en.wikipedia.org/wiki/ISO_4217`,children:`ISO 4217 code`}),` (currency code) like `,(0,i.jsx)(t.code,{children:`NOK`}),` for Norwegian krone.`]}),`
`,(0,i.jsxs)(t.p,{children:[`It supports the HTML `,(0,i.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete`,children:`autocomplete`}),` attribute. Consider setting `,(0,i.jsx)(t.code,{children:`autoComplete="transaction-currency"`}),` if used to set the currency of a transaction, in a payment form.`]}),`
`,(0,i.jsxs)(t.p,{children:[`There is a corresponding `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Value/SelectCurrency`,children:`Value.SelectCurrency`}),` component.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/SelectCurrency`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/SelectCurrency`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.h3,{children:`Filter or prioritize currency listing`}),`
`,(0,i.jsxs)(t.p,{children:[`You can filter currencies with the `,(0,i.jsx)(t.code,{children:`currencies`}),` property's values `,(0,i.jsx)(t.code,{children:`Scandinavia`}),`, `,(0,i.jsx)(t.code,{children:`Nordic`}),` or `,(0,i.jsx)(t.code,{children:`Europe`}),`.`]}),`
`,(0,i.jsx)(t.p,{children:`Currencies are sorted in alphabetically order, with the following prioritized currencies on top of the list:`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:`Norwegian krone`}),`
`,(0,i.jsx)(t.li,{children:`Swedish krona`}),`
`,(0,i.jsx)(t.li,{children:`Danish krone`}),`
`,(0,i.jsx)(t.li,{children:`Euro`}),`
`,(0,i.jsx)(t.li,{children:`United States dollar`}),`
`]}),`
`,(0,i.jsx)(t.h3,{children:`TransformIn and TransformOut`}),`
`,(0,i.jsxs)(t.p,{children:[`You can use the `,(0,i.jsx)(t.code,{children:`transformIn`}),` and `,(0,i.jsx)(t.code,{children:`transformOut`}),` to transform the value before it gets displayed in the field and before it gets sent to the form context. The second parameter is the currency object. You may have a look at the demo below to see how it works.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import type { CurrencyType } from '@dnb/eufemia/extensions/forms/Field/SelectCurrency'

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
`,(0,i.jsx)(t.h3,{children:`onFocus, onBlur, onChange`}),`
`,(0,i.jsx)(t.p,{children:`These events have an additional parameter with the currency object.`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`const onFocus = (value, currency) => {}
`})}),`
`,(0,i.jsx)(t.h3,{children:`The currency object`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-ts`,children:`{
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
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};