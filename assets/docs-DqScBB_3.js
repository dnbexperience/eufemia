import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{i as n,t as r}from"./portal-query-DtkD1mZx.js";import{t as i}from"./Card-Db-Q1D3Y.js";import{t as a}from"./VisuallyHidden-lE_yQ_wF.js";import{a as o,c as s,d as c,h as l,i as u,l as d,o as f,r as p,s as m,t as h}from"./index-kfZVC31v.js";import{a as g,i as _,n as v,o as y,r as b}from"./MainMenu.module-D4Y0Ix84.js";import{t as x}from"./Card-tpQB9QT-.js";var S=e(t());function C(){let{categories:{edges:e}}=n(r`
    query {
      categories: allMdx(
        filter: {
          fields: {
            slug: {
              in: [
                "uilib"
                "quickguide-designer"
                "icons"
                "design-system"
                "brand"
                "principles"
                "contribute"
              ]
            }
          }
        }
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
  `),t=e.reduce((e,{node:{fields:{slug:t},frontmatter:n}})=>(e[t]={url:`/${t}/`,slug:t,...n},e),{});return(0,S.jsxs)(`nav`,{className:y,children:[(0,S.jsx)(`h1`,{id:`welcome-heading`,className:`dnb-sr-only`,children:`Welcome to Eufemia`}),(0,S.jsx)(`div`,{"aria-labelledby":`welcome-heading`,children:(0,S.jsx)(S.Fragment,{children:(0,S.jsxs)(`div`,{className:v,children:[(0,S.jsxs)(`figure`,{className:g,children:[(0,S.jsx)(l,{"aria-hidden":!0}),(0,S.jsx)(`figcaption`,{children:(0,S.jsx)(a,{children:`Eufemia`})})]}),(0,S.jsx)(c,{}),(0,S.jsxs)(i.List,{className:_,children:[(0,S.jsx)(x,{url:t[`design-system`]?.url,title:t[`design-system`]?.title,about:(0,S.jsxs)(S.Fragment,{children:[t[`design-system`]?.description,(0,S.jsxs)(`span`,{className:b,title:`Last Change log update`,children:[`Updated: `,d]})]}),icon:u}),(0,S.jsx)(x,{url:t.uilib?.url,title:t.uilib?.title,about:t.uilib?.description,icon:s}),(0,S.jsx)(x,{url:t[`quickguide-designer`]?.url,title:t[`quickguide-designer`]?.title,about:t[`quickguide-designer`]?.description,icon:m}),(0,S.jsx)(x,{url:t.icons?.url,title:t.icons?.title,about:t.icons?.description,icon:f}),(0,S.jsx)(x,{url:t.brand?.url,title:t.brand?.title,about:t.brand?.description,icon:p}),(0,S.jsx)(x,{url:t.contribute?.url,title:t.contribute?.title,about:t.contribute?.description,icon:o})]})]})})})]})}function w(){let{site:{siteMetadata:{title:e,description:t}}}=n(r`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);return h({title:e,description:t}),(0,S.jsx)(`main`,{"aria-label":`Choose a menu section`,className:`home-background`,children:(0,S.jsx)(C,{})})}export{w as default};