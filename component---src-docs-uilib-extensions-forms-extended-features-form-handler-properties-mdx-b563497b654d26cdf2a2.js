"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[92731],{45333:function(e,t,n){n.r(t);var o=n(52322),a=n(45392),s=n(85179),i=n(99736);function r(e){const t=Object.assign({h2:"h2"},(0,a.ah)(),e.components);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:"Properties"}),"\n",(0,o.jsx)(s.Z,{props:i.I})]})}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,a.ah)(),e.components);return t?(0,o.jsx)(t,Object.assign({},e,{children:(0,o.jsx)(r,e)})):r(e)}},85179:function(e,t,n){n.d(t,{Z:function(){return b}});var o=n(70894),a=n(61185),s=n(55560),i=n(41676),r=n(6210),d=n(30730),l=n(64223),c=n(37339),u=n(1864),h=n(88504),p=n(52322);const m={...u.L,p:e=>(0,p.jsx)("span",{...e})},f=(0,o.Z)(s.ZP,{target:"e13h2c840"})({name:"1qdk5x4",styles:"td{white-space:nowrap;}"});function b(e){let{props:t,valueType:n="string",camelCase:o,omit:u}=e;const b=Object.keys(t),v=Object.entries(t).map((e=>{let[t,{type:s,doc:l,status:f}]=e;return u&&u.includes(t)?null:("string"==typeof s&&String(s).includes("{valueType}")&&(s=n),(0,p.jsxs)(i.Z,{children:[(0,p.jsx)(r.Z,{children:(0,p.jsx)(h.Z,{children:(0,p.jsx)(d.Z,{children:g(o?(0,c.zW)(t):t)})})}),(0,p.jsx)(r.Z,{children:Array.isArray(s)?s.map((e=>(0,p.jsx)(h.Z,{children:(0,p.jsx)(d.Z,{children:e})},e))).reduce(((e,t)=>(0,p.jsxs)(p.Fragment,{children:[e," or ",t]}))):(0,p.jsx)(h.Z,{children:(0,p.jsx)(d.Z,{children:s})})}),(0,p.jsxs)(r.Z,{children:[(0,p.jsxs)("em",{children:["(",f,")"]})," ",(0,p.jsx)(a.D,{components:m,children:o?y(l,b):l})]})]},t))}));return(0,p.jsx)(s.ZP.ScrollView,{children:(0,p.jsxs)(f,{children:[(0,p.jsx)("thead",{children:(0,p.jsxs)(i.Z,{children:[(0,p.jsx)(l.Z,{children:"Property"}),(0,p.jsx)(l.Z,{children:"Type"}),(0,p.jsx)(l.Z,{children:"Description"})]})}),(0,p.jsx)("tbody",{children:v})]})})}function y(e,t){return t.forEach((t=>{e=e.replace(new RegExp(t,"g"),(0,c.zW)(t))})),e}function g(e){return e.includes("/")?(0,p.jsx)(a.D,{components:m,children:e}):e}},64223:function(e,t,n){var o=n(91859);t.Z=o.Z},41676:function(e,t,n){var o=n(47048);t.Z=o.Z},68289:function(e,t,n){n.d(t,{I:function(){return o},j:function(){return a}});const o={defaultData:{doc:"Default source data, only used if no other source is available, and not leading to updates if changed after mount.",type:"object",status:"required"},data:{doc:"Dynamic source data used as both initial data, and updates internal data if changed after mount.",type:"object",status:"required"},schema:{doc:"JSON Schema for validation of the data set.",type:"object",status:"optional"},errorMessages:{doc:"Object containing error messages by either type of JSON Pointer path and type.",type:"object",status:"optional"},minimumAsyncBehaviorTime:{doc:"Minimum time to display the submit indicator. Default is 1s.",type:"boolean",status:"optional"},asyncBehaviorTimeout:{doc:"The maximum time to display the submit indicator before it changes back to normal. In case something went wrong during submission. Default is 30s.",type:"boolean",status:"optional"},scrollTopOnSubmit:{doc:"True for the UI to scroll to the top of the page when data is submitted.",type:"boolean",status:"optional"},sessionStorageId:{doc:"Key for saving active data to session storage and loading it on mount.",type:"string",status:"optional"},ajvInstance:{doc:'Provide your own custom Ajv instance. More info in the <a href="/uilib/extensions/forms/extended-features/Form/schema-validation/#custom-ajv-instance-and-keywords">Schema validation</a> section.',type:"ajv",status:"optional"},filterData:{doc:"Filter the internal data context based on your criteria: `(path, value, props) => !props?.disabled`. It will iterate on each data entry.",type:"function",status:"optional"},children:{doc:"Contents.",type:"React.Node",status:"required"}},a={onChange:{doc:"Will be called when a value of a field was changed by the user, with the data set (including the changed value) as argument. When an async function is provided, it will show an indicator on the current label during a field change. Related props: `minimumAsyncBehaviorTime` and `asyncBehaviorTimeout`. You can return an error or an object with these keys `{ info: 'Info message', warning: 'Warning message', error: Error('My error') } as const` in addition to { success: 'saved' } indicate the field was saved. Will emit unvalidated by default and validated when an async function is provided.",type:"function",status:"optional"},onPathChange:{doc:"Will be called when a value of a field was changed by the user, with the `path` (JSON Pointer) and new `value` as arguments. Can be an async function. Will emit unvalidated by default and validated when `onChange` is an async function.",type:"function",status:"optional"},onSubmit:{doc:"Will be called (on validation success) when the user submit the form (i.e by clicking a [SubmitButton](/uilib/extensions/forms/extended-features/Form/SubmitButton) component inside), with the data set as argument. When an async function is provided, it will show an indicator on the submit button during the form submission. All form elements will be disabled during the submit. The indicator will be shown for minimum 1 second. Related props: `minimumAsyncBehaviorTime` and `asyncBehaviorTimeout`. You can return an error or an object with these keys `{ status: 'pending', info: 'Info message', warning: 'Warning message', error: Error('My error') } as const` to be shown in a [FormStatus](/uilib/components/form-status). Will only emit when every validation has passed.",type:"function",status:"optional"},onSubmitRequest:{doc:"Will be called when the user tries to submit, but errors stop the data from being submitted.",type:"function",status:"optional"},onSubmitComplete:{doc:"Will be called after onSubmit has finished and had not errors. It supports the same return values as `onSubmit` and will be merged together.",type:"function",status:"optional"}}},99736:function(e,t,n){n.d(t,{I:function(){return a},z:function(){return s}});var o=n(68289);const a={...o.I,disabled:{doc:"Will disable all nested form fields.",type:"boolean",status:"optional"},autoComplete:{doc:'Will set `autoComplete="on"` on all nested [Field.String](/uilib/extensions/forms/base-fields/String/)-fields.',type:"boolean",status:"optional"},"[Space](/uilib/layout/space/properties)":{doc:"Spacing properties like `top` or `bottom` are supported.",type:["string","object"],status:"optional"},"[DataContext.Provider](/uilib/extensions/forms/extended-features/DataContext/Provider/properties)":{doc:"Provider properties such as `data`.",type:"Various",status:"optional"},"[Form Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attributes)":{doc:"All supported form element attributes.",type:"string",status:"optional"}},s={...o.j,"[DataContext.Provider](/uilib/extensions/forms/extended-features/DataContext/Provider/events)":{doc:"events such as `onSubmit`.",type:"function",status:"optional"}}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-extended-features-form-handler-properties-mdx-b563497b654d26cdf2a2.js.map