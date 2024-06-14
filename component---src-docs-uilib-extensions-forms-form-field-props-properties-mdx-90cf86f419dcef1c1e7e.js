"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[61393],{10938:function(e,t,n){n.r(t),n.d(t,{default:function(){return c}});var o=n(52322),a=n(45392),r=n(85179),s=n(5484);const i={required:s.c.required,disabled:s.c.disabled,locale:{doc:"Locale (language) to use for all nested Eufemia components.",type:"string",status:"optional"}};function l(e){const t=Object.assign({h2:"h2"},(0,a.ah)(),e.components);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:"Properties"}),"\n",(0,o.jsx)(r.ZP,{props:i})]})}var c=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,a.ah)(),e.components);return t?(0,o.jsx)(t,Object.assign({},e,{children:(0,o.jsx)(l,e)})):l(e)}},85179:function(e,t,n){n.d(t,{Kw:function(){return g},ZP:function(){return v}});var o=n(70894),a=n(61185),r=n(55560),s=n(41676),i=n(6210),l=n(64223),c=n(37339),u=n(595),d=n(52322);const h={...u.L,p:e=>(0,d.jsx)("span",{...e})},p=(0,o.Z)(r.ZP,{target:"e13h2c840"})({name:"1qdk5x4",styles:"td{white-space:nowrap;}"}),f="var(--color-fire-red)",g=e=>{let{variant:t,strikethrough:n,children:o,style:a={},...r}=e;if(n&&(a.textDecoration="line-through"),"string"==typeof o)switch(t){case"prop":break;case"type":a.color=o.startsWith("'")?f:"var(--color-violet)";case"value":a.color=o.startsWith("'")?f:"undefined"===o||"null"===o?"var(--color-black-55)":"var(--color-success-green)";default:a.background="none",a.boxShadow="none"}return h.code({children:o,style:a,...r})};function v(e){let{props:t,valueType:n="string",camelCase:o,omit:u,showDefaultValue:f=!1}=e;const v=Object.keys(t),w=Object.entries(t).map((e=>{let[t,r]=e;if(!r)return null;const{type:l,defaultValue:p,doc:w,status:m}=r;return u&&u.includes(t)?null:(0,d.jsxs)(s.Z,{children:[(0,d.jsx)(i.Z,{children:(0,d.jsx)(g,{variant:"prop",strikethrough:"deprecated"===m,children:b(o?(0,c.zW)(t):t)})}),(0,d.jsx)(i.Z,{children:(Array.isArray(l)?l:[l]).map((e=>{if("string"==typeof e){if(String(e).includes("{valueType}")){if(Array.isArray(n))return n.map(((e,t)=>(0,d.jsx)(g,{variant:"type",children:e},e+t))).reduce(((e,t)=>(0,d.jsxs)(d.Fragment,{children:[e," ",(0,d.jsx)("br",{})," ",t]})));e=n}return(0,d.jsx)(g,{variant:"type",children:e},e)}})).reduce(((e,t)=>(0,d.jsxs)(d.Fragment,{children:[e," ",(0,d.jsx)("br",{})," ",t]})))}),f&&(0,d.jsx)(i.Z,{children:p?(0,d.jsx)(g,{variant:"value",children:p}):"required"===m&&"REQUIRED"}),(0,d.jsxs)(i.Z,{children:[(!f||"deprecated"===m)&&(0,d.jsxs)("em",{children:["(",m,") "]}),(0,d.jsx)(a.D,{components:h,children:o?y(w,v):w})]})]},t)}));return(0,d.jsx)(r.ZP.ScrollView,{children:(0,d.jsxs)(p,{children:[(0,d.jsx)("thead",{children:(0,d.jsxs)(s.Z,{children:[(0,d.jsx)(l.Z,{children:"Property"}),(0,d.jsx)(l.Z,{children:"Type"}),f&&(0,d.jsx)(l.Z,{children:"Default value"}),(0,d.jsx)(l.Z,{children:"Description"})]})}),(0,d.jsx)("tbody",{children:w})]})})}function y(e,t){return t.forEach((t=>{e=e.replace(new RegExp(t,"g"),(0,c.zW)(t))})),e}function b(e){return e.includes("/")?(0,d.jsx)(a.D,{components:h,children:e}):e}},6210:function(e,t,n){var o=n(30600);t.Z=o.Z},64223:function(e,t,n){var o=n(91859);t.Z=o.Z},41676:function(e,t,n){var o=n(37381);t.Z=o.Z},5484:function(e,t,n){n.d(t,{F:function(){return a},c:function(){return o}});const o={value:{doc:"Source data value for the field Will take precedence over the path value given in the data context..",type:"{valueType}",status:"optional"},defaultValue:{doc:"Default source data value for the field. Will not take precedence over the path value given in the data context.",type:"{valueType}",status:"optional"},path:{doc:"JSON Pointer for where the data for the field is located in the source dataset (when using Form.Handler or DataContext). The `path` will also be set as the `name` attribute for the [string](/uilib/extensions/forms/base-fields/String/)-field.",type:"string",status:"optional"},info:{doc:"Info message shown below / after the field.",type:"React.Node",status:"optional"},warning:{doc:"Warning message shown below / after the field.",type:"React.Node",status:"optional"},error:{doc:"Error message shown below / after the field.",type:"Error",status:"optional"},disabled:{doc:"Set `true` to show the field but without the possibility of changing the value.",type:"boolean",status:"optional"},emptyValue:{doc:"The value to use (in `onChange` events etc) when emptying the field. Makes it possible for instance to provide `undefined` instead of an empty string when clearing the content of a text input.",type:"any",status:"optional"},required:{doc:"When set `true`, the field will give an error if the value cannot be empty.",type:"boolean",status:"optional"},schema:{doc:"Custom JSON Schema for validating the value.",type:"object",status:"optional"},validateInitially:{doc:"Set `true` to show validation based errors initially (from given value-prop or source data) before the user interacts with the field.",type:"boolean",status:"optional"},validateUnchanged:{doc:"Set `true` to show validation based errors when the field is touched (like focusing a field and blurring) without having changed the value. Since the user did not introduce a new error, this will apply when the value was initially invalid based on validation.",type:"boolean",status:"optional"},continuousValidation:{doc:"Set `true` to show validation based errors continuously while writing, not just when blurring the field.",type:"boolean",status:"optional"},errorMessages:{doc:"Custom error messages for each type of error, overriding default messages.",type:"object",status:"optional"},validator:{doc:"Custom validator function that will be called for every change done by the user. Can be asynchronous or synchronous.",type:"function",status:"optional"},onBlurValidator:{doc:"Custom validator function that will be called when the user leaves the field (blurring a text input, closing a dropdown etc). Can be asynchronous or synchronous.",type:"function",status:"optional"},transformIn:{doc:"transforms the `value` before its displayed in the field (e.g. input).",type:"function",status:"optional"},transformOut:{doc:"transforms the value before it gets forwarded to the form data object or returned as the `onChange` value parameter.",type:"function",status:"optional"}},a={onChange:{doc:"Will be called on value changes made by the user, with the new value as argument. When an `async` function is used, the corresponding [FieldBlock](/uilib/extensions/forms/create-component/FieldBlock/) will show an indicator on the field label. You can return `{ success: 'saved' } as const` to show a success symbol, or an error or an object with these keys `{ info: 'Info message', warning: 'Warning message', error: Error('My error') } as const`.",type:"function",status:"optional"},onFocus:{doc:"Will be called when the component gets into focus. Like clicking inside a text input or opening a dropdown. Called with active value as argument.",type:"function",status:"optional"},onBlur:{doc:"Will be called when the component stop being in focus. Like when going to next field, or closing a dropdown. Called with active value as argument.",type:"function",status:"optional"}}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-form-field-props-properties-mdx-90cf86f419dcef1c1e7e.js.map