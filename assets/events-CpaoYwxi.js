import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import{n}from"./PropertiesTable-NQTsOnC6.js";import{n as r}from"./TabsDocs-Y1Fw-NvR.js";var i=e();function a(e){let a={code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...t(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(a.h2,{children:`Events`}),`
`,(0,i.jsx)(n,{props:r}),`
`,(0,i.jsx)(a.h3,{children:`Prevent a change`}),`
`,(0,i.jsxs)(a.p,{children:[`You can prevent a change from happening by returning false on the `,(0,i.jsx)(a.code,{children:`onClick`}),` event handler:`]}),`
`,(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:`language-tsx`,children:`<Tabs
  onClick={() => {
    if (condition === true) {
      return false
    }
  }}
  onChange={() => {
    // Will not get emitted
  }}
/>
`})})]})}function o(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}export{o as default};