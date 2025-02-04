"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[98638],{85179:function(e,t,a){a.d(t,{Kw:function(){return g},ZP:function(){return v}});var o=a(70894),n=a(61185),r=a(55560),i=a(41676),s=a(6210),l=a(64223),u=a(37339),d=a(595),c=a(52322);const h={...d.L,p:e=>(0,c.jsx)("span",{...e})},p=(0,o.Z)(r.ZP,{target:"e13h2c840"})({name:"1qdk5x4",styles:"td{white-space:nowrap;}"}),f={default:"var(--color-success-green)",primitive:"var(--color-success-green)",string:"var(--color-fire-red)"},y={default:"var(--color-success-green)",undefined:"var(--color-black-55)",string:"var(--color-fire-red)"},g=e=>{let{variant:t,strikethrough:a,children:o,style:n={},...r}=e;if(a&&(n.textDecoration="line-through"),"string"==typeof o)switch(t){case"prop":break;case"type":n.color=m(o)?f.string:["boolean","true","false","number","bigint","string","symbol"].includes(function(e){return e.endsWith("[]")?e.slice(0,-2):e.startsWith("Array<")&&e.endsWith(">")?e.slice(6,-1):e}(o))?f.primitive:f.default,n.background="none",n.boxShadow="none";break;case"value":n.color=m(o)?y.string:"undefined"===o||"null"===o?y.undefined:y.default,n.background="none",n.boxShadow="none"}return h.code({children:o,style:n,...r})};function v(e){let{props:t,valueType:a="string",camelCase:o,omit:d,showDefaultValue:f=!1}=e;const y=Object.keys(t||{}),v=Object.entries(t||{}).map((e=>{let[t,r]=e;if(!r)return null;const{type:l,defaultValue:p,doc:v,status:m}=r;return d&&d.includes(t)?null:(0,c.jsxs)(i.Z,{children:[(0,c.jsx)(s.Z,{children:(0,c.jsx)(g,{variant:"prop",strikethrough:"deprecated"===m,children:b(o?(0,u.zW)(t):t)})}),(0,c.jsx)(s.Z,{children:(Array.isArray(l)?l:[l]).map((e=>{if("string"==typeof e){if(String(e).includes("{valueType}")){if(Array.isArray(a))return a.map(((e,t)=>(0,c.jsx)(g,{variant:"type",children:e},e+t))).reduce(((e,t)=>(0,c.jsxs)(c.Fragment,{children:[e," ",(0,c.jsx)("br",{})," ",t]})));e=a}return(0,c.jsx)(g,{variant:"type",children:e},e)}})).reduce(((e,t)=>(0,c.jsxs)(c.Fragment,{children:[e," ",(0,c.jsx)("br",{})," ",t]})))}),f&&(0,c.jsx)(s.Z,{children:p?(0,c.jsx)(g,{variant:"value",children:p}):"required"===m&&"REQUIRED"}),(0,c.jsxs)(s.Z,{children:[(!f||"deprecated"===m)&&(0,c.jsxs)("em",{children:["(",m,") "]}),(0,c.jsx)(n.D,{components:h,children:o?w(v,y):v})]})]},t)}));return(0,c.jsx)(r.ZP.ScrollView,{children:(0,c.jsxs)(p,{children:[(0,c.jsx)("thead",{children:(0,c.jsxs)(i.Z,{children:[(0,c.jsx)(l.Z,{children:"Property"}),(0,c.jsx)(l.Z,{children:"Type"}),f&&(0,c.jsx)(l.Z,{children:"Default value"}),(0,c.jsx)(l.Z,{children:"Description"})]})}),(0,c.jsx)("tbody",{children:v})]})})}function m(e){return["'",'"',"`"].includes(e.substring(0,1))}function w(e,t){return t.forEach((t=>{e=e.replace(new RegExp(t,"g"),(0,u.zW)(t))})),e}function b(e){return e.includes("[")?(0,c.jsx)(n.D,{components:h,children:e}):e}},6210:function(e,t,a){var o=a(30600);t.Z=o.Z},64223:function(e,t,a){var o=a(91859);t.Z=o.Z},41676:function(e,t,a){var o=a(35610);t.Z=o.Z},1855:function(e,t,a){a.d(t,{e:function(){return r},s:function(){return n}});var o=a(18739);const n={value:{doc:"The data to iterate over. Alternative you can use the `path` prop.",type:"array",status:"optional"},path:{doc:"A path (JSON Pointer) to the array to iterate over.",type:"string",status:"optional"},itemPath:{doc:"A path (JSON Pointer) to nested array items.",type:"string",status:"optional"},required:{doc:"If the array is required. It does not automatically inherit the `required` property in the same way that `Field.*` components do. You may provide a custom error message to give the user a more useful message than the default one: `errorMessages={{ 'Field.errorRequired': 'Custom message' }}`",type:"boolean",status:"optional"},limit:{doc:"Limit the number of rendered items to iterate over. Defaults to `undefined`.",type:"number",status:"optional"},countPath:{doc:"A path (JSON Pointer) to the array length.",type:"string",status:"optional"},countPathTransform:{doc:"Will transform the current value before it is displayed.",type:"function",status:"optional"},countPathLimit:{doc:'Will limit the iterate amount by given "countPathLimit" value.',type:"number",status:"optional"},withoutFlex:{doc:"When `true` it will omit the Flex.Stack wrapper so it can be used for tables and lists.",type:"boolean",status:"optional"},animate:{doc:"When `true` it will animate the height of the items.",type:"boolean",status:"optional"},placeholder:{doc:"Will be shown if the value or data context value is empty.",type:"React.Node",status:"optional"},emptyValue:{doc:"Will be used to compare the value in order to show the placeholder.",type:"unknown",status:"optional"},containerMode:{doc:"Defines the container mode for all nested containers. Can be `view`, `edit` or `auto`. When using `auto`, it will automatically open if there is an error in the container. When a new item is added, the item before it will change to `view` mode, if it had no validation errors. Defaults to `auto`.",type:"string",status:"optional"},onChangeValidator:o.x.onChangeValidator,validateInitially:o.x.validateInitially,validateContinuously:o.x.validateContinuously,children:{doc:"React.Node or a function so you can get the current value as the first function parameter, and the index as the second parameter as well as the array of internal items as the third parameter.",type:["React.ReactNode","function"],status:"optional"},"[Flex.Stack](/uilib/layout/flex/stack/properties)":{doc:"All Flex.Stack properties.",type:"Various",status:"optional"}},r={onChange:{doc:"Will be called when a value of a field was changed by the user, with the data set (including the changed value) as argument.",type:"function",status:"optional"}}},18739:function(e,t,a){a.d(t,{X:function(){return n},x:function(){return o}});const o={value:{doc:"Source data value for the field. Will take precedence over the path value given in the data context.",type:"{valueType}",status:"optional"},defaultValue:{doc:"Default source data value for the field. Will not take precedence over the path value given in the data context.",type:"{valueType}",status:"optional"},path:{doc:"JSON Pointer for where the data for the field is located in the source dataset (when using Form.Handler or DataContext). The `path` will also be set as the `name` attribute for the [string](/uilib/extensions/forms/base-fields/String/)-field.",type:"string",status:"optional"},info:{doc:"Info message shown below / after the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`",type:["React.Node","Array<React.Node>","function"],status:"optional"},warning:{doc:"Warning message shown below / after the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`",type:["React.Node","Array<React.Node>","function"],status:"optional"},error:{doc:"Error message shown below / after the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`",type:["Error","FormError","Array<Error | FormError>","function"],status:"optional"},disabled:{doc:"Set `true` to show the field but without the possibility of changing the value.",type:"boolean",status:"optional"},emptyValue:{doc:"The value to use (in `onChange` events etc) when emptying the field. Makes it possible for instance to provide `undefined` instead of an empty string when clearing the content of a text input.",type:["{valueType}","undefined"],status:"optional"},required:{doc:'When set to `true`, the field will give an error if the value fails the required validation. When set to `false`, the field will not be required, but will add a "(optional)" suffix to the label.',type:"boolean",status:"optional"},labelSuffix:{doc:'Will append an additional text to the label, like "(optional)". When using `inheritLabel`, the suffix will not be inherited. NB: The visual appearance of the `labelSuffix` may change in the future.',type:"React.Node",status:"optional"},schema:{doc:"Custom JSON Schema for validating the value.",type:"object",status:"optional"},validateInitially:{doc:"Set to `true` to show validation based errors initially (from given value-prop or source data) before the user interacts with the field.",type:"boolean",status:"optional"},validateUnchanged:{doc:"Set to `true` to show validation based errors when the field is touched (like focusing a field and blurring) without having changed the value. Since the user did not introduce a new error, this will apply when the value was initially invalid based on validation.",type:"boolean",status:"optional"},validateContinuously:{doc:"Set to `true` to show validation based errors continuously while writing, not just when blurring the field.",type:"boolean",status:"optional"},errorMessages:{doc:"Custom error messages for each type of error, overriding default messages.",type:"object",status:"optional"},onChangeValidator:{doc:"Custom validator function where you can return `undefined`, `Error`, `FormError` or an Array with either several other validators or several `Error` or `FormError`. It is triggered on every change done by the user. The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }.",type:"function",status:"optional"},onBlurValidator:{doc:"Custom validator function where you can return `undefined`, `Error`, `FormError` or an Array with either several other validators or several `Error` or `FormError`. It is triggered when the user leaves a field (e.g., blurring a text input or closing a dropdown). The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }.",type:"function",status:"optional"},transformIn:{doc:"Transforms the `value` before its displayed in the field (e.g. input).",type:"function",status:"optional"},transformOut:{doc:"Transforms the value before it gets forwarded to the form data object (context) or returned as the `onChange` value parameter. The first parameter is the internal value. Some fields to support a second parameter, like the SelectCountry, where the country object is given.",type:"function",status:"optional"}},n={onChange:{doc:"Will be called on value changes made by the user, with the new value as argument. When an `async` function is used, the corresponding [FieldBlock](/uilib/extensions/forms/create-component/FieldBlock/) will show an indicator on the field label. You can return `{ success: 'saved' } as const` to show a success symbol, or an error or an object with these keys `{ info: 'Info message', warning: 'Warning message', error: Error('My error') } as const`.",type:"(value) => void",status:"optional"},onFocus:{doc:"Will be called when the component gets into focus. Like clicking inside a text input or opening a dropdown. Called with active value as argument.",type:"(value) => void",status:"optional"},onBlur:{doc:"Will be called when the component stop being in focus. Like when going to next field, or closing a dropdown. Called with active value as argument.",type:"(value) => void",status:"optional"}}}}]);
//# sourceMappingURL=70d54eaf399d1fa5034b47477bcc579e1cff3a1b-f02823cc9ebc20b97395.js.map