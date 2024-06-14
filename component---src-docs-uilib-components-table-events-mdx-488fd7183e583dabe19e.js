"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[88489],{93933:function(e,t,a){a.r(t);var n=a(52322),o=a(45392),l=a(85179),s=a(71927);function r(e){const t=Object.assign({h2:"h2",code:"code",p:"p"},(0,o.ah)(),e.components);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h2,{children:"Table events"}),"\n",(0,n.jsx)(l.ZP,{props:s.XU,showDefaultValue:!0}),"\n",(0,n.jsxs)(t.h2,{children:["Table Row ",(0,n.jsx)(t.code,{children:"<Tr>"})," events"]}),"\n",(0,n.jsxs)(t.p,{children:["Table Row ",(0,n.jsx)(t.code,{children:"<Tr>"})," events are a part of the accordion feature and needs to be enabled with the ",(0,n.jsx)(t.code,{children:"accordion"})," property on the main Table."]}),"\n",(0,n.jsx)(l.ZP,{props:s.uH,showDefaultValue:!0})]})}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,o.ah)(),e.components);return t?(0,n.jsx)(t,Object.assign({},e,{children:(0,n.jsx)(r,e)})):r(e)}},85179:function(e,t,a){a.d(t,{Kw:function(){return b},ZP:function(){return y}});var n=a(70894),o=a(61185),l=a(55560),s=a(41676),r=a(6210),i=a(64223),d=a(37339),u=a(595),c=a(52322);const p={...u.L,p:e=>(0,c.jsx)("span",{...e})},h=(0,n.Z)(l.ZP,{target:"e13h2c840"})({name:"1qdk5x4",styles:"td{white-space:nowrap;}"}),f="var(--color-fire-red)",b=e=>{let{variant:t,strikethrough:a,children:n,style:o={},...l}=e;if(a&&(o.textDecoration="line-through"),"string"==typeof n)switch(t){case"prop":break;case"type":o.color=n.startsWith("'")?f:"var(--color-violet)";case"value":o.color=n.startsWith("'")?f:"undefined"===n||"null"===n?"var(--color-black-55)":"var(--color-success-green)";default:o.background="none",o.boxShadow="none"}return p.code({children:n,style:o,...l})};function y(e){let{props:t,valueType:a="string",camelCase:n,omit:u,showDefaultValue:f=!1}=e;const y=Object.keys(t),g=Object.entries(t).map((e=>{let[t,l]=e;if(!l)return null;const{type:i,defaultValue:h,doc:g,status:j}=l;return u&&u.includes(t)?null:(0,c.jsxs)(s.Z,{children:[(0,c.jsx)(r.Z,{children:(0,c.jsx)(b,{variant:"prop",strikethrough:"deprecated"===j,children:x(n?(0,d.zW)(t):t)})}),(0,c.jsx)(r.Z,{children:(Array.isArray(i)?i:[i]).map((e=>{if("string"==typeof e){if(String(e).includes("{valueType}")){if(Array.isArray(a))return a.map(((e,t)=>(0,c.jsx)(b,{variant:"type",children:e},e+t))).reduce(((e,t)=>(0,c.jsxs)(c.Fragment,{children:[e," ",(0,c.jsx)("br",{})," ",t]})));e=a}return(0,c.jsx)(b,{variant:"type",children:e},e)}})).reduce(((e,t)=>(0,c.jsxs)(c.Fragment,{children:[e," ",(0,c.jsx)("br",{})," ",t]})))}),f&&(0,c.jsx)(r.Z,{children:h?(0,c.jsx)(b,{variant:"value",children:h}):"required"===j&&"REQUIRED"}),(0,c.jsxs)(r.Z,{children:[(!f||"deprecated"===j)&&(0,c.jsxs)("em",{children:["(",j,") "]}),(0,c.jsx)(o.D,{components:p,children:n?w(g,y):g})]})]},t)}));return(0,c.jsx)(l.ZP.ScrollView,{children:(0,c.jsxs)(h,{children:[(0,c.jsx)("thead",{children:(0,c.jsxs)(s.Z,{children:[(0,c.jsx)(i.Z,{children:"Property"}),(0,c.jsx)(i.Z,{children:"Type"}),f&&(0,c.jsx)(i.Z,{children:"Default value"}),(0,c.jsx)(i.Z,{children:"Description"})]})}),(0,c.jsx)("tbody",{children:g})]})})}function w(e,t){return t.forEach((t=>{e=e.replace(new RegExp(t,"g"),(0,d.zW)(t))})),e}function x(e){return e.includes("/")?(0,c.jsx)(o.D,{components:p,children:e}):e}},71927:function(e,t,a){a.d(t,{Fl:function(){return i},XK:function(){return n},XU:function(){return o},Z_:function(){return l},ks:function(){return r},uH:function(){return s}});const n={accordion:{doc:"Set to true if you have one or more rows that contains an accordion content.",type:"boolean",defaultValue:"false",status:"optional"},accordionChevronPlacement:{doc:"Defines where the chevron will be placed.",type:["'start'","'end'"],defaultValue:"'start'",status:"optional"},border:{doc:"Use `true` to show borders between table data cells.",type:"boolean",defaultValue:"false",status:"optional"},outline:{doc:"Use `true` to show an outline border around the table",type:"boolean",defaultValue:"false",status:"optional"},sticky:{doc:"Use `true` to enable a sticky Table header. Or use `'css-position'` to enable the CSS based scroll behavior.",type:["boolean","'css-position'"],defaultValue:"false",status:"optional"},stickyOffset:{doc:"Defines the offset (top) in `rem` from where the header should start to stick. You may define your app header height here, if you have a sticky header on your page.",type:["string","number"],defaultValue:"false",status:"optional"},size:{doc:"Spacing size inside the table header and data.",type:["'large'","'medium'","'small'"],defaultValue:"'large'",status:"optional"},fixed:{doc:"If set to `true`, the table will behave with a fixed table layout, using: `table-layout: fixed;`. Use e.g. CSS `width: 40%` on a table column to define the width.",type:"boolean",defaultValue:"null",status:"optional"},children:{doc:"The content of the component.",type:"React.ReactNode",status:"required"},className:{doc:"Custom className on the component root",type:"string",defaultValue:"undefined",status:"optional"},skeleton:{doc:"If set to `true`, an overlaying skeleton with animation will be shown.",type:"boolean",defaultValue:"undefined",status:"optional"},"[Space](/uilib/layout/space/properties)":{doc:"Spacing properties like `top` or `bottom` are supported.",type:["string","object"],status:"optional"}},o={collapseAllHandleRef:{doc:"ref handle to collapse all expanded accordion rows. Send in a ref and use `.current()` to collapse all rows.",type:"React.MutableRefObject<() => void>",defaultValue:"undefined",status:"optional"}},l={variant:{doc:"Override the automatic variant of the current row. The next row one will continue with the opposite.",type:["'even'","'odd'"],defaultValue:"undefined",status:"optional"},noWrap:{doc:"if set to `true`, the inherited header text will not wrap to new lines.",type:"boolean",defaultValue:"true",status:"optional"},expanded:{doc:"use `true` to render the `<Tr>` initially as expanded.",type:"boolean",defaultValue:"false",status:"optional"},disabled:{doc:"use `true` to disable the `<Tr>` to be accessible as an interactive element.",type:"boolean",defaultValue:"false",status:"optional"},noAnimation:{doc:"use `true` to disable the expand/collapse animation.",type:"boolean",defaultValue:"false",status:"optional"},children:{doc:"The content of the component.",type:"React.ReactNode",status:"required"}},s={onClick:{doc:"will emit when user clicks/expands the table row. Returns a native click.",type:"(event) => void",defaultValue:"undefined",status:"optional"},onOpened:{doc:"Will emit when table row is expanded. Returns an object with the table row as the target: `{ target }`.",type:"({ target }) => void",defaultValue:"undefined",status:"optional"},onClosed:{doc:"Will emit when table row is closed (after it was open). Returns an object with the table row as the target: `{ target }`.",type:"({ target }) => void",defaultValue:"undefined",status:"optional"}},r={sortable:{doc:"Defines the table header as sortable if set to `true` (ascending).",type:"boolean",defaultValue:"false",status:"optional"},active:{doc:"Defines the sortable column as the current active (ascending).",type:"boolean",defaultValue:"false",status:"optional"},reversed:{doc:"Defines the sortable column as in reversed order (descending).",type:"boolean",defaultValue:"false",status:"optional"},noWrap:{doc:"If set to `true`, the header text will not wrap to new lines.",type:"boolean",defaultValue:"false",status:"optional"},children:{doc:"The content of the component.",type:"React.ReactNode",defaultValue:"undefined",status:"optional"}},i={noSpacing:{doc:"If set to `true`, no padding will be added.",type:"boolean",defaultValue:"false",status:"optional"},spacing:{doc:"Set to `horizontal` for padding on left and right side.",type:"'horizontal'",defaultValue:"undefined",status:"optional"},children:{doc:"The content of the component.",type:"React.ReactNode",defaultValue:"undefined",status:"optional"}}},6210:function(e,t,a){var n=a(30600);t.Z=n.Z},64223:function(e,t,a){var n=a(91859);t.Z=n.Z},41676:function(e,t,a){var n=a(37381);t.Z=n.Z}}]);
//# sourceMappingURL=component---src-docs-uilib-components-table-events-mdx-488fd7183e583dabe19e.js.map