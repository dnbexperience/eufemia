import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{f as n,u as r}from"./index-BIrFyEEc.js";import{t as i}from"./ListSummaryFromEdges-CEXpza19.js";var a=e(t());function o(e){let{allMdx:{edges:t}}=n(r`
    {
      allMdx(
        filter: {
          frontmatter: {
            title: { ne: null }
            draft: { ne: true }
            componentType: { in: "basis-api" }
          }
          internal: {
            contentFilePath: { glob: "**/uilib/extensions/forms/**/*" }
          }
        }
        sort: [{ frontmatter: { title: ASC } }]
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
  `);return(0,a.jsx)(i,{edges:t,...e})}export{o as default};