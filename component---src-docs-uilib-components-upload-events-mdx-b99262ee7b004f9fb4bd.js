"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[79326],{40875:function(e,t,i){i.r(t);var n=i(52322),s=i(45392),o=i(85179),l=i(22260);function r(e){const t=Object.assign({h2:"h2",p:"p",code:"code"},(0,s.ah)(),e.components);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h2,{children:"Events"}),"\n",(0,n.jsx)(o.ZP,{props:l.TM}),"\n",(0,n.jsxs)(t.p,{children:["Each ",(0,n.jsx)(t.code,{children:"fileItem"})," will contain a ",(0,n.jsx)(t.code,{children:"{ file, id, exists }"})," (File Object, an unique ID and if the file exists or not) along with other information."]})]})}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,s.ah)(),e.components);return t?(0,n.jsx)(t,Object.assign({},e,{children:(0,n.jsx)(r,e)})):r(e)}},85179:function(e,t,i){i.d(t,{Kw:function(){return y},ZP:function(){return x}});var n=i(70894),s=i(61185),o=i(55560),l=i(41676),r=i(6210),a=i(64223),c=i(37339),d=i(595),p=i(52322);const u={...d.L,p:e=>(0,p.jsx)("span",{...e})},f=(0,n.Z)(o.ZP,{target:"e13h2c840"})({name:"1qdk5x4",styles:"td{white-space:nowrap;}"}),h="var(--color-fire-red)",y=e=>{let{variant:t,strikethrough:i,children:n,style:s={},...o}=e;if(i&&(s.textDecoration="line-through"),"string"==typeof n)switch(t){case"prop":break;case"type":s.color=n.startsWith("'")?h:"var(--color-violet)";case"value":s.color=n.startsWith("'")?h:"undefined"===n||"null"===n?"var(--color-black-55)":"var(--color-success-green)";default:s.background="none",s.boxShadow="none"}return u.code({children:n,style:s,...o})};function x(e){let{props:t,valueType:i="string",camelCase:n,omit:d,showDefaultValue:h=!1}=e;const x=Object.keys(t||{}),j=Object.entries(t||{}).map((e=>{let[t,o]=e;if(!o)return null;const{type:a,defaultValue:f,doc:j,status:g}=o;return d&&d.includes(t)?null:(0,p.jsxs)(l.Z,{children:[(0,p.jsx)(r.Z,{children:(0,p.jsx)(y,{variant:"prop",strikethrough:"deprecated"===g,children:m(n?(0,c.zW)(t):t)})}),(0,p.jsx)(r.Z,{children:(Array.isArray(a)?a:[a]).map((e=>{if("string"==typeof e){if(String(e).includes("{valueType}")){if(Array.isArray(i))return i.map(((e,t)=>(0,p.jsx)(y,{variant:"type",children:e},e+t))).reduce(((e,t)=>(0,p.jsxs)(p.Fragment,{children:[e," ",(0,p.jsx)("br",{})," ",t]})));e=i}return(0,p.jsx)(y,{variant:"type",children:e},e)}})).reduce(((e,t)=>(0,p.jsxs)(p.Fragment,{children:[e," ",(0,p.jsx)("br",{})," ",t]})))}),h&&(0,p.jsx)(r.Z,{children:f?(0,p.jsx)(y,{variant:"value",children:f}):"required"===g&&"REQUIRED"}),(0,p.jsxs)(r.Z,{children:[(!h||"deprecated"===g)&&(0,p.jsxs)("em",{children:["(",g,") "]}),(0,p.jsx)(s.D,{components:u,children:n?b(j,x):j})]})]},t)}));return(0,p.jsx)(o.ZP.ScrollView,{children:(0,p.jsxs)(f,{children:[(0,p.jsx)("thead",{children:(0,p.jsxs)(l.Z,{children:[(0,p.jsx)(a.Z,{children:"Property"}),(0,p.jsx)(a.Z,{children:"Type"}),h&&(0,p.jsx)(a.Z,{children:"Default value"}),(0,p.jsx)(a.Z,{children:"Description"})]})}),(0,p.jsx)("tbody",{children:j})]})})}function b(e,t){return t.forEach((t=>{e=e.replace(new RegExp(t,"g"),(0,c.zW)(t))})),e}function m(e){return e.includes("[")?(0,p.jsx)(s.D,{components:u,children:e}):e}},22260:function(e,t,i){i.d(t,{TM:function(){return o},Ts:function(){return s},W8:function(){return n}});const n={acceptedFileTypes:{doc:"List of accepted file types. Either as string or [AcceptedFileType](/uilib/components/upload/properties/#acceptedfiletype). When providing a list of [AcceptedFileType](/uilib/components/upload/properties/#acceptedfiletype), the accepted file types will be presented in a table(see [example](/uilib/components/upload/demos/#upload-with-file-max-size-based-on-file-type)).",type:["Array<string>","Array<AcceptedFileType>"],status:"required"},filesAmountLimit:{doc:"Defines the amount of files the user can select and upload. Defaults to 100.",type:"number",status:"optional"},fileMaxSize:{doc:"Defines the max file size of each file in MB. Use either `0` or `false` to disable. Defaults to 5 MB.",type:["number","false"],status:"optional"},title:{doc:"Custom text property. Replaces the default title. Can be disabled using `false`.",type:"string",status:"optional"},text:{doc:"Custom text property. Replaces the default text. Can be disabled using `false`.",type:"string",status:"optional"},download:{doc:"Causes the browser to treat all listed files as downloadable instead of opening them in a new browser tab or window. Defaults to `false`.",type:"boolean",status:"optional"},skeleton:{doc:"Skeleton should be applied when loading content.",type:"boolean",status:"optional"},"[Space](/uilib/layout/space/properties)":{doc:"Spacing properties like `top` or `bottom` are supported.",type:["string","object"],status:"optional"}},s={fileType:{doc:"The name of the accepted file type.",type:"string",status:"required"},fileMaxSize:{doc:"Defines the max file size of the given file type in MB. Use either `0` or `false` to disable. If not provided, it defaults to the value of [Uploads](/uilib/components/upload/properties/#properties) `fileMaxSize` which defaults to 5 MB.",type:["number","false"],status:"optional"}},o={onChange:{doc:"Will be called on `files` changes made by the user. Access the files with `{ files }` (containing each a `fileItem`).",type:"function",status:"optional"},onFileDelete:{doc:"Will be called once a file gets deleted by the user. Access the deleted file with `{ fileItem }`.",type:"function",status:"optional"},onFileClick:{doc:"Will be called once a file gets clicked on by the user. Access the clicked file with `{ fileItem }`.",type:"function",status:"optional"}}},6210:function(e,t,i){var n=i(30600);t.Z=n.Z},64223:function(e,t,i){var n=i(91859);t.Z=n.Z},41676:function(e,t,i){var n=i(35610);t.Z=n.Z}}]);
//# sourceMappingURL=component---src-docs-uilib-components-upload-events-mdx-b99262ee7b004f9fb4bd.js.map