import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t,f as n,u as r}from"./index-DVm0MbGb.js";import{t as i}from"./ListSummaryFromEdges-7aW4dt81.js";var a=e();function o(){let{allMdx:{edges:e}}=n(r`
    {
      allMdx(
        filter: {
          frontmatter: {
            title: { ne: "" }
            draft: { ne: true }
            hideInMenu: { ne: true }
          }
          internal: {
            contentFilePath: { glob: "**/uilib/components/fragments/*" }
          }
        }
        sort: [
          { frontmatter: { order: ASC } }
          { frontmatter: { title: ASC } }
        ]
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
  `);return(0,a.jsx)(i,{edges:e})}function s(e){let n={code:`code`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,...t(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h1,{children:`Fragments`}),`
`,(0,a.jsx)(n.h2,{children:`Import`}),`
`,(0,a.jsx)(n.p,{children:`You import them like so:`}),`
`,(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:`language-jsx`,children:`import {
  DrawerList,
  ScrollView,
  TextCounter,
} from '@dnb/eufemia/fragments'
`})}),`
`,(0,a.jsx)(n.h2,{children:`Description`}),`
`,(0,a.jsx)(n.p,{children:`Fragments are small, low-level and reusable parts used inside other components.`}),`
`,(0,a.jsx)(n.p,{children:`You may use them only to build new components from.`}),`
`,(0,a.jsx)(n.h2,{children:`Available Fragments`}),`
`,(0,a.jsx)(o,{})]})}function c(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(s,{...e})}):s(e)}export{c as default};