import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";import{n}from"./PropertiesTable-2L_XcKi-.js";import{t as r}from"./SelectCurrencyDocs-CUQ459v4.js";var i=e();function a(e){let a={code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...t(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(a.h2,{children:`Events`}),`
`,(0,i.jsx)(n,{props:r}),`
`,(0,i.jsx)(a.h3,{children:`Details about argument values`}),`
`,(0,i.jsxs)(a.p,{children:[`The event handlers has two arguments. The first one is a `,(0,i.jsx)(a.code,{children:`string`}),` containing the `,(0,i.jsx)(a.code,{children:`ISO`}),` of the selected currency, e.g. `,(0,i.jsx)(a.code,{children:`CHF`}),`, and the second argument is an object with the properties `,(0,i.jsx)(a.code,{children:`continent`}),`, `,(0,i.jsx)(a.code,{children:`i18n`}),`, `,(0,i.jsx)(a.code,{children:`decimals`}),` and `,(0,i.jsx)(a.code,{children:`iso`}),`.`]}),`
`,(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:`language-jsx`,children:`(
  value?: string, // e.g. "CHF"
  additionalArgs?: {
    i18n: {
      en: string, // e.g. "Swiss franc"
      nb: string // e.g. "Sveitsisk franc"
    },
    iso: string, // e.g. "CHF"
    continent: string, // e.g. "Europe"
    name: string, // e.g. "Swiss franc"
    decimals: number, // e.g. 2
    regions?: string[] // e.g ["Scandinavia", "Nordic"]
  }
) => void
`})})]})}function o(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}export{o as default};