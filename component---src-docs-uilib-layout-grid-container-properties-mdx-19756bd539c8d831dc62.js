"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[89698],{28850:function(e,n,r){r.r(n),r.d(n,{default:function(){return o}});var s=r(52322),t=r(45392),i=r(85179);const a={columns:{doc:"Define how many columns your layout should be divided in. Can be just a number `columns={12}` or an object with media query sizes like `columns={{ small: 4, medium: 6, large: 12 }}` (default values). You can also disabled CSS Grid by providing `false` for one size, like so `columns={{ small: 4, medium: false, large: 12 }}`.",type:["number","object"],status:"optional"},rowGap:{doc:"Defines how much the gap between rows should be. Can be `large`, `medium`, `small`, `x-small` or `false` for no gap. Defaults to `false`.",type:["string","false"],status:"optional"},columnGap:{doc:"Defines how much the gap between columns should be. Can be `large`, `medium`, `small`, `x-small` or `false` for no gap. Defaults to `false`.",type:["string","false"],status:"optional"},element:{doc:"Define the type of element. Defaults to `div`.",type:["string","React.Element"],status:"optional"}};function l(e){const n=Object.assign({h2:"h2"},(0,t.ah)(),e.components);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h2,{children:"Properties"}),"\n",(0,s.jsx)(i.ZP,{props:a})]})}var o=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,t.ah)(),e.components);return n?(0,s.jsx)(n,Object.assign({},e,{children:(0,s.jsx)(l,e)})):l(e)}},85179:function(e,n,r){r.d(n,{Kw:function(){return g},ZP:function(){return j}});var s=r(70894),t=r(61185),i=r(55560),a=r(41676),l=r(6210),o=r(64223),c=r(37339),u=r(595),d=r(52322);const h={...u.L,p:e=>(0,d.jsx)("span",{...e})},p=(0,s.Z)(i.ZP,{target:"e13h2c840"})({name:"1qdk5x4",styles:"td{white-space:nowrap;}"}),f={default:"var(--color-success-green)",primitive:"var(--color-success-green)",string:"var(--color-fire-red)"},m={default:"var(--color-success-green)",undefined:"var(--color-black-55)",string:"var(--color-fire-red)"},g=e=>{let{variant:n,strikethrough:r,children:s,style:t={},...i}=e;if(r&&(t.textDecoration="line-through"),"string"==typeof s)switch(n){case"prop":break;case"type":t.color=b(s)?f.string:["boolean","true","false","number","bigint","string","symbol"].includes(function(e){return e.endsWith("[]")?e.slice(0,-2):e.startsWith("Array<")&&e.endsWith(">")?e.slice(6,-1):e}(s))?f.primitive:f.default,t.background="none",t.boxShadow="none";break;case"value":t.color=b(s)?m.string:"undefined"===s||"null"===s?m.undefined:m.default,t.background="none",t.boxShadow="none"}return h.code({children:s,style:t,...i})};function j(e){let{props:n,valueType:r="string",camelCase:s,omit:u,showDefaultValue:f=!1}=e;const m=Object.keys(n||{}),j=Object.entries(n||{}).map((e=>{let[n,i]=e;if(!i)return null;const{type:o,defaultValue:p,doc:j,status:b}=i;return u&&u.includes(n)?null:(0,d.jsxs)(a.Z,{children:[(0,d.jsx)(l.Z,{children:(0,d.jsx)(g,{variant:"prop",strikethrough:"deprecated"===b,children:y(s?(0,c.zW)(n):n)})}),(0,d.jsx)(l.Z,{children:(Array.isArray(o)?o:[o]).map((e=>{if("string"==typeof e){if(String(e).includes("{valueType}")){if(Array.isArray(r))return r.map(((e,n)=>(0,d.jsx)(g,{variant:"type",children:e},e+n))).reduce(((e,n)=>(0,d.jsxs)(d.Fragment,{children:[e," ",(0,d.jsx)("br",{})," ",n]})));e=r}return(0,d.jsx)(g,{variant:"type",children:e},e)}})).reduce(((e,n)=>(0,d.jsxs)(d.Fragment,{children:[e," ",(0,d.jsx)("br",{})," ",n]})))}),f&&(0,d.jsx)(l.Z,{children:p?(0,d.jsx)(g,{variant:"value",children:p}):"required"===b&&"REQUIRED"}),(0,d.jsxs)(l.Z,{children:[(!f||"deprecated"===b)&&(0,d.jsxs)("em",{children:["(",b,") "]}),(0,d.jsx)(t.D,{components:h,children:s?x(j,m):j})]})]},n)}));return(0,d.jsx)(i.ZP.ScrollView,{children:(0,d.jsxs)(p,{children:[(0,d.jsx)("thead",{children:(0,d.jsxs)(a.Z,{children:[(0,d.jsx)(o.Z,{children:"Property"}),(0,d.jsx)(o.Z,{children:"Type"}),f&&(0,d.jsx)(o.Z,{children:"Default value"}),(0,d.jsx)(o.Z,{children:"Description"})]})}),(0,d.jsx)("tbody",{children:j})]})})}function b(e){return["'",'"',"`"].includes(e.substring(0,1))}function x(e,n){return n.forEach((n=>{e=e.replace(new RegExp(n,"g"),(0,c.zW)(n))})),e}function y(e){return e.includes("[")?(0,d.jsx)(t.D,{components:h,children:e}):e}},6210:function(e,n,r){var s=r(30600);n.Z=s.Z},64223:function(e,n,r){var s=r(91859);n.Z=s.Z},41676:function(e,n,r){var s=r(35610);n.Z=s.Z}}]);
//# sourceMappingURL=component---src-docs-uilib-layout-grid-container-properties-mdx-19756bd539c8d831dc62.js.map