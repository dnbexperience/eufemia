import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{i as n,t as r}from"./portal-query-2jVhah92.js";import{W as i}from"./index-D7e1avVt.js";import{t as a}from"./ListSummaryFromEdges-B6tiVya9.js";var o=e(t());function s(e){let{allMdx:{edges:t}}=n(r`
    {
      allMdx(
        filter: {
          frontmatter: {
            title: { ne: null }
            draft: { ne: true }
            hideInMenu: { ne: true }
          }
          internal: {
            contentFilePath: {
              regex: "/(?!uilib/components/fragments)(uilib/components/.*)/"
            }
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
  `);return(0,o.jsx)(a,{edges:t,...e})}function c(e){let t={h1:`h1`,p:`p`,...i(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h1,{children:`Components`}),`
`,(0,o.jsx)(t.p,{children:`DNB Eufemia components are ready-to-use, styled, and custom-built HTML elements.`}),`
`,(0,o.jsx)(s,{})]})}function l(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}export{l as default};