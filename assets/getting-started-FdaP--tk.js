import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Ct as t,Lr as n,On as r,Tt as i,_n as a,kn as o,kt as s}from"./index-2AO2Cu5K.js";import c from"./clone-repo-BBvoCatU.js";import l from"./commit-changes-DhLVYqGY.js";import u from"./install-dependencies-ByLiXzz_.js";import d from"./make-and-run-tests-CJvIhtNY.js";import f from"./making-changes-BsvC9eF9.js";import p from"./update-change-logs-CNekkpWz.js";var m=e(),h=({edges:e})=>(0,m.jsx)(a,{children:e.sort((e,t)=>e.node.frontmatter.order>t.node.frontmatter.order?1:-1).map(({node:e})=>e.tableOfContents?.items).filter(Boolean).reduce((e,t)=>(t.forEach(t=>e.push(t)),e),[]).map((e,t)=>(0,m.jsx)(g,{...e},`${e.title}-${t}`))});function g({title:e,url:t,items:n}){return(0,m.jsxs)(r,{children:[(0,m.jsx)(s,{href:t,children:e}),n?.length>0&&(0,m.jsx)(a,{children:n.map((e,t)=>(0,m.jsx)(g,{...e},`${e.title}-${t}`))})]})}var _=()=>{let{allMdx:{edges:e}}=i(t`
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
  `);return(0,m.jsx)(h,{edges:e})};function v(e){let t={a:`a`,h1:`h1`,p:`p`,...n(),...e.components};return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(t.h1,{children:`Getting started`}),`
`,(0,m.jsxs)(t.p,{children:[`You are now ready to get started. Here you will find a step-by-step guide to making changes in the Eufemia repo.
If you are new to the repository, first check out `,(0,m.jsx)(t.a,{href:`/contribute/first-contribution#what-should-i-know-before-getting-started`,children:`what you should know before getting started`}),`.`]}),`
`,(0,m.jsx)(_,{}),`
`,(0,m.jsx)(o,{top:`large`}),`
`,(0,m.jsx)(c,{}),`
`,(0,m.jsx)(u,{}),`
`,(0,m.jsx)(f,{}),`
`,(0,m.jsx)(d,{}),`
`,(0,m.jsx)(p,{}),`
`,(0,m.jsx)(l,{})]})}function y(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,m.jsx)(t,{...e,children:(0,m.jsx)(v,{...e})}):v(e)}export{y as default};