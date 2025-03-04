"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[76228],{19430:function(e,t,o){o.r(t),o.d(t,{default:function(){return c}});var n=o(52322),a=o(45392),i=o(68230),r=o(85179),s=o(9670);const l={validate:{doc:"Using this prop you can disable the default validation.",type:"boolean",status:"optional"},onBlurValidator:{doc:"Custom validator function that is triggered when the user leaves a field (e.g., blurring a text input or closing a dropdown). The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }. Defaults to bank account number validation, using `bankAccountNumberValidator`. Can be disabled using `false`.",type:"function",status:"optional"}};function d(e){const t=Object.assign({h2:"h2",h3:"h3"},(0,a.ah)(),e.components);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h2,{children:"Properties"}),"\n",(0,n.jsx)(t.h3,{children:"Field-specific properties"}),"\n",(0,n.jsx)(r.ZP,{props:l}),"\n",(0,n.jsx)(t.h3,{children:"General properties"}),"\n",(0,n.jsx)(r.ZP,{props:s.sP,omit:["onBlurValidator"]}),"\n",(0,n.jsx)(t.h2,{children:"Translations"}),"\n",(0,n.jsx)(i.Z,{localeKey:["BankAccountNumber","Field"]})]})}var c=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,a.ah)(),e.components);return t?(0,n.jsx)(t,Object.assign({},e,{children:(0,n.jsx)(d,e)})):d(e)}},68230:function(e,t,o){o.d(t,{Z:function(){return y}});var n=o(70894),a=o(55560),i=o(41676),r=o(6210),s=o(88268),l=o(36946),d=o(64223),c=o(37339),u=o(80945),h=o(88065),p=o(45270),f=o(85179),g=o(52322);const b=(0,n.Z)(a.ZP,{target:"ejvypor0"})({name:"1qdk5x4",styles:"td{white-space:nowrap;}"});function y(e){let{localeKey:t,source:o=null}=e;o||(o=(0,c.rM)({},h.Z,p.Z));const n={},y={},m=(Array.isArray(t)?t:[t]).map((e=>{if(e.includes(".")){const t=e.split(".")[0];return y[t]=y[t]||[],y[t].push(e),t}return e})),v=(e,t,o,a)=>{e=`${a}.${e}`,y[a]&&!y[a].includes(e)||(n[e]=Object.assign(n[e]||{},{[o]:t}))};Object.entries(o).forEach((e=>{let[t,o]=e;m.forEach((e=>{const n=o[e];n?Object.entries(n).forEach((o=>{let[n,a]=o;if("object"==typeof a){const o=`${e}.${n}`;Object.entries(a).forEach((e=>{let[n,a]=e;v(n,a,t,o)}))}else v(n,a,t,e)})):(0,u.ZK)(`TranslationsTable: Could not find any translations for key: "${e}", perhaps you misspelled the key's name?`)}))}));const w=Object.keys(o),j=Object.entries(n).map((e=>{let[t,o]=e;return(0,g.jsxs)(i.Z,{children:[(0,g.jsx)(r.Z,{children:(0,g.jsx)(f.Kw,{variant:"prop",children:t})}),Object.entries(o).map(((e,t)=>{let[o,n]=e;return(0,g.jsx)(r.Z,{children:"string"==typeof n?n:(0,g.jsx)("pre",{children:JSON.stringify(n,null,2)})},t+o)}))]},t)}));if(0!=j.length)return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(s.Z,{children:["More info about translations can be found in the"," ",(0,g.jsx)(l.ZP,{href:"/uilib/usage/customisation/localization/",children:"general localization"})," ","and"," ",(0,g.jsx)(l.ZP,{href:"/uilib/extensions/forms/getting-started/#localization-and-translation",children:"Eufemia Forms localization"})," ","docs."]}),(0,g.jsx)(a.ZP.ScrollView,{children:(0,g.jsxs)(b,{children:[(0,g.jsx)("thead",{children:(0,g.jsxs)(i.Z,{children:[(0,g.jsx)(d.Z,{children:"Key"}),w.map((e=>(0,g.jsx)(d.Z,{children:e},e)))]})}),(0,g.jsx)("tbody",{children:j})]})})]});(0,u.ZK)(`TranslationsTable: Not able to find any translations for input : "${t}", hence not rendering the translations table.`)}},6210:function(e,t,o){var n=o(30600);t.Z=n.Z},64223:function(e,t,o){var n=o(91859);t.Z=n.Z},41676:function(e,t,o){var n=o(35610);t.Z=n.Z},9670:function(e,t,o){o.d(t,{EU:function(){return s},hK:function(){return r},sP:function(){return i}});var n=o(84187),a=o(18739);const i={...a.x,...n.W},r={...a.X},s=function(e,t){void 0===e&&(e=void 0),void 0===t&&(t=void 0);const o=`(${e?`value${e.optional?"?":""}: ${e.type}`:"value"}${t?`, additionalArgs${t.optional?"?":""}: ${t.type}`:""}) => void`;return{...r,onChange:{...r.onChange,type:o},onFocus:{...r.onFocus,type:o},onBlur:{...r.onBlur,type:o}}}},84187:function(e,t,o){o.d(t,{P:function(){return a},W:function(){return n}});const n={label:{doc:"Field label to show above / before the input feature.",type:"string",status:"optional"},labelDescription:{doc:'A more discreet text displayed beside the label (i.e for "(optional)").',type:"string",status:"optional"},labelSrOnly:{doc:"Use `true` to make the label only readable by screen readers.",type:"boolean",status:"optional"},help:{doc:"Provide help content for the field using `title` and `content` as a string or React.Node. Additionally, you can set `open` to `true` to display the inline help, set the `breakout` property to `false` to disable the breakout of the inline help content, or use `renderAs` set to `dialog` to render the content in a [Dialog](/uilib/components/dialog/) (recommended for larger amounts of content).",type:"object",status:"optional"},layout:{doc:"Layout for the label and input. Can be `horizontal` or `vertical`.",type:"string",status:"optional"},layoutOptions:{doc:'Use this to set additional options for the `horizontal` layout. E.g. `{ width: "medium" }`. You can also use a custom width `{number}rem`. Instead of a width, you can use a min/max width. E.g. `{ minWidth: "6rem", maxWidth: "12rem" }`.',type:"object",status:"optional"},width:{doc:"Will set the width for the whole block. Use `small`, `medium`, `large` for predefined standard widths. You can also set a custom width `{number}rem` or use `stretch` or `false`.",type:["string","false"],status:"optional"},contentWidth:{doc:"Will set the width for its contents. Use `small`, `medium`, `large` for predefined standard widths. You can also set a custom width `{number}rem` or use `stretch` or `false`.",type:["string","false"],status:"optional"},"[Space](/uilib/layout/space/properties)":{doc:"Spacing properties like `top` or `bottom` are supported.",type:["string","object"],status:"optional"}},a={...n,labelSize:{doc:"Define one of the following [heading sizes](/uilib/elements/heading/): `medium` or `large`.",type:["string","false"],status:"optional"},labelHeight:{doc:"Defines the height of an component (size prop), so the label can be aligned correctly. Can be `default`, `small`, `medium`, `large`.",type:"string",status:"optional"},asFieldset:{doc:"Use `true` when you have several form elements. This way a `fieldset` with a `legend` is used.",type:"boolean",status:"optional"},align:{doc:"`center` or `bottom` for aligning the contents vertically. Defaults to `bottom`.",type:["string","false"],status:"optional"},disableStatusSummary:{doc:"Use `true` to disable the error summary.",type:"boolean",status:"optional"},composition:{doc:"Use `true` for when you have more than one field wrapped.",type:"string",status:"optional"},disabled:{doc:"Set `true` to make the inner [FormLabel](/uilib/components/form-label/) behave as disabled.",type:"boolean",status:"optional"}}},18739:function(e,t,o){o.d(t,{X:function(){return a},x:function(){return n}});const n={value:{doc:"Source data value for the field. Will take precedence over the path value given in the data context.",type:"{valueType}",status:"optional"},defaultValue:{doc:"Default source data value for the field. Will not take precedence over the path value given in the data context.",type:"{valueType}",status:"optional"},path:{doc:"JSON Pointer for where the data for the field is located in the source dataset (when using Form.Handler or DataContext). The `path` will also be set as the `name` attribute for the [string](/uilib/extensions/forms/base-fields/String/)-field.",type:"string",status:"optional"},info:{doc:"Info message shown below / after the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`",type:["React.Node","Array<React.Node>","function"],status:"optional"},warning:{doc:"Warning message shown below / after the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`",type:["React.Node","Array<React.Node>","function"],status:"optional"},error:{doc:"Error message shown below / after the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`",type:["Error","FormError","Array<Error | FormError>","function"],status:"optional"},disabled:{doc:"Set `true` to show the field but without the possibility of changing the value.",type:"boolean",status:"optional"},emptyValue:{doc:"The value to use (in `onChange` events etc) when emptying the field. Makes it possible for instance to provide `undefined` instead of an empty string when clearing the content of a text input.",type:["{valueType}","undefined"],status:"optional"},required:{doc:'When set to `true`, the field will give an error if the value fails the required validation. When set to `false`, the field will not be required, but will add a "(optional)" suffix to the label.',type:"boolean",status:"optional"},labelSuffix:{doc:'Will append an additional text to the label, like "(optional)". When using `inheritLabel`, the suffix will not be inherited. NB: The visual appearance of the `labelSuffix` may change in the future.',type:"React.Node",status:"optional"},schema:{doc:"Custom JSON Schema for validating the value.",type:"object",status:"optional"},validateInitially:{doc:"Set to `true` to show validation based errors initially (from given value-prop or source data) before the user interacts with the field.",type:"boolean",status:"optional"},validateUnchanged:{doc:"Set to `true` to show validation based errors when the field is touched (like focusing a field and blurring) without having changed the value. Since the user did not introduce a new error, this will apply when the value was initially invalid based on validation.",type:"boolean",status:"optional"},validateContinuously:{doc:"Set to `true` to show validation based errors continuously while writing, not just when blurring the field.",type:"boolean",status:"optional"},errorMessages:{doc:"Custom error messages for each type of error, overriding default messages.",type:"object",status:"optional"},onChangeValidator:{doc:"Custom validator function where you can return `undefined`, `Error`, `FormError` or an Array with either several other validators or several `Error` or `FormError`. It is triggered on every change done by the user. The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }.",type:"function",status:"optional"},onBlurValidator:{doc:"Custom validator function where you can return `undefined`, `Error`, `FormError` or an Array with either several other validators or several `Error` or `FormError`. It is triggered when the user leaves a field (e.g., blurring a text input or closing a dropdown). The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }.",type:"function",status:"optional"},transformIn:{doc:"Transforms the `value` before its displayed in the field (e.g. input).",type:"function",status:"optional"},transformOut:{doc:"Transforms the value before it gets forwarded to the form data object (context) or returned as the `onChange` value parameter. The first parameter is the internal value. Some fields to support a second parameter, like the SelectCountry, where the country object is given.",type:"function",status:"optional"}},a={onChange:{doc:"Will be called on value changes made by the user, with the new value as argument. When an `async` function is used, the corresponding [FieldBlock](/uilib/extensions/forms/create-component/FieldBlock/) will show an indicator on the field label. You can return `{ success: 'saved' } as const` to show a success symbol, or an error or an object with these keys `{ info: 'Info message', warning: 'Warning message', error: Error('My error') } as const`. The second parameter is an object that e.g. contains `props` (all given `Field.*` properties).",type:"(value) => void",status:"optional"},onFocus:{doc:"Will be called when the component gets into focus. Like clicking inside a text input or opening a dropdown. Called with active value as argument. The second parameter is an object that e.g. contains `props` (all given `Field.*` properties).",type:"(value) => void",status:"optional"},onBlur:{doc:"Will be called when the component stop being in focus. Like when going to next field, or closing a dropdown. Called with active value as argument. The second parameter is an object that e.g. contains `props` (all given `Field.*` properties).",type:"(value) => void",status:"optional"}}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-feature-fields-bank-account-number-properties-mdx-71896410a6a2cf8352de.js.map