import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-DVm0MbGb.js";import{n}from"./PropertiesTable-C9mjC5N9.js";import{t as r}from"./SelectCountryDocs-BoGcW4qE.js";var i=e();function a(e){let a={code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...t(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(a.h2,{children:`Events`}),`
`,(0,i.jsx)(n,{props:r}),`
`,(0,i.jsx)(a.h3,{children:`Details about argument values`}),`
`,(0,i.jsxs)(a.p,{children:[`The event handlers has two arguments. The first one is a `,(0,i.jsx)(a.code,{children:`string`}),` containing the `,(0,i.jsx)(a.code,{children:`ISO`}),` of the selected country, e.g. `,(0,i.jsx)(a.code,{children:`CH`}),`, and the second argument is an object with the properties `,(0,i.jsx)(a.code,{children:`cdc`}),`, `,(0,i.jsx)(a.code,{children:`continent`}),`, `,(0,i.jsx)(a.code,{children:`i18n`}),` and `,(0,i.jsx)(a.code,{children:`iso`}),`.`]}),`
`,(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:`language-jsx`,children:`(
  value?: string, // e.g. "CH"
  additionalArgs?: {
    i18n: {
      en: string, // e.g. "Switzerland"
      nb: string // e.g. "Sveits"
    },
    cdc: string, // e.g. "41"
    iso: string, // e.g. "CH"
    continent: string, // e.g. "Europe"
    name: string, // e.g. "Sveits"
    regions?: string[] // e.g ["Scandinavia", "Nordic"]
  }
) => void
`})})]})}function o(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}export{o as default};