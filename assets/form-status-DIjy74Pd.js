import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-Bx3ttow-.js";import{t as r}from"./form-status-CThPS3AY.js";import i from"./demos-ClH50rSz.js";var a=e(t());function o(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Import`}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-tsx`,children:`import { FormStatus } from '@dnb/eufemia'
`})}),`
`,(0,a.jsx)(t.h2,{children:`Description`}),`
`,(0,a.jsxs)(t.p,{children:[`The FormStatus is a simple component meant for displaying the status of a form (displaying form errors, messages, etc.).
The `,(0,a.jsx)(t.code,{children:`FormStatus`}),` component should be positioned relative to the form or form input to which it is referring.`]}),`
`,(0,a.jsxs)(t.p,{children:[`Also, the `,(0,a.jsx)(t.code,{children:`FormStatus`}),` is used inside of many other form components.`]}),`
`,(0,a.jsxs)(t.p,{children:[`The `,(0,a.jsx)(t.code,{children:`FormStatus`}),` component cooperates with the `,(0,a.jsx)(t.a,{href:`/uilib/components/global-status`,children:`GlobalStatus`}),` component to summarize and display several status messages in one place.`]}),`
`,(0,a.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=16838-6706`,children:`Figma`})}),`
`,(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/form-status`,children:`Source code`})}),`
`,(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/form-status`,children:`Docs code`})}),`
`]}),`
`,(0,a.jsx)(r,{}),`
`,(0,a.jsx)(t.h2,{children:`Accessibility`}),`
`,(0,a.jsxs)(t.p,{children:[`The `,(0,a.jsx)(t.code,{children:`FormStatus`}),` component is designed to be accessible. It is important to provide a meaningful message to the user. The `,(0,a.jsx)(t.code,{children:`FormStatus`}),` component should be used to provide feedback to the user about the status of the form or form input.`]}),`
`,(0,a.jsxs)(t.p,{children:[`The `,(0,a.jsx)(t.code,{children:`FormStatus`}),` should be placed in the DOM before the form element itself and it should be linked together with the related form element by using `,(0,a.jsx)(t.code,{children:`aria-describedby`}),`.`]}),`
`,(0,a.jsx)(t.p,{children:`This will allow screen readers to find and announce the error message without too much frustration.`}),`
`,(0,a.jsxs)(t.p,{children:[`This is done automatically in all Eufemia components when the `,(0,a.jsx)(t.code,{children:`status`}),` property is used.`]}),`
`,(0,a.jsxs)(t.p,{children:[`Also, all the `,(0,a.jsx)(t.a,{href:`/uilib/extensions/forms/all-fields/`,children:`fields`}),` based on the `,(0,a.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/FieldBlock`,children:`FieldBlock`}),` support this feature without additional work. The `,(0,a.jsx)(t.code,{children:`FieldBlock`}),` also supports grouped messages and showing an error, warning, and info message at the same time.`]}),`
`,(0,a.jsx)(t.h3,{children:`Width alignment`}),`
`,(0,a.jsx)(t.p,{children:`In order to enhance accessibility (readability), the FormStatus will align its width to a linked component. This means that if the FormStatus is built into the Input component, it will inherit the width of the input.`}),`
`,(0,a.jsxs)(t.p,{children:[`The `,(0,a.jsx)(t.code,{children:`min-width`}),` is set to be `,(0,a.jsx)(t.strong,{children:`12rem`}),`. Use CSS `,(0,a.jsx)(t.code,{children:`min-width`}),` or `,(0,a.jsx)(t.code,{children:`max-width`}),` to set a custom (manual) width.`]})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}function c(e){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(s,{}),`
`,(0,a.jsx)(i,{})]})}function l(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}export{l as default};