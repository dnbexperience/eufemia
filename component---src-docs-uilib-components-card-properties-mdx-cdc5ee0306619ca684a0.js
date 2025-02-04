"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[6715],{49463:function(e,t,n){n.r(t);var r=n(52322),s=n(45392),o=n(85179),i=n(94690);function a(e){const t=Object.assign({h2:"h2"},(0,s.ah)(),e.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h2,{children:"Properties"}),"\n",(0,r.jsx)(o.ZP,{props:i.T})]})}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,s.ah)(),e.components);return t?(0,r.jsx)(t,Object.assign({},e,{children:(0,r.jsx)(a,e)})):a(e)}},85179:function(e,t,n){n.d(t,{Kw:function(){return g},ZP:function(){return y}});var r=n(70894),s=n(61185),o=n(55560),i=n(41676),a=n(6210),l=n(64223),c=n(37339),u=n(595),d=n(52322);const p={...u.L,p:e=>(0,d.jsx)("span",{...e})},h=(0,r.Z)(o.ZP,{target:"e13h2c840"})({name:"1qdk5x4",styles:"td{white-space:nowrap;}"}),f={default:"var(--color-success-green)",primitive:"var(--color-success-green)",string:"var(--color-fire-red)"},x={default:"var(--color-success-green)",undefined:"var(--color-black-55)",string:"var(--color-fire-red)"},g=e=>{let{variant:t,strikethrough:n,children:r,style:s={},...o}=e;if(n&&(s.textDecoration="line-through"),"string"==typeof r)switch(t){case"prop":break;case"type":s.color=b(r)?f.string:["boolean","true","false","number","bigint","string","symbol"].includes(function(e){return e.endsWith("[]")?e.slice(0,-2):e.startsWith("Array<")&&e.endsWith(">")?e.slice(6,-1):e}(r))?f.primitive:f.default,s.background="none",s.boxShadow="none";break;case"value":s.color=b(r)?x.string:"undefined"===r||"null"===r?x.undefined:x.default,s.background="none",s.boxShadow="none"}return p.code({children:r,style:s,...o})};function y(e){let{props:t,valueType:n="string",camelCase:r,omit:u,showDefaultValue:f=!1}=e;const x=Object.keys(t||{}),y=Object.entries(t||{}).map((e=>{let[t,o]=e;if(!o)return null;const{type:l,defaultValue:h,doc:y,status:b}=o;return u&&u.includes(t)?null:(0,d.jsxs)(i.Z,{children:[(0,d.jsx)(a.Z,{children:(0,d.jsx)(g,{variant:"prop",strikethrough:"deprecated"===b,children:m(r?(0,c.zW)(t):t)})}),(0,d.jsx)(a.Z,{children:(Array.isArray(l)?l:[l]).map((e=>{if("string"==typeof e){if(String(e).includes("{valueType}")){if(Array.isArray(n))return n.map(((e,t)=>(0,d.jsx)(g,{variant:"type",children:e},e+t))).reduce(((e,t)=>(0,d.jsxs)(d.Fragment,{children:[e," ",(0,d.jsx)("br",{})," ",t]})));e=n}return(0,d.jsx)(g,{variant:"type",children:e},e)}})).reduce(((e,t)=>(0,d.jsxs)(d.Fragment,{children:[e," ",(0,d.jsx)("br",{})," ",t]})))}),f&&(0,d.jsx)(a.Z,{children:h?(0,d.jsx)(g,{variant:"value",children:h}):"required"===b&&"REQUIRED"}),(0,d.jsxs)(a.Z,{children:[(!f||"deprecated"===b)&&(0,d.jsxs)("em",{children:["(",b,") "]}),(0,d.jsx)(s.D,{components:p,children:r?j(y,x):y})]})]},t)}));return(0,d.jsx)(o.ZP.ScrollView,{children:(0,d.jsxs)(h,{children:[(0,d.jsx)("thead",{children:(0,d.jsxs)(i.Z,{children:[(0,d.jsx)(l.Z,{children:"Property"}),(0,d.jsx)(l.Z,{children:"Type"}),f&&(0,d.jsx)(l.Z,{children:"Default value"}),(0,d.jsx)(l.Z,{children:"Description"})]})}),(0,d.jsx)("tbody",{children:y})]})})}function b(e){return["'",'"',"`"].includes(e.substring(0,1))}function j(e,t){return t.forEach((t=>{e=e.replace(new RegExp(t,"g"),(0,c.zW)(t))})),e}function m(e){return e.includes("[")?(0,d.jsx)(s.D,{components:p,children:e}):e}},94690:function(e,t,n){n.d(t,{T:function(){return r}});const r={outset:{doc:"True to break out negatively on larger screens. Defaults to `false`.",type:"boolean",status:"optional"},stack:{doc:"True to stack the sub components with lines between. The `spacing` will default to `medium`.",type:"boolean",status:"optional"},direction:{doc:"Defaults to `vertical`.",type:"string",status:"optional"},alignSelf:{doc:"Defaults to `stretch`.",type:"string",status:"optional"},title:{doc:"Define a title that appears on top of the Card.",type:"React.Node",status:"optional"},responsive:{doc:"Define if the card should behave responsive. Defaults to `true`.",type:"boolean",status:"optional"},filled:{doc:"Define if the Card should get the same background color as the outline border.",type:"boolean",status:"optional"},element:{doc:"Define the type of element. Defaults to `section`.",type:"React.Element",status:"optional"},children:{doc:"Contents.",type:"React.Node",status:"required"},"[Flex.Container](/uilib/layout/flex/container/properties)":{doc:"Flex.Container properties.",type:"Various",status:"optional"},"[Flex.Item](/uilib/layout/flex/item/properties)":{doc:"Flex.Item properties.",type:"Various",status:"optional"},"[Space](/uilib/layout/space/properties)":{doc:"Spacing properties like `top` or `bottom` are supported.",type:["string","object"],status:"optional"}}},6210:function(e,t,n){var r=n(30600);t.Z=r.Z},64223:function(e,t,n){var r=n(91859);t.Z=r.Z},41676:function(e,t,n){var r=n(35610);t.Z=r.Z}}]);
//# sourceMappingURL=component---src-docs-uilib-components-card-properties-mdx-cdc5ee0306619ca684a0.js.map