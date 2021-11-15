"use strict";
(self["webpackChunkdnb_design_system_portal"] = self["webpackChunkdnb_design_system_portal"] || []).push([[296],{

/***/ 72366:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ form_demo_01; }
});

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(4942);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(87462);
// EXTERNAL MODULE: ./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js + 2 modules
var emotion_styled_base_browser_esm = __webpack_require__(92346);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/react-helmet/es/Helmet.js
var Helmet = __webpack_require__(35414);
// EXTERNAL MODULE: ./node_modules/@emotion/react/dist/emotion-react.browser.esm.js
var emotion_react_browser_esm = __webpack_require__(23431);
;// CONCATENATED MODULE: ./src/docs/uilib/demos/layout/Layout.js
function _EMOTION_STRINGIFIED_CSS_ERROR__(){return"You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";}/**
 * LayoutWrapper is include in Layout
 * with this, LayoutWrapper is included in every page
 *
 * Info:
 * Eufemia Styles are imported in "gatsby-browser.js"
 * But in here we define ".dnb-core-style"
 * With this, we could have Legacy CSS somewhere in the header or footer
 *
 */var Wrapper=(0,emotion_styled_base_browser_esm/* default */.Z)("div", true?{target:"efugva01"}:0)( true?{name:"zl1inp",styles:"display:flex;justify-content:center"}:0);var WrapperInner=(0,emotion_styled_base_browser_esm/* default */.Z)("div", true?{target:"efugva00"}:0)( true?{name:"pcy38h",styles:"width:100%;max-width:60rem;padding:0 1rem;@media screen and (max-width: 40em){padding:0 0.5rem;}"}:0);var LayoutWrapper=function LayoutWrapper(_ref){var children=_ref.children;return (0,emotion_react_browser_esm/* jsx */.tZ)(Wrapper,{className:"dnb-core-style"},(0,emotion_react_browser_esm/* jsx */.tZ)(WrapperInner,null,(0,emotion_react_browser_esm/* jsx */.tZ)("main",{role:"main"},children)));};/* harmony default export */ var Layout = (LayoutWrapper);
