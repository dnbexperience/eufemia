import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{f as t,u as n}from"./index-DVm0MbGb.js";import{t as r}from"./ListSummaryFromEdges-7aW4dt81.js";var i=e();function a(e){let{allMdx:{edges:a}}=t(n`
    {
      allMdx(
        filter: {
          frontmatter: {
            showTabs: { ne: null }
            title: { ne: null }
            draft: { ne: true }
          }
          internal: {
            contentFilePath: {
              glob: "**/uilib/extensions/forms/feature-fields/{more-fields/,}*"
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
  `);return(0,i.jsx)(r,{edges:a,...e})}export{a as default};