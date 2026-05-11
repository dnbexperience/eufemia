import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{f as t,u as n}from"./index-DVm0MbGb.js";import{t as r}from"./ListSummaryFromEdges-7aW4dt81.js";var i=e();function a(){let{allMdx:{edges:e}}=t(n`
    {
      allMdx(
        filter: {
          frontmatter: {
            title: { ne: null }
            draft: { ne: true }
            componentType: { in: "base-toggle" }
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
  `);return(0,i.jsx)(r,{space:{top:`x-small`},level:3,size:`medium`,description:``,edges:e})}export{a as default};