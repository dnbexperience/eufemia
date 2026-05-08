import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";import{c as n,d as r,f as i,l as a,p as o,u as s}from"./Examples-Dyg7NQZY.js";import c from"./demos-B25mEStc.js";var l=e();function u(e){let c={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(c.h2,{children:`Import`}),`
`,(0,l.jsx)(c.pre,{children:(0,l.jsx)(c.code,{className:`language-tsx`,children:`import { GlobalStatus } from '@dnb/eufemia'
`})}),`
`,(0,l.jsx)(c.h2,{children:`Description`}),`
`,(0,l.jsx)(c.p,{children:`The GlobalStatus is a complex component meant for displaying global application notifications or a summary of a form (displaying form errors, messages, etc.).`}),`
`,(0,l.jsxs)(c.p,{children:[`By default, the `,(0,l.jsx)(c.code,{children:`GlobalStatus`}),` is automatically connected together with the `,(0,l.jsx)(c.a,{href:`/uilib/components/form-status`,children:`FormStatus`}),` component. This means that every form component showing a status will send the status message along to the `,(0,l.jsx)(c.code,{children:`GlobalStatus`}),`.`]}),`
`,(0,l.jsx)(c.h2,{children:`Relevant links`}),`
`,(0,l.jsxs)(c.ul,{children:[`
`,(0,l.jsx)(c.li,{children:(0,l.jsx)(c.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=22127-18578`,children:`Figma`})}),`
`,(0,l.jsx)(c.li,{children:(0,l.jsx)(c.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/global-status`,children:`Source code`})}),`
`,(0,l.jsx)(c.li,{children:(0,l.jsx)(c.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/global-status`,children:`Docs code`})}),`
`]}),`
`,(0,l.jsx)(c.h3,{children:`FormStatus default behavior`}),`
`,(0,l.jsxs)(c.ol,{children:[`
`,(0,l.jsxs)(c.li,{children:[`Once a `,(0,l.jsx)(c.strong,{children:`FormStatus`}),` is shown, the `,(0,l.jsx)(c.code,{children:`main`}),` `,(0,l.jsx)(c.strong,{children:`GlobalStatus`}),` will show up.`]}),`
`,(0,l.jsxs)(c.li,{children:[`The page will scroll (if needed) to the dedicated `,(0,l.jsx)(c.strong,{children:`GlobalStatus`}),`.`]}),`
`,(0,l.jsx)(c.li,{children:`Form components will send along both the status text and its label to show a good and accessible summary.`}),`
`,(0,l.jsxs)(c.li,{children:[`Screen reader users will automatically hear the entire content of the `,(0,l.jsx)(c.code,{children:`GlobalStatus`}),` once it shows up.`]}),`
`]}),`
`,(0,l.jsx)(c.h3,{children:`Several GlobalStatus instances`}),`
`,(0,l.jsxs)(c.p,{children:[`Normally, you only want to have `,(0,l.jsx)(c.strong,{children:`one`}),` `,(0,l.jsx)(c.code,{children:`GlobalStatus`}),` inside your application. But you can have several in parallel. Make sure you give every other one a new ID:`]}),`
`,(0,l.jsx)(n,{}),`
`,(0,l.jsx)(c.h3,{children:`Where to put it`}),`
`,(0,l.jsxs)(c.ul,{children:[`
`,(0,l.jsxs)(c.li,{children:[`The `,(0,l.jsx)(c.code,{children:`GlobalStatus`}),` component should be positioned right under the header. By default, it uses `,(0,l.jsx)(c.code,{children:`main`}),` as the ID.`]}),`
`,(0,l.jsxs)(c.li,{children:[`Or as a secondary summary of errors in a submit form. Keep in mind that, by default, form components like `,(0,l.jsx)(c.a,{href:`/uilib/components/input`,children:`Input`}),` use the ID `,(0,l.jsx)(c.code,{children:`main`}),`. To make sure the built-in `,(0,l.jsx)(c.a,{href:`/uilib/components/form-status`,children:`FormStatus`}),` sends the message to another `,(0,l.jsx)(c.code,{children:`GlobalStatus`}),`, you have to set the `,(0,l.jsx)(c.a,{href:`/uilib/components/global-status/properties/#configuration-object`,children:(0,l.jsx)(c.code,{children:`globalStatus`})}),`, like:`]}),`
`]}),`
`,(0,l.jsx)(a,{}),`
`,(0,l.jsxs)(c.p,{children:[`But you can also make use of the Eufemia `,(0,l.jsx)(c.a,{href:`/uilib/usage/customisation/provider-info`,children:`Provider`}),` where you can send the `,(0,l.jsx)(c.code,{children:`globalStatus`}),` to the underlying/wrapped components, like:`]}),`
`,(0,l.jsx)(s,{}),`
`,(0,l.jsx)(c.h3,{children:`Manual updates`}),`
`,(0,l.jsxs)(c.p,{children:[`Besides the automated connection between the error states of form components (`,(0,l.jsx)(c.a,{href:`/uilib/components/form-status`,children:`FormStatus`}),`), you can update messages from anywhere in your application at any time:`]}),`
`,(0,l.jsxs)(c.p,{children:[(0,l.jsx)(c.strong,{children:`NB:`}),` The GlobalStatus will `,(0,l.jsx)(c.code,{children:`autoClose`}),` by default once all messages are removed.`]}),`
`,(0,l.jsx)(c.h3,{children:`JavaScript (interceptor situation)`}),`
`,(0,l.jsx)(c.p,{children:`You can access and manipulate an existing GlobalStatus from outside of the React render tree.`}),`
`,(0,l.jsxs)(c.ol,{children:[`
`,(0,l.jsx)(c.li,{children:`Given you have already defined a GlobalStatus in JSX:`}),`
`]}),`
`,(0,l.jsx)(n,{}),`
`,(0,l.jsxs)(c.ol,{start:`2`,children:[`
`,(0,l.jsx)(c.li,{children:`Then you can control it from within a JavaScript context whenever you need to:`}),`
`]}),`
`,(0,l.jsx)(r,{}),`
`,(0,l.jsx)(c.h3,{children:`JSX`}),`
`,(0,l.jsx)(i,{}),`
`,(0,l.jsxs)(c.p,{children:[`If you need an additional `,(0,l.jsx)(c.code,{children:`GlobalStatus`}),`, define a custom ID (custom-status):`]}),`
`,(0,l.jsx)(o,{})]})}function d(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(u,{...e})}):u(e)}function f(e){return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(d,{}),`
`,(0,l.jsx)(c,{})]})}function p(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(f,{...e})}):f(e)}export{p as default};