import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-ppRu2ktv.js";import r from"./demos-UPIRzqsV.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Indeterminate />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Field.Indeterminate`}),` component is used to display and handle the indeterminate state of a checkbox. It is an uncontrolled component, meaning that the state is managed automatically.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(
  <Field.Indeterminate
    dependencePaths={['/checkbox1', '/checkbox2', '/checkbox3']}
    path="/checkboxParent"
  />
)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/base-fields/Indeterminate`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/base-fields/Indeterminate`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.p,{children:`It should only be used in combination with checkbox looking variants.`}),`
`,(0,i.jsxs)(t.p,{children:[`Under the hood the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Toggle/`,children:`Field.Toggle`}),` base field is used. That means you can use all the properties from the `,(0,i.jsx)(t.code,{children:`Toggle`}),` component.`]}),`
`,(0,i.jsx)(t.h2,{children:`Details about the state handling`}),`
`,(0,i.jsx)(t.p,{children:`The indeterminate state of a parent checkbox should be shown when some children checkboxes are checked, but not all. In detail:`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[`When all children are checked, the parent should get checked.`,`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:`When the parent gets checked (clicked), all children should get checked.`}),`
`]}),`
`]}),`
`,(0,i.jsxs)(t.li,{children:[`When all children are unchecked, the parent should get unchecked.`,`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:`When the parent gets unchecked (clicked), all children should get unchecked.`}),`
`]}),`
`]}),`
`,(0,i.jsxs)(t.li,{children:[`When some children are checked, the parent should be set in an indeterminate state.`,`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[`When the parent gets clicked, all children should get checked. This behavior can be changed to the opposite or `,(0,i.jsx)(t.code,{children:`auto`}),` by using the `,(0,i.jsx)(t.code,{children:`propagateIndeterminateState`}),` property. Auto means that the parent will switch from its current state to be inverted.`]}),`
`]}),`
`]}),`
`]})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};