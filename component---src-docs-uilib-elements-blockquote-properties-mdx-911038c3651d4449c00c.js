"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[81337],{72825:function(e,r,n){n.r(r),n.d(r,{default:function(){return a}});var t=n(52322),s=n(45392),i=n(85179);const o={noBackground:{doc:"Hides the blockquote background by making it transparent.",type:"boolean",status:"optional"},direction:{doc:"Determines the flow direction of the content inside of blockquote. Can be either `horizontal` or `vertical`. Defaults to `horizontal`.",type:"string",status:"optional"},"[Space](/uilib/layout/space/properties)":{doc:"Spacing properties like `top` or `bottom` are supported.",type:["string","object"],status:"optional"}};function c(e){const r=Object.assign({h2:"h2"},(0,s.ah)(),e.components);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.h2,{children:"Properties"}),"\n",(0,t.jsx)(i.ZP,{props:o})]})}var a=function(e){void 0===e&&(e={});const{wrapper:r}=Object.assign({},(0,s.ah)(),e.components);return r?(0,t.jsx)(r,Object.assign({},e,{children:(0,t.jsx)(c,e)})):c(e)}},85179:function(e,r,n){n.d(r,{Kw:function(){return g},ZP:function(){return x}});var t=n(70894),s=n(61185),i=n(55560),o=n(41676),c=n(6210),a=n(64223),l=n(37339),u=n(595),d=n(52322);const p={...u.L,p:e=>(0,d.jsx)("span",{...e})},h=(0,t.Z)(i.ZP,{target:"e13h2c840"})({name:"1qdk5x4",styles:"td{white-space:nowrap;}"}),f={default:"var(--color-success-green)",primitive:"var(--color-success-green)",string:"var(--color-fire-red)"},j={default:"var(--color-success-green)",undefined:"var(--color-black-55)",string:"var(--color-fire-red)"},g=e=>{let{variant:r,strikethrough:n,children:t,style:s={},...i}=e;if(n&&(s.textDecoration="line-through"),"string"==typeof t)switch(r){case"prop":break;case"type":s.color=b(t)?f.string:["boolean","true","false","number","bigint","string","symbol"].includes(function(e){return e.endsWith("[]")?e.slice(0,-2):e.startsWith("Array<")&&e.endsWith(">")?e.slice(6,-1):e}(t))?f.primitive:f.default,s.background="none",s.boxShadow="none";break;case"value":s.color=b(t)?j.string:"undefined"===t||"null"===t?j.undefined:j.default,s.background="none",s.boxShadow="none"}return p.code({children:t,style:s,...i})};function x(e){let{props:r,valueType:n="string",camelCase:t,omit:u,showDefaultValue:f=!1}=e;const j=Object.keys(r||{}),x=Object.entries(r||{}).map((e=>{let[r,i]=e;if(!i)return null;const{type:a,defaultValue:h,doc:x,status:b}=i;return u&&u.includes(r)?null:(0,d.jsxs)(o.Z,{children:[(0,d.jsx)(c.Z,{children:(0,d.jsx)(g,{variant:"prop",strikethrough:"deprecated"===b,children:v(t?(0,l.zW)(r):r)})}),(0,d.jsx)(c.Z,{children:(Array.isArray(a)?a:[a]).map((e=>{if("string"==typeof e){if(String(e).includes("{valueType}")){if(Array.isArray(n))return n.map(((e,r)=>(0,d.jsx)(g,{variant:"type",children:e},e+r))).reduce(((e,r)=>(0,d.jsxs)(d.Fragment,{children:[e," ",(0,d.jsx)("br",{})," ",r]})));e=n}return(0,d.jsx)(g,{variant:"type",children:e},e)}})).reduce(((e,r)=>(0,d.jsxs)(d.Fragment,{children:[e," ",(0,d.jsx)("br",{})," ",r]})))}),f&&(0,d.jsx)(c.Z,{children:h?(0,d.jsx)(g,{variant:"value",children:h}):"required"===b&&"REQUIRED"}),(0,d.jsxs)(c.Z,{children:[(!f||"deprecated"===b)&&(0,d.jsxs)("em",{children:["(",b,") "]}),(0,d.jsx)(s.D,{components:p,children:t?y(x,j):x})]})]},r)}));return(0,d.jsx)(i.ZP.ScrollView,{children:(0,d.jsxs)(h,{children:[(0,d.jsx)("thead",{children:(0,d.jsxs)(o.Z,{children:[(0,d.jsx)(a.Z,{children:"Property"}),(0,d.jsx)(a.Z,{children:"Type"}),f&&(0,d.jsx)(a.Z,{children:"Default value"}),(0,d.jsx)(a.Z,{children:"Description"})]})}),(0,d.jsx)("tbody",{children:x})]})})}function b(e){return["'",'"',"`"].includes(e.substring(0,1))}function y(e,r){return r.forEach((r=>{e=e.replace(new RegExp(r,"g"),(0,l.zW)(r))})),e}function v(e){return e.includes("[")?(0,d.jsx)(s.D,{components:p,children:e}):e}},6210:function(e,r,n){var t=n(30600);r.Z=t.Z},64223:function(e,r,n){var t=n(91859);r.Z=t.Z},41676:function(e,r,n){var t=n(35610);r.Z=t.Z}}]);
//# sourceMappingURL=component---src-docs-uilib-elements-blockquote-properties-mdx-911038c3651d4449c00c.js.map