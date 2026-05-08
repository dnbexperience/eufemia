import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";import{t as n}from"./form-status-SA183U9w.js";import r from"./demos-BYJtU-Av.js";var i=e();function a(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.h2,{children:`Import`}),`
`,(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:`language-tsx`,children:`import { FormStatus } from '@dnb/eufemia'
`})}),`
`,(0,i.jsx)(r.h2,{children:`Description`}),`
`,(0,i.jsxs)(r.p,{children:[`The FormStatus is a simple component meant for displaying the status of a form (displaying form errors, messages, etc.).
The `,(0,i.jsx)(r.code,{children:`FormStatus`}),` component should be positioned relative to the form or form input to which it is referring.`]}),`
`,(0,i.jsxs)(r.p,{children:[`Also, the `,(0,i.jsx)(r.code,{children:`FormStatus`}),` is used inside of many other form components.`]}),`
`,(0,i.jsxs)(r.p,{children:[`The `,(0,i.jsx)(r.code,{children:`FormStatus`}),` component cooperates with the `,(0,i.jsx)(r.a,{href:`/uilib/components/global-status`,children:`GlobalStatus`}),` component to summarize and display several status messages in one place.`]}),`
`,(0,i.jsx)(r.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(r.ul,{children:[`
`,(0,i.jsx)(r.li,{children:(0,i.jsx)(r.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=16838-6706`,children:`Figma`})}),`
`,(0,i.jsx)(r.li,{children:(0,i.jsx)(r.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/form-status`,children:`Source code`})}),`
`,(0,i.jsx)(r.li,{children:(0,i.jsx)(r.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/form-status`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(n,{}),`
`,(0,i.jsx)(r.h2,{children:`Accessibility`}),`
`,(0,i.jsxs)(r.p,{children:[`The `,(0,i.jsx)(r.code,{children:`FormStatus`}),` component is designed to be accessible. It is important to provide a meaningful message to the user. The `,(0,i.jsx)(r.code,{children:`FormStatus`}),` component should be used to provide feedback to the user about the status of the form or form input.`]}),`
`,(0,i.jsxs)(r.p,{children:[`The `,(0,i.jsx)(r.code,{children:`FormStatus`}),` should be placed in the DOM before the form element itself and it should be linked together with the related form element by using `,(0,i.jsx)(r.code,{children:`aria-describedby`}),`.`]}),`
`,(0,i.jsx)(r.p,{children:`This will allow screen readers to find and announce the error message without too much frustration.`}),`
`,(0,i.jsxs)(r.p,{children:[`This is done automatically in all Eufemia components when the `,(0,i.jsx)(r.code,{children:`status`}),` property is used.`]}),`
`,(0,i.jsxs)(r.p,{children:[`Also, all the `,(0,i.jsx)(r.a,{href:`/uilib/extensions/forms/all-fields/`,children:`fields`}),` based on the `,(0,i.jsx)(r.a,{href:`/uilib/extensions/forms/create-component/FieldBlock`,children:`FieldBlock`}),` support this feature without additional work. The `,(0,i.jsx)(r.code,{children:`FieldBlock`}),` also supports grouped messages and showing an error, warning, and info message at the same time.`]}),`
`,(0,i.jsx)(r.h3,{children:`Width alignment`}),`
`,(0,i.jsx)(r.p,{children:`In order to enhance accessibility (readability), the FormStatus will align its width to a linked component. This means that if the FormStatus is built into the Input component, it will inherit the width of the input.`}),`
`,(0,i.jsxs)(r.p,{children:[`The `,(0,i.jsx)(r.code,{children:`min-width`}),` is set to be `,(0,i.jsx)(r.strong,{children:`12rem`}),`. Use CSS `,(0,i.jsx)(r.code,{children:`min-width`}),` or `,(0,i.jsx)(r.code,{children:`max-width`}),` to set a custom (manual) width.`]})]})}function o(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};