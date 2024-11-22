"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[85504],{63686:function(e,t,n){n.r(t),n.d(t,{default:function(){return d}});var a=n(52322),r=n(45392),o=n(85179),s=n(72715);const{label:i,transformLabel:l}=s.ValueProperties,c={label:i,transformLabel:l,maxWidth:{doc:"Use `small`, `medium` or `large` for predefined standard max widths. Defaults to `auto`.",type:"string",status:"optional"},gap:{doc:"The gap between the different value blocks. Can be `xx-small`, `x-small`, `small`, `medium`, `large` or `false`. Defaults to `xx-small`.",type:"string",status:"optional"}};function u(e){const t=Object.assign({h2:"h2"},(0,r.ah)(),e.components);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:"Properties"}),"\n",(0,a.jsx)(o.ZP,{props:c})]})}var d=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,r.ah)(),e.components);return t?(0,a.jsx)(t,Object.assign({},e,{children:(0,a.jsx)(u,e)})):u(e)}},85179:function(e,t,n){n.d(t,{Kw:function(){return m},ZP:function(){return b}});var a=n(70894),r=n(61185),o=n(55560),s=n(41676),i=n(6210),l=n(64223),c=n(37339),u=n(595),d=n(52322);const p={...u.L,p:e=>(0,d.jsx)("span",{...e})},h=(0,a.Z)(o.ZP,{target:"e13h2c840"})({name:"1qdk5x4",styles:"td{white-space:nowrap;}"}),f="var(--color-fire-red)",m=e=>{let{variant:t,strikethrough:n,children:a,style:r={},...o}=e;if(n&&(r.textDecoration="line-through"),"string"==typeof a)switch(t){case"prop":break;case"type":r.color=a.startsWith("'")?f:"var(--color-violet)";case"value":r.color=a.startsWith("'")?f:"undefined"===a||"null"===a?"var(--color-black-55)":"var(--color-success-green)";default:r.background="none",r.boxShadow="none"}return p.code({children:a,style:r,...o})};function b(e){let{props:t,valueType:n="string",camelCase:a,omit:u,showDefaultValue:f=!1}=e;const b=Object.keys(t||{}),x=Object.entries(t||{}).map((e=>{let[t,o]=e;if(!o)return null;const{type:l,defaultValue:h,doc:x,status:g}=o;return u&&u.includes(t)?null:(0,d.jsxs)(s.Z,{children:[(0,d.jsx)(i.Z,{children:(0,d.jsx)(m,{variant:"prop",strikethrough:"deprecated"===g,children:v(a?(0,c.zW)(t):t)})}),(0,d.jsx)(i.Z,{children:(Array.isArray(l)?l:[l]).map((e=>{if("string"==typeof e){if(String(e).includes("{valueType}")){if(Array.isArray(n))return n.map(((e,t)=>(0,d.jsx)(m,{variant:"type",children:e},e+t))).reduce(((e,t)=>(0,d.jsxs)(d.Fragment,{children:[e," ",(0,d.jsx)("br",{})," ",t]})));e=n}return(0,d.jsx)(m,{variant:"type",children:e},e)}})).reduce(((e,t)=>(0,d.jsxs)(d.Fragment,{children:[e," ",(0,d.jsx)("br",{})," ",t]})))}),f&&(0,d.jsx)(i.Z,{children:h?(0,d.jsx)(m,{variant:"value",children:h}):"required"===g&&"REQUIRED"}),(0,d.jsxs)(i.Z,{children:[(!f||"deprecated"===g)&&(0,d.jsxs)("em",{children:["(",g,") "]}),(0,d.jsx)(r.D,{components:p,children:a?y(x,b):x})]})]},t)}));return(0,d.jsx)(o.ZP.ScrollView,{children:(0,d.jsxs)(h,{children:[(0,d.jsx)("thead",{children:(0,d.jsxs)(s.Z,{children:[(0,d.jsx)(l.Z,{children:"Property"}),(0,d.jsx)(l.Z,{children:"Type"}),f&&(0,d.jsx)(l.Z,{children:"Default value"}),(0,d.jsx)(l.Z,{children:"Description"})]})}),(0,d.jsx)("tbody",{children:x})]})})}function y(e,t){return t.forEach((t=>{e=e.replace(new RegExp(t,"g"),(0,c.zW)(t))})),e}function v(e){return e.includes("[")?(0,d.jsx)(r.D,{components:p,children:e}):e}},6210:function(e,t,n){var a=n(30600);t.Z=a.Z},64223:function(e,t,n){var a=n(91859);t.Z=a.Z},41676:function(e,t,n){var a=n(35610);t.Z=a.Z},72715:function(e,t,n){n.d(t,{ValueProperties:function(){return a}});const a={value:{doc:"Value for the value component. Will take precedence over the path value given in the data context.",type:"{valueType}",status:"optional"},defaultValue:{doc:"Default value for the value component. Will not take precedence over the path value given in the data context.",type:"{valueType}",status:"optional"},label:{doc:"Field label to show above the displayed value.",type:"string",status:"optional"},labelSrOnly:{doc:"Use `true` to make the label only readable by screen readers.",type:"boolean",status:"optional"},transformLabel:{doc:"Transforms the label before it gets displayed. Receives the label as the first parameter. The second parameter is a object containing the `convertJsxToString` function.",type:"function",status:"optional"},inheritLabel:{doc:"Use `true` to inherit the label from a visible (rendered) field with the same path.",type:"boolean",status:"optional"},inheritVisibility:{doc:"Use `true` to inherit the visibility from a field with the same path. You can find more info in the [Value section](/uilib/extensions/forms/Value/#inherit-visibility-from-fields-based-on-path).",type:"boolean",status:"optional"},showEmpty:{doc:"Shows the value even if it is empty.",type:"boolean",status:"optional"},placeholder:{doc:"Text showing in place of the value if no value is given.",type:"string",status:"optional"},path:{doc:"JSON Pointer for where the data for this input is located in the source dataset.",type:"string",status:"optional"},inline:{doc:"For showing the value inline (not as a block element).",type:"boolean",status:"optional"},maxWidth:{doc:"Use `auto` for no max-width (use browser default), `small`, `medium` or `large` for predefined standard max widths. Defaults to `large`.",type:"string",status:"optional"},transformIn:{doc:"Transforms the `value` before its displayed in the value component.",type:"function",status:"optional"},"[Space](/uilib/layout/space/properties)":{doc:"Spacing properties like `top` or `bottom` are supported.",type:["string","object"],status:"optional"}}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-value-composition-properties-mdx-e68d28bf5538be07b558.js.map