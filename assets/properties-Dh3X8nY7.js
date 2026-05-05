import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as t}from"./index-CMgyXmp3.js";import{n}from"./PropertiesTable-UfuSIzSr.js";import{t as r}from"./TranslationsTable-B6uVFdVX.js";import{i,n as a}from"./StepIndicatorDocs-Vr2_u-Cx.js";var o=e();function s(e){let s={code:`code`,h2:`h2`,pre:`pre`,...t(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(s.h2,{children:`Properties`}),`
`,(0,o.jsx)(n,{props:a}),`
`,(0,o.jsx)(s.h2,{children:`Step Item Properties`}),`
`,(0,o.jsx)(n,{props:i}),`
`,(0,o.jsx)(s.h2,{children:`Step Items example`}),`
`,(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:`language-js`,children:`const steps = [
  { title: 'Active' },
  { title: 'Active and marked as current', isCurrent: true },
  { title: 'Not active', inactive: true },
  { title: 'Disabled', disabled: true },
  {
    title: 'Active item with status text',
    status: 'Status text',
    statusState: 'warning', // defaults to warning
  },
]
`})}),`
`,(0,o.jsx)(s.h2,{children:`Translations`}),`
`,(0,o.jsx)(r,{localeKey:`StepIndicator`})]})}function c(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(s,{...e})}):s(e)}export{c as default};