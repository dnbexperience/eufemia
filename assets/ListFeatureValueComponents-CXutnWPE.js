import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{i as r,t as i}from"./portal-query-Cqjr3qe1.js";import{t as a}from"./ListSummaryFromEdges-84s8GHJi.js";var o=e({default:()=>c}),s=t(n());function c(e){let{allMdx:{edges:t}}=r(i`
    {
      allMdx(
        filter: {
          frontmatter: {
            title: { ne: null }
            draft: { ne: true }
            componentType: { regex: "/feature/" }
          }
          internal: {
            contentFilePath: {
              glob: "**/uilib/extensions/forms/Value/**/*"
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
  `);return(0,s.jsx)(a,{edges:t,...e})}export{o as n,c as t};