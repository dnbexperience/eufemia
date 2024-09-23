"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[36174],{31876:function(e,t,n){n.r(t);var r=n(52322),i=n(45392),o=n(85179),a=n(72715);function s(e){const t=Object.assign({h2:"h2"},(0,i.ah)(),e.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h2,{children:"Properties"}),"\n",(0,r.jsx)(o.ZP,{props:a.ValueProperties})]})}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,i.ah)(),e.components);return t?(0,r.jsx)(t,Object.assign({},e,{children:(0,r.jsx)(s,e)})):s(e)}},85179:function(e,t,n){n.d(t,{Kw:function(){return v},ZP:function(){return y}});var r=n(70894),i=n(61185),o=n(55560),a=n(41676),s=n(6210),l=n(64223),c=n(37339),u=n(595),d=n(52322);const p={...u.L,p:e=>(0,d.jsx)("span",{...e})},h=(0,r.Z)(o.ZP,{target:"e13h2c840"})({name:"1qdk5x4",styles:"td{white-space:nowrap;}"}),f="var(--color-fire-red)",v=e=>{let{variant:t,strikethrough:n,children:r,style:i={},...o}=e;if(n&&(i.textDecoration="line-through"),"string"==typeof r)switch(t){case"prop":break;case"type":i.color=r.startsWith("'")?f:"var(--color-violet)";case"value":i.color=r.startsWith("'")?f:"undefined"===r||"null"===r?"var(--color-black-55)":"var(--color-success-green)";default:i.background="none",i.boxShadow="none"}return p.code({children:r,style:i,...o})};function y(e){let{props:t,valueType:n="string",camelCase:r,omit:u,showDefaultValue:f=!1}=e;const y=Object.keys(t||{}),b=Object.entries(t||{}).map((e=>{let[t,o]=e;if(!o)return null;const{type:l,defaultValue:h,doc:b,status:j}=o;return u&&u.includes(t)?null:(0,d.jsxs)(a.Z,{children:[(0,d.jsx)(s.Z,{children:(0,d.jsx)(v,{variant:"prop",strikethrough:"deprecated"===j,children:m(r?(0,c.zW)(t):t)})}),(0,d.jsx)(s.Z,{children:(Array.isArray(l)?l:[l]).map((e=>{if("string"==typeof e){if(String(e).includes("{valueType}")){if(Array.isArray(n))return n.map(((e,t)=>(0,d.jsx)(v,{variant:"type",children:e},e+t))).reduce(((e,t)=>(0,d.jsxs)(d.Fragment,{children:[e," ",(0,d.jsx)("br",{})," ",t]})));e=n}return(0,d.jsx)(v,{variant:"type",children:e},e)}})).reduce(((e,t)=>(0,d.jsxs)(d.Fragment,{children:[e," ",(0,d.jsx)("br",{})," ",t]})))}),f&&(0,d.jsx)(s.Z,{children:h?(0,d.jsx)(v,{variant:"value",children:h}):"required"===j&&"REQUIRED"}),(0,d.jsxs)(s.Z,{children:[(!f||"deprecated"===j)&&(0,d.jsxs)("em",{children:["(",j,") "]}),(0,d.jsx)(i.D,{components:p,children:r?x(b,y):b})]})]},t)}));return(0,d.jsx)(o.ZP.ScrollView,{children:(0,d.jsxs)(h,{children:[(0,d.jsx)("thead",{children:(0,d.jsxs)(a.Z,{children:[(0,d.jsx)(l.Z,{children:"Property"}),(0,d.jsx)(l.Z,{children:"Type"}),f&&(0,d.jsx)(l.Z,{children:"Default value"}),(0,d.jsx)(l.Z,{children:"Description"})]})}),(0,d.jsx)("tbody",{children:b})]})})}function x(e,t){return t.forEach((t=>{e=e.replace(new RegExp(t,"g"),(0,c.zW)(t))})),e}function m(e){return e.includes("/")?(0,d.jsx)(i.D,{components:p,children:e}):e}},6210:function(e,t,n){var r=n(30600);t.Z=r.Z},64223:function(e,t,n){var r=n(91859);t.Z=r.Z},41676:function(e,t,n){var r=n(35610);t.Z=r.Z},72715:function(e,t,n){n.d(t,{ValueProperties:function(){return r}});const r={value:{doc:"Value for the value component. Will take precedence over the path value given in the data context.",type:"{valueType}",status:"optional"},defaultValue:{doc:"Default value for the value component. Will not take precedence over the path value given in the data context.",type:"{valueType}",status:"optional"},label:{doc:"Field label to show above the displayed value.",type:"string",status:"optional"},inheritLabel:{doc:"Use `true` to inherit the label from a visible (rendered) field with the same path.",type:"boolean",status:"optional"},inheritVisibility:{doc:"Use `true` to inherit the visibility from a field with the same path. You can find more info in the [Value section](/uilib/extensions/forms/Value/#inherit-visibility-from-fields-based-on-path).",type:"boolean",status:"optional"},showEmpty:{doc:"Shows the value even if it is empty.",type:"boolean",status:"optional"},placeholder:{doc:"Text showing in place of the value if no value is given.",type:"string",status:"optional"},path:{doc:"JSON Pointer for where the data for this input is located in the source dataset.",type:"string",status:"optional"},inline:{doc:"For showing the value inline (not as a block element).",type:"boolean",status:"optional"},maxWidth:{doc:"Use `auto` for no max-width (use browser default), `small`, `medium` or `large` for predefined standard max widths. Defaults to `large`.",type:"string",status:"optional"},transformIn:{doc:"Transforms the `value` before its displayed in the value component.",type:"function",status:"optional"},"[Space](/uilib/layout/space/properties)":{doc:"Spacing properties like `top` or `bottom` are supported.",type:["string","object"],status:"optional"}}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-value-string-properties-mdx-b7fd50c07ed4c601b957.js.map