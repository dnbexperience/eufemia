import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{B as n}from"./index-DdG6L_K8.js";var r=e(t());function i(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h2,{children:`Import`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
// Use Form.clearData
`})}),`
`,(0,r.jsx)(t.h2,{children:`Description`}),`
`,(0,r.jsxs)(t.p,{children:[`The `,(0,r.jsx)(t.code,{children:`Form.clearData`}),` lets you clear the data of a form.`]}),`
`,(0,r.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Form/clearData.ts`,children:`Source code`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Form/clearData`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-jsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

const myFormId = 'unique-id' // or a function, object or React Context reference

function Component() {
  return <Form.Handler id={myFormId}>...</Form.Handler>
}

// You can call it later and even outside of the form
Form.clearData(myFormId)
`})})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsx)(a,{})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};