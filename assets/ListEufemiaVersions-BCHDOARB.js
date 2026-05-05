import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Sr as t,br as n}from"./index-CMgyXmp3.js";import{t as r}from"./ListSummaryFromEdges-p1YbDlq5.js";var i=e();function a(e){let{allMdx:{edges:a}}=t(n`
    {
      allMdx(
        filter: {
          frontmatter: { title: { ne: null }, draft: { ne: true } }
          internal: {
            contentFilePath: {
              glob: "**/uilib/about-the-lib/releases/eufemia/**/*"
            }
          }
        }
        sort: [
          { frontmatter: { order: ASC } }
          { frontmatter: { title: DESC } }
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