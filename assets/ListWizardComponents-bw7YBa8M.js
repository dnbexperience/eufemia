import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{i as r,t as i}from"./portal-query-66iyRONR.js";import{t as a}from"./ListSummaryFromEdges-CFpSEgZ8.js";var o=e({default:()=>c}),s=t(n());function c(e){let{allMdx:{edges:t}}=r(i`
    {
      allMdx(
        filter: {
          frontmatter: { title: { ne: null }, draft: { ne: true } }
          internal: {
            contentFilePath: {
              glob: "**/uilib/extensions/forms/Wizard/**/*"
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
  `);return(0,s.jsx)(a,{edges:t,...e})}export{o as n,c as t};