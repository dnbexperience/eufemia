import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{Dn as n,On as r,f as i,g as a,gn as o,u as s,zr as c}from"./index-DqqByKA2.js";import l from"./clone-repo-DNZB6Kp1.js";import u from"./commit-changes-Dp2D89p1.js";import d from"./install-dependencies-BW-lXzOh.js";import f from"./make-and-run-tests-eJYvJ8N4.js";import p from"./making-changes-BPgpfZVL.js";import m from"./update-change-logs-D6WkqYJM.js";var h=e(t()),g=({edges:e})=>(0,h.jsx)(o,{children:e.sort((e,t)=>e.node.frontmatter.order>t.node.frontmatter.order?1:-1).map(({node:e})=>e.tableOfContents?.items).filter(Boolean).reduce((e,t)=>(t.forEach(t=>e.push(t)),e),[]).map((e,t)=>(0,h.jsx)(_,{...e},`${e.title}-${t}`))});function _({title:e,url:t,items:r}){return(0,h.jsxs)(n,{children:[(0,h.jsx)(a,{href:t,children:e}),r?.length>0&&(0,h.jsx)(o,{children:r.map((e,t)=>(0,h.jsx)(_,{...e},`${e.title}-${t}`))})]})}var v=()=>{let{allMdx:{edges:e}}=i(s`
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
  `);return(0,h.jsx)(g,{edges:e})};function y(e){let t={a:`a`,h1:`h1`,p:`p`,...c(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(t.h1,{children:`Getting started`}),`
`,(0,h.jsxs)(t.p,{children:[`You are now ready to get started. Here you will find a step-by-step guide to making changes in the Eufemia repo.
If you are new to the repository, first check out `,(0,h.jsx)(t.a,{href:`/contribute/first-contribution#what-should-i-know-before-getting-started`,children:`what you should know before getting started`}),`.`]}),`
`,(0,h.jsx)(v,{}),`
`,(0,h.jsx)(r,{top:`large`}),`
`,(0,h.jsx)(l,{}),`
`,(0,h.jsx)(d,{}),`
`,(0,h.jsx)(p,{}),`
`,(0,h.jsx)(f,{}),`
`,(0,h.jsx)(m,{}),`
`,(0,h.jsx)(u,{})]})}function b(e={}){let{wrapper:t}={...c(),...e.components};return t?(0,h.jsx)(t,{...e,children:(0,h.jsx)(y,{...e})}):y(e)}export{b as default};