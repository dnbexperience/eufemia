"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[75696],{4930:function(t,e,n){n.r(e);var a=n(52322),o=n(45392),i=n(85179),s=n(99736);function r(t){const e=Object.assign({h2:"h2"},(0,o.ah)(),t.components);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(e.h2,{children:"Events"}),"\n",(0,a.jsx)(i.ZP,{props:s.z})]})}e.default=function(t){void 0===t&&(t={});const{wrapper:e}=Object.assign({},(0,o.ah)(),t.components);return e?(0,a.jsx)(e,Object.assign({},t,{children:(0,a.jsx)(r,t)})):r(t)}},85179:function(t,e,n){n.d(e,{Kw:function(){return f},ZP:function(){return b}});var a=n(70894),o=n(61185),i=n(55560),s=n(41676),r=n(6210),l=n(64223),u=n(37339),d=n(595),c=n(52322);const p={...d.L,p:t=>(0,c.jsx)("span",{...t})},h=(0,a.Z)(i.ZP,{target:"e13h2c840"})({name:"1qdk5x4",styles:"td{white-space:nowrap;}"}),m="var(--color-fire-red)",f=t=>{let{variant:e,strikethrough:n,children:a,style:o={},...i}=t;if(n&&(o.textDecoration="line-through"),"string"==typeof a)switch(e){case"prop":break;case"type":o.color=a.startsWith("'")?m:"var(--color-violet)";case"value":o.color=a.startsWith("'")?m:"undefined"===a||"null"===a?"var(--color-black-55)":"var(--color-success-green)";default:o.background="none",o.boxShadow="none"}return p.code({children:a,style:o,...i})};function b(t){let{props:e,valueType:n="string",camelCase:a,omit:d,showDefaultValue:m=!1}=t;const b=Object.keys(e||{}),v=Object.entries(e||{}).map((t=>{let[e,i]=t;if(!i)return null;const{type:l,defaultValue:h,doc:v,status:j}=i;return d&&d.includes(e)?null:(0,c.jsxs)(s.Z,{children:[(0,c.jsx)(r.Z,{children:(0,c.jsx)(f,{variant:"prop",strikethrough:"deprecated"===j,children:g(a?(0,u.zW)(e):e)})}),(0,c.jsx)(r.Z,{children:(Array.isArray(l)?l:[l]).map((t=>{if("string"==typeof t){if(String(t).includes("{valueType}")){if(Array.isArray(n))return n.map(((t,e)=>(0,c.jsx)(f,{variant:"type",children:t},t+e))).reduce(((t,e)=>(0,c.jsxs)(c.Fragment,{children:[t," ",(0,c.jsx)("br",{})," ",e]})));t=n}return(0,c.jsx)(f,{variant:"type",children:t},t)}})).reduce(((t,e)=>(0,c.jsxs)(c.Fragment,{children:[t," ",(0,c.jsx)("br",{})," ",e]})))}),m&&(0,c.jsx)(r.Z,{children:h?(0,c.jsx)(f,{variant:"value",children:h}):"required"===j&&"REQUIRED"}),(0,c.jsxs)(r.Z,{children:[(!m||"deprecated"===j)&&(0,c.jsxs)("em",{children:["(",j,") "]}),(0,c.jsx)(o.D,{components:p,children:a?y(v,b):v})]})]},e)}));return(0,c.jsx)(i.ZP.ScrollView,{children:(0,c.jsxs)(h,{children:[(0,c.jsx)("thead",{children:(0,c.jsxs)(s.Z,{children:[(0,c.jsx)(l.Z,{children:"Property"}),(0,c.jsx)(l.Z,{children:"Type"}),m&&(0,c.jsx)(l.Z,{children:"Default value"}),(0,c.jsx)(l.Z,{children:"Description"})]})}),(0,c.jsx)("tbody",{children:v})]})})}function y(t,e){return e.forEach((e=>{t=t.replace(new RegExp(e,"g"),(0,u.zW)(e))})),t}function g(t){return t.includes("/")?(0,c.jsx)(o.D,{components:p,children:t}):t}},6210:function(t,e,n){var a=n(30600);e.Z=a.Z},64223:function(t,e,n){var a=n(91859);e.Z=a.Z},41676:function(t,e,n){var a=n(35610);e.Z=a.Z},68289:function(t,e,n){n.d(e,{I:function(){return a},j:function(){return o}});const a={defaultData:{doc:"Default source data, only used if no other source is available, and not leading to updates if changed after mount.",type:"object",status:"optional"},data:{doc:"Dynamic source data used as both initial data, and updates internal data if changed after mount.",type:"object",status:"optional"},id:{doc:"Unique id for connecting Form.Handler and helper tools such as Form.useData.",type:"string",status:"optional"},schema:{doc:"JSON Schema for validation of the data set.",type:"object",status:"optional"},errorMessages:{doc:"Object containing error messages by either type of JSON Pointer path and type.",type:"object",status:"optional"},minimumAsyncBehaviorTime:{doc:"Minimum time to display the submit indicator. Default is 1s.",type:"boolean",status:"optional"},asyncSubmitTimeout:{doc:"The maximum time to display the submit indicator before it changes back to normal. In case something went wrong during submission. Default is 30s.",type:"boolean",status:"optional"},scrollTopOnSubmit:{doc:"True for the UI to scroll to the top of the page when data is submitted.",type:"boolean",status:"optional"},sessionStorageId:{doc:"Key for saving active data to session storage and loading it on mount.",type:"string",status:"optional"},ajvInstance:{doc:"Provide your own custom Ajv instance. More info in the [Schema validation](/uilib/extensions/forms/Form/schema-validation/#custom-ajv-instance-and-keywords) section.",type:"ajv",status:"optional"},transformIn:{doc:"Mutate the data context (internally as well) based on your criteria: `({ path, value, data, props, internal }) => 'new value'`. It will iterate on each data entry (/path).",type:"function",status:"optional"},transformOut:{doc:"Mutate the data before it enters onSubmit or onChange based on your criteria: `({ path, value, data, props, internal }) => 'new value'`. It will iterate on each data entry (/path).",type:"function",status:"optional"},filterSubmitData:{doc:"Filter the `onSubmit` output data, based on your criteria: `({ path, value, data, props, internal }) => !props?.disabled`. It will iterate on each data entry (/path). Return false to exclude the entry.",type:"function",status:"optional"},globalStatusId:{doc:"If needed, you can define a custom [GlobalStatus](/uilib/components/global-status) id. Defaults to `main`.",type:"string",status:"optional"},required:{doc:"Make all fields required.",type:"boolean",status:"optional"},disabled:{doc:"Disable all fields.",type:"boolean",status:"optional"},locale:{doc:"Locale (language) to use for all nested Eufemia components.",type:"string",status:"optional"},children:{doc:"Contents.",type:"React.Node",status:"required"}},o={onChange:{doc:"Will be called when a value of a field was changed by the user, with the data set (including the changed value) as argument. When an async function is provided, it will show an indicator on the current label during a field change. Related props: `minimumAsyncBehaviorTime` and `asyncSubmitTimeout`. You can return an error or an object with these keys `{ info: 'Info message', warning: 'Warning message', error: Error('My error') } as const` in addition to { success: 'saved' } indicate the field was saved. Will emit unvalidated by default and validated when an async function is provided (like `onSubmit`).",type:"function",status:"optional"},onPathChange:{doc:"Will be called when a value of a field was changed by the user, with the `path` (JSON Pointer) and new `value` as arguments. Can be an async function. Will emit unvalidated by default and validated when `onChange` is an async function.",type:"function",status:"optional"},onSubmit:{doc:"Will be called (on validation success) when the user submit the form (i.e by clicking a [SubmitButton](/uilib/extensions/forms/Form/SubmitButton) component inside), with the data set as argument. When an async function is provided, it will show an indicator on the submit button during the form submission. All form elements will be disabled during the submit. The indicator will be shown for minimum 1 second. Related props: `minimumAsyncBehaviorTime` and `asyncSubmitTimeout`. You can return an error or an object with these keys `{ status: 'pending', info: 'Info message', warning: 'Warning message', error: Error('My error') } as const` to be shown in a [FormStatus](/uilib/components/form-status). Will only emit when every validation has passed.",type:"function",status:"optional"},onSubmitRequest:{doc:"Will be called when the user tries to submit, but errors stop the data from being submitted.",type:"function",status:"optional"},onSubmitComplete:{doc:"Will be called after onSubmit has finished and had not errors. It supports the same return values as `onSubmit` and will be merged together.",type:"function",status:"optional"},onClear:{doc:"Will be called when the form is cleared via `Form.clearData` or via the `onSubmit` event (or `onCommit`) argument `{ clearData }`.",type:"function",status:"optional"}}},99736:function(t,e,n){n.d(e,{I:function(){return o},z:function(){return i}});var a=n(68289);const o={...a.I,disabled:{doc:"Will disable all nested form fields.",type:"boolean",status:"optional"},required:{doc:"Will make all nested form fields required.",type:"boolean",status:"optional"},autoComplete:{doc:'Will set `autoComplete="on"` on all nested [Field.String](/uilib/extensions/forms/base-fields/String/)-fields.',type:"boolean",status:"optional"},"[Space](/uilib/layout/space/properties)":{doc:"Spacing properties like `top` or `bottom` are supported.",type:["string","object"],status:"optional"},"[DataContext.Provider](/uilib/extensions/forms/DataContext/Provider/properties)":{doc:"Provider properties such as `data`.",type:"Various",status:"optional"},"[Form Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attributes)":{doc:"All supported form element attributes.",type:"string",status:"optional"}},i={...a.j,"[DataContext.Provider](/uilib/extensions/forms/DataContext/Provider/events)":{doc:"events such as `onSubmit`.",type:"function",status:"optional"}}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-form-handler-events-mdx-0f0e6b05af7c92eba5e5.js.map