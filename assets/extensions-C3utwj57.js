import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t,f as n,u as r}from"./index-DVm0MbGb.js";import{t as i}from"./ListSummaryFromEdges-7aW4dt81.js";var a=e();function o(e){let{allMdx:{edges:t}}=n(r`
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
  `);return(0,a.jsx)(i,{edges:t,...e})}function s(e){let n={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,...t(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h1,{children:`Extensions`}),`
`,(0,a.jsx)(n.h2,{children:`Description`}),`
`,(0,a.jsx)(n.p,{children:`Eufemia extensions are reusable parts that do not fit naturally into a component or element but rather have the nature of being an extended solution of Eufemia.
There are several great reasons behind opting for having extensions separated:`}),`
`,(0,a.jsxs)(n.ol,{children:[`
`,(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:`Modularity and Reusability`}),`: Separating extensions promotes a modular design and minimizes code duplication. It enables the creation of subsystems that are tightly integrated with their respective domains, such as a Forms extension that seamlessly connects to its associated data and functionality.`]}),`
`,(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:`Decoupled Complexity`}),`: Extensions often add specific or advanced functionality that may not be relevant for all use cases. Keeping them separate prevents the core components or elements from becoming overly complex.`]}),`
`,(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:`Customizability`}),`: Extensions allow for easier customization and flexibility. Developers can pick and choose only the extensions they need, tailoring the solution to their specific requirements.`]}),`
`,(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:`Improved Maintainability`}),`: Isolating extensions simplifies maintenance and updates. Changes to an extension do not risk introducing bugs in the core components, making the ecosystem more stable.`]}),`
`,(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:`Clear Separation of Concerns`}),`: By defining extensions as independent solutions, it’s easier to distinguish between core functionality and optional features (handled by extensions).`]}),`
`]}),`
`,(0,a.jsx)(n.h3,{children:`Import extensions`}),`
`,(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:`language-js`,children:`import { ... } from '@dnb/eufemia/extensions'
`})}),`
`,(0,a.jsx)(n.h3,{children:`Import extensions styles`}),`
`,(0,a.jsx)(n.p,{children:`The styles for extensions are not a part of the default styles, so you have to import them explicitly.`}),`
`,(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:`language-js`,children:`import '@dnb/eufemia/style/themes/ui/extensions'
`})}),`
`,(0,a.jsx)(n.h2,{children:`Available Extensions`}),`
`,(0,a.jsx)(o,{})]})}function c(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(s,{...e})}):s(e)}export{c as default};