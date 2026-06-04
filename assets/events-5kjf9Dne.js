import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-D7e1avVt.js";import{n as r}from"./PropertiesTable-BTN7mlQS.js";import{t as i}from"./SelectCurrencyDocs-B0suuJ5f.js";var a=e(t());function o(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...n(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Events`}),`
`,(0,a.jsx)(r,{props:i}),`
`,(0,a.jsx)(t.h3,{children:`Details about argument values`}),`
`,(0,a.jsxs)(t.p,{children:[`The event handlers has two arguments. The first one is a `,(0,a.jsx)(t.code,{children:`string`}),` containing the `,(0,a.jsx)(t.code,{children:`ISO`}),` of the selected currency, e.g. `,(0,a.jsx)(t.code,{children:`CHF`}),`, and the second argument is an object with the properties `,(0,a.jsx)(t.code,{children:`continent`}),`, `,(0,a.jsx)(t.code,{children:`i18n`}),`, `,(0,a.jsx)(t.code,{children:`decimals`}),` and `,(0,a.jsx)(t.code,{children:`iso`}),`.`]}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-jsx`,children:`(
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
`})})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}export{s as default};