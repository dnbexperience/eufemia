"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[84310],{66386:function(e,t,o){o.d(t,{t:function(){return s},u:function(){return n}});const a=["string","Date"],n={date:{doc:'Defines the pre-filled date by either a JavaScript DateInstance or (ISO 8601) like `date="2019-05-05"` and `content`.',type:a,status:"optional"},startDate:{doc:"To set the pre-filled starting date. Is used if `range={true}` is set to `true`. Defaults to `null`, showing the `maskPlaceholder`.",type:a,status:"optional"},endDate:{doc:"To set the pre-filled ending date. Is used if `range={true}` is set to `true`. Defaults to `null`, showing the `maskPlaceholder`",type:a,status:"optional"},month:{doc:"To display what month should be shown in the first calendar by default. Defaults to the `date` respective `startDate`.",type:a,status:"optional"},startMonth:{doc:"To display what month should be shown in the first calendar by default. Defaults to the `date` respective `startDate`.",type:a,status:"optional"},endMonth:{doc:"To display what month should be shown in the second calendar by default. Defaults to the `date` respective `startDate`.",type:a,status:"optional"},minDate:{doc:"To limit a date range to a minimum `startDate`. Defaults to `null`.",type:a,status:"optional"},maxDate:{doc:"To limit a date range to a maximum `endDate`. Defaults to `null`.",type:a,status:"optional"},dateFormat:{doc:"Defines how the property dates (`date`, `startDate` and `endDate`) should be parsed, e.g. `yyyy/MM/dd`. Defaults to `yyyy-MM-dd`.",type:"string",status:"optional"},returnFormat:{doc:"Defines how the returned date, as a string, should be formatted as. Defaults to `yyyy-MM-dd`.",type:"string",status:"optional"},range:{doc:"Defines if the Date field should support a value of two dates (starting and ending date). The `value` needs to be a string containing two dates, separated by a pipe character (`|`) (`01-09-2024|30-09-2024`) when this is set to `true`. Defaults to `false`.",type:"boolean",status:"optional"},showInput:{doc:"If the input fields with the mask should be visible. Defaults to `false`.",type:"boolean",status:"optional"},maskOrder:{doc:"To define the order of the masked placeholder input fields. Defaults to `dd/mm/yyyy`.",type:"string",status:"optional"},opened:{doc:"To open the date-picker by default. Defaults to `false`.",type:"boolean",status:"optional"},maskPlaceholder:{doc:"To display the placeholder on input. Defaults to `dd/mm/åååå`.",type:"string",status:"optional"},hideNavigation:{doc:"If set to `true`, the navigation will be hidden. Defaults to `false`.",type:"boolean",status:"optional"},hideDays:{doc:"If set to `true`, the week days will be hidden. Defaults to `false`.",type:"boolean",status:"optional"},showSubmitButton:{doc:'If set to `true`, a submit button will be shown. You can change the default text by using `submitButtonText="Ok"`. Defaults to `false`. If the `range` property is `true`, then the submit button is shown.',type:"boolean",status:"optional"},showCancelButton:{doc:'If set to `true`, a cancel button will be shown. You can change the default text by using `cancelButtonText="Avbryt"`. If the `range` property is `true`, then the cancel button is shown. Defaults to `false`',type:"boolean",status:"optional"},showResetButton:{doc:'If set to `true`, a reset button will be shown. You can change the default text by using `resetButtonText="Tilbakestill"`. Defaults to `false`.',type:"boolean",status:"optional"},link:{doc:"Link both calendars, once to the user is navigating between months. Only meant to use if the range is set to `true`. Defaults to `false`.",type:"boolean",status:"optional"},sync:{doc:"Sync input values with the calendars views. Once the input values get changed, the calendar changes its views in sync. Defaults to `true`.",type:"boolean",status:"optional"},firstDay:{doc:"To define the first day of the week. Defaults to `monday`.",type:["monday","tuesday","wednesday","thursday","friday","saturday","sunday"],status:"optional"},alignPicker:{doc:"Use `right` to change the calendar alignment direction. Defaults to `left`.",type:"string",status:"optional"},skipPortal:{doc:" If set to `true`, the calendar will not be rendered inside a react portal. Defaults to `false`.",type:"boolean",status:"optional"},onlyMonth:{doc:"Use `true` to only show the defined month. Disables the month navigation possibility. Defaults to `false`.",type:"boolean",status:"optional"},hideLastWeek:{doc:"Use `true` to only show the last week in the current month if it needs to be shown. The result is that there will mainly be shows five (5) weeks (rows) instead of six (6). Defaults to `false`.",type:"boolean",status:"optional"},stretch:{doc:"If set to `true`, then the date-picker input field will be 100% in `width`",type:"boolean",status:"optional"},label:{doc:"A prepending label in sync with the date input field.",type:"React.ReactNode",status:"optional"},labelDirection:{doc:' Use `label_direction="vertical"` to change the label layout direction. Defaults to `horizontal`.',type:["vertical","horizontal"],status:"optional"},suffix:{doc:"Text describing the content of the DatePicker more than the label. You can also send in a React component, so it gets wrapped inside the DatePicker component.",type:"React.ReactNode",status:"optional"},labelSrOnly:{doc:"Use `true` to make the label only readable by screen readers.",type:"boolean",status:"optional"},shortcuts:{doc:"Gives you the possibility to set predefined dates and date ranges so the user can select these by one click. Define either a JSON or an object with the defined shortcuts. More info is below.",type:"object",status:"optional"},addonElement:{doc:"Gives you the possibility to inject a React element showing up over the footer. Use it to customize `shortcuts`.",type:"object",status:"optional"},inputElement:{doc:'Gives you the possibility to use a plain/vanilla `<input />` HTML element by defining it as a string `inputElement="input"`, a React element, or a render function `inputElement={(internalProps) => (<Return />)}`. Can also be used in circumstances where the `react-text-mask` should not be used, e.g. in testing environments. Defaults to custom masked input.',type:"React.ReactNode",status:"optional"},status:{doc:"Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.",type:"string | boolean",status:"optional"},statusState:{doc:"Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.",type:"string",status:"optional"},statusProps:{doc:"Use an object to define additional FormStatus properties.",type:"object",status:"optional"},disableAutofocus:{doc:"Once the date picker gets opened, there is a focus handling to ensure good accessibility. This can be disabled with this property. Defaults to `false`.",type:"boolean",status:"optional"},correctInvalidDate:{doc:"Corrects the input date value to be the same as either `minDate` or `maxDate`, when the user types in a date that is either before or after one of these. Defaults to `false`.",type:"boolean",status:"optional"},globalStatus:{doc:"The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).",type:"object",status:"optional"},tooltip:{doc:"Provide a short Tooltip content that shows up on the picker button.",type:"string",status:"optional"},skeleton:{doc:"If set to `true`, an overlaying skeleton with animation will be shown.",type:"boolean",status:"optional"},size:{doc:"The sizes you can choose is `small` (1.5rem), `default` (2rem), `medium` (2.5rem) and `large` (3rem) are supported component sizes. Defaults to `default` / `null`.",type:"string",status:"optional"},"[Space](/uilib/layout/space/properties)":{doc:"Spacing properties like `top` or `bottom` are supported.",type:["string","object"],status:"optional"}},s={onChange:{doc:"Will be called on a date change event. Returns an object. See Returned Object below.",type:"function",status:"optional"},onType:{doc:"Will be called on every input and date picker interaction. Returns an `object`. See Returned Object below.",type:"function",status:"optional"},onSubmit:{doc:"Will be called once a user presses the submit button.",type:"function",status:"optional"},onCancel:{doc:"Will be called once a user presses the cancel button.",type:"function",status:"optional"},onReset:{doc:"Will be called once a user presses the reset button.",type:"function",status:"optional"},onShow:{doc:"Will be called once date-picker is visible.",type:"function",status:"optional"},onHide:{doc:"Will be called once date-picker is hidden.",type:"function",status:"optional"},onDaysRender:{doc:"Will be called right before every new calendar view gets rendered. See the example above.",type:"function",status:"optional"},onFocus:{doc:"Will be called once the input gets focus.",type:"function",status:"optional"},onBlur:{doc:"Will be called once the input lose focus.",type:"function",status:"optional"}}},6210:function(e,t,o){var a=o(30600);t.Z=a.Z},64223:function(e,t,o){var a=o(91859);t.Z=a.Z},41676:function(e,t,o){var a=o(35610);t.Z=a.Z},34896:function(e,t,o){o.d(t,{B:function(){return B},v:function(){return T}});var a=o(66386);const{showCancelButton:n,showResetButton:s,showInput:i,range:l,size:r,skeleton:u,tooltip:d,globalStatus:c,statusProps:h,statusState:p,status:f,inputElement:y,label:b,labelDirection:g,labelSrOnly:m,suffix:w,stretch:v,"[Space](/uilib/layout/space/properties)":D,...k}=a.u,T={range:{...l,doc:"Defines if the Date field should support a value of two dates (starting and ending date). The `value` needs to be a string containing two dates, separated by a pipe character (`|`) (`01-09-2024|30-09-2024`) when this is set to `true`. Defaults to `false`."},showInput:{...i,doc:"If the input fields with the mask should be visible. Defaults to `true`."},showCancelButton:{...n,doc:'If set to `true`, a cancel button will be shown. You can change the default text by using `cancelButtonText="Avbryt"` Defaults to `true`. If the `range` property is `true`, then the cancel button is shown.'},showResetButton:{...s,doc:'If set to `true`, a reset button will be shown. You can change the default text by using `resetButtonText="Tilbakestill"` Defaults to `true`.'},...k},{onChange:S,onBlur:x,onFocus:W,...I}=a.t,B=I},9670:function(e,t,o){o.d(t,{EU:function(){return l},hK:function(){return i},sP:function(){return s}});var a=o(84187),n=o(18739);const s={...n.x,...a.W},i={...n.X},l=function(e,t){void 0===e&&(e=void 0),void 0===t&&(t=void 0);const o=`(${e?`value${e.optional?"?":""}: ${e.type}`:"value"}${t?`, additionalArgs${t.optional?"?":""}: ${t.type}`:""}) => void`;return{...i,onChange:{...i.onChange,type:o},onFocus:{...i.onFocus,type:o},onBlur:{...i.onBlur,type:o}}}},84187:function(e,t,o){o.d(t,{P:function(){return n},W:function(){return a}});const a={label:{doc:"Field label to show above / before the input feature.",type:"string",status:"optional"},labelDescription:{doc:'A more discreet text displayed beside the label (i.e for "(optional)").',type:"string",status:"optional"},labelSrOnly:{doc:"Use `true` to make the label only readable by screen readers.",type:"boolean",status:"optional"},help:{doc:"Provide help content for the field using `title` and `content` as a string or React.Node. Additionally, you can set `open` to `true` to display the inline help, set the `breakout` property to `false` to disable the breakout of the inline help content, or use `renderAs` set to `dialog` to render the content in a [Dialog](/uilib/components/dialog/) (recommended for larger amounts of content).",type:"object",status:"optional"},layout:{doc:"Layout for the label and input. Can be `horizontal` or `vertical`.",type:"string",status:"optional"},layoutOptions:{doc:'Use this to set additional options for the `horizontal` layout. E.g. `{ width: "medium" }`. You can also use a custom width `{number}rem`. Instead of a width, you can use a min/max width. E.g. `{ minWidth: "6rem", maxWidth: "12rem" }`.',type:"object",status:"optional"},width:{doc:"Will set the width for the whole block. Use `small`, `medium`, `large` for predefined standard widths. You can also set a custom width `{number}rem` or use `stretch` or `false`.",type:["string","false"],status:"optional"},contentWidth:{doc:"Will set the width for its contents. Use `small`, `medium`, `large` for predefined standard widths. You can also set a custom width `{number}rem` or use `stretch` or `false`.",type:["string","false"],status:"optional"},"[Space](/uilib/layout/space/properties)":{doc:"Spacing properties like `top` or `bottom` are supported.",type:["string","object"],status:"optional"}},n={...a,labelSize:{doc:"Define one of the following [heading sizes](/uilib/elements/heading/): `medium` or `large`.",type:["string","false"],status:"optional"},labelHeight:{doc:"Defines the height of an component (size prop), so the label can be aligned correctly. Can be `default`, `small`, `medium`, `large`.",type:"string",status:"optional"},asFieldset:{doc:"Use `true` when you have several form elements. This way a `fieldset` with a `legend` is used.",type:"boolean",status:"optional"},align:{doc:"`center` or `bottom` for aligning the contents vertically. Defaults to `bottom`.",type:["string","false"],status:"optional"},disableStatusSummary:{doc:"Use `true` to disable the error summary.",type:"boolean",status:"optional"},composition:{doc:"Use `true` for when you have more than one field wrapped.",type:"string",status:"optional"},disabled:{doc:"Set `true` to make the inner [FormLabel](/uilib/components/form-label/) behave as disabled.",type:"boolean",status:"optional"}}},18739:function(e,t,o){o.d(t,{X:function(){return n},x:function(){return a}});const a={value:{doc:"Source data value for the field. Will take precedence over the path value given in the data context.",type:"{valueType}",status:"optional"},defaultValue:{doc:"Default source data value for the field. Will not take precedence over the path value given in the data context.",type:"{valueType}",status:"optional"},path:{doc:"JSON Pointer for where the data for the field is located in the source dataset (when using Form.Handler or DataContext). The `path` will also be set as the `name` attribute for the [string](/uilib/extensions/forms/base-fields/String/)-field.",type:"string",status:"optional"},info:{doc:"Info message shown below / after the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`",type:["React.Node","Array<React.Node>","function"],status:"optional"},warning:{doc:"Warning message shown below / after the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`",type:["React.Node","Array<React.Node>","function"],status:"optional"},error:{doc:"Error message shown below / after the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`",type:["Error","FormError","Array<Error | FormError>","function"],status:"optional"},disabled:{doc:"Set `true` to show the field but without the possibility of changing the value.",type:"boolean",status:"optional"},emptyValue:{doc:"The value to use (in `onChange` events etc) when emptying the field. Makes it possible for instance to provide `undefined` instead of an empty string when clearing the content of a text input.",type:["{valueType}","undefined"],status:"optional"},required:{doc:'When set to `true`, the field will give an error if the value fails the required validation. When set to `false`, the field will not be required, but will add a "(optional)" suffix to the label.',type:"boolean",status:"optional"},labelSuffix:{doc:'Will append an additional text to the label, like "(optional)". When using `inheritLabel`, the suffix will not be inherited. NB: The visual appearance of the `labelSuffix` may change in the future.',type:"React.Node",status:"optional"},schema:{doc:"Custom JSON Schema for validating the value.",type:"object",status:"optional"},validateInitially:{doc:"Set to `true` to show validation based errors initially (from given value-prop or source data) before the user interacts with the field.",type:"boolean",status:"optional"},validateUnchanged:{doc:"Set to `true` to show validation based errors when the field is touched (like focusing a field and blurring) without having changed the value. Since the user did not introduce a new error, this will apply when the value was initially invalid based on validation.",type:"boolean",status:"optional"},validateContinuously:{doc:"Set to `true` to show validation based errors continuously while writing, not just when blurring the field.",type:"boolean",status:"optional"},errorMessages:{doc:"Custom error messages for each type of error, overriding default messages.",type:"object",status:"optional"},onChangeValidator:{doc:"Custom validator function where you can return `undefined`, `Error`, `FormError` or an Array with either several other validators or several `Error` or `FormError`. It is triggered on every change done by the user. The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }.",type:"function",status:"optional"},onBlurValidator:{doc:"Custom validator function where you can return `undefined`, `Error`, `FormError` or an Array with either several other validators or several `Error` or `FormError`. It is triggered when the user leaves a field (e.g., blurring a text input or closing a dropdown). The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }.",type:"function",status:"optional"},transformIn:{doc:"Transforms the `value` before its displayed in the field (e.g. input).",type:"function",status:"optional"},transformOut:{doc:"Transforms the value before it gets forwarded to the form data object (context) or returned as the `onChange` value parameter. The first parameter is the internal value. Some fields to support a second parameter, like the SelectCountry, where the country object is given.",type:"function",status:"optional"}},n={onChange:{doc:"Will be called on value changes made by the user, with the new value as argument. When an `async` function is used, the corresponding [FieldBlock](/uilib/extensions/forms/create-component/FieldBlock/) will show an indicator on the field label. You can return `{ success: 'saved' } as const` to show a success symbol, or an error or an object with these keys `{ info: 'Info message', warning: 'Warning message', error: Error('My error') } as const`.",type:"(value) => void",status:"optional"},onFocus:{doc:"Will be called when the component gets into focus. Like clicking inside a text input or opening a dropdown. Called with active value as argument.",type:"(value) => void",status:"optional"},onBlur:{doc:"Will be called when the component stop being in focus. Like when going to next field, or closing a dropdown. Called with active value as argument.",type:"(value) => void",status:"optional"}}}}]);
//# sourceMappingURL=567202b3e4c8990f17c9fcfb17c4dfa35092ce0f-1a9f14f6617cd574c1de.js.map