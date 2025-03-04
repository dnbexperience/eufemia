"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[49015],{44773:function(e,t,o){o.r(t),o.d(t,{default:function(){return c}});var n=o(52322),a=o(45392),i=o(68230),s=o(85179),r=o(9670);const l={...o(82700).t};function u(e){const t=Object.assign({h2:"h2",h3:"h3"},(0,a.ah)(),e.components);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h2,{children:"Properties"}),"\n",(0,n.jsx)(t.h3,{children:"Field-specific properties"}),"\n",(0,n.jsx)(s.ZP,{props:l}),"\n",(0,n.jsx)(t.h3,{children:"General properties"}),"\n",(0,n.jsx)(s.ZP,{props:r.sP}),"\n",(0,n.jsx)(t.h2,{children:"Translations"}),"\n",(0,n.jsx)(i.Z,{localeKey:["Address","Field"]})]})}var c=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,a.ah)(),e.components);return t?(0,n.jsx)(t,Object.assign({},e,{children:(0,n.jsx)(u,e)})):u(e)}},68230:function(e,t,o){o.d(t,{Z:function(){return b}});var n=o(70894),a=o(55560),i=o(41676),s=o(6210),r=o(88268),l=o(36946),u=o(64223),c=o(37339),d=o(80945),p=o(88065),h=o(45270),f=o(85179),m=o(52322);const y=(0,n.Z)(a.ZP,{target:"ejvypor0"})({name:"1qdk5x4",styles:"td{white-space:nowrap;}"});function b(e){let{localeKey:t,source:o=null}=e;o||(o=(0,c.rM)({},p.Z,h.Z));const n={},b={},g=(Array.isArray(t)?t:[t]).map((e=>{if(e.includes(".")){const t=e.split(".")[0];return b[t]=b[t]||[],b[t].push(e),t}return e})),w=(e,t,o,a)=>{e=`${a}.${e}`,b[a]&&!b[a].includes(e)||(n[e]=Object.assign(n[e]||{},{[o]:t}))};Object.entries(o).forEach((e=>{let[t,o]=e;g.forEach((e=>{const n=o[e];n?Object.entries(n).forEach((o=>{let[n,a]=o;if("object"==typeof a){const o=`${e}.${n}`;Object.entries(a).forEach((e=>{let[n,a]=e;w(n,a,t,o)}))}else w(n,a,t,e)})):(0,d.ZK)(`TranslationsTable: Could not find any translations for key: "${e}", perhaps you misspelled the key's name?`)}))}));const v=Object.keys(o),x=Object.entries(n).map((e=>{let[t,o]=e;return(0,m.jsxs)(i.Z,{children:[(0,m.jsx)(s.Z,{children:(0,m.jsx)(f.Kw,{variant:"prop",children:t})}),Object.entries(o).map(((e,t)=>{let[o,n]=e;return(0,m.jsx)(s.Z,{children:"string"==typeof n?n:(0,m.jsx)("pre",{children:JSON.stringify(n,null,2)})},t+o)}))]},t)}));if(0!=x.length)return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(r.Z,{children:["More info about translations can be found in the"," ",(0,m.jsx)(l.ZP,{href:"/uilib/usage/customisation/localization/",children:"general localization"})," ","and"," ",(0,m.jsx)(l.ZP,{href:"/uilib/extensions/forms/getting-started/#localization-and-translation",children:"Eufemia Forms localization"})," ","docs."]}),(0,m.jsx)(a.ZP.ScrollView,{children:(0,m.jsxs)(y,{children:[(0,m.jsx)("thead",{children:(0,m.jsxs)(i.Z,{children:[(0,m.jsx)(u.Z,{children:"Key"}),v.map((e=>(0,m.jsx)(u.Z,{children:e},e)))]})}),(0,m.jsx)("tbody",{children:x})]})})]});(0,d.ZK)(`TranslationsTable: Not able to find any translations for input : "${t}", hence not rendering the translations table.`)}},68793:function(e,t,o){o.d(t,{G:function(){return n}});const n={value:{doc:"The content value of the input.",type:"string",status:"optional"},align:{doc:"Defines the text alignment of the input. Can be `left`, `right` or `center`. Defaults to `left`.",type:"string",status:"optional"},label:{doc:"Prepends the Form Label component. If no ID is provided, a random ID is created.",type:"React.Node",status:"optional"},label_sr_only:{doc:"Use `true` to make the label only readable by screen readers.",type:"boolean",status:"optional"},label_direction:{doc:'Use `label_direction="vertical"` to change the label layout direction. Defaults to `horizontal`.',type:"string",status:"optional"},status:{doc:"Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.",type:"string",status:"optional"},status_state:{doc:"Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.",type:"string",status:"optional"},status_props:{doc:"Use an object to define additional FormStatus properties.",type:"object",status:"optional"},globalStatus:{doc:"The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).",type:"object",status:"optional"},placeholder:{doc:"The placeholder which shows up once the input value is empty.",type:"string",status:"optional"},icon:{doc:"Icon to show before or after the input / placeholder. Can be either a string defining a primary icon or a Component using an SVG icon of either 16px or 24px.",type:["string","React.Node"],status:"optional"},icon_position:{doc:"Defines the position of icon inside the input. Set to `left` or `right`. Defaults to `left` if not set.",type:"string",status:"optional"},icon_size:{doc:"The icon size of the icon shows. Defaults to `medium`.",type:"string",status:"optional"},keep_placeholder:{doc:"Set to `true` in case the `placeholder` has to be kept during focus. By default, the placeholder disappears on focus.",type:"boolean",status:"optional"},input_class:{doc:"In case we have to set a custom input class.",type:"string",status:"optional"},type:{doc:"Choose between `text`, `number`, `email`, `password`, `url`, `tel` and `search`.",type:"string",status:"optional"},autocomplete:{doc:"Defaults to `off`. Set to `on` or any of [allowed `attributes`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-autocomplete). Keep in mind, 1. you may have to define a `name`, 2. have the input as a descendant of a `<form>` element, 3. and have a submit button inside the form.",type:"string",status:"optional"},submit_button_title:{doc:"Title attribute for the search icon. Only relevant if search input.",type:"string",status:"optional"},suffix:{doc:"Text describing the content of the input more than the label. you can also send in a React component, so it gets wrapped inside the Input component.",type:["string","React.Node"],status:"optional"},size:{doc:"The sizes you can choose is `default` (2rem), `medium` (2.5rem) and `large` (3rem) are supported component sizes. Defaults to `default` / `null`. Also, if you define a number like `size={2}` then it will be forwarded as the input element attribute.",type:["string","number"],status:"optional"},selectall:{doc:"If set to `true`, then the whole input value gets selected on the entry focus. A second click will place the cursor on the wanted position.",type:"boolean",status:"optional"},clear:{doc:"If set to `true`, then a clear button will be shown which lets the user clear any given input value.",type:"boolean",status:"optional"},stretch:{doc:"If set to `true`, then the input field will be 100% in `width`.",type:"boolean",status:"optional"},skeleton:{doc:"If set to `true`, an overlaying skeleton with animation will be shown.",type:"boolean",status:"optional"},input_attributes:{doc:"Provide the Input element with any attributes by using an Object `input_attributes={{size:'2'}}` or a JSON Object `input_attributes='{\"size\":\"2\"}'`. **NB:** Keep in mind, that also every not listed component property will be sent along and set as an Input element attribute.",type:"object",status:"optional"},input_state:{doc:"Defines a custom visual state of the input. Use it only if you have to simulate a custom state. Currently are three statuses `virgin` , `focus` and `dirty`. Defaults to `null`.",type:"string",status:"optional"},submit_element:{doc:'Accepts a React element which will show up like the "submit button" would do on `type="search"`.',type:["string","React.Element"],status:"optional"},inner_ref:{doc:"By providing a React.ref we can get the internally used input element (DOM). E.g. `inner_ref={myRef}` by using `React.createRef()` or `React.useRef()`.",type:"React.Ref",status:"optional"},input_element:{doc:'By providing a new component we can change the internally used element. Also supports a string only, like `input_element="input"`.',type:["string","React.Element"],status:"internal"},inner_element:{doc:'By providing a new component to be rendered inside the "shell" – we can add a freely customizable internal element. Used by the Autocomplete component.',type:["string","React.Element"],status:"internal"},"[Space](/uilib/layout/space/properties)":{doc:"Spacing properties like `top` or `bottom` are supported.",type:["string","object"],status:"optional"}}},6210:function(e,t,o){var n=o(30600);t.Z=n.Z},64223:function(e,t,o){var n=o(91859);t.Z=n.Z},41676:function(e,t,o){var n=o(35610);t.Z=n.Z},9670:function(e,t,o){o.d(t,{EU:function(){return r},hK:function(){return s},sP:function(){return i}});var n=o(84187),a=o(18739);const i={...a.x,...n.W},s={...a.X},r=function(e,t){void 0===e&&(e=void 0),void 0===t&&(t=void 0);const o=`(${e?`value${e.optional?"?":""}: ${e.type}`:"value"}${t?`, additionalArgs${t.optional?"?":""}: ${t.type}`:""}) => void`;return{...s,onChange:{...s.onChange,type:o},onFocus:{...s.onFocus,type:o},onBlur:{...s.onBlur,type:o}}}},82700:function(e,t,o){o.d(t,{t:function(){return a}});var n=o(68793);const a={multiline:{doc:"True to be able to write in multiple lines (switching from input-element to textarea-element).",type:"boolean",status:"optional"},leftIcon:{doc:"For icon at the left side of the text input.",type:"string",status:"optional"},rightIcon:{doc:"For icon at the right side of the text input.",type:"string",status:"optional"},capitalize:{doc:"When set to true, it will capitalize the first letter of every word, transforming the rest to lowercase.",type:"boolean",status:"optional"},trim:{doc:"When true, it will trim leading and trailing whitespaces on blur, triggering onChange if the value changes.",type:"boolean",status:"optional"},inputMode:{doc:"Define an [inputmode](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode).",type:"string",status:"optional"},autoComplete:{doc:"For HTML [autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attributes.",type:["on","string"],status:"optional"},minLength:{doc:"Validation for minimum length of the text (number of characters).",type:"number",status:"optional"},maxLength:{doc:"Validation for maximum length of the text (number of characters).",type:"number",status:"optional"},pattern:{doc:"Validation based on regex pattern.",type:"string",status:"optional"},width:{doc:"`false` for no width (use browser default), small, medium or large for predefined standard widths, stretch to fill available width.",type:["string","false"],status:"optional"},size:{...n.G.size,doc:`${n.G.size.doc} Consider rather setting field sizes with [Form.Appearance](/uilib/extensions/forms/Form/Appearance/).`},align:n.G.align,selectall:n.G.selectall,clear:n.G.clear,keepPlaceholder:n.G.keep_placeholder,rows:{doc:"For multiline, set how many rows of text can be shown by default. Defaults to 2.",type:"number",status:"optional"},autoresizeMaxRows:{doc:"For multiline, set how many rows of text can be shown at max. Defaults to 6",type:"number",status:"optional"},characterCounter:{doc:"For multiline, use a number to define the displayed max length e.g. `40` or `{ max: 40, variant: 'down' }`.",type:["number","object"],status:"optional"},autoresize:{doc:"For multiline, set true to expand when writing longer texts. Defaults to true.",type:"boolean",status:"optional"},inputClassName:{doc:"Class name set on the <input> DOM element.",type:"string",status:"optional"},innerRef:{doc:"By providing a React.Ref we can get the internally used input element (DOM).",type:"React.Ref",status:"optional"},submitElement:{doc:'Accepts a React element which will show up like the "submit button" would do on type="search".',type:"React.Element",status:"optional"}}},84187:function(e,t,o){o.d(t,{P:function(){return a},W:function(){return n}});const n={label:{doc:"Field label to show above / before the input feature.",type:"string",status:"optional"},labelDescription:{doc:'A more discreet text displayed beside the label (i.e for "(optional)").',type:"string",status:"optional"},labelSrOnly:{doc:"Use `true` to make the label only readable by screen readers.",type:"boolean",status:"optional"},help:{doc:"Provide help content for the field using `title` and `content` as a string or React.Node. Additionally, you can set `open` to `true` to display the inline help, set the `breakout` property to `false` to disable the breakout of the inline help content, or use `renderAs` set to `dialog` to render the content in a [Dialog](/uilib/components/dialog/) (recommended for larger amounts of content).",type:"object",status:"optional"},layout:{doc:"Layout for the label and input. Can be `horizontal` or `vertical`.",type:"string",status:"optional"},layoutOptions:{doc:'Use this to set additional options for the `horizontal` layout. E.g. `{ width: "medium" }`. You can also use a custom width `{number}rem`. Instead of a width, you can use a min/max width. E.g. `{ minWidth: "6rem", maxWidth: "12rem" }`.',type:"object",status:"optional"},width:{doc:"Will set the width for the whole block. Use `small`, `medium`, `large` for predefined standard widths. You can also set a custom width `{number}rem` or use `stretch` or `false`.",type:["string","false"],status:"optional"},contentWidth:{doc:"Will set the width for its contents. Use `small`, `medium`, `large` for predefined standard widths. You can also set a custom width `{number}rem` or use `stretch` or `false`.",type:["string","false"],status:"optional"},"[Space](/uilib/layout/space/properties)":{doc:"Spacing properties like `top` or `bottom` are supported.",type:["string","object"],status:"optional"}},a={...n,labelSize:{doc:"Define one of the following [heading sizes](/uilib/elements/heading/): `medium` or `large`.",type:["string","false"],status:"optional"},labelHeight:{doc:"Defines the height of an component (size prop), so the label can be aligned correctly. Can be `default`, `small`, `medium`, `large`.",type:"string",status:"optional"},asFieldset:{doc:"Use `true` when you have several form elements. This way a `fieldset` with a `legend` is used.",type:"boolean",status:"optional"},align:{doc:"`center` or `bottom` for aligning the contents vertically. Defaults to `bottom`.",type:["string","false"],status:"optional"},disableStatusSummary:{doc:"Use `true` to disable the error summary.",type:"boolean",status:"optional"},composition:{doc:"Use `true` for when you have more than one field wrapped.",type:"string",status:"optional"},disabled:{doc:"Set `true` to make the inner [FormLabel](/uilib/components/form-label/) behave as disabled.",type:"boolean",status:"optional"}}},18739:function(e,t,o){o.d(t,{X:function(){return a},x:function(){return n}});const n={value:{doc:"Source data value for the field. Will take precedence over the path value given in the data context.",type:"{valueType}",status:"optional"},defaultValue:{doc:"Default source data value for the field. Will not take precedence over the path value given in the data context.",type:"{valueType}",status:"optional"},path:{doc:"JSON Pointer for where the data for the field is located in the source dataset (when using Form.Handler or DataContext). The `path` will also be set as the `name` attribute for the [string](/uilib/extensions/forms/base-fields/String/)-field.",type:"string",status:"optional"},info:{doc:"Info message shown below / after the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`",type:["React.Node","Array<React.Node>","function"],status:"optional"},warning:{doc:"Warning message shown below / after the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`",type:["React.Node","Array<React.Node>","function"],status:"optional"},error:{doc:"Error message shown below / after the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`",type:["Error","FormError","Array<Error | FormError>","function"],status:"optional"},disabled:{doc:"Set `true` to show the field but without the possibility of changing the value.",type:"boolean",status:"optional"},emptyValue:{doc:"The value to use (in `onChange` events etc) when emptying the field. Makes it possible for instance to provide `undefined` instead of an empty string when clearing the content of a text input.",type:["{valueType}","undefined"],status:"optional"},required:{doc:'When set to `true`, the field will give an error if the value fails the required validation. When set to `false`, the field will not be required, but will add a "(optional)" suffix to the label.',type:"boolean",status:"optional"},labelSuffix:{doc:'Will append an additional text to the label, like "(optional)". When using `inheritLabel`, the suffix will not be inherited. NB: The visual appearance of the `labelSuffix` may change in the future.',type:"React.Node",status:"optional"},schema:{doc:"Custom JSON Schema for validating the value.",type:"object",status:"optional"},validateInitially:{doc:"Set to `true` to show validation based errors initially (from given value-prop or source data) before the user interacts with the field.",type:"boolean",status:"optional"},validateUnchanged:{doc:"Set to `true` to show validation based errors when the field is touched (like focusing a field and blurring) without having changed the value. Since the user did not introduce a new error, this will apply when the value was initially invalid based on validation.",type:"boolean",status:"optional"},validateContinuously:{doc:"Set to `true` to show validation based errors continuously while writing, not just when blurring the field.",type:"boolean",status:"optional"},errorMessages:{doc:"Custom error messages for each type of error, overriding default messages.",type:"object",status:"optional"},onChangeValidator:{doc:"Custom validator function where you can return `undefined`, `Error`, `FormError` or an Array with either several other validators or several `Error` or `FormError`. It is triggered on every change done by the user. The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }.",type:"function",status:"optional"},onBlurValidator:{doc:"Custom validator function where you can return `undefined`, `Error`, `FormError` or an Array with either several other validators or several `Error` or `FormError`. It is triggered when the user leaves a field (e.g., blurring a text input or closing a dropdown). The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }.",type:"function",status:"optional"},transformIn:{doc:"Transforms the `value` before its displayed in the field (e.g. input).",type:"function",status:"optional"},transformOut:{doc:"Transforms the value before it gets forwarded to the form data object (context) or returned as the `onChange` value parameter. The first parameter is the internal value. Some fields to support a second parameter, like the SelectCountry, where the country object is given.",type:"function",status:"optional"}},a={onChange:{doc:"Will be called on value changes made by the user, with the new value as argument. When an `async` function is used, the corresponding [FieldBlock](/uilib/extensions/forms/create-component/FieldBlock/) will show an indicator on the field label. You can return `{ success: 'saved' } as const` to show a success symbol, or an error or an object with these keys `{ info: 'Info message', warning: 'Warning message', error: Error('My error') } as const`. The second parameter is an object that e.g. contains `props` (all given `Field.*` properties).",type:"(value) => void",status:"optional"},onFocus:{doc:"Will be called when the component gets into focus. Like clicking inside a text input or opening a dropdown. Called with active value as argument. The second parameter is an object that e.g. contains `props` (all given `Field.*` properties).",type:"(value) => void",status:"optional"},onBlur:{doc:"Will be called when the component stop being in focus. Like when going to next field, or closing a dropdown. Called with active value as argument. The second parameter is an object that e.g. contains `props` (all given `Field.*` properties).",type:"(value) => void",status:"optional"}}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-feature-fields-address-properties-mdx-2e3548afb1fe2e7ada05.js.map