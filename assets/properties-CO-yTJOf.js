import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as n}from"./index-Da-r8F54.js";import{n as r}from"./PropertiesTable-Ch1b2I7Q.js";import{t as i}from"./TranslationsTable-DDJqRs9g.js";import{i as a,n as o}from"./StepIndicatorDocs-DDN5fXut.js";var s=e(t());function c(e){let t={code:`code`,h2:`h2`,pre:`pre`,...n(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Properties`}),`
`,(0,s.jsx)(r,{props:o}),`
`,(0,s.jsx)(t.h2,{children:`Step Item Properties`}),`
`,(0,s.jsx)(r,{props:a}),`
`,(0,s.jsx)(t.h2,{children:`Step Items example`}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-js`,children:`const steps = [
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
`,(0,s.jsx)(t.h2,{children:`Translations`}),`
`,(0,s.jsx)(i,{localeKey:`StepIndicator`})]})}function l(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}export{l as default};