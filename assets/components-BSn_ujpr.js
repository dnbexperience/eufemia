import"./rolldown-runtime-BYbx6iT9.js";import{n as e,t}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as n,Sr as r,br as i}from"./index-CMgyXmp3.js";import{t as a}from"./ListSummaryFromEdges-p1YbDlq5.js";e();var o=t();function s(e){let{allMdx:{edges:t}}=r(i`
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
  `);return(0,o.jsx)(a,{edges:t,...e})}function c(e){let t={h1:`h1`,p:`p`,...n(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h1,{children:`Components`}),`
`,(0,o.jsx)(t.p,{children:`DNB Eufemia components are ready-to-use, styled, and custom-built HTML elements.`}),`
`,(0,o.jsx)(s,{})]})}function l(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}export{l as default};