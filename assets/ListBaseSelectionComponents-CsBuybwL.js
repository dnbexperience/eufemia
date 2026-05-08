import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Ct as t,Tt as n}from"./index-2AO2Cu5K.js";import{t as r}from"./ListSummaryFromEdges-DQipjHC1.js";var i=e();function a(){let{allMdx:{edges:e}}=n(t`
    {
      allMdx(
        filter: {
          frontmatter: {
            title: { ne: null }
            draft: { ne: true }
            componentType: { in: "base-selection" }
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