// EXTERNAL MODULE: ../dnb-eufemia/build/elements/P.js
var P = __webpack_require__(73681);
// EXTERNAL MODULE: ../dnb-eufemia/build/components/space/Space.js
var Space = __webpack_require__(30020);
// EXTERNAL MODULE: ../dnb-eufemia/build/components/heading/Heading.js + 3 modules
var Heading = __webpack_require__(71115);
// EXTERNAL MODULE: ../dnb-eufemia/build/components/step-indicator/StepIndicator.js + 8 modules
var StepIndicator = __webpack_require__(52432);
// EXTERNAL MODULE: ../dnb-eufemia/build/components/global-status/GlobalStatus.js + 1 modules
var GlobalStatus = __webpack_require__(66394);
// EXTERNAL MODULE: ../dnb-eufemia/build/components/form-set/FormSet.js
var FormSet = __webpack_require__(14561);
// EXTERNAL MODULE: ../dnb-eufemia/build/components/section/Section.js
var Section = __webpack_require__(3530);
// EXTERNAL MODULE: ../dnb-eufemia/build/components/toggle-button/ToggleButton.js + 2 modules
var ToggleButton = __webpack_require__(10870);
// EXTERNAL MODULE: ../dnb-eufemia/build/components/form-row/FormRow.js
var FormRow = __webpack_require__(32453);
// EXTERNAL MODULE: ../dnb-eufemia/build/components/input/Input.js
var Input = __webpack_require__(52860);
// EXTERNAL MODULE: ../dnb-eufemia/build/components/textarea/Textarea.js
var Textarea = __webpack_require__(73878);
// EXTERNAL MODULE: ../dnb-eufemia/build/components/icon/Icon.js
var Icon = __webpack_require__(5468);
// EXTERNAL MODULE: ../dnb-eufemia/build/components/button/Button.js
var Button = __webpack_require__(56751);
// EXTERNAL MODULE: ../dnb-eufemia/build/components/switch/Switch.js
var Switch = __webpack_require__(87816);
// EXTERNAL MODULE: ../dnb-eufemia/build/icons/attachment.js
var attachment = __webpack_require__(37162);
// EXTERNAL MODULE: ../dnb-eufemia/build/icons/trash.js
var trash = __webpack_require__(66221);
// EXTERNAL MODULE: ../dnb-eufemia/build/icons/save.js
var save = __webpack_require__(47517);
;// CONCATENATED MODULE: ./src/docs/uilib/demos/eufemia-demo/form-demo-01.js
function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly){symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});}keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){(0,defineProperty/* default */.Z)(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}function form_demo_01_EMOTION_STRINGIFIED_CSS_ERROR_(){return"You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";}/**
 * This is a quick demo of a Eufemia form.
 * This demo is mainly to demonstrate the visual part,
 * but includes also some event handling to showcase error messages.
 *
 * It is divided in three parts:
 *
 * 1. Markup
 * 2. Styles
 * 3. Logic
 *
 */// App layout wrapper
// Get Eufemia in
/** -- 1. Markup -- */ // Our main component
var FormDemo=function FormDemo(){return (0,emotion_react_browser_esm/* jsx */.tZ)(FormLogic,null,(0,emotion_react_browser_esm/* jsx */.tZ)(Layout,null,(0,emotion_react_browser_esm/* jsx */.tZ)(Header,null),(0,emotion_react_browser_esm/* jsx */.tZ)(MainForm,null),(0,emotion_react_browser_esm/* jsx */.tZ)(Space/* default */.Z,{bottom:"medium"})));};/* harmony default export */ var form_demo_01 = (FormDemo);// A dummy header
var Header=function Header(){return (0,emotion_react_browser_esm/* jsx */.tZ)(react.Fragment,null,(0,emotion_react_browser_esm/* jsx */.tZ)(Helmet/* Helmet */.q,null,(0,emotion_react_browser_esm/* jsx */.tZ)("html",{lang:"en"}),(0,emotion_react_browser_esm/* jsx */.tZ)("title",null,"Eufemia - Form Demo #1")),(0,emotion_react_browser_esm/* jsx */.tZ)(HeaderSection,{style_type:"mint-green"},(0,emotion_react_browser_esm/* jsx */.tZ)(HeaderTitleWrapper,{top:"x-large"},(0,emotion_react_browser_esm/* jsx */.tZ)(Heading/* default */.ZP,{size:"x-large"},"Card complaint")),(0,emotion_react_browser_esm/* jsx */.tZ)(StepIndicator/* default */.Z,{current_step:0// mode="strict" // The design is not ready for v2
,data:[{title:'Information about the complaint'},{title:'Summary'}],on_change:function on_change(e){console.log('StepIndicator.on_change',e);}})),(0,emotion_react_browser_esm/* jsx */.tZ)(GlobalStatus/* default */.Z,null));};// Main form markup
var MainForm=function MainForm(){var _React$useContext=react.useContext(FormContext),currentValues=_React$useContext.currentValues,setValues=_React$useContext.setValues,currentErrors=_React$useContext.currentErrors,resetErrors=_React$useContext.resetErrors,submitHandler=_React$useContext.submitHandler,cancelHandler=_React$useContext.cancelHandler;return (0,emotion_react_browser_esm/* jsx */.tZ)(FormSet/* default */.Z,{vertical:true,prevent_submit:true,on_submit:submitHandler},(0,emotion_react_browser_esm/* jsx */.tZ)(WidthLimit,null,(0,emotion_react_browser_esm/* jsx */.tZ)(Section/* default */.Z,{top:"medium",spacing:"x-large",style_type:"white"},(0,emotion_react_browser_esm/* jsx */.tZ)(Heading/* default */.ZP,null,"What has happened?"),(0,emotion_react_browser_esm/* jsx */.tZ)(Ingress,null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."),(0,emotion_react_browser_esm/* jsx */.tZ)(ToggleButton/* default.Group */.Z.Group,{value:currentValues.toggleButtonOptionsValue,on_change:function on_change(_ref){var toggleButtonOptionsValue=_ref.value;return setValues({toggleButtonOptionsValue:toggleButtonOptionsValue});}},(0,emotion_react_browser_esm/* jsx */.tZ)(ToggleButton/* default */.Z,{text:"Unknown transaction",value:"first"}),(0,emotion_react_browser_esm/* jsx */.tZ)(ToggleButton/* default */.Z,{text:"I did not receive money from the ATM",value:"second"}),(0,emotion_react_browser_esm/* jsx */.tZ)(ToggleButton/* default */.Z,{text:"Goods not received",value:"third"}),(0,emotion_react_browser_esm/* jsx */.tZ)(ToggleButton/* default */.Z,{text:"Wrong goods received",value:"fourth"}),(0,emotion_react_browser_esm/* jsx */.tZ)(ToggleButton/* default */.Z,{text:"Fake goods received",value:"fifth"}),(0,emotion_react_browser_esm/* jsx */.tZ)(ToggleButton/* default */.Z,{text:"Double charged",value:"sixth"}),(0,emotion_react_browser_esm/* jsx */.tZ)(ToggleButton/* default */.Z,{text:"Wrong amount charged",value:"seventh"}),(0,emotion_react_browser_esm/* jsx */.tZ)(ToggleButton/* default */.Z,{text:"I am after charged",value:"eighth"}))),(0,emotion_react_browser_esm/* jsx */.tZ)(Section/* default */.Z,{spacing:"x-large"},(0,emotion_react_browser_esm/* jsx */.tZ)(Heading/* default */.ZP,null,"Lorem ipsum"),(0,emotion_react_browser_esm/* jsx */.tZ)(Ingress,null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."),(0,emotion_react_browser_esm/* jsx */.tZ)(Space/* default */.Z,{top:"small"},(0,emotion_react_browser_esm/* jsx */.tZ)(FormRow/* default */.ZP,{label:"Did you receive some money from the ATM?"},(0,emotion_react_browser_esm/* jsx */.tZ)(ToggleButton/* default.Group */.Z.Group,{value:currentValues.yesNoQuestionValue,on_change:function on_change(_ref2){var yesNoQuestionValue=_ref2.value;return setValues({yesNoQuestionValue:yesNoQuestionValue});}},(0,emotion_react_browser_esm/* jsx */.tZ)(ToggleButton/* default */.Z,{text:"Yes",value:"yes"}),(0,emotion_react_browser_esm/* jsx */.tZ)(ToggleButton/* default */.Z,{text:"No",value:"no"})))),(0,emotion_react_browser_esm/* jsx */.tZ)(Space/* default */.Z,{top:"medium"},(0,emotion_react_browser_esm/* jsx */.tZ)(FormRow/* default */.ZP,null,(0,emotion_react_browser_esm/* jsx */.tZ)(Input/* default */.ZP,{label:"How much money did you withdraw?",suffix:"Kr",value:currentValues.firstInputValue,on_change:function on_change(_ref3){var firstInputValue=_ref3.value;return setValues({firstInputValue:firstInputValue});}}))),(0,emotion_react_browser_esm/* jsx */.tZ)(Space/* default */.Z,{top:"medium"},(0,emotion_react_browser_esm/* jsx */.tZ)(FormRow/* default */.ZP,null,(0,emotion_react_browser_esm/* jsx */.tZ)(Input/* default */.ZP,{label:"How much money did you receive?",suffix:"Kr",value:currentValues.secondInputValue,on_change:function on_change(_ref4){var secondInputValue=_ref4.value;return setValues({secondInputValue:secondInputValue});}}))),(0,emotion_react_browser_esm/* jsx */.tZ)(Space/* default */.Z,{top:"medium"},(0,emotion_react_browser_esm/* jsx */.tZ)(FormRow/* default */.ZP,null,(0,emotion_react_browser_esm/* jsx */.tZ)(Textarea/* default */.Z,{rows:"6",cols:"40",label:"Do you have additional relevant information about the case?",value:currentValues.textareaValue,on_change:function on_change(_ref5){var textareaValue=_ref5.value;return setValues({textareaValue:textareaValue});}})))),(0,emotion_react_browser_esm/* jsx */.tZ)(Section/* default */.Z,{spacing:"x-large",style_type:"white"},(0,emotion_react_browser_esm/* jsx */.tZ)(Heading/* default */.ZP,null,"Attachment"),(0,emotion_react_browser_esm/* jsx */.tZ)(Ingress,{bottom:"x-small"},"If you have a receipt of the ATM transaction showing that money was not dispensed, then please upload the copy as this would strengthen your case."),(0,emotion_react_browser_esm/* jsx */.tZ)(Attachment,null,(0,emotion_react_browser_esm/* jsx */.tZ)(Attachment.FileRow,null,(0,emotion_react_browser_esm/* jsx */.tZ)(Icon/* default */.ZP,{icon:attachment/* default */.Z,"aria-hidden":true}),' filename_01.jpg'),(0,emotion_react_browser_esm/* jsx */.tZ)(Button/* default */.ZP,{text:"Delete",variant:"tertiary",icon:trash/* default */.Z,icon_position:"left"})),(0,emotion_react_browser_esm/* jsx */.tZ)(Attachment.Add,null,(0,emotion_react_browser_esm/* jsx */.tZ)(Button/* default */.ZP,{text:"Upload attachment",variant:"tertiary",icon:attachment/* default */.Z,icon_position:"left"})))),(0,emotion_react_browser_esm/* jsx */.tZ)(Section/* default */.Z,{top:"medium",spacing:"medium"},(0,emotion_react_browser_esm/* jsx */.tZ)(Switch/* default */.Z,{label:"I hereby declare that all information given is correct and to the best of my knowledge.",label_position:"right",checked:currentValues.switchIsChecked,on_change:function on_change(_ref6){var switchIsChecked=_ref6.checked;return setValues({switchIsChecked:switchIsChecked});},on_change_end:function on_change_end(_ref7){var checked=_ref7.checked;return checked&&resetErrors();},status:currentErrors.switchErrorMessage})),(0,emotion_react_browser_esm/* jsx */.tZ)(DividerSection,{spacing:"small",style_type:"divider"},(0,emotion_react_browser_esm/* jsx */.tZ)(Button/* default */.ZP,{type:"submit",text:"Next",icon:"chevron_right"}),(0,emotion_react_browser_esm/* jsx */.tZ)("div",null,(0,emotion_react_browser_esm/* jsx */.tZ)(Button/* default */.ZP,{text:"Save",type:"submit"// This button is the required submit
,variant:"secondary",icon:save/* default */.Z,icon_position:"left"}),(0,emotion_react_browser_esm/* jsx */.tZ)(Button/* default */.ZP,{text:"Cancel",variant:"secondary",icon:"close",icon_position:"left",on_click:cancelHandler}))));};/** -- 2. Styles -- */ // Visual helper to limit the width inside of our layout
var WidthLimit=(0,emotion_styled_base_browser_esm/* default */.Z)("div", true?{target:"e1klicq37"}:0)( true?{name:"dxxbly",styles:"max-width:42rem;.dnb-input__input{max-width:10rem;}@media screen and (max-width: 40em){textarea{width:90vw;}}"}:0);// set the header height
var HeaderSection=/*#__PURE__*/(0,emotion_styled_base_browser_esm/* default */.Z)(Section/* default */.Z, true?{target:"e1klicq36"}:0)( true?{name:"eyaogu",styles:"display:flex;flex-direction:column;justify-content:flex-end;height:16rem"}:0);// center the h1 vertically
var HeaderTitleWrapper=/*#__PURE__*/(0,emotion_styled_base_browser_esm/* default */.Z)(Space/* default */.Z, true?{target:"e1klicq35"}:0)( true?{name:"1tev41e",styles:"display:flex;flex-direction:row;align-items:center;height:100%"}:0);// Custom paragraph
var IngressRaw=/*#__PURE__*/(0,emotion_styled_base_browser_esm/* default */.Z)(P/* default */.Z, true?{target:"e1klicq34"}:0)( true?{name:"6c7voq",styles:"font-weight:var(--font-weight-medium);color:var(--color-emerald-green)"}:0);var Ingress=function Ingress(props){return (0,emotion_react_browser_esm/* jsx */.tZ)(IngressRaw,(0,esm_extends/* default */.Z)({top:"x-small",bottom:"small"},props));};// Attachment area
var Attachment=/*#__PURE__*/(0,emotion_styled_base_browser_esm/* default */.Z)(Space/* default */.Z, true?{target:"e1klicq33"}:0)( true?{name:"1th4qdx",styles:".dnb-button{margin-left:1rem;}"}:0);Attachment.FileRow=(0,emotion_styled_base_browser_esm/* default */.Z)("span", true?{target:"e1klicq32"}:0)( true?{name:"1cowlz5",styles:"margin-right:0.75rem;.dnb-icon{margin-right:0.5rem;}"}:0);Attachment.Add=/*#__PURE__*/(0,emotion_styled_base_browser_esm/* default */.Z)(Space/* default */.Z, true?{target:"e1klicq31"}:0)( true?{name:"1r9xms7",styles:"margin-top:0.5rem;.dnb-button{margin-left:-0.5rem;}"}:0);// The bottom section / divider has some extra CSS
var DividerSection=/*#__PURE__*/(0,emotion_styled_base_browser_esm/* default */.Z)(Section/* default */.Z, true?{target:"e1klicq30"}:0)( true?{name:"1m4yjdk",styles:"display:flex;justify-content:space-between;.dnb-button+.dnb-button{margin-left:1rem;}@media screen and (max-width: 30rem){display:block;.dnb-button{display:flex;margin-top:0.5rem;&+.dnb-button{margin-left:0;}}}"}:0);/** -- 3. App logic -- */ // Default local states/values
var defaultValues={toggleButtonOptionsValue:'second',yesNoQuestionValue:'yes',firstInputValue:2000,secondInputValue:200,textareaValue:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.',switchIsChecked:false};var defaultErrors={switchErrorMessage:'Sorry, this has to be checked.'};// Form Logic and Event handling
var FormContext=/*#__PURE__*/react.createContext({});var FormLogic=function FormLogic(props){var _React$useState=react.useState(defaultValues),currentValues=_React$useState[0],updateValues=_React$useState[1];var _React$useState2=react.useState({}),currentErrors=_React$useState2[0],updateErrors=_React$useState2[1];function submitHandler(){// Handle error before we use the form value
if(handleErrors()){console.log('Show me my values:',currentValues);}}function handleErrors(){// simulate error
if(!currentValues.switchIsChecked){updateErrors(defaultErrors);return false;}else{// remove errors, in case we had some
resetErrors();}return true;}function cancelHandler(){// // remove errors, in case we had some
resetErrors();// reset the values
updateValues(defaultValues);}var resetErrors=function resetErrors(){return updateErrors({});};var setValues=function setValues(newProps){return updateValues(_objectSpread(_objectSpread({},currentValues),newProps));};// Our context we use for state handling
var formContext={currentValues:currentValues,updateValues:updateValues,currentErrors:currentErrors,updateErrors:updateErrors,submitHandler:submitHandler,handleErrors:handleErrors,cancelHandler:cancelHandler,setValues:setValues,resetErrors:resetErrors};return (0,emotion_react_browser_esm/* jsx */.tZ)(FormContext.Provider,(0,esm_extends/* default */.Z)({value:formContext},props));};

/***/ })

}]);
//# sourceMappingURL=9480bbf92ec3b7509bfb0535b8b0865b761c9b78-67c8f77a4b8745955238.js.map