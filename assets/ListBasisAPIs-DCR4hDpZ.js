import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Ct as t,Tt as n}from"./index-2AO2Cu5K.js";import{t as r}from"./ListSummaryFromEdges-DQipjHC1.js";var i=e();function a(e){let{allMdx:{edges:a}}=n(t`
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
  `);return(0,i.jsx)(r,{edges:a,...e})}export{a as default};