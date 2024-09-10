"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[8496],{16767:function(e,t,o){o.r(t),o.d(t,{default:function(){return u}});var n=o(52322),a=o(45392),i=o(68230),s=o(85179),r=o(9670);const l={validate:{doc:"Using this prop you can disable the default validation.",type:"boolean",status:"optional"},help:{doc:"Provide a help button. Object consisting of `title` and `content`.",type:"object",status:"optional"}};function d(e){const t=Object.assign({h2:"h2",h3:"h3"},(0,a.ah)(),e.components);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h2,{children:"Properties"}),"\n",(0,n.jsx)(t.h3,{children:"Field-specific props"}),"\n",(0,n.jsx)(s.ZP,{props:l}),"\n",(0,n.jsx)(t.h3,{children:"General props"}),"\n",(0,n.jsx)(s.ZP,{props:r.uD}),"\n",(0,n.jsx)(t.h2,{children:"Translations"}),"\n",(0,n.jsx)(i.Z,{localeKey:["NationalIdentityNumber","Field"]})]})}var u=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,a.ah)(),e.components);return t?(0,n.jsx)(t,Object.assign({},e,{children:(0,n.jsx)(d,e)})):d(e)}},6210:function(e,t,o){var n=o(30600);t.Z=n.Z},64223:function(e,t,o){var n=o(91859);t.Z=n.Z},41676:function(e,t,o){var n=o(35610);t.Z=n.Z},9670:function(e,t,o){o.d(t,{EU:function(){return r},d9:function(){return s},uD:function(){return i}});var n=o(84187),a=o(5484);const i={...a.c,...n.L},s={...a.F},r=function(e,t){void 0===e&&(e=void 0),void 0===t&&(t=void 0);const o=`(${e?`value${e.optional?"?":""}: ${e.type}`:"value"}${t?`, additionalArgs${t.optional?"?":""}: ${t.type}`:""}) => void`;return{...s,onChange:{...s.onChange,type:o},onFocus:{...s.onFocus,type:o},onBlur:{...s.onBlur,type:o}}}},84187:function(e,t,o){o.d(t,{L:function(){return n},o:function(){return a}});const n={label:{doc:"Field label to show above / before the input feature.",type:"string",status:"optional"},labelDescription:{doc:'A more discreet text displayed beside the label (i.e for "(optional)").',type:"string",status:"optional"},labelSrOnly:{doc:"Use `true` to make the label only readable by screen readers.",type:"boolean",status:"optional"},layout:{doc:"Layout for the label and input. Can be `horizontal` or `vertical`.",type:"string",status:"optional"},width:{doc:"`small`, `medium`, `large`, `stretch` or `false` for predefined standard widths.",type:["string","false"],status:"optional"},contentWidth:{doc:"`small`, `medium`, `large`, `stretch` or `false` for predefined standard widths.",type:["string","false"],status:"optional"},"[Space](/uilib/layout/space/properties)":{doc:"Spacing properties like `top` or `bottom` are supported.",type:["string","object"],status:"optional"}},a={...n,labelSize:{doc:"Define one of the following [heading size](/uilib/elements/heading/): `medium` or `large`.",type:["string","false"],status:"optional"},asFieldset:{doc:"Use `true` when you have several form elements. This way a `fieldset` with a `legend` is used.",type:"boolean",status:"optional"},align:{doc:"`center` or `bottom` for aligning the contents vertically. Defaults to `bottom`.",type:["string","false"],status:"optional"},composition:{doc:"Use `true` for when you have more than one field wrapped.",type:"string",status:"optional"},disabled:{doc:"Set `true` to make the inner [FormLabel](/uilib/components/form-label/) behave as disabled.",type:"boolean",status:"optional"}}},5484:function(e,t,o){o.d(t,{F:function(){return a},c:function(){return n}});const n={value:{doc:"Source data value for the field. Will take precedence over the path value given in the data context.",type:"{valueType}",status:"optional"},defaultValue:{doc:"Default source data value for the field. Will not take precedence over the path value given in the data context.",type:"{valueType}",status:"optional"},path:{doc:"JSON Pointer for where the data for the field is located in the source dataset (when using Form.Handler or DataContext). The `path` will also be set as the `name` attribute for the [string](/uilib/extensions/forms/base-fields/String/)-field.",type:"string",status:"optional"},info:{doc:"Info message shown below / after the field.",type:"React.Node",status:"optional"},warning:{doc:"Warning message shown below / after the field.",type:"React.Node",status:"optional"},error:{doc:"Error message shown below / after the field.",type:"Error",status:"optional"},disabled:{doc:"Set `true` to show the field but without the possibility of changing the value.",type:"boolean",status:"optional"},emptyValue:{doc:"The value to use (in `onChange` events etc) when emptying the field. Makes it possible for instance to provide `undefined` instead of an empty string when clearing the content of a text input.",type:["{valueType}","undefined"],status:"optional"},required:{doc:"When set `true`, the field will give an error if the value cannot be empty.",type:"boolean",status:"optional"},schema:{doc:"Custom JSON Schema for validating the value.",type:"object",status:"optional"},validateInitially:{doc:"Set to `true` to show validation based errors initially (from given value-prop or source data) before the user interacts with the field.",type:"boolean",status:"optional"},validateUnchanged:{doc:"Set to `true` to show validation based errors when the field is touched (like focusing a field and blurring) without having changed the value. Since the user did not introduce a new error, this will apply when the value was initially invalid based on validation.",type:"boolean",status:"optional"},continuousValidation:{doc:"Set to `true` to show validation based errors continuously while writing, not just when blurring the field.",type:"boolean",status:"optional"},errorMessages:{doc:"Custom error messages for each type of error, overriding default messages.",type:"object",status:"optional"},validator:{doc:"Custom validator function that is triggered on every change done by the user. The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }.",type:"function",status:"optional"},onBlurValidator:{doc:"Custom validator function that is triggered when the user leaves a field (e.g., blurring a text input or closing a dropdown). The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }.",type:"function",status:"optional"},transformIn:{doc:"Transforms the `value` before its displayed in the field (e.g. input).",type:"function",status:"optional"},transformOut:{doc:"Transforms the value before it gets forwarded to the form data object or returned as the `onChange` value parameter.",type:"function",status:"optional"}},a={onChange:{doc:"Will be called on value changes made by the user, with the new value as argument. When an `async` function is used, the corresponding [FieldBlock](/uilib/extensions/forms/create-component/FieldBlock/) will show an indicator on the field label. You can return `{ success: 'saved' } as const` to show a success symbol, or an error or an object with these keys `{ info: 'Info message', warning: 'Warning message', error: Error('My error') } as const`.",type:"(value) => void",status:"optional"},onFocus:{doc:"Will be called when the component gets into focus. Like clicking inside a text input or opening a dropdown. Called with active value as argument.",type:"(value) => void",status:"optional"},onBlur:{doc:"Will be called when the component stop being in focus. Like when going to next field, or closing a dropdown. Called with active value as argument.",type:"(value) => void",status:"optional"}}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-feature-fields-national-identity-number-properties-mdx-0bd65154702ace00da93.js.map