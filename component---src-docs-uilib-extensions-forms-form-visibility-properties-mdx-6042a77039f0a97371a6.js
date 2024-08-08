"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[3225],{76531:function(e,t,n){n.r(t),n.d(t,{default:function(){return l}});var o=n(52322),i=n(45392),a=n(85179);const s={pathDefined:{doc:"Given data context path must be defined to show children.",type:"string",status:"optional"},pathUndefined:{doc:"Given data context path must be undefined to show children.",type:"string",status:"optional"},pathTruthy:{doc:"Given data context path must be truthy to show children.",type:"string",status:"optional"},pathFalsy:{doc:"Given data context path must be falsy to show children.",type:"string",status:"optional"},pathTrue:{doc:"Given data context path must be true to show children.",type:"string",status:"optional"},pathFalse:{doc:"Given data context path must be false to show children.",type:"string",status:"optional"},visibleWhen:{doc:"Provide a `path` or `itemPath` and a `hasValue` method that returns a boolean or the excepted value in order to show children. The first parameter is the value of the path.",type:"object",status:"optional"},visibleWhenNot:{doc:"Same as `visibleWhen`, but with inverted logic.",type:"object",status:"optional"},inferData:{doc:"Will be called to decide by external logic, and show/hide contents based on the return value.",type:"function",status:"optional"},visible:{doc:"Control visibility directly by boolean value.",type:"boolean",status:"optional"},animate:{doc:"Define if the content should animate during show/hide.",type:"boolean",status:"optional"},keepInDOM:{doc:"Keep the content in the DOM, even if it's not visible. Can be used to let fields run validation.",type:"boolean",status:"optional"},compensateForGap:{doc:"To compensate for CSS gap between the rows, so animation does not jump during the animation. Provide a CSS unit or `auto`. Defaults to `null`.",type:"string",status:"optional"},filterData:{doc:"Filter data based on provided criteria. More info about `filterData` can be found in the [Getting Started](/uilib/extensions/forms/getting-started/#filter-data) documentation.",type:["object","function"],status:"optional"},fieldPropsWhenHidden:{doc:"When visibility is hidden, and `keepInDOM` is true, pass these props to the children.",type:"various",status:"optional"},element:{doc:"Define the type of element. Defaults to `div`. Only for when `animate` is true.",type:"string or React.Element",status:"optional"},children:{doc:"Contents.",type:"React.Node",status:"required"}};function r(e){const t=Object.assign({h2:"h2"},(0,i.ah)(),e.components);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:"Properties"}),"\n",(0,o.jsx)(a.ZP,{props:s})]})}var l=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,i.ah)(),e.components);return t?(0,o.jsx)(t,Object.assign({},e,{children:(0,o.jsx)(r,e)})):r(e)}},85179:function(e,t,n){n.d(t,{Kw:function(){return y},ZP:function(){return b}});var o=n(70894),i=n(61185),a=n(55560),s=n(41676),r=n(6210),l=n(64223),c=n(37339),d=n(595),u=n(52322);const h={...d.L,p:e=>(0,u.jsx)("span",{...e})},p=(0,o.Z)(a.ZP,{target:"e13h2c840"})({name:"1qdk5x4",styles:"td{white-space:nowrap;}"}),f="var(--color-fire-red)",y=e=>{let{variant:t,strikethrough:n,children:o,style:i={},...a}=e;if(n&&(i.textDecoration="line-through"),"string"==typeof o)switch(t){case"prop":break;case"type":i.color=o.startsWith("'")?f:"var(--color-violet)";case"value":i.color=o.startsWith("'")?f:"undefined"===o||"null"===o?"var(--color-black-55)":"var(--color-success-green)";default:i.background="none",i.boxShadow="none"}return h.code({children:o,style:i,...a})};function b(e){let{props:t,valueType:n="string",camelCase:o,omit:d,showDefaultValue:f=!1}=e;const b=Object.keys(t||{}),j=Object.entries(t||{}).map((e=>{let[t,a]=e;if(!a)return null;const{type:l,defaultValue:p,doc:j,status:m}=a;return d&&d.includes(t)?null:(0,u.jsxs)(s.Z,{children:[(0,u.jsx)(r.Z,{children:(0,u.jsx)(y,{variant:"prop",strikethrough:"deprecated"===m,children:x(o?(0,c.zW)(t):t)})}),(0,u.jsx)(r.Z,{children:(Array.isArray(l)?l:[l]).map((e=>{if("string"==typeof e){if(String(e).includes("{valueType}")){if(Array.isArray(n))return n.map(((e,t)=>(0,u.jsx)(y,{variant:"type",children:e},e+t))).reduce(((e,t)=>(0,u.jsxs)(u.Fragment,{children:[e," ",(0,u.jsx)("br",{})," ",t]})));e=n}return(0,u.jsx)(y,{variant:"type",children:e},e)}})).reduce(((e,t)=>(0,u.jsxs)(u.Fragment,{children:[e," ",(0,u.jsx)("br",{})," ",t]})))}),f&&(0,u.jsx)(r.Z,{children:p?(0,u.jsx)(y,{variant:"value",children:p}):"required"===m&&"REQUIRED"}),(0,u.jsxs)(r.Z,{children:[(!f||"deprecated"===m)&&(0,u.jsxs)("em",{children:["(",m,") "]}),(0,u.jsx)(i.D,{components:h,children:o?v(j,b):j})]})]},t)}));return(0,u.jsx)(a.ZP.ScrollView,{children:(0,u.jsxs)(p,{children:[(0,u.jsx)("thead",{children:(0,u.jsxs)(s.Z,{children:[(0,u.jsx)(l.Z,{children:"Property"}),(0,u.jsx)(l.Z,{children:"Type"}),f&&(0,u.jsx)(l.Z,{children:"Default value"}),(0,u.jsx)(l.Z,{children:"Description"})]})}),(0,u.jsx)("tbody",{children:j})]})})}function v(e,t){return t.forEach((t=>{e=e.replace(new RegExp(t,"g"),(0,c.zW)(t))})),e}function x(e){return e.includes("/")?(0,u.jsx)(i.D,{components:h,children:e}):e}},6210:function(e,t,n){var o=n(30600);t.Z=o.Z},64223:function(e,t,n){var o=n(91859);t.Z=o.Z},41676:function(e,t,n){var o=n(35610);t.Z=o.Z}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-form-visibility-properties-mdx-6042a77039f0a97371a6.js.map