import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-kfZVC31v.js";import{n as r}from"./PropertiesTable-BIB66Y92.js";import{t as i}from"./TranslationsTable-iPBn5EeB.js";import{r as a,t as o}from"./TabsDocs-CDewVvkH.js";var s=e(t());function c(e){let t={code:`code`,h2:`h2`,p:`p`,pre:`pre`,...n(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Properties`}),`
`,(0,s.jsx)(r,{props:a}),`
`,(0,s.jsx)(t.h2,{children:`Data object`}),`
`,(0,s.jsx)(r,{props:o}),`
`,(0,s.jsx)(t.h2,{children:`Key`}),`
`,(0,s.jsx)(t.p,{children:`The key can be a string or a number.
But if the key is a number (integer), we have to deliver the content directly in the tab item:`}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-ts`,children:`const tabsDataWithContent = [
  { title: 'First', key: 1, content: <H2>First</H2> },
  { title: 'Second', key: 2, content: () => <H2>Second</H2> },
]
`})}),`
`,(0,s.jsx)(t.h2,{children:`Example Data`}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-ts`,children:`const tabsData = [
  { title: 'First', key: 'first' },
  { title: 'Second', key: 'second' },
  { title: 'Third', key: 'third', disabled: true },
  { title: 'Fourth', key: 'fourth' },
]
`})}),`
`,(0,s.jsx)(t.h2,{children:`Current tab`}),`
`,(0,s.jsxs)(t.p,{children:[`The current Tab content can be a `,(0,s.jsx)(t.code,{children:`string`}),`, a function returning content or a `,(0,s.jsx)(t.code,{children:`React component`}),`.`]}),`
`,(0,s.jsx)(t.h2,{children:`Translations`}),`
`,(0,s.jsx)(i,{localeKey:`Tabs`})]})}function l(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}export{l as default};