import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{i as n,t as r}from"./portal-query-BYW5RIMA.js";import{t as i}from"./ListSummaryFromEdges-CbnLsuDp.js";var a=e(t());function o(){let{allMdx:{edges:e}}=n(r`
    {
      allMdx(
        filter: {
          frontmatter: {
            title: { ne: null }
            draft: { ne: true }
            componentType: { in: "base-input" }
          }
          internal: {
            contentFilePath: {
              glob: "**/uilib/extensions/forms/base-fields/*"
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
  `);return(0,a.jsx)(i,{space:{top:`x-small`},level:3,size:`medium`,description:``,edges:e})}export{o as default};