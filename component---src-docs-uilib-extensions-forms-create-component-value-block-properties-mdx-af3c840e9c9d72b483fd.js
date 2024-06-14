"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[67787],{3259:function(e,t,n){n.r(t);var r=n(52322),a=n(45392),o=n(85179),s=n(72715);function i(e){const t=Object.assign({h2:"h2"},(0,a.ah)(),e.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h2,{children:"Properties"}),"\n",(0,r.jsx)(o.ZP,{props:s.ValueProperties})]})}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,a.ah)(),e.components);return t?(0,r.jsx)(t,Object.assign({},e,{children:(0,r.jsx)(i,e)})):i(e)}},85179:function(e,t,n){n.d(t,{Kw:function(){return v},ZP:function(){return x}});var r=n(70894),a=n(61185),o=n(55560),s=n(41676),i=n(6210),l=n(64223),c=n(37339),u=n(595),d=n(52322);const p={...u.L,p:e=>(0,d.jsx)("span",{...e})},h=(0,r.Z)(o.ZP,{target:"e13h2c840"})({name:"1qdk5x4",styles:"td{white-space:nowrap;}"}),f="var(--color-fire-red)",v=e=>{let{variant:t,strikethrough:n,children:r,style:a={},...o}=e;if(n&&(a.textDecoration="line-through"),"string"==typeof r)switch(t){case"prop":break;case"type":a.color=r.startsWith("'")?f:"var(--color-violet)";case"value":a.color=r.startsWith("'")?f:"undefined"===r||"null"===r?"var(--color-black-55)":"var(--color-success-green)";default:a.background="none",a.boxShadow="none"}return p.code({children:r,style:a,...o})};function x(e){let{props:t,valueType:n="string",camelCase:r,omit:u,showDefaultValue:f=!1}=e;const x=Object.keys(t),g=Object.entries(t).map((e=>{let[t,o]=e;if(!o)return null;const{type:l,defaultValue:h,doc:g,status:m}=o;return u&&u.includes(t)?null:(0,d.jsxs)(s.Z,{children:[(0,d.jsx)(i.Z,{children:(0,d.jsx)(v,{variant:"prop",strikethrough:"deprecated"===m,children:y(r?(0,c.zW)(t):t)})}),(0,d.jsx)(i.Z,{children:(Array.isArray(l)?l:[l]).map((e=>{if("string"==typeof e){if(String(e).includes("{valueType}")){if(Array.isArray(n))return n.map(((e,t)=>(0,d.jsx)(v,{variant:"type",children:e},e+t))).reduce(((e,t)=>(0,d.jsxs)(d.Fragment,{children:[e," ",(0,d.jsx)("br",{})," ",t]})));e=n}return(0,d.jsx)(v,{variant:"type",children:e},e)}})).reduce(((e,t)=>(0,d.jsxs)(d.Fragment,{children:[e," ",(0,d.jsx)("br",{})," ",t]})))}),f&&(0,d.jsx)(i.Z,{children:h?(0,d.jsx)(v,{variant:"value",children:h}):"required"===m&&"REQUIRED"}),(0,d.jsxs)(i.Z,{children:[(!f||"deprecated"===m)&&(0,d.jsxs)("em",{children:["(",m,") "]}),(0,d.jsx)(a.D,{components:p,children:r?j(g,x):g})]})]},t)}));return(0,d.jsx)(o.ZP.ScrollView,{children:(0,d.jsxs)(h,{children:[(0,d.jsx)("thead",{children:(0,d.jsxs)(s.Z,{children:[(0,d.jsx)(l.Z,{children:"Property"}),(0,d.jsx)(l.Z,{children:"Type"}),f&&(0,d.jsx)(l.Z,{children:"Default value"}),(0,d.jsx)(l.Z,{children:"Description"})]})}),(0,d.jsx)("tbody",{children:g})]})})}function j(e,t){return t.forEach((t=>{e=e.replace(new RegExp(t,"g"),(0,c.zW)(t))})),e}function y(e){return e.includes("/")?(0,d.jsx)(a.D,{components:p,children:e}):e}},6210:function(e,t,n){var r=n(30600);t.Z=r.Z},64223:function(e,t,n){var r=n(91859);t.Z=r.Z},41676:function(e,t,n){var r=n(37381);t.Z=r.Z},72715:function(e,t,n){n.d(t,{ValueProperties:function(){return r}});const r={value:{doc:"Value for the value component. Will take precedence over the path value given in the data context.",type:"{valueType}",status:"optional"},defaultValue:{doc:"Default value for the value component. Will not take precedence over the path value given in the data context.",type:"{valueType}",status:"optional"},label:{doc:"Field label to show above the data value.",type:"string",status:"optional"},showEmpty:{doc:"Shows the value even if it is empty.",type:"boolean",status:"optional"},placeholder:{doc:"Text showing in place of the value if no value is given.",type:"string",status:"optional"},path:{doc:"JSON Pointer for where the data for this input is located in the source dataset.",type:"string",status:"optional"},inline:{doc:"For showing the value inline (not as a block element).",type:"boolean",status:"optional"},maxWidth:{doc:"Use `auto` for no max-width (use browser default), `small`, `medium` or `large` for predefined standard max widths. Defaults to `large`.",type:"string",status:"optional"},transformIn:{doc:"Transforms the `value` before its displayed in the value component.",type:"function",status:"optional"},"[Space](/uilib/layout/space/properties)":{doc:"Spacing properties like `top` or `bottom` are supported.",type:["string","object"],status:"optional"}}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-create-component-value-block-properties-mdx-af3c840e9c9d72b483fd.js.map