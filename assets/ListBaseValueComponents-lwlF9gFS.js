import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{Ct as n,Tt as r}from"./index--zEB_f_m.js";import{t as i}from"./ListSummaryFromEdges-D24NMY-x.js";var a=e({default:()=>s}),o=t();function s(e){let{allMdx:{edges:t}}=r(n`
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