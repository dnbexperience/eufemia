import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{t as n}from"./Anchor-C2Mh6LnT.js";import{i as r,t as i}from"./portal-query-6yXEQLc5.js";import{t as a}from"./Span-CANOSoKP.js";import{t as o}from"./P-CX3-UwOl.js";import{t as s}from"./Hr-DpNDl4Ig.js";import{t as c}from"./Card-C4jdcnXT.js";import{n as l,t as u}from"./Ul-CjgfIB5g.js";import{S as d,U as f,_ as p,g as m,v as h,x as g,y as _}from"./index-DHCu7dhB.js";import{t as v}from"./MainMenu.module-D4Y0Ix84.js";import{t as y}from"./lib-g3uipXvM.js";var b=e(t());function x(){let e=r(i`
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
  `).components.edges.reduce((e,{node:t})=>{let n=t.fields.slug,r=_(t.frontmatter.category);return h.has(n)||!r||e.push({slug:n,title:t.frontmatter.title,description:t.frontmatter.description,category:r}),e},[]),t={};e.forEach(e=>{t[e.category]=t[e.category]||[],t[e.category].push(e)});let n=p.map(({id:e,title:n,description:r})=>({id:e,title:n,description:r,entries:(t[e]||[]).sort((e,t)=>e.title.localeCompare(t.title))})).filter(({entries:e})=>e.length>0);return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(S,{categories:n}),n.map(({id:e,title:t,description:n,entries:r})=>(0,b.jsxs)(`section`,{children:[(0,b.jsx)(s,{top:`x-large`}),(0,b.jsx)(g,{level:2,size:`x-large`,useSlug:e,children:t}),(0,b.jsx)(o,{children:n}),e===`input`&&(0,b.jsx)(C,{}),(0,b.jsx)(w,{entries:r})]},e))]})}function S({categories:e}){return(0,b.jsx)(`nav`,{"aria-label":`Component categories`,children:(0,b.jsx)(c.List,{bottom:`large`,children:e.map(({id:e,title:t,description:n})=>(0,b.jsx)(c.ListItem,{center:`when-small`,className:v,children:(0,b.jsxs)(c.Action,{href:`#${d(t,e)}`,stack:!0,dropShadow:!0,children:[(0,b.jsx)(a,{size:`x-large`,children:t}),(0,b.jsx)(o,{top:`small`,children:n})]})},e))})})}function C(){return(0,b.jsxs)(o,{children:[(0,b.jsx)(`strong`,{children:`NB:`}),` When creating application forms, use`,` `,(0,b.jsx)(n,{href:`/uilib/extensions/forms/`,children:`Eufemia Forms`}),` `,`instead of composing forms from the base components below.`]})}function w({entries:e}){return(0,b.jsx)(u,{className:`dnb-unstyled-list`,children:e.map(({slug:e,title:t,description:r})=>(0,b.jsxs)(l,{children:[(0,b.jsx)(a,{size:`medium`,children:(0,b.jsx)(n,{href:`/${e}`,children:t})}),r&&(0,b.jsx)(y,{components:m,children:r})]},e))})}function T(e){let t={h1:`h1`,p:`p`,...f(),...e.components};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(t.h1,{children:`Overview`}),`
`,(0,b.jsx)(t.p,{children:`All components and fragments grouped by practical usage categories.`}),`
`,(0,b.jsx)(x,{})]})}function E(e={}){let{wrapper:t}={...f(),...e.components};return t?(0,b.jsx)(t,{...e,children:(0,b.jsx)(T,{...e})}):T(e)}export{E as default};