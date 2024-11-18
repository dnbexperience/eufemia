"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[18993],{7331:function(e,t,n){n.r(t),n.d(t,{default:function(){return c}});var o=n(52322),a=n(45392),r=n(85179),i=n(18739);const s={required:i.x.required,disabled:i.x.disabled,layout:i.x.layout,layoutOptions:i.x.layoutOptions,width:i.x.width,locale:{doc:"Locale (language) to use for all nested Eufemia components.",type:"string",status:"optional"}};function l(e){const t=Object.assign({h2:"h2"},(0,a.ah)(),e.components);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:"Properties"}),"\n",(0,o.jsx)(r.ZP,{props:s})]})}var c=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,a.ah)(),e.components);return t?(0,o.jsx)(t,Object.assign({},e,{children:(0,o.jsx)(l,e)})):l(e)}},85179:function(e,t,n){n.d(t,{Kw:function(){return g},ZP:function(){return v}});var o=n(70894),a=n(61185),r=n(55560),i=n(41676),s=n(6210),l=n(64223),c=n(37339),u=n(595),d=n(52322);const h={...u.L,p:e=>(0,d.jsx)("span",{...e})},p=(0,o.Z)(r.ZP,{target:"e13h2c840"})({name:"1qdk5x4",styles:"td{white-space:nowrap;}"}),f="var(--color-fire-red)",g=e=>{let{variant:t,strikethrough:n,children:o,style:a={},...r}=e;if(n&&(a.textDecoration="line-through"),"string"==typeof o)switch(t){case"prop":break;case"type":a.color=o.startsWith("'")?f:"var(--color-violet)";case"value":a.color=o.startsWith("'")?f:"undefined"===o||"null"===o?"var(--color-black-55)":"var(--color-success-green)";default:a.background="none",a.boxShadow="none"}return h.code({children:o,style:a,...r})};function v(e){let{props:t,valueType:n="string",camelCase:o,omit:u,showDefaultValue:f=!1}=e;const v=Object.keys(t||{}),m=Object.entries(t||{}).map((e=>{let[t,r]=e;if(!r)return null;const{type:l,defaultValue:p,doc:m,status:w}=r;return u&&u.includes(t)?null:(0,d.jsxs)(i.Z,{children:[(0,d.jsx)(s.Z,{children:(0,d.jsx)(g,{variant:"prop",strikethrough:"deprecated"===w,children:b(o?(0,c.zW)(t):t)})}),(0,d.jsx)(s.Z,{children:(Array.isArray(l)?l:[l]).map((e=>{if("string"==typeof e){if(String(e).includes("{valueType}")){if(Array.isArray(n))return n.map(((e,t)=>(0,d.jsx)(g,{variant:"type",children:e},e+t))).reduce(((e,t)=>(0,d.jsxs)(d.Fragment,{children:[e," ",(0,d.jsx)("br",{})," ",t]})));e=n}return(0,d.jsx)(g,{variant:"type",children:e},e)}})).reduce(((e,t)=>(0,d.jsxs)(d.Fragment,{children:[e," ",(0,d.jsx)("br",{})," ",t]})))}),f&&(0,d.jsx)(s.Z,{children:p?(0,d.jsx)(g,{variant:"value",children:p}):"required"===w&&"REQUIRED"}),(0,d.jsxs)(s.Z,{children:[(!f||"deprecated"===w)&&(0,d.jsxs)("em",{children:["(",w,") "]}),(0,d.jsx)(a.D,{components:h,children:o?y(m,v):m})]})]},t)}));return(0,d.jsx)(r.ZP.ScrollView,{children:(0,d.jsxs)(p,{children:[(0,d.jsx)("thead",{children:(0,d.jsxs)(i.Z,{children:[(0,d.jsx)(l.Z,{children:"Property"}),(0,d.jsx)(l.Z,{children:"Type"}),f&&(0,d.jsx)(l.Z,{children:"Default value"}),(0,d.jsx)(l.Z,{children:"Description"})]})}),(0,d.jsx)("tbody",{children:m})]})})}function y(e,t){return t.forEach((t=>{e=e.replace(new RegExp(t,"g"),(0,c.zW)(t))})),e}function b(e){return e.includes("/")?(0,d.jsx)(a.D,{components:h,children:e}):e}},6210:function(e,t,n){var o=n(30600);t.Z=o.Z},64223:function(e,t,n){var o=n(91859);t.Z=o.Z},41676:function(e,t,n){var o=n(35610);t.Z=o.Z},18739:function(e,t,n){n.d(t,{X:function(){return a},x:function(){return o}});const o={value:{doc:"Source data value for the field. Will take precedence over the path value given in the data context.",type:"{valueType}",status:"optional"},defaultValue:{doc:"Default source data value for the field. Will not take precedence over the path value given in the data context.",type:"{valueType}",status:"optional"},path:{doc:"JSON Pointer for where the data for the field is located in the source dataset (when using Form.Handler or DataContext). The `path` will also be set as the `name` attribute for the [string](/uilib/extensions/forms/base-fields/String/)-field.",type:"string",status:"optional"},info:{doc:"Info message shown below / after the field.",type:["React.Node","Array<React.Node>"],status:"optional"},warning:{doc:"Warning message shown below / after the field.",type:["React.Node","Array<React.Node>"],status:"optional"},error:{doc:"Error message shown below / after the field.",type:["Error","FormError","Array<Error | FormError>"],status:"optional"},disabled:{doc:"Set `true` to show the field but without the possibility of changing the value.",type:"boolean",status:"optional"},emptyValue:{doc:"The value to use (in `onChange` events etc) when emptying the field. Makes it possible for instance to provide `undefined` instead of an empty string when clearing the content of a text input.",type:["{valueType}","undefined"],status:"optional"},required:{doc:'When set to `true`, the field will give an error if the value fails the required validation. When set to `false`, the field will not be required, but will add a "(optional)" suffix to the label.',type:"boolean",status:"optional"},labelSuffix:{doc:'Will append an additional text to the label, like "(optional)". When using `inheritLabel`, the suffix will not be inherited. NB: The visual appearance of the `labelSuffix` may change in the future.',type:"React.Node",status:"optional"},schema:{doc:"Custom JSON Schema for validating the value.",type:"object",status:"optional"},validateInitially:{doc:"Set to `true` to show validation based errors initially (from given value-prop or source data) before the user interacts with the field.",type:"boolean",status:"optional"},validateUnchanged:{doc:"Set to `true` to show validation based errors when the field is touched (like focusing a field and blurring) without having changed the value. Since the user did not introduce a new error, this will apply when the value was initially invalid based on validation.",type:"boolean",status:"optional"},continuousValidation:{doc:"Set to `true` to show validation based errors continuously while writing, not just when blurring the field.",type:"boolean",status:"optional"},errorMessages:{doc:"Custom error messages for each type of error, overriding default messages.",type:"object",status:"optional"},validator:{doc:"Custom validator function that is triggered on every change done by the user. The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }.",type:"function",status:"optional"},onBlurValidator:{doc:"Custom validator function that is triggered when the user leaves a field (e.g., blurring a text input or closing a dropdown). The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }.",type:"function",status:"optional"},transformIn:{doc:"Transforms the `value` before its displayed in the field (e.g. input).",type:"function",status:"optional"},transformOut:{doc:"Transforms the value before it gets forwarded to the form data object (context) or returned as the `onChange` value parameter. The first parameter is the internal value. Some fields to support a second parameter, like the SelectCountry, where the country object is given.",type:"function",status:"optional"}},a={onChange:{doc:"Will be called on value changes made by the user, with the new value as argument. When an `async` function is used, the corresponding [FieldBlock](/uilib/extensions/forms/create-component/FieldBlock/) will show an indicator on the field label. You can return `{ success: 'saved' } as const` to show a success symbol, or an error or an object with these keys `{ info: 'Info message', warning: 'Warning message', error: Error('My error') } as const`.",type:"(value) => void",status:"optional"},onFocus:{doc:"Will be called when the component gets into focus. Like clicking inside a text input or opening a dropdown. Called with active value as argument.",type:"(value) => void",status:"optional"},onBlur:{doc:"Will be called when the component stop being in focus. Like when going to next field, or closing a dropdown. Called with active value as argument.",type:"(value) => void",status:"optional"}}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-feature-fields-provider-properties-mdx-e477f559e82747470d1f.js.map