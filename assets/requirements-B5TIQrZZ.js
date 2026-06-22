import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{B as n}from"./index-DdG6L_K8.js";var r=e(t());function i(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:`Requirements`}),`
`,(0,r.jsxs)(t.p,{children:[`Aside from the peer dependencies, there are no specific technical requirements, except that it is highly recommended to use a compiling process with `,(0,r.jsx)(t.a,{href:`/uilib/usage/first-steps/module-formats/`,children:`tree shaking`}),` in place.`]}),`
`,(0,r.jsx)(t.h2,{children:`Usage`}),`
`,(0,r.jsxs)(t.p,{children:[`Eufemia (`,(0,r.jsx)(t.code,{children:`@dnb/eufemia`}),`) can be used within a UMD, ESM, CJS, or TypeScript environment. The purpose is to use it on top of (or inside) modern JavaScript frontend frameworks and setups. However, we strongly recommend using Eufemia with a `,(0,r.jsx)(t.strong,{children:`React stack`}),`, as this makes including the Eufemia tools and components most productive. All the component internal states are handled with React to keep only the most necessary elements in the DOM (HTML elements and event bindings).`]}),`
`,(0,r.jsx)(t.h2,{children:`The hard part of a living design system`}),`
`,(0,r.jsxs)(t.p,{children:[`The hard part of a `,(0,r.jsx)(t.a,{href:`/uilib/about-the-lib/living-system`,children:`living design system`}),`, like Eufemia, is avoiding the creation of black holes and choosing ways that make `,(0,r.jsx)(t.strong,{children:`maintainability of user experience`}),` hard and complex. To address this challenge and gain more insight, read on about `,(0,r.jsx)(t.a,{href:`/uilib/about-the-lib/maintainability`,children:(0,r.jsx)(t.strong,{children:`maintainability`})}),`.`]}),`
`,(0,r.jsx)(t.h2,{children:`React`}),`
`,(0,r.jsx)(t.p,{children:`Why React is a good choice:`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:`Declarative and functional`}),`
`,(0,r.jsx)(t.li,{children:`Immutable structure`}),`
`,(0,r.jsx)(t.li,{children:`Lightweight`}),`
`,(0,r.jsxs)(t.li,{children:[`Centralization of code that should work in context (concepts like writing code like `,(0,r.jsx)(t.strong,{children:`reading a book`}),`)`]}),`
`,(0,r.jsx)(t.li,{children:`Can be used with a JAM stack, CSR, and SSR (SPA) using the same code base (App)`}),`
`,(0,r.jsx)(t.li,{children:`Flexible frontend stack to create the best user experience, depending on the solution and its needs`}),`
`,(0,r.jsx)(t.li,{children:`Can be tailored to different conventions and guidelines`}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Using the styles`}),`
`,(0,r.jsxs)(t.p,{children:[`This library works perfectly with any styling techniques, such as `,(0,r.jsx)(t.strong,{children:`Styled Components`}),` (`,(0,r.jsx)(t.a,{href:`https://emotion.sh`,children:`Emotion`}),`), CSS Modules, or SCSS/LESS. You simply consume `,(0,r.jsx)(t.strong,{children:`ready-to-use CSS files`}),` and CSS Custom Properties (CSS variables).`]})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};