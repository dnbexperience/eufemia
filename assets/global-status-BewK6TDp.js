import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-D7e1avVt.js";import{c as r,d as i,f as a,l as o,p as s,u as c}from"./Examples-DCjIZYvo.js";import l from"./demos-DSaVHqJj.js";var u=e(t());function d(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Import`}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-tsx`,children:`import { GlobalStatus } from '@dnb/eufemia'
`})}),`
`,(0,u.jsx)(t.h2,{children:`Description`}),`
`,(0,u.jsx)(t.p,{children:`The GlobalStatus is a complex component meant for displaying global application notifications or a summary of a form (displaying form errors, messages, etc.).`}),`
`,(0,u.jsxs)(t.p,{children:[`By default, the `,(0,u.jsx)(t.code,{children:`GlobalStatus`}),` is automatically connected together with the `,(0,u.jsx)(t.a,{href:`/uilib/components/form-status`,children:`FormStatus`}),` component. This means that every form component showing a status will send the status message along to the `,(0,u.jsx)(t.code,{children:`GlobalStatus`}),`.`]}),`
`,(0,u.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsx)(t.li,{children:(0,u.jsx)(t.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=22127-18578`,children:`Figma`})}),`
`,(0,u.jsx)(t.li,{children:(0,u.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/global-status`,children:`Source code`})}),`
`,(0,u.jsx)(t.li,{children:(0,u.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/global-status`,children:`Docs code`})}),`
`]}),`
`,(0,u.jsx)(t.h3,{children:`FormStatus default behavior`}),`
`,(0,u.jsxs)(t.ol,{children:[`
`,(0,u.jsxs)(t.li,{children:[`Once a `,(0,u.jsx)(t.strong,{children:`FormStatus`}),` is shown, the `,(0,u.jsx)(t.code,{children:`main`}),` `,(0,u.jsx)(t.strong,{children:`GlobalStatus`}),` will show up.`]}),`
`,(0,u.jsxs)(t.li,{children:[`The page will scroll (if needed) to the dedicated `,(0,u.jsx)(t.strong,{children:`GlobalStatus`}),`.`]}),`
`,(0,u.jsx)(t.li,{children:`Form components will send along both the status text and its label to show a good and accessible summary.`}),`
`,(0,u.jsxs)(t.li,{children:[`Screen reader users will automatically hear the entire content of the `,(0,u.jsx)(t.code,{children:`GlobalStatus`}),` once it shows up.`]}),`
`]}),`
`,(0,u.jsx)(t.h3,{children:`Several GlobalStatus instances`}),`
`,(0,u.jsxs)(t.p,{children:[`Normally, you only want to have `,(0,u.jsx)(t.strong,{children:`one`}),` `,(0,u.jsx)(t.code,{children:`GlobalStatus`}),` inside your application. But you can have several in parallel. Make sure you give every other one a new ID:`]}),`
`,(0,u.jsx)(r,{}),`
`,(0,u.jsx)(t.h3,{children:`Where to put it`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[`The `,(0,u.jsx)(t.code,{children:`GlobalStatus`}),` component should be positioned right under the header. By default, it uses `,(0,u.jsx)(t.code,{children:`main`}),` as the ID.`]}),`
`,(0,u.jsxs)(t.li,{children:[`Or as a secondary summary of errors in a submit form. Keep in mind that, by default, form components like `,(0,u.jsx)(t.a,{href:`/uilib/components/input`,children:`Input`}),` use the ID `,(0,u.jsx)(t.code,{children:`main`}),`. To make sure the built-in `,(0,u.jsx)(t.a,{href:`/uilib/components/form-status`,children:`FormStatus`}),` sends the message to another `,(0,u.jsx)(t.code,{children:`GlobalStatus`}),`, you have to set the `,(0,u.jsx)(t.a,{href:`/uilib/components/global-status/properties/#configuration-object`,children:(0,u.jsx)(t.code,{children:`globalStatus`})}),`, like:`]}),`
`]}),`
`,(0,u.jsx)(o,{}),`
`,(0,u.jsxs)(t.p,{children:[`But you can also make use of the Eufemia `,(0,u.jsx)(t.a,{href:`/uilib/usage/customisation/provider-info`,children:`Provider`}),` where you can send the `,(0,u.jsx)(t.code,{children:`globalStatus`}),` to the underlying/wrapped components, like:`]}),`
`,(0,u.jsx)(c,{}),`
`,(0,u.jsx)(t.h3,{children:`Manual updates`}),`
`,(0,u.jsxs)(t.p,{children:[`Besides the automated connection between the error states of form components (`,(0,u.jsx)(t.a,{href:`/uilib/components/form-status`,children:`FormStatus`}),`), you can update messages from anywhere in your application at any time:`]}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`NB:`}),` The GlobalStatus will `,(0,u.jsx)(t.code,{children:`autoClose`}),` by default once all messages are removed.`]}),`
`,(0,u.jsx)(t.h3,{children:`JavaScript (interceptor situation)`}),`
`,(0,u.jsx)(t.p,{children:`You can access and manipulate an existing GlobalStatus from outside of the React render tree.`}),`
`,(0,u.jsxs)(t.ol,{children:[`
`,(0,u.jsx)(t.li,{children:`Given you have already defined a GlobalStatus in JSX:`}),`
`]}),`
`,(0,u.jsx)(r,{}),`
`,(0,u.jsxs)(t.ol,{start:`2`,children:[`
`,(0,u.jsx)(t.li,{children:`Then you can control it from within a JavaScript context whenever you need to:`}),`
`]}),`
`,(0,u.jsx)(i,{}),`
`,(0,u.jsx)(t.h3,{children:`JSX`}),`
`,(0,u.jsx)(a,{}),`
`,(0,u.jsxs)(t.p,{children:[`If you need an additional `,(0,u.jsx)(t.code,{children:`GlobalStatus`}),`, define a custom ID (custom-status):`]}),`
`,(0,u.jsx)(s,{})]})}function f(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(d,{...e})}):d(e)}function p(e){return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(f,{}),`
`,(0,u.jsx)(l,{})]})}function m(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(p,{...e})}):p(e)}export{m as default};