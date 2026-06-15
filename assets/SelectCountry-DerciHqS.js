import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-ppRu2ktv.js";import r from"./demos-BRrnTg_t.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.SelectCountry />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Value.SelectCountry`}),` will render the selected country name by `,(0,i.jsx)(t.code,{children:`value`}),`'s ISO code (`,(0,i.jsx)(t.a,{href:`https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2`,children:`ISO 3166-1 alpha-2 code`}),`). It displays the country name in the current locale. If the value provided is not a valid/supported ISO code, it displays the value.`]}),`
`,(0,i.jsxs)(t.p,{children:[`There is a corresponding `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/SelectCountry`,children:`Field.SelectCountry`}),` component.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.SelectCountry path="/country" />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/SelectCountry`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/SelectCountry`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsxs)(t.h3,{children:[`The `,(0,i.jsx)(t.code,{children:`useCountry`}),` hook`]}),`
`,(0,i.jsxs)(t.p,{children:[`You can use the `,(0,i.jsx)(t.code,{children:`Value.SelectCountry.useCountry`}),` hook to get the country name by ISO code (`,(0,i.jsx)(t.a,{href:`https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2`,children:`ISO 3166-1 alpha-2 code`}),`). It returns the country name in the current locale.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Value } from '@dnb/eufemia/extensions/forms'

const MyComponent = () => {
  const { getCountryNameByIso } = Value.SelectCountry.useCountry('NO')
}
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};