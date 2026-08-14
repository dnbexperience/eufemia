import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{t as n}from"./Anchor-C2Mh6LnT.js";import{i as r,t as i}from"./portal-query-6yXEQLc5.js";import{t as a}from"./Hr-DpNDl4Ig.js";import{n as o,t as s}from"./Ul-CjgfIB5g.js";import{U as c}from"./index-DHCu7dhB.js";import l from"./clone-repo-DjFkqLkp.js";import u from"./commit-changes-DPWADRpf.js";import d from"./install-dependencies-DiIWIx1Y.js";import f from"./make-and-run-tests-DuYVjMr1.js";import p from"./making-changes-dIIuYCjY.js";import m from"./update-change-logs-LTPrQ6eV.js";var h=e(t()),g=({edges:e})=>(0,h.jsx)(s,{children:e.sort((e,t)=>e.node.frontmatter.order>t.node.frontmatter.order?1:-1).map(({node:e})=>e.tableOfContents?.items).filter(Boolean).reduce((e,t)=>(t.forEach(t=>e.push(t)),e),[]).map((e,t)=>(0,h.jsx)(_,{...e},`${e.title}-${t}`))});function _({title:e,url:t,items:r}){return(0,h.jsxs)(o,{children:[(0,h.jsx)(n,{href:t,children:e}),r?.length>0&&(0,h.jsx)(s,{children:r.map((e,t)=>(0,h.jsx)(_,{...e},`${e.title}-${t}`))})]})}var v=()=>{let{allMdx:{edges:e}}=r(i`
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
`,(0,h.jsx)(a,{top:`large`}),`
`,(0,h.jsx)(l,{}),`
`,(0,h.jsx)(d,{}),`
`,(0,h.jsx)(p,{}),`
`,(0,h.jsx)(f,{}),`
`,(0,h.jsx)(m,{}),`
`,(0,h.jsx)(u,{})]})}function b(e={}){let{wrapper:t}={...c(),...e.components};return t?(0,h.jsx)(t,{...e,children:(0,h.jsx)(y,{...e})}):y(e)}export{b as default};