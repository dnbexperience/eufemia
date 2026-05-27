import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{f as r,u as i}from"./index-BIrFyEEc.js";import{t as a}from"./ListSummaryFromEdges-CEXpza19.js";var o=t({default:()=>c}),s=e(n());function c(e){let{allMdx:{edges:t}}=r(i`
    {
      allMdx(
        filter: {
          frontmatter: {
            title: { ne: null }
            draft: { ne: true }
            componentType: { ne: "docs" }
          }
          internal: {
            contentFilePath: {
              glob: "**/uilib/extensions/forms/Form/**/*"
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