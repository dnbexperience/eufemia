import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import{n}from"./PropertiesTable-NQTsOnC6.js";import{r,t as i}from"./TabsDocs-Y1Fw-NvR.js";var a=e();function o(e){let o={code:`code`,h2:`h2`,p:`p`,pre:`pre`,...t(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(o.h2,{children:`Properties`}),`
`,(0,a.jsx)(n,{props:r}),`
`,(0,a.jsx)(o.h2,{children:`Data object`}),`
`,(0,a.jsx)(n,{props:i}),`
`,(0,a.jsx)(o.h2,{children:`Key`}),`
`,(0,a.jsx)(o.p,{children:`The key can be a string or a number.
But if the key is a number (integer), we have to deliver the content directly in the tab item:`}),`
`,(0,a.jsx)(o.pre,{children:(0,a.jsx)(o.code,{className:`language-ts`,children:`const tabsDataWithContent = [
  { title: 'First', key: 1, content: <H2>First</H2> },
  { title: 'Second', key: 2, content: () => <H2>Second</H2> },
]
`})}),`
`,(0,a.jsx)(o.h2,{children:`Example Data`}),`
`,(0,a.jsx)(o.pre,{children:(0,a.jsx)(o.code,{className:`language-ts`,children:`const tabsData = [
  { title: 'First', key: 'first' },
  { title: 'Second', key: 'second' },
  { title: 'Third', key: 'third', disabled: true },
  { title: 'Fourth', key: 'fourth' },
]
`})}),`
`,(0,a.jsx)(o.h2,{children:`Current tab`}),`
`,(0,a.jsxs)(o.p,{children:[`The current Tab content can be a `,(0,a.jsx)(o.code,{children:`string`}),`, a function returning content or a `,(0,a.jsx)(o.code,{children:`React component`}),`.`]})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}export{s as default};