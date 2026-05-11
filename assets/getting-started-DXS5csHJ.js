import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t,On as n,_n as r,f as i,g as a,kn as o,u as s}from"./index-DVm0MbGb.js";import c from"./clone-repo-zoqtTNy5.js";import l from"./commit-changes-BSAXBzFS.js";import u from"./install-dependencies-BJ0N_PzC.js";import d from"./make-and-run-tests-B8BK_A6c.js";import f from"./making-changes-SRrg45lE.js";import p from"./update-change-logs-D4TzmF9D.js";var m=e(),h=({edges:e})=>(0,m.jsx)(r,{children:e.sort((e,t)=>e.node.frontmatter.order>t.node.frontmatter.order?1:-1).map(({node:e})=>e.tableOfContents?.items).filter(Boolean).reduce((e,t)=>(t.forEach(t=>e.push(t)),e),[]).map((e,t)=>(0,m.jsx)(g,{...e},`${e.title}-${t}`))});function g({title:e,url:t,items:i}){return(0,m.jsxs)(n,{children:[(0,m.jsx)(a,{href:t,children:e}),i?.length>0&&(0,m.jsx)(r,{children:i.map((e,t)=>(0,m.jsx)(g,{...e},`${e.title}-${t}`))})]})}var _=()=>{let{allMdx:{edges:e}}=i(s`
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
`,(0,m.jsx)(o,{top:`large`}),`
`,(0,m.jsx)(c,{}),`
`,(0,m.jsx)(u,{}),`
`,(0,m.jsx)(f,{}),`
`,(0,m.jsx)(d,{}),`
`,(0,m.jsx)(p,{}),`
`,(0,m.jsx)(l,{})]})}function y(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,m.jsx)(n,{...e,children:(0,m.jsx)(v,{...e})}):v(e)}export{y as default};