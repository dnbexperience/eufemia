"use strict";
(self["webpackChunkdnb_design_system_portal"] = self["webpackChunkdnb_design_system_portal"] || []).push([[921],{

/***/ 9454:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ VisualTests; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);
/* harmony import */ var _Examples__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(27015);
/* harmony import */ var _dnb_eufemia_src_shared_component_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(61109);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23431);
function VisualTests(){// Selects/marks some of the text in SelectionExample on second render tick
// For comparing screenshots
react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function(){window.requestAnimationFrame(function(){try{var range=new Range();var textNode=document.querySelector('[data-visual-test="helper-selection"] p').childNodes[0];range.setStart(textNode,0);range.setEnd(textNode,Math.floor(textNode.length/2));// apply this range for document selection
document.getSelection().addRange(range);}catch(e){(0,_dnb_eufemia_src_shared_component_helper__WEBPACK_IMPORTED_MODULE_2__/* .warn */ .ZK)(e);}});},[]);return (0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__/* .jsx */ .tZ)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,(0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__/* .jsx */ .tZ)(_Examples__WEBPACK_IMPORTED_MODULE_1__/* .CoreStyleExample */ .nk,null),(0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__/* .jsx */ .tZ)(_Examples__WEBPACK_IMPORTED_MODULE_1__/* .TabFocusExample */ .j,null),(0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__/* .jsx */ .tZ)(_Examples__WEBPACK_IMPORTED_MODULE_1__/* .UnstyledListExample */ .ri,null),(0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__/* .jsx */ .tZ)(_Examples__WEBPACK_IMPORTED_MODULE_1__/* .ScreenReaderOnlyExample */ .ye,null),(0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__/* .jsx */ .tZ)(_Examples__WEBPACK_IMPORTED_MODULE_1__/* .NoScreenReaderExample */ .Rh,null),(0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__/* .jsx */ .tZ)(_Examples__WEBPACK_IMPORTED_MODULE_1__/* .SelectionExample */ .Rc,null));}

/***/ })

}]);
//# sourceMappingURL=component---src-docs-uilib-helpers-classes-visual-tests-js-9cf15b937c0f7b0614c5.js.map