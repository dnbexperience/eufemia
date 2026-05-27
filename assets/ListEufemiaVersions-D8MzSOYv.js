import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{f as n,u as r}from"./index-mmuoVhax.js";import{t as i}from"./ListSummaryFromEdges-C_EZhHso.js";var a=e(t());function o(e){let{allMdx:{edges:t}}=n(r`
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
  `);return(0,a.jsx)(i,{edges:t,...e})}export{o as default};