import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t,f as n,u as r}from"./index-DVm0MbGb.js";import{t as i}from"./ListSummaryFromEdges-7aW4dt81.js";var a=e();function o(e){let{allMdx:{edges:t}}=n(r`
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
  `);return(0,a.jsx)(i,{edges:t,...e})}function s(e){let n={h1:`h1`,p:`p`,...t(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h1,{children:`Components`}),`
`,(0,a.jsx)(n.p,{children:`DNB Eufemia components are ready-to-use, styled, and custom-built HTML elements.`}),`
`,(0,a.jsx)(o,{})]})}function c(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(s,{...e})}):s(e)}export{c as default};