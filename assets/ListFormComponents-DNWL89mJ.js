import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{Ct as n,Tt as r}from"./index-2AO2Cu5K.js";import{t as i}from"./ListSummaryFromEdges-DQipjHC1.js";var a=e({default:()=>s}),o=t();function s(e){let{allMdx:{edges:t}}=r(n`
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
  `);return(0,o.jsx)(i,{edges:t,...e})}export{a as n,s as t};