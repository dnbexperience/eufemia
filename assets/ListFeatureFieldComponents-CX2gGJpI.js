import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{f as n,u as r}from"./index-DqqByKA2.js";import{t as i}from"./ListSummaryFromEdges-Bleb9dZo.js";var a=e(t());function o(e){let{allMdx:{edges:t}}=n(r`
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
              glob: "**/uilib/extensions/forms/feature-fields/*"
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
  `);return(0,a.jsx)(i,{edges:t,...e})}export{o as default};