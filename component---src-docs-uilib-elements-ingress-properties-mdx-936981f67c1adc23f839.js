"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[98990],{56315:function(e,t,n){n.r(t),n.d(t,{default:function(){return l}});var s=n(52322),r=n(45392),i=n(85179);const o={...n(31308).Y};function a(e){const t=Object.assign({h2:"h2"},(0,r.ah)(),e.components);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:"Properties"}),"\n",(0,s.jsx)(i.ZP,{props:o})]})}var l=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,r.ah)(),e.components);return t?(0,s.jsx)(t,Object.assign({},e,{children:(0,s.jsx)(a,e)})):a(e)}},85179:function(e,t,n){n.d(t,{Kw:function(){return m},ZP:function(){return y}});var s=n(70894),r=n(61185),i=n(55560),o=n(41676),a=n(6210),l=n(64223),c=n(37339),d=n(595),u=n(52322);const p={...d.L,p:e=>(0,u.jsx)("span",{...e})},h=(0,s.Z)(i.ZP,{target:"e13h2c840"})({name:"1gy8cio",styles:"td:not(.description){white-space:nowrap;}"}),g={default:"var(--color-success-green)",primitive:"var(--color-success-green)",string:"var(--color-fire-red)"},f={default:"var(--color-success-green)",undefined:"var(--color-black-55)",string:"var(--color-fire-red)"},m=e=>{let{variant:t,strikethrough:n,children:s,style:r={},...i}=e;if(n&&(r.textDecoration="line-through"),"string"==typeof s)switch(t){case"prop":break;case"type":r.color=x(s)?g.string:["boolean","true","false","number","bigint","string","symbol"].includes(function(e){return e.endsWith("[]")?e.slice(0,-2):e.startsWith("Array<")&&e.endsWith(">")?e.slice(6,-1):e}(s))?g.primitive:g.default,r.background="none",r.boxShadow="none";break;case"value":r.color=x(s)?f.string:"undefined"===s||"null"===s?f.undefined:f.default,r.background="none",r.boxShadow="none"}return p.code({children:s,style:r,...i})};function y(e){let{props:t,valueType:n="string",camelCase:s,omit:d,showDefaultValue:g=!1}=e;const f=Object.keys(t||{}),y=Object.entries(t||{}).map((e=>{let[t,i]=e;if(!i)return null;const{type:l,defaultValue:h,doc:y,status:x}=i;return d&&d.includes(t)?null:(0,u.jsxs)(o.Z,{children:[(0,u.jsx)(a.Z,{children:(0,u.jsx)(m,{variant:"prop",strikethrough:"deprecated"===x,children:j(s?(0,c.zW)(t):t)})}),(0,u.jsx)(a.Z,{children:(Array.isArray(l)?l:[l]).map((e=>{if("string"==typeof e){if(String(e).includes("{valueType}")){if(Array.isArray(n))return n.map(((e,t)=>(0,u.jsx)(m,{variant:"type",children:e},e+t))).reduce(((e,t)=>(0,u.jsxs)(u.Fragment,{children:[e," ",(0,u.jsx)("br",{})," ",t]})));e=n}return(0,u.jsx)(m,{variant:"type",children:e},e)}})).reduce(((e,t)=>(0,u.jsxs)(u.Fragment,{children:[e," ",(0,u.jsx)("br",{})," ",t]})))}),g&&(0,u.jsx)(a.Z,{children:h?(0,u.jsx)(m,{variant:"value",children:h}):"required"===x&&"REQUIRED"}),(0,u.jsxs)(a.Z,{className:"description",children:[(!g||"deprecated"===x)&&(0,u.jsxs)("em",{children:["(",x,") "]}),(0,u.jsx)(r.D,{components:p,children:s?b(y,f):y})]})]},t)}));return(0,u.jsx)(i.ZP.ScrollView,{children:(0,u.jsxs)(h,{children:[(0,u.jsx)("thead",{children:(0,u.jsxs)(o.Z,{children:[(0,u.jsx)(l.Z,{children:"Property"}),(0,u.jsx)(l.Z,{children:"Type"}),g&&(0,u.jsx)(l.Z,{children:"Default value"}),(0,u.jsx)(l.Z,{className:"description",children:"Description"})]})}),(0,u.jsx)("tbody",{children:y})]})})}function x(e){return["'",'"',"`"].includes(e.substring(0,1))}function b(e,t){return t.forEach((t=>{e=e.replace(new RegExp(t,"g"),(0,c.zW)(t))})),e}function j(e){return e.includes("[")?(0,u.jsx)(r.D,{components:p,children:e}):e}},6210:function(e,t,n){var s=n(30600);t.Z=s.Z},64223:function(e,t,n){var s=n(91859);t.Z=s.Z},41676:function(e,t,n){var s=n(35610);t.Z=s.Z},31308:function(e,t,n){n.d(t,{Y:function(){return s}});const s={...n(42076).I,medium:{doc:"Tells the component to use the medium font-weight styling `dnb-t__weight--medium`. More details [here](/uilib/typography/font-weight).",type:"boolean",status:"deprecated"},bold:{doc:"Tells the component to use the bold font-weight styling class `dnb-t__weight--bold`. More details [here](/uilib/typography/font-weight).",type:"boolean",status:"deprecated"},modifier:{doc:"String containing a combination of modifiers, used to set both font-size and weight in one property. e.g. `x-small medium` would make the paragraph extra small and medium.",type:"string",status:"deprecated"}}},42076:function(e,t,n){n.d(t,{I:function(){return s}});const s={element:{doc:"Defines the Element Type, like `p`.",type:["HTMLElement","string"],status:"optional"},size:{doc:"Sets the font size, also sets the line-height if `lineHeight` prop is not set.",type:["'x-small'","'small'","'basis'","'medium'","'large'","'x-large'","'xx-large'"],status:"optional"},lineHeight:{doc:"Sets the line height, will use same value as `size` if not set.",type:["'x-small'","'small'","'basis'","'medium'","'large'","'x-large'","'xx-large'"],status:"optional"},align:{doc:"Sets the text alignment.",type:["'center'","'left'","'right'"],status:"optional"},family:{doc:"Sets the font family.",type:["'basis'","'heading'","'monospace'"],status:"optional"},weight:{doc:"Sets the font weight.",type:["'regular'","'medium'"],status:"optional"},decoration:{doc:"Sets the font decoration.",type:"'underline'",status:"optional"},slant:{doc:"Sets the font style.",type:"'italic'",status:"optional"},"[Space](/uilib/layout/space/properties)":{doc:"Spacing properties like `top` or `bottom` are supported.",type:["string","object"],status:"optional"}}}}]);
//# sourceMappingURL=component---src-docs-uilib-elements-ingress-properties-mdx-936981f67c1adc23f839.js.map