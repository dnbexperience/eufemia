"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[24221],{76875:function(e,t,o){o.r(t);var n=o(52322),a=o(45392),r=o(85179),i=o(9670);function s(e){const t=Object.assign({h2:"h2"},(0,a.ah)(),e.components);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h2,{children:"Events"}),"\n",(0,n.jsx)(r.ZP,{props:i.hK})]})}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,a.ah)(),e.components);return t?(0,n.jsx)(t,Object.assign({},e,{children:(0,n.jsx)(s,e)})):s(e)}},85179:function(e,t,o){o.d(t,{Kw:function(){return g},ZP:function(){return y}});var n=o(70894),a=o(61185),r=o(55560),i=o(41676),s=o(6210),l=o(64223),d=o(37339),u=o(595),c=o(52322);const h={...u.L,p:e=>(0,c.jsx)("span",{...e})},p=(0,n.Z)(r.ZP,{target:"e13h2c840"})({name:"1qdk5x4",styles:"td{white-space:nowrap;}"}),f="var(--color-fire-red)",g=e=>{let{variant:t,strikethrough:o,children:n,style:a={},...r}=e;if(o&&(a.textDecoration="line-through"),"string"==typeof n)switch(t){case"prop":break;case"type":a.color=n.startsWith("'")?f:"var(--color-violet)";case"value":a.color=n.startsWith("'")?f:"undefined"===n||"null"===n?"var(--color-black-55)":"var(--color-success-green)";default:a.background="none",a.boxShadow="none"}return h.code({children:n,style:a,...r})};function y(e){let{props:t,valueType:o="string",camelCase:n,omit:u,showDefaultValue:f=!1}=e;const y=Object.keys(t||{}),v=Object.entries(t||{}).map((e=>{let[t,r]=e;if(!r)return null;const{type:l,defaultValue:p,doc:v,status:w}=r;return u&&u.includes(t)?null:(0,c.jsxs)(i.Z,{children:[(0,c.jsx)(s.Z,{children:(0,c.jsx)(g,{variant:"prop",strikethrough:"deprecated"===w,children:m(n?(0,d.zW)(t):t)})}),(0,c.jsx)(s.Z,{children:(Array.isArray(l)?l:[l]).map((e=>{if("string"==typeof e){if(String(e).includes("{valueType}")){if(Array.isArray(o))return o.map(((e,t)=>(0,c.jsx)(g,{variant:"type",children:e},e+t))).reduce(((e,t)=>(0,c.jsxs)(c.Fragment,{children:[e," ",(0,c.jsx)("br",{})," ",t]})));e=o}return(0,c.jsx)(g,{variant:"type",children:e},e)}})).reduce(((e,t)=>(0,c.jsxs)(c.Fragment,{children:[e," ",(0,c.jsx)("br",{})," ",t]})))}),f&&(0,c.jsx)(s.Z,{children:p?(0,c.jsx)(g,{variant:"value",children:p}):"required"===w&&"REQUIRED"}),(0,c.jsxs)(s.Z,{children:[(!f||"deprecated"===w)&&(0,c.jsxs)("em",{children:["(",w,") "]}),(0,c.jsx)(a.D,{components:h,children:n?b(v,y):v})]})]},t)}));return(0,c.jsx)(r.ZP.ScrollView,{children:(0,c.jsxs)(p,{children:[(0,c.jsx)("thead",{children:(0,c.jsxs)(i.Z,{children:[(0,c.jsx)(l.Z,{children:"Property"}),(0,c.jsx)(l.Z,{children:"Type"}),f&&(0,c.jsx)(l.Z,{children:"Default value"}),(0,c.jsx)(l.Z,{children:"Description"})]})}),(0,c.jsx)("tbody",{children:v})]})})}function b(e,t){return t.forEach((t=>{e=e.replace(new RegExp(t,"g"),(0,d.zW)(t))})),e}function m(e){return e.includes("/")?(0,c.jsx)(a.D,{components:h,children:e}):e}},6210:function(e,t,o){var n=o(30600);t.Z=n.Z},64223:function(e,t,o){var n=o(91859);t.Z=n.Z},41676:function(e,t,o){var n=o(35610);t.Z=n.Z},9670:function(e,t,o){o.d(t,{EU:function(){return s},hK:function(){return i},sP:function(){return r}});var n=o(84187),a=o(18739);const r={...a.x,...n.W},i={...a.X},s=function(e,t){void 0===e&&(e=void 0),void 0===t&&(t=void 0);const o=`(${e?`value${e.optional?"?":""}: ${e.type}`:"value"}${t?`, additionalArgs${t.optional?"?":""}: ${t.type}`:""}) => void`;return{...i,onChange:{...i.onChange,type:o},onFocus:{...i.onFocus,type:o},onBlur:{...i.onBlur,type:o}}}},84187:function(e,t,o){o.d(t,{P:function(){return a},W:function(){return n}});const n={label:{doc:"Field label to show above / before the input feature.",type:"string",status:"optional"},labelDescription:{doc:'A more discreet text displayed beside the label (i.e for "(optional)").',type:"string",status:"optional"},labelSrOnly:{doc:"Use `true` to make the label only readable by screen readers.",type:"boolean",status:"optional"},help:{doc:"Provide help content for the field using `title` and `content` as a string or React.Node. Additionally, you can set `open` to `true` to display the inline help, set the `breakout` property to `false` to disable the breakout of the inline help content, or use `renderAs` set to `dialog` to render the content in a [Dialog](/uilib/components/dialog/) (recommended for larger amounts of content).",type:"object",status:"optional"},layout:{doc:"Layout for the label and input. Can be `horizontal` or `vertical`.",type:"string",status:"optional"},layoutOptions:{doc:'Use this to set additional options for the `horizontal` layout. E.g. `{ width: "medium" }`. You can also use a custom width `{number}rem`. Instead of a width, you can use a min/max width. E.g. `{ minWidth: "6rem", maxWidth: "12rem" }`.',type:"object",status:"optional"},width:{doc:"Will set the width for the whole block. Use `small`, `medium`, `large` for predefined standard widths. You can also set a custom width `{number}rem` or use `stretch` or `false`.",type:["string","false"],status:"optional"},contentWidth:{doc:"Will set the width for its contents. Use `small`, `medium`, `large` for predefined standard widths. You can also set a custom width `{number}rem` or use `stretch` or `false`.",type:["string","false"],status:"optional"},"[Space](/uilib/layout/space/properties)":{doc:"Spacing properties like `top` or `bottom` are supported.",type:["string","object"],status:"optional"}},a={...n,labelSize:{doc:"Define one of the following [heading sizes](/uilib/elements/heading/): `medium` or `large`.",type:["string","false"],status:"optional"},labelHeight:{doc:"Defines the height of an component (size prop), so the label can be aligned correctly. Can be `default`, `small`, `medium`, `large`.",type:"string",status:"optional"},asFieldset:{doc:"Use `true` when you have several form elements. This way a `fieldset` with a `legend` is used.",type:"boolean",status:"optional"},align:{doc:"`center` or `bottom` for aligning the contents vertically. Defaults to `bottom`.",type:["string","false"],status:"optional"},disableStatusSummary:{doc:"Use `true` to disable the error summary.",type:"boolean",status:"optional"},composition:{doc:"Use `true` for when you have more than one field wrapped.",type:"string",status:"optional"},disabled:{doc:"Set `true` to make the inner [FormLabel](/uilib/components/form-label/) behave as disabled.",type:"boolean",status:"optional"}}},18739:function(e,t,o){o.d(t,{X:function(){return a},x:function(){return n}});const n={value:{doc:"Source data value for the field. Will take precedence over the path value given in the data context.",type:"{valueType}",status:"optional"},defaultValue:{doc:"Default source data value for the field. Will not take precedence over the path value given in the data context.",type:"{valueType}",status:"optional"},path:{doc:"JSON Pointer for where the data for the field is located in the source dataset (when using Form.Handler or DataContext). The `path` will also be set as the `name` attribute for the [string](/uilib/extensions/forms/base-fields/String/)-field.",type:"string",status:"optional"},info:{doc:"Info message shown below / after the field.",type:["React.Node","Array<React.Node>"],status:"optional"},warning:{doc:"Warning message shown below / after the field.",type:["React.Node","Array<React.Node>"],status:"optional"},error:{doc:"Error message shown below / after the field.",type:["Error","FormError","Array<Error | FormError>"],status:"optional"},disabled:{doc:"Set `true` to show the field but without the possibility of changing the value.",type:"boolean",status:"optional"},emptyValue:{doc:"The value to use (in `onChange` events etc) when emptying the field. Makes it possible for instance to provide `undefined` instead of an empty string when clearing the content of a text input.",type:["{valueType}","undefined"],status:"optional"},required:{doc:'When set to `true`, the field will give an error if the value fails the required validation. When set to `false`, the field will not be required, but will add a "(optional)" suffix to the label.',type:"boolean",status:"optional"},labelSuffix:{doc:'Will append an additional text to the label, like "(optional)". When using `inheritLabel`, the suffix will not be inherited. NB: The visual appearance of the `labelSuffix` may change in the future.',type:"React.Node",status:"optional"},schema:{doc:"Custom JSON Schema for validating the value.",type:"object",status:"optional"},validateInitially:{doc:"Set to `true` to show validation based errors initially (from given value-prop or source data) before the user interacts with the field.",type:"boolean",status:"optional"},validateUnchanged:{doc:"Set to `true` to show validation based errors when the field is touched (like focusing a field and blurring) without having changed the value. Since the user did not introduce a new error, this will apply when the value was initially invalid based on validation.",type:"boolean",status:"optional"},continuousValidation:{doc:"Set to `true` to show validation based errors continuously while writing, not just when blurring the field.",type:"boolean",status:"optional"},errorMessages:{doc:"Custom error messages for each type of error, overriding default messages.",type:"object",status:"optional"},validator:{doc:"Custom validator function that is triggered on every change done by the user. The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }.",type:"function",status:"optional"},onBlurValidator:{doc:"Custom validator function that is triggered when the user leaves a field (e.g., blurring a text input or closing a dropdown). The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }.",type:"function",status:"optional"},transformIn:{doc:"Transforms the `value` before its displayed in the field (e.g. input).",type:"function",status:"optional"},transformOut:{doc:"Transforms the value before it gets forwarded to the form data object (context) or returned as the `onChange` value parameter. The first parameter is the internal value. Some fields to support a second parameter, like the SelectCountry, where the country object is given.",type:"function",status:"optional"}},a={onChange:{doc:"Will be called on value changes made by the user, with the new value as argument. When an `async` function is used, the corresponding [FieldBlock](/uilib/extensions/forms/create-component/FieldBlock/) will show an indicator on the field label. You can return `{ success: 'saved' } as const` to show a success symbol, or an error or an object with these keys `{ info: 'Info message', warning: 'Warning message', error: Error('My error') } as const`.",type:"(value) => void",status:"optional"},onFocus:{doc:"Will be called when the component gets into focus. Like clicking inside a text input or opening a dropdown. Called with active value as argument.",type:"(value) => void",status:"optional"},onBlur:{doc:"Will be called when the component stop being in focus. Like when going to next field, or closing a dropdown. Called with active value as argument.",type:"(value) => void",status:"optional"}}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-base-fields-number-events-mdx-a699494908e24e9244d2.js.map