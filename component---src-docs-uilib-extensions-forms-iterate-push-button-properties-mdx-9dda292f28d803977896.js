"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[92063],{19273:function(e,n,t){t.r(n),t.d(n,{default:function(){return c}});var r=t(52322),s=t(45392),i=t(85179);const o={path:{doc:"The path to the array to add the new item to.",type:"string",status:"required"},itemPath:{doc:"The path to the item in a nested array, to add the new item to.",type:"string",status:"optional"},pushValue:{doc:"The element to add to the array when the button is clicked. Can be a function to returns the push value.",type:"unknown",status:"optional"},"[Button](/uilib/components/button/properties)":{doc:"All button properties.",type:"Various",status:"optional"}};function a(e){const n=Object.assign({h2:"h2"},(0,s.ah)(),e.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:"Properties"}),"\n",(0,r.jsx)(i.ZP,{props:o})]})}var c=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,s.ah)(),e.components);return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(a,e)})):a(e)}},85179:function(e,n,t){t.d(n,{Kw:function(){return x},ZP:function(){return g}});var r=t(70894),s=t(61185),i=t(55560),o=t(41676),a=t(6210),c=t(64223),l=t(37339),u=t(595),d=t(52322);const h={...u.L,p:e=>(0,d.jsx)("span",{...e})},p=(0,r.Z)(i.ZP,{target:"e13h2c840"})({name:"1qdk5x4",styles:"td{white-space:nowrap;}"}),f={default:"var(--color-success-green)",primitive:"var(--color-success-green)",string:"var(--color-fire-red)"},j={default:"var(--color-success-green)",undefined:"var(--color-black-55)",string:"var(--color-fire-red)"},x=e=>{let{variant:n,strikethrough:t,children:r,style:s={},...i}=e;if(t&&(s.textDecoration="line-through"),"string"==typeof r)switch(n){case"prop":break;case"type":s.color=y(r)?f.string:["boolean","true","false","number","bigint","string","symbol"].includes(function(e){return e.endsWith("[]")?e.slice(0,-2):e.startsWith("Array<")&&e.endsWith(">")?e.slice(6,-1):e}(r))?f.primitive:f.default,s.background="none",s.boxShadow="none";break;case"value":s.color=y(r)?j.string:"undefined"===r||"null"===r?j.undefined:j.default,s.background="none",s.boxShadow="none"}return h.code({children:r,style:s,...i})};function g(e){let{props:n,valueType:t="string",camelCase:r,omit:u,showDefaultValue:f=!1}=e;const j=Object.keys(n||{}),g=Object.entries(n||{}).map((e=>{let[n,i]=e;if(!i)return null;const{type:c,defaultValue:p,doc:g,status:y}=i;return u&&u.includes(n)?null:(0,d.jsxs)(o.Z,{children:[(0,d.jsx)(a.Z,{children:(0,d.jsx)(x,{variant:"prop",strikethrough:"deprecated"===y,children:m(r?(0,l.zW)(n):n)})}),(0,d.jsx)(a.Z,{children:(Array.isArray(c)?c:[c]).map((e=>{if("string"==typeof e){if(String(e).includes("{valueType}")){if(Array.isArray(t))return t.map(((e,n)=>(0,d.jsx)(x,{variant:"type",children:e},e+n))).reduce(((e,n)=>(0,d.jsxs)(d.Fragment,{children:[e," ",(0,d.jsx)("br",{})," ",n]})));e=t}return(0,d.jsx)(x,{variant:"type",children:e},e)}})).reduce(((e,n)=>(0,d.jsxs)(d.Fragment,{children:[e," ",(0,d.jsx)("br",{})," ",n]})))}),f&&(0,d.jsx)(a.Z,{children:p?(0,d.jsx)(x,{variant:"value",children:p}):"required"===y&&"REQUIRED"}),(0,d.jsxs)(a.Z,{children:[(!f||"deprecated"===y)&&(0,d.jsxs)("em",{children:["(",y,") "]}),(0,d.jsx)(s.D,{components:h,children:r?b(g,j):g})]})]},n)}));return(0,d.jsx)(i.ZP.ScrollView,{children:(0,d.jsxs)(p,{children:[(0,d.jsx)("thead",{children:(0,d.jsxs)(o.Z,{children:[(0,d.jsx)(c.Z,{children:"Property"}),(0,d.jsx)(c.Z,{children:"Type"}),f&&(0,d.jsx)(c.Z,{children:"Default value"}),(0,d.jsx)(c.Z,{children:"Description"})]})}),(0,d.jsx)("tbody",{children:g})]})})}function y(e){return["'",'"',"`"].includes(e.substring(0,1))}function b(e,n){return n.forEach((n=>{e=e.replace(new RegExp(n,"g"),(0,l.zW)(n))})),e}function m(e){return e.includes("[")?(0,d.jsx)(s.D,{components:h,children:e}):e}},6210:function(e,n,t){var r=t(30600);n.Z=r.Z},64223:function(e,n,t){var r=t(91859);n.Z=r.Z},41676:function(e,n,t){var r=t(35610);n.Z=r.Z}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-iterate-push-button-properties-mdx-9dda292f28d803977896.js.map