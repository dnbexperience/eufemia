import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{i as n,t as r}from"./portal-query-T23qDpBh.js";import{t as i}from"./Hr-BdU3w3bL.js";import{n as a,t as o}from"./Ul-CCie81mi.js";import{t as s}from"./Anchor-DSzgYeSp.js";import{K as c}from"./index-CsG353ar.js";import l from"./clone-repo-uuyyDLU3.js";import u from"./commit-changes-FvK41W75.js";import d from"./install-dependencies-s7DEsg3Q.js";import f from"./make-and-run-tests-CzLJ3elV.js";import p from"./making-changes-yL9PuOXs.js";import m from"./update-change-logs-pyxTKVBX.js";var h=e(t()),g=({edges:e})=>(0,h.jsx)(o,{children:e.sort((e,t)=>e.node.frontmatter.order>t.node.frontmatter.order?1:-1).map(({node:e})=>e.tableOfContents?.items).filter(Boolean).reduce((e,t)=>(t.forEach(t=>e.push(t)),e),[]).map((e,t)=>(0,h.jsx)(_,{...e},`${e.title}-${t}`))});function _({title:e,url:t,items:n}){return(0,h.jsxs)(a,{children:[(0,h.jsx)(s,{href:t,children:e}),n?.length>0&&(0,h.jsx)(o,{children:n.map((e,t)=>(0,h.jsx)(_,{...e},`${e.title}-${t}`))})]})}var v=()=>{let{allMdx:{edges:e}}=n(r`
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
If you are new to the repository, first check out `,(0,h.jsx)(t.a,{href:`/contribute/first-contribution#how-to-report-an-issue-or-suggest-a-new-feature`,children:`how to report an issue or suggest a new feature`}),`.`]}),`
`,(0,h.jsx)(v,{}),`
`,(0,h.jsx)(i,{top:`large`}),`
`,(0,h.jsx)(l,{}),`
`,(0,h.jsx)(d,{}),`
`,(0,h.jsx)(p,{}),`
`,(0,h.jsx)(f,{}),`
`,(0,h.jsx)(m,{}),`
`,(0,h.jsx)(u,{})]})}function b(e={}){let{wrapper:t}={...c(),...e.components};return t?(0,h.jsx)(t,{...e,children:(0,h.jsx)(y,{...e})}):y(e)}export{b as default};