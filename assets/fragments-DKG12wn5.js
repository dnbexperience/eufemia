import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Ct as t,Lr as n,Tt as r}from"./index--zEB_f_m.js";import{t as i}from"./ListSummaryFromEdges-D24NMY-x.js";var a=e();function o(){let{allMdx:{edges:e}}=r(t`
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
  `);return(0,a.jsx)(i,{edges:e})}function s(e){let t={code:`code`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,...n(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{children:`Fragments`}),`
`,(0,a.jsx)(t.h2,{children:`Import`}),`
`,(0,a.jsx)(t.p,{children:`You import them like so:`}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-jsx`,children:`import {
  DrawerList,
  ScrollView,
  TextCounter,
} from '@dnb/eufemia/fragments'
`})}),`
`,(0,a.jsx)(t.h2,{children:`Description`}),`
`,(0,a.jsx)(t.p,{children:`Fragments are small, low-level and reusable parts used inside other components.`}),`
`,(0,a.jsx)(t.p,{children:`You may use them only to build new components from.`}),`
`,(0,a.jsx)(t.h2,{children:`Available Fragments`}),`
`,(0,a.jsx)(o,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(s,{...e})}):s(e)}export{c as default};