import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as n,f as r,u as i}from"./index-mmuoVhax.js";import{t as a}from"./ListSummaryFromEdges-C_EZhHso.js";var o=e(t());function s(){let{allMdx:{edges:e}}=r(i`
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
  `);return(0,o.jsx)(a,{edges:e})}function c(e){let t={code:`code`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,...n(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h1,{children:`Fragments`}),`
`,(0,o.jsx)(t.h2,{children:`Import`}),`
`,(0,o.jsx)(t.p,{children:`You import them like so:`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-jsx`,children:`import {
  DrawerList,
  ScrollView,
  TextCounter,
} from '@dnb/eufemia/fragments'
`})}),`
`,(0,o.jsx)(t.h2,{children:`Description`}),`
`,(0,o.jsx)(t.p,{children:`Fragments are small, low-level and reusable parts used inside other components.`}),`
`,(0,o.jsx)(t.p,{children:`You may use them only to build new components from.`}),`
`,(0,o.jsx)(t.h2,{children:`Available Fragments`}),`
`,(0,o.jsx)(s,{})]})}function l(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}export{l as default};