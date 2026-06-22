import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{i as n,t as r}from"./portal-query-66iyRONR.js";import{t as i}from"./Span-D-ZXYX7F.js";import{t as a}from"./P-CbimSwQH.js";import{t as o}from"./Hr-aAMshbgw.js";import{t as s}from"./Card-DP9KYSzC.js";import{n as c,t as l}from"./Ul-Cit54Y5N.js";import{t as u}from"./Anchor-BD2JtUnS.js";import{B as d,g as f,v as p,y as m}from"./index-DdG6L_K8.js";import{t as h}from"./MainMenu.module-D4Y0Ix84.js";import{t as g}from"./lib-BraoVSgB.js";var _=e(t()),v=[{id:`actions`,title:`Actions`,description:`For things people click to do something, open choices, follow a link, or get help.`},{id:`input`,title:`Input`,description:`For entering information, choosing options, uploading files, or changing values.`},{id:`navigation`,title:`Navigation`,description:`For helping people move between pages, jump to content, or continue through steps.`},{id:`feedback`,title:`Feedback`,description:`For messages and panels that tell people what happened, what is happening, or what needs attention.`},{id:`content`,title:`Content`,description:`For showing information, such as text, numbers, tables, icons, lists, and cards.`},{id:`other`,title:`Other`,description:`For special page behavior that does not fit the groups above.`}],y=new Set(v.map(({id:e})=>e)),b=new Set([`uilib/components/fragments`,`uilib/components/overview`]);function x(e){return typeof e==`string`&&y.has(e)}function S(e){if(e!==!1)return x(e)?e:`other`}function C(){let e=n(r`
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
  `).components.edges.reduce((e,{node:t})=>{let n=t.fields.slug,r=S(t.frontmatter.category);return b.has(n)||!r||e.push({slug:n,title:t.frontmatter.title,description:t.frontmatter.description,category:r}),e},[]),t={};e.forEach(e=>{t[e.category]=t[e.category]||[],t[e.category].push(e)});let i=v.map(({id:e,title:n,description:r})=>({id:e,title:n,description:r,entries:(t[e]||[]).sort((e,t)=>e.title.localeCompare(t.title))})).filter(({entries:e})=>e.length>0);return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(w,{categories:i}),i.map(({id:e,title:t,description:n,entries:r})=>(0,_.jsxs)(`section`,{children:[(0,_.jsx)(o,{top:`x-large`}),(0,_.jsx)(p,{level:2,size:`x-large`,useSlug:e,children:t}),(0,_.jsx)(a,{children:n}),e===`input`&&(0,_.jsx)(T,{}),(0,_.jsx)(E,{entries:r})]},e))]})}function w({categories:e}){return(0,_.jsx)(`nav`,{"aria-label":`Component categories`,children:(0,_.jsx)(s.List,{bottom:`large`,children:e.map(({id:e,title:t,description:n})=>(0,_.jsx)(s.ListItem,{center:`when-small`,className:h,children:(0,_.jsxs)(s.Action,{href:`#${m(t,e)}`,stack:!0,dropShadow:!0,children:[(0,_.jsx)(i,{size:`x-large`,children:t}),(0,_.jsx)(a,{top:`small`,children:n})]})},e))})})}function T(){return(0,_.jsxs)(a,{children:[(0,_.jsx)(`strong`,{children:`NB:`}),` When creating application forms, use`,` `,(0,_.jsx)(u,{href:`/uilib/extensions/forms/`,children:`Eufemia Forms`}),` `,`instead of composing forms from the base components below.`]})}function E({entries:e}){return(0,_.jsx)(l,{className:`dnb-unstyled-list`,children:e.map(({slug:e,title:t,description:n})=>(0,_.jsxs)(c,{children:[(0,_.jsx)(i,{size:`medium`,children:(0,_.jsx)(u,{href:`/${e}`,children:t})}),n&&(0,_.jsx)(g,{components:f,children:n})]},e))})}function D(e){let t={h1:`h1`,p:`p`,...d(),...e.components};return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(t.h1,{children:`Overview`}),`
`,(0,_.jsx)(t.p,{children:`All components and fragments grouped by practical usage categories.`}),`
`,(0,_.jsx)(C,{})]})}function O(e={}){let{wrapper:t}={...d(),...e.components};return t?(0,_.jsx)(t,{...e,children:(0,_.jsx)(D,{...e})}):D(e)}export{O as default};