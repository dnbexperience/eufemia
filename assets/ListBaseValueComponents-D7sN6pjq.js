import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{f as n,u as r}from"./index-DVm0MbGb.js";import{t as i}from"./ListSummaryFromEdges-7aW4dt81.js";var a=e({default:()=>s}),o=t();function s(e){let{allMdx:{edges:t}}=n(r`
    {
      allMdx(
        filter: {
          frontmatter: {
            title: { ne: null }
            draft: { ne: true }
            componentType: { regex: "/base/" }
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
  `);return(0,o.jsx)(i,{edges:t,...e})}export{a as n,s as t};