import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";import n from"./demos-CUh6BPPl.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Indeterminate />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Field.Indeterminate`}),` component is used to display and handle the indeterminate state of a checkbox. It is an uncontrolled component, meaning that the state is managed automatically.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(
  <Field.Indeterminate
    dependencePaths={['/checkbox1', '/checkbox2', '/checkbox3']}
    path="/checkboxParent"
  />
)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/base-fields/Indeterminate`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/base-fields/Indeterminate`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.p,{children:`It should only be used in combination with checkbox looking variants.`}),`
`,(0,r.jsxs)(n.p,{children:[`Under the hood the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/base-fields/Toggle/`,children:`Field.Toggle`}),` base field is used. That means you can use all the properties from the `,(0,r.jsx)(n.code,{children:`Toggle`}),` component.`]}),`
`,(0,r.jsx)(n.h2,{children:`Details about the state handling`}),`
`,(0,r.jsx)(n.p,{children:`The indeterminate state of a parent checkbox should be shown when some children checkboxes are checked, but not all. In detail:`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[`When all children are checked, the parent should get checked.`,`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:`When the parent gets checked (clicked), all children should get checked.`}),`
`]}),`
`]}),`
`,(0,r.jsxs)(n.li,{children:[`When all children are unchecked, the parent should get unchecked.`,`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:`When the parent gets unchecked (clicked), all children should get unchecked.`}),`
`]}),`
`]}),`
`,(0,r.jsxs)(n.li,{children:[`When some children are checked, the parent should be set in an indeterminate state.`,`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[`When the parent gets clicked, all children should get checked. This behavior can be changed to the opposite or `,(0,r.jsx)(n.code,{children:`auto`}),` by using the `,(0,r.jsx)(n.code,{children:`propagateIndeterminateState`}),` property. Auto means that the parent will switch from its current state to be inverted.`]}),`
`]}),`
`]}),`
`]})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};