import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";import{n}from"./PropertiesTable-2L_XcKi-.js";import{t as r}from"./TranslationsTable-48oSJOWa.js";import{o as i}from"./Examples-Dyg7NQZY.js";import{a,n as o,r as s,t as c}from"./GlobalStatusDocs-BwANEffX.js";var l=e();function u(e){let u={a:`a`,code:`code`,h2:`h2`,p:`p`,pre:`pre`,...t(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(u.h2,{children:`Properties`}),`
`,(0,l.jsx)(n,{props:a}),`
`,(0,l.jsx)(u.h2,{children:`Translations`}),`
`,(0,l.jsx)(r,{localeKey:`GlobalStatus`}),`
`,(0,l.jsx)(u.h2,{children:`Item Object`}),`
`,(0,l.jsx)(u.pre,{children:(0,l.jsx)(u.code,{className:`language-js`,children:`// simple
const items = ['Item #1', 'Item #2']

// advanced
const items = [
  { text: 'Item #1', statusId: 'id-1' },
  { text: 'Item #2', statusId: 'id-2', statusAnchorUrl: 'https://' },
]
`})}),`
`,(0,l.jsx)(u.h2,{children:`Advanced Item Properties`}),`
`,(0,l.jsx)(n,{props:c}),`
`,(0,l.jsx)(u.h2,{children:`Controllers`}),`
`,(0,l.jsx)(u.p,{children:`In React, you can make use of the helper components, the function as a kind of a controller component.
The goal is to update the content (properties/events) of the target GlobalStatus.`}),`
`,(0,l.jsx)(i,{}),`
`,(0,l.jsx)(u.h2,{children:`Controller Properties`}),`
`,(0,l.jsx)(n,{props:s}),`
`,(0,l.jsx)(u.h2,{children:`Configuration Object`}),`
`,(0,l.jsxs)(u.p,{children:[`This object is used as a representation to configure the GlobalStatus component from other components, using the `,(0,l.jsx)(u.code,{children:`globalStatus`}),` property.
See `,(0,l.jsx)(u.a,{href:`/uilib/components/autocomplete/properties`,children:`Autocomplete`}),`, `,(0,l.jsx)(u.a,{href:`/uilib/components/button/properties`,children:`Button`}),`, `,(0,l.jsx)(u.a,{href:`/uilib/components/input/properties`,children:`Input`}),`, etc, as examples that use the `,(0,l.jsx)(u.code,{children:`globalStatus`}),` property.`]}),`
`,(0,l.jsx)(u.pre,{children:(0,l.jsx)(u.code,{className:`language-js`,children:`{
  id: 'global-status-id',
  message: 'global status message'
}
`})}),`
`,(0,l.jsx)(u.h2,{children:`Configuration Object Properties`}),`
`,(0,l.jsx)(n,{props:o})]})}function d(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(u,{...e})}):u(e)}export{d as default};