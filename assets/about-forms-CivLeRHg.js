import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-kfZVC31v.js";import{t as r}from"./quick-start-BpdAIMsn.js";var i=e(t());function a(e){let t={a:`a`,blockquote:`blockquote`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Table of Contents`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`#philosophy`,children:`Philosophy`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`#features`,children:`Features`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`#quick-start`,children:`Quick start`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`#create-your-own-component`,children:`Create your own component`})}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Philosophy`}),`
`,(0,i.jsx)(t.p,{children:`Eufemia Forms is:`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:`A framework for building form features`}),`
`,(0,i.jsx)(t.li,{children:`Designed for flexibility`}),`
`,(0,i.jsx)(t.li,{children:`Data-driven API`}),`
`,(0,i.jsx)(t.li,{children:`Standardized data handling`}),`
`,(0,i.jsx)(t.li,{children:`Loosely coupled components and building blocks`}),`
`,(0,i.jsx)(t.li,{children:`Focused on superior user experience, accessibility, and usability`}),`
`]}),`
`,(0,i.jsx)(t.p,{children:`Eufemia Forms provides building blocks for form functionality. Components are built on an API with standardized properties that make it easier to integrate with surrounding data flow and to create custom components that work seamlessly with ready-made Eufemia Forms components.`}),`
`,(0,i.jsx)(t.p,{children:`An important aspect is that the components are data-driven. They're built on the premise of source data rather than being tightly coupled to HTML elements used in their internal implementation.`}),`
`,(0,i.jsxs)(t.blockquote,{children:[`
`,(0,i.jsx)(t.p,{children:`The primary objective of Eufemia Forms is to simplify the process of building forms by leveraging a declarative API. This approach not only saves time but also reduces code and complexity.`}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Features`}),`
`,(0,i.jsx)(t.p,{children:`Eufemia Forms consists of reusable components for data input, data display, and surrounding layout, simplifying user interface creation in React. All components are built on base Eufemia components.`}),`
`,(0,i.jsx)(t.p,{children:`Key features:`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:`Ready-to-use, data-driven form components`}),`
`,(0,i.jsx)(t.li,{children:`Tree-shakeable structure — unused code will not be included in the production bundle`}),`
`,(0,i.jsx)(t.li,{children:`All functionality in components can be controlled and overridden via properties`}),`
`,(0,i.jsxs)(t.li,{children:[`Data management using the declarative `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/getting-started/#what-is-a-json-pointer`,children:`JSON Pointer`}),` directive (e.g., `,(0,i.jsx)(t.code,{children:`path="/firstName"`}),`), optionally `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/typed-paths/`,children:`type-checked`}),` with TypeScript`]}),`
`,(0,i.jsx)(t.li,{children:`Path-scoped form updates help large forms stay responsive by reducing unnecessary updates when unrelated data paths change`}),`
`,(0,i.jsxs)(t.li,{children:[`State can be handled outside `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler`,children:`Form.Handler`}),` (Provider Context) with the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/useData`,children:`useData`}),` hook`]}),`
`,(0,i.jsx)(t.li,{children:`Support for both Zod and Ajv JSON Schema`}),`
`,(0,i.jsxs)(t.li,{children:[`Async form `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/getting-started/#async-form-behavior`,children:`submission`}),` and `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/getting-started/#async-validation`,children:`validation`}),` support`]}),`
`,(0,i.jsxs)(t.li,{children:[`Theming of field sizes with `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Appearance/`,children:`Form.Appearance`})]}),`
`,(0,i.jsxs)(t.li,{children:[`Easy-to-integrate `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/location-hooks/`,children:`browser location`}),` support`]}),`
`,(0,i.jsxs)(t.li,{children:[`Static `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Value/`,children:`value components`}),` for displaying data with proper formatting`]}),`
`,(0,i.jsxs)(t.li,{children:[`Use `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Section/`,children:`Form.Section`}),` to quickly create reusable and flexible sections and blocks`]}),`
`,(0,i.jsxs)(t.li,{children:[`Parts of your form can be isolated using `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Isolation/`,children:`Form.Isolation`})]}),`
`,(0,i.jsxs)(t.li,{children:[`Building blocks for `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/create-component`,children:`creating custom field components`})]}),`
`]}),`
`,(0,i.jsx)(r,{}),`
`,(0,i.jsxs)(t.p,{children:[`More details in the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/getting-started/`,children:`getting started`}),` section.`]}),`
`,(0,i.jsx)(t.h3,{children:`Best practices on forms (accessibility, usability, and performance)`}),`
`,(0,i.jsx)(t.p,{children:`When building forms, there are some best practices to keep in mind to ensure that your forms are accessible, usable, and performant. Read more about these best practices in the dedicated documentation on`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/best-practices-on-forms/`,children:`Best practices on forms`}),`.`]}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Create your own component`}),`
`,(0,i.jsx)(t.p,{children:`Eufemia Forms provides helper components and tools to declaratively create interactive form components that integrate seamlessly with existing data and custom form components. This ensures a consistent look and feel, even when combining ready-made components with custom local components.`}),`
`,(0,i.jsxs)(t.p,{children:[`Read more about `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/create-component`,children:`creating your own component`}),`.`]}),`
`,(0,i.jsx)(t.h2,{children:`Requirements`}),`
`,(0,i.jsx)(t.p,{children:`Some internal logic requires support for importing JSON files. Meta-frameworks often support this by default.`})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}export{o as default};