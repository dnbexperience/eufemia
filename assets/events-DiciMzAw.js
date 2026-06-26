import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-kfZVC31v.js";import{n as r}from"./PropertiesTable-BIB66Y92.js";import{n as i}from"./TabsDocs-CDewVvkH.js";var a=e(t());function o(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...n(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Events`}),`
`,(0,a.jsx)(r,{props:i}),`
`,(0,a.jsx)(t.h3,{children:`Prevent a change`}),`
`,(0,a.jsxs)(t.p,{children:[`You can prevent a change from happening by returning false on the `,(0,a.jsx)(t.code,{children:`onClick`}),` event handler:`]}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-tsx`,children:`<Tabs
  onClick={() => {
    if (condition === true) {
      return false
    }
  }}
  onChange={() => {
    // Will not get emitted
  }}
/>
`})})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}export{s as default};