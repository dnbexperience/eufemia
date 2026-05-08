import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Ct as t,Tt as n}from"./index--zEB_f_m.js";import{t as r}from"./ListSummaryFromEdges-D24NMY-x.js";var i=e();function a(e){let{allMdx:{edges:a}}=n(t`
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
              glob: "**/uilib/extensions/forms/feature-fields/more-fields/*"
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