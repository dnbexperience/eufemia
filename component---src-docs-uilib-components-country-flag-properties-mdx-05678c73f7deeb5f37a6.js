"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[96176],{5810:function(e,r,n){n.r(r),n.d(r,{default:function(){return c}});var t=n(52322),s=n(45392),i=n(85179);const o={iso:{doc:"[ISO 3166-1 alpha-2 code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) representing the country, such as `NO` for Norway. Defaults to `NO`.",type:"string",status:"optional"},size:{doc:"The size of the component. Can be `auto`, `small`, `medium`, `large` or `x-large`. Defaults to `auto` (1em).",type:"string",status:"optional"},shape:{doc:"The shape of the component. Can be `round` or `square`. Defaults to `round`.",type:"string",status:"optional"},"[Space](/uilib/layout/space/properties)":{doc:"Spacing properties like `top` or `bottom` are supported.",type:["string","object"],status:"optional"}};function a(e){const r=Object.assign({h2:"h2"},(0,s.ah)(),e.components);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.h2,{children:"Properties"}),"\n",(0,t.jsx)(i.ZP,{props:o})]})}var c=function(e){void 0===e&&(e={});const{wrapper:r}=Object.assign({},(0,s.ah)(),e.components);return r?(0,t.jsx)(r,Object.assign({},e,{children:(0,t.jsx)(a,e)})):a(e)}},85179:function(e,r,n){n.d(r,{Kw:function(){return j},ZP:function(){return x}});var t=n(70894),s=n(61185),i=n(55560),o=n(41676),a=n(6210),c=n(64223),l=n(37339),u=n(595),d=n(52322);const p={...u.L,p:e=>(0,d.jsx)("span",{...e})},h=(0,t.Z)(i.ZP,{target:"e13h2c840"})({name:"1gy8cio",styles:"td:not(.description){white-space:nowrap;}"}),f={default:"var(--color-success-green)",primitive:"var(--color-success-green)",string:"var(--color-fire-red)"},g={default:"var(--color-success-green)",undefined:"var(--color-black-55)",string:"var(--color-fire-red)"},j=e=>{let{variant:r,strikethrough:n,children:t,style:s={},...i}=e;if(n&&(s.textDecoration="line-through"),"string"==typeof t)switch(r){case"prop":break;case"type":s.color=y(t)?f.string:["boolean","true","false","number","bigint","string","symbol"].includes(function(e){return e.endsWith("[]")?e.slice(0,-2):e.startsWith("Array<")&&e.endsWith(">")?e.slice(6,-1):e}(t))?f.primitive:f.default,s.background="none",s.boxShadow="none";break;case"value":s.color=y(t)?g.string:"undefined"===t||"null"===t?g.undefined:g.default,s.background="none",s.boxShadow="none"}return p.code({children:t,style:s,...i})};function x(e){let{props:r,valueType:n="string",camelCase:t,omit:u,showDefaultValue:f=!1}=e;const g=Object.keys(r||{}),x=Object.entries(r||{}).map((e=>{let[r,i]=e;if(!i)return null;const{type:c,defaultValue:h,doc:x,status:y}=i;return u&&u.includes(r)?null:(0,d.jsxs)(o.Z,{children:[(0,d.jsx)(a.Z,{children:(0,d.jsx)(j,{variant:"prop",strikethrough:"deprecated"===y,children:m(t?(0,l.zW)(r):r)})}),(0,d.jsx)(a.Z,{children:(Array.isArray(c)?c:[c]).map((e=>{if("string"==typeof e){if(String(e).includes("{valueType}")){if(Array.isArray(n))return n.map(((e,r)=>(0,d.jsx)(j,{variant:"type",children:e},e+r))).reduce(((e,r)=>(0,d.jsxs)(d.Fragment,{children:[e," ",(0,d.jsx)("br",{})," ",r]})));e=n}return(0,d.jsx)(j,{variant:"type",children:e},e)}})).reduce(((e,r)=>(0,d.jsxs)(d.Fragment,{children:[e," ",(0,d.jsx)("br",{})," ",r]})))}),f&&(0,d.jsx)(a.Z,{children:h?(0,d.jsx)(j,{variant:"value",children:h}):"required"===y&&"REQUIRED"}),(0,d.jsxs)(a.Z,{className:"description",children:[(!f||"deprecated"===y)&&(0,d.jsxs)("em",{children:["(",y,") "]}),(0,d.jsx)(s.D,{components:p,children:t?b(x,g):x})]})]},r)}));return(0,d.jsx)(i.ZP.ScrollView,{children:(0,d.jsxs)(h,{children:[(0,d.jsx)("thead",{children:(0,d.jsxs)(o.Z,{children:[(0,d.jsx)(c.Z,{children:"Property"}),(0,d.jsx)(c.Z,{children:"Type"}),f&&(0,d.jsx)(c.Z,{children:"Default value"}),(0,d.jsx)(c.Z,{className:"description",children:"Description"})]})}),(0,d.jsx)("tbody",{children:x})]})})}function y(e){return["'",'"',"`"].includes(e.substring(0,1))}function b(e,r){return r.forEach((r=>{e=e.replace(new RegExp(r,"g"),(0,l.zW)(r))})),e}function m(e){return e.includes("[")?(0,d.jsx)(s.D,{components:p,children:e}):e}},6210:function(e,r,n){var t=n(30600);r.Z=t.Z},64223:function(e,r,n){var t=n(91859);r.Z=t.Z},41676:function(e,r,n){var t=n(35610);r.Z=t.Z}}]);
//# sourceMappingURL=component---src-docs-uilib-components-country-flag-properties-mdx-05678c73f7deeb5f37a6.js.map