"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[33181],{73352:function(e,t,n){n.r(t),n.d(t,{default:function(){return c}});var r=n(52322),s=n(45392),i=n(85179),o=n(72715);const a={trueText:{doc:"The text to use when the value is true.",type:"string",status:"optional"},falseText:{doc:"The text to use when the value is false.",type:"string",status:"optional"}};function l(e){const t=Object.assign({h2:"h2",h3:"h3"},(0,s.ah)(),e.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h2,{children:"Properties"}),"\n",(0,r.jsx)(t.h3,{children:"Value-specific properties"}),"\n",(0,r.jsx)(i.ZP,{props:a}),"\n",(0,r.jsx)(t.h3,{children:"General properties"}),"\n",(0,r.jsx)(i.ZP,{props:o.ValueProperties,valueType:"boolean"})]})}var c=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,s.ah)(),e.components);return t?(0,r.jsx)(t,Object.assign({},e,{children:(0,r.jsx)(l,e)})):l(e)}},85179:function(e,t,n){n.d(t,{Kw:function(){return v},ZP:function(){return y}});var r=n(70894),s=n(61185),i=n(55560),o=n(41676),a=n(6210),l=n(64223),c=n(37339),u=n(595),d=n(52322);const p={...u.L,p:e=>(0,d.jsx)("span",{...e})},h=(0,r.Z)(i.ZP,{target:"e13h2c840"})({name:"1gy8cio",styles:"td:not(.description){white-space:nowrap;}"}),f={default:"var(--color-success-green)",primitive:"var(--color-success-green)",string:"var(--color-fire-red)"},b={default:"var(--color-success-green)",undefined:"var(--color-black-55)",string:"var(--color-fire-red)"},v=e=>{let{variant:t,strikethrough:n,children:r,style:s={},...i}=e;if(n&&(s.textDecoration="line-through"),"string"==typeof r)switch(t){case"prop":break;case"type":s.color=x(r)?f.string:["boolean","true","false","number","bigint","string","symbol"].includes(function(e){return e.endsWith("[]")?e.slice(0,-2):e.startsWith("Array<")&&e.endsWith(">")?e.slice(6,-1):e}(r))?f.primitive:f.default,s.background="none",s.boxShadow="none";break;case"value":s.color=x(r)?b.string:"undefined"===r||"null"===r?b.undefined:b.default,s.background="none",s.boxShadow="none"}return p.code({children:r,style:s,...i})};function y(e){let{props:t,valueType:n="string",camelCase:r,omit:u,showDefaultValue:f=!1}=e;const b=Object.keys(t||{}),y=Object.entries(t||{}).map((e=>{let[t,i]=e;if(!i)return null;const{type:l,defaultValue:h,doc:y,status:x}=i;return u&&u.includes(t)?null:(0,d.jsxs)(o.Z,{children:[(0,d.jsx)(a.Z,{children:(0,d.jsx)(v,{variant:"prop",strikethrough:"deprecated"===x,children:m(r?(0,c.zW)(t):t)})}),(0,d.jsx)(a.Z,{children:(Array.isArray(l)?l:[l]).map((e=>{if("string"==typeof e){if(String(e).includes("{valueType}")){if(Array.isArray(n))return n.map(((e,t)=>(0,d.jsx)(v,{variant:"type",children:e},e+t))).reduce(((e,t)=>(0,d.jsxs)(d.Fragment,{children:[e," ",(0,d.jsx)("br",{})," ",t]})));e=n}return(0,d.jsx)(v,{variant:"type",children:e},e)}})).reduce(((e,t)=>(0,d.jsxs)(d.Fragment,{children:[e," ",(0,d.jsx)("br",{})," ",t]})))}),f&&(0,d.jsx)(a.Z,{children:h?(0,d.jsx)(v,{variant:"value",children:h}):"required"===x&&"REQUIRED"}),(0,d.jsxs)(a.Z,{className:"description",children:[(!f||"deprecated"===x)&&(0,d.jsxs)("em",{children:["(",x,") "]}),(0,d.jsx)(s.D,{components:p,children:r?g(y,b):y})]})]},t)}));return(0,d.jsx)(i.ZP.ScrollView,{children:(0,d.jsxs)(h,{children:[(0,d.jsx)("thead",{children:(0,d.jsxs)(o.Z,{children:[(0,d.jsx)(l.Z,{children:"Property"}),(0,d.jsx)(l.Z,{children:"Type"}),f&&(0,d.jsx)(l.Z,{children:"Default value"}),(0,d.jsx)(l.Z,{className:"description",children:"Description"})]})}),(0,d.jsx)("tbody",{children:y})]})})}function x(e){return["'",'"',"`"].includes(e.substring(0,1))}function g(e,t){return t.forEach((t=>{e=e.replace(new RegExp(t,"g"),(0,c.zW)(t))})),e}function m(e){return e.includes("[")?(0,d.jsx)(s.D,{components:p,children:e}):e}},6210:function(e,t,n){var r=n(30600);t.Z=r.Z},64223:function(e,t,n){var r=n(91859);t.Z=r.Z},41676:function(e,t,n){var r=n(35610);t.Z=r.Z},72715:function(e,t,n){n.d(t,{ValueProperties:function(){return r}});const r={value:{doc:"Value for the value component. Will take precedence over the path value given in the data context.",type:"{valueType}",status:"optional"},defaultValue:{doc:"Default value for the value component. Will not take precedence over the path value given in the data context.",type:"{valueType}",status:"optional"},label:{doc:"Field label to show above the displayed value.",type:"string",status:"optional"},labelSrOnly:{doc:"Use `true` to make the label only readable by screen readers.",type:"boolean",status:"optional"},transformLabel:{doc:"Transforms the label before it gets displayed. Receives the label as the first parameter. The second parameter is a object containing the `convertJsxToString` function.",type:"function",status:"optional"},inheritLabel:{doc:"Use `true` to inherit the label from a visible (rendered) field with the same path.",type:"boolean",status:"optional"},inheritVisibility:{doc:"Use `true` to inherit the visibility from a field with the same path. You can find more info in the [Value section](/uilib/extensions/forms/Value/#inherit-visibility-from-fields-based-on-path).",type:"boolean",status:"optional"},showEmpty:{doc:"Shows the value even if it is empty.",type:"boolean",status:"optional"},placeholder:{doc:"Text showing in place of the value if no value is given.",type:"string",status:"optional"},path:{doc:"JSON Pointer for where the data for this input is located in the source dataset.",type:"string",status:"optional"},inline:{doc:"For showing the value inline (not as a block element).",type:"boolean",status:"optional"},maxWidth:{doc:"Use `auto` for no max-width (use browser default), `small`, `medium` or `large` for predefined standard max widths. Defaults to `large`.",type:"string",status:"optional"},transformIn:{doc:"Transforms the `value` before its displayed in the value component.",type:"function",status:"optional"},"[Space](/uilib/layout/space/properties)":{doc:"Spacing properties like `top` or `bottom` are supported.",type:["string","object"],status:"optional"}}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-value-boolean-properties-mdx-5fa21f02029232a9a4ec.js.map