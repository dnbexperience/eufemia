import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{i as n,t as r}from"./portal-query-DtkD1mZx.js";import{t as i}from"./ListSummaryFromEdges-BML1o5oy.js";var a=e(t());function o(e){let{allMdx:{edges:t}}=n(r`
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