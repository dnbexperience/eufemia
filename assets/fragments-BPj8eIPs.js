import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{i as n,t as r}from"./portal-query-Cqjr3qe1.js";import{W as i}from"./index-BCXtuv-b.js";import{t as a}from"./ListSummaryFromEdges-84s8GHJi.js";var o=e(t());function s(){let{allMdx:{edges:e}}=n(r`
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
  `);return(0,o.jsx)(a,{edges:e})}function c(e){let t={code:`code`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,...i(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h1,{children:`Fragments`}),`
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
`,(0,o.jsx)(s,{})]})}function l(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}export{l as default};