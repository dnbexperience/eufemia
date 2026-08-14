import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{i as n,t as r}from"./portal-query-6yXEQLc5.js";import{U as i}from"./index-DHCu7dhB.js";import{t as a}from"./ListSummaryFromEdges-CzmwyFwH.js";var o=e(t());function s(){let{allMdx:{edges:e}}=n(r`
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
  `);return(0,o.jsx)(a,{edges:e})}function c(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,...i(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h1,{children:`Fragments`}),`
`,(0,o.jsx)(t.h2,{children:`Import`}),`
`,(0,o.jsx)(t.p,{children:`You import them like so:`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-jsx`,children:`import { DrawerList, TextCounter } from '@dnb/eufemia/fragments'
`})}),`
`,(0,o.jsx)(t.h2,{children:`Description`}),`
`,(0,o.jsx)(t.p,{children:`Fragments are small, low-level and reusable parts used inside other components.`}),`
`,(0,o.jsx)(t.p,{children:`You may use them only to build new components from.`}),`
`,(0,o.jsxs)(t.p,{children:[`The deprecated `,(0,o.jsx)(t.code,{children:`ScrollView`}),` fragment export remains available for backwards compatibility until v13. Import the `,(0,o.jsx)(t.a,{href:`/uilib/components/scroll-view/`,children:`ScrollView component`}),` from `,(0,o.jsx)(t.code,{children:`@dnb/eufemia`}),` instead.`]}),`
`,(0,o.jsx)(t.h2,{children:`Available Fragments`}),`
`,(0,o.jsx)(s,{})]})}function l(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}export{l as default};