import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{i as n,t as r}from"./portal-query-DtkD1mZx.js";import{t as i}from"./Span-BcY87oLt.js";import{t as a}from"./P-CtWu9WHu.js";import{t as o}from"./Hr-CJrT8ZK6.js";import{t as s}from"./Card-Db-Q1D3Y.js";import{n as c,t as l}from"./Ul-B82dvgWP.js";import{t as u}from"./Anchor-EBcWrN_M.js";import{S as d,U as f,_ as p,g as m,v as h,x as g,y as _}from"./index-kfZVC31v.js";import{t as v}from"./MainMenu.module-D4Y0Ix84.js";import{t as y}from"./lib-BraoVSgB.js";var b=e(t());function x(){let e=n(r`
    {
      components: allMdx(
        filter: {
          frontmatter: {
            title: { ne: null }
            draft: { ne: true }
            hideInMenu: { ne: true }
          }
          internal: {
            contentFilePath: { regex: "/(uilib/components/.*)/" }
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
              category
            }
          }
        }
      }
    }
  `).components.edges.reduce((e,{node:t})=>{let n=t.fields.slug,r=_(t.frontmatter.category);return h.has(n)||!r||e.push({slug:n,title:t.frontmatter.title,description:t.frontmatter.description,category:r}),e},[]),t={};e.forEach(e=>{t[e.category]=t[e.category]||[],t[e.category].push(e)});let i=p.map(({id:e,title:n,description:r})=>({id:e,title:n,description:r,entries:(t[e]||[]).sort((e,t)=>e.title.localeCompare(t.title))})).filter(({entries:e})=>e.length>0);return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(S,{categories:i}),i.map(({id:e,title:t,description:n,entries:r})=>(0,b.jsxs)(`section`,{children:[(0,b.jsx)(o,{top:`x-large`}),(0,b.jsx)(g,{level:2,size:`x-large`,useSlug:e,children:t}),(0,b.jsx)(a,{children:n}),e===`input`&&(0,b.jsx)(C,{}),(0,b.jsx)(w,{entries:r})]},e))]})}function S({categories:e}){return(0,b.jsx)(`nav`,{"aria-label":`Component categories`,children:(0,b.jsx)(s.List,{bottom:`large`,children:e.map(({id:e,title:t,description:n})=>(0,b.jsx)(s.ListItem,{center:`when-small`,className:v,children:(0,b.jsxs)(s.Action,{href:`#${d(t,e)}`,stack:!0,dropShadow:!0,children:[(0,b.jsx)(i,{size:`x-large`,children:t}),(0,b.jsx)(a,{top:`small`,children:n})]})},e))})})}function C(){return(0,b.jsxs)(a,{children:[(0,b.jsx)(`strong`,{children:`NB:`}),` When creating application forms, use`,` `,(0,b.jsx)(u,{href:`/uilib/extensions/forms/`,children:`Eufemia Forms`}),` `,`instead of composing forms from the base components below.`]})}function w({entries:e}){return(0,b.jsx)(l,{className:`dnb-unstyled-list`,children:e.map(({slug:e,title:t,description:n})=>(0,b.jsxs)(c,{children:[(0,b.jsx)(i,{size:`medium`,children:(0,b.jsx)(u,{href:`/${e}`,children:t})}),n&&(0,b.jsx)(y,{components:m,children:n})]},e))})}function T(e){let t={h1:`h1`,p:`p`,...f(),...e.components};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(t.h1,{children:`Overview`}),`
`,(0,b.jsx)(t.p,{children:`All components and fragments grouped by practical usage categories.`}),`
`,(0,b.jsx)(x,{})]})}function E(e={}){let{wrapper:t}={...f(),...e.components};return t?(0,b.jsx)(t,{...e,children:(0,b.jsx)(T,{...e})}):T(e)}export{E as default};