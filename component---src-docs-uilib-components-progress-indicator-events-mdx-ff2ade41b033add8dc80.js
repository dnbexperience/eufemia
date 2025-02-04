"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[3158],{51354:function(e,t,n){n.r(t);var o=n(52322),a=n(45392),r=n(85179),s=n(42871);function i(e){const t=Object.assign({h2:"h2"},(0,a.ah)(),e.components);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:"Events"}),"\n",(0,o.jsx)(r.ZP,{props:s.u4,showDefaultValue:!0}),"\n",(0,o.jsx)(t.h2,{children:"Deprecated events"}),"\n",(0,o.jsx)(r.ZP,{props:s.Cu})]})}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,a.ah)(),e.components);return t?(0,o.jsx)(t,Object.assign({},e,{children:(0,o.jsx)(i,e)})):i(e)}},85179:function(e,t,n){n.d(t,{Kw:function(){return g},ZP:function(){return y}});var o=n(70894),a=n(61185),r=n(55560),s=n(41676),i=n(6210),l=n(64223),u=n(37339),c=n(595),d=n(52322);const p={...c.L,p:e=>(0,d.jsx)("span",{...e})},f=(0,o.Z)(r.ZP,{target:"e13h2c840"})({name:"1qdk5x4",styles:"td{white-space:nowrap;}"}),h={default:"var(--color-success-green)",primitive:"var(--color-success-green)",string:"var(--color-fire-red)"},b={default:"var(--color-success-green)",undefined:"var(--color-black-55)",string:"var(--color-fire-red)"},g=e=>{let{variant:t,strikethrough:n,children:o,style:a={},...r}=e;if(n&&(a.textDecoration="line-through"),"string"==typeof o)switch(t){case"prop":break;case"type":a.color=m(o)?h.string:["boolean","true","false","number","bigint","string","symbol"].includes(function(e){return e.endsWith("[]")?e.slice(0,-2):e.startsWith("Array<")&&e.endsWith(">")?e.slice(6,-1):e}(o))?h.primitive:h.default,a.background="none",a.boxShadow="none";break;case"value":a.color=m(o)?b.string:"undefined"===o||"null"===o?b.undefined:b.default,a.background="none",a.boxShadow="none"}return p.code({children:o,style:a,...r})};function y(e){let{props:t,valueType:n="string",camelCase:o,omit:c,showDefaultValue:h=!1}=e;const b=Object.keys(t||{}),y=Object.entries(t||{}).map((e=>{let[t,r]=e;if(!r)return null;const{type:l,defaultValue:f,doc:y,status:m}=r;return c&&c.includes(t)?null:(0,d.jsxs)(s.Z,{children:[(0,d.jsx)(i.Z,{children:(0,d.jsx)(g,{variant:"prop",strikethrough:"deprecated"===m,children:x(o?(0,u.zW)(t):t)})}),(0,d.jsx)(i.Z,{children:(Array.isArray(l)?l:[l]).map((e=>{if("string"==typeof e){if(String(e).includes("{valueType}")){if(Array.isArray(n))return n.map(((e,t)=>(0,d.jsx)(g,{variant:"type",children:e},e+t))).reduce(((e,t)=>(0,d.jsxs)(d.Fragment,{children:[e," ",(0,d.jsx)("br",{})," ",t]})));e=n}return(0,d.jsx)(g,{variant:"type",children:e},e)}})).reduce(((e,t)=>(0,d.jsxs)(d.Fragment,{children:[e," ",(0,d.jsx)("br",{})," ",t]})))}),h&&(0,d.jsx)(i.Z,{children:f?(0,d.jsx)(g,{variant:"value",children:f}):"required"===m&&"REQUIRED"}),(0,d.jsxs)(i.Z,{children:[(!h||"deprecated"===m)&&(0,d.jsxs)("em",{children:["(",m,") "]}),(0,d.jsx)(a.D,{components:p,children:o?j(y,b):y})]})]},t)}));return(0,d.jsx)(r.ZP.ScrollView,{children:(0,d.jsxs)(f,{children:[(0,d.jsx)("thead",{children:(0,d.jsxs)(s.Z,{children:[(0,d.jsx)(l.Z,{children:"Property"}),(0,d.jsx)(l.Z,{children:"Type"}),h&&(0,d.jsx)(l.Z,{children:"Default value"}),(0,d.jsx)(l.Z,{children:"Description"})]})}),(0,d.jsx)("tbody",{children:y})]})})}function m(e){return["'",'"',"`"].includes(e.substring(0,1))}function j(e,t){return t.forEach((t=>{e=e.replace(new RegExp(t,"g"),(0,u.zW)(t))})),e}function x(e){return e.includes("[")?(0,d.jsx)(a.D,{components:p,children:e}):e}},42871:function(e,t,n){n.d(t,{Bl:function(){return r},Cg:function(){return a},Cu:function(){return i},i7:function(){return o},u4:function(){return s}});const o={progress:{doc:"A number between 0-100, if not supplied a continuous loading-type animation will be used.",type:["string","number"],defaultValue:"undefined",status:"optional"},visible:{doc:"Defines the visibility of the progress. Toggling the `visible` property to `false` will force a fade-out animation.",type:"boolean",defaultValue:"true",status:"optional"},type:{doc:"Defines the type.",type:["'circular'","'linear'","'countdown'"],defaultValue:"'circular'",status:"optional"},noAnimation:{doc:"Disables the fade-in and fade-out animation.",type:"boolean",defaultValue:"false",status:"optional"},size:{doc:"Defines the size.",type:["'default'","'small'","'medium'","'large'","'huge'","string"],defaultValue:"'default'",status:"optional"},label:{doc:"Content of a custom label. (Overrides `indicator_label` and `showDefaultLabel`)",type:"React.ReactNode",defaultValue:"undefined",status:"optional"},children:{doc:"Same as `label` prop (`label` prop has priority)",type:"React.ReactNode",defaultValue:"undefined",status:"optional"},labelDirection:{doc:"Sets the position of the label. `'inside'` only works with `type='circular'.",type:["'horizontal'","'vertical'","'inside'"],defaultValue:"'horizontal'",status:"optional"},showDefaultLabel:{doc:"If set to `true` a default label (from text locales) will be shown.",type:"boolean",defaultValue:"false",status:"optional"},indicator_label:{doc:"Use this to override the default label from text locales.",type:"string",defaultValue:"undefined",status:"optional"},title:{doc:"Used to set title and aria-label. Defaults to the value of progress property, formatted as a percent.",type:"string",defaultValue:"undefined",status:"optional"},"[customColors](/uilib/components/progress-indicator/properties/#data-object-customcolors)":{doc:"Send in custom css colors that overrides any css. See below for data structure.",type:"object",defaultValue:"undefined",status:"optional"},customCircleWidth:{doc:"Send in custom css width for circle progress line. (`undefined` defaults to one eighth of the size).",type:"string",defaultValue:"undefined",status:"optional"},"[Space](/uilib/layout/space/properties)":{doc:"Spacing properties like `top` or `bottom` are supported.",type:["string","object"],status:"optional"}},a={line:{doc:"Override the moving line color.",type:"string",defaultValue:"undefined",status:"optional"},shaft:{doc:"Override the background line color.",type:"string",defaultValue:"undefined",status:"optional"},background:{doc:"Set a background color for the center of the circle.",type:"string",defaultValue:"undefined",status:"optional"}},r={no_animation:{doc:"use `noAnimation`.",type:" boolean",status:"deprecated"},label_direction:{doc:"use `labelDirection`.",type:"string",status:"deprecated"},show_label:{doc:"use `showDefaultLabel`.",type:"boolean",status:"deprecated"}},s={onComplete:{doc:"Will be called once it's no longer `visible`.",type:"function",defaultValue:"undefined",status:"optional"}},i={on_complete:{doc:"use `onComplete`.",type:"function",status:"deprecated"}}},6210:function(e,t,n){var o=n(30600);t.Z=o.Z},64223:function(e,t,n){var o=n(91859);t.Z=o.Z},41676:function(e,t,n){var o=n(35610);t.Z=o.Z}}]);
//# sourceMappingURL=component---src-docs-uilib-components-progress-indicator-events-mdx-ff2ade41b033add8dc80.js.map