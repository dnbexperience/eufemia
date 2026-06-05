import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-Bx3ttow-.js";var r=e(t());function i(e){let t={a:`a`,blockquote:`blockquote`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:`Maintainability`}),`
`,(0,r.jsx)(t.p,{children:`The hard part of a living design system, like Eufemia, is to avoid creating black holes and choosing ways to make maintainability hard and complex.`}),`
`,(0,r.jsx)(t.p,{children:`To make this more understandable, follow along with this detailed explanation about the hard part of DNB UX's vision of maintaining future changes to accessibility, including design, diversity of thinking, future user experience evolution, alongside DNB brand changes.`}),`
`,(0,r.jsx)(t.h2,{children:`Integration`}),`
`,(0,r.jsxs)(t.p,{children:[`Now that we got a picture about `,(0,r.jsx)(t.a,{href:`/uilib/about-the-lib/living-system`,children:`what Eufemia aims to strive against`}),`, we will dive into more technical aspects on how to find solutions to support the system as it should.`]}),`
`,(0,r.jsxs)(t.blockquote,{children:[`
`,(0,r.jsx)(t.p,{children:`It is vital that Eufemia integrations are made as easy as possible to maintain, update and be prepared for maintainability and future changes.`}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Sub systems`}),`
`,(0,r.jsx)(t.p,{children:`Eufemia is built upon using a tree-shaped system pattern, where one system uses a sub-system (or parts of it) in order to shape its full existence. E.g., the Button component uses the color system, spacing system, the typography system, a naming system (properties, file names), and the icon system.`}),`
`,(0,r.jsx)(t.p,{children:`Some systems are low-level systems (like a naming system) and some are high-level systems (like components). Both types of systems we treat as our building blocks.`}),`
`,(0,r.jsx)(t.h2,{children:`Using the building blocks`}),`
`,(0,r.jsx)(t.p,{children:`Using the building blocks (sub-systems) as they are meant to be used is an important part of using Eufemia. It is in fact a key factor in helping Eufemia further develop and avoid friction and unexpected behavior changes.`}),`
`,(0,r.jsx)(t.h3,{children:`Color system usage`}),`
`,(0,r.jsx)(t.p,{children:`As an example, we can look at the color system, which provides colors in the form of both CSS variables and JavaScript variables. Reusing these variables is an important part of using Eufemia. Once you have to declare a color in your code, make sure to use custom properties for that. It makes code readable, maintainable, and easier to change in the future.`}),`
`,(0,r.jsx)(t.h2,{children:`Adapter pattern`}),`
`,(0,r.jsx)(t.p,{children:`In order to both serve ready-to-use components and make them as flexible as possible to be used, there are a couple of different concepts Eufemia is following:`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:`Helper pattern`}),`
`,(0,r.jsx)(t.li,{children:`Property pattern (Web Components)`}),`
`,(0,r.jsx)(t.li,{children:`Higher order component pattern`}),`
`,(0,r.jsx)(t.li,{children:`Render property pattern`}),`
`,(0,r.jsx)(t.li,{children:`Hooks pattern`}),`
`]}),`
`,(0,r.jsx)(t.p,{children:`It will vary when and where these extensions are used. And some extensions, like the property pattern, are used by almost every component.`}),`
`,(0,r.jsx)(t.p,{children:`Overall, the reuse of existing adapters and APIs and using components for what they are designed for will allow Eufemia to further develop and be maintainable.`}),`
`,(0,r.jsx)(t.h2,{children:`The declarative paradigm`}),`
`,(0,r.jsx)(t.p,{children:`HTML and CSS are by nature declarative. But once they are used together, they quickly and certainly lead to imperative programming styles, especially when JavaScript comes into the picture.`}),`
`,(0,r.jsx)(t.p,{children:`We want to avoid creating applications with imperative programming styles, because of its nature to make code hard to read and maintain. We encourage everyone to write code as declarative and functional as possible. Parts that belong together, should naturally be kept close to each other, but still as small independent, encapsulated blocks.`})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};