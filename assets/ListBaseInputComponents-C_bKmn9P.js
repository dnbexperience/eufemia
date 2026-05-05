import"./rolldown-runtime-BYbx6iT9.js";import{n as e,t}from"./jsx-runtime-BgMs7Gb-.js";import{Sr as n,br as r}from"./index-CMgyXmp3.js";import{t as i}from"./ListSummaryFromEdges-p1YbDlq5.js";e();var a=t();function o(){let{allMdx:{edges:e}}=n(r`
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