"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[92584],{20711:function(e,t,n){n.r(t);var i=n(52322),a=n(45392),o=n(68230),s=n(85179),l=n(67492);function r(e){const t=Object.assign({h2:"h2"},(0,a.ah)(),e.components);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:"Properties"}),"\n",(0,i.jsx)(s.ZP,{props:l.I}),"\n",(0,i.jsx)(t.h2,{children:"Translations"}),"\n",(0,i.jsx)(o.Z,{localeKey:["SectionEditContainer","SectionViewContainer"]})]})}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,a.ah)(),e.components);return t?(0,i.jsx)(t,Object.assign({},e,{children:(0,i.jsx)(r,e)})):r(e)}},68230:function(e,t,n){n.d(t,{Z:function(){return y}});var i=n(70894),a=n(55560),o=n(41676),s=n(6210),l=n(88268),r=n(36946),c=n(64223),d=n(37339),h=n(80945),u=n(88065),f=n(45270),p=n(85179),b=n(52322);const j=(0,i.Z)(a.ZP,{target:"ejvypor0"})({name:"1qdk5x4",styles:"td{white-space:nowrap;}"});function y(e){let{localeKey:t,source:n=null}=e;n||(n=(0,d.rM)({},u.Z,f.Z));const i={},y={},g=(Array.isArray(t)?t:[t]).map((e=>{if(e.includes(".")){const t=e.split(".")[0];return y[t]=y[t]||[],y[t].push(e),t}return e})),x=(e,t,n,a)=>{e=`${a}.${e}`,y[a]&&!y[a].includes(e)||(i[e]=Object.assign(i[e]||{},{[n]:t}))};Object.entries(n).forEach((e=>{let[t,n]=e;g.forEach((e=>{const i=n[e];i?Object.entries(i).forEach((n=>{let[i,a]=n;if("object"==typeof a){const n=`${e}.${i}`;Object.entries(a).forEach((e=>{let[i,a]=e;x(i,a,t,n)}))}else x(i,a,t,e)})):(0,h.ZK)(`TranslationsTable: Could not find any translations for key: "${e}", perhaps you misspelled the key's name?`)}))}));const m=Object.keys(n),Z=Object.entries(i).map((e=>{let[t,n]=e;return(0,b.jsxs)(o.Z,{children:[(0,b.jsx)(s.Z,{children:(0,b.jsx)(p.Kw,{variant:"prop",children:t})}),Object.entries(n).map(((e,t)=>{let[n,i]=e;return(0,b.jsx)(s.Z,{children:"string"==typeof i?i:(0,b.jsx)("pre",{children:JSON.stringify(i,null,2)})},t+n)}))]},t)}));if(0!=Z.length)return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(l.Z,{children:["More info about translations can be found in the"," ",(0,b.jsx)(r.ZP,{href:"/uilib/usage/customisation/localization/",children:"general localization"})," ","and"," ",(0,b.jsx)(r.ZP,{href:"/uilib/extensions/forms/getting-started/#localization-and-translation",children:"Eufemia Forms localization"})," ","docs."]}),(0,b.jsx)(a.ZP.ScrollView,{children:(0,b.jsxs)(j,{children:[(0,b.jsx)("thead",{children:(0,b.jsxs)(o.Z,{children:[(0,b.jsx)(c.Z,{children:"Key"}),m.map((e=>(0,b.jsx)(c.Z,{children:e},e)))]})}),(0,b.jsx)("tbody",{children:Z})]})})]});(0,h.ZK)(`TranslationsTable: Not able to find any translations for input : "${t}", hence not rendering the translations table.`)}},6210:function(e,t,n){var i=n(30600);t.Z=i.Z},64223:function(e,t,n){var i=n(91859);t.Z=i.Z},41676:function(e,t,n){var i=n(35610);t.Z=i.Z},67492:function(e,t,n){n.d(t,{I:function(){return i},e:function(){return a}});const i={path:{doc:"A path to the section (JSON Pointer). When defined, fields inside the section will get this path as a prefix of their own path.",type:"string",status:"optional"},overwriteProps:{doc:"Overwrite field props for the section.",type:"object",status:"optional"},translation:{doc:"Provide a translation for the section (e.g. `{'nb-NO': { MySection: { MyField: { label: 'Custom' }}}}`).",type:"object",status:"optional"},required:{doc:"Makes all fields inside it required.",type:"boolean",status:"optional"},validateInitially:{doc:'If set to `true`, the whole section will be validated initially. All fields will then automatically get `validateInitially` and show their error messages. Can be useful in combination with `containerMode="auto"`.',type:"boolean",status:"optional"},defaultData:{doc:"Provide default data to the section fields and values, in case the data context (Form.Handler) is not available.",type:"object",status:"optional"},data:{doc:"Provide data to the section fields and values, in case the data context (Form.Handler) is not available.",type:"object",status:"optional"},containerMode:{doc:'Defines the container mode. Can be `view`, `edit` or `auto`. When set to `auto`, the mode will initially be "edit" if fields contain errors. Defaults to `auto`.',type:"string",status:"optional"},children:{doc:"All the fields and values inside the section.",type:"React.Node",status:"optional"}},a={onChange:{doc:"Will be called when a value of a field was changed by the user, with the data set (including the changed value) as argument.",type:"function",status:"optional"}}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-form-section-properties-mdx-9b68fcf2c5d770975504.js.map