import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{i as n,t as r}from"./portal-query-BYW5RIMA.js";import{K as i}from"./index-ppRu2ktv.js";import{t as a}from"./ListSummaryFromEdges-CbnLsuDp.js";var o=e(t());function s(e){let{allMdx:{edges:t}}=n(r`
    {
      allMdx(
        filter: {
          frontmatter: {
            title: { ne: "" }
            draft: { ne: true }
            hideInMenu: { ne: true }
          }
          internal: { contentFilePath: { glob: "**/uilib/extensions/*" } }
        }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              description
            }
          }
        }
      }
    }
  `);return(0,o.jsx)(a,{edges:t,...e})}function c(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,...i(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h1,{children:`Extensions`}),`
`,(0,o.jsx)(t.h2,{children:`Description`}),`
`,(0,o.jsx)(t.p,{children:`Eufemia extensions are reusable parts that do not fit naturally into a component or element but rather have the nature of being an extended solution of Eufemia.
There are several great reasons behind opting for having extensions separated:`}),`
`,(0,o.jsxs)(t.ol,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`Modularity and Reusability`}),`: Separating extensions promotes a modular design and minimizes code duplication. It enables the creation of subsystems that are tightly integrated with their respective domains, such as a Forms extension that seamlessly connects to its associated data and functionality.`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`Decoupled Complexity`}),`: Extensions often add specific or advanced functionality that may not be relevant for all use cases. Keeping them separate prevents the core components or elements from becoming overly complex.`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`Customizability`}),`: Extensions allow for easier customization and flexibility. Developers can pick and choose only the extensions they need, tailoring the solution to their specific requirements.`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`Improved Maintainability`}),`: Isolating extensions simplifies maintenance and updates. Changes to an extension do not risk introducing bugs in the core components, making the ecosystem more stable.`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`Clear Separation of Concerns`}),`: By defining extensions as independent solutions, it’s easier to distinguish between core functionality and optional features (handled by extensions).`]}),`
`]}),`
`,(0,o.jsx)(t.h3,{children:`Import extensions`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-js`,children:`import { ... } from '@dnb/eufemia/extensions'
`})}),`
`,(0,o.jsx)(t.h3,{children:`Import extensions styles`}),`
`,(0,o.jsx)(t.p,{children:`The styles for extensions are not a part of the default styles, so you have to import them explicitly.`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-js`,children:`import '@dnb/eufemia/style/themes/ui/extensions'
`})}),`
`,(0,o.jsx)(t.h2,{children:`Available Extensions`}),`
`,(0,o.jsx)(s,{})]})}function l(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}export{l as default};