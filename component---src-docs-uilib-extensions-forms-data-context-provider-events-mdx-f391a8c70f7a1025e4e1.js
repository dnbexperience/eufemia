"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[70630],{58979:function(t,e,a){a.r(e);var n=a(52322),o=a(45392),i=a(85179),s=a(68289);function r(t){const e=Object.assign({h2:"h2"},(0,o.ah)(),t.components);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(e.h2,{children:"Events"}),"\n",(0,n.jsx)(i.ZP,{props:s.j})]})}e.default=function(t){void 0===t&&(t={});const{wrapper:e}=Object.assign({},(0,o.ah)(),t.components);return e?(0,n.jsx)(e,Object.assign({},t,{children:(0,n.jsx)(r,t)})):r(t)}},6210:function(t,e,a){var n=a(30600);e.Z=n.Z},64223:function(t,e,a){var n=a(91859);e.Z=n.Z},41676:function(t,e,a){var n=a(35610);e.Z=n.Z},68289:function(t,e,a){a.d(e,{I:function(){return n},j:function(){return o}});const n={defaultData:{doc:"Default source data, only used if no other source is available, and not leading to updates if changed after mount.",type:"object",status:"optional"},data:{doc:"Dynamic source data used as both initial data, and updates internal data if changed after mount.",type:"object",status:"optional"},id:{doc:"Unique id for connecting Form.Handler and helper tools such as Form.useData.",type:["string","Function","Object","React.Context"],status:"optional"},schema:{doc:"JSON Schema for validation of the data set.",type:"object",status:"optional"},errorMessages:{doc:"Object containing error messages by either type of JSON Pointer path and type.",type:"object",status:"optional"},minimumAsyncBehaviorTime:{doc:"Minimum time to display the submit indicator. Default is 1s.",type:"boolean",status:"optional"},asyncSubmitTimeout:{doc:"The maximum time to display the submit indicator before it changes back to normal. In case something went wrong during submission. Default is 30s.",type:"boolean",status:"optional"},scrollTopOnSubmit:{doc:"True for the UI to scroll to the top of the page when data is submitted.",type:"boolean",status:"optional"},sessionStorageId:{doc:"Key for saving active data to session storage and loading it on mount.",type:"string",status:"optional"},ajvInstance:{doc:"Provide your own custom Ajv instance. More info in the [Schema validation](/uilib/extensions/forms/Form/schema-validation/#custom-ajv-instance-and-keywords) section.",type:"ajv",status:"optional"},transformIn:{doc:"Mutate the data context (internally as well) based on your criteria: `({ path, value, data, props, internal }) => 'new value'`. It will iterate on each data entry (/path).",type:"function",status:"optional"},transformOut:{doc:"Mutate the data before it enters onSubmit or onChange based on your criteria: `({ path, value, data, props, internal }) => 'new value'`. It will iterate on each data entry (/path).",type:"function",status:"optional"},globalStatusId:{doc:"If needed, you can define a custom [GlobalStatus](/uilib/components/global-status) id. Defaults to `main`.",type:"string",status:"optional"},required:{doc:"Make all fields required.",type:"boolean",status:"optional"},disabled:{doc:"Disable all fields.",type:"boolean",status:"optional"},locale:{doc:"Locale (language) to use for all nested Eufemia components.",type:"string",status:"optional"},children:{doc:"Contents.",type:"React.Node",status:"required"}},o={onChange:{doc:"Will be called when a value of a field was changed by the user, with the data set (including the changed value) as argument. When an async function is provided, it will show an indicator on the current label during a field change. Related props: `minimumAsyncBehaviorTime` and `asyncSubmitTimeout`. You can return an error or an object with these keys `{ info: 'Info message', warning: 'Warning message', error: Error('My error') } as const` in addition to { success: 'saved' } indicate the field was saved. Will emit unvalidated by default and validated when an async function is provided (like `onSubmit`). The second parameter is an object containing the `filterData`, `resetForm` and `clearData` functions.",type:"function",status:"optional"},onPathChange:{doc:"Will be called when a value of a field was changed by the user, with the `path` (JSON Pointer) and new `value` as arguments. Can be an async function. Will emit unvalidated by default and validated when `onChange` is an async function.",type:"function",status:"optional"},onSubmit:{doc:"Will be called (on validation success) when the user submit the form (i.e by clicking a [SubmitButton](/uilib/extensions/forms/Form/SubmitButton) component inside), with the data set as argument. When an async function is provided, it will show an indicator on the submit button during the form submission. All form elements will be disabled during the submit. The indicator will be shown for minimum 1 second. Related props: `minimumAsyncBehaviorTime` and `asyncSubmitTimeout`. You can return an error or an object with these keys `{ status: 'pending', info: 'Info message', warning: 'Warning message', error: Error('My error') } as const` to be shown in a [FormStatus](/uilib/components/form-status). Will only emit when every validation has passed. The second parameter is an object containing the `filterData`, `reduceToVisibleFields`, `transformData`, `resetForm` and `clearData` functions.",type:"function",status:"optional"},onSubmitRequest:{doc:"Will be called when the user tries to submit, but errors stop the data from being submitted. The first parameter is aa object containing the `getErrors` method, returning an array with field errors. Each error object contains the `path`, `error` and `props` of the field. You can use this to log the errors before the form is submitted.",type:"function",status:"optional"},onSubmitComplete:{doc:"Will be called after onSubmit has finished and had not errors. It supports the same return values as `onSubmit` and will be merged together.",type:"function",status:"optional"},onClear:{doc:"Will be called when the form is cleared via `Form.clearData` or via the `onSubmit` event (or `onCommit`) argument `{ clearData }`.",type:"function",status:"optional"}}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-data-context-provider-events-mdx-f391a8c70f7a1025e4e1.js.map