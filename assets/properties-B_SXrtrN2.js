import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-CsG353ar.js";import{n as r}from"./PropertiesTable-DMVZFM0Y.js";import{t as i}from"./TranslationsTable-Cf8zx66W.js";import{o as a}from"./Examples-tGn3zCyv.js";import{a as o,n as s,r as c,t as l}from"./GlobalStatusDocs-BVKrdvr1.js";var u=e(t());function d(e){let t={a:`a`,code:`code`,h2:`h2`,p:`p`,pre:`pre`,...n(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Properties`}),`
`,(0,u.jsx)(r,{props:o}),`
`,(0,u.jsx)(t.h2,{children:`Translations`}),`
`,(0,u.jsx)(i,{localeKey:`GlobalStatus`}),`
`,(0,u.jsx)(t.h2,{children:`Item Object`}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-js`,children:`// simple
const items = ['Item #1', 'Item #2']

// advanced
const items = [
  { text: 'Item #1', statusId: 'id-1' },
  { text: 'Item #2', statusId: 'id-2', statusAnchorUrl: 'https://' },
]
`})}),`
`,(0,u.jsx)(t.h2,{children:`Advanced Item Properties`}),`
`,(0,u.jsx)(r,{props:l}),`
`,(0,u.jsx)(t.h2,{children:`Controllers`}),`
`,(0,u.jsx)(t.p,{children:`In React, you can make use of the helper components, the function as a kind of a controller component.
The goal is to update the content (properties/events) of the target GlobalStatus.`}),`
`,(0,u.jsx)(a,{}),`
`,(0,u.jsx)(t.h2,{children:`Controller Properties`}),`
`,(0,u.jsx)(r,{props:c}),`
`,(0,u.jsx)(t.h2,{children:`Configuration Object`}),`
`,(0,u.jsxs)(t.p,{children:[`This object is used as a representation to configure the GlobalStatus component from other components, using the `,(0,u.jsx)(t.code,{children:`globalStatus`}),` property.
See `,(0,u.jsx)(t.a,{href:`/uilib/components/autocomplete/properties`,children:`Autocomplete`}),`, `,(0,u.jsx)(t.a,{href:`/uilib/components/button/properties`,children:`Button`}),`, `,(0,u.jsx)(t.a,{href:`/uilib/components/input/properties`,children:`Input`}),`, etc, as examples that use the `,(0,u.jsx)(t.code,{children:`globalStatus`}),` property.`]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-js`,children:`{
  id: 'global-status-id',
  message: 'global status message'
}
`})}),`
`,(0,u.jsx)(t.h2,{children:`Configuration Object Properties`}),`
`,(0,u.jsx)(r,{props:s})]})}function f(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(d,{...e})}):d(e)}export{f as default};