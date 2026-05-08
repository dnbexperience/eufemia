import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Ct as t,Lr as n,Tt as r}from"./index--zEB_f_m.js";import{t as i}from"./ListSummaryFromEdges-D24NMY-x.js";var a=e();function o(e){let{allMdx:{edges:n}}=r(t`
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
  `);return(0,a.jsx)(i,{edges:n,...e})}function s(e){let t={h1:`h1`,p:`p`,...n(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{children:`Components`}),`
`,(0,a.jsx)(t.p,{children:`DNB Eufemia components are ready-to-use, styled, and custom-built HTML elements.`}),`
`,(0,a.jsx)(o,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(s,{...e})}):s(e)}export{c as default};