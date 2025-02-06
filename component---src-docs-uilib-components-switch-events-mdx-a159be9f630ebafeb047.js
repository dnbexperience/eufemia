"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[98459],{94366:function(e,t,n){n.r(t);var s=n(52322),r=n(45392),o=n(85179),a=n(41182);function i(e){const t=Object.assign({h2:"h2"},(0,r.ah)(),e.components);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:"Events"}),"\n",(0,s.jsx)(o.ZP,{props:a.Y})]})}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,r.ah)(),e.components);return t?(0,s.jsx)(t,Object.assign({},e,{children:(0,s.jsx)(i,e)})):i(e)}},85179:function(e,t,n){n.d(t,{Kw:function(){return b},ZP:function(){return y}});var s=n(70894),r=n(61185),o=n(55560),a=n(41676),i=n(6210),c=n(64223),l=n(37339),u=n(595),d=n(52322);const h={...u.L,p:e=>(0,d.jsx)("span",{...e})},p=(0,s.Z)(o.ZP,{target:"e13h2c840"})({name:"1gy8cio",styles:"td:not(.description){white-space:nowrap;}"}),f={default:"var(--color-success-green)",primitive:"var(--color-success-green)",string:"var(--color-fire-red)"},g={default:"var(--color-success-green)",undefined:"var(--color-black-55)",string:"var(--color-fire-red)"},b=e=>{let{variant:t,strikethrough:n,children:s,style:r={},...o}=e;if(n&&(r.textDecoration="line-through"),"string"==typeof s)switch(t){case"prop":break;case"type":r.color=m(s)?f.string:["boolean","true","false","number","bigint","string","symbol"].includes(function(e){return e.endsWith("[]")?e.slice(0,-2):e.startsWith("Array<")&&e.endsWith(">")?e.slice(6,-1):e}(s))?f.primitive:f.default,r.background="none",r.boxShadow="none";break;case"value":r.color=m(s)?g.string:"undefined"===s||"null"===s?g.undefined:g.default,r.background="none",r.boxShadow="none"}return h.code({children:s,style:r,...o})};function y(e){let{props:t,valueType:n="string",camelCase:s,omit:u,showDefaultValue:f=!1}=e;const g=Object.keys(t||{}),y=Object.entries(t||{}).map((e=>{let[t,o]=e;if(!o)return null;const{type:c,defaultValue:p,doc:y,status:m}=o;return u&&u.includes(t)?null:(0,d.jsxs)(a.Z,{children:[(0,d.jsx)(i.Z,{children:(0,d.jsx)(b,{variant:"prop",strikethrough:"deprecated"===m,children:x(s?(0,l.zW)(t):t)})}),(0,d.jsx)(i.Z,{children:(Array.isArray(c)?c:[c]).map((e=>{if("string"==typeof e){if(String(e).includes("{valueType}")){if(Array.isArray(n))return n.map(((e,t)=>(0,d.jsx)(b,{variant:"type",children:e},e+t))).reduce(((e,t)=>(0,d.jsxs)(d.Fragment,{children:[e," ",(0,d.jsx)("br",{})," ",t]})));e=n}return(0,d.jsx)(b,{variant:"type",children:e},e)}})).reduce(((e,t)=>(0,d.jsxs)(d.Fragment,{children:[e," ",(0,d.jsx)("br",{})," ",t]})))}),f&&(0,d.jsx)(i.Z,{children:p?(0,d.jsx)(b,{variant:"value",children:p}):"required"===m&&"REQUIRED"}),(0,d.jsxs)(i.Z,{className:"description",children:[(!f||"deprecated"===m)&&(0,d.jsxs)("em",{children:["(",m,") "]}),(0,d.jsx)(r.D,{components:h,children:s?j(y,g):y})]})]},t)}));return(0,d.jsx)(o.ZP.ScrollView,{children:(0,d.jsxs)(p,{children:[(0,d.jsx)("thead",{children:(0,d.jsxs)(a.Z,{children:[(0,d.jsx)(c.Z,{children:"Property"}),(0,d.jsx)(c.Z,{children:"Type"}),f&&(0,d.jsx)(c.Z,{children:"Default value"}),(0,d.jsx)(c.Z,{className:"description",children:"Description"})]})}),(0,d.jsx)("tbody",{children:y})]})})}function m(e){return["'",'"',"`"].includes(e.substring(0,1))}function j(e,t){return t.forEach((t=>{e=e.replace(new RegExp(t,"g"),(0,l.zW)(t))})),e}function x(e){return e.includes("[")?(0,d.jsx)(r.D,{components:h,children:e}):e}},41182:function(e,t,n){n.d(t,{Y:function(){return r},Z:function(){return s}});const s={checked:{doc:"Determine whether the switch is checked or not. The default will be `false`.",type:"boolean",status:"optional"},title:{doc:"The `title` of the input - describing it a bit further for accessibility reasons.",type:"string",status:"required"},label:{doc:"Use either the `label` property or provide a custom one.",type:"ReactNode",status:"optional"},labelPosition:{doc:"Defines the position of the `label`. Use either `left` or `right`. Defaults to `right`.",type:["left","right"],status:"optional"},labelSrOnly:{doc:"Use `true` to make the label only readable by screen readers.",type:"string",status:"optional"},size:{doc:"The size of the switch. For now there is **medium** (default) and **large**.",type:["default","medium","large"],status:"optional"},status:{doc:"Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.",type:"ReactNode",status:"optional"},statusState:{doc:"Defines the state of the status. Defaults to `error`.",type:["error","warn","info","success","marketing"],status:"optional"},statusProps:{doc:"Use an object to define additional [FormStatus](/uilib/components/form-status/properties/) properties.",type:"FormStatus",status:"optional"},globalStatus:{doc:"The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).",type:"GlobalStatus",status:"optional"},suffix:{doc:"Text describing the content of the Switch more than the label. You can also send in a React component, so it gets wrapped inside the Switch component.",type:"ReactNode",status:"optional"},skeleton:{doc:"If set to `true`, an overlaying skeleton with animation will be shown.",type:"boolean",status:"optional"},innerRef:{doc:"By providing a React.ref we can get the internally used input element (DOM). E.g. `innerRef={myRef}` by using `React.createRef()` or `React.useRef()`.",type:"string",status:"optional"},"[Space](/uilib/layout/space/properties)":{doc:"Spacing properties like `top` or `bottom` are supported.",type:["string","object"],status:"optional"}},r={onChange:{doc:"Will be called on state changes made by the user.",type:"() => {checked: boolean; event: ChangeEvent}",status:"optional"},onChangeEnd:{doc:"Will be called on state changes made by the user, but with a delay. This way the user sees the animation before e.g. an error will be removed. Returns a boolean { checked, event }.",type:"() => {checked: boolean; event: ChangeEvent}",status:"optional"}}},6210:function(e,t,n){var s=n(30600);t.Z=s.Z},64223:function(e,t,n){var s=n(91859);t.Z=s.Z},41676:function(e,t,n){var s=n(35610);t.Z=s.Z}}]);
//# sourceMappingURL=component---src-docs-uilib-components-switch-events-mdx-a159be9f630ebafeb047.js.map