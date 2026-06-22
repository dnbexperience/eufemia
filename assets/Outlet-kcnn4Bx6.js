import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{B as n}from"./index-DdG6L_K8.js";import r from"./demos-UIjl3RDy.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.Outlet formHandlerId="my-form-id">...</Form.Outlet>)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Form.Outlet`}),` links its children to an existing `,(0,i.jsx)(t.code,{children:`Form.Handler`}),` context by `,(0,i.jsx)(t.code,{children:`formHandlerId`}),`.`]}),`
`,(0,i.jsx)(t.p,{children:`This is useful when you need to render parts of a form outside the handler subtree, such as in a side panel, modal footer, or another layout region.`}),`
`,(0,i.jsxs)(t.p,{children:[`The `,(0,i.jsx)(t.code,{children:`formHandlerId`}),` is required and must reference a mounted `,(0,i.jsx)(t.code,{children:`Form.Handler`}),`.`]}),`
`,(0,i.jsxs)(t.p,{children:[`When `,(0,i.jsx)(t.code,{children:`Form.Outlet`}),` is placed `,(0,i.jsx)(t.strong,{children:`outside`}),` a `,(0,i.jsx)(t.code,{children:`Form.Handler`}),` subtree it automatically wraps its children in a `,(0,i.jsx)(t.code,{children:`<form>`}),` element, so submit buttons work correctly. When placed `,(0,i.jsx)(t.strong,{children:`inside`}),` an existing `,(0,i.jsx)(t.code,{children:`Form.Handler`}),`, no extra `,(0,i.jsx)(t.code,{children:`<form>`}),` element is added.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/useData/`,children:`Form.useData`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/useSubmit/`,children:`Form.useSubmit`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Form/Outlet`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Form/Outlet`,children:`Docs code`})}),`
`]})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};