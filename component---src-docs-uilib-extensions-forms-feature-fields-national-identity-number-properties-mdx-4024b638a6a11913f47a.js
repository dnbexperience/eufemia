"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[8496],{16767:function(t,e,o){o.r(e),o.d(e,{default:function(){return p}});var n=o(52322),a=o(45392),s=o(68230),i=o(85179),l=o(82700);const r={validate:{doc:"Using this prop you can disable the default validation.",type:"boolean",status:"optional"},onBlurValidator:{doc:"Custom validator function that is triggered when the user leaves a field (e.g., blurring a text input or closing a dropdown). The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }. Defaults to validation of the identification number(national identity numbers and D numbers), using `dnrAndFnrValidator`. Can be disabled using `false`.",type:"function",status:"optional"}};function u(t){const e=Object.assign({h2:"h2",h3:"h3"},(0,a.ah)(),t.components);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(e.h2,{children:"Properties"}),"\n",(0,n.jsx)(e.h3,{children:"Field-specific properties"}),"\n",(0,n.jsx)(i.ZP,{props:r}),"\n",(0,n.jsx)(e.h3,{children:"General properties"}),"\n",(0,n.jsx)(i.ZP,{props:l.t}),"\n",(0,n.jsx)(e.h2,{children:"Translations"}),"\n",(0,n.jsx)(s.Z,{localeKey:["NationalIdentityNumber","Field"]})]})}var p=function(t){void 0===t&&(t={});const{wrapper:e}=Object.assign({},(0,a.ah)(),t.components);return e?(0,n.jsx)(e,Object.assign({},t,{children:(0,n.jsx)(u,t)})):u(t)}},68793:function(t,e,o){o.d(e,{G:function(){return n}});const n={value:{doc:"The content value of the input.",type:"string",status:"optional"},align:{doc:"Defines the text alignment of the input. Can be `left`, `right` or `center`. Defaults to `left`.",type:"string",status:"optional"},label:{doc:"Prepends the Form Label component. If no ID is provided, a random ID is created.",type:"React.Node",status:"optional"},label_sr_only:{doc:"Use `true` to make the label only readable by screen readers.",type:"boolean",status:"optional"},label_direction:{doc:'Use `label_direction="vertical"` to change the label layout direction. Defaults to `horizontal`.',type:"string",status:"optional"},status:{doc:"Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.",type:"string",status:"optional"},status_state:{doc:"Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.",type:"string",status:"optional"},status_props:{doc:"Use an object to define additional FormStatus properties.",type:"object",status:"optional"},globalStatus:{doc:"The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).",type:"object",status:"optional"},placeholder:{doc:"The placeholder which shows up once the input value is empty.",type:"string",status:"optional"},icon:{doc:"Icon to show before or after the input / placeholder. Can be either a string defining a primary icon or a Component using an SVG icon of either 16px or 24px.",type:["string","React.Node"],status:"optional"},icon_position:{doc:"Defines the position of icon inside the input. Set to `left` or `right`. Defaults to `left` if not set.",type:"string",status:"optional"},icon_size:{doc:"The icon size of the icon shows. Defaults to `medium`.",type:"string",status:"optional"},keep_placeholder:{doc:"Set to `true` in case the `placeholder` has to be kept during focus. By default, the placeholder disappears on focus.",type:"boolean",status:"optional"},input_class:{doc:"In case we have to set a custom input class.",type:"string",status:"optional"},type:{doc:"Choose between `text`, `number`, `email`, `password`, `url`, `tel` and `search`.",type:"string",status:"optional"},autocomplete:{doc:"Defaults to `off`. Set to `on` or any of [allowed `attributes`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-autocomplete). Keep in mind, 1. you may have to define a `name`, 2. have the input as a descendant of a `<form>` element, 3. and have a submit button inside the form.",type:"string",status:"optional"},submit_button_title:{doc:"Title attribute for the search icon. Only relevant if search input.",type:"string",status:"optional"},suffix:{doc:"Text describing the content of the input more than the label. you can also send in a React component, so it gets wrapped inside the Input component.",type:["string","React.Node"],status:"optional"},size:{doc:"The sizes you can choose is `default` (2rem), `medium` (2.5rem) and `large` (3rem) are supported component sizes. Defaults to `default` / `null`. Also, if you define a number like `size={2}` then it will be forwarded as the input element attribute.",type:["string","number"],status:"optional"},selectall:{doc:"If set to `true`, then the whole input value gets selected on the entry focus. A second click will place the cursor on the wanted position.",type:"boolean",status:"optional"},clear:{doc:"If set to `true`, then a clear button will be shown which lets the user clear any given input value.",type:"boolean",status:"optional"},stretch:{doc:"If set to `true`, then the input field will be 100% in `width`.",type:"boolean",status:"optional"},skeleton:{doc:"If set to `true`, an overlaying skeleton with animation will be shown.",type:"boolean",status:"optional"},input_attributes:{doc:"Provide the Input element with any attributes by using an Object `input_attributes={{size:'2'}}` or a JSON Object `input_attributes='{\"size\":\"2\"}'`. **NB:** Keep in mind, that also every not listed component property will be sent along and set as an Input element attribute.",type:"object",status:"optional"},input_state:{doc:"Defines a custom visual state of the input. Use it only if you have to simulate a custom state. Currently are three statuses `virgin` , `focus` and `dirty`. Defaults to `null`.",type:"string",status:"optional"},submit_element:{doc:'Accepts a React element which will show up like the "submit button" would do on `type="search"`.',type:["string","React.Element"],status:"optional"},inner_ref:{doc:"By providing a React.ref we can get the internally used input element (DOM). E.g. `inner_ref={myRef}` by using `React.createRef()` or `React.useRef()`.",type:"React.Ref",status:"optional"},input_element:{doc:'By providing a new component we can change the internally used element. Also supports a string only, like `input_element="input"`.',type:["string","React.Element"],status:"internal"},inner_element:{doc:'By providing a new component to be rendered inside the "shell" – we can add a freely customizable internal element. Used by the Autocomplete component.',type:["string","React.Element"],status:"internal"},"[Space](/uilib/layout/space/properties)":{doc:"Spacing properties like `top` or `bottom` are supported.",type:["string","object"],status:"optional"}}},6210:function(t,e,o){var n=o(30600);e.Z=n.Z},64223:function(t,e,o){var n=o(91859);e.Z=n.Z},41676:function(t,e,o){var n=o(35610);e.Z=n.Z},82700:function(t,e,o){o.d(e,{t:function(){return a}});var n=o(68793);const a={multiline:{doc:"True to be able to write in multiple lines (switching from input-element to textarea-element).",type:"boolean",status:"optional"},leftIcon:{doc:"For icon at the left side of the text input.",type:"string",status:"optional"},rightIcon:{doc:"For icon at the right side of the text input.",type:"string",status:"optional"},capitalize:{doc:"When set to true, it will capitalize the first letter of every word, transforming the rest to lowercase.",type:"boolean",status:"optional"},trim:{doc:"When true, it will trim leading and trailing whitespaces on blur, triggering onChange if the value changes.",type:"boolean",status:"optional"},inputMode:{doc:"Define an [inputmode](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode).",type:"string",status:"optional"},autoComplete:{doc:"For HTML [autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attributes.",type:["on","string"],status:"optional"},minLength:{doc:"Validation for minimum length of the text (number of characters).",type:"number",status:"optional"},maxLength:{doc:"Validation for maximum length of the text (number of characters).",type:"number",status:"optional"},pattern:{doc:"Validation based on regex pattern.",type:"string",status:"optional"},width:{doc:"`false` for no width (use browser default), small, medium or large for predefined standard widths, stretch to fill available width.",type:["string","false"],status:"optional"},size:n.G.size,align:n.G.align,selectall:n.G.selectall,clear:n.G.clear,keepPlaceholder:n.G.keep_placeholder,rows:{doc:"For multiline, set how many rows of text can be shown by default. Defaults to 2.",type:"number",status:"optional"},autoresizeMaxRows:{doc:"For multiline, set how many rows of text can be shown at max. Defaults to 6",type:"number",status:"optional"},characterCounter:{doc:"For multiline, use a number to define the displayed max length e.g. `40` or `{ max: 40, variant: 'down' }`.",type:["number","object"],status:"optional"},autoresize:{doc:"For multiline, set true to expand when writing longer texts. Defaults to true.",type:"boolean",status:"optional"},inputClassName:{doc:"Class name set on the <input> DOM element.",type:"string",status:"optional"},innerRef:{doc:"By providing a React.Ref we can get the internally used input element (DOM).",type:"React.Ref",status:"optional"},submitElement:{doc:'Accepts a React element which will show up like the "submit button" would do on type="search".',type:"React.Element",status:"optional"}}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-feature-fields-national-identity-number-properties-mdx-4024b638a6a11913f47a.js.map