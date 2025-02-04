"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[72803],{39568:function(e,t,n){n.r(t);var i=n(52322),r=n(45392),s=n(85179),a=n(67492);function o(e){const t=Object.assign({h2:"h2",h3:"h3"},(0,r.ah)(),e.components);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:"Properties"}),"\n",(0,i.jsx)(t.h3,{children:"Section-specific properties"}),"\n",(0,i.jsx)(s.ZP,{props:a.e})]})}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,r.ah)(),e.components);return t?(0,i.jsx)(t,Object.assign({},e,{children:(0,i.jsx)(o,e)})):o(e)}},85179:function(e,t,n){n.d(t,{Kw:function(){return g},ZP:function(){return j}});var i=n(70894),r=n(61185),s=n(55560),a=n(41676),o=n(6210),l=n(64223),c=n(37339),d=n(595),u=n(52322);const h={...d.L,p:e=>(0,u.jsx)("span",{...e})},p=(0,i.Z)(s.ZP,{target:"e13h2c840"})({name:"1qdk5x4",styles:"td{white-space:nowrap;}"}),f={default:"var(--color-success-green)",primitive:"var(--color-success-green)",string:"var(--color-fire-red)"},b={default:"var(--color-success-green)",undefined:"var(--color-black-55)",string:"var(--color-fire-red)"},g=e=>{let{variant:t,strikethrough:n,children:i,style:r={},...s}=e;if(n&&(r.textDecoration="line-through"),"string"==typeof i)switch(t){case"prop":break;case"type":r.color=y(i)?f.string:["boolean","true","false","number","bigint","string","symbol"].includes(function(e){return e.endsWith("[]")?e.slice(0,-2):e.startsWith("Array<")&&e.endsWith(">")?e.slice(6,-1):e}(i))?f.primitive:f.default,r.background="none",r.boxShadow="none";break;case"value":r.color=y(i)?b.string:"undefined"===i||"null"===i?b.undefined:b.default,r.background="none",r.boxShadow="none"}return h.code({children:i,style:r,...s})};function j(e){let{props:t,valueType:n="string",camelCase:i,omit:d,showDefaultValue:f=!1}=e;const b=Object.keys(t||{}),j=Object.entries(t||{}).map((e=>{let[t,s]=e;if(!s)return null;const{type:l,defaultValue:p,doc:j,status:y}=s;return d&&d.includes(t)?null:(0,u.jsxs)(a.Z,{children:[(0,u.jsx)(o.Z,{children:(0,u.jsx)(g,{variant:"prop",strikethrough:"deprecated"===y,children:x(i?(0,c.zW)(t):t)})}),(0,u.jsx)(o.Z,{children:(Array.isArray(l)?l:[l]).map((e=>{if("string"==typeof e){if(String(e).includes("{valueType}")){if(Array.isArray(n))return n.map(((e,t)=>(0,u.jsx)(g,{variant:"type",children:e},e+t))).reduce(((e,t)=>(0,u.jsxs)(u.Fragment,{children:[e," ",(0,u.jsx)("br",{})," ",t]})));e=n}return(0,u.jsx)(g,{variant:"type",children:e},e)}})).reduce(((e,t)=>(0,u.jsxs)(u.Fragment,{children:[e," ",(0,u.jsx)("br",{})," ",t]})))}),f&&(0,u.jsx)(o.Z,{children:p?(0,u.jsx)(g,{variant:"value",children:p}):"required"===y&&"REQUIRED"}),(0,u.jsxs)(o.Z,{children:[(!f||"deprecated"===y)&&(0,u.jsxs)("em",{children:["(",y,") "]}),(0,u.jsx)(r.D,{components:h,children:i?v(j,b):j})]})]},t)}));return(0,u.jsx)(s.ZP.ScrollView,{children:(0,u.jsxs)(p,{children:[(0,u.jsx)("thead",{children:(0,u.jsxs)(a.Z,{children:[(0,u.jsx)(l.Z,{children:"Property"}),(0,u.jsx)(l.Z,{children:"Type"}),f&&(0,u.jsx)(l.Z,{children:"Default value"}),(0,u.jsx)(l.Z,{children:"Description"})]})}),(0,u.jsx)("tbody",{children:j})]})})}function y(e){return["'",'"',"`"].includes(e.substring(0,1))}function v(e,t){return t.forEach((t=>{e=e.replace(new RegExp(t,"g"),(0,c.zW)(t))})),e}function x(e){return e.includes("[")?(0,u.jsx)(r.D,{components:h,children:e}):e}},6210:function(e,t,n){var i=n(30600);t.Z=i.Z},64223:function(e,t,n){var i=n(91859);t.Z=i.Z},41676:function(e,t,n){var i=n(35610);t.Z=i.Z},67492:function(e,t,n){n.d(t,{I:function(){return i},e:function(){return r}});const i={path:{doc:"A path to the section (JSON Pointer). When defined, fields inside the section will get this path as a prefix of their own path.",type:"string",status:"optional"},overwriteProps:{doc:"Overwrite field props for the section.",type:"object",status:"optional"},translation:{doc:"Provide a translation for the section (e.g. `{'nb-NO': { MySection: { MyField: { label: 'Custom' }}}}`).",type:"object",status:"optional"},required:{doc:"Makes all fields inside it required.",type:"boolean",status:"optional"},validateInitially:{doc:'If set to `true`, the whole section will be validated initially. All fields will then automatically get `validateInitially` and show their error messages. Can be useful in combination with `containerMode="auto"`.',type:"boolean",status:"optional"},defaultData:{doc:"Provide default data to the section fields and values, in case the data context (Form.Handler) is not available.",type:"object",status:"optional"},data:{doc:"Provide data to the section fields and values, in case the data context (Form.Handler) is not available.",type:"object",status:"optional"},containerMode:{doc:'Defines the container mode. Can be `view`, `edit` or `auto`. When set to `auto`, the mode will initially be "edit" if fields contain errors. Defaults to `auto`.',type:"string",status:"optional"},children:{doc:"All the fields and values inside the section.",type:"React.Node",status:"optional"}},r={onChange:{doc:"Will be called when a value of a field was changed by the user, with the data set (including the changed value) as argument.",type:"function",status:"optional"}}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-form-section-events-mdx-f4570bf9ddc0fc98b6cc.js.map