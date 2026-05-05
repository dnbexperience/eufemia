import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as t,Sr as n,Zn as r,br as i,fr as a,kt as o,ur as s}from"./index-CMgyXmp3.js";import c from"./clone-repo-CJYVl8GU.js";import l from"./commit-changes-B7WvriNH.js";import u from"./install-dependencies-B6KO9e_J.js";import d from"./make-and-run-tests-DQNrgB0E.js";import f from"./making-changes-ByOG4iTR.js";import p from"./update-change-logs-DX1lCtdl.js";var m=e(),h=({edges:e})=>(0,m.jsx)(r,{children:e.sort((e,t)=>e.node.frontmatter.order>t.node.frontmatter.order?1:-1).map(({node:e})=>e.tableOfContents?.items).filter(Boolean).reduce((e,t)=>(t.forEach(t=>e.push(t)),e),[]).map((e,t)=>(0,m.jsx)(g,{...e},`${e.title}-${t}`))});function g({title:e,url:t,items:n}){return(0,m.jsxs)(s,{children:[(0,m.jsx)(o,{href:t,children:e}),n?.length>0&&(0,m.jsx)(r,{children:n.map((e,t)=>(0,m.jsx)(g,{...e},`${e.title}-${t}`))})]})}var _=()=>{let{allMdx:{edges:e}}=n(i`
    query {
      allMdx(
        filter: {
          internal: {
            contentFilePath: { glob: "**/contribute/getting-started/*" }
          }
        }
      ) {
        edges {
          node {
            frontmatter {
              order
            }
            tableOfContents
          }
        }
      }
    }
  `);return(0,m.jsx)(h,{edges:e})};function v(e){let n={a:`a`,h1:`h1`,p:`p`,...t(),...e.components};return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(n.h1,{children:`Getting started`}),`
`,(0,m.jsxs)(n.p,{children:[`You are now ready to get started. Here you will find a step-by-step guide to making changes in the Eufemia repo.
If you are new to the repository, first check out `,(0,m.jsx)(n.a,{href:`/contribute/first-contribution#what-should-i-know-before-getting-started`,children:`what you should know before getting started`}),`.`]}),`
`,(0,m.jsx)(_,{}),`
`,(0,m.jsx)(a,{top:`large`}),`
`,(0,m.jsx)(c,{}),`
`,(0,m.jsx)(u,{}),`
`,(0,m.jsx)(f,{}),`
`,(0,m.jsx)(d,{}),`
`,(0,m.jsx)(p,{}),`
`,(0,m.jsx)(l,{})]})}function y(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,m.jsx)(n,{...e,children:(0,m.jsx)(v,{...e})}):v(e)}export{y as default};